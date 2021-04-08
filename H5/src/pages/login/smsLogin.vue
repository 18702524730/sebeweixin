<template>
  <div class="page">
    <div class='register' v-show="isRegister">
      <p class='tel'>
        <span>手机号码</span>
        <input type="tel" v-model="postData.phone" maxlength=11 placeholder="填写手机号码">
        <span :class=" preventCode ? 'code' : 'disabled' "  @click.stop="getCode">{{codeText}}</span>
      </p>
      <p class='identifying-code'><span >验证码</span><input type="text"  maxlength=6 v-model="postData.token" placeholder="输入验证码"></p>
    </div>
    <p class="remind" v-show="isRegister">温馨提示，未注册拾贝网账号的手机号，登录时将自动注册，且代表您已同意<span @click="goToRule">《拾贝网用户注册协议》</span></p>
    <button  class="next-btn" v-show="isRegister" @click="smsLogin">{{loginText}}</button>
    <div class="sms">
      <router-link to="/login" tag="span">密码登录</router-link>
    </div>
    <!-- <p class="go-login" v-show="isRegister"><a @click.prevent="goToLogin" href="">已有账号，去登录</a></p>

    <div class="resetPwd" v-show="!isRegister" >
      <p>
        <span>设置密码</span>
        <input type="password"  v-model='postData.password'>
      </p>
    </div>
     -->
    <div class="body-mask" v-show="regAgreement" @click="regAgreement = false">
      <div class="dialog-box">
        <h1>拾贝网用户注册协议</h1>
        <div class="content">
          <p class="text">版本生效日期：2017年5月20日</p>
          <p class="text">本协议是您与拾贝平台（以下简称“本站”，网址：www.ipsebe.com）的所有者杭州拾贝知识产权服务有限公司（以下简称“拾贝”）之间就本站服务等相关事宜订立的契约，适用于您在本站的全部活动。在您注册成为本站用户前请务必认真阅读和理解本《用户注册协议》（以下简称“协议”）中规定的所有权利和限制。除非您接受本协议条款，否则您无权注册、登录、使用或以任何方式使用本协议所涉及的相关服务。您一旦注册、登录、使用或以任何方式使用本协议所涉及的相关服务的行为将视为对本协议的接受，即表示您同意接受本协议各项条款的约束。如果您不同意本协议中的条款，请不要注册、登录或使用本协议相关服务。</p>
          <p class="text">第一条 本协议条款的确认和接纳</p>
          <p class="text">1.1本站的各项知识产权服务的所有权和运作权归拾贝所有，用户同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。用户确认：本协条款是规定双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的除外。</p>
          <p class="text">1.2用户点击同意本协议的，即视为用户确认自己具有享受本站服务、下单选购服务等相应的权利能力和行为能力，能够独立承担法律责任。</p>
          <p class="text">1.3如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。</p>
          <p class="text">1.4拾贝保留在中华人民共和国法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。</p>
          <p class="text">第二条 服务的提供</p>
          <p class="text">2.1本站通互联网依法为用户提供互联网信息等服务，用户在完全同意本《协议》及本站相关规定的情况下，方有权使用本站的相关服务。</p>
          <p class="text">2.2用户必须自行准备如下设备和承担如下开支：(1)上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；(2)上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。</p>
          <p class="text">2.3用户可在本站上查询其所选择的相关服务信息、参加本站的有关活动，以及使用本站提供的其他服务。</p>
          <p class="text">第三条 用户信息</p>
          <p class="text">3.1在完成注册时，用户自行诚信按本站相应页面的提示同意准确提供并及时更新用户的注册资料，以使之真实、准确、完整、合法有效。如有合理理由怀疑您提供的资料不合法、不真实、不准确、不详尽的，拾贝有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部服务。拾贝对此不承担任何责任，您将承担因此产生的任何直接损失、间接损失及不利后果。</p>
          <p class="text">3.2您应当准确并及时更新您提供的电子邮件地址、联系电话、姓名等联系方式，以便拾贝与您进行有效联系，因通过这些联系方式无法与您取得联系，导致您在使用本站的服务过程中产生任何损失，应由您完全独自承担。您了解并同意，您有义务保持您提供的联系方式的有效性。</p>
          <p class="text">3.3您授权本站及拾贝可以通过向第三方验证审核您的身份和资格，并取得您使用本站服务的相关资料。</p>
          <p class="text">3.4在您使用本站服务或访问本站网页时，本站自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息等；如您下载或使用本站或本站关联公司移动客户端软件，或访问移动网页使用本站平台服务时，本站可能会读取与您位置和移动设备相关的信息，包括但不限于设备型号、设备识别码、操作系统、分辨率等。</p>
          <p class="text">第四条 用户使用规则</p>
          <p class="text">4.1 用户注册成功后，将产生用户名和密码等账户信息，您须对您的用户登录名和密码自行负责保密，且须对您在该登录名和密码下发生的所有活动（包括但不限于信息披露、发布信息或提交各类规则服务条款及网上续签服务条款等）承担责任。您同意：</p>
          <p class="text">4.1.1如发现任何人未经授权使用您的本站用户登录名和密码或发生违反保密规定的任何其他情况，您会立即通知拾贝，并授权拾贝将前述情况进行处理，以保障您的合法权益；</p>
          <p class="text">4.1.2确保您在每个上网时段结束时，以正确步骤离开本站。拾贝不能也不会对因您未能遵守本款规定而发生的任何损失或损毁及其他不利后果负责。您理解拾贝对您的请求采取行动需要合理时间，拾贝对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。</p>
          <p class="text">4.1.3不应将在本站注册获得的账户以出借、转让、赠与等方式给予他人使用，除非有法律规定或司法裁定，且征得拾贝的同意，否则您将承担由此产生的全部责任，并与实际使用人承担连带责任。</p>
          <p class="text">4.2用户在使用本站服务过程中，必须遵循以下原则：</p>
          <p class="text">4.2.1遵守中国有关的法律和法规；</p>
          <p class="text">4.2.2遵守所有与网络服务有关的网络协议、规定和程序；</p>
          <p class="text">4.2.3不得利用本站网络服务系统进行任何可能对互联网或移动网正常运转造成不利影响的行为；</p>
          <p class="text">4.2.4不得侵犯本站和其他任何第三方的知识产权或其他任何合法权益；</p>
          <p class="text">4.2.5不得利用本站网络服务系统进行任何不利于本站服务的行为；</p>
          <p class="text">4.2.6如发现任何非法使用用户账号或账号出现安全漏洞的情况，应立即通知本站。</p>
          <p class="text">4.3如用户在使用本站服务时违反上述任何规定，本站或本站授权方有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户上传的信息等、暂停或终止用户使用本站服务的权利）以减轻用户不当行为造成的影响。</p>
          <p class="text">4.4您同意接受本站通过电子邮件、短信、即时通信的客户端、网页或其他合法方式向您发送相关订单信息、具体服务办理状态、服务规则及行业资讯、促销活动等信息，但本站及拾贝不保证您能够收到或者及时收到信息，且不对此承担责任。因此，在服务过程中您应当及时登录到本站查看和进行相关操作。因您没有及时查看和对服务状态进行修改或确认或未能提交相关申请而导致的任何纠纷或损失由您独自承担。</p>
          <p class="text">4.5在您使用本站服务时，拾贝有权依照相应的服务条款向您收取服务费用，拾贝在收取服务费用之前将征得您的同意。拾贝拥有制订及调整服务费的权利，具体收费项详见www.ipsebe.com相关产品与服务或以您与拾贝达成的其他书面服务条款为准。</p>
          <p class="text">4.6您知悉并理解本站上已公布的服务价格、图片及详情等信息随时都有可能发生变动，对此本站及拾贝不作特别通知。</p>
          <p class="text">第五条 拾贝的权利和义务</p>
          <p class="text">5.1拾贝应根据您选择的服务以及支付款项的情况向您提供相应的网络技术和信息服务。</p>
          <p class="text">5.2拾贝承诺对您提供的资料采取对外保密措施，不向任何第三方披露或授权第三方使用，除非：</p>
          <p class="text">1)依据本站服务条款或者您与拾贝之间其他服务条款、合同、在线条款等规定可以提供；</p>
          <p class="text">2)依据法律法规的规定应当提供；</p>
          <p class="text">3)您同意拾贝向第三方提供；</p>
          <p class="text">4)拾贝解决举报事件、提起诉讼而提交的或为防止严重违法行为或涉嫌犯罪行为发生而采取必要合理行动所必须提交的。</p>
          <p class="text">5.3拾贝保留在您违反国家、地方法律法规规定或违反本站服务条款的情况下终止为您提供服务并注销您账户的权利。</p>
          <p class="text">5.4本站含有到其他网站的链接，但拾贝对其他网站的隐私保护措施不负任何责任。拾贝可能在任何需要的时候增加商业伙伴或共用品牌的网站。</p>
          <p class="text">5.5拾贝仅按现有技术提供相应的安全措施来使拾贝掌握的信息不丢失，不被滥用和变造。这些安全措施包括向其他服务器备份数据和对用户密码加密。尽管有这些安全措施，但拾贝不保证这些信息的绝对安全。</p>
          <p class="text">5.6为向您提供更全面的服务，拾贝会将依法收集到的您的个人信息用于审计、数据分析、研究和关联公司之间分享等内部目的。</p>
          <p class="text">5.7视具体情况，拾贝会向与拾贝合作提供产品和服务或者帮助拾贝向客户进行营销的合作伙伴提供某些个人信息。拾贝只会为提供或改进拾贝的产品、服务和广告宣传之目的而与第三方共享个人信息；而不会为第三方的营销目的与第三方共享个人信息，更不会销售个人信息。拾贝有义务要求上述合作伙伴严格遵守保密约定。</p>
          <p class="text">第六条 服务中断或终止</p>
          <p class="text">6.1本站系统可能因下列状况无法正常运作，使用户无法使用本站各项服务时，拾贝不承担损害赔偿责任，该状况包括但不限于：</p>
          <p class="text">6.1.1因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成本站网络系统障碍不能执行业务的；</p>
          <p class="text">6.1.2电信设备出现故障不能进行数据传输的；</p>
          <p class="text">6.1.3由于黑客攻击、电信部门技术调整或故障原因、用户手机故障或病毒、信息损坏或丢失而造成的服务中断或者延迟。</p>
          <p class="text">6.2用户理解，拾贝需要定期或不定期地对提供本站服务的平台（如互联网网站、移动网络、软件等）或相关的设备进行检修或维护更新，如因此情况造成本站服务在合理时间内的中断，拾贝无需为此承担任何责任。</p>
          <p class="text">6.3如发生下列任何一种情形，拾贝有权随时中断或终止向用户提供本站各项服务而无需对用户或任何第三方承担任何责任：</p>
          <p class="text">6.3.1用户提供的个人资料不真实，且侵犯了他人的合法权益；</p>
          <p class="text">6.3.2用户违反本协议中规定的使用规则。</p>
          <p class="text">第七条 知识产权的保护</p>
          <p class="text">7.1本站上所有内容，包括但不限于文字信息、图片、档案、分析数据、资料、网站架构、网站画面的安排、网页设计，均由拾贝或拾贝关联公司依法拥有其知识产权。</p>
          <p class="text">7.2非经拾贝或拾贝关联公司书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表本站程序及内容。</p>
          <p class="text">7.3尊重知识产权是用户应尽的义务，如有违反，用户应承担损害赔偿责任。</p>
          <p class="text">第八条 本协议责任范围及责任限制</p>
          <p class="text">8.1拾贝仅对本协议中列明的责任承担范围负责。</p>
          <p class="text">8.2本站得到的用户信息是由您本人自行提供的，本站在获得途径保证信息之准确、及时和完整之前，您应对您的判断承担全部责任。</p>
          <p class="text">8.3您自拾贝及拾贝工作人员或经由本站服务取得之建议和资讯，无论该建议和资讯为书面或口头形式，均不构成拾贝对本站服务的保证。</p>
          <p class="text">8.4除另有规定外，在任何情况下，拾贝对本协议所承担的违约赔偿责任总额不超过向您收取的当次服务费用的总额。</p>
          <p class="text">第九条 其他</p>
          <p class="text">9.1如果本协议中的任何条款无论何种原因完全或部分无效或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本协议其余条款仍应有效并且有约束力。</p>
          <p class="text">9.2拾贝有权随时根据有关法律、法规的变化以及公司经营状况经营策略的调整等修改本协议，具体服务条款和公告，无需另行单独通知用户，若您在本协议内容公告变更后继续使用本站的服务，表示您已充分阅读、理解并接受修改后的协议；同时就您在协议、各服务条款或公告修订前通过本站进行的交易及其效力，视为您已同意并已按照本协议进行了相应的授权和追认。若您不同意修改后的协议内容，您应停止使用本站的服务。当发生有关争议时，以最新的协议文本为准。</p>
          <p class="text">9.3本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本协议产生的争议，双方应尽力友好协商解决；协商不成时可向被告住所地人民法院提起诉讼。</p>
        </div>
      </div>
      <div class="close" @click="regAgreement = false"></div>
    </div>
    <!-- <button  class="submit-btn" v-show="!isRegister" @click="getRegister">{{loginText}}</button> -->

    <toast v-model="checkPostData"  :text='ver_tip' type="warn" :time="3000" :width="'auto'"></toast>
    <toast v-model="checkPostDatas"  :text='ver_tip' type="text" :time="3000" :width="toastWidth"></toast>
    <loading v-model="loading" text="正在登录中"></loading>

  </div>
</template>

<script>

  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  import Util from 'src/utils/util.js'
  import md5 from 'md5'
  import qs from 'qs'
  import { XDialog , TransferDomDirective as TransferDom } from 'vux'

  import { Toast } from 'vux'
  import { Loading } from 'vux'


  export default {
      directives: {
        TransferDom
      },
      components: {
        Toast,
        Loading,
        XDialog
      },
      data () {
        return {
          submitDisabled: false,
          codeText: '获取验证码',
          loginText: '登录',
          ver_tip: '',
          toastWidth: 'auto',
          isRegister: true,
          preventCode: true,
          loading: false,
          checkPostData: false,
          checkPostDatas: false,
          regAgreement: false,
          postData:{
              phone:'',
              password:'',
              beforeLoginCode:'',
              token:''
          }

        }
      },
      methods: {
        goToRule () {
          this.regAgreement = true;
        },


        // 获取验证码  判断是否有可用的手机号
        getCode () {
          var self = this;
          var postData = this.postData;
          var phone = postData.phone;
          if (!phone.trim()) {
                this.ver_tip = '请输入手机号';
                this.checkPostData = true;
                return false;
            } else if(!/^1\d{10}$/.test(phone)){
                this.ver_tip = '请输入正确的手机号';
                this.checkPostData = true;
                return false;
          };
          if (this.preventCode) {
              this.preventCode = false;
              this.getCapcha();
          }
        },

        //向手机号发送 验证码
        getCapcha () {
          var self = this;
          self.$http.post(userUrl + '/api/login/sendPhoneCode', {phone: self.postData.phone})
            .then((resp) => {
              self.timeout();
              // var data = resp;
              self.ver_tip = '验证码已发送';
              this.checkPostDatas = true;
              self.toastWidth = 'auto';

              // self.$vux.toast.show({
              //   text: '验证码已发送'
              //   // position: 'top'
              // });

          }).catch((error) => {
            var data = error.response.data;
            self.ver_tip = data.msg;
            self.checkPostData = true;
          });
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

        //登录
        smsLogin () {
          if (this.checkValid()) {
            this.prevLogin();
          }
        },

        //校验 手机号 密码 验证码
        checkValid() {
            var postData = this.postData;
            var phone = postData.phone;
            var token = postData.token;
            if (!phone.trim()) {
                this.ver_tip = '请输入手机号';
                this.checkPostData = true;
                return false;
            } else if(!/^1\d{10}$/.test(phone)){
                this.ver_tip = '请输入正确的手机号';
                this.checkPostData = true;
                return false;
            }
            if (!token.trim()) {
                this.ver_tip = '请输入验证码';
                this.checkPostData = true;
                return false;
            }else if(token.length !== 6){
                this.ver_tip = '校验码为6位数';
                this.checkPostData = true;
                return false;
            }
            return true;
            //this.isRegister = false;
        },

        goToLogin () {
          var newQuery = this.$route.query
          this.$router.push({path: '/login',query: newQuery});
        },


        prevLogin () {
            var self = this;
            self.loading = true;
            if (self.submitDisabled) {
              return;
            }
            self.submitDisabled = true;
            self.$http.post(userUrl + '/api/beforeLogin', {
              account: self.postData.phone
            }).then((response) => {
              var data = response;
              self.postData.beforeLoginCode = data.code;
              self.login();
            }).catch((error) => {
              self.submitDisabled = false;
              this.loading = false;
              self.ver_tip = '系统繁忙，请稍候再试';
              this.checkPostData = true,
              self.logText = '立即登录';
              console.log('preLogin:'+ error);
            });
        },

        login () {
          var self = this;
          var data = {
            beforeLoginCode: self.postData.beforeLoginCode,
            phoneCode: self.postData.token,
            phone:self.postData.phone,
            loginType: 2, //登录方式  1密码登录(默认)  2短信验证码登录
            resourceType: 2  //会员访问类型1 pc, 2 wx
          };
          self.$http.post( './api/login', data).then((resp)=>{
              self.loading = false;
              self.submitDisabled = false;
              this.loginSuccessHandle();
              //todo
            })
          .catch((error)=> {
              self.submitDisabled = false;
              self.loading = false;
              this.ver_tip = error.response.data.msg;
              this.checkPostData = true;
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
       }
      }
  }

</script>


<style scoped lang='scss'>
  @import '~assets/css/adaptation.scss';
  .page {
    height: 100%;
    // background: #efeff4;

    .register {
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
                height: px(45);
                line-height: px(45);
                color: #333;

            }

            input {
              position: absolute;
              top: 0;
              height: px(88);
              line-height: px(90);
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

            .code {
              top: 0;
              right: 0;
              width: px(210);
              height: px(90);
              line-height: px(90);
              color: #3db1fa;
              text-align: center;
              border-left: 1px solid #e5e5e5;

            }

            .disabled {
              top: 0;
              right: 0;
              width: px(210);
              height: px(90);
              line-height: px(90);
              color: #b2b2b2;
              text-align: center;
              border-left: 1px solid #e5e5e5;

            }

        }

        .identifying-code {
            padding-left: px(30);

            input {
                position: absolute;
                top: 0;
                left: px(208);
                height: px(88);
                line-height: px(88);
                border: 0;
                outline: 0;

            }

        }

    }

    .remind {
      margin-top: px(28);
      padding: 0 px(30);
      width: px(750);
      height: px(74);
      line-height: px(37);
      font-size: px(26);
      color: #666;

      span {
        color: #3db1fa;
      }
    }


    .next-btn {
      display: block;
      margin: px(64) auto 0;
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

    .go-login {
      display: block;
      width: px(690);
      height: px(94);
      margin: px(30) auto 0 ;
      font-size: px(32);
      color: #666;
      text-align: center;
      a{width:100%;display: inline-block;height: px(94);line-height:px(94);color:#3DB1FA;border: 1px solid #3DB1FA;border-radius: px(6);}
    }

    .resetPwd {
      margin-top: px(30);
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      background: #fff;

      p {
        position: relative;
        height: px(89);
        background: #fff;


        span {
          position: absolute;
          top: px(22);
          left: px(30);
          height: px(45);
          line-height: px(45);
          font-size: px(32);
          color: #333;

        }

        input {
          position: absolute;
          top: px(22);
          left: px(178);
          height: px(45);
          line-height: px(45);
          border: 0;
          outline: 0;


        }


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
      border-radius: 6px;
      border: 0;
      outline: 0;
    }

    .body-mask {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 10;
      width: px(750);
      height: 100%;
      background: rgba(0,0,0,0.40);

      .dialog-box {
        position: absolute;
        top: px(30);
        right: px(30);
        bottom: px(30);
        width: px(690);
        height: px(1071);
        background: #fff;
        padding: 0 px(40);
        box-shadow: 0 6px 30px 0 rgba(0,0,0,0.10);
        border-radius: 6px;

        h1 {
          margin: px(60) auto px(20);
          font-size: px(32);
          color: #333;
        }

        .content {
          width: px(610);
          height: px(870);
          margin: 0 auto;
          overflow: auto;

          p {
            font-size: px(24);
            line-height: px(36);
            color: #666;
            text-align: left;
          }

        }

      }

      .close {
        position: absolute;
        top: px(1060.8);
        left: px(336.8);
        width: px(90.5);
        height: px(90.5);
        border-radius: 50%;
        background: url(~assets/img/detail/chacha.png) no-repeat center center,#666;
        background-size: px(42.5);
      }

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
<style>
  .weui-toast{padding: 0 0.5rem;max-width: 20rem;min-width: 7.6rem;}
</style>
