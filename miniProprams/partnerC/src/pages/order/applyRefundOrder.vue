<template>
<div class="refund_reject">
  <div class="order_info mt20">
    <div>
      <img :src="refundInfo.orderBsImage" alt=""> 
      <div>
        <p class="ml30">{{refundInfo.orderBsName}}</p>
        <p class="ml30 mt20"><span>￥</span>{{orderAmount}}</p>
      </div>
    </div>
    <div class="call_phone row-end mt20">
      <img src="~assets/img/order/phone.png" alt="">
      <p class="ml10" @click="callPhone(refundInfo.memberPhone)">联系商家</p>
    </div>
  </div>
  <div class="order_reject mt20">
    <div class="mb25">
      <p class="require">退款金额：<span class="symbol">￥</span><span>{{orderAmount}}</span></p>
    </div>
    <div class="row-between reject_becaus" @click="refundReason = true">
      <p class="require">退款原因</p>
      <p class="becaus_txt">{{refundData.refundReasonName}}</p>
      <sebe-icon type="enter" :size="36"></sebe-icon>
    </div>
  </div>
  <div class="reject_describe mt20">
    <div class="row-between div_border">
      <p class="require">详情描述</p>
      <p class="mr15">{{detailBecaus.length||0}}/500</p>
    </div>
    <textarea v-if="!refundReason" v-model="detailBecaus" maxlength="500" class="mt20" placeholder="请输入申请退款的详细原因" />
    <div v-if="refundReason" class="textarea_z_index">{{detailBecaus}}</div>
    <up-image :imgUrl="ImageUrl" :valueName="'ImageUrl'" @setUpImage="setUpImage"></up-image>
  </div>
  
  <div class="tips mt20">
    <p class="ml40">温馨提示：*请上传业务相关的图片或聊天截图</p>
    <p class="ml40 mt10">*图片支持jpg、jpeg、gif、bmp或png格式，最多3张</p>
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
      <button @click="affirmType(item)">确定</button>
    </div>
  </div>
  <!-- 消息提示 -->
  <u-message />
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  import upImage from '../../components/upImage';
  export default{
  components:{
    upImage
  },
  data(){
    return{
      refundReason:false,
      refundInfo:{},
      reasonList:[],
      detailBecaus:'',
      refundData:{
        refundReasonTypeId:'',
        refundReasonName:''
      },
      ImageUrl:[]
    }
  },
  methods: {
    callPhone(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    setUpImage(data){//上传图片
      this[data.valueName] = data.url;
      console.log(data,this.ImageUrl,'测试图片url')
    },
    shut(){//关闭弹框
      this.refundReason = false;
      this.refundData = {};
    },
    affirmType(){//确认退款原因
      this.refundReason = false;
    },
    async affirmRefund(item){//确认提交
      if(!this.refundData){
        this.$message({content:'请选择申请退款理由', type: 'warning' });
        return;
      }
      if(!this.detailBecaus){
        this.$message({content:'请填写申请退款原因', type: 'warning' });
        return;
      }
      let data = {
        orderSn:this.refundInfo.orderSn,
        refundReasonTypeId:this.refundData.refundReasonTypeId,
        refundReasonTypeName:this.refundData.refundReasonTypeName,
        message:this.detailBecaus,
        refundImages:this.ImageUrl
      }
      try {
        let resp = await this.API.order.createRefund(data);
        this.ImageUrl = [];
        // 成功后初始化
        this.refundData.refundReasonTypeId = '';
        this.refundData.refundReasonName = '';
        this.detailBecaus = '';
        this.$router.go(-1);
        console.log(resp)
      }
      catch (e) {
      }
      console.log(this.refundData,this.detailBecaus)
    },
    async search(){//初始化
      try {
        let resp = await this.API.order.listRefundReasonType();
        this.reasonList = resp;
        console.log(resp)
      }
      catch (e) {
      }
    },
  },
  onShow(){
    this.ImageUrl = [];
    this.refundInfo = this.$storage.get('refundInfo');
    console.log(this.refundInfo)
    this.search();
    this.refundId = this.$root.$mp.query.refundId || "";
  },
  computed:{
    orderAmount () {
      return Filters.filters.priceformat(this.refundInfo.orderAmount)
    }

  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.refund_reject{position: relative;height:100%;width:100%;
  .order_info,.order_reject,.reject_describe{background-color:#fff;}
  .require{
    &:before{content:'*';font-size:24px;color:#F64744;margin-top:-5px;}
  }
  .order_info{padding:30px 20px;
    >div{width:710px;height:160px;background-color:#f9f9f9;padding:15px 25px;display:flex;
      img{width:130px;height:130px;}
      div{
        p{width:500px;line-height:40px;
          span{font-size:$text-xs;}
        }
      }
    }
    .call_phone{height:48px;padding:0;text-align:right;background-color:#fff;
      img{width:48px;height:48px;}
      p{color:#333;line-height:48px;font-size:$text-lg;}
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
    }
  }
  .reject_describe{padding:25px 30px;
    .div_border{border-bottom:1px solid #eee;}
    p{font-size:$text-nm;color:#333;line-height:40px;padding-bottom:25px;}
    textarea{line-height:40px;height:270px;width:690px;z-index: 1;}
    .textarea_z_index{height:270px;width:690px;z-index: 1;}
  }
  button{width:690px;height:86px;border-radius:5px;background:linear-gradient(86deg,rgba(68,154,248,1) 0%,rgba(47,128,246,1) 100%);border:0;font-size:$text-lg;color:#fff;margin:60px 30px 35px;line-height:54px;}
  .modal_frame{width:100%;height:100%;position: fixed;top:0;z-index:1000;
    .reason_bgc{background-color:rgba(0,0,0,0.7);width:100%;height:100%;}
    .cause_info{width:750px;background-color:#FFF;border-radius:10px 10px 0px 0px;height:650px;position:fixed;bottom:0;padding:40px 20px 0 20px;z-index: 1000;
      >p{font-size:$text-nm;color:#333;text-align:center;line-height:40px;padding-bottom:40px;border-bottom:1px solid #eee;}
      >div{border-bottom:1px solid #eee;
        p{font-size:$text-nm;line-height:40px;padding:25px 10px;}
        img{width:46px;height:46px;}
      }
      button{width:750px;height:96px;position: absolute;bottom:-33px;left:-30px;color:#fff;background:linear-gradient(86deg,rgba(68,154,248,1) 0%,rgba(47,128,246,1) 100%);font-size:$text-lg;border-radius:0;padding:0;line-height:96px;}
    }
  }
  .tips{
    p{font-size:$text-sm;color:#999;line-height:37px;}
  }
}
</style>
