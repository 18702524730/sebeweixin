<template>
<div class="set_service">
  <div class="service_tit">
    <div class="row-between mb20">
      <img :src="serviceOrderInfo.servicePicture" alt="">
      <div>
        <p>{{serviceOrderInfo.serviceName}}</p>
        <p class="price mt15"><span>￥</span>{{payMoney}}</p>
      </div>
    </div>
    <p>状态：服务中</p>
  </div>

  <div class="reject_describe mt20">
    <p>备注</p>
    <textarea v-model="remark" maxlength="100" class="mt20" placeholder="简单描述该服务进度情况" />
  </div>
  <div class="msg mt20 ml20">
    <icon type="warn" size="20" color="#FF9639"></icon>
    <p class="ml10">若已完成服务，请及时<button open-type="contact">联系客服</button>审核并申报</p>
  </div>
  <button class="mt40" @click="setState">确定</button>
  <u-message />
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  export default{
  data(){
    return{
      serviceState:[],
      remark:'',
      serviceOrderInfo:{}
    }
  },
  methods: {
    async setState(){//设置服务状态
      if(!this.remark){
        this.$message({content:'请简单描述该服务进度', type: 'warning' });
        return;
      }
      let data = {
        orderId:this.orderId,
        code:'sbfw_gnsb_zs_ing_putong',
        remark:this.remark,
      }
      // 设置服务状态
      try {
        let resp = await this.API.order.setServiceState(data);
        this.$router.go(-1);
        console.log(resp)
      }
      catch (e) {
      }
    },
    async search(){//查看详情
      let data = {
        orderId:this.orderId
      }
      try {
        let resp = await this.API.order.findServiceOrderDetail(data);
        console.log(resp)
      }
      catch (e) {
      }
    },
    async findOrderServiceState(){//查看服务状态
      let data = {
        orderId:this.orderId
      }
      try {
        let resp = await this.API.order.findOrderServiceState(data);
        this.serviceState = resp;
        console.log(resp)
      }
      catch (e) {
      }
    },
  },
  mounted(){
    this.serviceOrderInfo = this.$storage.get('serviceOrderInfo');
    console.log(this.$storage.get('serviceOrderInfo'))
    this.orderId = this.$root.$mp.query.orderId || 353953;
    // this.findOrderServiceState();
  },
  computed:{
    payMoney(){
      return Filters.filters.priceformat(this.serviceOrderInfo.payMoney)
    },
    percentage(){
      return Filters.filters.priceformat(this.serviceOrderInfo.percentage)
    },

  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.set_service{height:100%;background-color:#f8f8f8;padding-top:20px;
  .service_tit,.reject_describe{background-color:#fff;padding:25px 20px 20px;}
  div.msg{background-color:#f8f8f8;display:flex;
    p{font-size:24px;color:#999;
      button{color:#2f80f6;border:0;background-color:#f8f8f8;display:inline;padding:0;vertical-align: top;}
    }
  }
  .service_tit{
    >div{width:710px;height:130px;
      img{height:130px;width:130px;}
      div{width:540px;height:130px;
        p{color:#333;font-size:26px;line-height:37px;height:74px;}
        .price{font-weight:500;font-size:28px;height:40px;line-height:40px;
          span{font-size:24px;}
        }
      }
    }
    >p{width:730px;text-align:left;line-height:40px;font-size:28px;border-top:1px solid #eee;padding-top:20px;color:#333;}
  }
  .reject_describe{padding:25px 30px;
    p{font-size:$text-nm;color:#333;border-bottom:1px solid #eee;line-height:40px;padding-bottom:25px;}
    textarea{line-height:40px;height:270px;padding:0;width:690px;}
  }
  >button{width:750px;height:96px;color:#fff;background:linear-gradient(86deg,rgba(68,154,248,1) 0%,rgba(47,128,246,1) 100%);font-size:$text-lg;border-radius:0px;line-height:64px;border:0;position: absolute;bottom:0;}
}
</style>
