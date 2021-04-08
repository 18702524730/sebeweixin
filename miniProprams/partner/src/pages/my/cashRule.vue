<template>
  <div class="cash_rule">
    <div class="item_wrap">
      <div class="title">提现规则</div>
      <div class="p_con ">1.1合伙人完成承接的案件在客户验收通过后，拾贝平台将按照计提标准所述分润制度，自动核算合伙人应得收入，并将应得收入存入该合伙人在平台的账户中。</div>
      <div class="p_con">1.2合伙人每月1-20日可以对平台账户中的收益申请提现。 </div>
      <div class="p_con red">1.3提现最低金额为50元/笔</div>
      <div class="p_con">1.4如单月申请多笔提现，按照累计提现金额一次性计算个人所得税</div>
    </div>

    <div class="item_wrap">
      <div class="title">结算规则 </div>
      <div class="p_con">2.1拾贝平台将在每月20号之后核实申请金额后将相应款项转汇至合伙人账户绑定的银行账户中</div>
      <div class="p_con">2.2合伙人提现实际到账金额为申请提现金额-个人所得税</div>
    </div>

    <div class="item_wrap item_wrap_last">
      <div class="title">计算公式 </div>
      <div class="p_con p_gray">根据《个人所得税法实施条例》规定，劳动报酬所得，稿酬所得，特许权使用费所得、财产租赁所得适用：每次收入不超过4000的，减除费用800元；4000元以上的，减除20%的费用，然后就其余额按比例税率20%征收。</div>

      <div class="p b_20 ">计算公式:</div>
      <div class="p p_gray rule">每次收入<span class="b">不足4000元的：应纳税额=应纳税所得额*使用税率 =（每次收入额-800）*20%</span></div>

      <div class="p p_gray rule">每次收入<span class="b">超过4000元的：应纳税额=应纳税所得额*使用税率 = 每次收入额*（1-20%）*20%</span></div>
    </div>

    <div class="item_wrap item_wrap_table">
      <div class="p b_20 p_0 b al_cen">其中劳务报酬所得应税部分超过20000元的，按照如下方式加征：</div>
      <div class="table_head row-between">
        <span class="lef">级距</span>
        <span class="cen">劳务报酬所得应税部分</span>
        <span class="rig">税率</span>
      </div>
      <div class="table_body row-between">
        <span class="lef">01</span>
        <span class="cen">不超过20,000部分</span>
        <span class="rig">20%</span>
      </div>
      <div class="table_body row-between">
        <span class="lef">02</span>
        <span class="cen">不超过20,000-50,000部分</span>
        <span class="rig">30%</span>
      </div>
      <div class="table_body row-between">
        <span class="lef">03</span>
        <span class="cen">超过50,000部分</span>
        <span class="rig">40%</span>
      </div>
    </div>




  </div>
</template>

<script>

  export default {
    components: {
    },
    data () {
      return {

      }
    },
    methods: {
      // 个人资料
      personDetailFn () {
        this.$router.push({path: '/pages/my/personalInfo'})
      }
    }
  }
</script>

<style lang='scss'>
  .cash_rule {
    padding: 20px; background: #fff; padding-bottom: 100px;
    .item_wrap {
      width: 100%; padding: 24px 20px 30px 20px; margin-bottom: 30px; background: #F8F8F8;
      .title {text-align: left; width: 100%; height: 50px; line-height: 50px; font-size: 30px; margin-bottom: 24px; font-weight: bolder; color: #333; font-weight: 500; }
      .p_con {font-size: 24px; color: #333; margin-bottom: 20px; }
      .p {font-size: 24px; color: #333; width: 100%; font-weight: 500; display: block;}
      .p_gray {color: #999;}
      .table_head {padding: 0 30px; height: 70px; line-height: 70px; font-size: 24px; background: #eee; text-align: center;}
      .table_body {
        padding: 0 30px; height: 90px; line-height: 90px; font-size: 24px; border-bottom:1px solid #eee; text-align: center;
        &:last-child {border-bottom: none;}
      }
      .b_20 {margin-bottom: 20px;}
      .b_40 {margin-bottom: 40px;}
      .ml_20 {margin-left: 20px;}
      .ml_1 {margin-left: 40px;}
      .ml_2 {margin-left: 80px;}
      .p_0 {padding: 0;}
      .red {color: #F64744; font-weight: 500;}
      .rule {
        text-align: right; padding-bottom: 40px; width: 636px;
      }
      .b {font-weight: bolder; color: #333;}
      .al_cen {text-align: center;}
    }
    .item_wrap_last {margin-bottom: 0; padding-bottom:0;}
    .item_wrap_table {padding: 0;}
  }
</style>
