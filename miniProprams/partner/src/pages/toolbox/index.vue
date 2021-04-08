<template>
  <div class="toolbox">
    <img class="bg" src="~assets/img/toolbox/toolBg.png" mode="aspectFit">
    <div class="toolbox_in">
      <!-- <h3>您的知产服务百宝箱</h3> -->
      <div class="row-center tools" style="">
        <div class="tool" @click="pathTo('wx6b2a8d87bb8c6ce4', 'pages/index/index')">
          <img mode="aspectFit" src="~assets/img/index/tool1.png">
          <p>证据保</p>
          <div class="des">原创作品<br>网页侵权</div>
        </div>
        <div class="tool" @click="pathTo('wxd3395f89f8ce776a', 'pages/tradmarkQuery/tradmarkQuery')">
          <img mode="aspectFit" src="~assets/img/index/tool2.png">
          <p>商标检索</p>
          <div class="des">精确近似<br>一搜便知</div>
        </div>
        <div class="tool" @click="pathTo('wxe0112bc6d0b9da8e', 'pages/home/home')">
          <img mode="aspectFit" src="~assets/img/index/tool3.png">
          <p>专利检索</p>
          <div class="des">多维检索<br>估值助手</div>
        </div>

      </div>
      <div class="row-center tools">
        <div class="tool" @click="popup(`${indexUrl}/sebe/pages/productClassify.html#/query`)">
          <img mode="aspectFit" src="~assets/img/index/tool4.png">
          <p>尼斯分类</p>
          <div class="des">大类小项<br>便捷查询</div>
        </div>

        <div class="tool" @click="pathTo('wx05d45b713ed26a0e')">
          <img mode="aspectFit" src="~assets/img/index/tool5.png">
          <p>商标管家</p>
          <div class="des">监测监管<br>企业商标</div>
        </div>
        <div class="tool" @click="pathTo('wxe0112bc6d0b9da8e')">
          <img mode="aspectFit" src="~assets/img/index/tool6.png">
          <p>专利管家</p>
          <div class="des">专利维权<br>一手掌握</div>
        </div>

      </div>
    </div>
    <div class="toolBot">拾贝宝，给你最便捷的服务</div>
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
      // footerNav
    },
    data(){
      return{
        footerActive: 3,
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
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      })
    },
    // 监听用户点击页面内转发按钮
    onShareAppMessage() {
      let obj = {};
      let memberId = this.$storage.get('auth').member_id;
      obj = {
        title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
        path: "/pages/authorize/authorize?memberId="+ memberId,
        imageUrl: '/static/icon/bg.jpg'
      }
      return obj;
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
    height: 100%;position: relative;overflow: hidden;background: #fff;text-align: center;font-size: 0;
    .bg{height: 462px;width: 472px;padding: 40px 0 20px;}
    .toolbox_in{background: #eee;
      background-size: 100%;width: 750px;
      .tools{
        margin-bottom: 1px;
        .tool{
          align-items: center;flex: 1;text-align: center;height: 313px;padding-top:60px;background: #fff;
          img{height: 60px;display: block;}
          p{text-align: center;margin-top: 15px;line-height: 42px;font-size: 30px;color: #333;font-weight:500;}
          .des{padding-top: 10px;line-height: 33px;color: #999;font-size: 24px;}
          &:nth-child(3n+2){margin: 0 1px;}
        }
      }
    }
    .toolBot{font-size: 24px;line-height: 33px;color: #999;position: absolute;bottom: 30px;left: 0;width: 750px;text-align: center;}
  }
</style>
