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
        <div class="infoItem"><span>主体类型</span><span>一点点</span></div>
        <div class="infoItem"><span>申请人企业名称</span><span>一点点</span></div>
        <div class="infoItem"><span>统一社会信用代码</span><span>一点点</span></div>
        <div class="infoItem"><span>企业联系电话</span><span>一点点</span></div>
        <div class="infoItem"><span>企业注册地址</span><span>一点点</span></div>
        <div class="infoItem"><span>企业注册详细地址</span><span>一点点</span></div>
        <div class="infoItem"><span>邮政编码</span><span>一点点</span></div>
        <div class="infoItem"><span>联系人姓名</span><span>一点点</span></div>
        <div class="infoItem"><span>联系人电话</span><span>一点点</span></div>
      </div>

      <div class="items">
        <h3>交官材料</h3>
        <div class="row-between imgItem">
          <span>营业执照副本复印件（需盖公章）</span>
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
      </div> -->

      <div class="items" v-if="orderData.plusMoney">
        <h3>支付信息</h3>
        <div class="infoItem"><span>大类</span><span>{{workOrderService.length}}类 <i v-if="orderData.plusBig">(增加{{orderData.plusBig}}类)</i></span></div>
        <div v-if="orderData.plusBig" class="infoItem"><span>加项个数</span><span>{{orderData.plusBig}}个</span></div>
        <div class="infoItem"><span>需再支付</span><span>{{orderData.plusMoney}}</span></div>
      </div>
    </div>

    <div class="fixed-bottom row-center bottomBar">
      <span class="lc del" @click="back">返回修改</span><span class="lc save" @click="submitFn">提交用户确认</span>
    </div>

    <!-- 消息提示 -->
    <u-message />
  </div>
</template>
<script>
  import mixin from 'mixins/';
  import Item from '@/components/infoItem.vue'
  export default{
    components: {
      Item
    },
    mixins: [mixin],
    data() {
      return{
        storeCode: '',
        workOrderId: '',
        isWorkOrder: false, // 是否是工单(作业流程)
        orderData: {},
        trademarkDTO: {},
        workOrderService: [],
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        let query = this.$root.$mp.query;
        console.log('confirmAndPush_query:',query)
        this.workOrderId = query.workOrderId;
        this.isWorkOrder = !!query.workOrderId;
        if (this.isWorkOrder) {
          let d = this.$storage.get(query.workOrderId);
          console.log(d)
          if (!d) {
            let ret = await this.API.order.findWorkOrderDetail({workOrderId: query.workOrderId})
            d = {
              workOrderService: ret.workOrderService || [],
              trademarkDTO: ret.trademarkDTO || {},
              workOrderId: query.workOrderId,
              salePrice: ret.payInfo.salePrice,
              storeCode: ret.storeCode,
            }
            console.log('缓存不存在，通过接口获取工单详情')
            this.$storage.set(query.workOrderId, d);
          }
          this.storeCode = d.storeCode;
          // 获取工单详情（本地缓存）
          this.orderData =  d || {};
          this.salePrice = d.salePrice;
        }else{
          // 获取自定义的详情数据（本地缓存）
          this.orderData = this.$storage.get('workOrderData') || {};
        }
        this.trademarkDTO = this.orderData.trademarkDTO = this.orderData.trademarkDTO || {};
        this.workOrderService = this.orderData.workOrderService = this.orderData.workOrderService || [];
        // 拼装小项信息
        this.workOrderService.forEach((item) => {
          item.minInfo = item.serviceNiceMin.map((it) => {return it.minName}).join('，');
        });
      },
      back() {
        wx.navigateBack({
          delta: 2
        })
        // this.$router.go(-2);
      },
      async submitFn() {
        this.orderData.workOrderId = this.workOrderId;
        await this.API.operation.confirmAndPush(this.orderData);
        // 移除工单缓存
        this.$storage.remove(this.workOrderId);
        wx.reLaunch({ url: `/pages/valetOrder/placeUrl?path=pages/store/orderConfirm&id=${this.workOrderId}&storeCode=${this.storeCode}` });
        /*this.$router.push({
          path: '/pages/valetOrder/placeUrl',
          query: {
            id: this.workOrderId,
            path: 'pages/store/orderConfirm', //用于二维码生成传参path
          }
        });*/
      },
    },
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
          display: flex;flex-direction: row;align-items: center;justify-content: space-between;min-height: 90px;margin-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;
          span{font-size: 28px;}
          span:last-child{max-width: 520px;word-break:break-all;color: #999999;line-height:36px;padding:10px 0;}
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
