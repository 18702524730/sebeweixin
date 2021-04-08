<template>
  <div class="submitWrap">
    <img src="~assets/img/store/result.png" alt="">
    <p class="content">我们已经收到您的需求<br>平台将会24H内与您取得联系</p>
    <div class="btnWrap">
      <div class="back" @click="goStore">返回店铺</div>
      <div class="watch" @click="watchDemand">查看需求</div>
    </div>
    <p class="des">您可在“我的--需求管理”中查看需求最新进度</p>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    goStore () {
      wx.switchTab({url: '/pages/index/store'})
    },
    watchDemand () {
      let query = this.$root.$mp.query;
      this.$router.replace({path: '/pages/demandManage/reqManagement', query})
    }
  }
}
</script>

<style lang="scss">
.submitWrap{text-align: center;min-height: 100%;background: #fff;padding-top: 210px;font-size: 0;
  >img{width: 160px;height: 303px;}
  p.content{font-size: 26px;color: #666;text-align: center;line-height: 37px;padding: 30px 0;}
  .btnWrap{
    padding: 0 163px;display: flex;
    >div{width: 192px;margin: 0 10px;border-radius: 33px;text-align: center;font-size: 28px;}
    .back{border: 1px solid #2F80F6;color: #2F80F6;line-height: 64px;}
    .watch{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);line-height: 66px;color: #fff;}
  }
  .des{font-size: 24px;line-height: 33px;color: #999;position: fixed;left: 0;bottom: 60px;width: 100%;}
}
 
</style>
