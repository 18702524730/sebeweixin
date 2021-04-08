<template>
<div class="detail_info">
  <div class="detail_tit mb40" v-if="dataDetails" :class="{'bgc01':dataDetails.orderState==0,'bgc02':dataDetails.orderState==1,'bgc03':dataDetails.orderState==-1}">
    <div class="title_info">
      <p class="to_my" @click="toHome">返回我的</p>
      <p class="pay_state" :class="{'pay_state_mt':dataDetails.orderState == -1}">
        <img v-if="dataDetails.orderState == 0" class="mr10" src="~assets/img/order/timer.png" alt="">
        <img v-if="dataDetails.orderState == 1" class="mr10" src="~assets/img/order/successFff.png" alt="">
        <img v-if="dataDetails.orderState == -1" class="mr10" src="~assets/img/order/errorFff.png" alt="">
        {{dataDetails.orderState == 0 ? '待付款' : dataDetails.orderState == 1 ? '已付款' : dataDetails.orderState == -1 ? '订单已关闭' : '--'}}
      </p>
      <p v-if="dataDetails.orderState > -1" class="pay_money mt10"><span class="pay_text" v-if="dataDetails.orderState == 0">待付</span><span class="pay_text">金额：</span><span>￥</span>{{orderAmount}}</p>
      <p v-if="dataDetails.orderState == 0" class="pay_time mt10">支付剩余：{{residueTime}}</p>
      <p v-if="dataDetails.orderState == 1" class="pay_time pay_time_c mt10">支付时间：{{orderPaymentTime}}</p>
      <img v-if="dataDetails.orderState == 0" class="mr10" src="~assets/img/order/order01.png" alt="">
      <img v-if="dataDetails.orderState == 1" class="mr10" src="~assets/img/order/order03.png" alt="">
      <img v-if="dataDetails.orderState == -1" class="mr10" src="~assets/img/order/order02.png" alt="">
    </div>
    <div class="info_tit" :class="{'pb_120':dataDetails.orderState == 0}">
      <div class="order_info">
        <p class="order_txt">订单信息</p>
        <p class="info_list mt20"><span>下单时间：</span>{{createTime}}<span v-if="!createTime" style="color:#999;">（空）</span></p>
        <p class="info_list mt20"><span>订单编号：</span>{{dataDetails.orderFictitiousSn}}<span v-if="!dataDetails.orderFictitiousSn" style="color:#999;">（空）</span></p>
        <p class="info_list mt20" v-if="!dataDetails.memberDTO.orderMessage"><span>我的留言：</span><span v-if="!dataDetails.memberDTO.orderMessage" style="color:#999;">（空）</span></p>
        <p class="info_list mt20" v-if="dataDetails.memberDTO.orderMessage" :class="{'over_info':allMsg&&dataDetails.memberDTO.orderMessage.length>50}"><span>我的留言：</span>{{dataDetails.memberDTO.orderMessage}}</p>

        <p class="info_more mt20" v-if="allMsg&&dataDetails.memberDTO.orderMessage&&dataDetails.memberDTO.orderMessage.length>50" @click="allMsg = false">展示完整留言<i class="icon ml5 iconfont icon-xiaochengxu-3"></i></p>
        <p class="info_more mt20" v-if="!allMsg&&dataDetails.memberDTO.orderMessage&&dataDetails.memberDTO.orderMessage.length>50" @click="allMsg = true">收起留言<i class="icon ml5 iconfont icon-xiaochengxu-"></i></p>
      </div>

      <div class="order_info mt20">
        <p class="order_txt row-between">客户信息
          <img src="~assets/img/order/phone.png" alt="" @click="callPhone(dataDetails.memberDTO.memberPhone)">
        </p>
        <p class="info_list mt20"><span>企业名称：</span>{{dataDetails.memberDTO.companyName}}<span v-if="!dataDetails.memberDTO.companyName" style="color:#999;">（空）</span></p>
        <p class="info_list mt20"><span>联系人：</span>{{dataDetails.memberDTO.applyName}}<span v-if="!dataDetails.memberDTO.applyName" style="color:#999;">（空）</span></p>
        <div class="row-between">
          <p class="info_list mt20"><span>手机号：</span>{{dataDetails.memberDTO.memberPhone}}<span v-if="!dataDetails.memberDTO.memberPhone" style="color:#999;">（空）</span></p>
        </div>
      </div>
      <div class="order_info mt20 mb20" v-if="dataDetails.serviceList">
        <p class="order_txt" style="border-bottom:0;">服务信息</p>
        <div class="service_list mb20" v-for="(item,index) in dataDetails.serviceList" :key="index" @click="toServiceDetails(item)">
          <div class="row-between order_bgc mb20">
            <img mode="scaleToFill" :src="item.orderBsImage" alt="">
            <div class="ml30">
              <p class="name">{{item.orderBsName}}</p>
              <p class="mt15"><span>￥</span>{{item.orderAmount||0}}</p>
            </div>
          </div>
          <div class="coupon">
            <p :class="{'coupon_nopay':dataDetails.orderState == 0}">收益：<span>{{item.orderBsCommissionRate}}</span><span v-if="item.additionalProfit>0">（含{{item.additionalProfit}}用券收益）</span></p>
            <!-- 信息化时候显示办理状态，非信息化显示服务状态 -->
            <p class="mt10">状态：<span>{{item.orderBsCode == 'sbfw_gnsb_zs' ? item.orderFeedbackState : item.orderServiceState}}</span></p>
          </div>
        </div>

        <div class="order_footer">
          <div class="row-between footer_top mb20">
            <p class="coupon_name">订单总额</p>
            <p>¥{{orderAmount}}</p>
          </div>
          <div class="row-between footer_top mb20">
            <p class="coupon_name">优惠金额</p>
            <p>¥0.00</p>
          </div>
          <div class="row-between footer_top mb20">
            <p class="coupon_name">服务收益</p>
            <p :class="{'coupon_earnings':dataDetails.orderState == 0}">{{dataDetails.orderState == 0 ? '+' : ''}}¥{{ allProfit || '0.00' }}</p>
          </div>
          <div class="row-between footer_top mb20">
            <p class="coupon_name">用券收益</p>
            <p :class="{'coupon_earnings':dataDetails.orderState == 0}">{{dataDetails.orderState == 0 ? '+' : ''}}¥{{dataDetails.additionalProfit?allAdditionalProfit:'0.00'}}</p>
          </div>
          <div class="row-between footer_top">
            <p class="coupon_name">合计收益</p>
            <p>¥{{ AllBsCommissionRate }}</p>
          </div>
          <div class="footer_btm row-between" v-if="dataDetails.orderState > 0 || dataDetails.orderState == -1">
            <p>用户已付款：</p>
            <p>
              <span class="sum_flag">￥</span>
              <span v-if="dataDetails.orderState != -1" class="sum">{{orderAmount}}</span>
              <span v-if="dataDetails.orderState == -1" class="sum">--</span>
            </p>
            
          </div>
        </div>
      </div>
    </div>
    <!-- 新增按钮 -->
    <div class="btn_footer" v-if="dataDetails.orderState == 0">
      <div class="row-between">
        <p class="btn_l">应付总额：<span class="symbol">￥</span><span class="num">{{orderAmount}}</span></p>
        <p class="btn_r" @click="payVisible = true">确认支付</p>
      </div>
      <!-- <p @click="toHome">返回我的</p> -->
    </div>
  </div>
  <!-- 没订单 -->
  <div class="null_single" v-if="!dataDetails">
    <img class="portrait" src="~assets/img/store/emptyImg.png">
    <div class="txt mb40">您还没有相关订单</div>
  </div>
  <!-- 支付弹框 -->
      <div class="transition_up" v-if="payVisible" :class="{'show_animation': payVisible}">
        <div class="mask_bg"  @click="payVisible = false"></div>
        <div class="transition_wrap">
          <div class="shareTitle">请选择支付方式</div>
          <div class="shareIcon">
            <button class="user" @click="selfPay">
              <img src="~assets/img/icon/payIcon.png" alt="">
              <p>自己支付</p>
            </button>
            <div class="circle" @click="goPayCard">
              <img src="~assets/img/icon/wxPayIcon.png" alt="">
              <p>客户支付</p>
              <h5>{{!!payState ? '（支持对公支付）' : ''}}</h5>
            </div>
          </div>
          <span @click="closePayDia">×</span>
        </div>
      </div>
</div>
</template>
<script>
  import Filters from '../../utils/filters.js';
  import mixin from 'mixins/';
  import md5 from 'js-md5';
  export default{
  mixins: [mixin],
  data(){
    return{
      allMsg:true,
      payVisible: false,
      payState: true, // 对公支付状态，二次支付不支持对公支付，隐藏对公支付文字
      dataDetails:{
        memberDTO:{
          orderMessage:''
        },
        serviceList:[]
      },
      orderFictitiousSn:'',
      timer:'',
      doubleClickState: false,
      residueTime:"0天0小时0分0秒",
      AllOrderBsCommissionRate:0//总服务收益
    }
  },
  onHide(){
    clearInterval(this.timer)
  },
  onUnload(){
    console.log('离开当前页面')
    clearInterval(this.timer);
  },
  methods: {
    // 关闭支付弹框
    closePayDia () {
      this.payVisible = false;
    },
    // 自己支付
    async selfPay (type) {
      if (this.doubleClickState) {
        return;
      }
      this.doubleClickState = true;
      this.payVisible = false;
      let orderSn = this.orderFictitiousSn;
      let paymentSn = this.dataDetails.paymentSn;
      this.wechatPay(orderSn, paymentSn, () => {
        this.doubleClickState = false;
        this.search();
        // wx.reLaunch({url: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}&paymentSn=${paymentSn}`});
      }, () => {
        this.doubleClickState = false;
        // this.search();
        // wx.reLaunch({url: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}&paymentSn=${paymentSn}`});
      });
    },
    // 客户支付
    goPayCard () {
      this.payVisible = false;
      let orderSn = this.orderFictitiousSn;
      if (this.dataDetails.orderBuyerId) {
        wx.reLaunch({url: `/pages/valetOrder/placeUrl?orderFictitiousSn=${orderSn}&md5=${md5(orderSn)}`});
      } else {
        wx.reLaunch({url: `/pages/valetOrder/placeUrl?orderFictitiousSn=${orderSn}`});
      }
    },
    toHome(){
      wx.switchTab({ url: '../index/my'})
    },
    pushSingle(){//跳转订单链接
      this.$router.push({
        path: '/pages/valetOrder/placeUrl',
        query: {
          orderFictitiousSn: this.orderFictitiousSn,
          path: 'pages/store/parterOrder', //用于二维码生成传参path
        }
      });
    },
    toServiceDetails(item){//服务详情页
      if(!this.dataDetails.orderState){
        return;
      }
      this.$router.push({path: '/pages/serviceOrder/orderDetail?orderId='+item.orderId});
    },
    callPhone(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    async search(){//初始化
      let self = this;
      let data = {
        orderFictitiousSn:this.orderFictitiousSn,
      }
      try {
        let resp = await this.API.order.orderDetails(data);
        console.log(resp)
        this.AllOrderBsCommissionRate = 0;
        resp.serviceList.forEach((info)=>{
          self.AllOrderBsCommissionRate += info.orderBsCommissionRate;
        })
        this.dataDetails = resp;
        console.log('dataDetails', this.dataDetails)
        if(this.dataDetails.orderState == 0){
          if (this.dataDetails.orderBuyerId) {
            this.payState = true
          } else {
            this.payState = false
          }
          console.log('paystate', this.payState)
          this.timer = setInterval(function(){
            // console.log('测试')
            resp.leftTime -= 1000;
            self.ShowCountDown(resp.leftTime);
          },1000);
        }
      }
      catch (e) {
      }
    },
    ShowCountDown(leftTime){
      let leftsecond = parseInt(leftTime/1000);
      let dayFirst=Math.floor(leftsecond/(60*60*24));
      let hour=Math.floor((leftsecond-dayFirst*24*60*60)/3600);
      let minute=Math.floor((leftsecond-dayFirst*24*60*60-hour*3600)/60);
      let second=Math.floor(leftsecond-dayFirst*24*60*60-hour*3600-minute*60);
      this.residueTime = dayFirst+"天"+hour+"小时"+minute+"分"+second+"秒";
      // console.log(this.residueTime)
    }
  },
  mounted(){
    this.payVisible = false;
    this.payState = true;
    this.orderFictitiousSn = this.$root.$mp.query.orderFictitiousSn;
    this.search()
    console.log(this.$root.$mp.query)
  },
  computed:{
    dataListInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return this.dataDetails.serviceList.forEach((item) => {
          item.orderAmount = Filters.filters.priceformat(item.orderAmount);
          item.orderBsCommissionRate = Filters.filters.priceformat(item.orderBsCommissionRate);
          item.orderBsCommissionRate = Filters.filters.priceformat(item.orderBsCommissionRate);
          item.additionalProfit = Filters.filters.priceformat(item.additionalProfit);
          // item.orderFeedbackState = Filters.filters.worksState(item.orderFeedbackState);
          item.orderServiceState = Filters.filters.orderServiceState(item.orderServiceState);
        })
      },
      set (value) {
      }
    },
    createTime () {
      return Filters.filters.dateFormat(this.dataDetails.createTime)
    },
    orderAmount () {
      return Filters.filters.priceformat(this.dataDetails.orderAmount)
    },
    allOrderBsCommissionRate () {
      return Filters.filters.priceformat(this.dataDetails.orderBsCommissionRate)
    },
    allAdditionalProfit () {
      return Filters.filters.priceformat(this.dataDetails.additionalProfit)
    },
    orderPaymentTime () {
      return Filters.filters.dateFormat(this.dataDetails.orderPaymentTime)
    },
    allProfit(){
      return Filters.filters.priceformat((this.dataDetails.orderBsCommissionRate - this.dataDetails.additionalProfit)||0)
    },
    AllBsCommissionRate(){
      return Filters.filters.priceformat(this.AllOrderBsCommissionRate)
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.detail_info{height:100%;
  .bgc01{background:linear-gradient(90deg,rgba(246,140,140,1) 0%,rgba(242,165,79,1) 100%);
    .to_my{color:#FF9639}
  }
  .bgc02{background:linear-gradient(90deg,rgba(123,216,168,1) 0%,rgba(92,192,191,1) 100%);
    .to_my{color:#5CC0BF}
  }
  .bgc03{background:linear-gradient(103deg,rgba(213,213,213,1) 0%,rgba(183,183,183,1) 100%);
    .to_my{color:#666}
  }
  .detail_tit{width:100%;height:320px;position: relative;
    .title_info{padding:35px 40px 30px;position: relative;
      .to_my{width:136px;height:60px;background-color:#fff;font-size:24px;text-align:center;line-height:60px;position: absolute;top:30px;right:0;border-radius:30px 0 0 30px;z-index: 100;}
      .pay_state_mt{margin-top:56px;}
      .pay_state{font-size:36px;color:#fff;line-height: 50px;font-weight:bold;
        img{width:42px;height:42px;vertical-align:middle;margin-top:-8px;}
      }
      .pay_money{font-size:36px;color:#fff;line-height:50px;
        span.pay_text{font-size:30px;}
        span{font-size:26px;}
      }
      .pay_time{line-height: 37px;color:#ffeee6;font-size:26px;
        &.pay_time_c{color:#BDFFEA;}
      }
      >img{width:229px;height:305px;position: absolute;top:40px;right:26px;}
    }
    .pb_120{padding-bottom: 120px;}
    .info_tit{position: absolute;left:20px;top:220px;}
    .over_info{height:120px;overflow: hidden;}
    .order_info{width:710px;background:#fff;box-shadow:0px 2px 4px 0px rgba(210,210,210,0.5);
    border-radius:5px;padding:20px 30px 30px;
      .order_txt{line-height:40px;padding-bottom: 20px;font-size:28px;border-bottom:1px solid #eee;font-weight:bold;
        img{width:50px;height:50px;}
      }
      .service_list{background-color:#f9f9f9;
        >p{text-align:right;font-size:$text-sm;color:#999;line-height:37px;
          .iconfont{vertical-align: middle;font-size:20px;color:#999;margin-top:-2px;}
        }
      }
      .order_bgc{width:650px;max-height:180px;padding: 30px 30px 0;
        img{width:130px;height:130px;}
        div{width:460px;min-height:130px;
          p.name{font-weight:normal;height:80px;}
          p{line-height:40px;font-size:$text-nm;color:#333;font-weight:bold;
            span{font-size:$text-xs;}
          }
        }
      }
      .coupon{width:630px;margin:0 auto;border-top:1px solid #eee;padding-bottom:30px;padding-top:20px;
        p{font-size:26px;color:#333;line-height:37px;padding-left: 20px;
          span{color:#666;}
        }
        .coupon_nopay{
          span{color:#F64744;}
        }
      }
      .info_list{line-height:40px;font-size:26px;color:#666;
        span{color:#333;}
      }
      img{width:64px;height:64px;}
      .info_more{text-align:center;color:#999;font-size:$text-sm;line-height:37px;
        .iconfont{font-size:34px;color:#999;margin-top:-18px;}
        span{margin-left:5px;vertical-align:middle;}
      }
      .order_footer{padding-top: 10px;
        .footer_top{
          p{font-size:$text-nm;color:#666;line-height:40px;}
          .coupon_name{color:#333;font-size:26px;}
          .coupon_earnings{color:#F64744;}
        }
        .footer_btm{border-top:1px solid #eee;padding-top:20px;
          p,span{font-size:$text-lg;color:#000;line-height:42px;}
          .sum_flag{font-size:28px;color:#F64744;}
          .sum{font-size:36px;color:#F64744;}
        }
      }
    }

    .btn_footer{width:750px;height:96px;position: fixed;bottom:0;left:0;
      div{width:100%;
        p{height:100%;font-size:$text-xl;text-align:center;line-height:96px;}
        .btn_l{background-color:#fff;color:#000;font-size:28px;width:450px;text-align:left;padding-left: 20px;
          span{color:#F64744;}
          .symbol{font-size:28px;}
          .num{font-size:34px;font-weight:600;}
        }
        .btn_r{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color:#fff;width:300px;}
      }
      >p{width:100%;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color:#fff;height:100%;font-size:$text-xl;text-align:center;line-height:96px;}
    }
  }
  .transition_up {
    position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 8999;
    .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;}
    .transition_wrap {
      position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;text-align: center;
      .shareTitle{color: #333;font-size: 32px;line-height: 45px;padding: 60px 0 40px;text-align: center;}
        .shareIcon{display: flex;padding-left: 130px;
          >div, >.user{font-size: 0;padding: 0 65px;border: none;
            img{height: 120px;width: 120px;}
            p{font-size: 30px;color:#333;line-height: 42px;padding: 20px 0 10px;}
            h5{font-size: 24px;line-height: 33px;color:#999;padding-bottom: 90px;}
          }
        }
        >span{position: absolute;width: 90px;height: 90px;line-height: 90px;font-size: 60px;right: 0;z-index: 1002;top: 0;color: #ddd;}
    }
  }
  .show_animation {
    .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
    .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
  }

}

</style>
