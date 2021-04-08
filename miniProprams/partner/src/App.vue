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
  async onLaunch (options) {
    console.log('enter parter')
    // 每次进入清除sessionId
    // wx.removeStorageSync('sessionId');
    // wx.removeStorageSync('auth');
    // wx.removeStorageSync('key');
    
    wx.clearStorage()
    // 检测是否有更新，并强制更新
    await this.forceUpdateManager()
  }
}
</script>

<style lang="scss">
@import "assets/css/reset";
@import "assets/css/weui";
@import "assets/css/common";
@import "assets/css/font/iconfont";
/* .container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} */
</style>
