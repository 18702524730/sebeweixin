<template>
  <div class="page">
    <div class='login'>
      <p class='tel'>
        <span>手机号码</span>
        <input type="text" v-model="postData.phone" maxlength=11 placeholder="请输入手机号">
        <!-- <span class="remind-tel">请输入正确的手机号</span> -->
      </p>
      <p class='pwd'>
        <span>密码</span>
        <input type="password" v-model="passwordOri" maxlength=30 placeholder="请输入密码"></p>
        <!-- <span class="remind-pwd">请输入正确的密码</span> -->
    </div>
    <p class="forget">密码忘记了，请前往PC官网修改www.ipsebe.com</p>
    <button class="submit-btn" @click="prevLogin">{{login_msg}}</button>

    <p class="register"><a href="" @click.prevent="register">免费注册</a></p>
    <div class="sms">
      <router-link to="/smsLogin" tag="span">短信快捷登录</router-link>
    </div>

    <toast v-model="checkPostData"  :text='ver_tip' type="warn" :time="3000" :width="'auto'"></toast>

    <toast v-model="checkPostDatas"  :text='ver_tip' type="text" :time="3000" :width="'18rem'"></toast>

    <loading v-model="loading" text="正在登录中"></loading>

  </div>
</template>

<script>


  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  import Util from 'src/utils/util.js'
  import md5 from 'md5'
  import qs from 'qs'
  import { Toast } from 'vux'
  import { Loading } from 'vux'


  export default {
      components: {
          Toast,
          Loading
      },
      data () {
        return {
            login_msg: '登录',
            postData: {  //表示用户信息
              phone: '',
              password: '',
              beforeLoginCode: ''
            },
            passwordOri: '',
            ver_tip: '',
            submitDisabled: true,
            checkPostData: false,
            checkPostDatas: false,
            loading: false,
            isShop: false,
            shop: {}
        }
      },

      mounted () {
        this.getShop();
      },
      methods: {
        register(){
          var newQuery = this.$route.query
          this.$router.push({path: '/register',query: newQuery});
        },
        getShop () {
          this.shop = this.$route.query || {};
          this.isShop = this.$route.query.isShop || false;
        },

        prevLogin() {  //表示登录
            var self = this;
            self.checkValid();
            if ( self.submitDisabled && self.checkValid() ) {
                self.submitDisabled = false;
            } else {
                return false
            }
            self.submitDisabled = false;
            self.loading = true;
            self.$http.post( './api/beforeLogin', {
              account: self.postData.phone
            }).then((response) => {
              var data = response;
              self.postData.beforeLoginCode = data.code;
              self.postData.password = md5(self.passwordOri);
              self.login();
            }).catch((error) => {
              self.submitDisabled = true;
              this.loading = false;
              self.ver_tip = '系统繁忙，请稍候再试';
              this.checkPostData = true,
              self.logText = '立即登录';
              console.log('preLogin:'+ error);
            });

        },

        login () {
          var self = this;
          var postData = self.postData;
          //会员访问类型1 pc, 2 wx
          postData.resourceType = 2;
          self.$http.post( './api/login', postData).then((resp)=>{
              self.loading = false;
              self.submitDisabled = true;
              var data = resp;
              // self.$cookie.set('channelName', data.channelName, {domain:data.domains});
              // if (data.old_login_time) {
              //   self.$cookie.set('old_login_time', data.old_login_time, {domain:data.domains});
              // }
              // self.$cookie.set('phone', data.phone, {domain:data.domains});
              // self.$cookie.set('truename', data.truename, {domain:data.domains});
              // self.$cookie.set('user_token', data.key, {domain:data.domains, expires: data.expires || '1Y'});
              // self.$cookie.set('pid', data.pid, {domain:data.domains});
              // self.$cookie.set('type', data.type, {domain:data.domains});
              // self.$cookie.set('login_time', data.login_time, {domain:data.domains});
              // self.$cookie.set('nickname', data.nickname, {domain:data.domains});
              //如果是第三方渠道且未登录，则为其存储手机号和密码 后面自动登录
              var channel = sessionStorage.getItem('channel');
              if (channel) {
                localStorage.setItem('postData', JSON.stringify(postData));
              }
              self.loginSuccessHandle();
            })
          .catch((error)=> {
              self.submitDisabled = true;
              self.loading = false;
              this.ver_tip = error.response.data.msg;
              this.checkPostDatas = true;
              // todo  跳到 或者返回到 指定的网址
              // location.href = ''
          })
        },

        loginSuccessHandle(){
        var hash = location.hash;
        if (this.isShop == true ) {
          this.$router.push({path: '/confirm',query:this.shop});
          return;
        } else {
          if(hash.indexOf('return_url') !== -1) {
            location.href = Util.getHashString('return_url');
          } else{
            this.$router.push('/')
          }
        };
      },

        checkValid() {
            var postData = this.postData;
            var phone = postData.phone;
            var password = this.passwordOri;
            if (!phone.trim()) {
                this.ver_tip = '请输入手机号';
                this.checkPostData = true;
                return false;
            } else if(!/^1\d{10}$/.test(phone)){
                this.ver_tip = '请输入正确的手机号';
                this.checkPostData = true;
                return false;
            }

            if (!password.trim()) {
                this.ver_tip = '请输入密码';
                this.checkPostData = true;
                return false;
            } else if(!/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,16}$/.test(password)){
                this.ver_tip = '密码由8-16位字符组成,且须包含两种字符';
                this.checkPostDatas = true;
                return false;
            }

            return true;
        }



    }

  }

</script>


<style scoped lang='scss'>
  @import '~assets/css/adaptation.scss';
  .page {
    // background: #efeff4;

    .login {
        margin-top: px(30);
        border-bottom: 1px solid #e5e5e5;
        border-top: 1px solid #e5e5e5;
        background: #fff;

        p {
            position: relative;
            height: px(90);
            font-size: px(32);
            letter-spacing: 0;
            background: #fff;

            span {
                display: inline-block;
                position: absolute;
                top: px(22);
                // width: px(128);
                height: px(45);
                line-height: px(45);
                color: #333;

            }

            input {
              position: absolute;
              top: 0;
              height: px(88);
              line-height: px(88);
              border: 0;
              outline: 0;
            }

        }

        .tel {
            margin-left: px(30);
            width: px(720);
            border-bottom: 1px solid #e5e5e5;

            input {
              left: px(178);
            }

            // .remind-tel {

            // }

        }

        .pwd {
            padding-left: px(30);

            .span {
              left: px(30);
            }

            input {
                left: px(208);
            }

            // .remind-pwd {

            // }
        }

    }


    .submit-btn {
      display: block;
      margin: px(60) auto 0;
      width: px(690);
      height: px(94);
      line-height: px(94);
      font-size: px(36);
      color: #fff;
      background: #3DB1FA;
      background-image: linear-gradient(-90deg, #3DB1FA 0%, #3D95FA 100%);
      border-radius: px(6);
      border: 0;
      outline: 0;
    }
    .forget{margin: px(30) auto 0;font-size: px(26);color:#999;width: px(690);}
    .register{
      text-align: center;margin: px(30) auto 0;width: px(690);height: px(94);
      a{width:100%;display: inline-block;font-size: px(32);height: px(94);line-height:px(94);color:#3DB1FA;border: 1px solid #3DB1FA;border-radius: px(6);}
    }
    .sms{
      position: absolute;bottom: 20px;width: 100%;text-align: center;
      span{color: #666;font-size: px(32);}
    }
    @media (max-height: 400px) {
      .sms {
        display: none;
      }
    }
  }



</style>
