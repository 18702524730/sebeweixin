<template>
  <div class="cash_to_bank_page">
    <div class="bank_info row-between" @click="changeCardFn">
      <p class="lef">
        到账银行卡 <span v-if="bankCardInfo.bankCardNoSuffix">{{ bankCardInfo.hideName }}（{{ bankCardInfo.bankCardNoSuffix }}）</span>
      </p>
      <span class="rig"><span class="placeholder" v-if="!bankCardInfo.bankCardNoSuffix">请填写银行卡信息</span><i class="iconfont icon-jiantou"></i></span>
    </div>
    <div class="cash_wrap">
      <div class="cah_num">
        <p class="tit">提现金额</p>
        <div class="input_wrap row-start">
          <span class="unit">¥</span>
          <input type="digit" class="num" v-model="number" >
        </div>
        <p class="tip">
          <span v-if="!number">可用余额{{ bankCardInfo.balance }}元</span>
          <span v-if="number">个人所得税扣除{{ taxNum }}元</span>   
          <span class="all" @click="cahAllFn">全部提现</span>
        </p>
      </div>
      <button type="primary" class="btn_cash" :class="{'btn_submit': number}" @click="cashSubmitFn">提现</button>
    </div>

    <!-- 消息 -->
    <u-message  />


  </div>
</template>

<script>

  export default {
    data () {
      return {
        submit: false,  //可以提交
        bankCardInfo: {},  //银行卡信息
        number: '',
        taxNum: 0, //个人所得税
      }
    },
    methods: {
      inputFn (e) {
        let v1 = e.mp.detail.value;
        if (v1) {
          this.number = parseFloat(v1).toFixed(2);
        }
      },
      // 体现全部
      cahAllFn () {
        this.number = this.bankCardInfo.balance;
        this.findPersonalTaxFn();
      },
      // 查询银行卡信息
      async findBankCardFn () {
        try {
          let resp = await this.API.my.findBankCard();
          if (resp.nameHide.length > 10) {
            resp.hideName = resp.nameHide.slice(0, 10) + '...'
          } else {
            resp.hideName = resp.nameHide
          }
          this.bankCardInfo = resp;
        }
        catch (e) {}
      },
      // 查询个人所得税
      async findPersonalTaxFn () {
        try {
          let resp = await this.API.my.findPersonalTax({withdrawAmount: this.number});
          this.taxNum = resp.personalTax;
        }
        catch (e) {}
      },
      // 改变银行卡
      changeCardFn () {
        this.$router.push({path: '/pages/my/changeBank'})
      },
      // 提现
      async cashSubmitFn () {
        if (!this.number) {
          this.tips('请输入提现金额')
          return
        }
        if (this.number < 50) {
          this.tips('最低提现金额50元')
          return
        }
        if (!this.bankCardInfo.bankCardNo) {
          this.tips('请完善银行卡信息')
          return
        }
        if (this.bankCardInfo.memberCreateType == 1 && !this.bankCardInfo.phone) {
          this.tips('请完善银行卡预留手机号')
          return
        }
        if (!this.bankCardInfo.bankCardAddress) {
          this.tips('请完善开户行地址信息')
          return
        }
        // if (this.number > this.bankCardInfo.balance) {
        //   this.tips('提现金额不能大于可用余额')
        //   return
        // }
        try {
          let data = {
            amount: this.number,
            bankCardNo: this.bankCardInfo.bankCardNo,
            bankCardAddress: this.bankCardInfo.bankCardAddress
          }
          let resp = await this.API.my.withDraw(data);
          this.$router.go(-1);
        }
        catch (e) {}
      }
    },
    onShow () {
      this.number = '';
      this.findBankCardFn();  //查询银行卡信息
    },
    watch: {
      number () {
        setTimeout( () => {
          this.findPersonalTaxFn();
        }, 500)
      }
    }
  }
</script>

<style lang='scss'>
  .cash_to_bank_page {
    width: 100%; height: 100%; background: #f8f8f8;
    .bank_info {
      width: 100%; height: 100px; line-height:100px; background: #F8F8F8; border:1px solid #E9E9E9;
      .lef {padding-left: 30px; font-size: 30px; color: #333; }
      .rig {
        padding-right: 20px;
        .iconfont {font-size: 26px; color: #ddd;}
        .placeholder {font-size:28px; color:#ccc;}
      }
    }
    .cash_wrap {
      padding: 40px 0; height: auto; background: #fff;
      .cah_num {
        width: 100%;
        .tit {font-size: 32px; color: #333; text-align: left; padding: 0 30px; font-weight:500; }
        .input_wrap {
          margin: 30px 20px 0 20px; padding-left: 30px; height: 120px; border-bottom:1px solid #C4C4C4;
          .unit {font-size: 64px; font-weight: bold; color: #333;}
          .num {padding-left: 30px; height: 120px; line-height: 120px; width: 600px; font-size: 68px; text-align: left; font-weight:600; color: #333; }
        }
        .tip {
          padding: 30px; font-size: 28px; color: #999;
          .all {color: #628BC5; margin-left: 16px;}
        }
      }
      .btn_cash {margin: 0 20px 45px 20px; width: 710px; padding: 0; height: 90px; line-height: 90px; background: #A5CAFF; border-radius:10px; font-size: 32px; color: #CBE0FF; text-align: center; }
      .btn_submit {background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); color: #fff;}
    }
    .describe {margin: 30px auto; font-size: 32px; color: #2F80F6; text-align: center; }
  }
</style>
