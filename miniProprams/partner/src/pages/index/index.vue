<template>
  <scroll-view class="indexWrap">
    <div class="bannerBg" :style="{'background': currentBanner.bannerBg, backgroundSize: 'cover'}">
      <div class="bannerWrap">
        <swiper v-if="bannerList&&bannerList.length" :indicator-dots="bannerList.length && bannerList.length > 1" class="banner"
          :autoplay="true" :interval="3500" :duration="500" :circular="true" @change="bannerChange" indicator-color="rgba(255,255,255, .2)" indicator-active-color="#fff" :skip-hidden-item-layout="true">
          <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item @click="toDetail(item)">
              <image :src="item.url" mode="aspectFill"/>
            </swiper-item>
          </block>
        </swiper>
        <div class="noticeWrap"  v-if="noticeList&&noticeList.length" @click="$router.push('/pages/index/notice')">
          <swiper :indicator-dots="false" class="notice" :vertical="true"
            :autoplay="true" :interval="4000" :duration="300" :circular="true">
            <block v-for="(item, index) in noticeList" :key="index">
              <swiper-item>
                  <i>要闻</i>
                  <p>{{item.title}}</p>
              </swiper-item>
            </block>
          </swiper>
        </div>
      </div>
    </div>
    <div class="mainTool" v-if="!loading">
      <div class="mainItem" @click="$router.push('/pages/store/demand')">
        <div class="img">
          <img src="~assets/img/index/demand.png" alt="">
        </div>
        <div class="des">提交需求</div>
      </div>
      <div class="mainItem" @click="toValetOrder">
        <div class="img"><img src="~assets/img/index/td.png" alt=""></div>
        <div class="des">代客下单</div>
      </div>
    </div>
    <!--  -->

    <div class="sebeWrap" v-if="!loading">
      <div class="sebeTit"  @click="$router.push('/pages/toolbox/index')">
        <div class="teach">工具</div>
        <div class="teachDes">工具在手，随心所欲 </div>
        <div class="more">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div>
      <div class="toolWrap">
        <div class="toolItem" @click="pathTo('wx6b2a8d87bb8c6ce4', 'pages/index/index')">
          <img src="~assets/img/index/tool1.png" mode="aspectFit" alt="">
          <div class="des">证据保</div>
        </div>
        <div class="toolItem" @click="pathTo('wxd3395f89f8ce776a', 'pages/tradmarkQuery/tradmarkQuery')">
          <img src="~assets/img/index/tool2.png" mode="aspectFit" alt="">
          <div class="des">商标检索</div>
        </div>
        <div class="toolItem" @click="toHtml">
          <img src="~assets/img/index/tool3.png" mode="aspectFit" alt="">
          <div class="des">专利检索</div>
        </div>
      </div>
    </div>
    <div class="sebeWrap footerWrap" v-if="teachList&&teachList.length" style="overflow:hidden;white-space:nowrap;">
      <div class="sebeTit"  @click="$router.push('/pages/index/teach')">
        <div class="teach">拾贝宝教程</div>
        <div class="teachDes">手把手带你玩转拾贝宝 </div>
        <div class="more">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div>
      <swiper :indicator-dots="teachList.length && teachList.length > 1" class="sebeBanner"
        :autoplay="true" :interval="5000" :duration="500" :circular="true" indicator-color="rgba(187,187,187,0.2)" indicator-active-color="#BBBBBB">
        <block v-for="(item, index) in teachList" :key="index">
          <swiper-item @click="$router.push('/pages/index/detail?id=' + item.id + '&type=2')">
            <image :src="item.url"/>
            <p class="des inline">{{item.title ? item.title : ''}}</p>
          </swiper-item>
        </block>
      </swiper>
      <!-- <scroll-view :scroll-x="true" class="sebeBanner" style="width: 100%;">
          <view class="scroll-view-item"  @click="$router.push('/pages/index/detail?id=' + item.id + '&type=2')" v-for="(item, index) in teachList" :key="index">
            <img :src="item.url" alt="">
            <p class="des">{{item.title ? item.title : ''}}</p>
          </view>
      </scroll-view> -->
    </div>
    <div class="_blank" v-if="!loading"></div>
  </scroll-view>
</template>

<script>
import mixin from 'mixins/';
export default {
  mixins: [mixin],
  data () {
    return {
      currentBanner: {},
      autoState: true,
      loading: true,
      bannerList: [],
      noticeList: [],
      teachList: [],
    }
  },
  onHide () {
    this.autoState = false;
  },
  async onShow () {
    this.autoState = true;
    if (this.currentBanner.bar) {
         wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.currentBanner.bar
        })
    }
    // await this.checkLoginAndMark('index');
    let data = await this.API.homePage.indexData()
    this.loading = false;
    this.bannerList = data['1']
    if (this.bannerList.length&&!this.currentBanner.params) {
      this.currentBanner = this.bannerList[0];
      if (this.currentBanner.params) {
        this.currentBanner.bar = this.currentBanner.params.split('&')[1]
        this.currentBanner.bannerBg = this.currentBanner.params.split('&')[0]
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.currentBanner.bar
        })
      }
    }
    this.noticeList = data['2'].slice(0, 5)
    console.log('noticeList', this.noticeList)
    data['4'].map(item => {
      if (item.summary.length && item.summary.length > 20) {
        item.summary = item.summary.slice(0, 19) + '...'
      }
    })
    data['5'].map(item => {
      if (item.summary.length && item.summary.length > 22) {
        item.summary = item.summary.slice(0, 21) + '...'
      }
    })
    this.teachList = data['5']
  },
  async onLoad () {
    this.loading = true;
    let auth = this.$storage.get('auth');
    if (!auth.isHaveStore) {
      wx.reLaunch({url: '/pages/authorize/authorize'})
      return
    }
  },
  mounted () {
    let memberObj = this.$storage.get("memberObj");
    let params = {};
    if (memberObj.memberId) {
      params.memberId = parseInt(memberObj.memberId);
      params.type = memberObj.type;
      if (memberObj.shareId) {
        params.shareId = parseInt(memberObj.shareId);
      }
      console.log('params', params)
      wx.removeStorageSync('memberObj')
      this.API.interfaces.iptPowerDaily(params, {isLoading: false, errorAction: true});
    }
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=1",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  components: {
    // footerNav
  },
  methods: {
    toDetail (item) {
      if (item.jumpType == 1 && !item.jumpUrl) {
        return
      }
      this.$router.push('/pages/index/detail?id=' + item.id + '&type=swiper&title=' + item.title)
    },
    // 前往代客下单
    async toValetOrder () {
      let total = await this.getProduct();
      if (total) {
        this.$storage.remove('createOrderData');
        this.$router.push('/pages/valetOrder/valetOrder');
      } else {
        wx.showToast({
          title: '请先前往店铺页面上架服务再代客下单！',
          icon: 'none',
          duration: 2000
        })
        // this.$mptoast('请先前往店铺页面上架服务再代客下单！');
      }
    },
    async getProduct () {
      let data = await this.API.store.productList({pgCount: 1, pgIndex: 1, storeCode: this.$storage.get('storeCode'), noShowLoading: true});
      return data.totalElements;
    },
    toHtml(){
      this.$router.push('/pages/index/ipEvaluation')
    },
    // 打开其他小程序
    pathTo(appId, path) {
      wx.navigateToMiniProgram({
        appId,
        path,
        envVersion: 'trial'
      });
    },
    bannerChange (e) {
      let curIndex = e.mp.detail.current;
      this.currentBanner = this.bannerList[curIndex];
      if (this.currentBanner.params) {
        this.currentBanner.bar = this.currentBanner.params.split('&')[1]
        this.currentBanner.bannerBg = this.currentBanner.params.split('&')[0]
        if(this.autoState){
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: this.currentBanner.bar,
            animation: {
              duration: 500,
              timingFunc: 'easeIn'
            }
          })
        }
      }
    },
    toDemand(){
      this.$router.push('/pages/demandManage/demandLists')  
    },
    // 查询有无可收取珍珠
    async showIptDot () {
      try{
        let data = await this.API.homePage.beachIptInfo();
        console.log(data)
        if (data && data.length > 0) {
          wx.showTabBarRedDot({
            index: 3
          })
        } else {
          wx.hideTabBarRedDot({
            index: 3
          })
        }
      } catch (err) {
        wx.hideTabBarRedDot({
          index: 3
        })
      }
    }
  }
}
</script>

<style lang="scss">
.indexWrap{min-height: 100%;
  .banner_blank{height: 400px;}
  .bannerWrap{height: 469px;padding: 30px 20px 0;width: 100%;border-radius:0px 0px 20px 20px;
  background: url(~assets/img/index/bannerNg.png) no-repeat;background-size:cover;
  }
  .bannerBg{border-radius: 0 0 20px 20px;}
  .banner{height: 250px;border-radius: 10px 10px 0 0;font-size: 0;overflow: hidden;
    // .notice{line-height: 74px;background: #fff;font-size: 24px;color: #333;border-radius: 0 0 10px 10px;}
    image{width: 100%;height: 250px;border-radius: 10px 10px 0 0;}
  }
  .mainTool{margin:-95px 20px 20px;background: #fff;border-radius: 10px;padding: 30px 0;display: flex;box-shadow:0px 4px 40px 0px rgba(221,221,221,0.45);
    >div{text-align: center;flex-grow: 1;
      &:nth-child(n+0){border-right: 1px solid #eee;}
      .img{width: 80px;height: 80px;border-radius: 40px;margin: 0 auto;
        >img{width: 80px;height: 80px;}
      }
      .des{color: #333;font-size: 28px;line-height: 40px;padding-top: 15px;}
    }
  }
  .noticeWrap{position: relative;
    .icon-jiantou{position: absolute;right: 20px;top: 0;font-size: 26px;height: 80px;line-height: 80px;}
    swiper{border-radius:  0 0 10px 10px;overflow: hidden;}
  }
  .notice{height: 74px;background:#fff;
    swiper-item{
      padding: 20px;background: #fff;display: flex;height: 74px;border-radius:  0 0 10px 10px;
      i{height: 34px;line-height: 34px;width: 64px;background: #FFE9E9;font-size: 22px;color:rgba(246,71,68,1);text-align: center;}
      p{flex-grow: 1;line-height: 34px;color: #333;font-size: 24px;padding-left: 15px;}
    }

  }
    .sebeTit{display: flex;padding: 0 30px;line-height: 92px;
      .teach{font-size: 30px;color: #333;font-weight: 600;}
      .teachDes{color: #999;font-size: 24px;flex-grow: 1;padding-left: 15px;}
      .more{font-size: 28px;color: #999;line-height: 92px;
        .icon{font-size: 20px;color: #ddd;height: 92px;line-height: 92px;vertical-align: center;transform: translateY(-2px);}
      }
    }
  .sebeWrap{background: #fff;margin: 20px;box-shadow:0px 4px 40px 0px rgba(221,221,221,0.45);border-radius:10px;
    .sebeBanner{padding: 5px 30px 10px;height: 380px;;
      swiper-item{font-size: 0;height: 375px;;
        >image{width: 100%;height: 250px;box-shadow:0px 4px 40px 0px rgba(221,221,221,0.45);}
        .des{padding-top: 20px;font-size: 24px;color: #999;line-height: 40px;text-align: left;width: 650px;display: block;}
      }
      .scroll-view-item{width: 300px;display: inline-block;font-size: 0;
        &:last-child{margin-right: 0;}
        &:first-child{margin-left: 30px;}
      }
    }
    .toolWrap{display: flex;padding: 20px 0 40px;
      >div{flex-grow: 1;text-align: center;font-size:0;
        img{width: 60px;height: 60px;}
        .des{line-height: 40px;color: #333;font-size: 28px;padding-top: 15px;}
      }
    }
  }
  .footerWrap{margin: 20px 20px 0;}
  ._blank{height: 60px;}
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
  ::-webkit-scrollbar{
    width: 0;
    height: 0;
    color: transparent;
  }
  .sharecanvas{width: 750px;height: 1334px;margin: 0 auto;position: fixed;top: 0;left: -750px;}
  .indexIcon{position: fixed;bottom:60px;right: 30px;
    img{width: 160px;}
  }
}

</style>
