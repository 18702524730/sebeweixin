<template>
  <div class="demandPage">
    <div class="highEndDemand demand" @click="$router.push('/pages/outpatient/help')">
      <h2>知识产权立体保护</h2>
      <p>电商维权、海关质监保护、<br>专利侵权判定、商标专利疑难处置 </p>
      <!-- <p>24h极速响应！</p> -->

      <div @click.stop="goIntro">更多介绍及案例</div>
      <!-- <button type="button">立即提交</button> -->
    </div>
    <div class="baseDemand demand" @click="$router.push('/pages/store/demand')">
      <h2>知识产权基础需求</h2>
      <p>商标、专利、版权在线申请<br> 需求一键提交，10分钟极速响应！<br> 预期收益一目了然！ </p>
      <!-- <button type="button">立即提交</button> -->
    </div>
    <div class="watchDemand" @click="$router.push('/pages/demandManage/demandLists')">查看我的需求</div>
    <button class="wechatWrap" open-type="contact">
      <img src="~assets/img/outpatient/kf.png" alt="" class="img">
    </button>
  </div>
</template>

<script>

export default{
  data(){
    return{
      footerActive: 1,
      outpatientType:1
    }
  },
  methods: {
    goIntro () {
      this.$router.push('/pages/outpatient/introduction');
      return false;
    }
  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=12",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  onShow(){
    setTimeout(() => {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#f8f8f8'
      })
    }, 200);
  }

}
</script>
<style lang="scss">
@import "../../assets/css/variable";
.demandPage{
  padding: 20px 40px 0;
  .demand{height:350px;box-shadow:0px 10px 30px 0px rgba(203,166,105,0.41);border-radius:16px;margin-top: 40px;padding: 45px;color:rgba(255,255,255,1);position: relative;
    h2{font-size:36px;font-weight:600;line-height:50px;color: #fff;padding-bottom: 17px;}
    p{line-height: 37px;font-size: 26px;color: #fff;opacity: 0.82;}
    button{position: absolute;bottom: 40px;right: 40px;width: 180px;height: 60px;border: none;line-height: 60px;border-radius: 30px;padding: 0;font-size:26px;color:rgba(213,155,28,1);}
    >div{font-size:26px;color:rgba(255,255,255,1);line-height:37px;padding-top: 82px;}
  }
  .highEndDemand{background:url(~assets/img/outpatient/high.png) no-repeat,-webkit-linear-gradient(270deg,rgba(245,205,122,1) 0%,rgba(225,158,15,1) 100%);background-size: cover;
    >div{background: url(~assets/img/outpatient/start.png) no-repeat 0 86px;background-size: 28px 28px;padding-left: 33px;}
  }
  .baseDemand{background:url(~assets/img/outpatient/base.png) no-repeat,-webkit-linear-gradient(270deg,rgba(47,170,255,1) 0%,rgba(47,128,246,1) 100%);box-shadow:0px 10px 30px 0px rgba(53,162,255,0.37);background-size: cover;
    button{color: #2F83F7;}
  }
  .watchDemand{border: 1px dashed #ddd;line-height: 68px;height: 70px;text-align: center;border-radius: 35px;color: #999;font-size: 28px;margin-top: 40px;}
  .wechatWrap{width: 150px;height: 150px;border-radius: 75px;position: fixed;right: 10px;bottom: 40px;font-size: 0;border: none;padding: 0;background: none;
    img{width: 150px;height: 150px;}
  }
}
</style>
