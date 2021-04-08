<template>
 <div class="detailWrap">
   <div class="detailImg" v-if="productDetail.picture" :style="{background: 'url(' + productDetail.picture + ') no-repeat center center', backgroundSize: 'cover'}">
   </div>
   <div class="serviceDes">
     <h2>{{productDetail.productPriceName}}</h2>
     <p class="des">{{productDetail.introduce}}</p>
     <div >
      <div class="priceWrap">
        <div class="price"><b>￥</b>{{productDetail.standardPriceText}}</div>
      </div>
     </div>
     </div>
     <div id="tabs" :class="[menuFixed ? 'fixed' : '', 'tabs']" :style="{borderBottom: tabsActiveIndex != 0 ? '1px solid #eee' : 'none'}"><tabs :tabs="tabs" :activeIndex="tabsActiveIndex" :width="375" @selectTab="selectTabFn"></tabs></div>
      <div class="slide" v-if="tabsActiveIndex != 0" :style="{padding: '15px 15px 25px 15px', marginTop: menuFixed ? '45px': '0'}">
        <rich-text v-if="productDetail.commonProblem" :nodes="productDetail.commonProblem"></rich-text>
      </div>
      <div class="slide slideImg" :style="{marginTop: menuFixed ? '45px': '0'}" v-else>
        <rich-text v-if="productDetail.businessIntroduction" :nodes="productDetail.businessIntroduction"></rich-text>
      </div>
     <div class="bottom">
       <div class="btn" @click="buyState = true">立即购买</div>
     </div>
      <div class="transition_up" v-if="buyState" :class="{'show_animation': buyState}">
        <div class="mask_bg"  @click="hideFn"></div>
        <div class="transition_wrap" >
          <div class="shareTransitionContent">
            <div class="buyItem">
              <img :src="productDetail.picture" />
              <div class="productName">{{productDetail.productName}}</div>
            </div>
            <div class="buyNum">
              <div class="des">购买数量</div>
              <div class="numWrap">
                <div :style="{background: buyNum == 1 ? '#eee' : '#ddd'}" @click="changeNum">-</div>
                <input type="number" v-model="buyNum" class="num">
                <!-- <p class="num">{{buyNum}}</p> -->
                <div style="background: #ddd" @click="changeNum('+')">+</div>
              </div>
            </div>
            <div class="btn" @click="handleClickConfirm">确定</div>
            <span @click="buyState = false">×</span>
          </div>
        </div>
      </div>
      <u-message />
 </div>
</template>

<script>
import Tabs from "@/components/weui/navbar.vue";
import CheckBox from "@/components/weui/checkBox.vue";
export default {
  data() {
    return {
      storeInfo: {},
      wx: wx,
      tabs: ["服务介绍"],
      tabsActiveIndex: 0,
      checkState: true,
      menuFixed: false, // tabs吸顶状态
      menuTop: '', // tabs距离顶部距离
      buyState: false, // 购买弹框
      productDetail: {},
      showModal: false,
      productNum: "",
      storeCode: '',
      buyNum: 1
    };
  },
  computed: {
    maxPrice() {
      let val;
      this.productDetail.guidePrice
        ? (val = (this.productDetail.guidePrice * 2).toFixed(2))
        : (val = "");
      return val;
    },
    minPrice() {
      let val;
      this.productDetail.guidePrice
        ? (val = (this.productDetail.guidePrice * 0.8).toFixed(2))
        : (val = "");
      return val;
    }
  },
  components: { Tabs, CheckBox },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  mounted() {
    this.buyState = false;
    this.buyNum = 1;
    this.getProductDetail();
  },
  onPageScroll (e){
    e.scrollTop > this.menuTop ? this.menuFixed = true : this.menuFixed = false
  },
  methods: {
    handleClickConfirm () {
      let reg = /^[1-9]\d{0,1}$/;
      if (!reg.test(this.buyNum)) {
        this.$message({content: '请输入45以内的正整数！', type: 'error'});
        return;
      }
      if (this.buyNum > 45) {
        this.$message({content: '单次最多购买45个', type: 'error'});
        return;
      }
      let data = {
          imgSrc: this.productDetail.picture,
          id: 87,
          shopProductId: this.productDetail.productId,
          shopProductTypeIdProductType: this.productDetail.productTypeId,
          shopProductTypeIdServiceType: this.productDetail.serviceTypeId,
          number: this.buyNum,
          title: this.productDetail.productPriceName,
          desc: this.productDetail.activityName + this.productDetail.activityPrice + '元',
          price: this.productDetail.standardPrice,
          // idCode: this.isErrIdcode ? '' : idcode
      }
      let query = this.$root.$mp.query;
      this.$router.push({path: "/pages/index/confirmOrder", query: Object.assign({}, data, query)});
    },
    //联系商家
    makePhone() {
      wx.makePhoneCall({
        phoneNumber: this.$route.query.phone || this.storeInfo.phone
      });
    },
    //
    changeNum(type) {
      type == "+" ? this.buyNum++ : this.buyNum == 1 ? "" : this.buyNum--;
    },
    async getProductDetail() {
      try {
        let data = await this.API.homePage.czDetail({priceId: 87});
        data.data.picture = data.data.picture.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
        data.data.standardPriceText = Number(data.data.standardPrice).toFixed(2);
        data ? (this.productDetail = data.data) : "";
        setTimeout(() => {
          var query = wx.createSelectorQuery()
          query.select('#tabs').boundingClientRect()
          query.exec( (res)  => {
            this.menuTop = res[0].top
          })
        }, 100)
      } catch (e) {

      }
    },
    selectTabFn(e) {
      console.log(e);
      this.tabsActiveIndex = e;
    },

  }
};
</script>

<style lang="scss">
page {
  background: #f8f8f8;
}
.detailWrap {
  padding-bottom: 98px;min-height: 100%;
  .weui-cells:before,
  .weui-cells:after {
    border: none;
  }
  .weui-cell {
    margin: 0 250px;
    padding: 0;
  }
  .weui-navbar {
    position: relative;
  }
  .weui-navbar__item {
    flex-basis: 120px;
  }
  .check_box .weui-check__label {
    border: none;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    height: 98px;
    line-height: 98px;
    z-index: 1000;
    .share {
      flex-basis: 150px;
      background: #fff;
      color: #2f80f6;
      text-align: center;
      font-size: 22px;
      .icon {
        font-size: 36px;
        width: 150px;
        color: #2f80f6;
        height: 42px;
        line-height: 42px;
        margin-top: 12px;
        display: block;
      }
      p {
        line-height: 30px;
        font-size: 22px;
        color: #2f80f6;
      }
    }
    .btn {
      background: linear-gradient(
        90deg,
        rgba(0, 150, 255, 1) 0%,
        rgba(47, 128, 246, 1) 100%
      );
      flex-grow: 1;
      text-align: center;
      color: #fff;
      font-size: 32px;
    }
  }
  .detailImg {
    position: relative;
    font-size: 0;
    height: 750px;
    background-size: 750px 750px;
    > img {
      width: 750px;
      height: 750px;
    }
  }
  .serviceDes {
    padding: 30px 20px 0;
    background: #fff;
    margin-bottom: 20px;
    > h2 {
      font-size: 32px;
      color: #333;
      line-height: 45px;
      padding-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 710px;
    }
    .des {
      font-size: 24px;
      color: #999;
      line-height: 33px;
      padding-bottom: 20px;
    }
    .priceWrap {
      display: flex;
      padding-bottom: 30px;
      .icon {
        font-size: 40px;
        color: #ff9639;
      }
      label {
        border:1px solid #f64744;
        font-size: 24px;
        line-height: 36px;
        padding: 0 10px;
        height: 42px;
        color: #f64744;
        align-self: center;
      }
      .price {
        display: flex;
        font-size: 48px;
        line-height: 67px;
        color: #f64744;
        padding: 0;
        flex-grow: 1;
        b {
          font-size: 24px;
          color: #f64744;
          align-self: flex-end;
          line-height: 50px;
        }
      }
      .editPrice {
        color: #2f80f6;
        font-size: 24px;
        align-self: flex-end;
        line-height: 50px;
      }
      > img {
        width: 50px;
        padding-top: 26px;
      }
    }

  }

  .shareTransitionContent {
    position: relative;
    text-align: center;
    .shareTitle {
      color: #333;
      font-size: 32px;
      line-height: 45px;
      padding: 60px 0 40px;
    }
    .shareIcon {
      display: flex;
      padding-left: 110px;
      > div,
      > .user {
        font-size: 0;
        padding: 0 65px;
        border: none;
        img {
          height: 120px;
          width: 120px;
        }
        p {
          font-size: 30px;
          color: #333;
          line-height: 42px;
          padding: 20px 0 60px;
        }
      }
    }
    > span {
      position: absolute;
      width: 90px;
      height: 90px;
      line-height: 90px;
      font-size: 60px;
      right: 0;
      z-index: 1002;
      top: 0;
      color: #ddd;
    }
    .btn {
      background: linear-gradient(
        90deg,
        rgba(0, 150, 255, 1) 0%,
        rgba(47, 128, 246, 1) 100%
      );
      height: 98px;
      line-height: 98px;
      color: #fff;
      font-size: 32px;
    }
    .buyItem {
      display: flex;
      padding: 40px 0 30px;
      font-size: 0;
      margin: 0 30px;
      border-bottom:1px solid #eee;
      img {
        width: 160px;
        height: 160px;
      }
      > div {
        flex: 1;
        text-align: left;
        font-size: 28px;
        color: #333;
        line-height: 40px;
        padding-left: 20px;
      }
    }
    .buyNum {
      display: flex;
      padding: 30px 30px 40px;
      .des {
        line-height: 60px;
        font-size: 30px;
        color: #333;
        flex-grow: 1;
        text-align: left;
      }
      .numWrap {
        display: flex;
        div {
          height: 60px;
          width: 60px;
          text-align: center;
          line-height: 54px;
          color: #fff;
          background: #eee;
          font-size: 48px;
          font-weight: 600;
        }
        .num {
          font-size: 30px;
          line-height: 60px;
          height: 60px;
          width: 113px;
          text-align: center;
          background: none;
          font-weight: normal;
          color: #333;
          display: block;
        }
      }
    }
  }
  .slide {
    background: #fff;
    p {
      padding: 0 20px;
    }
    > image {
      width: 750px;
      height: 100%;
    }
  }
  .slideImg {
    min-height: 1200px;
    font-size: 0;
  }
  .tabs{background: #fff;height: 90px;
    &.fixed{
      position: fixed;width: 750px;top: 0; left: 0;
    }
    .pub_navbar{width: 25%;height: 88px;margin-left: -16px;
      .weui-navbar__slider_0 {
        transform: translateX(0);
      }
      .weui-navbar__item{height: 90px;
        .weui-navbar__title{font-size: 28px;height: 90px;line-height: 106px;border-bottom: 4px solid rgba(255,255,255,0);}
      }
      .weui-bar__item_on{
        .weui-navbar__title{border-bottom: 4px solid #2F80F6;}
      }
      .weui-navbar__slider{width: 120px;height: 0;}
    }
  }
  @keyframes moveUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes moveDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .transition_up {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 8999;
    .mask_bg {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 9000;
      background: rgba(0, 0, 0, 0.5);
    }
    .transition_wrap {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 9001;
      width: 100%;
      height: auto;
      background: #fff;
      box-shadow: 0px -10px 30px 0px rgba(47, 128, 246, 0.09);
      border-radius: 10px 10px 0px 0px;
      overflow: hidden;
    }
  }
  .show_animation {
    .mask_bg {
      animation: fadeIn 0.3s ease-out;
      display: block;
    }
    .transition_wrap {
      animation: moveUp 0.3s ease-out;
      bottom: 0;
    }
  }
}
</style>
