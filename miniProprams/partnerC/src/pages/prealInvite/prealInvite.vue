<template>
<div class="pearl_invite">
  <canvas canvas-id="inviteCanvas" class="canvas"></canvas>
  <p @click="canvasImg">保存卡片到手机</p>
</div>
</template>
<script>
  const inviteBgi = 'https://ossfile.ipsebe.com/890D7D47026B10AB21D4D69F792EE79F.png';
  const titleBgi = 'https://ossfile.ipsebe.com/7FC6AEDFAD2755CDCC82C92C26199B85.png';
  const logoSebe = 'https://ossfile.ipsebe.com/316CFE1559F5BABD2A7E61C68D84C5DD.png';
  const wxUrl = CONFIG.wxUrl;
  import Filters from '../../utils/filters.js'
export default{
  data(){
    return{
      imageSize:'',
      codeImgUrl:'',
      IPTNum:0.0000
    }
  },
  methods: {
    // 获取验证码
    async getCodeImg() {
      let memberId = this.$storage.get('auth').member_id;
      let data = await this.API.store.createwxaqrcode({
        miniAppSessionId: "wx10617813540e0d66_b1KmeZ6KzV1PYPkLD1x3PWVIsS14lsY6",
        miniAppType:5, // 2为拾贝微商城 3为推单助手wepy.$instance.globalData.miniAppType,
        qrcodeType: 2, // 1接口A,2 接口B,3 接口C 接口ABC的参数必传其一
        path: 'pages/my/my_IPT', // 2接口B不能带参数，需传scene。接口A和接口C需要带参数
        width: 332,
        auto_color: false,
        line_color: { r: "47", g: "128", b: "246" }
      });
      console.log(this.codeImgUrl,'二维码')
      let codeUrlData = await WXP.getImageInfo({
        src: data.imageurl //服务器返回的图片地址
      });
      this.codeImgUrl = codeUrlData.path;
      console.log(this.codeImgUrl,'二维码')
    },
    image() {
      var imageSize = {};
      var originalScale = 1.78; //图片高宽比
      //获取屏幕宽高
      wx.getSystemInfo({
        success: function(res) {
          var windowWidth = res.windowWidth;
          var windowHeight = res.windowHeight;
          imageSize.width = res.windowWidth;
          imageSize.height = res.windowHeight;
          var windowscale = windowHeight / windowWidth; //屏幕高宽比
          if (originalScale < windowscale) {
            //图片高宽比小于屏幕高宽比
            //图片缩放后的宽为屏幕宽
            imageSize.imageWidth = windowWidth;
            imageSize.imageHeight = windowWidth * originalScale;
            imageSize.chaHeight = windowHeight - imageSize.imageHeight;
          } else {
            //图片高宽比大于屏幕高宽比
            //图片缩放后的高为屏幕高
            imageSize.imageHeight = windowHeight;
            imageSize.imageWidth = windowHeight / originalScale;
            imageSize.chaWidth = windowWidth - imageSize.imageWidth;
          }
        }
      });
      this.imageSize = imageSize
    },
    async drawSharePicFn () {
      const ctx = wx.createCanvasContext('inviteCanvas');
      // 绘制头像，头像是方形的，为了维持圆形
      ctx.drawImage('https://i01piccdn.sogoucdn.com/91ddd41cc7224297', 76, 488, 50, 50);
      // 绘制二维码图片，因为二维码不是圆形，需要覆盖
      ctx.drawImage('https://i01piccdn.sogoucdn.com/91ddd41cc7224297', 105, 243, 166, 166);
      // 绘制全局背景图
      ctx.drawImage(inviteBgi, 0, 0, 375, 667);
      // 底部logo
      ctx.drawImage(logoSebe, 165, 565, 45, 11);
      
      // 绘制昵称  nickName
      ctx.setFontSize(16);
      ctx.setFillStyle('#fff');
      ctx.setTextAlign('left');
      ctx.fillText('珍珠数', 135, 502);
      // 绘制邀请用语
      ctx.setFontSize(18);
      ctx.setFillStyle('#50E3C2');
      ctx.setTextAlign('left');
      ctx.fillText(this.IPTNum, 188, 504);
      ctx.setFontSize(16);
      ctx.setFillStyle('#B3BFD0');
      ctx.setTextAlign('left');
      ctx.fillText('子城邀请你一起来领珍珠', 135, 530);
      //绘制最底部文字
      ctx.setFontSize(12);
      ctx.setFillStyle('#647893');
      ctx.setTextAlign('center');
      ctx.fillText('全球首个知识产权与创新保护共享生态通证', 187, 590);
      ctx.draw()
    },
    async canvasImg(){
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96
      }
      let self = this;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 750*scale,
        height: 1206*scale,
        destWidth: 750*scale,
        destHeight: 1206*scale,
        fileType: "jpg",
        quality: 1,
        canvasId: 'inviteCanvas',
        success(res) {
            console.log(res.tempFilePath,'测试01')
            self.saveImage(res.tempFilePath)
        }
      })
    },
    async saveImage(url){
      console.log(url,'生成的地址')
      wx.saveImageToPhotosAlbum({
        filePath: url,
        success (res) {
          wx.showToast({
            title: "保存成功"
          });
          console.log(res,'保存文件的路径')
        }
      })
    },
    // 查询IPT总数
    async getIptFn () {
      try {
        let resp = await this.API.my.iptStatisticsInfo();  //C端
        this.IPTNum = parseFloat(resp.totalScore).toFixed(4);
      }
      catch (e){}
    },
 
  },
  mounted(){
    this.getIptFn()
    this.getCodeImg();
    this.image();
    this.drawSharePicFn();
  }

}
</script>
<style lang="scss">
  .canvas{width: 750px;height: 1204px;margin-bottom: 98px;}
  .pearl_invite{font-size:0;position: relative;
    p{width:100%;height:98px;background:linear-gradient(90deg,rgba(114,225,161,1) 0%,rgba(91,223,203,1) 100%);position: fixed;bottom:0px;left:0;color:#fff;font-size:32px;text-align:center;line-height: 98px;}
  }
</style>
