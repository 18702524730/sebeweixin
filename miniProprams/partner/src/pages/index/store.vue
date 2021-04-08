<template>
 <!-- <div class="storeIndex" id="store" @touchstart="handleTouchStart" @touchend="handleTouchEnd"> -->
 <div class="storeIndex" id="store">
   <div class="storeIndexTitle">
    <div class="storeTitle" @click="handleClickStoreTitle">
      <div class="imgBox">
        <img v-if="storeInfo.avatar" :src="storeInfo.avatar" class="avator" />
        <img v-if="auth && auth.isAuthentication" class="vip" src="~assets/img/store/vip.png" alt="">
      </div>
      <div class="store">
        <div class="storeName">
          <h2>{{storeInfo.storeName}}</h2>
          <div class="realName" v-if="auth && auth.isAuthentication"><i class="icon iconfont icon-xiaochengxu-4"></i></div>
          <div class="realName" v-if="auth && !auth.isAuthentication"><i class="icon iconfont icon-xiaochengxu-5"></i></div>
          <img class="settingIcon" src="~assets/img/icon/set.png" alt="">
        </div>
        <p v-if="auth">{{ storeInfo.introduce ? storeInfo.introduce :'欢迎来到' + (auth.nickname || '不知名人士') + '的店'}}</p>
      </div>
    </div>
    <div class="share" @click="testShare(storeInfo.avatar)">
      <i class="icon iconfont icon-zhuanfa" style="color:#fff"></i>
      分享
    </div>
    <div class="storeTab" v-if="auth && category.length > 0">
      <div class="search" @click="$router.push('/pages/store/search')">
        <i class="icon iconfont icon-sousuo"></i>
        <i class="text">搜索</i>
      </div>
      <scroll-view :scroll-x="true">
        <div class="weui-navbar">
          <block v-for="(item, index) in category" :key="index" :id="index" :classId="item.firstCategory">
            <div :id="index" :class="{'weui-bar__item_on':tabsActiveIndex == index}" class="weui-navbar__item" @click="selectTabFn">
              <div class="weui-navbar__title">{{item.name}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
      </scroll-view>
    </div>
   </div>
    <div class="empty" v-if="!total">
      <img src="~assets/img/store/emptyImg.png" alt="">
            <p>您的店铺暂无商品，赶紧来布置您的商品吧</p>
      <button class="upServiceBtn" @click="toShelf(false)">上架服务</button>

      <!-- <p>您的店铺暂无商品，点击“添加服务”挑选合适商品上架吧！</p>
      <div class="upServiceBtn storeIntroduce" @click="toShelf(false)">
        店铺攻略
        <p class="hoverP">
          看完的都赚了大钱！
          <span id="triangle-up"></span>
        </p>
      </div>
      <button class="upServiceBtn" @click="toShelf(false)">添加服务</button> -->
    </div>
    <div class="storeIndexContent1" v-if="total">
      <!-- <div class="upProductWrap" v-if="total">
        <div class="upBtn" @click="toShelf(false)">上架商品</div>
      </div> -->
      <goods-itemup
        v-for="(item, index) in serviceList"
        :item="item"
        @under="underProduct(item.productNum)"
        @show="handleClickProduct(item.productNum)"
        @hide="hideMask"
        @share="testShare(item)"
        @top="toTop(item.productNum)"
        :storeCode="storeInfo.storeCode"
        :key="index"
        ></goods-itemup>
        <div class="botTip" v-if="totalPages == pageIndex && total > 3">我是有底线的~</div>
    </div>
    <div class="recommend" v-if="!total">
      <h2>
        <span class="text">为您推荐</span>
      </h2>
      <div class="storeIndexContent">
        <goods-item :shelfState="false" v-for="(item, index) in serviceList" :key="index" :item="item"></goods-item>
      </div>
    </div>
    <div :class="['demand', demandBtnStatus ? 'show' : 'hide']" v-if="total" @click="toShelf(false)">
      <p>添加服务</p>
    </div>

    <u-modal :showModal="showModal" :options="options" :content="'您的店铺还没有上架任何服务商品哦！'" @confirmBtn="confirmFn" @hide="hideFn" ></u-modal>
 </div>
</template>

<script>
import GoodsItem from "./components/goodsItem.vue";
import goodsItemup from "./components/goodsItemup.vue";
import Tabs from "@/components/weui/navbar.vue";
let timer = null;
export default {
  components: {
    GoodsItem,
    goodsItemup
  },
  data() {
    return {
      category: [],
      pageIndex: 1,
      pageCount: 5,
      totalPages: 2,
      total: 1, // 本店已上架服务数
      tabsActiveIndex: 0,
      storeInfo: {},
      serviceList: [],
      auth: "", // 认证相关信息
      showModal: false,
      options: {
        showCancel: true,
        cancelText: "稍后分享",
        cancelColor: "#000000",
        confirmText: "去上架服务",
        confirmColor: "#2F80F6"
      },
      demandBtnStatus: true,
      scrollTop: 0,
      // timer: null,
      productDetail: "" // 分享时服务详情
    };
  },
  computed: {
    navbarSliderClass() {
      return "weui-navbar__slider_" + this.tabsActiveIndex;
    }
  },
  async onLoad() {

  },
  onHide () {
    this.category = []
    this.storeInfo = {}
    this.auth = ''
    this.productDetail = "" // 分享时服务详情
  },
  async onShow() {
    setTimeout(() => {
      console.log('change tab')
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#4172FF'
      })
    }, 200);
    this.demandBtnStatus = true;
    this.pageIndex = 1;
    this.storeInfo = this.$storage.get('storeInfo') || {};
    this.storeInfo.storeCode ? '' : await this.getStoreInfo();
    this.category = this.$storage.get('category') || [];
    if (!this.category.length) {
      this.tabsActiveIndex = 0;
      await this.getStoreCategory()
    }
    this.productList(false, true);
    this.auth = this.$storage.get("auth");
    this.$set(this.auth, "num", 1);

  },
  mounted() {

  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=6",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  // 下拉刷新方法，与methods方法同级
  async onPullDownRefresh() {
    console.log("下拉刷新");
    this.pageIndex = 1;
    this.productList();
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  /* 活动时隐藏添加服务，滑动结束显示添加服务，低端机显示效果不佳
  onPageScroll (e){ // 获取滚动条当前位置
    if (this.demandBtnStatus) {
      this.demandBtnStatus = false
    }
    timer&&clearTimeout(timer);
    timer = setTimeout(() => {
      wx.nextTick(() => {
        this.demandBtnStatus = true
      })
      clearTimeout(timer);
    }, 100)
  },
  */
  // 上拉加载，拉到底部触发
  onReachBottom() {
    if (this.totalPages > this.pageIndex) {
      this.productList(true);
    }
  },
  methods: {
    // 提交需求
    handleClickDemand () {
      this.$storage.remove('demandObj');
      this.$storage.remove('demandItem');
      this.$router.push('/pages/store/demand')
    },
    // 
    handleTouchStart () {
      this.demandBtnStatus = false;
    },
    handleTouchEnd () {
      wx.nextTick(() => {
        this.demandBtnStatus = true
      })
    },
    // 隐藏弹窗
    hideFn() {
      this.showModal = false;
    },
    // 弹窗回调
    confirmFn(data) {
      if (data) {
        this.$router.push("/pages/store/service");
      }
      this.showModal = false;
    },

    handleClickStoreTitle() {
      this.$router.push("/pages/store/storeInfo")
    },
    hideMask() {
      this.serviceList.map(item => {
        item.showMenuState = false;
      });
      this.$set(this.serviceList[0], "num", 1);
    },
    async toTop(num) {
      await this.API.store.stickProduct({
        productNum: num,
        storeCode: this.$storage.get("storeCode")
      });
      this.productList();
    },
    handleClickProduct(num) {
      this.serviceList.map(item => {
        item.productNum === num
          ? (item.showMenuState = true)
          : (item.showMenuState = false);
      });
      this.$set(this.serviceList[0], "num", num);
    },
    async underProduct(num) {
      await this.API.store.underProduct({
        storeCode: this.$storage.get("storeCode"),
        productNum: num
      });
      this.getStoreCategory();
      if (this.total == 1 && this.tabsActiveIndex != 0) {
        this.tabsActiveIndex = 0;
      }
      this.productList();
    },
    async getStoreInfo() {
      let data = await this.API.store.storeInfo({});
      if (data) {
        this.storeInfo = data;
        this.$storage.set("storeInfo", this.storeInfo);
        this.$storage.set("storeCode", this.storeInfo.storeCode);
        this.$storage.set("storeName", this.storeInfo.storeName);
      }
    },
    async getStoreCategory() {
      let data = await this.API.store.storeCategory({
        storeCode: this.storeInfo.storeCode
      });
      if (data && data.length == 0) {
        this.category = []
      }
      if (data&&data.length > 0) {
        data.unshift({ firstCategory: 999, name: "全部" });
        this.category = data;
        this.$storage.set("category", this.category);
      }
    },
    async productList(type, noShowLoading) {
      !type ? (this.pageIndex = 1) : this.pageIndex++;
      let params = {
        pgIndex: this.pageIndex,
        pgCount: this.pageCount,
        storeCode: this.storeInfo.storeCode
      };
      if (this.tabsActiveIndex + 0 !== 0) {
        Object.assign(params, {
          firstCategory: this.category[this.tabsActiveIndex].firstCategory
        });
      }
      if (noShowLoading) {
        params.noShowLoading = noShowLoading;
      }
      let data = await this.API.store.productList(params);
      if (data) {
        data.elements.map(item => {
          item.salePrice = Number(item.salePrice).toFixed(2);
          item.extract = Number(item.extract).toFixed(2);
        });
        this.total = data.totalElements;
        if (!this.total) {
          if (this.tabsActiveIndex+0 === 0){
            this.$storage.remove('category')
            this.category = []
          }
        }
        this.totalPages = data.totalPages;
        let newArr = this.serviceList;
        this.serviceList = [];
        type
          ? (this.serviceList = newArr.concat(data.elements))
          : (this.serviceList = data.elements);
      }
    },
    toShelf(num) {
      num
        ? this.$router.push("/pages/store/serviceDetail?productNum=" + num)
        : this.$router.push("/pages/store/service");
    },
    goSearch() {
      this.$router.push("/pages/store/search");
    },
    selectTabFn(e) {
      console.log(e);
      this.tabsActiveIndex = parseInt(e.currentTarget.id);
      this.productList();
    },
    testShare (item) {
      if (!this.total) {
        this.showModal = true
        return
      }
      let query = {
        storeCode: this.storeInfo.storeCode,
        avatar: this.storeInfo.avatar,
        storeName: this.storeInfo.storeName
      }
      if (item.productNum) {
        query = Object.assign({}, item, query)
      }
      this.$router.push({
        path: '/pages/store/share',
        query
      })
    }
  }
};
</script>

<style lang="scss">
page {
  background: #f8f8f8;
}
.storeIndex {min-height: 100%;width: 100%;
  .upShelf {
    position: fixed;
    right: 0;
    bottom: 30px;
    display: flex;
    color: #F64744;
    width: 155px;
    height: 80px;
    font-size: 28px;
    border-radius: 40px 0 0 40px;
    background: #fff;
    line-height: 80px;
    padding-left: 10px;
    box-shadow:0px 8px 16px 0px rgba(187,187,187,0.2);
    .icon {
      font-size: 32px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background:linear-gradient(138deg,rgba(253,114,146,1) 0%,rgba(253,94,44,1) 100%);
      color: #fff;
      text-align: center;
      line-height: 60px;
      margin: 10px 10px 0 0;
    }
  }
 
  .weui-navbar {
    position: static;
    width: 570px;
    border-bottom: none;
    transform: translateX(20px);
    .weui-navbar__item {
      flex: none;
      color: #fff;
      height: 90px;
      line-height: 90px;
      padding: 0;
      padding: 0 22px;
      .weui-navbar__title {
        color: #fff;
        line-height: 90px;
        font-size: 28px;
      }
    }
    .weui-bar__item_on {
      .weui-navbar__title {
        font-weight: 500;
      }
    }
    .weui-navbar__slider {
      height: 4px;
      background: #fff;
    }
    .weui-navbar__slider_0 {
      left: 22rpx;
      width: 56px;
      transform: translateX(0);
    }
    .weui-navbar__slider_1 {
      left: 22rpx;
      width: 106px;
      transform: translateX(98rpx);
    }
    .weui-navbar__slider_2 {
      left: 22rpx;
      width: 106px;
      transform: translateX(248rpx);
    }
    .weui-navbar__slider_3 {
      left: 22rpx;
      width: 106px;
      transform: translateX(396rpx);
    }
    .weui-navbar__slider_4 {
      left: 22rpx;
      width: 106px;
      transform: translateX(544rpx);
    }
    .weui-navbar__slider_5 {
      left: 22rpx;
      width: 106px;
      transform: translateX(692rpx);
    }
    .weui-navbar__slider_6 {
      left: 22rpx;
      width: 106px;
      transform: translateX(840rpx);
    }
    .weui-navbar__slider_7 {
      left: 22rpx;
      width: 106px;
      transform: translateX(988rpx);
    }
  }
  .empty {
    background: #fff;
    padding: 60px 0 90px;
    img {
      width: 470px;
      height: 300px;
      margin-left: 140px;
    }
    p {
      width: 750px;
      color: #999;
      font-size: 24px;
      line-height: 33px;
      margin-bottom: 20px;
      text-align: center;
    }
    .upServiceBtn {
            background: #2f80f6;
      width: 200px;
      height: 68px;
      border-radius: 34px;
      margin: 0 auto;

      // background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
      // width: 184px;
      // height: 66px;
      // border-radius: 33px;
      // margin: 0 15px;
      padding: 0;
      display: block;
      // border: none;
      // display: inline-block;
      color: #fff;
      line-height: 64px;
    }
    .storeIntroduce{background: #fff;border:1px solid rgba(187,187,187,1);color: #333;margin-left: 176px;line-height: 64px;text-align: center;position: relative;
      .hoverP{position: absolute;bottom: -63px;left: -111px;display: inline-block;width: 236px;line-height: 46px;background:linear-gradient(270deg,rgba(255,200,123,1) 0%,rgba(255,162,0,1) 100%);color: #fff;font-size: 24px;border-radius: 5px;margin: 0;
        >span{position: absolute;top: -11px;right: 25px;}
      }
    }
  }
  .storeIndexTitle {
    padding: 20px 20px 0;
    background: linear-gradient(
      180deg,
      rgba(66, 114, 255, 1) 0%,
      rgba(35, 141, 255, 1) 100%
    );
    .storeTitle {
      display: flex;
      padding-bottom: 20px;
      .imgBox {
        position: relative;
        width: 90px;
        height: 90px;
        border-radius: 45px;
        font-size: 0;
        position: relative;
        background: #fff;
        .vip {
          position: absolute;
          top: -18px;
          left: 8px;
          width: 36px;
          height: 28px;
          z-index: 1;
        }
        .avator{
          position: absolute;
          top: 0;
          left: 0;
          width: 90px;
          z-index: 2;
          height: 90px;
          border-radius: 45px;
        }
      }
      img {
        width: 90px;
        height: 90px;
        border-radius: 45px;
      }
      .store {
        flex-grow: 1;
        padding-left: 20px;
        width: 477px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .storeName {
          display: flex;
          line-height: 56px;
          .realName {
            font-size: 18px;
            color: #238dff;
            border-radius: 15px;
            line-height: 30px;
            height: 30px;
            width: 98px;
            margin: 14px 0 0 0px;
            .icon {
              display: block;
            }
            >img{width: 30px;height: 30px;}
          }
          .norealName {
            background: none;
            border:1px solid rgba(255, 255, 255, 0.8);
            border-radius: 15px;
            line-height: 26px;
            width: 83px;
            text-align: center;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.8);
            height: 30px;
            margin: 14px 0 0 0px;
          }
          .icon {
            font-size: 110px;
            color: #fff;
          }
          .settingIcon{width: 30px;height: 30px;margin: 14px 0 0 14px;}
        }
        h2 {
          font-size: 32px;
          color: #fff;
          line-height: 56px;
          font-weight: 600;
          max-width: 365px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          font-size: 24px;
          opacity: 0.8;
          color: #fff;
          line-height: 34px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 456px;
        }
      }
    }
    .storeTab {
      display: flex;height: 90px;
      .search {
        line-height: 60px;
        color: #fff;
        width: 148px;
        height: 60px;
        display: flex;
        border-radius: 30px;
        background: rgba(255, 255, 255, 0.2);
        align-self: center;
        padding-left: 20px;
        .icon {
          display: block;
          font-size: 30px;
          height: 60px;
          line-height: 60px;
          display: inline;
          color: #fff;
        }
        .text{display: inline;color: #fff;line-height: 60px;padding-left: 16px;}
      }
    }
    .share {
      width: 126px;
      height: 60px;
      background: linear-gradient(
        138deg,
        rgba(253, 114, 146, 1) 0%,
        rgba(253, 94, 44, 1) 100%
      );
      padding-left: 20px;
      display: flex;
      border-radius: 30px 0 0 30px;
      line-height: 60px;
      color: #fff;
      font-size: 24px;
      position: absolute;
      right: 0;
      top: 47px;
      img {
        height: 30px;
        width: 30px;
      }
      .icon {
        font-size: 30px;
        width: 30px;
        height: 30px;
        line-height: 60px;
        margin-right: 8px;
      }
    }
  }
  .storeIndexContent1 {
    .botTip {
      font-size: 24px;
      color: #bbb;
      line-height: 33px;
      padding: 20px 0 67px;
      text-align: center;
    }
    .upProductWrap{height: 80px;background: #f8f8f8;padding-top: 20px;
      .upBtn{height: 60px;line-height: 60px;border-radius: 30px;margin: 0 20px;background: #fff;text-align: center;color: #f64744;font-size: 24px;}
    }
  }
  .recommend {
    padding: 0 20px;
    // margin-bottom: 138px;
    > h2 {
      text-align: center;
      font-size: 28px;
      color: #999;
      line-height: 40px;
      padding-top: 20px;
      .text {
        padding: 0 34px;position: relative;
        &::after{content: '';position: absolute;top: 19px;right: -60px;width: 60px;height: 2px;border-top: 1px solid #ddd;}
        &::before{content: '';position: absolute;top: 19px;left: -60px;width: 60px;height: 2px;border-top: 1px solid #ddd;}
      }
      >.line{color: #ddd;height: 2px;border-top: 1px solid #000;width: 60px;}
    }
    .storeIndexContent {
      display: flex;
      flex-wrap: wrap;
      > div {
        &:nth-child(odd) {
          margin-right: 20px;
        }
      }
    }
  }
  .demand{width: 224px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
    box-shadow:0px 8px 40px 0px rgba(47,128,246,0.25);border-radius: 40px;font-size:0;color: #fff;position: fixed;bottom: 30px;
    left: 50%;margin-left: -112px;text-align: center;transition: all .3s;z-index: 15;
    &.show{opacity: 1;}
    &.hide{opacity: 0.1;}
    >img{width: 36px;height: 26px;padding-right: 10px;font-size: 0;vertical-align: middle;line-height: 66px;display: inline-block;
    transform: translateY(-3px);
    }
    >p{display: inline-block;color: #fff;vertical-align: middle;font-size: 26px;line-height: 66px;}
  }
  #triangle-up{
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 13px solid #FFC87B;
  }
}
</style>
