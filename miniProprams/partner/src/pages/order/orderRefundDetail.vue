<template>
<div class="refund_detail">
  <div class="detail_tit" v-if="dataDetails.refundInfo&&!loading" :class="{'bgc01': dataDetails.refundInfo.refundState==0||dataDetails.refundInfo.refundState==-1,'bgc02':dataDetails.refundInfo.refundState==2,'bgc03':dataDetails.refundInfo.refundState==3}">
    <div class="title_info">
      <p class="pay_state">
        <img v-if="dataDetails.refundInfo.refundState == 0||dataDetails.refundInfo.refundState == -1" class="mr10" src="~assets/img/order/timer.png" alt="">
        <img v-if="dataDetails.refundInfo.refundState == 2" class="mr10" src="~assets/img/order/successFff.png" alt="">
        <img v-if="dataDetails.refundInfo.refundState == 3" class="mr10" src="~assets/img/order/errorFff.png" alt="">
        {{dataDetails.refundInfo.refundState == 0 ? '退款中' : dataDetails.refundInfo.refundState == 2 ? '退款成功' : dataDetails.refundInfo.refundState == 3 ? '拒绝退款' : '待处理'}}
      </p>
      <p class="refund_money mt10"><span>金额：￥</span>{{refundMoney}}</p>
      <p class="refund_num mt10" :class="{'refund_num_c':dataDetails.refundInfo.refundState == 2,'refund_c':dataDetails.refundInfo.refundState == 3}">退款单号：{{dataDetails.refundInfo.refundSn}}</p>
    </div>

    <div class="info_tit">
      <div class="order_info" :class="{'order_set':dataDetails.refundInfo.refundState==-1}">
        <p class="order_txt">退款操作</p>
        <div class="row-around" v-if="dataDetails.refundInfo.refundState==-1">
          <button @click="refuseRefund(dataDetails.refundInfo)">拒绝退款</button>
          <button @click="agreeRefund(dataDetails.serviceInfo)">同意退款</button>
        </div>
        <div class="refund_audit" v-else>
          <div>
            <p class="info_list mt20"><span>审核时间：</span>{{auditTime}}</p>
            <p class="info_list mt20" v-if="dataDetails.refundInfo.refundState == 3"><span>拒绝原因：</span>{{dataDetails.refundInfo.auditReason}} <span style="color:#999;" v-if="dataDetails.refundInfo.auditRemark">（{{dataDetails.refundInfo.auditRemark}})</span></p>
          </div>
          
          <img v-if="dataDetails.refundInfo.refundState == 2" class="mt20" src="~assets/img/order/refundSuc.png" alt="">
          <img v-if="dataDetails.refundInfo.refundState == 3" class="mt20" src="~assets/img/order/refundErr.png" alt="">
        </div>
      </div>

      <div class="order_info mt20">
        <p class="order_txt">申请信息</p>
        <p class="info_list mt20"><span>申请时间：</span>{{createTime}}</p>
        <p class="info_list mt20"><span>退款原因：</span>{{dataDetails.applyInfo.refundReason}}</p>
        <p class="info_list mt20"><span>退款说明：</span>{{dataDetails.applyInfo.refundRemark||'--'}}</p>
        <div class="img_list mt20">
          <img class="mr30" v-for="item in dataDetails.applyInfo.refundImages" :key="item" :src="item" alt="">
        </div>
      </div>

      <div class="order_info mt20">
        <p class="order_txt row-between">客户信息<img v-if="dataDetails.memberInfo.memberPhone" @click="callPhone(dataDetails.memberInfo.memberPhone)" class="mr20" src="~assets/img/order/phone.png" alt=""></p>
        <p class="info_list mt20"><span>联系人：</span>{{dataDetails.memberInfo.nicekName}}</p>
        <div class="row-between refund_phone">
          <p class="info_list mt20"><span>手机号：</span>{{dataDetails.memberInfo.memberPhone}}</p>
        </div>
      </div>
      <div class="order_info mt20 mb40">
        <p class="order_txt">服务信息</p>
        <div class="row-between order_bgc mt30 mb30">
          <img mode="scaleToFill" :src="dataDetails.serviceInfo.servicePicture" alt="">
          <div class="ml30">
            <p>{{dataDetails.serviceInfo.serviceName}}</p>
            <p class="mt15"><span>￥</span>{{payMoney}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 没订单 -->
  <div class="null_single" v-if="!dataDetails.refundInfo&&!loading">
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
      allMsg:true,
      dataDetails:{
        refundInfo:{},
        serviceInfo:{},
        applyInfo:{}
      },
      refundId:''
    }
  },
  methods: {
    refuseRefund(item){//拒绝退款
      let data = {
        refundMoney:this.refundMoney,
        servicePicture:this.dataDetails.serviceInfo.servicePicture,
        serviceName:this.dataDetails.serviceInfo.serviceName
      }
      this.$storage.set('refundInfo',data);
      this.$router.push({path: '/pages/order/orderRefundReject?refundId='+this.dataDetails.refundInfo.refundId});
    },
    async agreeRefund(item){//拒绝退款
      let data = {
        refundId:this.dataDetails.refundInfo.refundId
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
    callPhone(phone){//联系客服
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    async search(){//初始化
      let data = {
        refundId:this.refundId,
      }
      try {
        let resp = await this.API.order.orderRefundDetails(data);
        this.dataDetails = resp;
        this.loading = false;
        console.log(resp)
      }
      catch (e) {
        this.loading = false;
      }
    },
  },
  mounted(){
    this.refundId = this.$root.$mp.query.refundId || 304;
    this.search()
  },
  computed:{
    refundMoney : {
      get(){
        return Filters.filters.priceformat(this.dataDetails.refundInfo.refundMoney)
      }
    },
    payMoney : {
      get(){
        return Filters.filters.priceformat(this.dataDetails.serviceInfo.payMoney)
      }
    },
    auditTime : {
      get(){
        return Filters.filters.dateFormat(this.dataDetails.refundInfo.auditTime);
      }
    },
    createTime : {
      get(){
        return Filters.filters.dateFormat(this.dataDetails.applyInfo.createTime);
      }
    },

  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.refund_detail{background-color:#f8f8f8;height:100%;
  .bgc01{background:linear-gradient(90deg,rgba(69,154,248,1) 0%,rgba(47,128,246,1) 100%);}
  .bgc02{background:linear-gradient(103deg,rgba(213,213,213,1) 0%,rgba(183,183,183,1) 100%);}
  .bgc03{background:linear-gradient(90deg,rgba(223,206,180,1) 0%,rgba(191,157,104,1) 100%,rgba(191,157,104,1) 100%);}
  .detail_tit{width:100%;height:320px;position: relative;
    .title_info{padding:30px 40px;position: relative;
      .pay_state_mt{margin-top:56px;}
      .pay_state{font-size:36px;color:#fff;line-height: 50px;
        img{width:42px;height:42px;vertical-align:middle;margin-top:-8px;}
      }
      .refund_money{font-size:$text-lg;color:#fff;line-height:50px;}
      .refund_num{line-height: 42px;color:#B9D5FF;font-size:$text-lg;
        &.refund_num_c{color:#8C8C8C;}
        &.refund_c{color:#FFE6BF;}
      }
    }
    .info_tit{position: absolute;left:20px;top:220px;
      .order_info{width:710px;background:#fff;box-shadow:0px 2px 4px 0px rgba(210,210,210,0.5);border-radius:5px;padding:24px 20px;
        div{
          button{width:172px;height:54px;border:1px solid #ddd;color:#333;line-height:52px;border-radius:54px;padding:0;}
        }
        .img_list{border-top:1px solid #eee;padding-top:20px;padding-left: 10px;
          img{width:140px;height:140px;}
        }
        .refund_audit{display:flex;
          p{vertical-align: top;width:420px;}
          >img{width:132px;height:100px;margin-left:87px;}
        }
        .order_txt{border-bottom:1px solid #eee;line-height:42px;padding-bottom: 24px;font-weight:600;
          img{width:50px;height:50px;margin-top:-7px;}
        }
        .order_bgc{width:670px;height:180px;background-color:#f9f9f9;padding: 24px 25px;
          >img{width:130px;height:130px;}
          >div{width:460px;}
        }
        // width:476px;
        .info_list{line-height:40px;font-size:$text-nm;color:#666;
          span{color:#333;}
        }
        .refund_phone{
          img{width:64px;height:64px;}
        }
      }
      div.order_set{
        >div{margin-top:46px;margin-bottom: 16px;
        }
      }
    }
  }
}
  
</style>
