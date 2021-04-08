<template>
  <div class="my_setting">
    <div class="line_wrap">
      <div class="line_item" @click="personDetailFn">
        <span class="lef">个人资料</span>
        <div class="rig">
          <i class="iconfont detail icon-jiantou"></i>
        </div>
      </div>
      <div class="line_item" @click="realNameFn(true)" v-if="auth.isAuthentication">
        <p class="lef" >实名认证<span class="green">（已认证）</span></p>
        <div class="rig">
          <i class="iconfont detail icon-jiantou"></i>
        </div>
      </div>
      <div class="line_item" @click="realNameFn(false)" v-if="!auth.isAuthentication">
        <p class="lef" >实名认证<span class="red">（未认证）</span></p>
        <div class="rig">
          <i class="iconfont detail icon-jiantou"></i>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

  export default {
    components: {
    },
    data () {
      return {
        auth: {}
      }
    },
    methods: {
      // 个人资料
      personDetailFn () {
        this.$router.push({path: '/pages/my/personalInfo'})
      },
      // 实名认证
      realNameFn (type) {
        if (type) {
          this.$router.push({path: '/pages/my/realName'})
        }
        else{
          this.$router.push({path: '/pages/authorize/realName'}) 
        }
      }
    },
    onShow () {
      this.auth = this.$storage.get('auth');
    }
  }
</script>

<style lang='scss'>
  .my_setting {
    width: 100%; height: 100%; background: #f8f8f8;
  }
</style>
