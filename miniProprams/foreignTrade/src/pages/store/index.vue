<template>
 <div class="storeIndex" :style="{'background': total ? 'none' : '#fff'}">
   <div class="storeIndexTitle">
    <div class="storeTitle">
      <div class="imgBox">
        <img v-if="storeInfo.avatar" :src="storeInfo.avatar" />
        <img v-if="storeInfo.isAuthentication === 1" class="vip" src="~assets/img/store/vip.png" alt="">
      </div>
      <div class="store">
        <div class="storeName">
          <h2>{{storeInfo.storeName}}</h2>
          <div class="realName" v-if="storeInfo.isAuthentication === 1"><i class="icon iconfont icon-xiaochengxu-4"></i></div>
          <div class="realName" v-if="storeInfo.isAuthentication === 0"><i class="icon iconfont icon-xiaochengxu-5"></i></div>
        </div>
        <p>{{storeInfo.introduce}}</p>
      </div>
    </div>
    <div class="share" @click="handleShare">
      <i class="icon iconfont icon-zhuanfa" style="color:#fff"></i>
      分享
    </div>
    <div class="storeTab" v-if="total">
      <div class="search" @click="$router.push('/pages/store/search')">
        <i class="icon iconfont icon-sousuo"></i>
        <p>搜索</p>

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
     <img src="~assets/img/store/emptyImg.jpg" alt="">
     <p>该店铺暂无商品</p>
   </div>
   <div class="storeIndexContent1" v-if="total">

     <goods-itemup
      v-for="(item, index) in serviceList"
      :item="item"
      @under="underProduct(item.productNum)"
      :storeCode="storeInfo.storeCode"
      :phone="storeInfo.phone"
      :key="index"></goods-itemup>
      <div class="botTip" v-if="totalPages == pageIndex && total > 3">我是有底线的~</div>
   </div>
   <!-- <div class="recommend" v-if="!total">
    <h2>
      <span>——</span>
      <span class="text">为您推荐</span>
      <span>——</span>
    </h2>
    <div class="storeIndexContent">
      <goods-item :shelfState="false" v-for="item in serviceList" :key="item.productNum" :item="item"></goods-item>
    </div>
   </div> -->

  <div class="realNameDia" v-if="realNameDiaState">
    <div class="mask">
      <div class="realNameWrap">

        <div class="dia">
          <img src="~assets/img/store/realname.png" />
          <h2>实名认证</h2>
          <p>您还未实名认证，请先进行实名认证！</p>
          <div class="realNameBtn" @click="$router.push('/pages/authorize/realName')">去认证</div>
        </div>
        <div class="canel" @click="realNameDiaState = false"><sebe-icon type="close" size="40" /></div>
      </div>
    </div>
  </div>
  <div class="transition_up" v-if="shareDiaState" :class="{'show_animation': shareDiaState}">
    <div class="mask_bg" style="background: rgba(0, 0, 0, 0.5);"  @click="hideFn"></div>
    <div class="transition_wrap" >
      <div class="transition_content">
        <div class="shareTitle">分享给客户</div>
        <div class="shareIcon">
          <button class="user" @click="share" open-type="share">
            <img src="~assets/img/store/shareUser.png" alt="">
            <p>分享好友</p>
          </button>
          <div class="circle" @click="testShare">
            <img src="~assets/img/store/Moments.png" alt="">
            <p>分享朋友圈</p>
          </div>
        </div>
        <div class="btn" @click="hideFn">取消</div>
        <span @click="hideFn">×</span>
      </div>
    </div>
  </div>
  <div class="linkPhone" @click="makePhone">
    <i class="icon iconfont icon-dianhua"></i>
  </div>
  <canvas v-if="cavansState" canvas-id="shareCanvas" class="canvas"></canvas>
  <u-modal :showModal="showModal" :options="options" :content="'您的店铺还没有上架任何服务商品哦！'" @confirmBtn="confirmFn" @hide="hideFn" ></u-modal>

  <!-- 底部公共导航 -->
  <!-- <footerNav :active.sync="footerActive" /> -->

 </div>
</template>

<script>
import qs from 'qs'
import GoodsItem from './components/goodsItem.vue'
import goodsItemup from './components/goodsItemup.vue'
import Tabs from '@/components/weui/navbar.vue'
// import footerNav from "components/footerNav";
// import mixin from 'mixins/';
// import shareImageBg from '../../assets/img/store/storeShareBg.jpg' // https://testossfile.ipsebe.com/79BE737C5DB5B68C68D3A1114335C50F.jpg
// import storeShare from '../../assets/img/store/storeShare.png'
// import logo from '../../assets/img/homepage/aboutsebe.png'
export default {
  // mixins: [mixin],
  components: {
    GoodsItem, goodsItemup
  },
  data() {
    return {
      footerActive: 0,
      keyword: '您需要什么服务?',
      category: [
      ],
      pageIndex: 1,
      pageCount: 5,
      totalPages: 1,
      total: 1, // 本店已上架服务数
      tabsActiveIndex: 0,
      realNameDiaState: false,
      shareDiaState: false,
      storeInfo: {},
      serviceList: [],
      codeImgUrl: '', // 二维码地址
      cavansState: false,
      shareImage: '',
      showSharePic: false,
      auth: '', // 认证相关信息
      showModal: false,
      storeCode: '',
      options: {
        showCancel: true,
        cancelText: '稍后分享',
        cancelColor: '#000000',
        confirmText: '去上架服务',
        confirmColor: '#2F80F6'
      },
      bgUrl: '',
      wyUrl: '',
      shareAvaUrl: ''
    }
  },
  computed: {
    navbarSliderClass() {
      return 'weui-navbar__slider_' + this.tabsActiveIndex
    }
  },
  /*
  async onLoad (options) {
    // 获取二维码里参数
    if(options.scene){
      let scene=decodeURIComponent(options.scene);
      //&是我们定义的参数链接方式
      let storeCode = options.scene.split("&")[0];
      this.storeCode = storeCode;
      let memberId = options.scene.split('&')[1];
    }
    this.auth = wx.getStorageSync('auth')
  },
  */
  async onShow () {
    // this.storeCode = wx.getStorageSync('storeCode');
    // console.log('storeCode', this.storeCode)
    // if (!this.storeCode) {
      let query = this.$root.$mp.query;
      console.log('query', query, this.$route)
      let scene = query.scene;
      let memberId;
      let storeCode = query.storeCode ? query.storeCode : '';
      console.log('sence', scene)
      console.log('storeCode', storeCode)
      // let storeCode = query.storeCode;
      query =  !scene && !storeCode ? this.$storage.get('extraData') : query;
      this.$storage.remove('extraData')
      console.log('parterOrder_query:', query);
      scene = query.scene || '';
      if (!storeCode && scene.split('_').length === 3) {
        storeCode = scene ? scene.split('_')[2] : wx.getStorageSync('storeCode');
      } else if (!storeCode) {
        storeCode = scene ? scene.split('_')[0] : wx.getStorageSync('storeCode');
        // memberId = scene ? scene.split('_')[1] : '';
      }
      memberId = this.getMemberId();

      this.storeCode = storeCode;
      console.log('storeCode:', wx.getStorageSync('storeCode'), this.storeCode);
      // wx.getStorageSync("auth")
      //   ? this.init()
      //   : this.$router.push({path: '/pages/authorize/authorize', query: { path: '/pages/store/index', storeCode: this.storeCode }});
      // if (memberId) {
      //   memberId = parseInt(memberId);
      //   this.API.interfaces.iptPowerDaily({ memberId, shareId: this.storeCode }, {isLoading: false, errorAction: true});
      // }
      if (wx.getStorageSync("auth")) {
        this.init();
        if (memberId) {
          memberId = parseInt(memberId);
          this.API.interfaces.iptPowerDaily({ memberId, shareId: this.storeCode }, {isLoading: false, errorAction: true});
        }
      } else {
        this.$router.push({path: '/pages/authorize/authorize', query: { path: '/pages/store/index', storeCode: this.storeCode }});
      }
    // } else {
    //   this.init()
    // }
  },
  /*
  mounted() {
    let scene = this.$root.$mp.query.scene;
    scene = scene ? qs.parse(scene) : {}
    this.storeCode = scene.k ? scene.k : (this.$storage.get('storeCode') || '3180020090');
    this.$storage.set('storeCode', this.storeCode);
    wx.getStorageSync("auth")
      ? this.getStoreInfo()
      : this.$router.push({ path: "/pages/authorize/authorize", query: { path: `/pages/store/index`, k: params  } });
  },
  */
   onUnload () {
    this.category = []
    this.pageIndex = 1
    this.totalPages = 2
    this.total = 1 // 本店已上架服务数
    this.tabsActiveIndex = 0
    this.storeInfo = {}
    this.serviceList = []
    this.auth = ''
  },
  onShareAppMessage () {
    return {
      title: this.storeInfo.storeName + '的店铺',
      path: '/pages/store/index?storeCode=' + this.storeInfo.storeCode + '&memberId=' + this.$storage.get('auth').member_id
    }
  },
  // 下拉刷新方法，与methods方法同级
  async onPullDownRefresh() {
    this.pageIndex = 1
    this.productList()
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    if (this.totalPages > this.pageIndex) {
      this.productList(true)
    }
  },
  methods: {
    getMemberId () {
      let memberId;
      let query = this.$root.$mp.query;
      if (query.scene) {
        query.scene = decodeURIComponent(query.scene);
        // 兼容生成二维码scene为memberId = 123
        if (query.scene.indexOf('memberId=') != -1) {
          query.scene = qs.parse(query.scene);
          memberId = query.scene.memberId;
        } else {
          // 兼容生成二维码scene = 123
          memberId = query.scene.split('_')[1];
        }
      } else {
        // 分享给好友
        memberId = query.memberId;
      }
      console.log('getMemberId', memberId)
      return memberId;
    },
    async init () {
      this.pageIndex = 1
      await this.getStoreInfo()
      this.getStoreCategory()
      this.productList()
    },
    makePhone () {
      wx.makePhoneCall({
        phoneNumber: this.storeInfo.phone
      })
    },
    // 隐藏弹窗
    hideFn () {
      this.showModal = false;
    },
    // 弹窗回调
    confirmFn (data) {
      if (data) {
        this.$router.push('/pages/store/service')
      }
      else{
        // console.log('取消回调')
      }
      this.showModal = false;
    },
    testShare () {
      wx.showTabBar({
        animation: true
      })
      this.shareDiaState = false
      this.$router.push({
        path: '/pages/store/share',
        query: this.storeInfo
      })
    },
    // 分享点击事件
    handleShare () {
      wx.hideTabBar({
        animation: true
      })
      this.shareDiaState = true
    },
    async underProduct (num) {
      await this.API.store.underProduct({storeCode: this.$storage.get('storeCode'), productNum: num})
      this.productList()
    },
    async getStoreInfo () {
      try {
        let data = await this.API.store.storeInfo({storeCode: this.storeCode || wx.getStorageSync('storeCode') || '3180000001'})
        if (data) {
          this.storeInfo = data;
          wx.setNavigationBarTitle({title: this.storeInfo.storeName + '的店'});
          wx.setStorageSync('storeCode', this.storeInfo.storeCode)
          wx.setStorageSync('store', this.storeInfo)
        }
      } catch (err) {
        this.$storage.remove('storeCode');
      }
    },
    async getStoreCategory () {
      let data = await this.API.store.storeCategory({ storeCode: this.storeInfo.storeCode })
      if (data) {
        data.unshift({firstCategory : 999, name: '全部'})
        this.category = data
      }
    },
    async productList (type) {
      !type ? this.pageIndex = 1 : this.pageIndex++
      let params = { pgIndex: this.pageIndex, pgCount: this.pageCount, storeCode: this.storeInfo.storeCode }
      if (this.tabsActiveIndex+0 !== 0) {
        Object.assign(params, { firstCategory: this.category[this.tabsActiveIndex].firstCategory })
      }
      let data = await this.API.store.productList(params)

      if (data) {
        data.elements.map(item => {
          item.salePrice = Number(item.salePrice).toFixed(2)
        })
        this.total = data.totalElements
        this.totalPages = data.totalPages
        type ? this.serviceList = this.serviceList.concat(data.elements) : this.serviceList = data.elements
      }
    },
    share () {
      this.shareDiaState = false
      wx.showTabBar({
        animation: true
      })
    },
    goSearch () {
      this.$router.push('/pages/store/search')
    },
    hideFn () {
      this.shareDiaState = false
      wx.showTabBar({
        animation: true
      })
    },
    selectTabFn (e) {
      console.log(e);
      this.tabsActiveIndex = parseInt(e.currentTarget.id)
      this.productList()
    }
  }
}
</script>

<style lang="scss">
page{background: #f8f8f8;}
.storeIndex{
  padding-bottom: 40px;min-height: 100%;width: 100%;
  .transition_content{position: relative;text-align: center;
    .shareTitle{color: #333;font-size: 32px;line-height: 45px;padding: 60px 0 40px;}
    .shareIcon{display: flex;padding-left: 110px;
      >div, >.user{font-size: 0;padding: 0 65px;border: none;
        img{height: 120px;width: 120px;}
        p{font-size: 30px;color:#333;line-height: 42px;padding: 20px 0 60px;}
      }
    }
    >span{position: absolute;width: 90px;height: 90px;line-height: 90px;font-size: 60px;right: 0;z-index: 1002;top: 0;color: #ddd;}
    .btn{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);height: 98px;line-height: 98px;color: #fff;font-size: 32px;}
  }
  .weui-navbar{position: static;width: 570px;border-bottom: none;transform: translateX(20px);
    .weui-navbar__item{flex: none;color: #fff;height: 90px;line-height: 90px;padding: 0;padding: 0 22px;
      .weui-navbar__title{color: #fff;line-height: 90px;font-size: 28px;}
    }
    .weui-bar__item_on{
      .weui-navbar__title{font-weight: 500;}
    }
    .weui-navbar__slider{height: 4px;background: #fff;}
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
      left:22rpx;
      width: 106px;
      transform: translateX(248rpx);
    }
    .weui-navbar__slider_3 {
      left:22rpx;
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
      padding: 0;
      display: block;
      color: #fff;
      line-height: 64px;
    }
  }
  .storeIndexTitle{
    padding: 20px 20px 0;position: relative;
    background:linear-gradient(180deg,rgba(66,114,255,1) 0%,rgba(35,141,255,1) 100%);
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
    .storeTab{display: flex;height: 90px;
      .search{line-height: 60px;color: #fff;width: 148px;height: 60px;border-radius: 30px;background: rgba(255,255,255,.2);
        padding-left: 20px;display: flex;align-self: center;
        .icon{font-size: 30px;display: block;color: #fff;}
        p{color: #fff;padding-left: 16px;}
      }
    }
    .share{width: 126px;height: 60px;background:linear-gradient(138deg,rgba(253,114,146,1) 0%,rgba(253,94,44,1) 100%);padding-left: 20px;
    display: flex;
      border-radius: 30px 0 0 30px;line-height: 60px;color:#fff;font-size: 24px;position: absolute; right: 0;top:47px;
      img{height: 30px;width: 30px;}
      .icon{font-size: 30px;width: 30px;height: 30px;line-height: 60px;margin-right: 8px;}
    }
  }
  .storeIndexContent1{
    .botTip{font-size: 24px;color: #bbb;line-height: 33px;padding: 20px 0 67px;text-align: center;}

  }
  .recommend{
    padding: 0 20px;
    >h2{text-align: center;font-size: 28px;color: #999;line-height: 40px;padding-top: 20px;
      .text{padding: 0 34px;}
    }
    .storeIndexContent{display: flex;flex-wrap: wrap;
      >div{
        &:nth-child(odd){margin-right: 20px;}
      }
    }

  }

  .realNameDia{
    .mask{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      overflow: hidden;
      z-index: 9000;
      color: #fff;
    }
    .realNameWrap{
      position: absolute;top:50%;left: 50%;right: 0;margin-left: -260px;height: auto;
        transform: translateY(-50%);z-index: 12000;

      .dia{background: #fff;width: 520px;height: 585px;border-radius: 12px;margin-bottom: 60px;text-align: center;padding: 56px 70px 0;
        >img{width: 285px;height: 184px;}
        h2{font-size: 34px;line-height: 48px;font-weight: 600;color: #333;padding-top: 20px;}
        p{font-size: 28px;color: #999;line-height: 40px;padding: 20px 0 30px ;}
        .realNameBtn{height: 84px;line-height: 84px;background: #2f80f6;border-radius: 42px;font-size: 32px;color: #fff;}
      }
      .canel{width: 98px;height: 98px;border-radius: 49px;background: #fff;margin-left: 210px;text-align: center;line-height: 90px;position: relative;
        &:after{position: absolute;top: -60px;left: 48px;height: 60px;width: 1px;border-left:1px dashed #eee;content: '';}
      }
     }

  }
  .canvas{width: 750px;height: 1334px;position: fixed;left: -750px;top: 0;}
  .linkPhone{position: fixed; bottom: 40px;right: 20px;height: 100px;width: 100px;text-align: center;border-radius: 50px;
    background: #2f80f6;
    .icon{font-size: 60px;color: #fff;display: block;height: 100px;width: 100px;line-height: 100px;}
  }
}
</style>
