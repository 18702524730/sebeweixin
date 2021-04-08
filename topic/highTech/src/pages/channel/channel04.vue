<template>
 <div class="channleWrap channleWrap2" :class="{'image_size':sizeImg}">
   <!-- <img class="sebe_image" src="~assets/img/channel/sebe.png" alt=""> -->
    <div class="brightPoint point04" :class="state ? 'animatePoint01' : ''">
      <h2>保护赋能</h2>
      <p>各大电商的诚信投诉绿色通道、政府联动协调（龙腾行动、利剑行动、雷霆行动、清风行动、行业专项打击）。</p>
      <div class="label">亮点4</div>
    </div>
    <div class="brightPoint point05" :class="state ? 'animatePoint01' : ''">
      <h2>多维业务</h2>
      <p>知识产权、工商财税、电商服务、法律服务、认证服务等业务赋能，解决客户更多需求。</p>
      <div class="label">亮点5</div>
    </div>
    <div class="brightPoint point06" :class="state ? 'animatePoint01' : ''">
      <h2>利润业务</h2>
      <p>商标专利疑难案件、知识产权诉讼案件、线上线下维权案件、中国驰名商标、中国专利奖等高端业务赋能。</p>
      <div class="label">亮点6</div>
    </div>
    <div class="brightPoint point07" :class="state ? 'animatePoint01' : ''">
      <h2>智能工具</h2>
      <p>商标全流程saas、一键申报、推单助手、商标专利检索、商标专利管家等。</p>
      <div class="label">亮点7</div>
    </div>
 </div>
</template>
<script>
 export default {
   data () {
     return {
       state: false,
       sizeImg: false
     }
   },
   components: {
   },
    methods: {
    callMethod () {
        this.state = true
        this.sizeImg = true
      }
   },
   mounted () {

   }
 }
</script>
<style lang="scss">
html, body{
  height: 100%;
}
#app{height: 100%;}
.channleWrap2{padding-top: 90px;}
.channleWrap{
  .sebe_image{position: absolute;top:20px;left:0;width:140px;}
  .brightPoint{
    &.point04{background: rgba(255,255,255,.08) url(~assets/img/channel/point04.png) no-repeat 546px 34px;background-size: 151px 132px;
      // top:172px;
      // margin-top: 172px;
      transition: all .5s ease .6s;
    }
    &.point05{background: rgba(255,255,255,.08) url(~assets/img/channel/point05.png) no-repeat 514px 22px;background-size: 174px 137px;
      // top: 36.2%;
      // top: 470px;
      transition: all 0.5s ease 1.1s;padding: 14px 180px 26px 30px;
    }
    &.point06{
      background: rgba(255,255,255,.08) url(~assets/img/channel/point06.png) no-repeat 514px 65px;background-size: 169px 142px;
      // top: 56%;
      // top: 720px;
      transition: all 0.5s ease 1.6s;
    }
    &.point07{
      background: rgba(255,255,255,.08) url(~assets/img/channel/point07.png) no-repeat 536px 38px;background-size: 149px 124px;
      // top: 79.4%;
      // top: 1021px;
      transition: all 0.5s ease 2.1s;
    }
    &.animatePoint01{margin-left: 0;}
  }
}
</style>
