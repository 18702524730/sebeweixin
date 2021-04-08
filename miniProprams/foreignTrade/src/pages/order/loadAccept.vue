<template>
<div class="list_info">
  <scroll-view :scroll-y="true" v-if="dataLists && dataLists.length&&loading">
  <!-- 其他服务状态 -->
    <div v-for="(item,index) in dataLists" :key="index" @click="toServiceDetail(item)">
      <div class="single_info" :class="{'mt20' : index == 0}" style="box-sizing:border-box;">
        <div class="info_top info_time">
          <div class="weui-flex service_list">
            <div class="weui-flex__item time">服务单编号：{{item.orderSn}}</div>
            <div v-if="item.feedbackState != '办理终止'" class="pay_state" :class="{'noPay':item.feedbackCode == 'sbfw_gnsb_zs_wait','paySuc':item.feedbackCode == 'sbfw_gnsb_zs_ing'}">{{item.feedbackState}}</div>
          </div>
        </div>
        <div class="info_mid weui-flex mt10">
          <img class="mr30" :src="item.servicePicture" alt="">
          <div class="weui-flex__item">
            <p>{{item.serviceName}}</p>
            <p class="pocket mt15">实付：￥<span>{{item.payMoney}}</span></p>
          </div>
        </div>
        <div class="row-end info_num weui-flex mt25 mr20" v-if="item.orderServiceState != 4">
          <p class="check_submit" v-if="item.orderCheckAccept == 2">已验收</p>
          <p class="null_submit" v-if="item.orderCheckAccept == 3">未验收</p>
          <button v-if="item.orderCheckAccept == 1" @click.stop="rejectSubmit(item)" class="reject mr20">拒绝验收</button>
          <button v-if="item.orderCheckAccept == 1" @click.stop="checkSubmit(item)">确认验收</button>
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
    <img class="portrait" src="~assets/img/store/emptyImg.jpg">
    <div class="txt mb40">您还没有相关服务</div>
  </div>
  <!-- 弹窗 -->
  <u-modal :showModal="showModal" :title="title" :content="content" :options="options" @confirmBtn="confirmFn" @hide="hideFn" />
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
      dataLists:[],
      totalsize: 1,
      init: false,
      scrollY: false,
      again:true,
      indexTop:0,
      scrollH:0,
      pgCount:10,
      total:0,

      showModal:false,
      options: {
        confirmText: '确定',
        confirmColor: '#4272FF'
      },
      content:'',
      title:'',
      acceptance:{},
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
    // 隐藏弹窗
    hideFn () {
      this.showModal = false;
    },
    // 弹窗回调
    async confirmFn (data) {
      let self = this;
      if (data) {
        try {
        let resp = await self.API.order.confirmServiceAccept(self.acceptance);
          self.pgIndex = 1;
          self.search();
        }
        catch (e) {}
        console.log('确定回调')
      }
      else{
        console.log('取消回调')
      }
      this.showModal = false;
    },
    rejectSubmit(item){//拒绝验收
      this.content = "您是否对服务不满意拒绝此次验收？";
      this.options = {
        showCancel:true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '拒绝',
        confirmColor: '#4272FF'
      }
      this.showModal = true;
      this.acceptance = {
        orderId:item.orderId,
        orderCheckAccept:3//确认验收为2，拒绝是3
      }
    },
    
    checkSubmit(item){//确认验收
      this.content = "服务确认验收后，交易款项将打至商家账户确认验收？";
      this.options = {
        showCancel:true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#4272FF'
      }
      this.showModal = true;
      this.acceptance = {
        orderId:item.orderId,
        orderCheckAccept:2//确认验收为2，拒绝是3
      }
    },
    toServiceDetail(item){//服务单详情
      if(item.orderBsCode != "sbfw_gnsb_zs"){//非信息化不进入详情页
        return;
      }
      console.log('服务单详情')
      this.$router.push({path: '/pages/order/serviceOrderDetail?orderId='+item.orderId});
    },
    async search(){//服务单列表
      let self = this;
      let data = {
        orderServiceState:4,
        pgIndex:this.pgIndex,
        pgCount:this.pgCount
      }
      try {
        let resp = await self.API.order.findServiceOrderList(data);
        this.loading = true;
        this.total = resp.totalElements;
        if(this.pgIndex == 1){
          self.dataLists = resp.elements;
          return;
        }
        for(var i = 0; i < resp.elements.length; i++){
          self.dataLists.push(resp.elements[i]);
        }
        self.gifInfo = false;
      }
      catch (e) {
        if(self.pgIndex > 1){
          self.pgIndex -= 1;
        }
        self.gifInfo = false;
      }
    },
  },
  mounted(){
    this.search()
  },
  computed:{
    dataListInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return this.dataLists.forEach((item) => {
          item.payMoney = Filters.filters.priceformat(item.payMoney);
        })
      },
      set (value) {
      }
    },
  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.service_list{
  p.pay_state{margin-top: -20px;}
}
</style>
