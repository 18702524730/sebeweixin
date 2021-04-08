<template>
  <div class="business_settled">
    <div class="top_img">
      <img src="~assets/img/businessSettled/logo.png" class="logo" alt="">
      <img src="~assets/img/businessSettled/title.png" class="banner_tit" alt="">
      <p class="join">拾贝开放平台，服务商全面升级，共享海量资源，获取无限商机</p>
    </div>

    <div class="tab_box" :class="{'right': activeIndex==1}" >
      <p class="item" @click="activeIndex=0">机构商家</p>
      <p class="item" @click="activeIndex=1">个人商家</p>
    </div>
    <div class="info_box" :class="{'info_box_rig': activeIndex==1}">
      <div class="line" v-if="activeIndex==0">
        <span class="must">*</span>
        <span class="key">机构名称</span>
        <input type="text" class="value" placeholder="请填写公司名称" maxlength="30" v-model="tableInfo.companyName">
      </div>
      <div class="line">
        <span class="must">*</span>
        <span class="key">你的姓名</span>
        <input type="text" class="value" placeholder="请填写联系人姓名" maxlength="30" v-model="tableInfo.name">
      </div>
      <div class="line">
        <span class="must">*</span>
        <span class="key">联系电话</span>
        <input type="text" class="value" placeholder="请填写联系电话" maxlength="11" v-model="tableInfo.phone" @blur="checkPhoneFn">
      </div>
      <div class="line">
        <span class="must">*</span>
        <span class="key">手机验证码</span>
        <input type="text" class="value value_code" v-model="tableInfo.code" maxlength="6" placeholder="请填写验证码">
        <span class="code_btn" :class="{'prevent': preventCode}" @click="sendCodeFn">{{ codeText }}</span>
      </div>
      <div class="line line_text" v-if="activeIndex==0">
        <span class="key">机构介绍</span>
        <span class="value">{{ tableInfo.remark && tableInfo.remark.length || 0 }}/200字</span>
        <!-- <input type="teatarea" class="value_text" v-model="tableInfo.remark" maxlength="200" rows="3" placeholder="请填写机构介绍"> -->
        <textarea  cols="30" rows="2" class="value_text" v-model="tableInfo.remark" maxlength="200" placeholder="请填写机构介绍"></textarea>
      </div>
      <div class="line line_text" v-if="activeIndex==1">
        <span class="key">个人介绍</span>
        <span class="value">{{ tableInfo.remark && tableInfo.remark.length || 0 }}/200字</span>
        <!-- <input type="text" class="value_text" v-model="tableInfo.remark" maxlength="200" placeholder="请填写个人介绍"> -->
        <textarea  cols="30" rows="2" class="value_text" v-model="tableInfo.remark" maxlength="200" placeholder="请填写个人介绍"></textarea>
      </div>
      <div class="rule_box" v-if="showFile">
        <!-- <label for=""><input type="checkbox" class="ckeckbox" />我已阅读</label> -->
        <!-- <i class="weui-icon weui_icon_success weui-icon-success" style=""></i> -->
        <CheckIcon :value.sync="isCheck" ></CheckIcon><span class="read">我已阅读并同意</span>
        <a @click="showFileDetail=true">《拾贝网用户注册协议》</a>
      </div>
      <button class="join_btn" @click="submitFn">立即入驻</button>

    </div>

    <div class="platform_adwantage">
      <h1 class="tit">平台优势</h1>
      <div class="a_item">
        <img src="~assets/img/businessSettled/a_1.png" alt="" class="img">
        <div class="text_box">
          <p class="title">业务增速</p>
          <p class="info">派发千万级服务商机</p>
        </div>
      </div>
      <div class="a_item">
        <img src="~assets/img/businessSettled/a_2.png" alt="" class="img">
        <div class="text_box">
          <p class="title">运营扶持</p>
          <p class="info">定制专属运营计划</p>
        </div>
      </div>
      <div class="a_item">
        <img src="~assets/img/businessSettled/a_3.png" alt="" class="img">
        <div class="text_box">
          <p class="title">平台赋能</p>
          <p class="info">享受业务服务指导</p>
        </div>
      </div>
      <div class="a_item">
        <img src="~assets/img/businessSettled/a_4.png" alt="" class="img">
        <div class="text_box">
          <p class="title">后台支持</p>
          <p class="info">管理业务全流程</p>
        </div>
      </div>
      <div class="a_item">
        <img src="~assets/img/businessSettled/a_5.png" alt="" class="img">
        <div class="text_box">
          <p class="title">智能工具</p>
          <p class="info">创造性研发行业工具</p>
        </div>
      </div>
    </div>

    <div class="contact_us">
      <img src="~assets/img/businessSettled/contact.png" class="img" alt="">
      <div class="tell_line">
        <p class="title">入驻专线</p>
        <p class="tell">0571-28253721 / 15267148446</p>
      </div>
    </div>
    
    <dialog-box :isShow="isShow" :title="title" :content="content" :buttonText="buttonText" :hideOnBlur="hideOnBlur" :boxType="boxType" @confirm="confirmFn" @hide="hideFn" > </dialog-box>

    <!-- 注册协议 -->
    <register-protocol :isShow="showFileDetail" @hide="hideBoxFn"></register-protocol>

  </div>
</template>

<script>


  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  const rootUrl = CONFIG.rootUrl;
  const capchaUrl = rootUrl + '/api/apply/capcha';  //发送验证码
  const applyUrl = rootUrl + '/api/apply';  //服务商申请入驻

  import Vue from 'vue';
  import dialogBox from '../../components/dialogBox';
  import Util from 'src/utils/util.js'
  import md5 from 'md5'
  import qs from 'qs';
  import registerProtocol from '../../components/registerProtocol';
  import { Toast, Loading, Msg, XButton, Alert, CheckIcon, ToastPlugin } from 'vux';

  export default {
      components: {
        dialogBox,
        Toast,
        Loading,
        CheckIcon,
        ToastPlugin,
        registerProtocol
      },
      data () {
        return {
          value: [],
          isCheck: true,
          activeIndex: 0,  //0.机构商家 1.个人商家,
          isShow: false,
          title: '',
          content: '',
          buttonText: '',
          hideOnBlur: true,
          boxType: 1,
          tableInfo: {
            remark: ''
          },  //表格信息
          codeText:'发送验证码',
          preventCode: false,
          showFile: false,  //显示注册协议
          showFileDetail: false,  //用户协议详情
        }
      },
      mounted () {

      },
      methods: {
        // 隐藏用户注册协议
        hideBoxFn () {
          this.showFileDetail = false;
        },
        // 检查联系来电话的账号是都已经是拾贝网会员
        checkPhoneFn () {
          this.$http.get(`${rootUrl}/api/member/phone/${this.tableInfo.phone}/exists`)
          .then( (res) => {
            this.showFile = !res.data.memberExists;
            if (res.data.spExists) {
              this.$vux.toast.text('您已入驻商家中心，请勿重复申请', 'top');
              return
            }
            if (res.data.sAapplyExist ) {
              this.$vux.toast.text('请勿重复提交。您已提交过申请。如有疑问请咨询平台客服电话：0571-28253721', 'top');
              return
            }
            if (res.data.invitedAccepted) {
              this.$vux.toast.text('您已经受邀加入商家中心，请勿重复申请', 'top');
              return
            }
            if (res.data.operatorExists) {
              this.$vux.toast.text('您已经是加入商家中心，请勿重复申请', 'top');
              return
            }
          })
        },
        // 立即入驻
        submitFn () {
          if (this.activeIndex==0 && !this.tableInfo.companyName) {
            this.$vux.toast.text('请输入机构名称', 'top');
            return
          }
          if (this.activeIndex==0 && this.tableInfo.companyName.length>30 || this.activeIndex==0 && this.tableInfo.companyName.length<1) {
            this.$vux.toast.text('机构名称长度必须在1-30字范围内', 'top');
            return
          }
          if (!this.tableInfo.name) {
            this.$vux.toast.text('请输入姓名', 'top');
            return
          }
          if (this.tableInfo.name.length>20 || this.tableInfo.name.length<1) {
            this.$vux.toast.text('姓名长度必须在1-20字范围内', 'top');
            return
          }
          if (!this.tableInfo.phone) {
            this.$vux.toast.text('请输入联系电话', 'top');
            return
          }
          if (!/^1[0-9]{10}$/.test(this.tableInfo.phone)) {
            this.$vux.toast.text('请输入正确格式的联系电话', 'top');
            return
          }
          if (!this.tableInfo.code || !/^\d{6}/.test(this.tableInfo.code)) {
            this.$vux.toast.text('请输入6位数字手机验证码', 'top');
            return
          }
          if (!this.isCheck) {
            this.$vux.toast.text('请阅读并同意《拾贝网用户注册协议》', 'top');
            return
          }
          let data = this.tableInfo;
          if (this.activeIndex==0) {
            data.applyType = 1;  //机构服务商
          }
          else if (this.activeIndex==1) {
            data.applyType = 0;  //个人服务商
            data.companyName = null;
          }
          this.$http.post(applyUrl, data)
          .then( (resp)=>{
            console.log(resp);
            this.isShow = true;
            this.title = '申请入驻成功！';
            this.content = '温馨提示，工作人员将在1个工作日内与您联系，请保持手机畅通。';
            this.buttonText = '前往拾贝网';
            this.boxType = 1;
            this.tableInfo = {};  //入驻成功清空页面数据
          })
          .catch( (error) => {
            if (error.response.data.msg == '服务商已存在') {
              this.title = '请勿重复申请!';
              this.content = '您已提交过申请。如有疑问请咨询平台客服电话：0571-28253721';
              this.buttonText = '关闭';
              this.boxType = 2;
              this.isShow = true;
            }
            else if (error.response.data.msg){
              this.$vux.toast.text(error.response.data.msg, 'top');
            }
          })
        },
        // 发送验证码
        sendCodeFn () {
          let reg = /^1[0-9]{10}$/;
          if (!reg.test(this.tableInfo.phone)) {
            this.$vux.toast.text('请输入正确的手机号码', 'top');
            return
          }
          if (!this.preventCode) {
            let params = {
              account: this.tableInfo.phone
            };
            if (this.activeIndex==0) {
              params.type = 1;  //机构服务商
            }
            else if (this.activeIndex==1) {
              params.type = 0;  //个人服务商
            }
            // 发送验证码请求
            this.$http.get(capchaUrl, {params: params})
            .then ( (resp) => {
              console.log(resp);
              this.preventCode = true;
              this.timeout();
            })
            .catch ( (error) => {
              if (error.response.data.msg) {
                this.$vux.toast.text(error.response.data.msg, 'top');
              }
              else{
                this.$vux.toast.text('短信验证码发送失败', 'top');
              }
            })
          }
        },
        timeout(){
          var self = this;
          var second = 60, timer;
          self.preventCode = true;
          timer = setInterval(function(){
            if(second<=0){
              clearInterval(timer);
              second = 60;
              self.codeText = "重发验证码";
              self.preventCode = false;
            }else{
              self.codeText = second + "s";
              self.preventCode = true;
              second--;
            }
          }, 1000);
        },
        // 弹窗确认按钮回调
        confirmFn (data) {
          if(data) {
            this.$router.push({path: '/'});
          }
        },
        // 隐藏弹窗毁掉
        hideFn (data) {
          this.isShow = false;
        }
      }

  }

</script>


<style scoped lang='scss'>
  @import '~assets/css/adaptation.scss';
  .business_settled {
    .vux-check-icon > span {color: #999;}
    .weui-icon-success {color: linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1)) !important; font-size: px(17) !important;}
    background: url(~assets/img/businessSettled/bg.png) left top no-repeat #2194FF; background-size: 100%; width: 100%; height: 100%; padding: px(50) 0 px(30) 0;
    .top_img {
      width:100%; text-align: center;
      .logo {width: px(160); display: block; margin: 0 auto;}
      .banner_tit {width: px(360); display: block; margin: px(40) auto px(24) auto;}
      .join {width:px(465); margin:0 auto; text-align: center; color: #fff; font-size: px(26); text-align: center; margin-bottom: px(40);}
    }
    .tab_box {
      width: px(690); height: px(90); margin: 0 auto; display: flex; justify-content:flex-start; align-items:center;
      .item {
        height:px(90); line-height: px(90); text-align: center; color: #333; opacity: 0.9; background:#fff; border-radius:px(8) px(8) 0 0; font-size: px(34);
        &:first-child {opacity: 1; margin-right: px(10); width:px(345);}
        &:last-child {opacity: 0.9; width:px(325);}
      }
      &.right {
        justify-content:flex-end;
        .item{
          &:first-child {opacity: 0.9; margin-right: px(10); width:px(325);}
          &:last-child {opacity: 1; width:px(345);}
        }
      }
    }
    .info_box {
      width: px(690); height:auto; background-color: #fff; margin:0 auto; box-shadow:0 2px 6px 0 rgba(0,0,0,0.07); border-radius:0 px(8) px(8) px(8); padding: px(20) px(30) px(30) px(30);
      &.info_box_rig {border-radius:px(8) 0 px(8) px(8);}
      .line {
        width: 100%; padding: px(20) 0; border-bottom: 1px solid #E6E6E6;
        .must {color: #F64744; vertical-align: middle;}
        .key {color: #666; font-size: 30rpx; width: px(190); height: px(40); line-height: px(40); display: inline-block; vertical-align: middle;}
        .value {border:none; height: px(40); font-size: px(30); vertical-align: middle;}
        .value_code {width: px(180); }
        .code_btn {
          width: px(180); height:px(56); line-height: px(56); text-align: center; background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1)); border-radius:px(28); color: #fff; margin-left: px(30); font-size: px(26); display: inline-block;
          &.prevent {background: #ddd; color: #fff;}
        }
      }
      .line_text {
        display: flex; justify-content: space-between; align-items:center; flex-wrap: wrap;
        .value {color: #999;}
        .value_text {width: 100%; border:none; font-size: px(30); padding-top: px(30); }
      }
      .rule_box {
        width: 100%; display: flex; justify-content:flex-start; align-items:center; font-size: px(28); color: #999; margin-top: px(30);
        a {color: #3DB1FA;}
        .read {color:#999;}
        .ckeckbox {vertical-align: middle; margin-right: px(10);}
      }
      .join_btn {width:100%; margin-top: px(30); height: px(90); line-height: px(90); background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1)); border-radius: px(6); text-align: center;color: #fff; font-size: px(34); }
    }
    .platform_adwantage {
      width: px(690); height: auto; margin: px(24) auto 0 auto; background: #fff; box-shadow:0px 2px 6px 0px rgba(0,0,0,0.07); border-radius: px(8); padding: px(60) 0 px(90) 0;
      .tit {width: 100%; text-align: center; font-size: px(40); color: #333; font-weight: bold; margin-bottom: px(50);}
      .a_item {
        margin-left: px(87); display: flex; justify-content:flex-start; align-items:center; height: px(190); margin-bottom: px(30);
        .img {width: px(202); height: px(190);}
        .text_box {
          width: px(300); margin-left: px(60); 
          .title {font-size: px(34); color: #333;}
          .info {font-size: px(28); color: #999; margin-top: px(10);}
        }
      }
    }
    .contact_us {
      width: px(690); height: auto; margin: px(24) auto 0 auto; background: #fff; box-shadow:0px 2px 6px 0px rgba(0,0,0,0.07); border-radius: px(8); overflow: hidden;
      .img {width: 100%;}
      .tell_line {
        width: 100%; height: px(140); background: #E3F4FF; border-top: 1px solid #9BD8FF;
        .title {width: 100%; text-align: center; font-size: px(30); color: #3DB1FA; text-align: center; font-family: 'MicrosoftYaHei'; padding-top: px(20); font-weight: bold;}
        .tell {width: 100%; text-align: center; font-size: px(30); color: #3DB1FA; text-align: center; font-family: 'PingFangSC'; margin-top: px(4);}
      }
    }
  }

</style>
