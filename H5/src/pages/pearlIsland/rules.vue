<template>
  <div class="rulesWrap">
    <div class="pearlTotal">
      <p>获得珍珠有2种途径：</p>
      <p class="ml10 mt10">1.日常点击领取,珍珠获得规则与所持创力正相关</p>
      <p class="mt10 ml10">2.根据用户对生态的贡献,系统自动发放珍珠,发放规则如下:</p>
    </div>
    <h2>合伙人</h2>
    <!-- <p class="rulesDes">创世数量( 当剩余珍珠数量大于等于5亿 )明细表</p> -->
    <div class="parterTable">
      <table>
        <thead>
          <tr><td style="font-weight:bold;">行为</td><td style="font-weight:bold;">奖励珍珠数量</td></tr>
        </thead>
        <tbody>
          <tr><td>注册</td><td>20</td></tr>
          <tr><td>邀请他人成功注册</td><td>10</td></tr>
          <tr><td>邀请他人成功开店</td><td>30</td></tr>
          <tr><td>成功开店</td><td>50</td></tr>
          <tr><td>订单成交（服务验收）</td><td>订单金额*0.1*(0.5~1.5随机数) </td></tr>
          <tr><td>完成服务</td><td>平台利润金额*0.5</td></tr>
        </tbody>
      </table>
    </div>
    <h2>创新主体</h2>
    <div class="parterTable">
      <table>
        <thead>
          <tr><td style="font-weight:bold;">行为</td><td style="font-weight:bold;">奖励珍珠数量</td></tr>
        </thead>
        <tbody>
          <tr><td>注册</td><td>20</td></tr>
          <tr><td>订单成交（服务验收）</td><td>订单金额*0.1*(0.5~1.5随机数) </td></tr>
        </tbody>
      </table>
    </div>
    <ul class="explain">
      <li>注:</li>
      <li class="ml20 mt10">• 以上为创世数量(当剩余珍珠数量大于等于5亿)明细表,当剩余数</li>
      <li class="ml35">量减半时，对应发放数量同步减半;</li>
      <li class="ml20 mt10">• 随机数均保留两位小数；</li>
      <li class="ml20 mt10">• 涉及金额单位均为元;</li>
      <li class="ml20 mt10">• 平台将根据运营需要合理增加或调整部分奖励行为节点。</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="scss">
html,body, #app{min-height: 100%;background: #fff;}
.rulesWrap{
  .pearlTotal{background: #f8f8f8;font-size: 24px;color: #999;padding: 30px 35px 30px 20px;
    p{font-size:26px;color:#333;line-height:37px;}
  }
  >h2{font-size: 30px;line-height: 42px;color: #333;text-align: center;padding-top: 30px;padding-bottom: 30px;}
  >.rulesDes{font-size: 24px;line-height: 34px;color: #aaa;text-align: center;padding-bottom: 20px;}
  .parterTable{padding: 0 30px;background: #f8f8f8;}
  table{text-align: center;font-size: 24px;line-height: 70px;width: 100%;padding: 0 30px;
    thead{color: #4C7EDB;
      tr{
        td{border-bottom: 1px solid #eee;
          &:first-child{border-right: 1px solid #eee;}
        }
      }
    }
    tbody{
      tr{
        td{border-bottom: 1px solid #eee;width: 344px;
          &:first-child{border-right: 1px solid #eee;}
        }
        &:last-child{
          td{
            border-bottom: none;
          }
        }
      }
    }
  }
  .explain{
    padding: 30px 0 70px 40px;color: #999;font-size: 22px;line-height: 34px;
  }
}
 
</style>
