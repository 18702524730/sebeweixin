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

    console.log('enter parterC')
    // 每次进入清除sessionId
    wx.clearStorage();
    // wx.removeStorageSync('sessionId');
    // wx.removeStorageSync('auth');
    // wx.removeStorageSync('key');
    // 强制更新
    await this.forceUpdateManager()

    // console.log('onLaunch:', options)
    // let query = this.$root.$mp.query;
    // console.log('onLaunch_query:', query)
    // var extraData = {};
    // if(options.referrerInfo && options.referrerInfo.extraData){
    //   extraData = options.referrerInfo.extraData;
    //   console.log('extraData:', extraData)
    //   this.$storage.set('extraData', extraData);
    // }
  }
}
</script>

<style lang="scss">
@import "assets/css/reset";
@import "assets/css/weui";
@import "assets/css/common";
@import "assets/css/weui";
@import "assets/css/font/iconfont";
@import "assets/css/font/alibabafont";
view{
  font-family: AlibabaPuHuiTi;
}
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
.phone{
    position: fixed;
    right: 4px;
    bottom: 264px;
    width:140px;
    height:140px;
    background-image: url('~assets/img/homepage/phone.png');
    background-size: 100% 100%;
    background-position: center center;
    border-radius:50%;
    overflow: hidden;
    z-index: 99;
  }
  .kefu{
    position: fixed;
    right: 4px;
    bottom: 142px;
    width:140px;
    height:140px;
    background-image: url('~assets/img/homepage/kefu.png');
    background-size: 100% 100%;
    background-position: center center;
    border-radius:50%;
    overflow: hidden;
    z-index: 99;
    button{
      float: left;
      border:none;
      outline: none;
      margin: 0;
      padding: 0;
      background: none;
      width:140px;
      height:140px;
      border-radius: 50%;
    }
  }
</style>
