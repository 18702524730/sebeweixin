<template>
  <div class="setmail_page">
    <div class="line_wrap">
      <div class="line_item">
        <input type="text" class="lef" v-model="email" placeholder="请输入您邮箱地址" >
      </div>
    </div>

    <button class="weui-btn weui-btn_warn bottom_fixed" type="warn" @click="saveFn">保存</button>



    
  </div>
</template>

<script>
  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  import md5 from 'md5'
  import qs from 'qs'

  export default {
    data () {
      return {
        email: ''
      }
    },
    methods: {
      async saveFn () {
        let resp = await this.API.my.savePersonInfo({email: this.email});
        this.$router.go(-1);
      }
    },
    onLoad () {
      this.email = this.$route.query.des;
    },
  }
</script>

<style lang='scss'>
  .setmail_page {
    width: 100%; height: 100%; background: #f8f8f8; padding-top: 20px;
    .line_wrap {
      margin-top: 0;
      .line_item {height: 90px;}
      .lef {width: 100%;}
      .rig {color: #ddd;}
    }
    .tips {padding: 20px; color: #999; font-size: 26px;}
    .bottom_fixed {position: fixed; bottom: 0; width: 100%; height: 98px; line-height: 98px; padding:0; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); text-align: center; color: #fff; font-size: 32px; border-radius: 0; }
  }
</style>
