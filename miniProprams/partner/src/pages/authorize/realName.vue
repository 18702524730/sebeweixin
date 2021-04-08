<template>
  <div class="realName">
    <div class="outerBox"></div>
    <div class="innerBox">
      <h3>实名认证</h3>
      <div class='form'>
        <p class='name mb20'>
          <input v-model="postData.name" maxlength="20" placeholder="真实姓名" placeholder-class="input-placeholder">
        </p>
        <p class='codeNumber'>
          <input type="idcard" v-model="postData.idCardNo" maxlength="18" placeholder="身份证号码" placeholder-class="input-placeholder">
        </p>
        <!-- <p class='bank mb20'>
          <input type="number" v-model="postData.bankCardNo" maxlength="20" placeholder="银行卡号" placeholder-class="input-placeholder">
        </p>
        <p class='tel mb20'>
          <input type="number" v-model="postData.phone" maxlength="11" placeholder="手机号" placeholder-class="input-placeholder">
        </p>
        <p class='identifying-code'>
          <input type="number" maxlength="6" v-model="postData.code" placeholder="验证码" placeholder-class="input-placeholder">
          <span :class=" preventCode ? 'code' : 'code disabled' "  @click.stop="getCode">{{codeText}}</span>
        </p> -->
        <button class="authorize" :class="{'hight': isHight}" @click="goAuthorize">立即认证</button>
      </div>
      <span class="later" @click="laterDo">稍后认证</span>
      <p class="remind">姓名须跟后期的提现银行卡姓名保持一致，请填写真实姓名。</p>
    </div>
    <!-- <steps :step="3"></steps> -->
    <u-message />
    <mptoast />
  </div>
</template>

<script>
  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  const indexPath = CONFIG.indexPath;
  import md5 from 'md5'
  import qs from 'qs'
  import mixin from 'mixins/';
  import steps from './components/steps'

  // pattern: /^[0-9]{11,20}$/,

  export default {
    components: {
      steps
    },
    mixins: [mixin],
    data () {
      return {
        submitDisabled: false,
        codeText: '获取验证码',
        ver_tip: '',
        preventCode: true,
        regAgreement: false,
        postData:{
          //phone:'',
          name: '',
          //bankCardNo: '',
          idCardNo: '',
          //code:''
        }
      }
    },
    computed: {
      isHight() {
        return !!(this.postData.name && this.postData.idCardNo)
      }
    },
    mounted() {
    },
    methods: {
      laterDo() {
        this.$router.go(-1);
        // wx.switchTab({ url: indexPath})
        // this.$router.replace(indexPath);
      },
      async getPhoneNumber(e) {
        let phone = await this.API.interfaces.getPhoneNumber(e);
        this.postData.phone = phone;
      },

      goToRule () {
        this.regAgreement = true;
      },

      // 获取验证码  判断是否有可用的手机号
      getCode () {
        let postData = this.postData;
        let phone = postData.phone;
        if (!phone.trim()) {
          this.tips('请输入手机号')
          this.checkPostData = true;
          return false;
        } else if(!/^1\d{10}$/.test(phone)){
          this.tips('请输入正确的手机号')
          this.checkPostData = true;
          return false;
        };
        if (this.preventCode) {
          this.preventCode = false;
          this.getCapcha();
        }
      },

      //向手机号发送 验证码
      async getCapcha () {
        try {
          await this.API.interfaces.authCode(this.postData.phone);
          this.timeout();
          this.$mptoast('验证码已发送');
        } catch(e) {
          this.$mptoast({
            text: e.msg,
            icon:'error',
            duration:  2000,
          })
        }
      },

      //定时器 发送验证码的定时器
      timeout () {
        var self = this;
        var second = 59, timer;
        timer = setInterval(function(){
          if(second<=0){
            clearInterval(timer);
            second = 59;
            self.codeText = "重发验证码";
            self.preventCode = true;
          }else{
            self.codeText = second + "s后可重发";
            self.preventCode = false;
            second--;
          }
        }, 1000);
      },

      //校验
      checkValid() {
        let postData = this.postData;
        let name = postData.name;
        let idCardNo = postData.idCardNo;
        let bankCardNo = postData.bankCardNo;
        let phone = postData.phone;
        let token = postData.code;

        if (!name.trim()) {
          this.tips('请输入真实姓名')
          return false;
        }

        if (!idCardNo.trim()) {
          this.tips('请输入身份证号码')
          return false;
        }

        /*if (!bankCardNo.trim()) {
          this.tips('请输入银行卡号')
          return false;
        }

        if (!phone.trim()) {
          this.tips('请输入手机号')
          return false;
        } else if(!/^1\d{10}$/.test(phone)){
          this.tips('请输入正确的手机号');
          return false;
        }

        if (!token.trim()) {
          this.tips('请输入验证码');
          return false;
        }else if(token.length !== 6){
          this.tips('校验码为6位数');
          return false;
        }*/
        return true;
      },

      async goAuthorize() {
        if (!this.checkValid()) {
          return;
        }
        try {
          let interfaces = this.API.interfaces;
          let resp = await interfaces.realNameAuth(this.postData, {
            errorAction: true
          });
          let userData = this.$storage.get('auth');
          userData.isAuthentication = 1;
          this.$storage.set('auth', userData);
          this.laterDo();
          console.log('realNameAuthRes:',resp)
        }
        catch(err){
          let d = err.response.data;
          if (d && d.msg) {
            this.tips(d.msg);
          }else{
            this.tips('信息错误，实名认证失败');
          }
        }
      },

      loginSuccessHandle(){
        var hash = location.hash;
        if(hash.indexOf('return_url') !== -1) {
          this.$router.replace()
        } else{
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang='scss'>
  .realName{
    position: relative;width: 100%; height: 100%;
    .input-placeholder{color: #bbb;}
    .innerBox{
      position: absolute;top: 30px;left: 40px;right: 40px;bottom: 30px;padding-top: 90px;background-color: #fff;box-shadow:0px 0px 20px 0px rgba(221,221,221,0.5);border-radius:6px;
      h3{height:56px;line-height: 56px;font-size:40px;text-align: center;font-weight:600;}
      .form{
        width: 600px;margin: 0 auto; padding-top: 85px;
        p{
          width: 600px;height: 90px;padding: 4px;border-radius:45px;border:1px solid #ddd;position: relative;font-size:30px;
          input{width: 100%;height: 100%;border-radius:50%;padding-left: 36px;color:#333;}
        }
        .tel{
          //background-color: #F8F8F8;
          //span{padding: 0; border: 0;position: absolute;right: 40px;top:20px;color: #BBB;z-index: 2;font-size:26px;}
        }
        .identifying-code{
          margin-top: 20px;
          .code{position: absolute;right: 40px;top:20px;color: #2F80F6;z-index: 2;}
        }
        .authorize{margin-top: 30px;;width:600px;padding: 29px 0;text-align: center;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:45px;opacity:0.5;color: #fff;font-size:32px;line-height: 1;border:0;}
        .hight{opacity:1;}
      }
      .later{position: absolute;right: 30px; top: 30px;width: 140px;height: 50px;border-radius:25px;line-height: 48px;text-align: center;border:1px solid #BBB;font-size:24px;}
      .remind{width: 500px;margin: 20px auto 0;text-align: center;font-size:22px;line-height:30px;color: #BBB;}
    }
    .outerBox{
      position: absolute;top: 70px;left: 20px;right: 20px;bottom: 90px;background-color: #fff;box-shadow:0px 0px 20px 0px rgba(221,221,221,0.5);border-radius:6px;
    }
  }
</style>
