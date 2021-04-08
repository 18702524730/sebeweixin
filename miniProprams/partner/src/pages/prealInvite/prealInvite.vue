<template>
<div class="pearl_invite">
  <canvas canvas-id="inviteCanvas" class="canvas"></canvas>
  <img v-if="shareImage" mode="widthFix" @click="preViewPic" :src="shareImage" :style="{width: imageSize.width + 'px'}" alt="">
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
      imageSize: '',
      codeImgUrl: '',
      IPTNum: '',
      bgUrl: '',
      wyUrl: '',
      shareAvaUrl: '',
      shareImage: '',
      imageCodeState: true
    }
  },
  async mounted(){
    // this.getCodeImg();
    this.imageCodeState = true;
    this.image();
    await this.getNum();
    this.drawSharePicFn();
  },
  methods: {
    // 缓存图片
    async downImg () {
      console.log('dowmLoading2')
      //获取网络图片本地路径
      let bgUrlData = await WXP.getImageInfo({
        src: inviteBgi // 分享背景图地址
      });
      let wyUrlData = await WXP.getImageInfo({
        src: logoSebe // 底部logo
      });

      let avaUrlData = await WXP.getImageInfo({
        src: this.$storage.get("auth").avatar.replace(/(hzsebetest.oss-cn-hangzhou|sebe360test.oss-cn-beijing).aliyuncs.com/, "ossfile.ipsebe.com") //服务器返回的图片地址
      });
   
      this.bgUrl = bgUrlData.path;
      this.wyUrl = wyUrlData.path;
      this.shareAvaUrl = avaUrlData.path;
    },
    // 获取珍珠
    async getNum () {
      try{
        let resp = await this.API.my.iptStatisticsInfo();  //B端
        this.IPTNum = parseFloat(resp.totalScore).toFixed(4);
      } catch (err) {

      }
    },
    // 获取验证码
    async getCodeImg() {
      let memberId = this.$storage.get('auth').member_id || '';
      if (!memberId) {
        wx.showModal({
          title: '提示',
          content: '用户ID获取失败，请退出重试！',
          showCancel: false,
          success: () => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        })
        return;
      }
      try{
        let data = await this.API.store.createwxaqrcode({
          miniAppSessionId: "wx10617813540e0d66_b1KmeZ6KzV1PYPkLD1x3PWVIsS14lsY6",
          miniAppType:5, // 2为拾贝微商城 3为推单助手wepy.$instance.globalData.miniAppType,
          qrcodeType: 2, // 1接口A,2 接口B,3 接口C 接口ABC的参数必传其一
          scene: memberId,
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
      }catch(err){
        this.imageCodeState = false
      }

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
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96;
      } else {
        scale = this.imageSize.width / 375;
      }
      console.log('scale', scale);
      await this.getCodeImg();
      if (!this.imageCodeState) {
        wx.showModal({
          title: '提示',
          content: '小程序二维码获取失败请返回重试！',
          showCancel: false,
          success: () => {
            this.imageCodeState = true;
            this.$router.go(-1);
          }
        })
        return;
      }
      await this.downImg();
      wx.showLoading({
        title: "正在生成图片...",
        mask: true
      });
      console.log('enter')
      let auth = this.$storage.get('auth');
      let nameText = auth.truename + '邀请你一起来领珍珠';
      console.log('nameText', nameText)
      let nameArr = []
      //为了防止昵称过长，分割字符串,每行12个
      for (let i = 0; i < nameText.length / 18; i++) {
        if (i > 2) {
          break;
        }
        nameArr.push(nameText.substr(i * 18, 18));
      }
      console.log('name', nameArr)
      let yOffset = 530;
      const ctx = wx.createCanvasContext('inviteCanvas');
      ctx.fillRect(0, 0, 375*scale, 667*scale);
      // 绘制头像，头像是方形的，为了维持圆形
      ctx.drawImage(this.shareAvaUrl, 76*scale, 488*scale, 50*scale, 50*scale);
      // 绘制二维码图片，因为二维码不是圆形，需要覆盖
      ctx.drawImage(this.codeImgUrl, 105*scale, 243*scale, 166*scale, 166*scale);
      // 绘制全局背景图
      ctx.drawImage(this.bgUrl, 0, 0, 375*scale, 667*scale);
      // 底部logo
      ctx.drawImage(this.wyUrl, 165*scale, 565*scale, 45*scale, 11*scale);
      
      // 绘制昵称  nickName
      ctx.setFontSize(16*scale);
      ctx.setFillStyle('#fff');
      ctx.setTextAlign('left');
      ctx.fillText('珍珠数', 135*scale, 502*scale);
      // 绘制邀请用语
      ctx.setFontSize(18*scale);
      ctx.setFillStyle('#50E3C2');
      ctx.setTextAlign('left');
      ctx.fillText(this.IPTNum, 188*scale, 504*scale);
      ctx.setFontSize(13*scale);
      ctx.setFillStyle('#B3BFD0');
      ctx.setTextAlign('left');

      nameArr.forEach(function(value) {
        ctx.setFontSize(13*scale);
        ctx.setFillStyle("#B3BFD0");
        ctx.setTextAlign("left");
        ctx.fillText(value, 135*scale, yOffset*scale);
        yOffset += 21*scale;
      });
      // ctx.fillText(auth.truename + '邀请你一起来领珍珠', 135, 530);
      //绘制最底部文字
      ctx.setFontSize(12*scale);
      ctx.setFillStyle('#647893');
      ctx.setTextAlign('center');
      ctx.fillText('全球首个知识产权与创新保护共享生态通证', 187*scale, 590*scale);
      ctx.draw();
      let self = this;
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 750*scale,
          height: 1334*scale,
          destWidth: 750*scale,
          destHeight: 1334*scale,
          fileType: "jpg",
          quality: 1,
          canvasId: 'inviteCanvas',
          success(res) {
              self.shareImage = res.tempFilePath;
              wx.hideLoading();
              console.log(self.shareImage,'测试01')
          }
        })
      }, 1500)

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
        height: 1334*scale,
        destWidth: 750*scale,
        destHeight: 1334*scale,
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
          wx.redirectTo({url: '/pages/my/my_IPT'})
          console.log(res,'保存文件的路径')
        }
      })
    },
    // 查询IPT总数
    async getIptFn () {
      try {
        let resp = await this.API.my.iptStatisticsInfo();  //B端
        this.IPTNum = parseFloat(resp.totalScore).toFixed(4);
      }
      catch (e){}
    },
 
  },
}
</script>
<style lang="scss">
  .canvas{width: 750px;height: 1334px;margin: 0 auto;position: fixed;top: 0;left: -750px;}
  .pearl_invite{font-size:0;padding-bottom: 98px;width: 750px;
    p{width:100%;height:98px;background:linear-gradient(90deg,rgba(114,225,161,1) 0%,rgba(91,223,203,1) 100%);position: fixed;bottom:0px;left:0;color:#fff;font-size:32px;text-align:center;line-height: 98px;z-index: 10}
  }
</style>
