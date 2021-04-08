<template>
<div class="knotty mt20">
  <div class="knotty_case">
    <p class="case_tit">
      知识产权疑难业务保障通道
    </p>
    <div class="case_info">
      <p class="info_tit mt25">商标疑难案件</p>
      <p class="info_txt mt10 mb25">帮助企业排除商标注册过程中遇到的被驳回、被异议等风险，全面解决企业商标注册难的问题，保障商标申请成功率；协助企业解决商标被抢注、被无效、被撤三等疑难问题。</p>
    </div>
    <div class="case_images">
      <div class="image_list">
        <div>
          <img src="../../../assets/img/outpatient/safeguard.png" alt="">
          <p class="mt20">商标注册保障</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/tm.png" alt="">
          <p class="mt20">被抢注商标处置</p>
        </div>
      </div>
      <div class="image_list bdl">
        <div>
          <img src="../../../assets/img/outpatient/approximate.png" alt="">
          <p class="mt20">近似商标打击</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/disposition.png" alt="">
          <p class="mt20">被异议、无效、撤三处置</p>
        </div>
      </div>
    </div>
    <div class="case_info">
      <p class="info_tit mt25">专利疑难案件</p>
      <p class="info_txt mt10 mb25">帮助企业排除专利申请过程中遇到的被驳回、审查意见答复、加急授权等问题，全面解决企业专利申请难的问题，保障专利申请成功率。协助企业解决专利被无效、纠纷等疑难问题。
      </p>
    </div>
    <div class="case_images">
      <div class="image_list">
        <div>
          <img src="../../../assets/img/outpatient/patents.png" alt="">
          <p class="mt20">专利申请授权保障</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/toInvalid.png" alt="">
          <p class="mt20">专利被无效应对</p>
        </div>
      </div>
      <div class="image_list bdl">
        <div>
          <img src="../../../assets/img/outpatient/Invalid.png" alt="">
          <p class="mt20">专利无效处置</p>
        </div>
        <div>
          <img src="../../../assets/img/outpatient/evaluate.png" alt="">
          <p class="mt20">专利权评价报告</p>
        </div>
      </div>
    </div>
  </div>
  <div class="knotty_case mt20">
    <p class="case_tit">
      知识产权诉讼服务通道
    </p>
    <div class="case_info">
      <p class="info_tit mt25">知识产权诉讼案件</p>
      <p class="info_txt mt10 mb25">高端知识产权诉讼，为客户提供最高质量的法律服务，业务领域涵盖专利、商标、著作权、不正当竞争、反垄断等。
      </p>
    </div>
    <div class="lawsuit_info">
      <img src="../../../assets/img/outpatient/vs.png" alt="">
      <div class="lawsuit_list">
        <div class="lawsuit_first">
          <p class="sebe_fire">
            <img src="../../../assets/img/outpatient/fire.png" alt="">
          拾贝律师</p>
          <p class="mt30">胜诉率高</p>
        </div>
        <div>
          <p>律师的团队服务</p>
        </div>
        <div>
          <p>专业精通</p>
        </div>
        <div>
          <p>只做知识产权</p>
        </div>
        <div>
          <p class="padb">专业型律师</p>
        </div>
      </div>
      <div class="lawsuit_list list_r bdl">
        <div class="lawsuit_first">
          <p class="comprehensive">综合律师</p>
          <p class="mt30">胜诉率低</p>
        </div>
        <div>
          <p>律师的个人服务</p>
        </div>
        <div>
          <p>对知识产权了解不深</p>
        </div>
        <div>
          <p>什么案件都做</p>
        </div>
        <div>
          <p class="padb">综合型律师</p>
        </div>
      </div>
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
.knotty{
  .knotty_case{width:750px;background-color:#fff;
    .case_tit{background-color:#EDF8ED;height:90px;line-height: 90px;font-size:30px;color:#36AF47;border-left:4px solid #36AF47;padding-left: 20px;font-weight:bold;}
    .case_info{text-align:center;padding:0 30px;//标题，内容部分
      .info_tit{font-size:32px;color:#333;line-height:45px;font-weight:bold;}
      .info_txt{font-size:26px;line-height:40px;color:#666;text-align:left;}
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
    .lawsuit_info{width:750px;border-top:1px solid #eee;display:flex;position: relative;
      >img{width:60px;height:50px;position: absolute;left:50%;margin-left: -30px;top:60px;}
      .padb{padding-bottom:60px;}
      .lawsuit_list{width:100%;
        div.lawsuit_first{padding-top: 65px;}
        div{width:100%;text-align:center;border-bottom:1px solid #eee;padding:20px 0;font-size:0;
          p{font-size:30px;color:#333;line-height:42px;}
          .sebe_fire{font-size:32px;color:#F5A623;line-height:45px;
            img{width:34px;height:40px;vertical-align:bottom;}
          }
          .comprehensive{font-size:32px;line-height:45px;}
        }
      }
      div.list_r{
        div{
          p{color:#999;}
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
