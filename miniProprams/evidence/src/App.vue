<script>
import mixin from 'mixins/';
export default {
  mpType: 'app',
  mixins: [mixin],
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  },
  async onLaunch(options) {
    // 每次进入清除sessionId
    wx.removeStorageSync('sessionId');
    wx.removeStorageSync('auth');
    wx.removeStorageSync('key');

    console.log('onLaunch:', options)
    let query = this.$root.$mp.query;
    console.log('onLaunch_query:', query)
    var extraData = {};
    if(options.referrerInfo && options.referrerInfo.extraData){
      extraData = options.referrerInfo.extraData;
      console.log('extraData:', extraData)
      this.$storage.set('extraData', extraData);
    }
  }
}
</script>

<style lang="scss">
@import "assets/css/reset";
@import "assets/css/weui";
@import "assets/css/common";
 @import "assets/css/weui";
 @import "assets/css/font/iconfont";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
