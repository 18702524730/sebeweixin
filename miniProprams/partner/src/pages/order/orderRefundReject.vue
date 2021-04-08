<template>
<div class="refund_reject">
  <div class="order_info">
    <div>
      <img :src="refundInfo.servicePicture" alt=""> 
      <p class="ml30">{{refundInfo.serviceName}}</p>
    </div>
  </div>
  <div class="order_reject mt20">
    <div class="mb25">
      <p>退款金额：<span class="symbol">￥</span><span style="font-weight:600;">{{refundInfo.refundMoney}}</span></p>
    </div>
    <div class="row-between reject_becaus" @click="refundReason = true">
      <p>拒绝原因</p>
      <p class="becaus_txt"></p>
      <p :class="{'becaus_name':!refundData.refundReasonName}">{{refundData.refundReasonName || '请选择'}}<sebe-icon type="enter" :size="36"></sebe-icon></p>
    </div>
  </div>
  <div class="reject_describe mt20">
    <p>详情描述</p>
    <textarea v-if="!refundReason" v-model="detailBecaus" class="mt20" placeholder="请输入拒绝退款的详细原因" />
    <div v-if="refundReason" class="textarea_z_index">{{detailBecaus}}</div>
  </div>
  <button @click="affirmRefund()">确定</button>
  <div v-if="refundReason" class="modal_frame">
    <div class="reason_bgc" @click.stop="shut"></div>
    <div class="cause_info">
      <p>请选择退款原因</p>
      <div class="row-between" v-for="item in reasonList" :key="item.refundReasonTypeId" @click.stop="refundData = item">
        <p>{{item.refundReasonName}}</p>
        <img v-if="refundData.refundReasonTypeId != item.refundReasonTypeId" class="mr10" src="~assets/img/order/null.png" alt="">
        <icon v-else type="success" class="mr10" size="23" color="#2F80F6"></icon>
      </div>
      <button @click="affirmType()">确定</button>
    </div>
  </div>
    <!-- 消息提示 -->
    <u-message />
</div>
</template>
<script>
  export default{
  data(){
    return{
      refundReason:false,
      refundInfo:{},
      reasonList:[],
      detailBecaus:'',
      refundData:{},

    }
  },
  methods: {
    shut(){//关闭弹框
      this.refundReason = false;
      this.refundData = {};
    },
    affirmType(){//弹框确认
      this.refundReason = false;
    },
    async affirmRefund(item){//提交信息
      console.log(this.refundData)
      if(!this.refundData.refundReasonName){
        this.$message({content:'请选择拒绝退款理由', type: 'warning' });
        return;
      }
      if(!this.detailBecaus){
        this.$message({content:'请填写拒绝退款原因', type: 'warning' });
        return;
      }
      let data = {
        refundId:this.refundInfo.refundId?this.refundInfo.refundId:this.refundId,
        refundReasonTypeId:this.refundData.refundReasonTypeId,
        refundReasonName:this.refundData.refundReasonName,
        auditRemark:this.detailBecaus
      }
      try {
        let resp = await this.API.order.refuseRefund(data);
        this.$storage.remove('refundInfo');
        this.$router.go(-1);
        console.log(resp)
      }
      catch (e) {
      }
      console.log(this.refundData,this.detailBecaus)
    },
    async search(){//初始化
      try {
        let resp = await this.API.order.listAuditReasonType();
        this.reasonList = resp;
      }
      catch (e) {
      }
    },
  },
  mounted(){
    this.refundId = this.$root.$mp.query.refundId || "";
    console.log(this.refundId)
    this.refundInfo = this.$storage.get('refundInfo');
    this.search();
  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.refund_reject{position: relative;height:100%;width:100%;padding-top:20px;
  .order_info,.order_reject,.reject_describe{background-color:#fff;}
  .order_info{padding:25px 20px;
    div{width:710px;height:130px;display:flex;
      img{width:130px;height:130px;}
      p{width:500px;line-height:40px;}
    }
  }
  .order_reject{padding:25px 30px;
    div{
      p{font-size:$text-nm;color:#333;line-height:40px;
        span{color:#2F80F6;}
        .symbol{font-size:$text-xs;}
      }
      .to_rideo{color:#ddd;font-size:$text-xs;}
    }
    .reject_becaus{
      border-top:1px solid #eee;padding-top:23px;
      .becaus_txt{margin-left:-90px;text-align:left;width:400px;}
      p{
        .i-icon{vertical-align: top;}
      }
      .becaus_name{color:#999;}
    }
  }
  .reject_describe{padding:25px 30px;
    p{font-size:$text-nm;color:#333;border-bottom:1px solid #eee;line-height:40px;padding-bottom:25px;}
    textarea{line-height:40px;height:270px;padding:0 10px;width:690px;}
    .textarea_z_index{height:270px;width:690px;z-index: 1;}
  }
  button{width:750px;height:86px;background:linear-gradient(86deg,rgba(68,154,248,1) 0%,rgba(47,128,246,1) 100%);font-size:$text-lg;color:#fff;position: absolute;bottom:0;border-radius:0;}
  .modal_frame{width:100%;height:100%;position: fixed;top:0;z-index:100;
    .reason_bgc{background-color:rgba(0,0,0,0.7);width:100%;height:100%;}
    .cause_info{width:750px;background-color:#FFF;border-radius:10px 10px 0px 0px;height:650px;position: absolute;bottom:0;padding:60px 40px 0 40px;
      >p{font-size:32px;color:#333;text-align:center;line-height:40px;padding-bottom:40px;border-bottom:1px solid #eee;}
      >div{border-bottom:1px solid #eee;
        p{font-size:$text-nm;line-height:40px;padding:28px 10px;}
        img{width:46px;height:46px;}
      }
      button{width:750px;height:96px;position: absolute;bottom:0px;left:0px;color:#fff;background:linear-gradient(86deg,rgba(68,154,248,1) 0%,rgba(47,128,246,1) 100%);font-size:$text-lg;border-radius:0;line-height:64px;}
    }
  }
}
</style>
