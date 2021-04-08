<template>
  <div class="updateWrap">
    <img src="https://ossfile.ipsebe.com/F2B8C68DA315507E2C26DF301B9D306F.png" mode='widthFix' alt="">
    <h2>拾贝宝已经更新！</h2>
    <h2>快来体验为您更新的功能吧！</h2>
    <!-- <div :class="['btn', complete ? '' : 'disBtn']" :disabled="!complete" @click="updateApp">立即更新</div> -->
    <div class="btn" @click="updateApp">立即更新</div>
  </div>
</template>

<script>
export default {
  // https://sebe360test.oss-cn-beijing.aliyuncs.com/F2B8C68DA315507E2C26DF301B9D306F.png
  data () {
    return {
      updateManager: '',
      complete: false

    }
  },
  components: {

  },
  onShow () {
    this.updateManager = wx.getUpdateManager();
    // 更新成功后的回调
    this.updateManager.onUpdateReady(() => {
      this.complete = true
    })
    // 更新失败后的回调
    this.updateManager.onUpdateFailed(() => {
      this.complete = false
    })
  },
  methods: {
    updateApp () {
      console.log('updateManage', this.updateManager)
      if (this.complete) {
        wx.clearStorageSync();
        this.updateManager.applyUpdate();
      } else {
        wx.showModal({
          title: '更新提示',
          content: '新版本下载失败，请稍后再试！',
          showCancel: false
        })
      }
    }
  }
}
</script>

<style lang="scss">
.updateWrap{width: 100%;background: #EEF3FD;min-height: 100%;
  >img{width: 100%;margin-top: 142px;margin-bottom: 52px;}
  >h2{font-size: 50px;line-height: 70px;color: #2f80f6;padding-bottom: 14px;padding-left: 64px;}
  >.btn{height: 80px;line-height: 80px;background: linear-gradient(90deg, #5cb7fb, #2f80f6);width: 620px;border-radius: 6px;text-align: center;
    font-size: 36px;font-weight: 500;color: #fff;position: fixed;bottom: 180px;left: 65px;
    &.disBtn{background: #eee;}
  }
}
 
</style>
