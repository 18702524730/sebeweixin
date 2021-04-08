<template>
<div class="service_details">
  <div class="service_header" @click="toManage">
    <p class="header_tit">{{orderServiceState}}</p>
    <p class="header_time mt10">{{serviceStateTime}}</p>
  </div>
  <div class="service_info service">
    <div class="info_tit">
      <p class="order_num ml10">服务单号：{{detaildData.serviceOrderSn}}</p>
      <p class="order_num ml10 mt20">订单号：{{detaildData.orderSn}}</p>
      <p class="order_num ml10 mt20">下单时间：{{createTime}}</p>
    </div>
    <div class="order_data row-between mt30">
      <img :src="detaildData.servicePicture" alt="">
      <div>
        <p class="apply_name">{{detaildData.serviceName}}</p>
        <p>实付<span>：￥</span>{{payMoney}}</p>
      </div>
    </div>
  </div>
  <!-- 客户信息 -->
  <div class="info_list mt20 service">
    <p>商家信息</p>
    <div>
      <p class="mt20 ml10">联系人：<span :style="[{color:detaildData.partnerStore?'#333':'#999'}]">{{detaildData.partnerStore||'（空）'}}</span></p>
      <div class="row-between mt20" @click="callPhone(detaildData.partnerPhone)">
        <p class="ml10">手机号：<span :style="[{color:detaildData.partnerPhone?'#333':'#999'}]">{{detaildData.partnerPhone||'（空）'}}</span></p>
        <img class="mr10" src="~assets/img/order/phone.png" alt="">
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  export default{
  data(){
    return{
      detaildData:{},
      serviceNiceMin:'',
      orderId:'',
    }
  },
  onShow(){
    this.orderId = this.$root.$mp.query.orderId;
    this.search();
  },
  methods: {
    toManage(){//办理进展
        let data = {
          refundMoney:this.detaildData.payMoney,
          servicePicture:this.detaildData.servicePicture,
          serviceName:this.detaildData.serviceName
        }
        this.$storage.set('manageInfo',data);
      this.$router.push({path: '/pages/order/progressManager?orderId='+this.orderId});
    },
    callPhone(phone){//打电话
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    async search(){//初始化
      let data = {
        orderId:this.orderId
      }
      try {
        let resp = await this.API.order.findDetailForNonInfoClient(data);
        this.detaildData = resp;
        console.log(resp)
      }
      catch (e) {
      }
    }
  },
  computed:{
    jobType:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return Filters.filters.jobType(this.detaildData.orderCheckAccept)
      },
      set (value) {
        // 这里由于该计算属性被赋值，将被调用
        return Filters.filters.jobType(value)
      }
    },
    createTime () {
      return Filters.filters.dateFormat(this.detaildData.createTime)
    },
    serviceStateTime(){
      return Filters.filters.dateFormat(this.detaildData.serviceStateTime)
    },
    orderServiceState(){
      return Filters.filters.orderServiceState(this.detaildData.orderServiceState)
    },
    payMoney(){
      return Filters.filters.priceformat(this.detaildData.payMoney)
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.service_details{position: relative;
  .service_header{width:750px;height:320px;background:linear-gradient(90deg,rgba(69,155,248,1) 0%,rgba(47,128,246,1) 100%);text-align:center;
    p{color:#fff;}
    .header_type{width:200px;height:56px;border-radius:0px 56px 56px 0px;background-color:#2072e9;text-align:center;line-height:56px;font-size:$text-nm;position: absolute;top:20px;left:0;}
    .header_tit{font-size:36px;line-height:50px;padding-top: 65px;font-weight:bold;}
    .header_time{line-height:42px;color:#B9D5FF;font-size:$text-lg;}
  }
  .service{width:710px;border-radius:5px;box-shadow:0px 2px 4px 0px rgba(210,210,210,0.5);background-color:#fff;padding:26px 20px;margin-left: auto;margin-right:auto;
    >p{padding:0 10px;color:#333;font-size:$text-lg;line-height:42px;}
  }
  .service_info{margin-top:-100px;
    .info_tit{border-bottom:1px solid #eee;padding-bottom:27px;
      p{font-size:$text-sm;line-height:40px;}
      .order_num{color:#333;}
      .order_percentage{color:#FF9639;
        span{font-size:$text-xxs;}
        .num_money{font-weight:bold;font-size:$text-sm;}
      }
    }
    .order_data{width:670px;height:184px;background-color:#f9f9f9;padding:27px 25px;
      img{width:130px;height:130px;}
      div{width:460px;
        p{font-size:$text-nm;color:#333;line-height:40px;
          span{font-size:$text-xxs;}
        }
        .apply_name{line-height:37px;margin-bottom: 17px;}
      }

    }
  }
  .reg_info{
    .reg_list{padding:20px 10px 0 10px;border-top:1px solid #eee;
      p{line-height:130px;color:#333;font-size:$text-nm;
        span{color:#666;}
      }
      img{width:130px;height:130px;}
      .describe{line-height:42px;}
    }
  }
  .info_list{
    >p{border-bottom:1px solid #eee;padding-bottom:25px;}
    >div{
      p{font-size:$text-nm;line-height:40px;
        span{color:#666;}
      }
      >div{
        p{font-size:$text-nm;line-height:40px;}
        img{width:64px;height:64px;margin-top:-7px;}
      }
    }
    // 商标类别
    .cls{padding:25px 10px;border-bottom:1px solid #eee;
      .cls_l{line-height:37px;color:#666;font-size:$text-sm;}
      .cls_r{line-height:37px;color:#999;font-size:$text-xs;}
    }
    .cls_list{
      p{color:#999;font-size:$text-sm;line-height:37px;padding:0 10px;}
    }
  }
  .mb_footer{margin-bottom: 130px;}
  .btn_footer{width:750px;height:96px;position: fixed;bottom:0;left:0;
    div{width:100%;
      p{width:50%;height:100%;font-size:$text-xl;text-align:center;line-height:96px;}
      .btn_l{background-color:#fff;color:#2F80F6;}
      .btn_r{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color:#fff;}
    }
    >p{width:100%;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color:#fff;height:100%;font-size:$text-xl;text-align:center;line-height:96px;}
  }
  .divH{height:120px;width:100%;display:block;}
}
</style>
