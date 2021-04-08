<template>
<div class="safeguard mt20">
  <div class="safeguard_case">
    <p class="case_tit">
      电商知识产权诚信投诉通道
    </p>
    <div class="case_info">
      <p class="info_tit mt25 mb25">快速解决店铺被侵权的困扰</p>
      <!-- <p class="info_txt mt10 mb25">帮助电商商家解决店铺被侵权或被投诉的应对及处理</p> -->
    </div>
    <div class="case_images">
      <div class="image_list">
        <div>
          <img src="../../../assets/img/outpatient/trade.png" alt="">
          <p class="mt20">商标、名称屡被滥用</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/appearance.png" alt="">
          <p class="mt20">产品外观总被抄袭</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/evidence.png" alt="">
          <p class="mt20">遭遇申诉证据造假</p>
        </div>
      </div>
      <div class="image_list bdl">
        <div>
          <img src="../../../assets/img/outpatient/original.png" alt="">
          <p class="mt20">原创图片常被盗用</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/fake.png" alt="">
          <p class="mt20">仿货假货源源不断</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/complain.png" alt="">
          <p class="mt20">顽固店铺投诉无效</p>
        </div>
      </div>
    </div>
    <!-- 可缩放部分 -->
    <div class="case_info" :class="{'more_zoom':commerceBol}">
      <p class="info_tit mt25 mb25">电商维权案例</p>
      <div class="case_list">
        <p class="case_name">“施华蔻”侵权打击</p>
        <p class="case_data mt20">拾贝受汉高集团委托，代理施华蔻品牌在中国互联网上的知识产权保护工作，拾贝通过大数据监测工具，对于电商网站、社交网站等互联网平台上的售假、侵权问题进行实时监测，并对涉嫌侵权商品进行专业判断，进而通过与各个平台合作，制止侵权行为，保护权利人合法权益。</p>
      </div>
      <div class="case_list mt20">
        <p class="case_name">“宝拉珍选”京东维权</p>
        <p class="case_data mt20">美国宝拉珍选旗下某商标在中国被恶意抢注，并在京东平台被恶意投诉，要求商品下架。针对商标恶意抢注人反过来攻击实质权利人的现象，拾贝借助与京东的快速维权绿色通道，以联盟的名义为实质权利人做信用背书，确保实质权利人产品无需立即下架，从而为实质权利人争取到宝贵的维权时间，并最终赢得维权诉讼，确保产品未被下架，避免了上千万的损失。</p>
      </div>
      <p class="zoom mt15" v-if="!commerceBol" @click="commerceBol = true">点击收起<i class="icon ml5 iconfont icon-xiaochengxu-"></i></p>
      <p class="zoom mt15 zoom_unfold" v-if="commerceBol" @click="commerceBol = false">点击展开全部<i class="icon ml5 iconfont icon-xiaochengxu-3"></i></p>
    </div>
  </div>
  <div class="safeguard_case mt20">
    <p class="case_tit">
      海关知识产权保护通道
    </p>
    <div class="case_info">
      <p class="info_tit mt25 mb25">海关知识产权保护</p>
      <!-- <p class="info_txt mt10 mb25">协助企业进行海关知识产权备案，处置国内国际海关知识产权侵权、维权案件，联动海关开展专项打假行动</p> -->
    </div>
    <div class="case_images">
      <div class="image_list">
        <div>
          <img src="../../../assets/img/outpatient/Customs.png" alt="">
          <p class="mt20">海关知识产权备案</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/knotty.png" alt="">
          <p class="mt20">国际海关疑难处理</p>
        </div>
      </div>
      <div class="image_list bdl">
        <div>
          <img src="../../../assets/img/outpatient/withhold.png" alt="">
          <p class="mt20">嫌疑侵权货物扣留申请</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/counterfeit.png" alt="">
          <p class="mt20">海关专项打假项目参与</p>
        </div>
      </div>
    </div>
    <!-- 可缩放部分 -->
    <div class="case_info" :class="{'zoom_more':CustomsBol}">
      <p class="info_tit mt25 mb25">海关《龙腾行动》</p>
      <div class="case_list mt20">
        <p class="case_data">《龙腾行动》2017年9月至11月，海关总署在全国范围内，组织开展了针对出口知识产权优势企业的知识产权保护专项行动，代号“龙腾”。国海关共计启动知识产权保护措施872次，扣留侵权货物并立案调查253起，其中涉及“龙腾”保护重点企业案件 119起，涉及货物数量 107万件，案值 1402万元，挽回权利人经济损失2126万元，企业普遍反映海外市场得到显著净化，市场占有率有所提升。</p>
      </div>
      <p class="zoom mt15" v-if="!CustomsBol" @click="CustomsBol = true">点击收起<i class="icon ml5 iconfont icon-xiaochengxu-"></i></p>
      <p class="zoom mt15 zoom_unfold" v-if="CustomsBol" @click="CustomsBol = false">点击展开全部<i class="icon ml5 iconfont icon-xiaochengxu-3"></i></p>
    </div>
  </div>
  <div class="safeguard_case mt20">
    <p class="case_tit">
      质监投诉通道
    </p>
    <div class="case_info">
      <p class="info_tit mt25 mb25">产品质量问题投诉快速通道</p>
      <!-- <p class="info_txt mt10 mb25">维护名优产品生产企业和电商平台企业的合法权益，协助联动工商质监打击互联网领域假冒伪劣违法行为。</p> -->
    </div>
    <div class="case_images">
      <div class="image_list">
        <div>
          <img src="../../../assets/img/outpatient/Customs.png" alt="">
          <p class="mt20">产品质量问题投诉</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/knotty.png" alt="">
          <p class="mt20">质监专项行动</p>
        </div>
      </div>
      <div class="image_list bdl">
        <div>
          <img src="../../../assets/img/outpatient/withhold.png" alt="">
          <p class="mt20">假冒仿冒产品投诉</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/counterfeit.png" alt="">
          <p class="mt20">打假专项行动</p>
        </div>
      </div>
    </div>
    <!-- 可缩放部分 -->
    <div class="case_info" :class="{'zoom_more':qualityBol}">
      <p class="info_tit mt25 mb25">“平衡车”行业质监专项行动</p>
      <div class="case_list mt20">
        <p class="case_data">拾贝作为智能短交通行业知识产权联盟知识产权支持机构，贯彻“以打促授权”方针，针对电商平台的售卖店进行打击。通过质量抽检模式，结合线上侵权批量投诉，线下通过海关以及公安配合打击，以形成社会共治立体打击模式。充分利用联盟化手段整合智能短交通行业链知识产权资源，凝聚智能短交通行业链创新力量，解决产业发展中的知识产权问题，降低产业创新成本，提升产业创新效率，从而有效提升产业创新驱动发展能力。</p>
      </div>
      <p class="zoom mt15" v-if="!qualityBol" @click="qualityBol = true">点击收起<i class="icon ml5 iconfont icon-xiaochengxu-"></i></p>
      <p class="zoom mt15 zoom_unfold" v-if="qualityBol" @click="qualityBol = false">点击展开全部<i class="icon ml5 iconfont icon-xiaochengxu-3"></i></p>
    </div>
  </div>
  <div class="safeguard_case mt20 mb40">
    <p class="case_tit">
      线下维权打假
    </p>
    <div class="case_info">
      <p class="info_tit mt25">打击制售假冒伪劣产品</p>
      <p class="info_txt mt10 mb25">通过分析和研判线上线下的制售假冒伪劣产品线索，通过风险评估、线下调查、执法协调、法律诉讼的一站式服务，协助品牌线下维权打假</p>
    </div>
    <div class="case_images mb25">
    </div>
    <!-- 可缩放部分 -->
    <div class="case_info" :class="{'more_zoom':offlineBol}">
      <p class="info_tit mt25">品牌打假案例</p>
      <div class="case_list mt20">
        <p class="case_name">助力小米打击制假窝点</p>
        <p class="case_data mt20">拾贝作为智能短交通行业知识产权联盟知识产权支持机构，贯彻“以打促授权”方针，针对电商平台的售卖店进行打击。通过质量抽检模式，结合线上侵权批量投诉，线下通过海关以及公安配合打击，以形成社会共治立体打击模式。充分利用联盟化手段整合智能短交通行业链知识产权资源，凝聚智能短交通行业链创新力量，解决产业发展中的知识产权问题，降低产业创新成本，提升产业创新效率，从而有效提升产业创新驱动发展能力。</p>
      </div>
      <p class="zoom mt15" v-if="!offlineBol" @click="offlineBol = true">点击收起<i class="icon ml5 iconfont icon-xiaochengxu-"></i></p>
      <p class="zoom mt15 zoom_unfold" v-if="offlineBol" @click="offlineBol = false">点击展开全部<i class="icon ml5 iconfont icon-xiaochengxu-3"></i></p>
    </div>
  </div>
  <div class="help" @click="toHelp">
    <i class="icon iconfont icon-liuyan mr10"></i>
    <p>寻求帮助</p>
  </div>
</div>
</template>
<script>
  export default{
  data(){
    return{
      commerceBol:true,
      CustomsBol:true,
      qualityBol:true,
      offlineBol:true
    }
  },
  methods: {
    toHelp(){
      this.$router.push({path: '/pages/outpatient/help'});
    }
  },
  mounted(){
  }

}
</script>
<style lang="scss">
.safeguard{position: relative;
  .safeguard_case{width:750px;background-color:#fff;padding-bottom:30px;
    .case_tit{background-color:#EDF8ED;height:90px;line-height: 90px;font-size:30px;color:#36AF47;border-left:4px solid #36AF47;padding-left: 20px;font-weight:bold;}
    .case_info{text-align:center;padding:0 20px;//标题，内容部分
      .info_tit{font-size:32px;color:#333;line-height:45px;font-weight:bold;}
      .info_txt{font-size:26px;line-height:40px;color:#666;padding:0 10px;text-align:left;}
      // 案例列表
      .case_list{width:710px;padding:20px 30px 30px;text-align:left;background-color:#f8f8f8;
        .case_name{padding-left:10px;padding-right: 30px;height:60px;background:rgba(54,175,71,1);border-radius:0px 30px 30px 0px;line-height:60px;color:#fff;font-size:26px;margin-left: -30px;display:inline-block;}
        .case_data{font-size:28px;color:#666;line-height:42px;}
      }
      .zoom{line-height:37px;font-size:26px;color:#999;
        .iconfont{display:inline-block;font-size:32px;vertical-align: top;color:#ddd;}
      }
    }
    div.more_zoom{height:350px;overflow: hidden;position: relative;
      .zoom_unfold{position: absolute;width:750px;background-color:#fff;bottom:0;line-height:42px;box-shadow: 5px 5px 100px 50px #fff;}
    }
    div.zoom_more{height:320px;overflow: hidden;position: relative;
      .zoom_unfold{position: absolute;width:750px;background-color:#fff;bottom:0;line-height:42px;box-shadow: 5px 5px 100px 50px #fff;}
    }
    .bdl{border-left:1px solid #eee;}
    // 图片列表部分
    .case_images{width:750px;border-top:1px solid #eee;display:flex;
      .image_list{width:100%;
        >div{width:100%;text-align:center;border-bottom:1px solid #eee;padding:35px 0;font-size:0;
          img{width:60px;height:60px;}
          p{font-size:28px;color:#666;line-height:40px;}
        }
      }
    }
  }

  .help{width:202px;height:80px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:50px 0px 0px 50px;position: fixed;bottom:40px;right:0;display:flex;padding-left:20px;
    i{font-size:40px;color:#fff;width:40px;height:40px;line-height:80px;}
    p{color:#fff;font-size:28px;line-height:80px;}
  }
}
</style>
