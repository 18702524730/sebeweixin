<template>
  <div class="authorize" v-if="show">
    <img src="~assets/img/icon/logo.png">
    <h3>欢迎来到拾贝宝+</h3>
    <p>为了更好的体验，请先完成以下授权！</p>
    <button type="primary" class="sebe-btn sebe-btn-warn" open-type="getUserInfo" @getuserinfo="getUserInfo">小程序授权</button>
  </div>
</template>
<script>
  import mixin from 'mixins/';
  export default{
    components:{
    },
    mixins: [mixin],
    data(){
      return{
        show: false
      }
    },
    mounted(){
      this.init();
    },
    methods :{
      async init() {
        let query = this.$root.$mp.query;
        console.log('authorize_query:', query)
        // isAuth表示是否授权 true:已授权 false:已授权
        let isAuth = await this.checkLoginAndMark();
        console.log('isAuth', isAuth)
        // 因授权后可实现跨小程序免登录, 删除noHandle标志，后面需要再登录验证
        delete query.noHandle;
        console.log('query.noHandle:', query.noHandle)
        this.show = isAuth === false ? true : false;
        if (this.show) {
          wx.setNavigationBarTitle({title: '小程序授权'});
        }
      },
      goBindPhone() {
        this.$router.replace({
          path: '/pages/authorize/bindPhone',
          query: this.$root.$mp.query
        })
      },
      async getUserInfo(e) {
        let userInfo = e.target.userInfo;
        console.log(e)
        if (userInfo) {
          await this.API.interfaces.getUserInfoByUser(e.target);
          // 因授权后可实现跨小程序免登录，这儿简单处理, 再次发起登录验证
          await this.checkLoginAndMark();
          this.goBindPhone();
        }else{
          // 拒绝授权的情况
          wx.showModal({
            title: '提示',
            content: '拒绝授权,小程序将不可用',
            success:function(res){
            }
          })
        }
      },
      // 支付成功的回调接口
      paymentSuccess (e) {
        console.log(e);
      },
      // 支付失败的回调接口
      paymentFailed (e) {
        console.log(e);
      },
      testImg(){
        console.log(this.imageUrl)
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      handleClickTest () {
        console.log(1)
        wx.hideShareMenu()
        // wx.showShareMenu({
        //   // withShareTicket: true
        // })
      },
      setUpImage(data){
        this[data.valueName] = data.url;
        console.log(this.Image01,'测试图片url')
      }
    },
  }
</script>
<style lang="scss">
  .authorize{
    height: 100%;display: flex;flex-direction: column;align-items: center;background-color: #fff;
    img{width: 200px;height: 200px;margin-bottom: 60px;margin-top: 120px;}
    h3{font-size: 36px;height: 50px;margin-bottom: 20px;font-weight:500;}
    p{height: 37px;color: #999;margin-bottom: 50px;}
    button{width: 500px;font-size:32px;line-height: 1;padding: 29px 0;border-radius: 45px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);}
  }
</style>
