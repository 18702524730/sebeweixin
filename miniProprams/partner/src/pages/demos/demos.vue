<template>
  <div class="add_tit_wrap">
    <button type="success" @click="colorBol = !colorBol">测试分享组件</button>
    <up-image :list="list" :valueName="'Image01'" :url="'https://teststeward.ipsebe.com/steward/FileController/uploadData'" :wids="'160'" :higs="'190'" @toUrl="toUrl" @setUpImage="setUpImage" @createImg="createImg"></up-image>
    <div class="test_color" :class="{'br':colorBol}">
      
    </div>
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
      list: [
        {title: '生成图片', id: 1},
        {title: '拍照', id: 2},
        {title: '从手机相册选择', id: 3}
      ],
      imageUrl:'',
      Image01:'',
      colorBol:false,
      args: {
        fee: 1,             // 支付金额，单位为分
        customArgument: 'A' // 将传递到功能页函数的自定义参数
      }
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
  methods :{
    createImg(){
      // 生成图片，具体什么操作不知道
    },
    toUrl(url){
      console.log('跳转')
      this.$router.push({path: '/pages/order/orderRefundDetail?imgUrl='+url})
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
    mounted(){
    },
    computed:{
      // 计算属性，类似于过滤器的使用方法，参考https://juejin.im/post/5a6f21a86fb9a01ca47ac4b9，js放置在utils中的filters里面，使用方法在serviceOrder/orderDetails
    }
  }
</script>
<style lang="scss">
  .add_tit_wrap{height: 50px;
    .test_color{width:500px;height:500px;background: olive linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,.5));transition:all 1s;}
    div.br{background-color: purple;transition:all 1s;}
  }
</style>