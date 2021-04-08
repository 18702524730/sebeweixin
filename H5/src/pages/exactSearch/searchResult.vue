<template>
  <div class="exact_search_result" @click="">
    <div class="search_top_wrap" :style="{top: '-'+ scrollH + 'px'}">
      <div class="serach_top" ref="serach_top">
        <div class="searchbox" :style="{'marginRight': actionText == '生成'? '2.5rem' : '4.5rem'}">
          <div class="search_type_list">
            <span @click="showSearchType=!showSearchType">{{searchTypeName}} <i class="fa" :class="{'fa-caret-down':!showSearchType,'fa-caret-up':showSearchType}" aria-hidden="true"></i></span>
            <ul :class="{hidden:!showSearchType}">
              <li v-for="it in searchTypeData" @click="selectSearchType(it)">{{it.name}}</li>
            </ul>
          </div>
          <input type="text" name="content" v-model="content" @click="editContent">
          <span v-if="numFound"><b>{{numFound}}</b>条结果</span>
        </div>
        <span class="action" @click="action">{{actionText}}</span>
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
  import { mapState, mapMutations, mapActions } from 'vuex'
  import qs from 'qs'
  import $ from 'jquery'
  //import dingtalk from 'weex-dingtalk';
  import searchCondition from 'components/searchCondition'
  import searchResult from 'components/searchResult'
  import { ToastPlugin ,Swiper, SwiperItem ,XDialog, Alert ,TransferDomDirective as TransferDom, Loading } from 'vux';
  import { Actionsheet,querystring  } from 'vux';
  const rootUrl = CONFIG.rootUrl;
  const wxUrl = CONFIG.wxUrl;
  const cartUrl = CONFIG.cartUrl;
  const indexUrl =  CONFIG.indexUrl;
  const rows = 15;
  export default {
    directives: {
      TransferDom
    },
    components: {
        searchResult,searchCondition,
        Actionsheet,
        Swiper, SwiperItem,XDialog,ToastPlugin,Loading, Alert
    },
    data () {
      return {
        actionText: '生成报告',
        scrollH: 0, //头部的top值
        loading: true,
        loading2: false,
        showTip:false,
        once: true,
        searchTypeData:[
          {
            id:1,
            name:'商标名称'
          },
          {
            id:2,
            name:'商标注册号'
          },
          {
            id:3,
            name:'申请人名称'
          },
          {
            id:4,
            name:'代理人名称'
          }
        ],
        showSearchType: false,
        searchTypeName: '商标名称',
        search_type: 1,
        content:'',
        cate_id:'',
        sort_name:'',
        numFound:0,
        noMoreData: false,
        selectMode: false, //列表可选择模式
        actionshow: false, //是否显示生成报告选择列表
        resultList:[], //搜索结果数据集
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
        isDirectCreat: false
      }
    },
    mounted () {
      var self = this;
      this.content = this.$route.query.content;
      this.search_type = this.$route.query.search_type;
      this.searchTypeName = this.$route.query.searchTypeName;
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
      ...mapMutations('main', [
        'updateSelectedTM',
        'changeImg'
      ]),
      selectSearchType(item){
        this.search_type = item.id;
        this.searchTypeName = item.name;
        this.showSearchType = false;
      },
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
      editContent(){
        this.$router.push({
          name:'exactSearch',
          query: {
            content: this.content,
            search_type: this.search_type,
            searchTypeName: this.searchTypeName
          }
        });
      },
      query(data){
        var page = 1;
        var isLoadMore = false;
        var isRefresh = false;
        var callback = function(){
        };
        if (data) {
          this.content = data.content || this.content;
          this.status = data.status === undefined ? this.status : data.status;
          this.cate_id = data.cate_id === undefined ? this.cate_id : data.cate_id;
          this.sort_name = data.sort_name === undefined ? this.sort_name : data.sort_name;
          page = data.start || 1;
          isLoadMore = data.isLoadMore || false;
          isRefresh = data.isRefresh || false;
          callback = data.callback;
        }

        //console.log(data && data.data)
        var ret = {
          search_type: this.search_type,
          content: encodeURIComponent(this.content),
          cate_id: this.cate_id,
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
        this.$http.post(wxUrl + '/bzgapi/precise', qs.stringify(ret))
        .then((resp)=>{
          this.loading2 = false;
          console.log(resp)
          var data = resp;
          this.numFound = data.numFound
          var docs = data.docs;
          docs.forEach((item, i) => {
            item.showRight = '';
            item.isAdded =false;
          })
          if (isLoadMore) {
            this.resultList = [].concat(this.resultList, resp.docs);
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
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
           alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
           return false
         }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.$router.push('/');
          this.changeImg({
            img: e.target.result
          });
          //this.crop.img = e.target.result
        }
        reader.readAsDataURL(file)
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
            this.updateSelectedTM({
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
  .exact_search_result {
    .search_top_wrap{
      position: fixed;top: 0;left: 0;width: 100%;z-index: 2;
      .serach_top{
        height: px(101);padding:px(15) px(24);border-bottom:1px solid #E4E4E4;background-color: #fff;position: relative;
        .searchbox{
          width: auto;height: px(70);background: #eee;border-radius: px(6);color:#999;position: relative;
          .search_type_list{
            position: relative;max-width: px(210);height: px(56);line-height: px(42);padding-top: px(14);display: inline-block;
            span{
              padding-left: px(20);font-size: px(30);color: #666;height: px(42);
              i.fa{margin-left: px(10);color: #737373;}
            }
            ul{
              position: absolute;top: px(66);left: 0;width: px(210);border: 1px solid #E4E4E4;border-radius: px(6);background-color: #fff;z-index: 5000;
              li{height: px(70);line-height: px(70);font-size: px(28);color: px(66);padding-left:px(20);border-bottom: 1px solid #E4E4E4; }
              li:hover{background-color: #eee;}
              li:last-child{border-bottom: 0;}
            }
          }
          input{height: px(42);line-height: px(42);width: px(320);padding-left: px(10);border:0;background-color: transparent;font-size: px(30);vertical-align: top;margin-top: px(14);}
          >span{
            position: absolute; right:px(16); top:0;height: px(42);line-height: px(42);margin-top: px(14);font-size: px(30);background: #eee;padding-left: 2px;
            b{color:#3DB1FA;font-weight: normal;}
          }
        }
        span.action{position: absolute; top:px(15); right:px(24);line-height: px(70);color: #3DB1FA;font-size: px(30);}
      }
    }
  }
</style>
