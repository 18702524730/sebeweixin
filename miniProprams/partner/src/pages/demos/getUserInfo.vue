<template>
  <div class="column-center authorize">
    <img src="~assets/img/homepage/china.png">
    <h3>欢迎来到 拾贝合伙人</h3>
    <p>为了更好的体验，请先完成以下授权！</p>
    <button type="primary" class="sebe-btn sebe-btn-warn" open-type="getUserInfo" @getuserinfo="getUserInfo">小程序授权</button>
  </div>
</template>
<script>
  import qs from 'qs';
  export default{
    components:{
    },
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
    },
    methods :{
      getUserInfo: function(e) {
        console.log(e)
        let userInfo = e.target.userInfo;
        if (userInfo) {
          this.API.interfaces.getUserInfo();
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
    height: 100%;
    img{width: 100px;height: 100px;margin-bottom: 50px;}
    h3{font-size: 40px;margin-bottom: 50px;}
    p{padding-bottom: 60px;}
    button{}
  }
</style>
