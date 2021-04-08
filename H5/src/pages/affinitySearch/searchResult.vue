<template>
  <div class="affinity_search">
    <div class="search_top_wrap" :style="{top: '-'+ scrollH + 'px'}">
      <div class="serach_top" ref="serach_top">
        <div class="searchbox" :style="{'marginRight': actionText == '生成'? '3rem' : '5rem'}">
          <input type="text" name="content" v-model="content" @click="editContent">
          <span v-if="numFound"><b>{{numFound}}</b>条结果</span>
        </div>
        <span class="action" @click="action">{{actionText}}</span>
      </div>
      <search-condition @conQuery="query" :isReset="isReset"></search-condition>
    </div>
    <search-result :scrollH.sync="scrollH" @resetCondition="isReset=true" :selectMode="selectMode" :resultList="resultList" @queryList="query" :noMoreData="noMoreData" :loading="loading"></search-result>
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
  //import $ from 'jquery'
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
        pdfUrl:'',
        pdfImgsData:[],
        actionText: '生成报告',
        scrollH: 0, //头部的top值
        showTip:false, //用于生成报告时，提示是否有选择商标
        loading:true,//用于显示sebe logo 的loading
        loading2:false,//用于显示生成报告的loading
        content:'', //查询关键字
        cate_id:'', //商标类别id,以逗号分隔
        status: '', //状态
        sort_name:'',
        numFound: 0,//总条目
        isReset: false,
        noMoreData: false,//加载更多 是否没有数据了
        selectMode: false, //列表可选择模式
        actionshow: false, //是否显示生成报告选择列表
        resultList:[], //搜索结果数据集
        queryData:{}, //搜索条件数据集
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
      //设置标题
      //this.setTitle();
      //设置右导航
      /*this.setRight({
        show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        text: '生成报告',//控制显示文本，空字符串表示显示默认文本
      }, function(){
        var arr = self.getSelectedItems();
        self.menus[0].label = self.menus[0].label.replace(/\<b\>.*\<\/b\>/, '<b>'+arr.length+'</b>');
        self.actionshow = true;
      });*/
    },
    watch: {
      pdfUrl(){
        this.getPreviewImg(this.pdfUrl, 'pdfImgsData');
      }
    },
    methods: {
      ...mapMutations('main', [
        'updateSelectedTM',
      ]),
      //获取选中的条目
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

      //用于模拟点击“生成报告”按钮
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

      //点击输入框，路由到搜索页面
      editContent(){
        this.$router.push({name:'affinitySearch', query: {content: this.content}});
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

      //查询
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

        var ret = {
          content: encodeURIComponent(this.content),
          cate_id: this.cate_id,
          status: this.status,
          sort_name: this.sort_name,
          sort_type: 0,
          start: page,
          rows: rows
        }
        this.loading = true;
        if (!isLoadMore && !isRefresh) {
          this.loading2 = true;
        }
        this.$http.post(wxUrl + '/bzgapi/similar', qs.stringify(ret))
        .then((resp)=>{
          this.loading2 = false;
          var data = resp;
          this.numFound = data.numFound;
          var contentArr = this.content.split('');
          var docs = data.docs;
          docs.forEach((item, i) => {
            item.showRight = '';//用于判断是否显示右滑
            item.isAdded = false;//用于判断是否被勾选
            item.tm_name_temp = item.tm_name;
          })
          //高亮关键字 且不区分大小写
          docs.forEach((item, k) => {
            var tmName = item.tm_name_temp;
            var tmNameArr = tmName.split('');
            contentArr.forEach((str, i) => {
              tmNameArr.forEach((tm, j) => {
                if (tm == str.toUpperCase() || tm == str.toLowerCase()) {
                  tmNameArr[j] = '<b>'+tm+ '</b>';
                }
              });
            });
            item.tm_name_temp = tmNameArr.join('');
          });

          //是否是上拉加载更多
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
            //下拉刷新
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

      //重新config dingding 暂时没有用到
      /*reConfig(cb){
        this.$http.get(wxUrl+'/suitAuth?corpid='+this._corpid+'&appid='+this._appid+'&suiteKey='+this._suiteKey).then((resp) => {
          var _config = resp;
          this.e2 = _config;
          if (_config && _config.agentid) {
              dingtalk.config({
                  agentId : _config.agentid,
                  corpId : _config.corpId,
                  timeStamp : _config.timeStamp,
                  nonceStr : _config.nonceStr,
                  signature : _config.signature,
                  //jsApiList : ['biz.util.openLink', 'biz.navigation.setMenu', 'biz.telephone.call', 'biz.telephone.showCallMenu', 'biz.cspace.saveFile', 'biz.cspace.preview']
                  jsApiList : [ 'runtime.info', 'biz.contact.choose',
                            'device.notification.confirm', 'device.notification.alert',
                            'device.notification.prompt', 'biz.ding.post',
                            'biz.util.openLink', 'biz.navigation.setMenu' ,'biz.telephone.call' ,'biz.telephone.showCallMenu', 'biz.cspace.saveFile', 'biz.cspace.preview', 'biz.util.uploadImage']
              });
          }
          cb && cb();
        }).catch((error) => {
        })
      },*/

      //生成报告
      getReport(){
        this.actionshow = true;
      },

      getPreviewImg(pdf_url, dataName){
        this.$http.get(wxUrl + '/api/preview?pdf_url='+pdf_url)
        .then((response) => {
          this[dataName] = response.urls;
        })
        .catch((error) => {
          console.log(error)
        });
      },

      //点击“生成”，真正生成报告
      creatReport(){
        var self = this;
        if (!self.getSelectedItems().length) {
          self.showTip = true;
          return;
        }
        var selectedTMArr = this.$store.state.main.selectedTMArr;
        var infoIdList = [];
        var regCodeList = [];
        selectedTMArr.forEach((item, i) => {
          infoIdList.push(item.id);
          regCodeList.push(item.category_id);
        });
        var data = {
          content: encodeURIComponent(this.content),
          companyName: this._agentName,
          cate_id: this.cate_id,
          info_idList: infoIdList.join(),
          reg_codeList: regCodeList.join()
        }
        this.loading2 = true;
        self.actionshow=false;
        this.$http.post(wxUrl + '/bzgapi/makereportToUrl', qs.stringify(data))
        .then((resp)=>{
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
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .affinity_search {
    .search_top_wrap{
      position: fixed;top: 0;left: 0;width: 100%;z-index: 2;
      .serach_top{
        height: px(101);padding:px(15) 0;border-bottom:1px solid #E4E4E4;background-color: #fff;position: relative;
        .searchbox{
          width: auto;height: px(70);margin:0;margin-left:px(24);background: #eee url(~assets/img/affinitySearch/search_icon.png) px(10) center no-repeat;-webkit-background-size: px(40) px(40);border-radius: px(6);
          background-size: px(40) px(40);padding-left: px(70);color:#999;
          input{height: px(42);line-height: px(42);width: px(260);margin-top: px(13);border:0;background-color: transparent;font-size: px(30);overflow:hidden;color:#333;}
          span{
            float: right;margin-right: px(20);height: px(42);line-height: px(42);margin-top: px(14);font-size: px(30);
            b{color:#3DB1FA;font-weight: normal;}
          }
        }
        span.action{position: absolute; top:px(15); right:px(24);line-height: px(70);color: #3DB1FA;font-size: px(30);}
      }
    }
  }
  .weui-actionsheet{opacity: 0}
  .weui-actionsheet_toggle{opacity: 1}
  .weui-dialog__btn_primary{color: #3DB1FA;}
</style>
