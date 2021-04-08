<template>
  <div class="openShop">
    <div class="outerBox"></div>
    <div class="column-start innerBox">
      <img src="~assets/img/authorize/banner.jpg" mode="widthFix">
      <div class="act_info">
        <!-- <p class="old">原价：¥299.00</p> -->
        <p class="now">现价：¥<i>0.00</i></p>
        <!-- <p class="time">即日起至2018年12月31日开店免除全部费用</p> -->
        <p class="time"></p>
      </div>
      <button class="open-shop-btn" @click="openShop">立即开店</button>
    </div>
    <!-- <steps :step="2"></steps> -->
  </div>
</template>
<script>
  import mixin from 'mixins/';
  import steps from './components/steps'
  const indexPath = CONFIG.indexPath;
  export default{
    components:{
      steps
    },
    mixins: [mixin],
    data(){
      return{
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '自定义转发标题',
        path: '/page/user?id=123'
      }
    },
    mounted(){
      this.checkLoginAndMark('openShop');
    },
    methods :{
      async openShop() {
        await this.API.interfaces.openShop();
        let userData = this.$storage.get('auth');
        userData.isHaveStore = 1;
        this.$storage.set('auth', userData);
        // this.$router.replace('/pages/authorize/realName');
        wx.switchTab({ url: indexPath})
      }
    },
  }
</script>
<style lang="scss">
  .openShop{
    height: 100%;
    .innerBox{
      position: absolute;top: 30px;left: 40px;right: 40px;bottom: 30px;background-color: #fff;box-shadow:0px 0px 20px 0px rgba(221,221,221,0.5);border-radius:6px;align-items: center;
      img{width: 100%;}
      .act_info{
        text-align: center;
        .old{font-size:32px;line-height:32px;margin-top: 55px;text-decoration: line-through;color: #666;}
        .now{
          font-size: 40px;color: #F64744;margin-top: 15px;font-weight: bold;height: 70px;line-height: 70px;
          i{font-size: 70px;color: #F64744;height: 70px;line-height: 70px;}
        }
        .time{height:24px;line-height: 24px;font-size:24px;margin-top: 20px;color: #999}
      }
      button{margin-top: 30px;width:380px;height:90px;font-size:32px;padding: 0;border-radius:45px;border:1px solid #F64744;line-height: 88px;color: #F64744;}
    }
    .outerBox{
      position: absolute;top: 70px;left: 20px;right: 20px;bottom: 90px;background-color: #fff;box-shadow:0px 0px 20px 0px rgba(221,221,221,0.5);border-radius:6px;
    }
  }
</style>
