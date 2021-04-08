<template>
 <div class="channleWrap" :class="{'image_size':sizeImg}">
    <img class="sebe_image" src="~assets/img/channel/sebe.png" alt="">
    <h1 :class="state ? 'pageH1' : ''">生态合伙人计划</h1>
    <h2 :class="state ? 'pageH2' : ''">合伙人荣誉</h2>
    <p :class="state ? 'pageP' : ''">经推荐由CAASA审核成为中国反侵权假冒创新战略联盟个人会员，并加入全国知识产权社会共治保护志愿者体系。</p>
    <div class="brightPoint point01" :class="state ? 'animatePoint01' : ''">
      <h2>长期事业 <img src="~assets/img/channel/text.png"></h2>
      <p>移动端专属店铺，自主经营，不坐班，无考核，全心全意服务客户。</p>
      <div class="label">亮点1</div>
    </div>
    <div class="brightPoint point02" :class="state ? 'animatePoint01' : ''">
      <h2>高额收益</h2>
      <p>合伙人开拓客户，最高可获得高额分润，邀请好友加入合伙人，平台奖励长期分润。</p>
      <div class="label">亮点2</div>
    </div>
    <div class="brightPoint point03" :class="state ? 'animatePoint01' : ''">
      <h2>IPT</h2>
      <p>IPT 是拾贝共享生态的通证，用作兑换服务和需求以及其他各类权益、享受拾贝分红、拾贝原始股权的优先认购权。</p>
      <div class="label">亮点3</div>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       state: false,
       sizeImg:false,
       pageBol: false
     }
   },
   components: {
   },
   methods: {
    callMethod () {
      this.sizeImg = true
        this.state = true
      }
   },
   mounted () {
    //  setTimeout(() => {
    //   this.state = true
    //  }, 100)

   }
 }
</script>

<style lang="scss">
html, body{
  height: 100%;
}
#app{height: 100%;}
.channleWrap{
  a{text-decoration: none;}
  width: 750px;height: 100%;background:#202c5a url(~assets/img/channel/bg.jpg) no-repeat;background-size:100%;
  background-position-y:0;position: relative;
  color: #fff;
  padding: 376px 30px 0;
  &.image_size{background-size:110%;background-position-x:center;background-position-y:0;transition:all 3s;}
  h1{font-size: 44px;line-height: 44px;color: #fff;text-align: center;position: absolute;top: -190px;
    transition: top .5s ease;width: 690px;
  }
  .sebe_image{position: absolute;top:20px;left:0;width:140px;}
  .pageH1{top: 100px;}
  >h2{font-size: 28px;line-height: 28px;text-align: center;padding-bottom: 12px;color:#07d09e;transition: top .5s ease 0.6s;
    width: 690px;position:absolute;top: -28px;
    &.pageH2{top: 170px;}
  }
  >p{font-size: 24px;line-height: 44px;color: #07d09e;text-align: center;position: absolute;top: -120px;transition: top 0.5s ease 1.1s;width: 690px;
    &.pageP{top:210px;}
  }
  .brightPoint{
    width: 690px;position: relative;
    padding: 14px 180px 26px 30px;background: rgba(255,255,255,.2);
    margin-bottom: 64px;margin-left: -720px;
    background-size: 186px 160px;
    >h2{font-size: 30px;line-height: 60px;
      img{width: 220px;height: 27px;padding-left: 20px;}
    }
    >p{font-size: 24px;line-height: 44px;color: #bfc2c9;}
    .label{padding: 0 20px 0 10px;font-size: 24px;line-height: 34px;position: absolute;top: -34px;left: 0;color: #000;
    background: #07d09e;border-top-right-radius: 17px;border-bottom-right-radius: 17px; }
    &.point01{background: rgba(255,255,255,.08) url(~assets/img/channel/point01.png) no-repeat 490px 26px;background-size: 186px 143px;
      transition: all .5s ease 1.6s;
    }
    &.point02{background: rgba(255,255,255,.08) url(~assets/img/channel/point02.png) no-repeat 515px 50px;background-size: 161px 126px;
      transition: all 0.5s ease 2.1s;
    }
    &.point03{
      background: rgba(255,255,255,.08) url(~assets/img/channel/point03.png) no-repeat 527px 66px;background-size: 138px 116px;
      transition: all 0.5s ease 2.6s;
    }
    &.animatePoint01{margin-left: 0;}
  }
  input::-webkit-input-placeholder{
      color:#223350;
      font-size: 28px;
  }
  @media screen and (max-width: 321px) { /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
    h1{font-size: 40px;}
    >h2{font-size: 26px;}
    >p{font-size: 18px;}
    .brightPoint{
      >h2{font-size: 26px;line-height: 60px;}
      >p{font-size: 20px;line-height: 44px;color: #bfc2c9;}
      .label{padding: 0 20px 0 10px;font-size: 20px;line-height: 34px;position: absolute;top: -34px;left: 0;color: #000;
      background: #07d09e;border-top-right-radius: 17px;border-bottom-right-radius: 17px; }
    }
  }
}

</style>
