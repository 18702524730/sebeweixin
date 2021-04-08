<template>
 <div class="parterOrder">
   <div class="deadline">
     <i class="icon iconfont icon-shizhong"></i>
     <div class="des">请在 {{residueTime}}内 完成确认并支付超时订单自动关闭</div>
   </div>
   <div class="buyerInfo">
     <h2>购买者</h2>
     <div class="nick">
       <p>昵称：</p>
       <p class="des">{{serviceData.nickName || ''}}</p>
     </div>
     <div class="nick">
       <p>手机号：</p>
       <p class="des">{{serviceData.orderBuyerPhone || ''}}</p>
     </div>
   </div>
   <div class="orderList" v-if="serviceData">
    <h2 class="storeName">
      <img :src="serviceData.avatar" alt="">
      {{serviceData.storeName}}的店</h2>
    <div class="serviceItem trademarkItem" v-for="(item, index) in serviceData.serviceList" :key="index">
      <div>
        <img v-if="item.orderBsImage" :src="item.orderBsImage" alt="">
        <div class="serviceDes">
          <h2 >{{item.orderBsName}}</h2>
          <div class="priceWrap">
            <div class="price"><b>￥</b>{{item.orderAmount}}</div>
            <div class="num">x1</div>
          </div>
        </div>
      </div>
      <div class="explain" v-if="item.trademarkName">
        <div class="des">
          <p>商标名称：<span>{{item.trademarkName}}</span>（{{item.classNumber}}个大类，{{item.minAddNumber}}收费加项）</p>
          <p>共计：¥{{item.subtotal || ''}}</p>
        </div>
        <div class="watch" @click="$router.push('/pages/store/trademarkDetail?orderSn=' + item.orderSn)">查看</div>
      </div>
    </div>

   </div>
   <div class="infoWrap">
      <div class="info"><div class="des">优惠费用</div><div class="price">￥0.00</div></div>
      <div class="info"><div class="des">商品金额</div><div class="price">￥{{serviceData.orderAmount}}</div></div>
      <div class="message">
        <div>商家留言</div>
        <p>{{serviceData.orderMessage}}</p>
      </div>
    </div>
    <div class="confirmOrderBot">
     <div class="realPay">
       <span>实付款：</span>
       <span class="rmb">￥</span>
       <span class="price">{{serviceData.orderAmount}}</span>
     </div>
     <div class="confirmBtn" @click="confirmPay">确认下单并支付</div>
   </div>
   <u-modal :showModal="showModal" :title="'确认支付'" :content="'该订单购买者不是您，确认继续支付？'" :options="options" @confirmBtn="wechatPayFn" @hide="hideFn" />
   <!-- <official-account></official-account> -->
 </div>
</template>

<script>
import mixin from 'mixins/';
export default {
  mixins: [mixin],
  data() {
    return {
      storeName: "",
      showModal:false,
      timer: "",
      residueTime: "0天0小时0分0秒",
      serviceData: "",
      orderFictitiousSn: "",
      options: {
        confirmText: '确定',
        confirmColor: '#4272FF'
      },
      
    };
  },
  components: {},
  /**
   * 获取二维码参数
  onLoad (options) {
    // 获取二维码里参数
    if(options.scene){
      let scene=decodeURIComponent(options.scene);
      //&是我们定义的参数链接方式
      let orderFictitiousSn = options.scene.split("&")[0];
      this.orderFictitiousSn = orderFictitiousSn;
    }
    this.findConfirmPartnerOrder()
  },
  */
  mounted() {
    // extraData 是用小程序间的跳转来模拟用户识别小程序码打开小程序
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = ''
    this.residueTime = "0天0小时0分0秒"
    let query = this.$root.$mp.query;
    let scene = query.scene;
    let storeCode = query.storeCode;
    let orderSn = query.orderSn;
    query =  !scene && !orderSn ? this.$storage.get('extraData') : query;
    this.$storage.remove('extraData')
    console.log('parterOrder_query:', query);
    scene = query.scene;
    orderSn = scene ? scene.split('_')[0] : orderSn;
    this.orderFictitiousSn = orderSn;
    scene ? storeCode = scene.split('_')[2] : '';
    if (storeCode) {
      this.$storage.set('storeCode', storeCode)
    }
    // /pages/authorize/authorize
    
    // this.$router.push({path: '/pages/authorize/authorize' , query: { path: '/pages/store/parterOrder', orderSn: this.orderFictitiousSn,storeCode: storeCode }});
    console.log('parterOrder_storeCode:', storeCode);
    wx.getStorageSync("auth")
      ? this.findConfirmPartnerOrder()
      : wx.reLaunch({url: `/pages/authorize/authorize?path=/pages/store/parterOrder&orderSn=${this.orderFictitiousSn}&storeCode=${storeCode}`})
  },
  methods: {
        // 隐藏弹窗
    hideFn () {
      console.log('cacle')
      this.showModal = false;
    },
    async findConfirmPartnerOrder() {
      try {
        let data = await this.API.confirmOrder.findConfirmPartnerOrder({
          orderFictitiousSn: this.orderFictitiousSn
          // orderFictitiousSn: '10802301318'
        });
        data.orderGoodsAmount = Number(data.orderGoodsAmount).toFixed(2);
        data.orderAmount = Number(data.orderAmount).toFixed(2);
        data.serviceList.map(item => {
          item.orderAmount = Number(item.orderAmount).toFixed(2);
          item.subtotal ? (item.subtotal = Number(item.subtotal).toFixed(2)) : "";
        });
        this.serviceData = data;
        if (data.orderState == 0) {
          this.timer = setInterval(() => {
            data.leftTime -= 1000;
            this.ShowCountDown(data.leftTime);
          }, 1000);
        } else {
          wx.showToast({
            title: '该订单已支付！',
            icon: 'none',
            mask: true
          })
          // 自己的订单跳转到订单详情，不是自己订单跳转到我的页面
          let auth = this.$storage.get('auth');
          if (this.serviceData.orderBuyerPhone != auth.phone) {
            setTimeout(() => {
              wx.switchTab({url: '/pages/my/index'});
            }, 1500)
          } else {
            setTimeout(() => {
              this.$router.replace({
                path: `/pages/order/orderDetails?orderFictitiousSn=${
                  this.orderFictitiousSn
                }`
              });
            }, 1500)
          }
        }
      } catch (e) {
        setTimeout(() => {
          wx.switchTab({url: '/pages/my/index'});
        }, 1500)
        if (e.response.data.msg == '订单已支付') {
          // wx.showModal({
          //   title: '',
          //   showCancel:false,
          //   confirmColor:"#10AEFF",
          //   content: '您当前登录微信绑定的拾贝会员手机号与该订单申请人手机号不相同，请更换微信账号再试！',
          //   success: () => {
          //     wx.switchTab({ url: '../my/index'})
          //   }
          // })
        }
      }
    },
    // 确认支付
    confirmPay () {
      let auth = this.$storage.get('auth');
      if (this.serviceData.orderBuyerPhone != auth.phone) {
        this.showModal = true;
      } else {
        this.wechatPayFn(true);
      }
    },
    // 微信支付
    wechatPayFn(data) {
      console.log(data)
      if (data) {
        let { orderFictitiousSn: orderSn, paymentSn } = this.serviceData;
        let auth = this.$storage.get('auth');
        this.wechatPay(orderSn, paymentSn, () => {
          // 清空缓存
          // 不是自己订单跳转至我的
          if (this.serviceData.orderBuyerPhone != auth.phone) {
            wx.switchTab({url: '/pages/my/index'});
          } else {
            this.$router.replace({
              path: `/pages/order/orderDetails?orderFictitiousSn=${
                orderSn
              }`
            });
          }
        });
      } else {
        this.showModal = true;
      }
    },

    ShowCountDown(leftTime) {
      let leftsecond = parseInt(leftTime / 1000);
      let dayFirst = Math.floor(leftsecond / (60 * 60 * 24));
      let hour = Math.floor((leftsecond - dayFirst * 24 * 60 * 60) / 3600);
      let minute = Math.floor(
        (leftsecond - dayFirst * 24 * 60 * 60 - hour * 3600) / 60
      );
      let second = Math.floor(
        leftsecond - dayFirst * 24 * 60 * 60 - hour * 3600 - minute * 60
      );
      this.residueTime =
        dayFirst + "天" + hour + "小时" + minute + "分" + second + "秒";
    }
  }
};
</script>

<style lang="scss">
page {
  background: #f8f8f8;
}
.parterOrder {
  margin-bottom: 338px;
  .deadline {
    display: flex;
    background: linear-gradient(
      90deg,
      rgba(246, 140, 140, 1) 0%,
      rgba(242, 165, 79, 1) 100%
    );
    height: 140px;
    padding: 30px 130px 30px 30px;
    .icon {
      font-size: 40px;
      color: #fff;
      width: 60px;
      height: 40px;
      height: 80px;
      line-height: 80px;
      padding-right: 20px;
    }
    > .des {
      font-size: 28px;
      line-height: 40px;
      color: #fff;
      flex-grow: 1;
    }
  }
  .buyerInfo{padding: 20px 30px 30px;background: #fff;margin-bottom: 20px;
    >h2{font-size: 28px;line-height: 40px;color:#333;font-weight: 600;}
    .nick{display: flex;padding-top: 20px;
      p{line-height: 37px;color:#333;font-size: 26px;}
      .des{color:#666;}
    }
  }
  .orderList {
    background: #fff;
    .explain {
      background: #f8f8f8;
      padding: 22px 20px 24px;
      display: flex;
      .des {
        flex-grow: 1;
        p {
          font-size: 26px;
          line-height: 37px;
          span {
            width: 153px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            vertical-align: bottom;
          }
        }
      }
      .watch {
        flex-basis: 122px;
        line-height: 74px;
        text-align: right;
        color: #2f80f6;
        font-size: 28px;
        text-align: right;
      }
    }
  }
  .storeName {
    line-height: 80px;
    font-size: 28px;
    color: #333;
    padding: 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    font-size: 0;
    background: #f8f8f8;
    position: relative;
    margin-bottom: 20px;
    > img {
      width: 130px;
      height: 130px;
    }
    // &::after{position: absolute;content: '';height: 2px;background: #eee;bottom: 0;left: 20px;width: 730px;}
    &:last-child {
      margin-bottom: 0;
    }
  }
  .trademarkItem {
    display: block;
    padding: 0;
    > div {
      display: flex;
      padding-bottom: 30px;
      width: 750px;
      padding: 30px 20px;
      font-size: 0;
      background: #f8f8f8;
      position: relative;
      > img {
        width: 130px;
        height: 130px;
      }
      &::after {
        position: absolute;
        content: "";
        height: 2px;
        background: #eee;
        bottom: 0;
        left: 20px;
        width: 730px;
      }
      &:last-child {
        &::after {
          height: 0;
        }
      }
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
        transform: translateY(4px);
      }
    }
  }
  .infoWrap {
    background: #fff;
    padding-left: 20px;
    .info {
      display: flex;
      line-height: 90px;
      border-bottom:1px solid #eee;
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
        font-size: 34px;
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
}
</style>
