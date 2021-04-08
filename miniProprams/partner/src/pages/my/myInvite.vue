<template>
  <div class="myInviteWrap" @click="showTabStatus = false">
    <div class="invitPicWrap">
      <h2 class="invitTitle">邀请好友开店</h2>
      <p class="invitDes">邀请好友开店，坐享10%“睡后收入”</p>
      <div class="shareIcon">
        <div class="line"></div>
        <button class="user" @click="shareFn" open-type="share">
          <img src="~assets/img/store/wx.png" alt="">
          <p>微信好友</p>
        </button>
        <div class="circle" @click="testShare">
          <img src="~assets/img/store/Moments.png" alt="">
          <p>微信朋友圈</p>
        </div>
      </div>
      <p class="des">发送微信好友或微信朋友圈，开店即有礼</p>
      <p class="watchRule" @click="$router.push('/pages/my/invitRule')">了解活动规则 ></p>
    </div>
    <div id="tabs" :class="['storetTab', menuFixed ? 'tabFixed' : '']">
      <view class="tabWrap" :hover-stop-propagation="true">
        <div :class="['item', isOpen ? 'activeColor' : '', 'item1']" @click="selectTabFn(1)">
          <p :class="[isOpen ? 'activeColor' : '']">已开店({{shopUp}})</p>
          <i class="icon iconfont icon-jiantou" @click.stop="handleClickOpenStore"></i></div>
        <div :class="['item', isOpen ? '' : 'activeColor']" @click="selectTabFn(0)">未开店({{shopNull}})<div class="storeLine"></div></div>
      </view>
      <div :class="['openBox', showTabStatus ? 'showOpenBox' : '']">
        <div class="authItem" @click="handleClickAuth('')">
          <p :class="isAuth === '' ? 'activeColor' : ''">全部</p>
          <icon type="success_no_circle" v-if="isAuth === ''" size="18" color="#3576FF"/>
        </div>
        <div class="authItem" @click="handleClickAuth(1)">
          <p :class="isAuth === 1 ? 'activeColor' : ''">已认证</p>
          <icon type="success_no_circle" v-if="isAuth === 1" size="18" color="#3576FF"/>
        </div>
        <div class="authItem" @click="handleClickAuth(0)">
          <p :class="isAuth === 0 ? 'activeColor' : ''">未认证</p>
          <icon type="success_no_circle" v-if="isAuth === 0" size="18" color="#3576FF"/>
        </div>
      </div>
    </div>
    <div class="_blank" v-if="menuFixed"></div>
    <template v-if="shopInfo&&shopInfo.length" >
      <div v-for="(item, index) in shopInfo" :key="index" :class="['invitItemWrap', item.isAuth == 1 ? '' : 'invitItemWrapNoAuth']">
        <div class="invitItemTop">
          <div class="avatar">
            <img :src="item.headimgurl" alt="">
          </div>
          <div class="info">
            <h3>{{item.nickname || ''}}</h3>
            <p>账号：{{item.memberPhone}}</p>
          </div>
        </div>
        <div class="invitItemBot">
          <div class="orderNumDes">成单数：</div>
          <div class="orderNum">{{item.serviceNum}}单</div>
          <!-- <div class="profitDes"></div> -->
          <div class="profit">获得收益：<div class="profitNum">￥{{item.income}}</div></div>
        </div>
      </div>      
    </template>

    <div class="invitBlank" v-if="!shopInfo||(shopInfo&&!shopInfo.length)">
      <img src="~assets/img/store/emptyImg.png" alt="">
      <p>暂无邀请信息</p>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
  export default{
  data(){
    return{
      showTabStatus: false,
      isOpen:1,
      pgIndex:1,
      pgCount: 10,
      pageAll: 1,  //总页数
      moModre: false,  //没有更多值了
      loading: false,
      shopNull:0,  //未开店数量
      shopUp:0,  //已开店数量
      shopInfo: [],  //已开店列表
      unShopOnfo: [],  //未开店列表
      isAuth: '',
      marginLeft: 14,
      menuTop: '',
      menuFixed: false
    }
  },
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    // to doing..
    this.pgIndex = 1;
    this.search(this.isOpen, '')
    console.log('下拉刷新')
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
// 上拉加载，拉到底部触发
  onReachBottom() {
    console.log('上啦加载');

    if (this.pgIndex >= this.pageAll) {
      this.loading = false;
      this.moModre = true;
      return
    }
    this.pgIndex ++;
    this.loading = true;
    this.moModre = true;
    this.search(this.isOpen, this.isAuth);  //查询
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=8",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  async mounted () {
    this.showTabStatus = false,
    this.isOpen = 1;
    this.pgIndex = 1;
    this.pageAll = 1;
    this.isAuth = '';
    this.search(0, '');
    this.search(1, '');  //已开店

    setTimeout(() => {
      var query = wx.createSelectorQuery()
      query.select('#tabs').boundingClientRect()
      query.exec( (res)  => {
        this.menuTop = res[0].top
      })
    }, 200)
  },
  onPageScroll (e) {
    e.scrollTop > this.menuTop ? this.menuFixed = true : this.menuFixed = false
  },
  methods: {
    // 分享致朋友圈事件
    testShare () {
      this.$router.push({
        path: '/pages/store/share',
        query: {
          nickName: this.$storage.get('auth').nickname || '',
          avatar: this.$storage.get('auth').avatar,
          memberId: this.$storage.get('auth').member_id
        }
      })
    },
    handleClickAuth (type) {
      this.isAuth = type;
      this.isOpen = 1;
      this.showTabStatus = false;
      this.search(1, this.isAuth);
    },
    //
    handleClickOpenStore () {
      setTimeout(() => {
        this.showTabStatus = !this.showTabStatus;
      }, 200)
      return;
    },
    callFn (item) {
      wx.makePhoneCall({
        phoneNumber: item.memberPhone
      })
    },
    selectTabFn (index){//切换类型
      if (this.isOpen === index) {
        if (this.isOpen === 1) {
          if (this.showTabStatus) {
            this.showTabStatus = false
          } else {
            setTimeout(() => {
              this.showTabStatus = true;
            }, 200)
          }
        }
        return
      }
      this.isOpen = index;
      if (!index) {
        this.showTabStatus = false;
      }
      this.isAuth = '';
      this.pgIndex = 1;
      this.moModre = false;
      this.search(index, this.isAuth);
    },
    async search (type, auth) {//初始化
      let self = this;
      let data = {
        isOpen: type,
        isAuth: auth,
        pgIndex:self.pgIndex,
        pgCount:self.pgCount
      }
      try {
        this.loading = true;
        let resp = await self.API.my.findInviteOpenStore(data);
        self.pageAll = Math.ceil(resp.totalElements / self.pgCount) || 1;
        if (type) {   //已开店
          if (auth === '') { this.shopUp = resp.totalElements; }
          if (self.pgIndex == 1) {
            self.shopInfo = resp.elements;
            return
          }
          self.shopInfo = [...self.shopInfo, ...resp.elements];
        }
        else{  //未开店数量
          self.shopNull = resp.totalElements;
          if (this.isOpen == 1) {
            return;
          }
          if (self.pgIndex == 1) {
            self.shopInfo = resp.elements;
            return
          }
          self.shopInfo = [...self.shopInfo = resp.elements, ...resp.elements]; 
        }
        self.loading = false;
      }
      catch (e) {
        if(self.pgIndex > 1){
          self.pgIndex -= 1;
        }
        self.loading = false;
      }
    },

  }
}

</script>

<style lang="scss">
.myInviteWrap{padding: 30px 0;background:rgba(249,249,253,1) url('~assets/img/my/invitBg.jpg') no-repeat 0 0;background-size: 750px 500px;min-height: 100%;
  .invitPicWrap{padding: 60px 0 40px;margin: 0 30px 10px;height: 550px;background: #fff;border-radius: 5px;box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);;text-align: center;background: #fff url('~assets/img/my/share.png') no-repeat 532px 0;background-size: 158px 154px;
    .invitTitle{color:#333;font-size: 38px;line-height: 53px;font-weight: 600;}
    .invitDes{font-size: 26px;line-height: 37px;color: #f64744;padding-top: 15px;}
    .shareIcon{display: flex;padding-top: 50px;padding-left: 80px;position: relative;
      >div, >.user{font-size: 0;padding: 0 80px;border: none;
        img{height: 100px;width: 100px;border-radius: 50px;}
        p{font-size: 26px;color:#333;line-height: 37px;padding: 15px 0 40px;}
      }
      >.circle{padding: 0 0 0 65px;}
      .line{position: absolute;height: 120px;width: 1px;background: #E9E9FF;left: 345px;top: 65px;padding: 0;}
    }
    .des{font-size: 24px;color:#999;line-height: 33px;}
    .watchRule{font-size: 28px;color: #C1A76E;line-height: 40px;text-align: center;margin-top: 30px;}
  }
  ._blank{height: 80px;}
  .storetTab{text-align: center;position: relative;background:rgba(249,249,253,1);
    &.tabFixed{position: fixed;top: 0;left: 0;width: 100%;}
    
    .tabWrap{
      display:flex;
      .item{line-height: 80px;position: relative;font-size: 28px;color:#333;width: 375px;
        >p{display: inline;}
        .icon-jiantou{width: 40px;height: 50px;text-align: center;line-height: 50px;color: #ddd;font-size: 20px;transition: all 0.3s;display: inline-block;transform: rotate(90deg);top: 20px;left: 266px;}
        .storeLine{position: absolute;width: 2px;height: 30px;top: 25px;left: 0;background: #ddd;z-index: 1;}
      }
      // .item1{width: 375px}
    }
    .openBox{box-shadow:0px 20px 20px 0px rgba(46,87,148,0.18);background:rgba(249,249,253,1);position: absolute;width: 100%;left: 0;top: 80px;height: 0; overflow: hidden;padding:0;transition: all .2s;
      >div{text-align: left;padding-left: 130px;display: flex;padding-bottom: 30px;
        p{line-height: 40px;font-size: 28px;padding-right: 116px;}
      }
    }
    .showOpenBox{padding: 20px 0 10px;height: 212px;}
    .activeColor{color:#3576FF !important;}
  }
  .invitItemWrap{margin: 0 30px 20px;padding: 30px 30px 0;background: #fff url('~assets/img/my/isAuth.png') no-repeat 590px 0;
  background-size: 100px 100px;box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11);border-radius:5px;
    .invitItemTop{display: flex;padding-bottom: 20px;border-bottom: 1px dashed #eee;
      .avatar{width: 95px;height: 95px; border-radius: 48px;overflow: hidden;
        >img{width: 95px;height: 95px;}
      }
      
      .info{padding-left: 20px;
        h3{font-size: 30px;line-height: 42px;color:#333;width: 450px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
        p{font-size: 26px;line-height: 37px;padding-top: 16px;color:#666;}
      }
    }
    .invitItemBot{display: flex;line-height: 77px;
      >div{font-size: 26px;}
      .orderNum{color:#2F80F6;}
      .profitDes{}
      .profit{text-align: right;flex-grow:1;
        .profitNum{color: #F64744;display: inline;}
      }
    }
  }
  .invitItemWrapNoAuth{background: #fff url('~assets/img/my/noAuth.png') no-repeat 590px 0;background-size: 100px 100px;}
  .invitBlank{text-align: center;padding-top: 30px;
    img{width: 470px;height: 300px;}
    p{font-size: 26px;line-height: 37px;color:#999;}
  }
  
}
 
</style>
