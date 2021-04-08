<template>
  <div class="aboutSebe">
    <div class="box_wrap">
      <div class="box">
        <h3>立体高效保护机制赋能</h3>
        <p>拾贝独创基于社会共治的立体保护体系，建立与执法部门、电商及社交媒体平台、行业协会、品牌权利人、志愿者多维联动的立体保护机制，能高效快捷提供保护赋能。</p>
      </div>
      <div class="box">
        <h3>前沿区块链技术赋能</h3>
        <p>拾贝首家自主研发的基于国家密码标准体系的区块链技术已全面应用在知识产权确权、存证、公证领域，全面向生态合伙人开放。</p>
      </div>
      <div class="box">
        <h3>人工智能信息化工具赋能</h3>
        <p>一键申报、一键客户管理，轻松优化全业务流程，合伙人全身心无忧开展业务。</p>
      </div>
      <div class="box">
        <h3>产业知识产权运营赋能</h3>
        <p>拾贝独创基于产业知识产权保护、许可、授权、转化运营、产业孵化招商的模式，并正式立项知识产权产业化运营的研究课题。</p>
      </div>
      <div class="box">
        <h3>共享通证商业生态</h3>
        <p>拾贝建立以知识产权为中心，开放透明的收益型、赋能型、学习型共享通证生态平台，生态伙伴成为合伙人，共建秩序，共创市场，共谋发展，共享收益。</p>
      </div>
    </div>
    <div class="box_wrap1">
      <h2>拾贝荣誉</h2>
      <div class="box">
        <p>拾贝是中国产学研合作促进会反侵权假冒创新战略联盟（CAASA）理事长单位; </p><p>拾贝是中国产学研合作促进会知识产权保护中心唯一服务平台; </p><p>拾贝全面承担清华长三角研究院知识产权研究中心相关工作； </p><p>拾贝是阿里巴巴集团创新保唯一合作伙伴和技术支持单位; </p><p>信拾贝是首家接入阿里巴巴集团原创保护平台的区块链公证存证合作服务商。</p>
        <div class="imgs mt30">
          <img src="~assets/img/my/aboutSebe/01.jpg">
          <img src="~assets/img/my/aboutSebe/02.jpg">
        </div>
        <div class="imgs">
          <img src="~assets/img/my/aboutSebe/03.jpg">
          <img src="~assets/img/my/aboutSebe/04.jpg">
        </div>
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
    }
  }
</script>

<style lang='scss'>
  .aboutSebe {
    width: 100%; min-height: 100%; background: #f8f8f8;
    .box_wrap{
      background-color: #fff; padding-top: 40px;padding-bottom: 30px;margin-bottom: 20px;
      .box{
        margin: 0 20px;border-radius:5px;background-color: #F7FAFF;border:1px solid #E2EEFF;margin-bottom: 20px;padding: 20px;
        &:last-child{margin-bottom: 0;}
        h3{height:37px;line-height: 37px;font-size:26px;margin-bottom: 12px;font-weight:600;}
        p{font-size:26px;line-height: 36px;color: #666;}
      }

    }
    .box_wrap1{
      background-color: #fff;padding-top: 30px;padding-bottom: 20px;
      h2{height: 42px;line-height: 42px;font-size:30px;text-align: center;margin-bottom: 30px;font-weight:600;}
      .box{
        margin: 0 20px;border-radius:5px;background-color: #F7FAFF;border:1px solid #E2EEFF;padding: 20px;
        p{font-size:26px;line-height: 36px;color: #666;}
        .imgs{
          margin-top: 20px;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
          img{width: 325px;height: 200px;}
        }
        .mt30{margin-top: 30px;}
      }
    }
  }
</style>
