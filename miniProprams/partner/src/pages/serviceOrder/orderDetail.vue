<template>
<div class="service_details">
  <div class="service_header" @click="toManage">
    <p class="header_type">{{jobType}}</p>
    <!-- 信息化 -->
    <p class="header_tit" v-if="detaildData.orderInfo.orderBsCode == 'sbfw_gnsb_zs'">{{detaildData.orderInfo.feedbackState}}</p>
    <p class="header_tit" v-if="detaildData.orderInfo.orderBsCode != 'sbfw_gnsb_zs'">{{orderServiceState}}</p>
    <p class="header_time mt10">{{createTime}}</p>
  </div>
  <div class="service_info service">
    <div class="info_tit row-between">
      <p class="order_num ml10">服务单号：{{detaildData.orderInfo.orderSn}}</p>
      <p class="order_percentage mr10">提成：<span class="num_money">￥{{percentage}}</span></p>
    </div>
    <div class="order_data row-between mt15">
      <img :src="detaildData.orderInfo.servicePicture" alt="">
      <div>
        <p class="apply_name">{{detaildData.orderInfo.serviceName}}</p>
        <p>实付<span>：￥</span>{{payMoney}}</p>
      </div>
    </div>
  </div>
  <!-- 合伙人 -->
  <div class="info_list mt20 service" v-if="detaildData.orderInfo.jobType > 0">
    <p class="row-between">{{detaildData.orderInfo.jobType == 1?'作业合伙人':'下单合伙人'}}<img v-if="detaildData.partner.partnerPhone" class="mr10" src="~assets/img/order/phone.png" alt="" @click="callPhone(detaildData.partner.partnerPhone)"></p>
    <div>
      <p class="mt20 ml10">合伙人店铺：<span :style="[{color:detaildData.partner.partnerStore?'#333':'#999'}]">{{detaildData.partner.partnerStore || '（空）'}}</span></p>
      <div class="row-between mt20">
        <p class="ml10">合伙人手机号：<span :style="[{color:detaildData.partner.partnerPhone?'#333':'#999'}]">{{detaildData.partner.partnerPhone || '（空）'}}</span></p>
      </div>
    </div>
  </div>
  <!-- 客户信息 -->
  <div class="info_list mt20 service">
    <p class="row-between">客户信息<img v-if="detaildData.memberInfo.memberPhone" class="mr10" src="~assets/img/order/phone.png" alt="" @click="callPhone(detaildData.memberInfo.memberPhone)"></p>
    <div>
      <p class="mt20 ml10" v-if="detaildData.orderInfo.orderBsCode == 'sbfw_gnsb_zs'&&detaildData.orderInfo.jobType == 1">企业名称：<span>{{detaildData.memberInfo.companyName}}</span></p>
      <p class="mt20 ml10">联系人：<span :style="[{color:detaildData.memberInfo.applyName?'#333':'#999'}]">{{detaildData.memberInfo.applyName || '（空）'}}</span></p>
      <div class="row-between mt20">
        <p class="ml10">手机号：<span :style="[{color:detaildData.memberInfo.memberPhone?'#333':'#999'}]">{{detaildData.memberInfo.memberPhone || '（空）'}}</span></p>
      </div>
    </div>
  </div>
  <!-- 注册信息 -->
  <div class="reg_info mt20 service" v-if="detaildData.orderInfo.orderBsCode == 'sbfw_gnsb_zs'">
    <p class="mb25">商标注册信息</p>
    <div class="reg_list">
      <p class="describe mb20">商标名称：<span class="max_w" :style="[{color:detaildData.trademarkDTO.trademarkName?'#333':'#999'}]">{{detaildData.trademarkDTO.trademarkName || '（空）'}}</span></p>
    </div>
    <div class="reg_list row-between mb20" v-if="detaildData.trademarkDTO.blackWhitePicUrl">
      <p>图样</p>
      <img @click="previewImg(detaildData.trademarkDTO.blackWhitePicUrl)" :src="detaildData.trademarkDTO.blackWhitePicUrl" alt="">
    </div>
    <div class="reg_list row-between mb20" v-if="detaildData.trademarkDTO.proxyUrl">
      <p>委托书</p>
      <img @click="previewImg(detaildData.trademarkDTO.proxyUrl)" :src="detaildData.trademarkDTO.proxyUrl" alt="">
    </div>
    <div class="reg_list">
      <p class="describe mb20">商标描述：<span :style="[{color:detaildData.trademarkDTO.trademarkDesc?'#333':'#999'}]" class="max_w">{{detaildData.trademarkDTO.trademarkDesc || '（空）'}}</span></p>
    </div>
  </div>
  <!-- 商标类别 -->
  <div class="info_list mt20 service" v-if="detaildData.orderInfo.orderBsCode == 'sbfw_gnsb_zs'">
    <p>商标类别</p>
    <div v-if="detaildData.workOrderService.length" v-for="item in detaildData.workOrderService" :key="item.classId">
      <div class="cls row-between">
        <p class="cls_l" :style="[{color:item.className?'#333':'#999'}]">{{item.className || '（空）'}}</p>
        <p class="cls_r">{{item.serviceNiceMin.length}}个小项</p>
      </div>
      <div class="cls_list mt25">
        <p>{{item.minInfo}}</p>
      </div>
    </div>
  </div>
  <!-- 主体信息 -->
  <div class="info_list mt20 service" v-if="detaildData.orderInfo.orderBsCode == 'sbfw_gnsb_zs'">
    <p>主体信息</p>
    <div>
      <p class="mt20 ml10">主体类型：<span :style="[{color:applyType?'#333':'#999'}]">{{applyType || '（空）'}}</span></p>
      <p v-if="detaildData.applySubject.applyType>2" class="mt20 ml10">{{applyName}}名称{{detaildData.applySubject.applyType>2?'英文':''}}：<span :style="[{color:detaildData.applySubject.applyNameEn?'#333':'#999'}]">{{detaildData.applySubject.applyNameEn || '（空）'}}</span></p>
      <p class="mt20 ml10">{{applyName}}名称{{detaildData.applySubject.applyType>2?'中文':''}}：<span :style="[{color:detaildData.applySubject.applyName?'#333':'#999'}]">{{detaildData.applySubject.applyName || '（空）'}}</span></p>

      <p class="mt20 ml10" v-if="detaildData.applySubject.applyType==1 || detaildData.applySubject.applyType==3">身份证号：<span :style="[{color:detaildData.applySubject.applyNumber?'#333':'#999'}]">{{detaildData.applySubject.applyNumber || '（空）'}}</span></p>
      <p class="mt20 ml10" v-if="detaildData.applySubject.applyType==2 || detaildData.applySubject.applyType==4">统一社会信用代码：<span :style="[{color:detaildData.applySubject.applyNumber?'#333':'#999'}]">{{detaildData.applySubject.applyNumber || '（空）'}}</span></p>

      <p class="mt20 ml10">联系电话：<span :style="[{color:detaildData.applySubject.contactsPhone?'#333':'#999'}]">{{detaildData.applySubject.contactsPhone || '（空）'}}</span></p>
      <p class="mt20 ml10">注册地址：<span :style="[{color:(detaildData.applySubject.applyAddress||detaildData.applySubject.applyAreaInfo)?'#333':'#999'}]">{{(detaildData.applySubject.applyAreaInfo + detaildData.applySubject.applyAddress) || '（空）'}}</span></p>
    </div>
  </div>
  <!-- 信息化 -->
  <div class="btn_footer" v-if="detaildData.orderInfo.orderBsCode == 'sbfw_gnsb_zs'">
    
    <!-- 平台作业 -->
    <template v-if="detaildData.orderInfo.jobType == 1">
      <!-- 始终显示 -->
      <p @click="toWork" v-if="detaildData.orderInfo.feedbackCode != 'sbfw_gnsb_zs_created'&&detaildData.orderInfo.feedbackCode != 'sbfw_gnsb_zs_wait'">查看作业</p>
    </template>

    <!-- 平台派单 自行作业 -->
    <!-- 待接单 -->
    <template v-if="(detaildData.orderInfo.jobType == 0 || detaildData.orderInfo.jobType == 2)">
      <p v-if="detaildData.orderInfo.feedbackCode == 'sbfw_gnsb_zs_wait'" @click="receiveOrder">接单</p>
      <p v-else="detaildData.orderInfo.feedbackCode != 'sbfw_gnsb_zs_created' && detaildData.orderInfo.feedbackCode != 'sbfw_gnsb_zs_wait'" @click="toWork">查看作业</p>
    </template>
  </div>
  <i class="divH"></i>
  
  <!-- 非信息化 -->
  <div class="btn_footer" v-if="detaildData.orderInfo.orderBsCode != 'sbfw_gnsb_zs' && detaildData.orderInfo.feedbackCode != 'sbfw_gnsb_zs_created'">
    <template v-if="detaildData.orderInfo.jobType == 0 || detaildData.orderInfo.jobType == 2">
      <p v-if="detaildData.orderInfo.orderServiceState == 1" @click="receiveOrder">接单</p>
      <p v-if="detaildData.orderInfo.orderServiceState == 2" @click="setStates">设置服务状态</p>
    </template>
  </div>
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  export default{
  data(){
    return{
      detaildData:{
        orderInfo:{
          jobType:'',
          createTime:'',
          feedbackCode:'',
          orderServiceState:''
        },
        applySubject:{
          applyType:''
        },
        memberInfo:{}
      },
      serviceNiceMin:'',
      orderId:'',
      receiveBol:false//防重
    }
  },
  onShow(){
    this.receiveBol = false;//初始化
    this.orderId = this.$root.$mp.query.orderId;
    this.search();
  },
  methods: {
    previewImg(imgUrl){
      if(imgUrl){
        wx.previewImage({
          current: imgUrl, // 当前显示图片的http链接
          urls: [imgUrl] // 需要预览的图片http链接列表
        })
      }
    },
    toWork(){//跳转工单页面
      this.$router.push({path: '/pages/serviceOrder/worksDetails?workOrderId='+this.detaildData.workOrderId});
    },
    toManage(){//办理进展
      this.$storage.set('manageInfo', this.detaildData.orderInfo)
      this.$router.push({path: '/pages/serviceOrder/manageProgress?orderId='+this.orderId});
    },
    callPhone(phone){//打电话
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    async handleOrder(){//办理
      let data = {
        orderId:this.orderId
      }
      try {
        let resp = await this.API.order.handleOrder(data);
        // 成功返回工单id
        // this.$router.push({path: '/pages/operation/trademark?workOrderId='+resp.workOrderId});
        this.search();
        console.log(resp)
      }
      catch (e) {
      }
    },
    setStates(){//设置服务状态
      this.$storage.set('serviceOrderInfo', this.detaildData.orderInfo);
      this.$router.push({path: '/pages/serviceOrder/setServiceStates?orderId='+this.orderId});
    },
    async receiveOrder(){//接单
      if(this.receiveBol){
        return;
      }
      this.receiveBol = true;
      let data = {
        orderId:this.orderId
      }
      try {
        let resp = await this.API.order.receiveOrder(data);
        if(this.detaildData.orderInfo.orderBsCode != 'sbfw_gnsb_zs'){
          this.search();
        }else{
          this.handleOrder()
        }
        // this.search();
        console.log(resp)
      }
      catch (e) {
        this.search();
      }
    },
    async search(){//初始化
      let data = {
        orderId:this.orderId
      }
      try {
        let resp = await this.API.order.findServiceOrderDetail(data);
        this.detaildData = resp;
        if(this.detaildData.workOrderService){
          this.detaildData.workOrderService.forEach((item) => {
            item.minInfo = item.serviceNiceMin.map((it) => {return it.minName}).join('，');
          });
        }
        console.log(resp)
      }
      catch (e) {
      }
    },
  },
  computed:{
    jobType:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return Filters.filters.jobType(this.detaildData.orderInfo.jobType)
      },
      set (value) {
        // 这里由于该计算属性被赋值，将被调用
        return Filters.filters.jobType(value)
      }
    },
    createTime () {
      return Filters.filters.dateFormat(this.detaildData.orderInfo.createTime)
    },
    feedbackCode(){
      return Filters.filters.feedbackCode(this.detaildData.orderInfo.feedbackCode)
    },
    applyType(){
      return Filters.filters.format(this.detaildData.applySubject.applyType)
    },
    orderServiceState(){
      return Filters.filters.orderServiceState(this.detaildData.orderInfo.orderServiceState)
    },
    payMoney(){
      return Filters.filters.priceformat(this.detaildData.orderInfo.payMoney)
    },
    percentage(){
      return Filters.filters.priceformat(this.detaildData.orderInfo.percentage)
    },
    applyName:{
      get(){
        return Filters.filters.formatName(this.detaildData.applySubject.applyType);
      }
    },
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
  .service{width:710px;border-radius:5px;box-shadow:0px 2px 4px 0px rgba(210,210,210,0.5);background-color:#fff;padding:25px 20px;margin-left: auto;margin-right:auto;
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
        .apply_name{line-height:37px;margin-bottom: 17px;height:74px;}
      }

    }
  }
  .reg_info{
    >p{font-weight:600;}
    .reg_list{padding:20px 10px 0 10px;border-top:1px solid #eee;
      p{line-height:130px;color:#333;font-size:26px;
        span{color:#666;}
      }
      img{width:130px;height:130px;}
      .describe{line-height:42px;}
      .max_w{display:inline;word-break:break-all;}
    }
  }
  .info_list{border-radius:5px;
    >p{border-bottom:1px solid #eee;padding-bottom:20px;font-weight:600;
        img{width:50px;height:50px;margin-top:-7px;}
      }
    >div{
      p{font-size:$text-nm;line-height:40px;
        span{color:#666;}
      }
      >div{
        p{font-size:$text-nm;line-height:40px;}
      }
    }
    // 商标类别
    .cls{padding:25px 10px;border-bottom:1px solid #eee;
      .cls_l{line-height:37px;color:#666;font-size:$text-sm;}
      .cls_r{line-height:37px;color:#999;font-size:$text-xs;}
    }
    .cls_list{
      p{color:#999;font-size:26px;line-height:37px;padding:0 10px;}
    }
  }
  .mb_footer{margin-bottom: 130px;}
  .btn_footer{width:750px;height:96px;position: fixed;bottom:0;left:0;
    // div{width:100%;background-color:;
    //   p{width:100%;height:100%;font-size:$text-xl;text-align:center;line-height:96px;}
    //   .btn_l{background-color:#fff;color:#2F80F6;}
    //   .btn_r{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color:#fff;}
    // }
    >p{width:100%;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color:#fff;height:100%;font-size:$text-xl;text-align:center;line-height:96px;}
  }
  .divH{height:120px;width:100%;display:block;}
}
</style>
