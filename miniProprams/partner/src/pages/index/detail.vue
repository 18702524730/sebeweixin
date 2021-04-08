<template>
  <div v-if="detail.jumpType==2" :class="['otherDetailWrap',btnShow ? 'setHeight' : '', isImg ? 'noPadding' : '']">
    <h2 v-if="!isImg">{{detail.title}}</h2>
    <video id="myVideo" v-if="detail.jumpType==2&&detail.jumpUrl" :src="detail.jumpUrl" controls></video>
    <rich-text :class="[isImg ? 'imgDetail' : '', btnShow ? 'richText' : '']" v-if="detail.content" :nodes="detail.content"></rich-text>
    <!-- 邀请好友开店 -->
    <div class="detailBot" v-if="btnShow"><img class="imgBtn" @click="handleClickParterPic" src="~assets/img/index/btnPic.png" mode="widthFix"  alt=""></div>
  </div>
  <div class="pageWrap" v-else>
    <web-view v-if="detail.jumpType == 1 && detail.jumpUrl" :src="detail.jumpUrl" style="margin:0;padding:0;border:0;"></web-view>
  </div>
</template>
<script>
const indexUrl = CONFIG.indexUrl;
export default {
  data () {
    return {
      detail: {},
      isImg: false,
      showBox: false,  //展示邀请好友开店弹窗
      btnShow: false // 是否展示按钮
    }
  },
  components: {

  },
  mounted () {
    console.log(this.$route.query)
    console.log(this.detail)
    if (this.$route.query.type == 'swiper') {
      this.isImg = true
    } else {
      this.isImg = false
    }
    if (this.$route.query.title == 'yydr_invit') {
      setTimeout(() => {
        this.btnShow = true
      }, 800)
    } else {
      this.btnShow = false
    }
    console.log('isImg', this.isImg)
    if (this.$route.query.type == 1) {
      wx.setNavigationBarTitle({title: '合伙人故事'});
    } else if (this.$route.query.type == 2) {
      wx.setNavigationBarTitle({title: '拾贝宝教程'});
    }
    // wx.setNavigationBarTitle({title: this.storeInfo.storeName + '的店'});
    this.init()
  },
  onShow () {
    setTimeout(() => {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      })
    }, 200);
  },
  onUnload () {
    this.detail = {};
    this.isImg = false;
    this.showBox = false;
    this.btnShow = false;
  },
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=2",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  methods: {
    handleClickParterPic () {
      wx.redirectTo({
        url: '/pages/my/myInvite'
      })
    },
    async init () {
      if (this.$route.query.id) {
        let data = await this.API.homePage.noticeDetail({ id: this.$route.query.id })
        if (data.title == 'duibaStore') {
          // 获取兑吧动态URL地址
          let memberId = this.$storage.get('auth').member_id;
          console.log('memberId', memberId)
          let urlData = await WXP.request({
            method: 'GET',
            url: `${indexUrl}/duiba/autoLoginUrl.htm?uid=${memberId}`
          })
          // let urlData = await this.API.homePage.autoLoginUrl({uid: memberId});
          console.log('urlData', urlData)
          data.jumpUrl = urlData.data;
        }
        this.detail = data
        console.log(this.detail)
      }
      if (this.detail.content) {
        let { content } = this.detail;
        let arr = content.split('<br>');
        // 判断详情是不是只有一张图片
        if (content.indexOf('<img') === 0 && arr.length === 2 && arr[1] === '') {
          this.isImg = true;
        } else { 
          this.isImg = false;
        }
      }
      console.log('dasaasa',this.detail)
    },
    // 分享给好友
    shareFn (res) {
      let self = this;
      wx.showTabBar({
        animation: true,
        success: function() {
          self.showBox = false;
        }
      })
    },
    testShare () {
      this.showBox = false;
      wx.showTabBar({
        animation: true
      }) 
      this.$router.push({
        path: '/pages/store/share',
        query: {
          nickName: this.$storage.get('auth').nickname || '',
          avatar: this.$storage.get('auth').avatar,
          memberId: this.$storage.get('auth').member_id
        }
      })
    },
    // 取消分享
    clickShareDia () {
      this.showBox = false;
    },
  }
}
</script>
<style lang="scss">
page{background: #fff;}
.otherDetailWrap{padding: 20px 20px;background: #fff;position: relative;font-size: 0;
  >h2{line-height: 68px;font-size: 34px;color: #333;margin-bottom: 30px;font-weight: 600;}
  #myVideo{width: 710px;height: 533px;margin-bottom: 20px;}
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
}
.noborder{padding: 0;}
.imgBtn{width: 320px;margin-top: 40px;}
.detailBot{width: 100%;height: 265px;background: #8060ff;text-align: center;position: absolute;bottom: 0;left: 0;transform: translateY(-2px);}
.noPadding{padding: 0;}
.setHeight{min-height: 1924px;padding-bottom: 265px;background: #8060ff;}
rich-text{font-size: 30px;}
.imgDetail{font-size: 0;}
.pageWrap{width: 100%; height: 100%;}
</style>
