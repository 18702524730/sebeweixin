<template>
  <div>
    <div class="business_invitation" v-if="linkOk">
      <div class="content_box">
        <p class="title">尊敬的{{ invitationObj.memberName }}</p>
        <p class="content">请绑定成为<span class="conpany">{{ invitationObj.objName }}</span>的商家子账号</p>
        <p class="business">
          <span class="key">商家名称</span>
          <span class="value">{{ invitationObj.objName }}</span>
        </p>
        <p class="business">
          <span class="key">邀请时间</span>
          <span class="value">{{ invitationObj.updateTime | format }}</span>
        </p>
        <p class="note">*温馨提示：本次邀请的有效期为72小时，逾期将自动失效</p>
      </div>
      <button class="join_btn" @click="joinFn"></button>

      <div class="success_box_bg" v-if="showBox">
        <div class="success_box">
          <img src="~assets/img/businessSettled/close.png" class="close" @click="showBox=false" alt="">
          <img src="~assets/img/businessSettled/success.png" class="success" alt="">
          <div class="text">
            <p class="line">绑定成功！</p>
            <p class="line">绑定成功，请前往拾贝网开启商家之旅。</p>
          </div>
          <button class="btn_submit" @click="showBox=false">确定</button>
        </div>
      </div>
    </div>
    <div class="empty" v-if="!linkOk">
      <div class="con">
        <img src="~assets/img/businessSettled/fail.png" class="fail" alt="">
        <p class="text">该链接已失效</p>
      </div>
      <img src="~assets/img/businessSettled/icon.png" class="icon" alt="">
    </div>
  </div>
</template>

<script>


  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  const rootUrl = CONFIG.rootUrl;
  const memberUrl = rootUrl + '/api/memberOperatorRelation/invitation/member';  //查看子账号邀请信息
  const invitationUrl = rootUrl + '/api/memberOperatorRelation/invitation';  //1.1.5.接受子账号邀请

  import Vue from 'vue';
  import dialogBox from '../../components/dialogBox';
  import filters from 'src/utils/filters.js';
  import Util from 'src/utils/util.js'
  import md5 from 'md5'
  import qs from 'qs';
  import { Toast, Loading, Msg, XButton, Alert, CheckIcon, ToastPlugin } from 'vux';

  export default {
      components: {
        dialogBox,
        Toast,
        Loading,
        CheckIcon,
        ToastPlugin
      },
      data () {
        return {
          showBox: false, //是否展示弹窗
          invitationObj: {},  //子账号邀请信息
          linkOk: true,  //链接可用
        }
      },
      mounted () {
        this.getUserInfo(this.$route.query.memberId);
      },
      methods: {
        // 查询子账号信息
        getUserInfo (id) {
          this.$http.get(memberUrl + '/' +id)
          .then( (resp) => {
            if (resp.status == 'WAITING') {
              this.invitationObj = resp;
              this.linkOk = true;  //链接未失效
            }
            else{
              this.linkOk = false;  //链接已失效
            }
          })
          .catch ( (error) => {
            this.linkOk = false;  //链接已失效
            console.log(error.response.data,msg)
          })
        },
        // 确认加入
        joinFn () {
          let params = {
            invitationId: this.invitationObj.id
          }
          this.$http.patch(invitationUrl + '/' + this.invitationObj.id + '/ACCEPT' )
          .then( (resp) => {
            if (resp) {
              this.showBox = true;
              this.getUserInfo();  //查询子账号信息
            }
          })
        }
      },
      filters: {
        format: filters.formatDate.format
      }
  }

</script>


<style scoped lang='scss'>
  @import '~assets/css/adaptation.scss';
  .business_invitation {
    width: 100%; height: 100%; position:absolute; background: url(~assets/img/businessSettled/invited_bg.png) no-repeat; background-size: cover;
    .content_box {
      width: px(654); height:px(650); box-sizing:border-box; padding: px(50) px(35); margin: px(290) auto px(50) auto; background: rgba(255,255,255,.9); border-radius:px(10); box-shadow:px(17) 0 px(13) rgba(52,128,239,0.1) inset; text-align: left;
      .title { font-size: px(32); color: #556AAD;}
      .content {
        font-size: px(32); color: #556AAD; margin-top: px(60); margin-bottom: px(70); line-height: 1.9;
        .conpany {color: #08C7A7;}
      }
      .business {
        width: 100%; margin-bottom: px(20); font-size: px(28);
        .key {color: #B1C0EC; margin-right: px(10);}
        .value {color: #556AAD; }
      }
      .note {font-size: px(26); color: #556AAD; opacity: 0.5; margin-top: px(45);}
    }
    .join_btn {
      background: url(~assets/img/businessSettled/btn_bg.png) no-repeat; background-size: cover; color: #fff; font-size: px(32); text-align: center; display: block; margin: 0 auto; width: px(536); height: px(90); line-height: px(90); padding-bottom: px(10); box-sizing: border-box;
    }
    .success_box_bg {
      position: fixed; background: rgba(0,0,0,.8); left: 0; top:0; width: 100%; height: 100%;
      .success_box {
        width: px(652); height: px(550); background: url(~assets/img/businessSettled/box_bg.png) no-repeat; background-size: cover; margin: px(320) auto 0 auto; position: relative;
        .close {position: absolute; right: 0; top: px(45); width: px(44); height: px(44);}
        .success {position: absolute; left: 50%; top: px(260); width: px(82); height: px(82); margin-left: px(-41);}
        .text {
          width: px(600); text-align: center; position: absolute; top: px(370); left: px(26);
          .line {font-size: px(28); color: #6ACB8A; width: 100%; text-align: center; margin-bottom: px(10);}
        }
        .btn_submit {width: px(270); height: px(60); line-height: px(60); background: #6ACB8A; text-align: center; position: absolute; left: 50%; bottom: px(-90); margin-left: px(-135); color: #fff; font-size: px(28); border-radius: px(28);}
      }
    }
  }
  .empty {
    width: 100%; height: 100%; background: #fff; position: absolute; left: 0; top: 0;
    .con {
      width: 100%; text-align: center; margin-top: px(400);
      .fail {width: px(196); height: px(212); display: inline-block;}
      .text {font-size: px(32); color: #999;}
    }
  }
  .icon {width: px(200); height: px(32); position: absolute; bottom: px(130); left: 50%; margin-left: px(-100); }

</style>
