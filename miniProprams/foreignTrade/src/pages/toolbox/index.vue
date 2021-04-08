<template>
  <div class="column-center toolbox">
    <img class="bg" src="~assets/img/toolbox/bg.jpg" mode="widthFix">
    <div class="toolbox_in">
      <h3>您的知产服务百宝箱</h3>
      <div class="row-center tools">
        <div class="tool" @click="pathTo('wxd3395f89f8ce776a', 'pages/tradmarkQuery/tradmarkQuery')">
          <img src="~assets/img/toolbox/sbjs.png">
          <p>商标检索</p>
        </div>
        <div class="tool" @click="popup(`${indexUrl}/sebe/pages/productClassify.html#/query`)">
          <img src="~assets/img/toolbox/nsfl.png">
          <p>尼斯分类</p>
        </div>
        <div class="tool" @click="pathTo('wx05d45b713ed26a0e')">
          <img src="~assets/img/toolbox/sbgj.png">
          <p>商标管家</p>
        </div>
      </div>
      <div class="row-center tools">
        <div class="tool" @click="pathTo('wxe0112bc6d0b9da8e', 'pages/home/home')">
          <img src="~assets/img/toolbox/zljs.png">
          <p>专利检索</p>
        </div>
        <div class="tool" @click="pathTo('wxe0112bc6d0b9da8e')">
          <img src="~assets/img/toolbox/zlgj.png">
          <p>专利管家</p>
        </div>
        <div class="tool" @click="popup(`${indexUrl}/cms/service/rightoriginal.htm`)">
          <img src="~assets/img/toolbox/cz.png">
          <p>公证存证</p>
        </div>
      </div>
    </div>
    <u-modal :showModal="showModal" :options="options" :content="content" @confirmBtn="confirmFn" @hide="hideFn" />
    <!-- 底部公共导航 -->
    <!-- <footerNav :active.sync="footerActive" /> -->
  </div>
</template>
<script>
  // import footerNav from 'components/footerNav';
  const indexUrl = CONFIG.indexUrl
  export default{
    components:{

    },
    data(){
      return{
        footerActive: 2,
        indexUrl,
        url: '',
        showModal: false,
        content: '小程序暂不支持，请前往PC电脑端使用',
        options: {
          confirmText: '复制链接'
        },
      }
    },
    mounted(){
    },
    methods :{
      popup(url) {
        this.url = url;
        this.showModal = true;
      },
      confirmFn(isSure) {
        this.showModal = false;
        if (isSure) {
          WXP.setClipboardData({
            data: this.url
          })
          .then(() => {
            this.$mptoast('已复制链接到剪贴板');
          }).catch((err) => {});
        }
      },
      hideFn() {
        this.showModal = false;
      },
      pathTo(appId, path) {
        wx.navigateToMiniProgram({
          appId,
          path,
          envVersion: 'trial'
        });
      },
    },
  }
</script>
<style lang="scss">
  .toolbox{
    height: 100%;position: relative;overflow: hidden;
    .bg{width: 100%;position: absolute;top: 0;left: 0;}
    .toolbox_in{
      position: absolute;top: 40px;left: 0;right: 0;bottom: 0;background: transparent url(~assets/img/toolbox/bg_in.png) 0 0 no-repeat;background-size: 100%;z-index: 2;
      h3{height: 81px;line-height: 81px;font-size:38px;font-weight:600;color: #fff;margin-top: 88px;margin-bottom: 131px;text-align: center;}
      .tools{
        margin-bottom: 50px;
        .tool{
          align-items: center;margin: 0 25px;
          img{width: 150px;height: 150px;display: block;}
          p{width: 150px;text-align: center;margin-top: 20px;line-height: 42px;font-size: 30px;}
        }
      }
    }
  }
</style>
