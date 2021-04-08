<template>
  <div class="nickname_page">
    <div class="line_wrap">
      <div class="line_item">
        <input type="text" class="lef" v-model="nickname" maxlength="12" >
        <span class="rig">{{ nameLength }}/12</span>
      </div>
    </div>
    <div class="tips">温馨提示：用户昵称最多12个字。</div>

    <button class="weui-btn weui-btn_warn bottom_fixed" type="warn" @click="saveFn">保存</button>

    <!-- 中间消息提示 -->
    <mptoast  />


    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        nickname:''
      }
    },
    computed: {
      nameLength: function() {
        return this.nickname.length
      }
    },
    methods: {
      async saveFn () {
        let resp = await this.API.my.savePersonInfo({truename: this.nickname});
        this.$storage.remove('invitPic')
        this.$router.go(-1);
      }
    },
    onLoad () {
      this.nickname = this.$route.query.des;
      this.nameLength = this.$route.query.des.lenth; 
    },
  }
</script>

<style lang='scss'>
  .nickname_page {
    width: 100%; height: 100%; background: #f8f8f8; padding-top: 20px;
    .line_wrap {
      margin-top: 0;
      .lef {width: 100%;}
      .rig {color: #ddd;}
    }
    .tips {padding: 20px; color: #999; font-size: 26px;}
    .bottom_fixed {position: fixed; bottom: 0; width: 100%; height: 98px; line-height: 98px; padding:0; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); text-align: center; color: #fff; font-size: 32px; border-radius: 0; }
  }
</style>
