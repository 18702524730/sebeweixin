<template>
  <div class="successbox">
    <div class="item">
      <div class="jianyi"></div>
      <div class="jianyicont">
          我们已经收到您的问题了！
      </div>
      <div class="jianyicont">
          外贸知产专家将在1个工作日内与您取得联系！
      </div>
    </div>
    <div class="commitBtn" @click="tomy">查看我的</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {

  },

  methods: {
    tomy(){
        wx.switchTab({url:'/pages/my/index'})
        // this.$router.push({path:'/pages/my/index'})
    },
   
  }
}
</script>

<style lang="scss">
.successbox{
  background: #fff;
  min-height: 100%;
  .jianyi{
    width:118px;
    height: 118px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
    background-image: url('~assets/img/homepage/suc.png');
    background-size: 100% 100%;
    background-position: center center;
  }
  .jianyicont{
    font-size:28px;
    font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
    color:#666;
    line-height:40px;
    text-align: center;
  }
  .item{
    padding: 94px 24px 130px;
  }
  
  .commitBtn{
    width:600px;
    height:90px;
    margin-left: auto;
    margin-right: auto;
    background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
    border-radius:45px;
    text-align: center;
    font-size:32px;
    font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:90px;
  }
}
 
</style>
