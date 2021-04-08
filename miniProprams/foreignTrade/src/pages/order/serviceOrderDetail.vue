<template>
  <div class="confirmAndPush">
    <div class="infoWrap">
      <div class="items trademarkInfo">
        <h3>商标信息</h3>
        <div class="infoItem" v-if="trademarkDTO.trademarkName"><span>商标名称</span><span class="max_w" :style="[{color:trademarkDTO.trademarkName?'#333':'#999'}]">{{trademarkDTO.trademarkName||'（空）'}}</span></div>
        <div class="infoItem" v-if="trademarkDTO.trademarkDesc"><span>商标说明</span><span class="max_w" :style="[{color:trademarkDTO.trademarkDesc?'#333':'#999'}]">{{trademarkDTO.trademarkDesc||'（空）'}}</span></div>
        <div class="row-between imgItem" v-if="trademarkDTO.blackWhitePicUrl">
          <span>商标图样</span>
          <span class="imgBox">
            <img :src="trademarkDTO.blackWhitePicUrl" mode="aspectFit">
          </span>
        </div>
      </div>

      <div class="items category">
        <h3>商标类别</h3>
        <div v-for="(item, index) in workOrderService" :key="index">
          <div class="infoItem"><span>{{item.className}}</span><span>{{item.serviceNiceMin.length}}个小项</span></div>
          <div class="minInfo">{{item.minInfo}}</div>
        </div>
        <div class="row minInfoTotal">大类：<i>{{workOrderService.length}}类</i><span v-if="orderData.payInfo">，超出小项：<i>{{orderData.payInfo.addMinNum || 0}}个</i></span></div>
      </div>

      <div class="items">
        <h3>申请人信息</h3>
        <div class="infoItem"><span>主体类型</span><span :style="[{color:applyType?'#333':'#999'}]">{{applyType||'（空）'}}</span></div>
        
        <div class="infoItem" v-if="orderData.applySubject.applyType>2&&orderData.applySubject.applyNameEn"><span>{{applyName}}名称{{orderData.applySubject.applyType>2?'(英文)':''}}</span><span>{{orderData.applySubject.applyNameEn||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyName"><span>{{applyName}}名称{{orderData.applySubject.applyType>2?'(中文)':''}}</span><span :style="[{color:orderData.applySubject.applyName?'#333':'#999'}]">{{orderData.applySubject.applyName||'（空）'}}</span></div>

        <div class="infoItem" v-if="orderData.applySubject.applyNumber"><span>统一社会信用代码</span><span :style="[{color:orderData.applySubject.applyNumber?'#333':'#999'}]">{{orderData.applySubject.applyNumber||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyPhone"><span>{{applyName}}联系电话</span><span :style="[{color:orderData.applySubject.applyPhone?'#333':'#999'}]">{{orderData.applySubject.applyPhone||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyAddress"><span>{{applyName}}详细地址</span><span :style="[{color:orderData.applySubject.applyAddress?'#333':'#999'}]">{{orderData.applySubject.applyAddress||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.applyZipCode"><span>邮政编码</span><span :style="[{color:orderData.applySubject.applyZipCode?'#333':'#999'}]">{{orderData.applySubject.applyZipCode||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.contactsName"><span>联系人姓名</span><span :style="[{color:orderData.applySubject.contactsName?'#333':'#999'}]">{{orderData.applySubject.contactsName||'（空）'}}</span></div>
        <div class="infoItem" v-if="orderData.applySubject.contactsPhone"><span>联系人电话</span :style="[{color:orderData.applySubject.contactsPhone?'#333':'#999'}]"><span>{{orderData.applySubject.contactsPhone||'（空）'}}</span></div>
      </div>

      <div class="items">
        <h3>交官材料</h3>
        <div class="row-between imgItem" v-if="orderData.applySubject.standby2||orderData.applySubject.standby1">
          <span>营业执照副本复印件（需盖公章）</span>
          <span class="imgBox">
            <img :src="orderData.applySubject.applyType>2?orderData.applySubject.standby2:orderData.applySubject.standby1" mode="aspectFit">
          </span>
        </div>
        <div class="row-between imgItem" v-if="orderData.trademarkDTO.proxyUrl">
          <span>委托书（需盖公章）</span>
          <span class="imgBox">
            <img :src="orderData.trademarkDTO.proxyUrl" mode="aspectFit">
          </span>
        </div>
      </div>
    </div>

    <div class="fixed-bottom row-center bottomBar">
      <span class="lc del" @click="back">查看完整进度</span>
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
        orderId: '',
        isWorkOrder: false, // 是否是工单(作业流程)
        orderData: {
          applySubject:{},
          officialMaterials:{},
          trademarkDTO:{}
        },
        trademarkDTO: {},
        workOrderService: [],
      }
    },

    mounted() {
      this.init();
    },
    methods: {
      init() {//获取传递值
        let query = this.$root.$mp.query;
        this.orderId = query.orderId;
        this.search();
      },
      async search(){//初始化
        let data = {
          orderId:this.orderId
        }
        try {
          let resp = await this.API.order.findServiceOrderDetail(data);
          this.trademarkDTO = resp.trademarkDTO;
          this.orderData = resp;
          this.workOrderService = resp.workOrderService;
          this.workOrderService.forEach((item) => {
            item.minInfo = item.serviceNiceMin.map((it) => {return it.minName}).join('，');
          });
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
      back() {//查看进度
        let data = {
          refundMoney:this.orderData.orderInfo.payMoney,
          servicePicture:this.orderData.orderInfo.servicePicture,
          serviceName:this.orderData.orderInfo.serviceName
        }
        this.$storage.set('manageInfo',data);
        this.$router.push({path: '/pages/order/progressManager?orderId='+this.orderId});
      },
    },
    computed:{
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
    }
  }
</script>
<style lang="scss">
  .confirmAndPush{
    height: 100%;
    h3{font-size:26px;height:77px;line-height: 77px;padding-left: 20px;color: #999999;background-color: #fff;border-bottom:1px solid #eee;}
    .infoWrap{
      margin-bottom: 118px;
      .items{
        background-color: #fff;margin-top: 20px;
        .infoItem{
          display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;
          span{font-size: 28px;}
          span:last-child{color: #999999;}
          span.max_w{max-width:500px;line-height:40px;padding:25px 0;word-break:break-all;}
        }
        .imgItem{
          height: 200px;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;
          .imgBox{
            width: 160px;height: 160px;border:1px solid #eee;overflow: hidden;
            img{height: 100%;width: 100%;}
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
