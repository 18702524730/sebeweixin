<template>
<div class="list_info">
  <div class="tab weui-flex" :class="{'boxShow':scrollY}">
    <div class="ml30 mr30 weui-flex__item" :class="{'bdc':status == -1}" @click="statusChange(-1)">全部</div>
    <div class="weui-flex__item mr30" :class="{'bdc':status == -2}" @click="statusChange(-2)">待处理</div>
    <div class="weui-flex__item mr30" :class="{'bdc':status == 0}" @click="statusChange(0)">退款中</div>
    <div class="weui-flex__item mr30" :class="{'bdc':status == 2}" @click="statusChange(2)">退款完成</div>
  </div>
  <div style="height:47px;"></div>
  <scroll-view :scroll-y="true" v-if="dataLists && dataLists.length" upper-threshold @bindscrolltoupper="scrollT" @bindscroll="scrollT" @bindscrolltolower="addLists" :scroll-top="indexTop">
    <div v-for="(item,index) in dataLists" :key="index" @click="toDetails(item)">
      <div class="single_info" :class="{'mt20' : index == 0}" style="box-sizing:border-box;">
        <div class="info_top info_time weui-flex">
          <div class="weui-flex__item time">{{item.createTime}}</div>
          <div v-if="item.refundState == -1" class="pay_refund noPay">待处理</div>
          <div v-if="item.refundState == 0" class="pay_refund noPay">退款中</div>
        </div>
        <div class="info_mid weui-flex mt10">
          <img class="mr30" :src="item.servicePicture" alt="">
          <div class="info_l weui-flex__item">{{item.serviceName || item.applyName}}</div>
        </div>
        <div class="info_num mt20 mr20 row-between">
          <div class="ml20 order_list">退款金额：<span>￥</span><p>{{item.refundMoney}}</p></div>
          <div v-if="item.refundState == -1">
            <button @click.stop="refuseRefund(item)">拒绝退款</button>
            <button class="ml30" @click.stop="agreeRefund(item)">同意退款</button>
          </div>
          <img v-if="item.refundState == 2" src="~assets/img/order/refundSuc.png" alt="">
          <img v-if="item.refundState == 3" src="~assets/img/order/refundErr.png" alt="">
        </div>
      </div>
    </div>
    <div class="bottom_gif row-center" v-if="gifInfo">
      <text>加载中...</text>
    </div>

    <div class="footer mb30" v-if="nullInfo">到底啦~</div>
  </scroll-view>
  <!-- 没订单 -->
  <div class="null_single" v-if="!dataLists.length&&!loading">
    <img class="portrait" src="~assets/img/store/emptyImg.png">
    <div class="txt mb40">您还没有相关退款单</div>
  </div>
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  export default{
  data(){
    return{
      loading:true,
      nullInfo: false,
      gifInfo: false,
      pgIndex: 1,
      pgCount:10,
      status: -1,
      dataLists: [],
      scrollY: false,
      indexTop:0,
      total:0
    }
  },
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    // 停止下拉刷新
    this.pgIndex = 1;
    this.search();
    wx.stopPullDownRefresh();
  },

  // 上拉加载，拉到底部触发
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    let pageAll = this.total / this.pgCount;
    if(this.pgIndex >= pageAll) {
      this.loading = false;
      this.nullInfo = true;
      this.gifInfo = false;
      return;
    } 
    this.pgIndex += 1;
    this.gifInfo = true;
    this.search()
    console.log('上拉加载')
  },
  onShow(){
    this.search();
  },
// 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=11",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  methods: {
    refuseRefund(item){//拒绝退款
      this.$storage.set('refundInfo',item);
      this.$router.push({path: '/pages/order/orderRefundReject?refundId='+item.refundId});
    },
    async agreeRefund(item){//同意退款
      let data = {
        refundId:item.refundId
      }
      try {
        let resp = await this.API.order.agreeRefund(data);
        this.search();
        console.log(resp)
      }
      catch (e) {
        this.search();
      }
    },
    toDetails(item){
      this.$router.push({path: '/pages/order/orderRefundDetail?refundId='+item.refundId});
    },
    statusChange(index){//状态切换
      this.status = index;
      this.pgIndex = 1;
      this.nullInfo=false;
      wx.pageScrollTo({
        scrollTop: 0
      })
      this.search();
    },
    async search(){//初始化
      let data = {
        refundState:this.status,
        pgIndex:this.pgIndex,
        pgCount:this.pgCount
      }
      let self = this;
      try {
        let resp = await this.API.order.findRefundList(data);
        this.loading = false;
        this.total = resp.totalElements;
        self.gifInfo = false;
        if(this.pgIndex == 1){//第一页，刷新，状态改变直接赋值
          self.dataLists = resp.elements;
          return;
        }
        for(var i = 0; i < resp.elements.length; i++){//翻页，添加值数组后面
          self.dataLists.push(resp.elements[i]);
        }
        console.log(resp)
      }
      catch (e) {
      }
    },
    scrollT(e){//监听滚动事件，判断顶部显示样式
      console.log(e.detail)
      if(e.detail.scrollTop > 10){
        this.scrollY = true;
      }else{
        this.scrollY = false;
      }
      this.$apply();
    },
 
  },
  computed:{
    dataListInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return this.dataLists.forEach((item) => {
          item.createTime = Filters.filters.dateFormat(item.createTime);
          item.refundMoney = Filters.filters.priceformat(item.refundMoney);
        })
      },
      set (value) {
      }
    },
  }
}
</script>
