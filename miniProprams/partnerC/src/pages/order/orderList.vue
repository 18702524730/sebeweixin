<template>
<div class="list_info">
  <div class="tab weui-flex" :class="{'boxShow':scrollY}">
    <div class="ml30 mr30 weui-flex__item" :class="{'bdc':orderState == 99}" @click="orderStateChange(99)">全部</div>
    <div class="weui-flex__item mr30" :class="{'bdc':orderState == 0}" @click="orderStateChange(0)">待付款</div>
    <div class="weui-flex__item mr30" :class="{'bdc':orderState == 1}" @click="orderStateChange(1)">已付款</div>
    <div class="weui-flex__item mr30" :class="{'bdc':orderState == -1}" @click="orderStateChange(-1)">已关闭</div>
  </div>
  <div style="height:47px;"></div>
  <scroll-view :scroll-y="true" v-if="dataLists && dataLists.length && loading" upper-threshold @bindscrolltoupper="scrollT" @bindscroll="scrollT" @bindscrolltolower="addLists" :scroll-top="indexTop">
    <div v-for="(item,index) in dataLists" :key="index">
      <div class="single_info" :class="{'mt20' : index == 0}" style="box-sizing:border-box;" @click="goDetail(item)">
        <div class="info_top info_time weui-flex">
          <div class="weui-flex__item time">订单号：{{item.orderFictitiousSn}}</div>
          <div v-if="item.orderState == 2" class="pay_state noConfirm">待确认</div>
          <div v-if="item.orderState == 0" class="pay_state noPay">待付款</div>
          <div v-if="item.orderState == 1" class="pay_state paySuc">已付款</div>
          <div v-if="item.orderState == -1" class="pay_state payNull">已关闭</div>
        </div>
        <div class="info_mid weui-flex mt10" v-if="item.serviceList.length==1">
          <img  class="mr30" :src="item.serviceList[0].orderBsImage" alt="">
          <div class="info_l weui-flex__item">{{item.serviceList[0].orderBsName}}</div>
        </div>
        <div class="info_mid weui-flex mt10" v-if="item.serviceList.length>1">
          <img v-for="(info,$index) in item.serviceList" :key="$index" v-if="$index < 4"  class="mr30" :src="info.orderBsImage" alt="">
        </div>
        <div class="info_num mt25 mr20">
          <div v-if="item.orderState > -1">共{{item.serviceNumber}}项服务&nbsp;实付金额：<span>￥</span>{{item.orderAmount}}</div>
          <div v-if="item.orderState == -1">共{{item.serviceNumber}}项服务</div>
          <button class="mt20" v-if="item.orderState == 0">立即付款</button>
        </div>
      </div>
    </div>
    <div class="bottom_gif row-center" v-if="gifInfo">
      <text>加载中...</text>
    </div>

    <div class="footer mb30" v-if="nullInfo">到底啦~</div>
  </scroll-view>
  <!-- 没订单 -->
  <div class="null_single" v-if="!dataLists.length && loading">
    <img class="portrait" src="~assets/img/order/listNull.jpg">
    <div class="txt mb40">您还没有相关订单</div>
  </div>
</div>
</template>
<script>
  export default{
  data(){
    return{
      nullInfo: false,
      gifInfo: false,
      page: 1,
      orderState: 99,
      dataLists: [],
      totalsize: 1,
      init: false,
      scrollY: false,
      again:true,
      indexTop:0,
      scrollH:0,

      pgIndex:1,
      pgCount:10,
      total:0,
      loading:false
    }
  },
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    this.pgIndex = 1;
    this.search()
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  // 上拉加载，拉到底部触发
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    console.log('上拉加载')
    let pageAll = this.total / this.pgCount;
    // 判断是否为最后一页
    if(this.pgIndex >= pageAll) {
      this.nullInfo=true;
      this.gifInfo = false;
      return;
    }
    this.gifInfo = true;
    this.pgIndex += 1;
    this.search()
  },
  methods: {
    goDetail(item){//去详情
      this.$router.push({path: '/pages/order/orderDetails?orderFictitiousSn='+item.orderFictitiousSn});
    },
    // 页面滚动配置
    scrollT(e){
      console.log(e.detail)
      if(e.detail.scrollTop > 10){
        this.scrollY = true;
      }else{
        this.scrollY = false;
      }
      this.$apply();
    },
    orderStateChange(index){
      this.orderState = index;
      this.pgIndex = 1;
      this.loading = false;
      wx.pageScrollTo({
        scrollTop: 0
      })
      this.search()
    },
    async search(){//初始化
      let self = this;
      let data = {
        orderState:this.orderState,
        pgIndex:this.pgIndex,
        pgCount:this.pgCount
      }
      let resp = await this.API.order.orderList(data);
      this.loading = true;
      this.total = resp.totalElements;
      console.log(resp,'测试')
      self.gifInfo = false;
      if(resp.elements){//判断是否为空，避免报错
        if(this.pgIndex == 1){
          self.dataLists = resp.elements;
          return;
        }
        for(let i = 0; i < resp.elements.length; i++){
          self.dataLists.push(resp.elements[i]);
        }
      }
    }
  },
  mounted(){
    this.orderState = this.$root.$mp.query.orderState || 99;
    this.search();
  }
}
</script>
