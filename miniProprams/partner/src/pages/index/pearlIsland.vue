<template>
  <div class="my_IPT_page">
    <web-view v-if="jumpUrl" :src="jumpUrl" style="margin:0;padding:0;border:0;"></web-view>
  </div>
</template>

<script>
// 页面仅用于中转到创新珍珠活动页面
// export default {
//   onLoad(){
//     wx.redirectTo({
//       url: '../my/my_IPT'
//     })
//   }
// }
const indexUrl = CONFIG.indexUrl;
export default {
  data () {
    return {
      jumpUrl: ''
    }
  },
  methods: {},
  async onLoad () {
    // extraData 是用小程序间的跳转来模拟用户识别小程序码打开小程序
    let query = this.$root.$mp.query;
    let scene = query.scene;
    console.log('scene:', scene);
    if (wx.getStorageSync("auth")) { // https://activity-3.m.duiba.com.cn/chw/visual-editor/skins?id=4202
      // 获取兑吧动态URL地址
      let memberId = this.$storage.get('auth').member_id;
      console.log('memberId', memberId)
      let redirect = 'https://activity-3.m.duiba.com.cn/chw/visual-editor/skins?id=' + scene;
      let urlData = await WXP.request({
        method: 'GET',
        url: `${indexUrl}/duiba/autoLoginUrl.htm?uid=${memberId}&redirect=${redirect}`
      })
      console.log('urlData', urlData)
      this.jumpUrl = urlData.data;
    } else {
      this.$router.push({path: '/pages/authorize/authorize', query: { 
          path: '/pages/index/pearlIsland', 
          scene
        }
      });
    }
  }
}
</script>
<style lang="scss">
.my_IPT_page{width: 100%; height: 100%;}
</style>
