<template>
  <div class="column email_popup_wrap">
    <div class="title">填写邮箱地址</div>
    <div class="close" @click="hideFn">×</div>
    <p class='emailbox'>
      <input placeholder-class="input-placeholder" :value="email" @change="change" maxlength="30" placeholder="请输入邮箱地址">
    </p>
    <div class="bt_footer" @click="save">确定</div>
  </div>
</template>

<script>
export default {
  props: {
    email: String,
  },
  data() {
    return {
    }
  },
  methods: {
    change(e) {
      this.$emit('update:email', e.target.value);
    },
    hideFn() {
      this.$emit('hide');
    },
    checkEmail(value) {
      let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!value) {
        this.tips('邮箱不能为空');
        return false;
      }
      if (value.length > 30) {
        this.tips('邮箱不能超过30个字符');
        return false;
      }
      if (!emailReg.test(value)) {
        this.tips('邮箱格式错误');
        return false;
      }
      return true;
    },
    save() {
      if (this.checkEmail(this.email)) {
        this.$emit('submit');
        this.$emit('hide');
      }
    }
  }
}
</script>

<style lang="scss">
  .email_popup_wrap{
    height: 385px;padding-top: 10px;position: relative;display: flex;justify-content: flex-start;flex-direction: column;align-items: center;
    .input-placeholder{color: #bbb;}
    .title{
      height: 45px;line-height: 45px;font-size:32px;margin-top: 60px;
    }
    .close{position: absolute;right: 20px; top: 20px;width:42px;height:42px;font-size: 40px;color: #ddd;}
    .emailbox{
      width: 600px;height: 90px;padding: 4px;border-radius:45px;border:1px solid #E6E6E6;position: relative;font-size:30px;margin-top: 40px;
      input{width: 100%;height: 100%;border-radius:50%;text-align: center;}
    }
    .bt_footer{position: absolute;bottom:0; text-align: center; width: 100%; height: 98px;line-height: 98px;font-size: 32px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
  }
</style>
