<template>
  <div class="confirmAndPush">
    <div class="infoWrap">
      <div class="items trademarkInfo">
        <h3>商标信息</h3>
        <div class="infoItem"><span>商标名称</span><span>{{trademarkDTO.trademarkName}}</span></div>
        <div class="infoItem"><span>商标说明</span><span>{{trademarkDTO.trademarkDesc}}</span></div>
        <div class="row-between imgItem">
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
        <div class="row minInfoTotal">大类：<i>{{workOrderService.length}}类</i><span v-if="orderData.plusMin">，超出小项：<i>{{orderData.plusMin}}个</i></span></div>
      </div>

      <!-- <div class="items">
        <h3>申请人信息</h3>
        <div class="infoItem"><span>主体类型</span><span>{{subjectTypeArr[applyType-1]['name']}}</span></div>
        <div class="infoItem" v-if="applyType==3 || applyType==4"><span>{{applyType==3 ? '申请人姓名（英文）':'企业名称（英文）'}}</span><span>{{applySubject.applyName}}</span></div>
        <div class="infoItem"><span>{{applyType==1 ? '申请人姓名' : applyType==2 ? '申请人企业名称' : applyType==3 ? '申请人姓名（中文）':'企业名称（中文）'}}</span><span>{{applySubject.applyName}}</span></div>
        <div class="infoItem" v-if="applyType!=4"><span>{{applyType==1 ? '申请人身份证号码' : applyType==2 ? '统一社会信用代码' : '申请人护照号' }}</span><span>一点点</span></div>
        <div class="infoItem"><span>{{(applyType==1 || applyType==3) ? '申请人联系电话' : '企业联系电话'}}</span><span>一点点</span></div>
        <div class="infoItem"><span>{{(applyType==1 || applyType==3) ? '申请人地址' : '企业注册地址'}}</span><span>一点点</span></div>
        <div class="infoItem"><span>{{(applyType==1 || applyType==3) ? '申请人详细地址' : '企业注册详细地址'}}</span><span>一点点</span></div>
        <div class="infoItem"><span>邮政编码</span><span>一点点</span></div>
        <div class="infoItem"><span>联系人姓名</span><span>一点点</span></div>
        <div class="infoItem"><span>联系人电话</span><span>一点点</span></div>
      </div>

      <div class="items">
        <h3>交官材料</h3>
        <div class="row-between imgItem">
          <span>{{(applyType == 1 || applyType == 2) ? '营业执照副本复印件（需盖公章）': applyType == 4 ? '企业登记证件（需加盖企业公章）' : '申请人护照（需签名）'}}</span>
          <span class="imgBox">
            <img src="https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/BE777D908B95EB20239A31C870C0A633.png" mode="aspectFit">
          </span>
        </div>
        <div class="row-between imgItem" v-if="applyType != 2">
          <span>{{applyType == 1 ? '个体工商户营业执照副本复印件（需签名）': applyType == 4 ? '企业登记证件译本（需加盖企业公章）' : '中文护照译本（需签名）'}}</span>
          <span class="imgBox">
            <img src="https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/BE777D908B95EB20239A31C870C0A633.png" mode="aspectFit">
          </span>
        </div>
        <div class="row-between imgItem">
          <span>委托书（需盖公章）</span>
          <span class="imgBox">
            <img src="https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/BE777D908B95EB20239A31C870C0A633.png" mode="aspectFit">
          </span>
        </div>
        <div class="row-between imgItem">
          <span>合同书（需盖公章）</span>
          <span class="imgBox">
            <img src="https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/BE777D908B95EB20239A31C870C0A633.png" mode="aspectFit">
          </span>
        </div>
      </div> -->

      <div class="items" v-if="payInfo">
        <h3>支付信息</h3>
        <div class="infoItem"><span>大类</span><span>{{payInfo.classNum}}类 <i v-if="payInfo.addClassNum">(增加{{payInfo.addClassNum}}类)</i></span></div>
        <div v-if="payInfo.addMinNum" class="infoItem"><span>加项个数</span><span>{{payInfo.addMinNum}}个</span></div>
        <div class="infoItem" v-if="payInfo.salePrice"><span>已支付</span><span>¥{{payInfo.salePrice}}</span></div>
        <div class="infoItem" v-if="payInfo.addPayMoney"><span>需再支付</span><span>¥{{payInfo.addPayMoney}}</span></div>
      </div>
      <!-- <official-account></official-account> -->
    </div>
    <div class="blank"></div>
    <div class="fixed-bottom row-center bottomBar">
      <span v-if="workOrderStatus==1" class="lc del" @click="infoReturn">返回修改</span>
      <span v-if="workOrderStatus==1 && (payInfo.addClassNum || payInfo.addMinNum)" class="lc save" @click="confirmAndPay">确认并支付</span>
      <span v-if="workOrderStatus==1 && !payInfo.addClassNum && !payInfo.addMinNum" class="lc save" @click="confirmFn">确认</span>
      <span v-if="workOrderStatus==2" class="lc save" @click="payFn">去支付</span>
    </div>
    <!-- 消息提示 -->
    <u-message />
  </div>
</template>
<script>
  import mixin from 'mixins/';
  import Item from '@/components/infoItem.vue'
  import Filters from '../../utils/filters.js'
  const indexPath = CONFIG.indexPath;
  /*const subjectTypeArr = [
    {
      id: 1,
      name: '大陆个体'
    },
    {
      id: 2,
      name: '大陆企业'
    },
    {
      id: 3,
      name: '港澳台及境外个人'
    },
    {
      id: 4,
      name: '港澳台及境外企业'
    }
  ];*/
  export default{
    components: {
      Item
    },
    mixins: [mixin],
    data() {
      return{
        // applyType: 1,
        // applySubject: {},
        // subjectTypeArr: subjectTypeArr,
        workOrderId: '',
        isWorkOrder: false, // 是否是工单(作业流程)
        orderData: {},
        trademarkDTO: {},
        workOrderService: [],
        payInfo: {},
        workOrderStatus: '',
      }
    },

    mounted() {
      this.init();
    },
    methods: {
      init() {
        // extraData 是用小程序间的跳转来模拟用户识别小程序码打开小程序
        console.log('extraData', this.$storage.get('extraData'))
        let query = this.$root.$mp.query;
        let scene = query.scene;
        let storeCode = query.storeCode;
        let workOrderId = query.workOrderId;
        query =  !scene && !workOrderId ? this.$storage.get('extraData') : query;
        this.$storage.remove('extraData')
        console.log('orderConfirm_query:', query);
        scene = query.scene;
        workOrderId = scene ? scene.split('_')[1] : workOrderId;
        this.workOrderId = workOrderId || "256782";
        scene ? storeCode = scene.split('_')[2] : '';
        if (storeCode) {
          this.$storage.set('storeCode', storeCode)
        }
        console.log('orderConfirm_storeCode:', storeCode);
        this.$storage.get("auth")
          ? this.getDetail()
          : this.$router.replace({path: '/pages/authorize/authorize', query: { path: '/pages/store/orderConfirm', workOrderId: this.workOrderId}});
      },
      async getDetail() {
        try {
          this.orderData = await this.API.confirmOrder.findWorkOrderConfirm(this.workOrderId);
          this.trademarkDTO = this.orderData.trademarkDTO = this.orderData.trademarkDTO || {};
          this.workOrderService = this.orderData.workOrderService = this.orderData.workOrderService || [];
          this.workOrderService.forEach((item) => {
            item.minInfo = item.serviceNiceMin.map((it) => {return it.minName}).join('，');
          });
          this.payInfo = this.orderData.payInfo;
          this.payInfo.salePrice = Filters.filters.priceformat(this.payInfo.salePrice);
          this.payInfo.addPayMoney = Filters.filters.priceformat(this.payInfo.addPayMoney);
          this.workOrderStatus = this.orderData.workOrderStatus;
        } catch(err) {
          setTimeout(() => {
            wx.switchTab({ url: '/pages/my/index'});
          }, 1500)
        }
        // this.applySubject = this.orderData.applySubject;
        // this.applyType = this.applySubject.applyType || 1;
      },
      async infoReturn() {
        await this.API.confirmOrder.infoReturn(this.workOrderId);
        // this.$router.replace(indexPath)
        wx.switchTab({ url: '/pages/my/index'})
      },
      async confirmFn() {
        await this.API.confirmOrder.infoAgree(this.workOrderId);
        // this.$router.replace(indexPath);
        wx.switchTab({ url: '/pages/my/index'})
      },
      async confirmAndPay(){
        let data = await this.API.confirmOrder.infoAgree(this.workOrderId);
        this.orderData.orderSn = data.orderSn;
        this.orderData.paymentSn = data.orderPaymentSn;
        this.payFn();
      },
      payFn() {
        this.wechatPay(this.orderData.orderSn, this.orderData.paymentSn, () => {
          //this.$router.replace(indexPath);
          wx.switchTab({ url: '/pages/my/index'});
        }, () => {
          this.workOrderStatus = 2; // 2.已确认待付款;
        })
      },
    },
  }
</script>
<style lang="scss">
  .confirmAndPush{
    height: 100%;
    h3{font-size:26px;height:77px;line-height: 77px;padding-left: 20px;color: #999999;background-color: #fff;border-bottom:1px solid #eee;}
    .blank{height: 118px;width: 100%;}
    .infoWrap{
      .items{
        background-color: #fff;margin-top: 20px;
        .infoItem{
          display: flex;flex-direction: row;align-items: center;justify-content: space-between;height: 90px;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;
          span{font-size: 28px;}
          span:last-child{color: #999999;width: 500px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align: right;}
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
          i{color: #F64744}
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
