<template>
<div class="list_info">
  <div class="tab weui-flex" :class="{'boxShow':scrollY}">
    <div class="ml30 mr30 weui-flex__item" :class="{'bdc':orderState == 99}" @click="orderStateChange(99)">全部</div>
    <div class="weui-flex__item mr30" :class="{'bdc':orderState == 0}" @click="orderStateChange(0)">待付款</div>
    <div class="weui-flex__item mr30" :class="{'bdc':orderState == 1}" @click="orderStateChange(1)">已付款</div>
    <div class="weui-flex__item mr30" :class="{'bdc':orderState == -1}" @click="orderStateChange(-1)">已关闭</div>
  </div>
  <div style="height:47px;"></div>
  <scroll-view :scroll-y="true" v-if="dataLists && dataLists.length&&loading" upper-threshold @bindscrolltoupper="scrollT" @bindscroll="scrollT" @bindscrolltolower="addLists" :scroll-top="indexTop">
    <div v-for="(item,index) in dataLists" :key="index" @click="goDetail(item)">
      <div class="single_info" :class="{'mt20' : index == 0}" style="box-sizing:border-box;">
        <div class="info_top info_time weui-flex">
          <div class="weui-flex__item time">昵称：{{item.nickName}}</div>
          <div v-if="item.orderState == 0" class="pay_state noPay">待付款</div>
          <div v-if="item.orderState == 1" class="pay_state paySuc">已付款</div>
          <div v-if="item.orderState == -1" class="pay_state payNull" @click.stop="removeList(item)"><img src="~assets/img/order/waste.png" alt=""><span>已关闭</span></div>
        </div>
        <div class="info_mid weui-flex mt10" v-if="item.serviceList.length==1">
          <img  class="mr30" :src="item.serviceList[0].orderBsImage" alt="">
          <div class="info_l weui-flex__item">{{item.serviceList[0].orderBsName}}</div>
        </div>
        <div class="info_mid weui-flex mt10" v-if="item.serviceList.length>1">
          <img v-for="(info,$index) in item.serviceList" :key="$index" v-if="$index < 4"  class="mr30" :src="info.orderBsImage" alt="">
        </div>
        <div class="info_num weui-flex mt25 mr20">
          <div class="timer ml20">{{item.createTime}}</div>
          <div class="weui-flex__item order_list" :class="{'order_list_no':item.orderState == 0}">
            共{{item.serviceNumber}}项服务&nbsp;{{orderState==0?'合计':'实付金额'}}：<p>￥{{item.orderAmount}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom_gif row-center" v-if="gifInfo">
      <text>加载中...</text>
    </div>

    <div class="footer mb30" v-if="nullInfo">到底啦~</div>
  </scroll-view>
  <!-- 没订单 -->
  <div class="null_single" v-if="!dataLists.length&&loading">
    <img class="portrait" src="~assets/img/store/emptyImg.png">
    <div class="txt mb40">您还没有相关订单</div>
  </div>
  <u-modal :showModal="showModal" :showTitle="true" :title="'确认删除订单？'" :content="'订单删除之后无法恢复'" :options="options" @confirmBtn="confirmFn" @hide="hideFn" />
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  export default{
  data(){
    return{
      nullInfo: false,
      gifInfo: false,
      pgIndex: 1,
      orderState: 99,
      dataLists:[],
      pgCount: 10,
      scrollY: false,
      indexTop:0,
      scrollH:0,
      orderType:1,
      total:0,
      loading:false,
      options: {
        confirmText: '确认',
        confirmColor: '#4272FF'
      },
      showModal:false,
      orderFictitiousSn:''
    }
  },
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    // to doing..
    console.log('下拉刷新')
    this.search()
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  // 上拉加载，拉到底部触发
  onReachBottom() {
    // 到底部在这里需要做什么事情
    let pageAll = this.total / this.pgCount;
    if(this.pgIndex >= pageAll) {
      this.loading = true;
      this.nullInfo=true;
      this.gifInfo = false;
      return;
    } 
    this.pgIndex += 1;
    this.nullInfo=false;
    this.gifInfo = true;
    this.search()
    console.log('上拉加载',this.pgIndex)
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=10",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  methods: {
    // 隐藏弹窗
    hideFn () {
      this.showModal = false;
    },
    // 弹窗回调
    async confirmFn (data) {
      if (data) {
        try {
          let resp = await this.API.order.deleteOrder({orderFictitiousSn:this.orderFictitiousSn});
          this.search()
        }
        catch (e) {
        }
      }
      else{
        console.log('取消回调')
      }
      this.showModal = false;
    },
    removeList(item){//删除关闭订单
      this.showModal = true;
      this.orderFictitiousSn = item.orderFictitiousSn
    },
    goDetail(item) {
      this.$router.push({path: '/pages/order/orderDetails?orderFictitiousSn='+item.orderFictitiousSn});
    },
    scrollT(e){
      console.log(e.detail)
      if(e.detail.scrollTop > 10){
        this.scrollY = true;
      }else{
        this.scrollY = false;
      }
      this.$apply();
    },
    async search(){//初始化
      let self = this;
      let data = {
        orderState:this.orderState,
        pgIndex:this.pgIndex,
        pgCount:this.pgCount
      }
      try {
        let resp = await this.API.order.orderList(data);
        this.loading = true;
        this.total = resp.totalElements;
        self.gifInfo = false;
        if(this.pgIndex == 1){
          self.dataLists = resp.elements;
          return;
        }
        for(var i = 0; i < resp.elements.length; i++){
          self.dataLists.push(resp.elements[i]);
        }
      }
      catch (e) {
        if(self.pgIndex > 1){
          self.pgIndex -= 1;
        }
        this.gifInfo = false;
      }
    },
    orderStateChange(state) {//切换大类初始化
      this.orderState = state;
      this.pgIndex = 1;
      this.nullInfo=false;
      this.loading = false;
      wx.pageScrollTo({
        scrollTop: 0
      })
      console.log(this.orderState)
      this.search();
    },
 
  },
  onShow(){
    this.orderType = this.$root.$mp.query.type;
    this.orderState = this.orderType?this.orderType - 1:99;
    this.search()
  },
  computed:{
    dataListInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return this.dataLists.forEach((item) => {
          item.createTime = Filters.filters.dateFormat(item.createTime);
          item.orderAmount = Filters.filters.priceformat(item.orderAmount);
        })
      },
      set (value) {
      }
    },
  }

}
</script>
