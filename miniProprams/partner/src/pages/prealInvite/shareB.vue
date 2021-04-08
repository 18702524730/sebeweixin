<template>
<div class="pearl_share">
  <img v-if="!shareX" class="shareBgi" src="~assets/img/channelPartner/shareBgi.jpg" alt="">
  <img v-if="shareX" class="shareBgiX" src="~assets/img/channelPartner/shareBgiX.jpg" alt="">
  <div class="row-around" :class="{'footer_tab':shareX}">
    <button class="user" open-type="share">
      <img src="~assets/img/store/shareUser.png" alt="">
      <p>分享好友</p>
    </button>
    <div @click="toMoments">
      <img src="~assets/img/store/Moments.png" alt="">
      <p>分享朋友圈</p>
    </div>
  </div>
  <p class="toFirst" @click="toFirst" :style="{bottom: shareX ? '125px' : '100px'}">返回</p>
</div>
</template>
<script>
const inviteBgi = 'https://ossfile.ipsebe.com/890D7D47026B10AB21D4D69F792EE79F.png';
const titleBgi = 'https://ossfile.ipsebe.com/7FC6AEDFAD2755CDCC82C92C26199B85.png';
const logoSebe = 'https://ossfile.ipsebe.com/316CFE1559F5BABD2A7E61C68D84C5DD.png';
const wxUrl = CONFIG.wxUrl;
import Filters from '../../utils/filters.js'
export default{
  data(){
    return{
      shareX:false
    }
  },
  async mounted(){
    wx.getSystemInfo({
      success: res=>{
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          this.shareX = true;
          console.log('手机版本')
        }
      }
    })
  },
  methods: {
    toFirst(){
      this.$router.push({path: '/pages/my/my_IPT'});
    },
    toMoments(){
      this.$router.push({path: '/pages/prealInvite/prealInvite'});
    },
    shareUser(res){
      console.log(res)
    }
  },
  onShareAppMessage(res) {
    let self = this;
    let auth = this.$storage.get('auth');
    return {
      title: auth.truename+'送你20珍珠，再不领就快要失效啦！',
      path: "/pages/my/my_IPT?memberId="+ auth.member_id + "&shareId=1",
      imageUrl: '/static/icon/bgi.png',
      complete: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          self.$router.push({path: '/pages/my/my_IPT'});
        } else {
          wx.showToast({
            title: '分享失败',
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .pearl_share{position: absolute;top:0;left:0;right:0;bottom:0;background-color:#05c;font-size:0;
    .shareBgi{width:100%;height:1048px;}
    .shareBgiX{width:100%;height:1168px;}
    >div.footer_tab{height:210px;
      div,button{
        img{width:100px;height:100px;}
      }
    }
    >div{position: absolute;bottom:0;width:100%;background-color:#fff;height:160px;
      div,button{text-align:center;border:0;
        img{width:63px;height:63px;}
        p{color:#26263e;line-height: 33px;font-size:24px;margin-top: 7px;}
      }
    }
    .toFirst{position: absolute;bottom:160px;left:0;width:136px;height:64px;background:linear-gradient(135deg,rgba(255,160,47,1) 0%,rgba(255,82,82,1) 100%);border-radius:0px 100px 100px 0px;font-size:28px;text-align:center;line-height:64px;color:#fff;opacity: 0.8;}
  }
</style>
