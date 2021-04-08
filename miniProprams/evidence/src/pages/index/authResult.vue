<template>
  <div :class="['resultWrap', authStatus !=3 ? '' : 'successWrap']">
    <div class="result" v-if="authStatus !=3">
      <img src="~assets/img/index/error.png" v-if="authStatus==4" alt="">
      <img src="~assets/img/index/success.png" v-if="authStatus!=4" alt="">
      <h2>{{ authStatus == 4 ? '您的审核未通过' : '实名认证申请已提交' }}</h2>
      <p>{{ authStatus == 4 ? '请您核对并修改填写资料后重新提交' : '审核时间预计为1~2个工作日，不含法定节假日' }}</p>
      <div class="submitBtn" v-if="authStatus == -1">修改信息</div>
    </div>
    <div class="success" v-if="authStatus == 3">
    <!-- <div class="success"> -->
      <p>尊贵的会员您好，我们已于{{payDate}}汇款到您的对公账号，请将银行支付业务收款回单上的“汇款金额及验证码”准确的填写在指定位置。</p>
      <div class="inputGroup">
        <div class="inputDes">汇款金额</div>
        <input type="text" v-model="orderAmount" placeholder="请输入银行支付业务收款回单上的汇款金额">
      </div>
      <div class="inputGroup">
        <div class="inputDes">验证码</div>
        <input type="text" :maxlength="6" v-model="validCode" placeholder="请输入银行支付业务收款回单附言栏上的验证码">
      </div>
      <div class="confirmBtn" @click="verifyCompanyAuth">提交认证</div>
    </div>
    <div class="imessage" :class="[messageObj.status ? 'showMsg' : '', messageObj.type === 'success' ? 'successMsg' : '']">
      {{ messageObj.content }}
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data () {
    return {
      authStatus: 1, // 实名认证状态 0 || '': 已提交，1：认证通过，2：已提交审核 3：审核通过待打款 4：审核失败
      validCode: '',
      orderAmount: '',
      messageObj: {
        status: false,
        content: '',
        type: 'error'
      },
      payDate: ''
    }
  },
  computed: {
    ...mapState('auth', ['authInfo'])
  },
  components: {

  },
  mounted(){
    this.init();
  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  watch: {
    messageObj: {
      handler (newVal, oldVal) {
        if (newVal.status) {
          setTimeout(() => {
            this.messageObj.status = false;
          }, 1500)
        }
      },
      deep: true
    }
  },
  methods: {
    init () {
      console.log('info', this.authInfo)
      this.validCode = '';
      this.orderAmount = '';
      this.authStatus = this.authInfo.is_checked; // 认证状态
      if (this.authInfo.paymentTime) {
        this.payDate = this.dateFormat(this.authInfo.paymentTime);
      }
    },
    // 企业打款金额验证 apply_subject_id url传过来
    async verifyCompanyAuth () {
      console.log('1data', this.authInfo.apply_id, this.validCode, this.orderAmount)
      if (!this.orderAmount) {
        this.messageObj = { content: '请输入汇款金额', type: 'error', status: true };
        return;
      }
      if (!this.validCode) {
        this.messageObj = { content: '请输入验证码', type: 'error', status: true };
        return;
      }
      try{
        console.log('data', this.authInfo.apply_id, this.validCode, this.orderAmount)
        let data = await this.API.homePage.verifyCompanyAuth({
          apply_subject_id: this.authInfo.apply_id, 
          validCode: this.validCode,
          orderAmount: this.orderAmount
        });
        if (data.code == 200) {
          let query = this.$root.$mp.query;
          this.messageObj = { content: '验证成功', type: 'success', status: true };
          setTimeout(() => {
            this.$router.replace({path: query.go || '/pages/index/applicantList', query}); // 返回列表页
          }, 1000)
        } else {
          this.messageObj = { content: data.desc, type: 'error', status: true };
        }
      } catch (err) {
        this.messageObj = { content: err.data.desc, type: 'error', status: true };
      }
      
    },
      //日期格式转换
    dateFormat (input) {
        var _date = new Date(input);
        var year = _date.getFullYear();
        var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
        var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
        var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
        var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
        var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
        return year + "年" + month + "月" + day + '日';
    },
  }
}
</script>

<style lang="scss">
.resultWrap{background: #f8f8f8;text-align: center;padding-top: 100px;height: 100%;
  &.successWrap{padding: 0;background: #fff;}
  .result{
    >img{width: 200px;height: 200px;}
    >h2{font-size: 40px;color: #000;font-weight: 600;line-height: 80px;padding-top: 30px;}
    >p{font-size: 28px;color: #888;line-height: 72px;padding-bottom: 46px;}
    .submitBtn{line-height: 88px;border-radius: 10px;color: #fff;background: #29aefa;font-size: 32px;margin: 0 30px;}  
  }
  .success{text-align: left;background: #fff;
    >p{font-size: 28px;color: #909090;padding: 30px;background: #f8f8f8;}
    .inputGroup{padding-top: 20px;margin: 0 30px;
      .inputDes{line-height: 70px;font-size: 30px;color: #333;}
      >input{line-height: 66px;color: #909090;font-size: 28px;background: #f8f8f8;height: 66px;border-radius: 4px;padding-left: 15px;}
    }
    .confirmBtn{width: 100%;line-height: 98px;background: #29aefa;text-align: center;color: #fff;font-size: 32px;height: 98px;
      position: fixed;left: 0;bottom: 0;
    }
  }
  .imessage{
      display:none;width:750px;min-height:64px;line-height:2.3;position:fixed;top:0;left:0;right: 0;color:#fff;text-align:center;font-size:28px;z-index:10100;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background:#ed3f14;height: 64px;
      opacity: 0;transition: all 0.3s;
    }
  .showMsg{opacity: 1;display: block;}
  .successMsg{background: #19be6b;}
}
 
</style>
