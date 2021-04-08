<template>
  <div class="cash_detail_page">
    <div class="cash_status column-center" v-if="status==0">
      <p class="title row-center">
        <img src="~assets/img/my/pending.png" class="img" alt="">
        <span class="text">审核中</span>
      </p>
    </div>
    <div class="cash_status column-center" v-if="status==1">
      <p class="title row-center">
        <img src="~assets/img/my/success.png" class="img" alt="">
        <span class="text success">审核通过</span>
      </p>
    </div>
    <div class="cash_status column-center" v-if="status==-1">
      <p class="title row-center">
        <img src="~assets/img/my/fail.png" class="img" alt="">
        <span class="text fail">审核失败</span>
      </p>
      <p class="info">失败原因：<span v-if="repObj.failReason">{{ repObj.failReason }}</span></p>
    </div>

    <div class="cash_detail_list">
      <div class="item row-between">
        <span class="key">申请提现金额</span>
        <span class="value">¥{{ repObj.amount }}</span>
      </div>
      <div class="item row-between">
        <span class="key">个税代扣</span>
        <span class="value">¥{{ repObj.personalTax }}</span>
      </div>
      <div class="item row-between">
        <span class="key">实际到账金额</span>
        <span class="value">¥{{ repObj.realAmount }}</span>
      </div>
      <div class="item row-between">
        <span class="key">申请提现时间</span>
        <span class="value">{{ repObj.createTime }}</span>
      </div>
      <div class="item row-between" v-if="status!=0">
        <span class="key">审核时间</span>
        <span class="value">{{ repObj.auditTime }}</span>
      </div>
      <div class="item row-between">
        <span class="key">提现方式</span>
        <span class="value">{{ repObj.withdrawType }}</span>
      </div>
      <div class="item row-between">
        <span class="key">提现人姓名</span>
        <span class="value">{{ repObj.nameHide }}</span>
      </div>
      <div class="item row-between">
        <span class="key">提现银行卡</span>
        <span class="value">{{ repObj.bankCardHide }}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
  import filter from 'utils/filters';
  export default {
    data () {
      return {
        status: 1,  //0.审核中 1.审核成功 -1.审核失败
        repObj: {},  //提现信息
        Filters: filter.filters,
      }
    },
    methods: {
      // 提现记录
      async getDetailFn (id) {
        try {
          let resp = await this.API.my.findWithDrawDetail(id);
          this.repObj = resp;
          this.repObj.withdrawType = this.Filters.cahsType(this.repObj.withdrawType);
          this.repObj.createTime = this.Filters.dateFormat(this.repObj.createTime, 'yyyy-MM-dd');
          this.repObj.auditTime = this.Filters.dateFormat(this.repObj.auditTime, 'yyyy-MM-dd');
          // this.repObj.nameHide = '*' + this.repObj.nameHide.slice(1);
          // this.repObj.bankCardHide = Filters.strToStar(this.repObj.bankCardHide);
        }
        catch (e) {}
      },
    },
    onShow () {
      console.log(this.$route.query);
      let id_ = this.$route.query.id;
      let state_ = this.$route.query.state;
      this.status = state_;
      this.getDetailFn(id_);
    }
  }
</script>

<style lang='scss'>
  .cash_detail_page {
    width: 100%; height: 100%; background: #f8f8f8; 
    .cash_status {
      width: 100%; min-height: 140px; text-align: center; padding: 28px 0;
      .title {
        .img {width: 38px; height: 38px; margin-right: 10px;}
        .text { font-size: 36px;  font-weight: 500; color: #333;}
        .fail {color: #F64744;}
        .success {color: #1EB62D;}
      }
      .info {color: #999; font-size: 26px; text-align: center; padding: 0 20px; }
    }
    .cash_detail_list {
      width: 100%; background: #fff; padding-left: 20px;
      .item {
        padding-right: 20px; height: 90px; line-height: 90px; border-bottom:1px solid #eee;
        .key {font-size: 30px; color: #999; text-align: left;}
        .value {font-size: 28px; color: #333; text-align: right;}
      }
    }
  }
</style>
