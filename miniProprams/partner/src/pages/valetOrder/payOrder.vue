<template>
  <div class="payWrap">
    <div @click="selfPay">自己支付</div>
    <div @click="goPayCard">客户支付</div>
  </div>
</template>

<script>
import mixin from 'mixins/';
export default {
  mixins: [mixin],
  data () {
    return {

    }
  },

  methods: {
    // 确认订单
    async selfPay (type) {
      let orderSn = this.$route.query.orderSn;
      let paymentSn = this.$route.query.paymentSn;
      this.wechatPay(orderSn, paymentSn, () => {
        this.submitDisabled = false;
        this.$router.replace({path: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}`})
      }, () => {
        this.$router.replace({path: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}`})
      });
    },
    goPayCard () {
      let orderSn = this.$route.query.orderSn;
      this.$router.push({path: `/pages/valetOrder/placeUrl?orderFictitiousSn=${orderSn}`})
    }
  }
}
</script>

<style lang="scss">
.payWrap{padding-top: 80px; 
 >div{line-height: 100px;}
}
 
</style>
