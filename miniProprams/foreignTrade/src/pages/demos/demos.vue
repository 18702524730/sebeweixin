<template>
  <div class="add_tit_wrap">
    <button type="success" @click="colorBol = !colorBol">测试分享组件</button>
    <up-image :valueName="'Image01'" @setUpImage="setUpImage"></up-image>
   <!--  <div class="test_color" :class="{'br':colorBol}">
      
    </div> -->
    <button type="warn" open-type="share">ces</button>
    <button type="warn" @click="handleClickTest">ces</button>

    <functional-page-navigator
      version="develop"
      name="requestPayment"
      :args="args"
      bind:success="paymentSuccess"
      bind:fail="paymentFailed"
    >
      <button class="payment-button">支付 0.01 元</button>
      
    </functional-page-navigator>
  </div>
</template>
<script>
  import verifyUtils from '../../utils/utils.js';
  import upImage from '../../components/upImage';
  import qs from 'qs';
  export default{
    components:{
      upImage
    },
    data(){
      return{
        imageUrl:'',
        Image01:'',
        colorBol:false,
        args: {
          fee: 1,             // 支付金额，单位为分
          customArgument: 'A' // 将传递到功能页函数的自定义参数
        }
      }
    },
    // onShareAppMessage (res) {
    //   if (res.from === 'button') {
    //     // 来自页面内转发按钮
    //     console.log(res.target)
    //   }
    //   return {
    //     title: '自定义转发标题',
    //     path: '/page/user?id=123'
    //   }
    // },
    methods :{
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
    mounted(){
    }
  }
</script>
<style lang="scss">
  .add_tit_wrap{
    .test_color{width:500px;height:500px;background: olive linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,.5));transition:all 1s;}
    div.br{background-color: purple;transition:all 1s;}
  }
</style>