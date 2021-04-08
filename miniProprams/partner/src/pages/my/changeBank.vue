<template>
  <div class="change_bank_page">
    <div class="p_info row-between">
      <span class="lef">{{bankCardInfo.memberCreateType == 2 ? '机构名称' : '真实姓名'}}</span>
      <span class="rig">{{ bankCardInfo.name }}</span>
    </div>

    <div class="input_wrap">
      <div class="input_item row-start">
        <span class="lef_key">银行卡号</span>
        <input type="text" class="rig_value" maxlength="21" v-model="bankCardInfo.bankCardNo" placeholder="请输入银行卡号"  />
      </div>
      <div class="input_item row-start">
        <span class="lef_key">开户支行</span>
        <input type="text" class="rig_value" maxlength="20" v-model="bankCardInfo.bankCardAddress" :placeholder="bankCardInfo.memberCreateType == 2 ? '例：XX银行XX市分行XX支行' : '请输入开户支行'"  />
      </div>
      <div class="input_item row-start" v-if="bankCardInfo.memberCreateType != 2">
        <span class="lef_key">预留手机号</span>
        <input type="text" class="rig_value" v-model="bankCardInfo.phone" maxlength="11" placeholder="请输入手机号码"  />
      </div>
      <div class="input_item code_item row-start" v-if="bankCardInfo.memberCreateType != 2">
        <span class="lef_key">验证码</span>
        <input type="text" class="rig_value input_code" maxlength="6" v-model="bankCardInfo.verifyCode" placeholder="请输入验证码"  />
        <v-code :start="start" :second="second" @startTap="startTap" ></v-code>
      </div>
    </div>

    <button type="promary" class="btn_submit" @click="updateBankInfoFn">确定</button>

    <!-- 消息 -->
    <u-message  />

  </div>
</template>

<script>
  import vCode from 'components/weui/vcode';
  import Utils from 'utils/utils'
  export default {
    components: {
      vCode
    },
    data () {
      return {
        bankCardInfo: {},  //银行卡信息
        start:false,  //开始倒计时
        second: 60,  //秒数
        validator: Utils.validator,
      }
    },
    methods: {
      // 获取验证码
      async startTap () {
        if (!this.validator.isMobile(this.bankCardInfo.phone)) {
          this.tips('请输入格式正确的手机号码！')
        }
        else{
          await this.API.interfaces.authCode(this.bankCardInfo.phone);
          this.start = !this.start;
        }
      },
      // 查询银行卡信息
      async findBankCardFn () {
        try {
          let resp = await this.API.my.findBankCard();
          this.bankCardInfo = resp;
        }
        catch (e) {}
      },
      // 提交
      async updateBankInfoFn () {
        if (!this.bankCardInfo.bankCardNo) {
          this.tips('请输入银行卡号')
          return
        }
        if (!/^[1-9]\d{15,20}$/.test(this.bankCardInfo.bankCardNo)) {
          this.tips('请输入正确的银行卡号')
          return
        }
        if (!this.bankCardInfo.bankCardAddress) {
          this.tips('请输入开户支行')
          return
        }
        if (this.bankCardInfo.memberCreateType != 2) {
          if (!this.bankCardInfo.phone) {
            this.tips('请输入预留手机号')
            return
          }
          if (!this.validator.isMobile(this.bankCardInfo.phone)) {
            this.tips('请输入格式正确的手机号码！')
            return
          }
          if (!this.bankCardInfo.verifyCode) {
            this.tips('请输入验证码')
            return
          }
          if (!/^\d{6}$/.test(this.bankCardInfo.verifyCode)) {
            this.tips('请输入六位数字验证码')
            return
          }          
        }

        try {
          let resp = await this.API.my.newChangeBandCard(this.bankCardInfo);
          this.$router.go(-1);
        }
        catch (e) {}
      }
    },
    onShow () {
      this.findBankCardFn();
    }
  }
</script>

<style lang='scss'>
  .change_bank_page {
    width: 100%; padding-top: 20px; background: #f8f8f8; 
    .p_info {
      padding: 0 20px; background: #fff; height: 90px; line-height: 90px; margin-bottom: 20px;
      .lef {font-size: 30px; color: #333;}
      .rig {font-size: 28px; color: #999;}
    }
    .info_content {
      width: 100%; background: #fff; margin-top: 20px;
    }
    .btn_submit {position: fixed; bottom: 0; left: 0; width: 100%; height: 96px; line-height: 96px; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); color: #fff; font-size: 32px; padding: 0; border-radius: 0; }
    .input_wrap {
      width: 100%; background: #fff;
      .input_item {
        padding-left: 20px; height: 90px; line-height: 90px; border-bottom:1px solid #eee; 
        .lef_key {width: 200px; font-size: 30px; color: #333; text-align: left; display: inline-block; }
        .rig_value {width: 500px; text-align: left; font-size: 30px;}
      }
      .code_item {
        position: relative;
        .input_code {width: 300px; }
      }
    }
  }
</style>
