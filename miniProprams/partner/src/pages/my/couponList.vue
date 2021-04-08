<template>
<div class="list_info">
  <div class="tab weui-flex" :class="{'boxShow':scrollY}">
    <div class="ml30 mr30 weui-flex__item" :class="{'bdc':orderState == 0}" @click="orderStateChange(0)">未使用</div>
    <div class="weui-flex__item mr30" :class="{'bdc':orderState == 1}" @click="orderStateChange(1)">已使用</div>
    <div class="weui-flex__item mr30" :class="{'bdc':orderState == -1}" @click="orderStateChange(-1)">已过期</div>
    <!-- <div class="weui-flex__item mr30" :class="{'bdc':orderState == -1}" @click="orderStateChange(-1)">已关闭</div> -->
  </div>
  <div style="height:47px;"></div>
  <scroll-view :scroll-y="true" v-if="dataLists.length" upper-threshold @bindscrolltoupper="scrollT" @bindscroll="scrollT" @bindscrolltolower="addLists" :scroll-top="indexTop">
    <div class="couponItemWrap" v-for="(item, index) in dataLists" :key="index">
      <div class="couponTop">
        <div class="couponLeft">
          <div :class="item.couponStatus != '-1' ? 'sbq'+item.couponType : 'sxq'">
            <p>
              <span class="money">{{item.couponType === 2 ? '￥' : ''}}</span>{{item.couponType === 1 ? item.couponAmount*100 : item.couponAmount}}<span>{{item.couponType === 1 ? '%' : ''}}</span></p>
            <div>{{item.productType === 1 ? '全场通用' : '部分可用'}}</div>
          </div>
        </div>
        <div class="couponRight" :class="{ 'hasUse': item.couponStatus == 1 || item.couponStatus == 2, 'invalid': item.couponStatus == -1 }">
          <div class="title">
            <a :class="['q' + item.couponType, item.couponStatus == -1 ? 'use' : '']">{{item.couponTypeName}}</a>
            <p :class="platform == 'ios' ? 'ios' : ''">{{item.couponName}}</p>
          </div>
          <div class="time">
            <p>{{item.startTime + '-' + item.endTime}}</p>
            <a @click="handleClickUse" :class="['q' + item.couponType, platform == 'ios' ? 'ios' : '']" v-if="item.couponStatus == 0">立即使用</a>
          </div>
          <div class="des" @click="showDetail(item)">
            <p>{{!item.state ? item.productType == 2 ? '仅限于' + item.productNameRange : item.productNameRange : '详情如下'}}</p>
            <i class="icon iconfont icon-jiantou " :class="[item.state ? 'icon-s' : 'icon-x', '']" ></i>
          </div>
        </div>
      </div>
      <div class="couponBot" v-if="item.state">{{item.productType == 2 ? '仅限于' + item.productNameRange : item.productNameRange}}</div>
    </div>

    <div class="bottom_gif row-center" v-if="gifInfo">
      <text>加载中...</text>
    </div>

    <div class="footer mb30 mt30" v-if="nullInfo">到底啦~</div>
  </scroll-view>
  <!-- 没订单 -->
  <div class="null_single" v-if="!dataLists.length&&loading">
    <img class="portrait" src="~assets/img/store/emptyImg.png">
    <div class="txt mb40">暂无优惠券信息</div>
  </div>
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
      orderState: 0,
      dataLists:[],
      platform: 'android', // 手机平台
      pgCount: 6,
      scrollY: false,
      indexTop:0,
      scrollH:0,
      total:0,
      loading:false
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
  onShow(){
  },
  mounted () {
    this.pgIndex = 1;
    this.orderState = 0;
    this.search()
    wx.getSystemInfo({
      success: res => {
        this.platform = res.platform;
        console.log('infoPhone', res, res.platform)
      }
    })
  },
  methods: {
    // 展开详情
    showDetail (item) {
      this.dataLists.forEach(it => {
        if (it.ticketNo !== item.ticketNo) {
          it.state = false
        }
      })
      item.state = !item.state
    },
    handleClickUse () {
      wx.switchTab({url: '/pages/index/store'});
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
    async search(){
      let data = {
        type: this.orderState,
        pgIndex: this.pgIndex,
        pgCount: this.pgCount
      }
      try {
        let resp = await this.API.my.findprofitCoupon(data);
        this.loading = true;
        this.total = resp.totalElements;
        resp.elements.map(item => {
          item.state = false;
          switch (item.couponType) {
            case 1: item.couponTypeName = '升润券'; break;
            case 2: item.couponTypeName = '提佣券'; break;
          }
        });
        this.gifInfo = false;
        if(this.pgIndex == 1){
          this.dataLists = resp.elements;
        } else {
          this.dataLists = this.dataLists.concat(resp.elements)
        }
      }
      catch (e) {
        if(this.pgIndex > 1){
          this.pgIndex -= 1;
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
  computed:{
    dataListInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return this.dataLists.forEach((item) => {
          if (item.applicableTimeStart) { 
            item.startTime = item.applicableTimeStart.toString().slice(0, 10); 
            item.startTime = item.startTime.split('-').join('.')
          }
          if (item.applicableTimeEnd) { 
            item.endTime = item.applicableTimeEnd.slice(0, 10);
            item.endTime = item.endTime.split('-').join('.')
          }
        })
      },
      set (value) {
      }
    },
  }

}
</script>
<style lang="scss">
.couponItemWrap{padding: 0 20px;margin-top: 20px;
  .couponTop{display: flex;box-shadow:0px 2px 8px 0px rgba(0,0,0,0.05);position: relative;z-index: 10;
    .couponLeft{width: 240px;height: 196px;
      >div{text-align: center;padding: 38px 0 26px;height: 196px;
        &.sbq2{background: url('~assets/img/coupon/redBg.png') no-repeat 0 0px;background-size: 240px 196px;}
        &.sbq1{background: url('~assets/img/coupon/yellowBg.png') no-repeat 0 0px;background-size: 240px 196px;}
        &.sxq{background: url('~assets/img/coupon/grayBg.png') no-repeat 0 0px;background-size: 240px 196px;}
        p{font-size: 80px;font-weight: 600;line-height: 80px;color: #fff;
          span{font-size: 30px;}
          .money{margin-right: -6px;}
        }
        div{font-size: 24px;font-weight: 500;color:#fff;line-height: 33px;transform: translateY(-12px);}
      }
    }
    .couponRight{flex-grow: 1;height: 196px;padding: 20px;background: #fff;overflow: hidden;
      .title{display: flex;
        a{display: block;height: 34px;line-height: 34px;width: 90px;text-align: center;font-size: 20px;color: #fff;border-radius: 17px;margin-top: 2px;text-decoration: none;}
        
        .q1{background:linear-gradient(313deg,rgba(255,156,59,1) 0%,rgba(255,192,82,1) 100%);}
        .q2{background:linear-gradient(133deg,rgba(255,124,124,1) 0%,rgba(255,64,64,1) 100%);}
        .use{background:rgba(189,189,189,1);}
        p{font-size: 26px;color: #333;line-height: 37px;font-weight: 600;padding-left: 10px;flex-grow: 1;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width: 340px;}
        .ios{line-height: 36px;transform: translateY(2px);}
      }
      .time{display: flex;padding: 25px 0 15px;border-bottom: 1px dashed #ddd;
        a{display: block;height: 40px;line-height: 40px;width: 118px;border-radius: 20px;font-size: 22px;text-align: center;text-decoration: none;}
        .q1{border: 1px solid #ff9700;color: #ff9700;}
        .q2{border: 1px solid #F64744;color: #F64744;}
        .ios{line-height: 36px;}
        p{flex-grow: 1;font-size: 22px;color: #666;line-height: 40px;}
      }
      .des{font-size: 20px;position: relative;
        p{white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width: 395px;color: #666;line-height: 28px;padding-top: 12px;}
        i{position: absolute;right: 0;width: 40px;height: 40px;text-align: center;line-height: 40px;top: 6px;color: #ddd;font-size: 20px;transition: all 0.3s;}
        .icon-x{transform: rotate(90deg);}
        .icon-s{transform: rotate(-90deg);}
      }
      &.invalid{background:#fff url('~assets/img/coupon/invalid.png') no-repeat 315px 0;background-size: 132px 116px;}
      &.hasUse{background:#fff url('~assets/img/coupon/hasUse.png') no-repeat 315px 0;background-size: 132px 116px;}
    }
  }
  .couponBot{padding: 16px 20px 20px;font-size: 24px;line-height: 40px;color: #333;background: url('~assets/img/coupon/desBg.png') repeat-y 0 0px;background-size: 750px 15px;box-shadow:0px 2px 8px 0px rgba(0,0,0,0.05);}
}
</style>
