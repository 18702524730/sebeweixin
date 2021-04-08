<template>
  <div class="common_search_condition">
    <div class="s_status" ref="s_status">
      <span :class="{cur: status==item.id}" @click="selectStatus(item)" v-for="item in statusData">{{item.name}}</span>
      <span class="filter_entra" @click="showCateIds=true">筛选</span>
    </div>

    <!-- 商标类别 45类 -->
    <div v-transfer-dom class="tm_type_status" :class="{tm_type_status_show:showCateIds}">
      <popup v-model="showCateIds" position="right">
        <div class="filter">
          <div class="filter_type">
            <h3>商标类别 <i class="fa" :class="{'fa-angle-up':!toggleCateType,'fa-angle-down':toggleCateType}" aria-hidden="true" @click="toggleCateType=!toggleCateType"></i></h3>
            <ul class="animated" :class="{hidden: toggleCateType}">
              <li :class="{active: selectCateIdArr.indexOf(item.id)!==-1}" v-for="item in cateIdData" @click="selectCateId(item)"><span>{{item.id<10? '0'+item.id : item.id}} {{item.goodsname}}</span></li>
            </ul>
          </div>
          <div class="filter_type">
            <h3>商标状态 <i class="fa" :class="{'fa-angle-up':toggleStatus,'fa-angle-down':!toggleStatus}" aria-hidden="true" @click="toggleStatus=!toggleStatus"></i></h3>
            <ul class="animated" :class="{hidden: toggleStatus}">
              <li :class="{active: status===item.id}" v-for="item in statusFilterData" @click="selectStatus(item, true)"><span>{{item.name}}</span></li>
            </ul>
          </div>
        </div>
      </popup>
      <div class="action_bt">
        <button class="reset" @click="resetSelf('selectCateIdArr')">重置</button><button class="query" @click="showCateIds=false">完成</button>
      </div>
    </div>

    <!-- 筛选 商标状态 -->
    <!-- <div v-transfer-dom class="tm_type_status" :class="{tm_type_status_show:showStatus}" @touchmove.prevent>
      <popup v-model="showStatus" position="right">
        <div class="filter">
          <div class="filter_type">
            <h3>商标状态 <i class="fa" :class="{'fa-angle-up':toggleStatus,'fa-angle-down':!toggleStatus}" aria-hidden="true" @click="toggleStatus=!toggleStatus"></i></h3>
            <ul class="animated" :class="{hidden: toggleStatus}">
              <li :class="{active: status==item.id}" v-for="item in statusFilterData" @click="selectStatus(item, true)"><span>{{item.name}}</span></li>
            </ul>
          </div>
        </div>
      </popup>
      <div class="action_bt">
        <button class="reset" @click="resetSelf('status')">重置</button><button class="query" @click="showStatus=false">完成</button>
      </div>
    </div> -->
  </div>
</template>

<script>
  import qs from 'qs'
  //import $ from 'jquery'
  import Data from 'src/utils/data.js' //右侧筛选商品类别
  import { ToastPlugin ,Swiper, SwiperItem ,XDialog, Alert ,TransferDomDirective as TransferDom, Loading } from 'vux';
  import { Actionsheet, Popup, Spinner } from 'vux';
  const cartUrl = CONFIG.cartUrl;
  const indexUrl =  CONFIG.indexUrl;
  //头部筛选状态数据
  const statusData = [
    {
      id: 1,
      name: '待审中'
    },
    {
      id: 3,
      name: '已驳回'
    },
    {
      id: 4,
      name: '已初审'
    },
    {
      id: 2,
      name: '已注册'
    }
  ];
  //右侧筛选状态数据
  const statusFilterData = [
    {
      id: 1,
      name: '待审中'
    },
    {
      id: 3,
      name: '已驳回'
    },
    {
      id: 4,
      name: '已初审'
    },
    {
      id: 2,
      name: '已注册'
    },
    {
      id: 0,
      name: '已销亡'
    }
  ];

  export default {
    directives: {
      TransferDom
    },
    components: {
      Actionsheet,Popup,Spinner,
      Swiper, SwiperItem,XDialog,ToastPlugin,Loading, Alert
    },
    props:['isReset'],
    data () {
      return {
        selectCateIdArr:[],
        toggleCateType: false,
        toggleStatus: false,
        statusData:statusData,
        statusFilterData:statusFilterData,
        status:'',
        sort_name:'',
        showCateIds: false,
        cateIdData: Data.cateIdData,
        showStatus: false,
        page: 0
      }
    },
    mounted () {

    },
    methods: {
      resetSelf(name){
        this[name] = name === 'selectCateIdArr' ? [] : '';
        this.query();
      },
      reset(){
        this.status = '';
        this.selectCateIdArr = [];
        this.sort_name = '';
      },
      query(data){
        if (!data) {
          this.page = 1;
        }
        data = data || {};
        /*this.showStatus=false;
        this.showCateIds = false;*/
        this.$emit('conQuery', {
          status: this.status,
          cate_id: this.selectCateIdArr.join() || '',
          start: this.page,
          sort_name: this.sort_name,
          sort_type: 0,
          isLoadMore: data.isLoadMore || false,
          callback: data.callback,
          isRefresh: data.isRefresh || false
        });
      },
      selectStatus(item, isFilter){
        this.page = 1;
        this.status = this.status === item.id ? '' : item.id;
        /*if (isFilter) {
          return;
        }*/
        this.query();
      },
      selectCateId(item){
        //item.checked = !item.checked;
        var arr = this.selectCateIdArr;
        var idx = arr.indexOf(item.id);
        if (idx !== -1) {
          arr.splice(idx, 1);
        }else{
          arr.push(item.id);
        }
        this.query();
      },
    },
    watch:{
      sort_name(){
        this.page = 0;
        this.query();
      },
      showCateIds(){
        var body = document.getElementsByTagName("body")[0];
        if (this.showCateIds) {
          body.style.overflow = 'hidden';
        }else{
          body.style.overflow = 'auto';
        }
      },
      isReset(){
        if (this.isReset) {
          this.reset();
        }
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .common_search_condition {
    border-bottom:1px solid #f1f1f1;
    .s_status{
      display: flex;flex-direction: row;align-items: center;justify-content: space-between;width:100%;text-align: center;padding: px(30);height: px(97);background-color: #fff;
      span{height: px(37);line-height: px(37);font-size: px(26);color: #666;display: inline-block;margin: 0 px(5);border-radius: px(4)}
      span.cur{color:#3DB1FA;}
      .filter_entra{color: #3DB1FA;padding-right: px(32);background: #fff url(https://sebe360test.oss-cn-beijing.aliyuncs.com/FEA0B15B88A25583ADC66BCC251E7007.png) right center no-repeat;background-size: px(26) px(25);}
    }
	  .fixed{position:fixed;z-index:1000;top: 0;}
  }
  body .vux-popup-dialog{background-color: #fff;}
  .tm_type_status{
    .filter{
      left:0;top:0;bottom:auto;right: 0;width: px(634);background-color: #fff;padding-top: px(20);padding-bottom: px(90);
      .filter_type{
        padding-left: px(40);padding-bottom: px(20);
        h3{
          width:100%;font-size: px(32);color: #999;line-height: px(45);font-weight: normal;
          i{float: right;margin-right: px(30);font-size: px(42);color: #ddd;}
        }
        ul{
          width:100%;overflow:hidden;padding-top: px(20);padding-bottom: px(20);
          li{float: left;width: px(180);height: px(54);line-height: px(52);border:1px solid #eee;text-align:center;border-radius: px(6);margin-right: px(12);margin-bottom:px(12);background-color: #eee;color: #666;font-size: px(24);}
          li.active{border:1px solid #3DB1FA;color:#3DB1FA;background-color: #fff; }
        }
      }

    }
    .action_bt{
      width: px(634);position: fixed;right: -100%;bottom: 0;left:auto;z-index: 503;background-color: #fff;text-align: right;
      button{width: px(317);;height: px(90);line-height: px(90);text-align: center;font-size: px(32);display: inline-block;}
      .reset{color: #666;border-top: 1px solid #D9D9D9;}
      .query{color: #fff;background-image: linear-gradient(90deg, #337DFF 2%, #59AAFF 100%);}
    }
  }
  .tm_type_status_show{
    height: 100vh;
    /* 解决transform 影响子元素fixed的问题 */
    .action_bt{transition: right 300ms;right: 0;}
  }
</style>
