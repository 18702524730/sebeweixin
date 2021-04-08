<template>
  <div class="projectWrap">
    <div class="proPageTit">重点项目培育通道</div>
    <div class="paragraph">
      <div class="title">中国驰名商标申请</div>
      <p>驰名商标是在中国国内广为公众知晓并享有较高声誉的商标，是中国国家工商行政管理局商标局，根据企业的申请，个案认定，对驰名商标的保护不仅仅局限于相同或者
        类似商品或服务，就不相同或者不相类似的商品申请注册或者使用时，都将不予注册并禁止使用，因此驰名商标被赋予了比较广泛的排他性权利。而且“驰名商标”持有企业
        的公司名以及网址域名都会受到不同于普通商标的格外法律保护。</p>
    </div>
    <div class="paragraph">
      <div class="title">中国专利奖</div>
      <p>"中国专利奖"是中国唯一的专门对授予专利权的发明创造给予奖励的政府部门奖，得到联合国世界知识产权组织（WIPO的认可，在国际上有一定的影响，设中国专利金奖
        及中国专利优秀奖、中国外观设计金奖及中国外观设计优秀奖。</p>
    </div>
    <div class="paragraph" style="border: none;">
      <div class="title">中国质量奖的重点培育计划</div>
      <p>中国质量奖是中国质量领域的最高荣誉，设中国质量奖和中国质量奖提名奖，每两年评选一次，旨在表彰在质量管理模式、管理方法和管理制度领域取得重大创新成就的组
        织和为推进质量管理理论、方法和措施创新做出突出贡献的个人。</p>
    </div>
  <div class="help" @click="toHelp">
    <i class="icon iconfont icon-liuyan mr10"></i>
    <p>寻求帮助</p>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    toHelp(){
      this.$router.push({path: '/pages/outpatient/help'});
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
.projectWrap{margin-top: 20px;background: #fff;
  .proPageTit{font-size: 30px;font-weight: 500;color: #36af47;line-height: 90px;border-left: 4px solid #36af47;padding-left: 20px;
    background:rgba(237,248,237,1);
  }
  .paragraph{
    padding: 30px;border-bottom:1px solid #eee;
    .title{font-size: 32px;line-height: 45px;font-weight: 500;color: #333;text-align: center;margin-bottom: 20px;}
    p{font-size: 28px;line-height: 42px;color: #666;}
  }
  .help{width:202px;height:80px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:50px 0px 0px 50px;position: fixed;bottom:137px;right:0;display:flex;padding-left:20px;
    i{font-size:40px;color:#fff;width:40px;height:40px;line-height:80px;}
    p{color:#fff;font-size:28px;line-height:80px;}
  }
}
 
</style>
