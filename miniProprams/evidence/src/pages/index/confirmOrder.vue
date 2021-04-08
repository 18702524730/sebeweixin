<template>
 <div class="confirmOrder">

   <div class="orderList">
    <div class="serviceItem">
      <img v-if="productDetail.picture" :src="productDetail.picture" alt="">
      <div class="serviceDes">
        <h2 >{{productDetail.productPriceName}}</h2>
        <div class="priceWrap">
          <div class="price"><b>￥</b>{{productDetail.standardPriceText}}</div>
          <div class="num">x{{num}}</div>
        </div>
      </div>
    </div>
    <div class="infoWrap">
      <div class="info"><div class="des">优惠费用</div><div class="price">￥0.00</div></div>
      <div class="info"><div class="des">商品金额</div>
      <div class="price" style="color: #f64744">
        <label style="font-size: 10px;color: #f64744;">￥</label>{{total}}</div>
      </div>
    </div>
   </div>
   <div class="confirmOrderBot">
     <div class="realPay">
       <span>实付款：</span>
       <span class="rmb">￥</span>
       <span class="price">{{total}}</span>
     </div>
     <div class="confirmBtn" @click="creatPartnerOrder">确认下单并支付</div>
   </div>
   <u-message/>
 </div>
</template>

<script>
const { payUrl } = CONFIG;
export default {
  data() {
    return {
      num: 1,
      total: "",
      preventBtnStatus: false,
      productDetail: {}
    };
  },
  components: {},
  onLoad() {
    this.preventBtnStatus = false;
    this.num = this.$route.query.number;
    this.getProductDetail();
  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  methods: {
    async getProductDetail() {
      try {
        let data = await this.API.homePage.czDetail({priceId: 87});
        data.data.picture = data.data.picture.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
        data.data.standardPriceText = Number(data.data.standardPrice).toFixed(2);
        data ? (this.productDetail = data.data) : "";
        this.total = Number(this.productDetail.standardPrice * this.num).toFixed(2)
      } catch (e) {
        this.$message({conten: '请求异常', type: 'error'})
      }
    },
    async creatPartnerOrder() {
      try{
        let params = Object.assign({}, this.$root.$mp.query, {invitedChannel: 5});
        if (this.preventBtnStatus) {
          return;
        }
        this.preventBtnStatus = true;
        let data = await this.API.homePage.nowPlaceOrderMobine(params);
        this.preventBtnStatus = false;
        if (data.data) {
          console.log(data.data.payOrder[0])
          this.wechatPayFn(data.data.payOrder[0]);
        } else {
          this.$message({content:'订单生成失败，请重试', type: 'error'})
        }
      } catch (err) {
        this.preventBtnStatus = false;
      }

    },
    // 微信支付
    wechatPayFn(orderData) {
      let self = this;
      var paymentBody = {};
      paymentBody.order_sn = orderData.orderNum;
      paymentBody.payment_sn = orderData.paymentSn; // self.paymentSn;
      paymentBody.payment_type = 2; //支付方式1:公众号支付，2：小程序支付，不传默认1
      paymentBody.openid = wx.getStorageSync("sessionId");
      const token = wx.getStorageSync("key");
      const sessionId = wx.getStorageSync("sessionId");
      const url = payUrl + "/iprp_app/api/wxpayment";
      let query = this.$root.$mp.query;
      wx.request({
        url: url,
        method: "POST",
        data: paymentBody,
        header: {
          Authorization: token,
          SessionId: sessionId,
          "content-type": "application/x-www-form-urlencoded" // 默认值
        },
        success(res) {
          console.log(res);
          var data = res.data;
          if (data.status && data.status !== 200) {
            self.$message({ content: data.msg, type: "error" });
            return;
          }
          var ret = {};
          ret.timeStamp = data.timeStamp;
          ret.nonceStr = data.nonceStr;
          ret.package = data.package;
          ret.signType = data.signType;
          ret.paySign = data.paySign;
          console.log('ret', ret)
          wx.requestPayment({
            ...ret,
            success(res) {
              console.log("支付成功");
              // 清空缓存
              setTimeout(() => {
                self.$router.replace({
                    path: query.from,
                    query: { noCache: true }
                  });
              }, 1000)
            },
            fail(e) {
              console.log("支付失败", e);
              self.$message({content: '支付失败', type: 'error'})
              // 删除订单
              // self.deleteOrderFn(orderData.orderFictitiousSn);
            }
          });
        },
        fail(err) {self.$message({content: '支付失败', type: 'error'})}
      });
    }
  }
};
</script>

<style lang="scss">
page {
  background: #f8f8f8;
}
.confirmOrder {
  height: 100%;
  .orderList {
    // padding: 0 20px;
    background: #fff;
  }
  .infoWrap {
    background: #fff;
    .info {
      display: flex;
      padding-left: 20px;
      line-height: 90px;
      border-bottom:1px solid #eee;
      &:last-child{border-bottom: none;}
      .des {
        flex-grow: 1;
        color: #333;
        font-size: 28px;
      }
      .price {
        text-align: right;
        font-size: 28px;
        color: #333;
        padding-right: 20px;
      }
    }
    .message {
      padding-bottom: 30px;
      div {
        line-height: 90px;
        color: #333;
        font-size: 28px;
      }
      p {
        color: #999;
        font-size: 28px;
        line-height: 40px;
      }
    }
  }
  .storeName {
    line-height: 80px;
    font-size: 28px;
    color: #333;
    // border-bottom:1px solid #eee;
    padding-left: 20px;
    img {
      font-size: 0;
      width: 40px;
      height: 40px;
      transform: translateY(10px);
      margin-right: 10px;
    }
  }
  .serviceItem {
    display: flex;
    padding-bottom: 30px;
    width: 750px;
    padding: 30px 20px;
    background: #f8f8f8;
    font-size: 0;
    > img {
      width: 130px;
      height: 130px;
    }
  }
  .serviceDes {
    flex-grow: 1;
    padding-left: 30px;
    h2 {
      font-size: 26px;
      line-height: 37px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 550px;
    }
    .priceWrap {
      display: flex;
      padding: 53px 0 0;
      .price {
        display: flex;
        font-size: 28px;
        line-height: 40px;
        color: #666;
        transform: translateY(8px);
        b {
          font-size: 22px;
          color: #333;
        }
      }
      .num {
        flex-grow: 1;
        text-align: right;
        color: #666;
        font-size: 28px;
        transform: translateY(4px);
      }
    }
  }
}
.confirmOrderBot {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 98px;
  display: flex;
  width: 100%;
  .realPay {
    background: #fff;
    flex: 1;
    line-height: 98px;
    text-align: left;
    padding-left: 20px;
    .rmb {
      font-size: 20px;
      color: #f64744;
    }
    .price {
      color: #f64744;
    }
  }
  .confirmBtn {
    background: linear-gradient(
      90deg,
      rgba(0, 150, 255, 1) 0%,
      rgba(47, 128, 246, 1) 100%
    );
    text-align: center;
    line-height: 98px;
    flex: 1;
    font-size: 32px;
    color: #fff;
  }
}
</style>
