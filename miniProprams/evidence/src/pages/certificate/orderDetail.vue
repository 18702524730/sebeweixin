<template>
  <div class="order_detail">
    <img src="~assets/img/deposit/fileImage.png" alt="">
    <p class="money">{{amount}}</p>
    <p class="name mt30">{{OrderDetailsData.orderName}}</p>
    <div class="lists">
      <div class="row-between">
        <p>单价</p>
        <div>
          <p class="number">x{{OrderDetailsData.paymentNumber}}</p>
          <p class="price mt10">￥{{amount}}</p>
        </div>
      </div>
    </div>
    <div class="lists mt15">
      <div class="row-between">
        <p>支付方式</p>
        <div>
          <p class="price_first">{{OrderDetailsData.payment_name}}</p>
        </div>
      </div>
      <div class="row-between">
        <p>订单号</p>
        <div>
          <p class="price_first">{{OrderDetailsData.order_fictitious_sn}}</p>
        </div>
      </div>
      <div class="row-between">
        <p>服务单号</p>
        <div>
          <p class="price_first service">{{OrderDetailsData.order_sn}}</p>
        </div>
      </div>
      <div class="row-between">
        <p>下单时间</p>
        <div>
          <p class="price_first">{{createTime}}</p>
        </div>
      </div>
      <div class="row-between">
        <p>支付时间</p>
        <div>
          <p class="price_first">{{paymentTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Filters from '../../utils/filters.js';
export default {
  data () {
    return {
    }
  },
  mounted(){
    console.log(this.OrderDetailsData)
  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  computed:{
    ...mapState('auth', ['OrderDetailsData']),
    
    paymentTime () {
      return Filters.filters.dateFormat(this.OrderDetailsData.payment_time);
    },
    createTime () {
      return Filters.filters.dateFormat(this.OrderDetailsData.create_time);
    },
    amount () {
      return Filters.filters.priceformat(this.OrderDetailsData.amount);
    },
  },
}
</script>

<style lang="scss">
.order_detail{position: absolute;top:0;left:0;right:0;bottom:0;background-color:#fff;text-align:center;
  >img{width:138px;height:138px;border-radius:138px;margin:30px auto 0;}
  p{color:#333;}
  .money{font-size:46px;margin-top: 38px;}
  .name{font-size:36px;margin-bottom: 90px;}

  .lists{border-bottom:1px solid #eee;width:690px;margin:0 auto;
    p{line-height:100%;}
    >div{height:72px;
      >p{font-size:34px;color:#909090;}
      >div{text-align:right;height:72px;
        .number{font-size:24px;color:#909090;}
        .price{font-size:34px;color:#333;}
        .price_first{font-size:34px;color:#333;line-height:72px;}
        .price_first.service{color:#22aaf9;}
      }
    }
    
  }
}

</style>
