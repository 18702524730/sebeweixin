<template>
<div class="list_info">
  <div class="tab weui-flex" :class="{'boxShow':scrollY}">
    <div class="ml30 mr30 weui-flex__item" :class="{'bdc':feedbackState == 0}" @click="feedbackStateChange(0)">全部</div>
    <div class="weui-flex__item mr20" :class="{'bdc':feedbackState == 1}" @click="feedbackStateChange(1)">待服务</div>
    <div class="weui-flex__item mr20" :class="{'bdc':feedbackState == 2}" @click="feedbackStateChange(2)">服务中</div>
    <div class="weui-flex__item mr20" :class="{'bdc':feedbackState == 3}" @click="feedbackStateChange(3)">服务完成</div>
  </div>
  <div style="height:47px;"></div>
  <scroll-view :scroll-y="true" v-if="dataLists && dataLists.length&&loading">
  <!-- 其他服务状态 -->
    <div v-for="(item,index) in dataLists" :key="index" @click="toServiceDetail(item)">
      <div class="single_info" :class="{'mt20' : index == 0}" style="box-sizing:border-box;">
        <div class="info_top info_time">
          <!-- <p class="mb5">昵称：{{item.nickname}}</p> -->
          <div class="weui-flex service_list">
            <div class="weui-flex__item time">昵称：{{item.nickname}}</div>
            <!-- 信息化 -->
            <template v-if="item.orderBsCode == 'sbfw_gnsb_zs'">
              <div v-if="item.feedbackState != '办理终止'" class="pay_state" :class="{'noPay':item.feedbackCode == 'sbfw_gnsb_zs_wait','paySuc':item.feedbackCode == 'sbfw_gnsb_zs_ing'}">{{item.feedbackState}}</div>
              <div v-if="item.feedbackState == '办理终止'" class="pay_state payNull">办理终结</div>
            </template>
            <!-- 非信息化 -->
            <template v-if="item.orderBsCode != 'sbfw_gnsb_zs'">
              <div class="pay_state">{{item.orderServiceStateTxt}}</div>
            </template>
          </div>
        </div>
        <div class="info_mid weui-flex mt10">
          <img class="mr30" :src="item.servicePicture" alt="">
          <div class="weui-flex__item">
            <p>{{item.serviceName}}</p>
            <p class="pocket mt15">实付：￥{{item.payMoney}}</span></p>
            <div class="mt5">收益：￥{{item.percentage}}</p></div>
          </div>
        </div>
        <div class="info_num row-between mt20 mr20">
          <p class="ml20">作业类型：{{item.jobType == 0 ? '自行作业' : item.jobType == 1 ? '平台作业' : item.jobType == 2 ? '平台派单' : '--'}}</p>
          <p class="btn" @click.stop="callPhone(item)">联系客户</p>
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
    <div class="txt mb40">您还没有相关服务</div>
  </div>
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  export default{
  data(){
    return{
      loading:false,
      nullInfo: false,
      gifInfo: false,
      pgIndex: 1,
      feedbackState: 0,
      dataLists:[],
      totalsize: 1,
      init: false,
      scrollY: false,
      again:true,
      indexTop:0,
      scrollH:0,
      pgCount:10,
      pageReach:true,
      total:0
    }
  },
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    // to doing..
    console.log('下拉刷新')
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
    this.nullInfo=false;
    this.gifInfo = true;
    this.pgIndex += 1;
    this.search()
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=13",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  methods: {
    callPhone(item){
      wx.makePhoneCall({
        phoneNumber: item.orderBuyerPhone
      })
    },
    toServiceDetail(item){//服务单详情
      console.log('服务单详情')
      this.$storage.set("feedbackState", this.feedbackState);
      this.$router.push({path: '/pages/serviceOrder/orderDetail?orderId='+item.orderId});
    },
    feedbackStateChange(type){//切换大类初始化
      this.$storage.set("feedbackState", type);
      this.loading = false;
      this.feedbackState = type;
      this.pgIndex = 1;
      this.nullInfo=false;
      this.pageReach = true;
      wx.pageScrollTo({
        scrollTop: 0
      })
      this.search();
    },
    async search(){//服务单列表
      let self = this;
      let data = {
        orderServiceState:this.feedbackState,
        pgIndex:this.pgIndex,
        pgCount:this.pgCount
      }
      try {
        let resp = await self.API.order.findServiceOrderList(data);
        this.total = resp.totalElements;
        this.$storage.remove("feedbackState");
        self.loading = true;
        self.gifInfo = false;
        if(resp.elements){
          if(this.pgIndex == 1){
            self.dataLists = resp.elements;
            return;
          }
          for(let i = 0; i < resp.elements.length; i++){
            self.dataLists.push(resp.elements[i]);
          }
        }
      }
      catch (e) {
        if(self.pgIndex > 1){
          self.pgIndex -= 1;
        }
        self.gifInfo = false;
      }
    }
  },
  onShow(){
    this.feedbackState = this.$root.$mp.query.feedbackState?this.$root.$mp.query.feedbackState:this.$storage.get("feedbackState")?this.$storage.get("feedbackState"):0;
    this.search()
  },
  computed:{
    dataListInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        if(this.dataLists&&this.dataLists.length){
          return this.dataLists.forEach((item) => {
            item.payMoney = Filters.filters.priceformat(item.payMoney);
            item.percentage = Filters.filters.priceformat(item.percentage);
            if(item.orderServiceState){
              item.orderServiceStateTxt = Filters.filters.orderServiceState(item.orderServiceState);
            }
          })
        }
      },
      set (value) {
      }
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
</style>
