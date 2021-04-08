<template>
<div class="invitation list_info">
  <!-- <div class="invitation_type row-between">
    <p :class="{'check_type':isOpen==0}" @click="isOpenShop(0)">未开店（{{shopNull}}）</p>
    <p :class="{'check_type':isOpen==1}" @click="isOpenShop(1)">已开店（{{shopUp}}）</p>
  </div> -->
  <u-navbar :tabs="tabs" :activeIndex="isOpen" :marginLeft="marginLeft" @selectTab="selectTabFn"   />
  <scroll-view :scroll-y="true" class="list">
    <!-- 未开店 -->
    <div class="invitation_list mt20" v-for="(item, index) in unShopOnfo" :key="index" v-if="unShopOnfo&&unShopOnfo.length && !isOpen">
      <img :src="item.headimgurl" alt="">
      <div class="ml30 invitation_info">
        <div class="row-between name">
          <p class="nick_name">昵称：{{ item.nickname ? item.nickname : '' }}</p>
        </div>
        <div class="row-between mt20 account">
          <p>账号：{{ item.memberPhone }}</p>
          <img src="~assets/img/order/phone.png" class="img" alt="" @click="callFn(item)">
        </div>
      </div>
    </div>
    <!-- 已开店 -->
    <div class="invitation_list mt20" v-for="(item, index) in shopInfo" :key="index" v-if="shopInfo&&shopInfo.length && isOpen">
      <img :src="item.headimgurl" alt="">
      <div class="ml30 invitation_info">
        <div class="row-between name">
          <p class="nick_name">昵称：{{ item.nickname ? item.nickname : ''}}</p>
          <p class="num">[{{ item.serviceNum }}单]</p>
        </div>
        <div class="row-between mt20 ">
          <p>账号：{{ item.memberPhone }}</p>
          <p class="earnings">收益：<span>￥</span>{{ item.income }}</p>
        </div>
      </div>
    </div>
    <div class="bottom_gif row-center" v-if="loading">
      <!-- <image src="/images/gif/homePage.gif"> -->
      <text>加载中...</text>
    </div>
    <div class="footer mb30" v-if="((shopInfo.length && isOpen) || (unShopOnfo.length && !isOpen)) && moModre">到底啦~</div>
  </scroll-view>

  <!-- 没订单 -->
  <div class="null_single" v-if="((!shopInfo.length && isOpen) || (!unShopOnfo.length && !isOpen)) && !loading ">
    <img class="portrait" src="~assets/img/store/emptyImg.png">
    <div class="txt mb40">您还没有相关邀请数据</div>
  </div>
</div>
</template>
<script>
import qs from 'qs'
  export default{
  data(){
    return{
      isOpen:0,
      pgIndex:1,
      pgCount: 10,
      pageAll: 1,  //总页数
      moModre: false,  //没有更多值了
      loading: false,
      shopNull:0,  //未开店数量
      shopUp:0,  //已开店数量
      shopInfo: [],  //已开店列表
      unShopOnfo: [],  //未开店列表
      tabs: [],
      marginLeft: 14,
    }
  },
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    // to doing..
    this.pgIndex = 1;
    this.search(this.isOpen)
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
    this.search(this.isOpen);  //查询
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
  methods: {
    callFn (item) {
      wx.makePhoneCall({
        phoneNumber: item.memberPhone
      })
    },
    selectTabFn (index){//切换类型
      this.isOpen = index;
      this.pgIndex = 1;
      this.moModre = false;
      this.search(index);
    },
    async search(type){//初始化
      let self = this;
      let data = {
        isOpen: type,
        pgIndex:self.pgIndex,
        pgCount:self.pgCount
      }
      try {
        let resp = await self.API.my.findInviteOpenStore(data);
        self.pageAll = Math.ceil(resp.totalElements / self.pgCount) || 1;
        if (type) {   //已开店
          self.tabs[1] = `已开店(${resp.totalElements})`;
          if (self.pgIndex == 1) {
            self.shopInfo = resp.elements;
            return
          }
          self.shopInfo = [...self.shopInfo, ...resp.elements];
        }
        else{  //未开店数量
          self.tabs[0] = `未开店(${resp.totalElements})`;
          if (self.pgIndex == 1) {
            self.unShopOnfo = resp.elements;
            return
          }
          self.unShopOnfo = [...self.unShopOnfo = resp.elements, ...resp.elements]; 
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

  },
  mounted(){
    this.search(1);  //已开店
    this.search(0);  //未开店
  }
  
}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.invitation{position: relative;
  .list{}
  .invitation_type{width:750px;height:94px;background-color:#fff;padding:24px 70px 0 70px;position: absolute;top:0;z-index: 100;
    p{width:210px;line-height:42px;padding-bottom:24px;border-bottom:4px solid #fff;color:#333;font-size:$text-lg;text-align:center;}
    .check_type{color:#2F80F6;border-color:#2F80F6;}
  }
  .invitation_list{width:750px;height:200px;padding:35px 20px;background-color:#fff;display:flex;
    >img{width:130px;height:130px;border-radius:130px;}
    .invitation_info{width:560px;
      p{font-size:$text-lg;color:#999;}
      p.earnings{color:#2F80F6;
        span{font-size:$text-sm;}
      }
    }
    .name{margin-top: 8px;
      .nick_name{font-size:$text-xl;color:#333;width:400px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
      .num{font-size:$text-lg;color:#999;}
    }
    .account {
      .img {width: 64px; height: 64px;}
    }
  }
}
</style>
