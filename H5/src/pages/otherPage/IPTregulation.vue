<template>
  <div class="IPT_reg">
    <p class="reg_title">珍珠总量共10亿，初期按照一定创世数量对生态用户的流量及效益贡献进行奖励。每当剩余总量减半，相应的发放数量也将减半。 </p>
    <div class="reg_info">
      <p class="info_tit mb35">创世数量（ 当剩余珍珠数量大于等于5亿 ）明细表 </p>
      <div class="info_list">
        <div class="list_image">
          <img src="~assets/img/pearlIsland/pp.png" alt="">
          <p class="mt10">合伙人</p>
        </div>
        <div class="list_text">
          <div class="list_l">
            <p class="first">行为</p>
            <p>注册</p>
            <p>邀请他人成功注册</p>
            <p>邀请他人成功开店</p>
            <p>成功开店</p>
            <p class="max_text">订单成交（服务验收）</p>
            <p class="maxH_text">完成服务</p>
          </div>
          <div>
            <p class="first">奖励珍珠数量</p>
            <p>20</p>
            <p>10</p>
            <p>30</p>
            <p>50</p>
            <p class="max_text">订单金额 * 0.1* （0.5~1.5随机数）</p>
            <p class="max_text">服务金额 * 0.1* （0.5~1.5随机数）</p>
          </div>
        </div>
      </div>


      <div class="info_list mt40">
        <div class="list_image list_image_padding">
          <img src="~assets/img/pearlIsland/apply.png" alt="">
          <p>创新主体</p>
        </div>
        <div class="list_text">
          <div class="list_l">
            <p class="first">行为</p>
            <p class="maxH">注册</p>
            <p class="maxH">订单成交（服务验收）</p>
          </div>
          <div>
            <p class="first">奖励珍珠数量</p>
            <p class="maxH">20</p>
            <p class="maxH">订单金额 * 0.1* （0.5~1.5随机数） </p>
          </div>
        </div>
      </div>
      <p class="info_footer mt30">说明</p>
      <p class="info_footer">• 平台将根据运营需要合理增加或调整部分奖励行为节点</p>
      <p class="info_footer">• 涉及金额单位均为元，随机数均取两位小数</p>
    </div>
  </div>
</template> 

<script>
  import Filters from 'src/utils/filters.js';

  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
    },
    filters: {
    }
  }
</script>

<style lang='scss'>
html,body,#app{height:100%;background-color:#fff;}
.IPT_reg{width:100%;height:100%;
  .reg_title{font-size:24px;color:#999;line-height:35px;padding:30px 20px;background-color:#f8f8f8;}
  .reg_info{width:100%;background-color:#fff;padding:35px;
    .info_tit{font-size:24px;color:#999;line-height:35px;text-align:center;}
    .info_list{border-top:1px solid #eee;display: flex;
      .list_image{padding:70px 15px 100px;border-right:1px solid #eee;border-bottom:1px solid #eee;width:230px;
        img{width:196px;height:284px;}
        p{font-size:32px;height:#666;text-align:center;line-height:45px;}
      }
      div.list_image_padding{padding:15px 0px 0px;
        img{width:217px;height:214px;}
      }
      .list_text{width:450px;display: flex;
        .list_l{width:225px;border-right:1px solid #eee;}
        div{
          p{width:225px;text-align:center;line-height:70px;border-bottom:1px solid #eee;font-size:24px;color:#666;}
          .first{color:#4C7EDB;}
          .max_text{line-height:33px;text-align:left;height:90px;padding:12px 0 12px 12px;}
          .maxH_text{padding:28px 0;line-height:33px;}
          p.maxH{padding:33px 0;line-height:33px;}
        }
      }
    }
    .info_footer{font-size:24px;color:#999;line-height:33px;}
  }
}
</style>
