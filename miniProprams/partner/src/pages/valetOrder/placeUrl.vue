<template>
  <div class="place_url">
    <div class="place_info">
      <img src="~assets/img/placeUrl/index.png" class="index" @click="gotoIndex" alt="">
      <div class="row-center card">
        <img :src="imgUrl" :class="{'normal':imgLoaded, 'loading': !imgLoaded}" alt="">
      </div>
      <div class="prompt mt20">卡片生成后，请长按卡片分享给客户</div>
      <div class="btn " :class="{'disabled': !imgLoaded}" @click="createShareCard">生成推单卡片</div>
      <!-- <div class="copy weui-flex">
        <div class="copy_txt weui-flex__item">电脑端链接：{{pcUrl}}</div>
        <div class="txt_copy" @click="setClipboardData">复制</div>
      </div> -->
      <!-- <div class="prompt mt20">链接请在PC电脑端打开，PC支持对公支付，链接72小时内有效</div> -->
      <div class="back" v-if="payUrl">
        <p>对公支付链接：{{payUrl}}</p>
        <span @click="handleCopy">复制</span>
      </div>
      <p class="desInfo" v-if="payUrl">链接请在PC电脑端打开，PC支持对公支付，链接72小时内有效</p>
      <div class="order" v-if="mnState" @click="imitation" style="bottom: 60px;">模拟C端打开</div>
      <div class="order" @click="checkOrderFn">查看生成的订单</div>
      <div class="footer"></div>
    </div>
    <canvas canvas-id="mycanvas" class="mycanvas"></canvas>
    <img src="~assets/img/placeUrl/place.png">
    <mptoast />
  </div>

</template>
<script>
  import ShareCard from '../../utils/ShareCard';
  import imgUrl_ from '../../assets/img/placeUrl/loader.gif';
  const { cartUrl } = CONFIG;
  export default{
    data(){
      return{
        imgLoaded: false,
        imgUrl: imgUrl_,
        pcUrl:'',
        mnState: false, // 模拟C打开
        payUrl: '',
        orderFictitiousSn: '',  //订单号
      }
    },
    methods :{
      // 复制功能
      handleCopy () {
        let self = this;
        wx.setClipboardData({
          data: this.payUrl,
          success (res) {
            wx.getClipboardData({
              success (res) {
                console.log(res.data) // data
              }
            })
          }
        })
      },
      // 查看订单
      checkOrderFn () {
        let query = this.$route.query;
        if (query.id) {
          this.$router.push({path: `/pages/serviceOrder/worksDetails?workOrderId=${query.id}`});
        } else if (query&&query.from) {
          // 需求单过来的跳转至我的
          wx.switchTab({url: '/pages/index/my'});
        } else{
          this.$router.push({path: `/pages/order/orderDetails?orderFictitiousSn=${this.orderFictitiousSn}`});
        }
      },
      gotoIndex(){
        wx.reLaunch({
          url: '/pages/index/index'
        })
      },
      createShareCard(){
        if (!this.imgLoaded) {return;}
        let bgPath = '/images/placeUrl/card_bg.jpg'
        let text = '请长按识别二维码，确认订单信息'
        let imgPath = '/images/placeUrl/card_bg.jpg'
        ShareCard.canavsToImg();
      },
      setClipboardData(){
        var self = this;
        wx.setClipboardData({
          data: self.pcUrl,
          success: function(res) {
            Tips.toast('复制成功')
            wx.getClipboardData({
              success: function(res) {
                console.log(res.data) // data
              }
            })
          }
        })
      },
      imitation() {
        let query = this.$route.query;
        console.log('placeUrl_query:', query)
        this.orderFictitiousSn = query.orderFictitiousSn || '';
        let id_ = query.id || '';
        let storeCode = query.storeCode || this.$storage.get('storeCode') || '';
        if (!storeCode) {
          this.$mptoast('缓存中店铺code不存在')
        }
        let sense = `${this.orderFictitiousSn}_${id_}_${storeCode}`;  //订单号 + 工单号 + 店铺code
        let path = query.path || 'pages/store/parterOrder';
        console.log('placeUrl_sense:', sense)
        console.log('placeUrl_path:', path)
        wx.navigateToMiniProgram({
          appId: 'wx10617813540e0d66', //C端
          path: path,
          extraData: {
            scene: sense
          },
          envVersion: 'trial'
        });
      }
    },
    mounted () {
      process.env.METHOD == 'production' ? this.mnState = false : this.mnState = true
      var self = this;
      let query = this.$root.$mp.query;
      console.log('placeUrl_query:', query)
      this.orderFictitiousSn = query.orderFictitiousSn || '';
      let id_ = query.id || '';
      let storeCode = query.storeCode || this.$storage.get('storeCode') || '';
      if (!storeCode) {
        this.$mptoast('缓存中店铺code不存在')
      }
      let sense = `${this.orderFictitiousSn}_${id_}_${storeCode}`;  //订单号 + 工单号 + 店铺code
      console.log('scene', sense);
      let path = query.path || 'pages/store/parterOrder';
      self.imgLoaded = false;  //默认未加载完图片
      self.imgUrl = imgUrl_;  //加载时显示loading图
      if (query.md5) {
        this.payUrl = cartUrl + '/shop/pages/pay.html?order_sn_md5=' + query.md5 + '&isMiniApp=true';
      } else {
        // 二次支付不支持PC对公支付
        this.payUrl = '';
      }
      ShareCard.initShare(sense, path, function(url){
        self.imgLoaded = true;
        self.imgUrl = url;
      });
    }
  }
</script>
<style lang="scss">
  @import "../../assets/css/variable";
  .place_url{height:100%;position: relative;
    >img {width:750px;height:100%;position: absolute;top:0;z-index:1;}
    .place_info{z-index:10;background-color:#fff;box-shadow: 0 30px 56px 0 rgba(61,82,190,0.17);border-radius: 8px;position: absolute;left:40px;top:70px;right: 40px;bottom: 109px;text-align: center;padding-top:100px;box-sizing:border-box;font-size:0;padding-bottom: 30px;
      .card{
        height:440px;
        .normal{width:440px;height:440px;}
        .loading{width:64px;height:64px;}
      }
      .index{position: absolute;right: 0px; top: 0;width:172px;height:114px;}
      .btn{width:570px;height:94px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius: 8px;margin: 40px auto 30px;color:#fff;line-height:94px;font-size:$text-xxl;box-shadow:0px 8px 16px 0px rgba(47,128,246,0.3);}
      .back{width:570px;height:94px;border-radius: 8px;line-height:90px;border: 1px solid #DEE9F7;font-size:28px;margin: 0 auto;background:rgba(247,251,255,1);text-align: left;padding-left: 20px;display:flex;
        >p{width: 460px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;color:#515F71;}
        >span{padding-left: 10px;color: #2F80F6;}
      }
      .disabled{background:#ccc;box-shadow:none;}
      .copy{background: #F7FBFF;border: 1px solid #DEE9F7;border-radius: 8px;padding:30px;box-sizing:border-box;width:570px;margin:40px auto 0;
        .copy_txt{width:470px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size:$text-nm;text-align: left;color: #515F71;}
        .txt_copy{font-size: $text-nm;color: #2F80F6;}
      }
      .prompt{font-size: 24px;color: #B3BFD0;}
      .order{width: 100%;font-size:  $text-nm;color: #2F80F6;position: absolute;bottom: 30px;line-height:40px;text-align: center;}
      .desInfo{font-size: 20px;color: #f64744;line-height: 28px;padding-top: 20px;}
    }
    .footer{width:620px;height:40px;background: #FFFFFF;box-shadow: 0 10px 24px 0 rgba(64,85,196,0.14);border-radius: 0 0 8px 8px;z-index:10;position: absolute;bottom:-38px;left:30px;opacity:0.35}
  }
  .mycanvas{width:750px;height: 750px;position: absolute;top: -2000px;left: 0;z-index: 10}
</style>
