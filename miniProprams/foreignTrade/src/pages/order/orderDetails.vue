<template>
<div class="detail_info">
  <div class="detail_tit" :class="{'bgc01':dataDetails.orderState==0,'bgc02':dataDetails.orderState==1,'bgc03':dataDetails.orderState==-1}">
    <div class="title_info">
      <p class="pay_state" :class="{'pay_state_mt':dataDetails.orderState == -1}" @click="toStates">
        <img v-if="dataDetails.orderState == 0" class="mr10" src="~assets/img/order/timer.png" alt="">
        <img v-if="dataDetails.orderState == 1" class="mr10" src="~assets/img/order/successFff.png" alt="">
        <img v-if="dataDetails.orderState == -1" class="mr10" src="~assets/img/order/errorFff.png" alt="">
        {{dataDetails.orderState == 0 ? '待付款' : dataDetails.orderState == 1 ? '已付款' : dataDetails.orderState == -1 ? '订单已关闭' : '--'}}
      </p>

      <p v-if="dataDetails.orderState > -1" class="pay_money mt10"><span class="pay_txt">金额：</span><span>￥</span>{{orderAmount}}</p>

      <p v-if="dataDetails.orderState == 1" class="residue_time mt10">支付时间：{{orderPaymentTime}}</p>
      <p v-if="dataDetails.orderState == 0" class="pay_time mt10">支付剩余：{{residueTime}}</p>

      <img v-if="dataDetails.orderState == 0" class="mr10" src="~assets/img/order/order01.png" alt="">
      <img v-if="dataDetails.orderState == 1" class="mr10" src="~assets/img/order/order03.png" alt="">
      <img v-if="dataDetails.orderState == -1" class="mr10" src="~assets/img/order/order02.png" alt="">
    </div>

    <div class="info_tit">
      <div class="order_info">
        <p class="order_txt order_border pl10">订单信息</p>
        <p class="info_list mt20 pl10"><span>下单时间：</span>{{createTime}}<span v-if="!createTime" style="color:#999;">（空）</span></p>
        <p class="info_list mt20 pl10"><span>订单编号：</span>{{dataDetails.orderFictitiousSn}}<span v-if="!dataDetails.orderFictitiousSn" style="color:#999;">（空）</span></p>
      </div>

      <div class="order_info mt20 mb40">
        <div class="row-between shop_name">
          <p class="order_txt ml10">{{dataDetails.storeName}}的店</p>
          <div class="row-end" @click="callPhone(dataDetails.asistantPhone)">
            <img src="~assets/img/order/phone.png" alt="">
            <p class="ml10" >联系商家</p>
          </div>
        </div>
        <div class="service_list" v-for="(item,index) in dataDetails.serviceList" :key="index">
          <div class="row-between mt20">
            <p class="ml10 to_service">{{item.orderSn}}</p>
            <!-- 信息化 -->
            <p v-if="item.orderBsCode == 'sbfw_gnsb_zs'" class="ml10 to_service" @click.stop="toServiceDetailsT(item)">查看服务单<i class="iconfont detail icon-jiantou"></i></p>
            <!-- 非信息化 -->
            <p v-if="item.orderBsCode != 'sbfw_gnsb_zs'" class="ml10 to_service" @click.stop="toServiceDetailsF(item)">查看服务单<i class="iconfont detail icon-jiantou"></i></p>
          </div>

          <div class="row-between order_bgc mt20 mb30">
            <img mode="scaleToFill" :src="item.orderBsImage" alt="">
            <div class="ml30">
              <p>{{item.orderBsName}}</p>
              <p class="mt15"><span>￥</span>{{item.orderAmount}}</p>
            </div>
          </div>
          <div class="pay_type row-end mt30 mb30">
            <button v-if="item.orderState == 1&&(item.refundState == -1||item.refundState == undefined)" @click.stop="applyReund(item)">申请退款</button>
            <p v-if="item.refundState == 0">退款中</p>
            <p v-if="item.refundState == 2" class="success">退款成功</p>
            <p v-if="item.refundState == 3" class="err">退款失败</p>
          </div>
        </div>

        <div class="order_footer">
          <div class="row-between footer_top">
            <p>订单总额</p>
            <p>¥{{orderAmount}}</p>
          </div>
          <div class="row-between footer_top mt10 mb20">
            <p>优惠金额</p>
            <p>¥0.00</p>
          </div>
          <p class="footer_btm row-end">
            <span>实付价格：</span>
            <span class="sum_flag">￥</span>
            <span class="sum">{{orderAmount}}</span>
          </p>
        </div>
      </div>
      <button v-if="dataDetails.orderState == 0" class="ml10 mb40" @click="toPay">立即付款</button>
      <button v-else class="ml10 mb40" @click="toMy">返回我的</button>
    </div>
  </div>
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  import mixin from 'mixins/';
  export default{
    mixins: [mixin],
    data(){
      return{
        allMsg:true,
        dataDetails:{
          memberDTO:{
            orderMessage:''
          },
          serviceList:[]
        },
        residueTime: '',
        timer:''
      }
    },
    onUnload(){
      console.log('离开当前页面')
      clearInterval(this.timer)
    },
    methods: {
      toMy(){
        wx.switchTab({ url: '/pages/my/index'})
      },
      toPay() {//立即付款
        let { orderSn, paymentSn } = this.dataDetails;
        this.wechatPay(orderSn, paymentSn, () => {
          this.search();
        });
      },
      toServiceDetailsT(item){//服务单详情
        this.$router.push({path: '/pages/order/serviceOrderDetail?orderId='+item.orderId});
      },
      toServiceDetailsF(item){//服务单详情
        this.$router.push({path: '/pages/order/serviceOrderDetailF?orderId='+item.orderId});
      },
      applyReund(item){//申请退款
        let data =  Object.assign({memberPhone:this.dataDetails.asistantPhone},item)
        this.$storage.set('refundInfo',data);
        this.$router.push({path: '/pages/order/applyRefundOrder?orderId='+item.orderId});
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
          this.dataDetails = resp;
          if(this.dataDetails.orderState == 0){
            this.timer = setInterval(function(){
              resp.leftTime -= 1000;
              self.ShowCountDown(resp.leftTime);
            },1000);
          }
        }
        catch (e) {
        }
      },
      ShowCountDown(leftTime){//倒计时
        let leftsecond = parseInt(leftTime/1000);
        let dayFirst=Math.floor(leftsecond/(60*60*24));
        let hour=Math.floor((leftsecond-dayFirst*24*60*60)/3600);
        let minute=Math.floor((leftsecond-dayFirst*24*60*60-hour*3600)/60);
        let second=Math.floor(leftsecond-dayFirst*24*60*60-hour*3600-minute*60);
        this.residueTime = dayFirst+"天"+hour+"小时"+minute+"分"+second+"秒";
      }
    },
    onShow(){
      this.orderFictitiousSn = this.$root.$mp.query.orderFictitiousSn;
      this.search()
    },
    computed:{
      dataListInfo:{
        // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
        get () {
          return this.dataDetails.serviceList.forEach((item) => {
            item.orderAmount = Filters.filters.priceformat(item.orderAmount);
          })
        },
        set (value) {
        }
      },
      createTime () {
        return Filters.filters.dateFormat(this.dataDetails.createTime)
      },
      orderGoodsAmount () {
        return Filters.filters.priceformat(this.dataDetails.orderGoodsAmount)
      },
      discounts () {
        return Filters.filters.priceformat(this.dataDetails.orderGoodsAmount - this.dataDetails.orderAmount)
      },
      orderAmount () {
        return Filters.filters.priceformat(this.dataDetails.orderAmount)
      },
      orderPaymentTime () {
        return Filters.filters.dateFormat(this.dataDetails.orderPaymentTime)
      },

    }
  }
</script>
<style lang="scss">
@import "../../assets/css/variable";
.detail_info{padding-bottom: 50px;background-color:#f8f8f8;height:100%;
  .bgc01{background:linear-gradient(90deg,rgba(246,140,140,1) 0%,rgba(242,165,79,1) 100%);}
  .bgc02{background:linear-gradient(90deg,rgba(123,216,168,1) 0%,rgba(92,192,191,1) 100%);}
  .bgc03{background:linear-gradient(103deg,rgba(213,213,213,1) 0%,rgba(183,183,183,1) 100%);}
  .detail_tit{width:100%;height:320px;position: relative;
    .title_info{padding:30px 40px;position: relative;
      .pay_state_mt{margin-top:56px;}
      .pay_state{font-size:36px;color:#fff;line-height: 50px;
        img{width:42px;height:42px;vertical-align:middle;margin-top:-8px;}
      }
      .pay_money{font-size:36px;color:#fff;line-height:50px;
        span{font-size:$text-sm;}
        span.pay_txt{font-size:$text-lg;}
      }
      .residue_time{color:#BDFFEA;}
      .pay_time{line-height: 42px;color:#ffeee6;font-size:$text-lg;
        &.pay_time_c{color:#ffeee6;}
      }
      >img{width:229px;height:305px;position: absolute;top:40px;right:26px;}
    }
    .info_tit{position: absolute;left:20px;top:220px;}
    .over_info{height:120px;overflow: hidden;}
    .order_info{width:710px;background:#fff;box-shadow:0px 2px 4px 0px rgba(210,210,210,0.5);
    border-radius:5px;padding:24px 20px;
      .shop_name{padding-bottom:25px;
        >div{
          img{width:48px;height:48px;}
        }
      }
      .order_txt{line-height:42px;}
      .order_border{border-bottom:1px solid #eee;padding-bottom:25px;}
      .pl10{padding-left: 10px;}
      .service_list{border-top:1px solid #eee;
        .to_service{color:#999;line-height:37px;
          .iconfont{vertical-align: middle;font-size:$text-sm;color:#ddd;margin-top:-4px;}
        }
        .pay_type{width:100%;background-color:#fff;
          button{width:152px;height:50px;border-radius:50px;text-align:center;border:1px solid #ddd;font-size:$text-nm;color:#333;padding:0;background:#fff;}
          p{font-size:$text-nm;line-height:40px;color:#333;}
          p.success{color:#1EB62D;}
          p.err{color:#F64744;}
        }
      }
      .order_bgc{width:670px;background-color:#f9f9f9;padding: 24px 25px;
        img{width:130px;height:130px;}
        div{width:460px;
          div{
            p{line-height:40px;font-size:$text-nm;color:#333;
              span{font-size:$text-xs;}
            }
          }
        }
      }
      .info_list{line-height:40px;font-size:$text-sm;color:#666;
        span{color:#333;}
      }
      >img{width:64px;height:64px;}
      .info_more{text-align:center;color:#999;font-size:$text-sm;line-height:37px;
        span{margin-left:5px;vertical-align:middle;}
      }
      .order_footer{padding-top: 22px;padding-left:10px;
        .footer_top{
          p{font-size:$text-nm;color:#666;line-height:40px;}
        }
        .footer_btm{border-top:1px solid #eee;padding-top:20px;
          span{font-size:$text-lg;color:#333;line-height:42px;}
          .sum_flag{font-size:$text-sm;color:#2F80F6;}
          .sum{font-size:36px;color:#2F80F6;}
        }
      }
    }
  }
  button{width:690px;height:86px;background:linear-gradient(86deg,rgba(69,154,248,1) 0%,rgba(47,128,246,1) 100%);border-radius:5px;color:#fff;font-size:$text-lg;border:0;}
}

</style>
