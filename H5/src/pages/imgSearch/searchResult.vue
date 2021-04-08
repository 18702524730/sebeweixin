<template>
  <div class="img_search_result">
    <div class="search_top_wrap" :style="{top: '-'+ scrollH + 'px'}">
      <div class="serach_top" ref="serach_top">
        <div class="s_img" @click="uploadImg">
          <img :src="img">
          <p>重新上传</p>
          <!-- <input type="file" id="uploads" ref="uploads" style="opacity: 0;width:100%;height: 100%;left:0;top:0;position:absolute;" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event)"> -->
        </div>
        <span>为您查询到<b>{{numFound}}</b>条相似</span>
        <div class="action" @click="action">{{actionText}}</div>
      </div>
      <search-condition @conQuery="query"></search-condition>
    </div>
    <search-result :scrollH.sync="scrollH" :selectMode="selectMode" :resultList="resultList" @queryList="query" :noMoreData="noMoreData" :loading="loading"></search-result>
    <actionsheet v-model="actionshow" :menus="menus" @on-click-menu="actionSheetClick" show-cancel></actionsheet>
    <div v-transfer-dom>
      <alert v-model="showTip" :title="'提示'" :content="'请选择商标'"></alert>
    </div>
    <div v-transfer-dom>
      <loading v-model="loading2" text="请稍候"></loading>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import $ from 'jquery'
  import searchCondition from 'components/searchCondition'
  import searchResult from 'components/searchResult'
  //import dingtalk from 'weex-dingtalk';
  import vueCropper from 'components/vue-cropper'
  import { ToastPlugin ,Swiper, SwiperItem ,XDialog, Alert ,TransferDomDirective as TransferDom, Loading } from 'vux';
  import { Actionsheet,Swipeout, SwipeoutItem } from 'vux';
  const cartUrl = CONFIG.cartUrl;
  const wxUrl = CONFIG.wxUrl;
  const indexUrl =  CONFIG.indexUrl;
  const rows = 15;
  export default {
    directives: {
      TransferDom
    },
    components: {
      searchResult,searchCondition,
      vueCropper,
      Actionsheet,Swipeout, SwipeoutItem,
      Swiper, SwiperItem,XDialog,ToastPlugin,Loading, Alert
    },
    data () {
      return {
        actionText: '生成报告',
        scrollH: 0, //头部的top值
        loading: true,
        loading2: false,
        showTip:false,

        content:'', //查询关键字
        cate_id:'', //商标类别id,以逗号分隔
        status: '', //状态
        sort_name:'',

        selectMode:false,
        showFilter: false,
        actionshow: false,
        resultList:[],
        noMoreData:false,
        numFound:0,
        menus:[{ //生成报告选择列表
          label: '<span style="color:#999;font-size:14px;">已手动添加的<b>0</b>条结果，会显示在报告最顶部</span>',
          type: 'info'
        }, {
          label: '手动添加',
          value: 'manual'
        }, {
          label: '以前10条结果生成报告',
          value: 'add1'
        }, {
          label: '以前15条结果生成报告',
          value: 'add2'
        }, {
          label: '直接生成',
          value: 'create'
        }],
        img: '',
        isDirectCreat: false
        /*crop: {
          img: '',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          width: 300,
          height: 250
        }*/
      }
    },
    mounted () {
      this.img = this.$store.state.img;
      var self = this;
      /*this.setRight({
        show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        text: '生成报告',//控制显示文本，空字符串表示显示默认文本
      }, function(){
        var arr = self.getSelectedItems();
        self.menus[0].label = self.menus[0].label.replace(/\<b\>.*\<\/b\>/, '<b>'+arr.length+'</b>');
        //console.log(this.menus[0].label)
        self.actionshow = true;
      });
      this.setTitle();*/
    },
    methods: {
      getSelectedItems(){
        var resultList = this.resultList;
        var arr = [];
        resultList.forEach((item, i) => {
          if (item.isAdded) {
            arr.push(item);
          }
        });
        return arr;
      },
      action(){
        var arr = this.getSelectedItems();
        this.menus[0].label = this.menus[0].label.replace(/\<b\>.*\<\/b\>/, '<b>'+arr.length+'</b>');
        if (this.isDirectCreat) {
          this.actionshow = false;
          this.creatReport();
        }else{
          this.actionshow = true;
        }
      },
      query(data){
        var page = 1;
        var isLoadMore = false;
        var isRefresh = false;
        var seirialnum = '';
        var callback = function(){
        };
        if (data) {
          this.content = data.content || this.content;
          this.status = data.status === undefined ? this.status : data.status;
          this.cate_id = data.cate_id === undefined ? this.cate_id : data.cate_id;
          this.sort_name = data.sort_name === undefined ? this.sort_name : data.sort_name;
          seirialnum = data.seirialnum;
          page = data.start || 1;
          isLoadMore = data.isLoadMore || false;
          isRefresh = data.isRefresh || false;
          callback = data.callback;
        }

        //console.log(data && data.data)
        var ret = {
          iscut: 1,
          search_type: this.search_type,
          content: this.content,
          category: this.cate_id,
          image64: this.$store.state.img,
          imageName: 'aa.jpg',
          seirialnum: seirialnum,
          status: this.status,
          sort_name: this.sort_name,
          sort_type: 0,
          start: page,
          rows: rows
        }
        //console.log(ret)

        this.loading = true;
        if (!isLoadMore && !isRefresh) {
          this.loading2 = true;
        }
        this.$http.post(wxUrl + '/bzgapi/doimg',  qs.stringify(ret))
        .then((resp)=>{
          this.loading2 = false;
          console.log(resp)
          var data = resp;
          this.numFound = data.total;
          var docs = data.result;
          docs.forEach((item, i) => {
            item.showRight = '';
            item.isAdded =false;
          })
          if (isLoadMore) {
            this.resultList = [].concat(this.resultList, docs);
            if (!this.resultList.length) {
              this.loading = false;
            }
            if (docs.length < rows) {
              callback && callback(true);
              this.noMoreData = true;
              return;
            }else{
              this.noMoreData = false;
            }
          }else{
            this.resultList = docs;
            if (docs.length < rows) {
              this.noMoreData = true;
            }else{
              this.noMoreData = false;
            }
            if (!this.resultList.length) {
              this.loading = false;
            }
          }
          callback && callback();
        })
        .catch((error)=>{
          this.loading2 = false;
        })
      },
      click(key){
        console.log(key)
      },
      //actionSheet点击事件
      actionSheetClick(key){
        var self = this;
        var add = function(num){
          // 追加列表前10个
          var resultList = self.resultList;
          var arr = [].concat(self.$store.state.selectedTMArr);
          // 判断｛｝是否在数组中
          var inArrayOf = function(arr, sortItem, sortName){
            var ret = -1;
            arr.forEach((item, i) => {
              if (item[sortName] == sortItem[sortName]) {
                ret = i;
                return false;
              }
            });
            return ret;
          }
          resultList.forEach((item, i) => {
            if (i > num-1) {
              return false;
            }
            item.isAdded = true;
            var idx = inArrayOf(arr, item, 'id');
            if (idx == -1) {
              arr.push(item);
            }
          });

          //更新选中的条目
          self.$store.commit('updateSelectedTM', {
            selectedTMArr: arr
          });

          self.creatReport();
          self.actionshow=false;
        }
        this.isDirectCreat = false;
        if (key == 'manual') {
          this.selectMode = true;
          this.actionshow=false;
          this.actionText = '生成';
          this.isDirectCreat = true;
        }else if(key == 'add1'){
          // 追加列表前10个
          add(10);
        }else if(key == 'add2'){
          // 追加列表前15个
          add(15);
        }else if(key == 'create'){
          this.creatReport();
          this.actionshow=false;
        }
      },
      actionSheet(){
        dd.device.notification.actionSheet({
          title: "已手动添加的5条结果，会显示在报告最顶部", //标题
          cancelButton: '取消', //取消按钮文本
          otherButtons: ["手动添加","选择/追加当前列表前10条","直接生成"],
          onSuccess : function(result) {
            //onSuccess将在点击button之后回调
            /*{
                buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1
            }*/
          },
          onFail : function(err) {}
        });
      },
      finish (type) {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data;
          /*this.$http.post('', {img: data})
          .then(function(resp){

          })
          .catch(function(err){

          });*/
        })
      },
      uploadImg (e) {
        this.$router.go(-1);
        return;

        //上传图片
        var self = this;
        var file = e.target.files[0]
        if (!/\.(jpg|jpeg|png|PNG)$/.test(e.target.value)) {
           alert('图片类型必须是jpeg,jpg,png中的一种')
           return false
         }
        var reader = new FileReader()
        reader.onload = (e) => {
          self.img = '';
          self.convertImgToBase64(e.target.result, function(dataURL){
            self.$router.push('/imgCrop');
            self.$store.commit('changeAnotherImg', {
              anotherImg: dataURL
            });
          });
        }
        reader.readAsDataURL(file)
      },
      convertImgToBase64(url, callback) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
          var canvas = document.createElement('CANVAS');
          var ctx = canvas.getContext('2d');
          var dataURL;
          canvas.height = this.height;
          canvas.width = this.width;
          ctx.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL('image/jpeg', 0.5);
          callback(dataURL);
          img = null;
          canvas = null;
        };
        img.src = url;
      },
      //生成报告
      getReport(){
        this.actionshow = true;
      },
      //真正生成报告
      creatReport(){
        var self = this;
        if (!self.getSelectedItems().length) {
          self.showTip = true;
          return;
        }
        var resultList = this.resultList;
        var infoIdList = [];
        var regCodeList = [];
        resultList.forEach((item, i) => {
          if (item.isAdded) {
            infoIdList.push(item.id);
            regCodeList.push(item.category_id);
          }
        });
        var data = {
          content: encodeURIComponent(this.content),
          companyName: this._agentName,
          cate_id: this.cate_id,
          info_idList: infoIdList.join(),
          reg_codeList: regCodeList.join()
        }
        console.log(data);
        this.loading2 = true;
        self.actionshow=false;
        this.$http.post(wxUrl + '/bzgapi/makereportToUrl', qs.stringify(data))
        .then((resp)=>{
          console.log(resp)
          this.loading2 = false;
          var resp = resp;
          if (resp.url) {
            this.$store.commit('updateSelectedTM', {
              selectedTMArr: []
            });
            this.$router.push({name: 'pdfPreview', query:{pdfUrl: resp.url}});
          }else{
            alert('导出报告异常！')
          }
          //self.reConfig(function(){
            /*const dd = dingtalk.apis;
            dingtalk.error(function(error){
            });
            dingtalk.ready(function(){
              const dd = dingtalk.apis;
              dd.biz.cspace.saveFile({
                corpId: self._corpid,
                url: resp.url,
                name: resp.fileName,
                onSuccess: function(data) {
                  //文件预览
                  dd.biz.cspace.preview({
                      corpId: data.data[0].corpId,
                      spaceId: data.data[0].spaceId,
                      fileId: data.data[0].fileId,
                      fileName:data.data[0].fileName,
                      fileSize:data.data[0].fileSize,
                      fileType:data.data[0].fileType,
                      onSuccess: function() {
                        //无，直接在native显示文件详细信息
                      },
                      onFail: function(err) {
                        // 无，直接在native页面显示具体的错误
                      }
                  });
                },
                onFail: function(err) {
                  //alert(JSON.stringify(err));
                }
              });
            });*/
          //});
        })
        .catch((error)=>{
          this.loading2 = false;
        })
        //location.href = rootUrl + '/bzgapi/makereport?'+ qs.stringify(data);
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .img_search_result {
    .search_top_wrap{
      position: fixed;top: 0;left: 0;width: 100%;z-index: 2;
      .serach_top{
        height: px(100);padding-top: px(8);border-bottom:1px solid #E4E4E4;background-color: #fff;
        .s_img{
          float: left;width: px(84);height: px(84);margin-left:px(30);position: relative;border-radius: px(4);text-align: center;vertical-align: middle;display: table-cell;vertical-align: middle;border: 1px solid #e4e4e4;overflow: hidden;
          img{max-width: px(84);max-height: px(84);}
          p{position: absolute;left: 0;bottom:0;background-color: rgba(0,0,0,0.6);color: #fff;font-size: px(18);height: px(32);line-height: px(32);width: 100%;text-align: center;-webkit-text-size-adjust:none;}
        }
        >span{
          float: left;margin-left: px(20);margin-top:px(21);color:#999;font-size: px(30);line-height: px(42);
          b{color: #3DB1FA;font-weight: normal;}
        }
        .action{float: right;padding-right: px(30);line-height: px(84);color:#3DB1FA;}
      }
    }
  }
</style>
