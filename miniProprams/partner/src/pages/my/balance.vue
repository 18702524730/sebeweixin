<template>
  <div class="balance_page">
    <div class="account_box">
      <img src="~assets/img/my/bankCard.png" class="bg" alt="">
      <div class="title_box row-between">
        <span class="total">可用余额</span>
        <span class="rule" @click="cahsRuleFn"><i class="iconfont icon-yiwen"></i>提现规则</span>
      </div>
      <div class="money_box row-satrt">
        <span class="unit">¥</span>
        <span class="num">{{ bankCardInfo.balance || 0 }}</span>
      </div>
      <div class="m_info row-between">
        <span class="detail" @click="goListFn"><img src="~assets/img/my/money.png" class="money" alt=""><span class="txt">收支明细</span></span>
        <button class="btn_cash" @click="cashToCardFn">提现到银行卡</button>
      </div>
    </div>


    <div class="line_wrap">
      <div class="rule_box row-between">
        <span class="lef">提现记录</span>
        <span class="rig" @click="goDetailFn"><span class="txt">查看更多</span><i class="iconfont icon-jiantou"></i></span>
      </div>
      <div class="line_item" v-for="(item,index) in cashList" :key="index" v-if="index<5 && cashList && cashList.length" @click="cahsDetailFn(item)">
        <div class="lef">
          <p class="title" :class="{'t_green': item.withdrawState==1, 't_red': item.withdrawState==-1}">余额提现  ({{ item.status }})</p>
          <p class="date">{{ item.createDate }}</p>
        </div>
        <div class="rig">
          <p class="num num_black">¥{{ item.amount }}</p>
        </div>
      </div>
      <!-- 没数据 -->
      <div class="null_single" v-if="!cashList || !cashList.length">
        <img class="portrait" src="~assets/img/store/emptyImg.png">
        <div class="txt mb40">暂无提现记录</div>
      </div>
    </div>

    <div class="safe_box row-center">
      <img src="~assets/img/my/safe.png" class="safe" alt="">
      <span class="text">账户资金保障中</span>
    </div>

    <div class="realNameDia" v-if="realNameDiaState">
      <div class="mask">
        <div class="realNameWrap">
          <div class="dia">
            <img src="~assets/img/store/realname.png" />
            <h2>实名认证</h2>
            <p>您还未实名认证，请先进行实名认证！</p>
            <div class="realNameBtn" @click="goRealName">去认证</div>
          </div>
          <div class="canel" @click="closeRealName"><sebe-icon type="close" size="40" /></div>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
  import filter from 'utils/filters';
  export default {
    data () {
      return {
        cashList: [],  //提现记录
        realNameDiaState: false,
        Filters: filter.filters,
        availableBalance: 0,  //可用余额
        bankCardInfo: {},  //银行卡信息
      }
    },
    computed: {
      filterList () {
        this.cashList.forEach( item => {
          item.status = this.Filters.cahsStatu(item.withdrawState, 'yyyy-MM-dd');
          item.createDate = this.Filters.dateFormat(item.createTime, 'yyyy-MM-dd');
        })
      }
    },
    onLoad () {
      let auth = this.$storage.get('auth');
      if (!auth.isAuthentication) {
        this.realNameDiaState = true;
      } else {
        this.realNameDiaState = false;
      }
    },
    methods: {
    // 关闭实名弹框
      closeRealName () {
        this.realNameDiaState = false
      },
      //去实名
      goRealName(){
        this.realNameDiaState = false;
        this.$router.push('/pages/authorize/realName');
      },
      // 查询银行卡信息
      async findBankCardFn () {
        try {
          let resp = await this.API.my.findBankCard();
          this.bankCardInfo = resp;
        }
        catch (e) {}
      },
      // 收支明细
      goListFn () {
        this.$router.push({path: '/pages/my/incomeList'})
      },
      // 提现规则
      cahsRuleFn () {
        this.$router.push({path: '/pages/my/cashRule'})
      },
      // 提现详情
      cahsDetailFn (item) {
        this.$router.push({path: `/pages/my/cashDetail?id=${item.id}&state=${item.withdrawState}`})
      },
      // 查看更多提现详情
      goDetailFn () {
        this.$router.push({path: '/pages/my/cashList'});
      },
      selectTabFn (data) {
        this.activeIndex = data;
      },
      // 提现记录
      async getListFn () {
        try {
          let data = {
            pgIndex: 1,
            pgCount: 10
          }
          let resp = await this.API.my.findWithDrawRecord(data);
          this.cashList = resp.elements;
        }
        catch (e) {}
      },
      // 提现到银行卡
      cashToCardFn () {
        if (!this.$storage.get('auth').isAuthentication) {
          this.realNameDiaState = true;
          return;
        }
        this.$router.push({path: '/pages/my/cashToBank'})
      }
    },
    onShow () {
      this.getListFn();  //查询提现列表
      this.findBankCardFn();  //查询银行好卡信息
      this.availableBalance = this.$route.query.availableBalance || 0;  //可用余额
    }
  }
</script>

<style lang='scss'>
  .balance_page {
    width: 100%; height: 100%; background: #fff; 
    .account_box {
      width: 710px; height: 410px; margin: 0 20px; border-radius:10px; padding: 60px 30px 40px 40px; position: relative;
      .bg {position: absolute; left: 0; top: 0; width: 100%; height: 100%;}
      .title_box {
        position: absolute; left: 30px; top: 50px; width: 640px;
        .total {color: #FCE2A9; font-size: 32px; font-weight: 500; } 
        .rule {
          color: #FFF2DE; font-size: 30px;
          .iconfont {display: inline; color: #FFF2DE; font-size: 34px; margin-right: 6px; vertical-align: middle;}
        }
      }
      .money_box {
        position: absolute; left: 30px; top: 100px; width: 640px;
        .unit {font-size: 38px; color: #fff; font-weight: 500; }
        .num {font-size: 62px; color: #fff; font-weight: 500;}
      }
      .m_info {
        position: absolute; left: 30px; top: 260px; width: 640px;height: 80px;
        .detail {color: #FFF2DE; font-size: 30px;
          .txt {color: #FFF2DE; font-size: 30px; vertical-align: middle;}
          .money {width: 34px ;height: 34px; margin-right: 6px; vertical-align: middle;}
        }
        .btn_cash {width: 330px; height: 80px; line-height: 80px; text-align: center; background: #fff; color: #C3A178; font-size: 32px; font-weight: 500; padding: 0; border:none; box-shadow:0px 9px 12px 0px rgba(212,159,80,1); border-radius: 0; }
      }
    }
    .line_wrap {
      .line_item {
        padding: 30px 0; align-items: flex-start;
        .rig {line-height: 40px;}
      }
      .refund {
        .num {color: #333;}
      }
      .rule_box {
        height: 88px; line-height: 88px; border-bottom:1px solid #eee; margin-left: 20px; padding-right: 20px;
        .lef {font-size: 32px;}
        .rig {
          .txt {color: #999; vertical-align: middle; }
          .iconfont { color: #999; vertical-align: middle; display: inline-block; font-size: 24px; margin-left: 10px; color: #ddd; }
        }
      }
    }  
    .null_single {padding-top: 40px; margin-bottom: 120px;}
    .safe_box {
      width: 100%; text-align: center; padding: 30px 0; background:#fff;
      .safe {width: 34px ;height: 38px; margin-right: 12px;}
      .text {color: #bbb; font-size: 28px;}
    }
  .realNameDia {
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      overflow: hidden;
      z-index: 9000;
      color: #fff;
    }
    .realNameWrap {
      position: absolute;
      top: 50%;
      left: 50%;
      right: 0;
      margin-left: -260px;
      height: auto;
      transform: translateY(-50%);
      z-index: 12000;

      .dia {
        background: #fff;
        width: 520px;
        height: 585px;
        border-radius: 12px;
        margin-bottom: 60px;
        text-align: center;
        padding: 56px 70px 0;
        > img {
          width: 285px;
          height: 184px;
        }
        h2 {
          font-size: 34px;
          line-height: 48px;
          font-weight: 600;
          color: #333;
          padding-top: 20px;
        }
        p {
          font-size: 28px;
          color: #999;
          line-height: 40px;
          padding: 20px 0 30px;
        }
        .realNameBtn {
          height: 84px;
          line-height: 84px;
          background: #2f80f6;
          border-radius: 42px;
          font-size: 32px;
          color: #fff;
        }
      }
      .canel {
        width: 98px;
        height: 98px;
        border-radius: 49px;
        background: #fff;
        margin-left: 210px;
        text-align: center;
        line-height: 90px;
        position: relative;
        &:after {
          position: absolute;
          top: -60px;
          left: 48px;
          height: 60px;
          width: 1px;
          border-left:1px dashed #eee;
          content: "";
        }
      }
    }
  }
  }
</style>
