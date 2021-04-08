<template>
  <div class="trademarkDetail">
    <p class="detail_state">{{workOrderStatus}}{{orderData.workOrderStatus==5?'：'+(orderData.auditingRemarks||'--'):''}}</p>
    <div class="infoWrap" :class="{'infoWrap_bottom':orderData.workOrderStatus === 0||orderData.workOrderStatus == 1||orderData.workOrderStatus == 5||orderData.workOrderStatus == 8||orderData.workOrderStatus == 9}">
      <div class="items trademarkInfo">
        <h3>商标信息</h3>
        <div class="infoItem"><span>商标名称</span><span :style="[{color:trademarkDTO.trademarkName?'#333':'#999'}]">{{trademarkDTO.trademarkName || '（空）'}}</span></div>
        <div class="infoItem"><span class="tit_w">商标说明</span><span class="max_w" :style="[{color:trademarkDTO.trademarkDesc?'#333':'#999'}]">{{trademarkDTO.trademarkDesc || '（空）'}}</span></div>
        <div class="row-between imgItem" v-if="trademarkDTO.blackWhitePicUrl">
          <span>商标图样</span>
          <span class="imgBox">
            <img @click="previewImg(trademarkDTO.blackWhitePicUrl)" :src="trademarkDTO.blackWhitePicUrl" mode="aspectFit">
          </span>
        </div>
      </div>

      <div class="items category">
        <h3>商标类别</h3>
        <div v-for="(item, index) in workOrderService" :key="index">
          <div class="infoItem"><span :style="[{color:item.className?'#333':'#999'}]">{{item.className || '（空）'}}</span><span>{{item.serviceNiceMin.length}}个小项</span></div>
          <div class="minInfo">{{item.minInfo}}</div>
        </div>
        <div class="row minInfoTotal">大类：<i>{{workOrderService.length}}类</i><span v-if="orderData.payInfo">，超出小项：<i>{{orderData.payInfo.addMinNum}}个</i></span></div>
      </div>

      <div class="items">
        <h3>申请人信息</h3>
        <div class="infoItem"><span>主体类型</span><span :style="[{color:applyType?'#333':'#999'}]">{{applyType||'（空）'}}</span></div>

        <div class="infoItem" v-if="orderData.applySubject.applyType>2&&orderData.applySubject.applyNameEn"><span class="tit_w">{{applyName}}名称{{orderData.applySubject.applyType>2?'英文':''}}</span><span class="max_w" :style="[{color:orderData.applySubject.applyNameEn?'#333':'#999'}]">{{orderData.applySubject.applyNameEn||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyName"><span class="tit_w">{{applyName}}名称{{orderData.applySubject.applyType>2?'中文':''}}</span><span class="max_w" :style="[{color:orderData.applySubject.applyName?'#333':'#999'}]">{{orderData.applySubject.applyName||'（空）'}}</span></div>

        <div class="infoItem" v-if="orderData.applySubject.applyNumber"><span>统一社会信用代码</span><span :style="[{color:orderData.applySubject.applyNumber?'#333':'#999'}]">{{orderData.applySubject.applyNumber||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyPhone"><span>{{applyName}}联系电话</span><span :style="[{color:orderData.applySubject.applyPhone?'#333':'#999'}]">{{orderData.applySubject.applyPhone||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyAreaInfo"><span>{{applyName}}地址</span><span :style="[{color:orderData.applySubject.applyAreaInfo?'#333':'#999'}]">{{orderData.applySubject.applyAreaInfo||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyAddress"><span class="tit_w">{{applyName}}详细地址</span><span class="max_w" :style="[{color:orderData.applySubject.applyAddress?'#333':'#999'}]">{{orderData.applySubject.applyAddress||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyZipCode"><span>邮政编码</span><span :style="[{color:orderData.applySubject.applyZipCode?'#333':'#999'}]">{{orderData.applySubject.applyZipCode||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.contactsName"><span>联系人姓名</span><span :style="[{color:orderData.applySubject.contactsName?'#333':'#999'}]">{{orderData.applySubject.contactsName||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.contactsPhone" style="border:0;"><span>联系人电话</span><span :style="[{color:orderData.applySubject.contactsPhone?'#333':'#999'}]">{{orderData.applySubject.contactsPhone||'（空）'}}</span></div>
      </div>

      <div class="items">
        <h3>交官材料</h3>
        <div class="row-between imgItem" v-if="orderData.applySubject.standby2||orderData.applySubject.standby1">
          <span>营业执照副本复印件（需盖公章）</span>
          <span class="imgBox">
            <img @click="previewImg(orderData.applySubject.applyType>2?orderData.applySubject.standby2:orderData.applySubject.standby1)" :src="orderData.applySubject.applyType>2?orderData.applySubject.standby2:orderData.applySubject.standby1" mode="aspectFit">
          </span>
        </div>
        <div class="row-between imgItem" v-if="trademarkDTO.proxyUrl">
          <span>委托书（需盖公章）</span>
          <span class="imgBox">
            <img @click="previewImg(trademarkDTO.proxyUrl)" :src="trademarkDTO.proxyUrl" mode="aspectFit">
          </span>
        </div>

        <div v-if="!contractBol&&trademarkDTO.contractUrl" class="row-between imgItem">
          <span>合同书</span>
          <span class="imgBox">
            <img @click="previewImg(trademarkDTO.contractUrl)" :src="trademarkDTO.contractUrl" mode="aspectFit">
          </span>
        </div>
        <div v-if="contractBol&&trademarkDTO.contractUrl" class="row-between imgItem" style="border-bottom:0;">
          <span>合同书</span>
          <span class="imgPra" @click="previewPdf(trademarkDTO.contractUrl)">
            <img src="~assets/img/order/preview.png" mode="aspectFit">
          </span>
        </div>
      </div>

      <div class="items">
        <h3>支付信息</h3>
        <div class="infoItem"><span>大类</span><span>{{workOrderService.length}}类 <i v-if="orderData.payInfo">（增加{{orderData.payInfo.addClassNum||0}}类）</i></span></div>
        <div v-if="orderData.payInfo" class="infoItem"><span>加项个数</span><span>{{orderData.payInfo.addMinNum}}个</span></div>
        <div class="infoItem" style="border:0;"><span>需再支付</span><span>{{addPayMoney}}</span></div>
      </div>
    </div>

    <div class="fixed-bottom row-center bottomBar" v-if="orderData.workOrderStatus === 0||orderData.workOrderStatus == 1||orderData.workOrderStatus == 5||orderData.workOrderStatus == 8||orderData.workOrderStatus == 9">
      <span class="lc save" v-if="orderData.workOrderStatus == 5||orderData.workOrderStatus == 8" @click="perfectInfo">完善材料</span>
      <span class="lc save" v-if="orderData.workOrderStatus === 0||orderData.workOrderStatus == 1||orderData.workOrderStatus == 9" @click="edit">编辑</span>
    </div>

    <!-- 消息提示 -->
    <u-message />
  </div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  import mixin from 'mixins/';
  import Item from '@/components/infoItem.vue'
  const subjectTypeArr = [
    {
      id: 1,
      name: '大陆企业'
    },
    {
      id: 2,
      name: '大陆个人'
    },
    {
      id: 3,
      name: '境外企业'
    },
    {
      id: 4,
      name: '境外个人'
    }
  ];
  export default{
    components: {
      Item
    },
    mixins: [mixin],
    data() {
      return{
        workOrderId: '',
        isWorkOrder: false, // 是否是工单(作业流程)
        orderData: {
          workOrderStatus:'',
          applySubject:{},
          payInfo:{}
        },
        trademarkDTO: {},
        workOrderService: [],
        contractBol:false
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      previewPdf(pdfUrl){
        console.log("测试")
        pdfUrl = pdfUrl.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
        console.log(pdfUrl)
        wx.downloadFile({
          url: pdfUrl,
          success: function(res) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function(res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      },
      async previewImg(imgUrl){
        var imgArr = imgUrl.split('.');
        if (imgArr[imgArr.length-1] === 'pdf') {
          imgUrl = await this.API.order.preview({pdf_url: imgUrl})
          wx.previewImage({
            urls: imgUrl.urls // 需要预览的图片http链接列表
          })
        } else {
          wx.previewImage({
            current: imgUrl, // 当前显示图片的http链接
            urls: [imgUrl] // 需要预览的图片http链接列表
          })
        }
      },
      init() {//获取页面数据
        let query = this.$root.$mp.query;
        this.workOrderId = query.workOrderId;
        this.search();
      },
      async search(){//数据初始化
        let data = {
          workOrderId:this.workOrderId
        }
        try {
          let resp = await this.API.order.findWorkOrderDetail(data);
          this.trademarkDTO = resp.trademarkDTO;
          this.orderData = resp;
          this.workOrderService = resp.workOrderService;
          this.workOrderService.forEach((item) => {
            item.minInfo = item.serviceNiceMin.map((it) => {return it.minName}).join('，');
          });
          let contractLength = this.trademarkDTO.contractUrl.length;
          if(contractLength-4 == this.trademarkDTO.contractUrl.lastIndexOf('.pdf')){
            this.contractBol = true;
          }
          let s1 = resp.applySubject.standby1,
          s2 = resp.applySubject.standby2;
          if (s1 && s1.indexOf('pdf') != -1) {
            let data = await this.API.order.preview({pdf_url: s1});
            this.$set(this.orderData.applySubject, 'standby1', data.urls[0])
          }
          if (s2 && s2.indexOf('pdf') != -1) {
            let data = await this.API.order.preview({pdf_url: s2});
            this.$set(this.orderData.applySubject, 'standby2', data.urls[0])
          }
          console.log(resp)
        }
        catch (e) {
        }
      },
      perfectInfo(){//完善信息
        this.$router.push({path: '/pages/operation/customerEdit?isInfo=1&workOrderId='+this.workOrderId});
      },
      edit(){//编辑
        this.$router.push({path: '/pages/operation/trademark?workOrderId='+this.workOrderId});
      }
    },
    computed:{
      workOrderStatus:{
        get(){
          if(this.orderData.workOrderStatus>=0){
            console.log(this.orderData.workOrderStatus)
            return Filters.filters.worksState(this.orderData.workOrderStatus || 0);
          }
        }
      },
      applyType:{
        get(){
          return Filters.filters.format(this.orderData.applySubject.applyType);
        }
      },
      applyName:{
        get(){
          return Filters.filters.formatName(this.orderData.applySubject.applyType);
        }
      },

      addPayMoney:{
        get(){
          return Filters.filters.priceformat(this.orderData.payInfo.addPayMoney);
        }
      }
    }
  }
</script>
<style lang="scss">
  .trademarkDetail{height: 100%;position: relative;
    .detail_state{width:100%;background-color:#f8f8f8;height:100px;font-size:30px;text-align:center;line-height:100px;color:#2F80F6;}
    p.title_success{color:#1EB62D;}
    p.title_error{color:#F64744;}

    .footer_btn{position: fixed;bottom:0;height:96px;width:100%;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);font-size:32px;text-align:center;}
    h3{font-size:26px;height:77px;line-height: 77px;padding-left: 20px;color: #999999;background-color: #fff;border-bottom:1px solid #eee;}
    .infoWrap_bottom{margin-bottom: 118px;}
    .infoWrap{
      .items{
        background-color: #fff;margin-bottom: 20px;
        .infoItem{
          display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;
          span{font-size: 28px;}
          span:last-child{color: #999999;}
          span.max_w{line-height:40px;padding:25px 0;max-width: 560px;word-break:break-all;}
          span.tit_w{width:250px;}
        }
        .imgItem{
          height: 200px;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;
          .imgBox{
            width: 160px;height: 160px;border:1px solid #eee;overflow: hidden;
            img{height: 100%;width: 100%;}
          }
          .imgPra{
            width: 160px;height: 160px;border:1px solid #eee;overflow: hidden;text-align:center;
            img{height: 79px;width: 80px;margin-top:40px;}
          }
        }
      }
      .category{
        .minInfo{padding: 20px 0;font-size:26px;line-height:37px;color: #666;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;}
        .minInfoTotal{
          height: 80px;font-size: 28px;padding-left: 20px;
          i{color: #F64744;}
        }
      }
    }
    .bottomBar{
      width: 100%; height: 98px;line-height: 98px;font-size: 32px;background-color: #fff;z-index: 2;
      span{flex: 1;color: #2F80F6;}
      .save{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }
  }
</style>
