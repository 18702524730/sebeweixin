<template>
  <div class="canvasWrap">
    <canvas canvas-id="shareCanvas" @click="preViewPic" @longtap="savePicToAlbum(shareImage)" class="sharecanvas"></canvas>
    <img v-if="shareImage" mode="widthFix" @click="preViewPic" :src="shareImage" :style="{width: imageSize.width + 'px'}" alt="">
    <!-- <div class="test" @click="imitation">模拟打开C端</div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      bgUrl: '',
      wyUrl: '',
      shareAvaUrl: '',
      productUrl: '',
      shareImage: '',
      showSharePic: false,
      codeImgUrl: '',
      storeInfo: {},
      imageSize: '',
      imageCodeState: true // 二维码下载状态，下载失败时变成false
    }
  },
  components: {

  },
  onLoad () {
    this.shareImage = ''
  },
  mounted () {
    this.storeInfo = this.$route.query
    this.storeInfo = Object.assign({}, this.storeInfo, this.$route.query)
    this.image()
    if (this.$route.query.productNum) {
      this.drawSharePic2(this.storeInfo)
    } else if (this.$route.query.memberId) {
      this.$storage.get('invitPic') ? this.shareImage = this.$storage.get('invitPic') : this.drawSharePicFn()
    } else {
      this.$storage.get('storePic') ? this.shareImage = this.$storage.get('storePic') : this.drawSharePic()
    }
    console.log(this.storeInfo)
  },
  methods: {
    // 模拟分享
    imitation() {
      let sense, path;
      if (this.$route.query.productNum) {
        sense = this.$storage.get("storeInfo").storeCode + "_" + this.$route.query.productNum
        path = 'pages/store/serviceDetail'
      } else {
        sense = this.storeInfo.storeCode
        path = 'pages/store/index'
      }
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
          console.log("windowWidth: " + windowWidth);
          console.log("windowHeight: " + windowHeight);
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
      console.log("缩放后的宽: " + imageSize.imageWidth);
      console.log("缩放后的高: " + imageSize.imageHeight);
      this.imageSize = imageSize
      // return imageSize;
    },
    preViewPic () {
      wx.previewImage({
        urls: [this.shareImage],
      });
    },
    async downImg2(item) {
      console.log('dowmLoading2')
      //获取网络图片本地路径
      let bgUrlData = await WXP.getImageInfo({
        // "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/15F0634237B29FEB66234269F96D7D76.jpg"
        src:
          "https://ossfile.ipsebe.com/15F0634237B29FEB66234269F96D7D76.jpg" // 分享背景图地址
      });
      let wyUrlData = await WXP.getImageInfo({
        // "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/003057BE8C58A9528EA7EE04C1BA95B5.png"
        src:
          "https://ossfile.ipsebe.com/EC6E2BAD8FE6046B92D28A4D35EB9279.png" //分享屋檐背景图地址
      });
      // str.replace(/Microsoft/, "W3School")
      console.log('avatar', this.$storage.get("storeInfo").avatar)
      let avaUrlData; // replace((/(hzsebetest.oss-cn-hangzhou|sebe360test.oss-cn-beijing).aliyuncs.com/)
      avaUrlData = await WXP.getImageInfo({
        src: this.$storage.get("storeInfo").avatar.replace(/(hzsebetest.oss-cn-hangzhou|sebe360test.oss-cn-beijing).aliyuncs.com/, "ossfile.ipsebe.com") //服务器返回的图片地址
      });
   
      // productDetail.picture
      console.log('productUrl', item.picture)
      let productUrlData = await WXP.getImageInfo({
        src: item.picture.replace(/sebe360test.oss-cn-beijing.aliyuncs.com/, 'ossfile.ipsebe.com') //服务器返回的图片地址
      });
      console.log('productUrlData', productUrlData)
      this.bgUrl = bgUrlData.path;
      this.wyUrl = wyUrlData.path;
      this.shareAvaUrl = avaUrlData.path;
      this.productUrl = productUrlData.path
    },
    async drawSharePic2(item) {
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96
      }
      await this.getCodeImg("pages/store/serviceDetail", item.productNum);

      // 如果二维码下载失败，刷新重试
      if (!this.imageCodeState) {
        console.log('二维码下载失败，刷新重试')
        wx.showModal({
          title: '提示',
          content: '分享链接获取失败请关闭页面重试',
          showCancel: false,
          success: () => {
            this.imageCodeState = true;
            this.$router.go(-1);
          }
        })
        return
      }

      wx.showLoading({
        title: "正在生成图片...",
        mask: true
      });
      await this.downImg2(item);
      //y方向的偏移量，因为是从上往下绘制的，所以y一直向下偏移，不断增大。
      let yOffset = 0;
      const goodsTitle = item.introduce || "";
      let goodsTitleArray = [];
      //为了防止标题过长，分割字符串,每行18个
      for (let i = 0; i < goodsTitle.length / 16; i++) {
        if (i > 2) {
          break;
        }
        goodsTitleArray.push(goodsTitle.substr(i * 16, 16));
      }
      const price = item.salePrice;
      const storeName = this.$storage.get("storeInfo").storeName;

      const canvasCtx = wx.createCanvasContext("shareCanvas");

      canvasCtx.setFillStyle("white");
      canvasCtx.fillRect(0, 0, 375*scale, 667*scale);
      canvasCtx.drawImage(this.bgUrl, 0, 0, 375*scale, 667*scale);

      // 接口传入的图片,店铺logo
      canvasCtx.drawImage(this.shareAvaUrl, 37*scale, 52.5*scale, 75*scale, 75*scale);
      // canvasCtx.drawImage(logo, 150, 143, 75, 75);
      // 绘制屋檐的图片
      canvasCtx.drawImage(this.wyUrl, -11*scale, 20*scale, 396*scale, 642*scale);
      canvasCtx.setFontSize(14*scale);
      canvasCtx.setFillStyle("#333");
      canvasCtx.setTextAlign("left");
      canvasCtx.fillText(storeName, 118*scale, 95*scale);
      // 接口传入的图片,商品图片
      canvasCtx.drawImage(this.productUrl, 37*scale, 145*scale, 300*scale, 300*scale);
      // 绘制商品标题
      canvasCtx.setFontSize(16*scale);
      canvasCtx.setFillStyle("#333333");
      canvasCtx.setTextAlign("left");
      yOffset = 475*scale;
      canvasCtx.fillText(item.productName, 37*scale, yOffset);
      yOffset += 26*scale;
      goodsTitleArray.forEach(function(value) {
        canvasCtx.setFontSize(12*scale);
        canvasCtx.setFillStyle("#999");
        canvasCtx.setTextAlign("left");
        canvasCtx.fillText(value, 37*scale, yOffset);
        yOffset += 21;
      });
      //绘制最底部文字
      canvasCtx.setFontSize(12*scale);
      canvasCtx.setFillStyle("#8E9DB4");
      canvasCtx.setTextAlign("center");
      canvasCtx.fillText("注：长按识别图中二维码", 187*scale, 634*scale);
      // 绘制价格
      yOffset += 17*scale;
      canvasCtx.setFontSize(12*scale);
      canvasCtx.setFillStyle("#F64744");
      canvasCtx.setTextAlign("left");
      canvasCtx.fillText("￥", 37*scale, yOffset);
      canvasCtx.setFontSize(24*scale);
      canvasCtx.setFillStyle("#F64744");
      canvasCtx.setTextAlign("left");
      canvasCtx.fillText(price, 48*scale, yOffset);
      // 绘制二维码
      canvasCtx.drawImage(this.codeImgUrl, 247*scale, 488*scale, 90*scale, 90*scale);
      canvasCtx.draw();

      let that = this;
      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 375*scale,
          height: 667*scale,
          destWidth: 1125*scale,
          destHeight: 2001*scale,
          fileType: "jpg",
          quality: 0.3,
          canvasId: "shareCanvas",
          success: res => {
            this.shareImage = res.tempFilePath;
            this.showSharePic = true;
            wx.hideLoading();
            // this.savePicToAlbum(res.tempFilePath);
          },
          fail: function(res) {
            wx.hideLoading();
          }
        });
      }, 1500);
    },
    // 获取验证码
    async getCodeImg(path, num) {
      let scene, miniAppType;
      let memberId = this.$storage.get('auth').member_id;
      console.log('memberId', memberId, this.$storage.get('auth'))
      if (path == 'pages/authorize/authorize') {
        scene = num;
        miniAppType = 5
      } else {
        miniAppType = 6
        num ? scene = this.$storage.get("storeInfo").storeCode + "_" + num + "_" + memberId :
              scene = this.storeInfo.storeCode + "_" + memberId
      }
      console.log('path_scene_num:', path, scene, num)
      try {
        let data = await this.API.store.createwxaqrcode({
          // miniAppSessionId: "wx10617813540e0d66_b1KmeZ6KzV1PYPkLD1x3PWVIsS14lsY6",
          miniAppType, // 2为拾贝微商城 3为推单助手wepy.$instance.globalData.miniAppType,
          qrcodeType: 2, // 1接口A,2 接口B,3 接口C 接口ABC的参数必传其一
          scene,
          path, // 2接口B不能带参数，需传scene。接口A和接口C需要带参数
          width: 420,
          auto_color: false,
          line_color: { r: "47", g: "128", b: "246" }
        });
        let codeUrlData = await WXP.getImageInfo({
          src: data.imageurl //服务器返回的图片地址
        });
        this.codeImgUrl = codeUrlData.path;
      } catch (e) {
        console.log('eeee', e)
        this.imageCodeState = false
      }
    },
    savePicToAlbum(tempFilePath) {
      let that = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath || that.shareImage,
                  success(res) {
                    wx.showToast({
                      title: "保存成功"
                    });
                  },
                  fail(res) {
                    console.log(res);
                  }
                });
              },
              fail() {
                // 用户拒绝授权,打开设置页面
                wx.openSetting({
                  success: function(data) {
                    console.log("openSetting: success");
                  },
                  fail: function(data) {
                    console.log("openSetting: fail");
                  }
                });
              }
            });
          } else {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath || that.shareImage,
              success(res) {
                wx.showToast({
                  title: "保存成功"
                });
              },
              fail(res) {
                console.log(res);
              }
            });
          }
        },
        fail(res) {
          console.log(res);
        }
      });
    },
    Point(x, y) {
      return { x: x, y: y };
    },
    drawRoundedRect(rect, r, ctx, shadow, fillStyle) {
      var ptA = this.Point(rect.x + r, rect.y);
      var ptB = this.Point(rect.x + rect.width, rect.y);
      var ptC = this.Point(rect.x + rect.width, rect.y + rect.height);
      var ptD = this.Point(rect.x, rect.y + rect.height);
      var ptE = this.Point(rect.x, rect.y);

      ctx.beginPath();

      ctx.moveTo(ptA.x, ptA.y);
      ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
      ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
      ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
      ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
      ctx.fillStyle = fillStyle ? fillStyle : "#fff";
      ctx.setShadow(0, 15, 28, shadow);
      // ctx.stroke(); // 线框
      ctx.fill(); // 填充
    },

    Rect(x, y, w, h) {
      return { x: x, y: y, width: w, height: h };
    },
    async downImg(type) {
      //获取网络图片本地路径

      let bgUrlData = await WXP.getImageInfo({
        src: "https://ossfile.ipsebe.com/79BE737C5DB5B68C68D3A1114335C50F.jpg" // 分享背景图地址
      });

      let wyUrlData, avaUrlData;
      if (type) {
        wyUrlData = await WXP.getImageInfo({
          // https://sebe360test.oss-cn-beijing.aliyuncs.com/BB3288E83FFB08746BADFCB5091A075A.png // 原来的邀请开店图片 AC26AB2AA8E9A0A424D9175E0F3B0EE4
          // 邀请得88元背景 https://ossfile.ipsebe.com/AC26AB2AA8E9A0A424D9175E0F3B0EE4.png // 
          // https://ossfile.ipsebe.com/BB3288E83FFB08746BADFCB5091A075A.png
          src: "https://ossfile.ipsebe.com/F6439FCF48D80F797F2F56BF09F872A5.png" //邀请开店背景图地址
        });
        console.log('wyUrlData',wyUrlData)

        if (this.$storage.get('auth').avatar.indexOf('hzsebetest') != -1) {
          avaUrlData = await WXP.getImageInfo({
            src: this.$route.query.avatar.replace(/hzsebetest.oss-cn-hangzhou.aliyuncs.com/, "testossfile.ipsebe.com") //服务器返回的图片地址
          });
          console.log('avaUrlData',avaUrlData)
        } else {
          avaUrlData = await WXP.getImageInfo({
            src: this.$route.query.avatar.replace(/sebe360test.oss-cn-beijing.aliyuncs.com/, "ossfile.ipsebe.com") //服务器返回的图片地址
          });
           console.log('avaUrlData',avaUrlData)
        }
      } else {
        wyUrlData = await WXP.getImageInfo({
          src: "https://ossfile.ipsebe.com/4B5498BD5AE7C25C0C2826A182BACF38.png" //分享屋檐背景图地址
        });
        if (this.$storage.get("storeInfo").avatar.indexOf('hzsebetest') != -1) {
          avaUrlData = await WXP.getImageInfo({
            src: this.storeInfo.avatar.replace(/hzsebetest.oss-cn-hangzhou.aliyuncs.com/, "testossfile.ipsebe.com") //服务器返回的图片地址
          });
        } else {
          avaUrlData = await WXP.getImageInfo({
            src: this.storeInfo.avatar.replace(/sebe360test.oss-cn-beijing.aliyuncs.com/, "ossfile.ipsebe.com") //服务器返回的图片地址
          });
        }
      }
      this.bgUrl = bgUrlData.path;
      this.wyUrl = wyUrlData.path;
      this.shareAvaUrl = avaUrlData.path;
      console.log('asda', this.bgUrl, this.wyUrl, this.shareAvaUrl)
    },
    async drawSharePicFn () {
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96
      }
      await this.getCodeImg("pages/authorize/authorize", this.$route.query.memberId);
      // 如果二维码下载失败，刷新重试
      if (!this.imageCodeState) {
        console.log('二维码下载失败，刷新重试')
        wx.showModal({
          title: '提示',
          content: '分享链接获取失败请关闭页面重试',
          showCancel: false,
          success: () => {
            this.imageCodeState = true;
            this.$router.go(-1);
          }
        })
        return
      }
      wx.showLoading({
        title: "正在生成图片...",
        mask: true
      });
      await this.downImg(true)
      const ctx = wx.createCanvasContext('shareCanvas');
      // 绘制背景色
      ctx.rect(0, 0, 375*scale, 667*scale);
      ctx.setFillStyle('White');
      ctx.fill();
      // ctx.drawImage(this.bgUrl, 0, 0, 375*scale, 667*scale);
      // 绘制头像
      ctx.drawImage(this.shareAvaUrl, 148*scale, 286*scale, 80*scale, 80*scale);

      // 绘制全局背景图

      ctx.drawImage(this.wyUrl, 0, 0, 375*scale, 667*scale);
      // 绘制二维码图片 
      ctx.drawImage(this.codeImgUrl, 132*scale, 450*scale, 110*scale, 110*scale);
      /*
      // 绘制中间背景图
      ctx.drawImage(this.wyUrl, 0, 25*scale, 375*scale, 618*scale);
      */
      // 绘制昵称  nickName
      ctx.setFontSize(18*scale);
      ctx.setFillStyle('#333');
      ctx.setTextAlign('center');
      ctx.fillText(this.$route.query.nickName, 187*scale, 385*scale);
      // 绘制邀请用语
      ctx.setFontSize(15*scale);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('center');
      ctx.fillText('我在【拾贝宝】开店赚钱，邀请你', 187*scale, 418*scale);
      ctx.setFontSize(15*scale);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('center');
      ctx.fillText('一起加入哦！', 187*scale, 438*scale);
      /*
      // 绘制二维码图片 
      ctx.drawImage(this.codeImgUrl, 132*scale, 500*scale, 110*scale, 110*scale);
      */
      //绘制最底部文字
      ctx.setFontSize(12*scale);
      ctx.setFillStyle('#999');
      ctx.setTextAlign('center');
      ctx.fillText('长按识别二维码', 187*scale, 585*scale);

      ctx.draw()

      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout( () => {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 375*scale,
            height: 667*scale,
            destWidth: 1125*scale,
            destHeight: 2001*scale,
            fileType: 'jpg',
            quality: 0.3,
            canvasId: 'shareCanvas',
            success: res => {
                this.shareImage = res.tempFilePath
                this.showSharePic = true
                wx.hideLoading();
                this.$storage.set('invitPic', res.tempFilePath)
                // this.savePicToAlbum(res.tempFilePath)
            },
            fail: function (res) {
                wx.hideLoading();
            }
        })
      }, 1500);   
    },
    async drawSharePic(goodsPicPath) {
      console.log('drawSharePic 商品')
      let scale = 1;
      if (this.imageSize.width === 320) {
        scale = 0.853;
      } else if (this.imageSize.width === 360) {
        scale = 0.96
      }
      this.shareDiaState = false;
      await this.getCodeImg("pages/store/index");

      // 如果二维码下载失败，刷新重试
      if (!this.imageCodeState) {
        console.log('二维码下载失败，刷新重试')
        wx.showModal({
          title: '提示',
          content: '分享链接获取失败请关闭页面重试',
          showCancel: false,
          success: () => {
            this.imageCodeState = true;
            this.$router.go(-1);
          }
        })
        return
      }

      wx.showLoading({
        title: "正在生成图片...",
        mask: true
      });
      await this.downImg();

      //y方向的偏移量，因为是从上往下绘制的，所以y一直向下偏移，不断增大。
      let yOffset = 0;
      const goodsTitle = "邀请您参观TA的店~";
      let goodsTitleArray = [];
      //为了防止标题过长，分割字符串,每行18个
      for (let i = 0; i < goodsTitle.length / 17; i++) {
        if (i > 2) {
          break;
        }
        goodsTitleArray.push(goodsTitle.substr(i * 17, 17));
      }

      const storeName = this.storeInfo.storeName;

      const canvasCtx = wx.createCanvasContext("shareCanvas");
      // ctx.textBaseline = 'middle'
      //绘制背景

      canvasCtx.setFillStyle("white"); // 0px 30px 56px 0px rgba(61,82,190,0.17);

      canvasCtx.fillRect(0, 0, 375*scale, 667*scale);
      // 绘制背景图
      canvasCtx.drawImage(this.bgUrl, 0, 0, 375*scale, 667*scale);
      //绘制尾部

      var rectBot = this.Rect(35*scale, 235*scale, 306*scale, 402*scale);
      this.drawRoundedRect(
        rectBot,
        4,
        canvasCtx,
        "rgba(64,85,196,0.14)",
        "rgba(255,255,255,0.6)"
      );

      // 绘制boxshadow
      var rect = this.Rect(18*scale, 111*scale, 340*scale, 506*scale); //      canvasCtx.fillRect(18, 111, 340, 506);
      this.drawRoundedRect(rect, 4, canvasCtx, "rgba(61,82,190,0.17)");
      // canvasCtx.draw(true)

      // 绘制灰色背景
      canvasCtx.fillStyle = "#F6F9FF";
      canvasCtx.setShadow(0, 0, 0, "#fff");
      canvasCtx.fillRect(18*scale, 111*scale, 340*scale, 148*scale);

      // 接口传入的图片,店铺logo
      canvasCtx.drawImage(this.shareAvaUrl, 150*scale, 143*scale, 75*scale, 75*scale);
      // canvasCtx.drawImage(logo, 150, 143, 75, 75);
      //绘制屋檐的图片 https://testossfile.ipsebe.com/4B5498BD5AE7C25C0C2826A182BACF38.png
      canvasCtx.drawImage(this.wyUrl, 8*scale, 45*scale, 360*scale, 215*scale);
      canvasCtx.setFontSize(13*scale);
      canvasCtx.setFillStyle("#666");
      canvasCtx.setTextAlign("center");
      canvasCtx.fillText(storeName, 187*scale, 240*scale);
      //绘制商品标题
      yOffset = 300*scale;
      goodsTitleArray.forEach(function(value) {
        canvasCtx.setFontSize(20*scale);
        canvasCtx.setFillStyle("#333333");
        canvasCtx.setTextAlign("center");
        canvasCtx.fillText(value, 187*scale, yOffset);
        yOffset += 21*scale;
      });
      //绘制最底部文字
      canvasCtx.setFontSize(13*scale);
      canvasCtx.setFillStyle("#bbb");
      canvasCtx.setTextAlign("center");
      canvasCtx.fillText("长按识别图中二维码", 187*scale, 586*scale);
      // 绘制二维码
      yOffset += 5*scale;
      canvasCtx.drawImage(this.codeImgUrl, 83*scale, yOffset, 210*scale, 210*scale);
      canvasCtx.draw();
      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 375*scale,
          height: 667*scale,
          destWidth: 1125*scale,
          destHeight: 2001*scale,
          fileType: "jpg",
          quality: 0.3,
          canvasId: "shareCanvas",
          success: res => {
            this.shareImage = res.tempFilePath;
            console.log(this.shareImage)
            this.showSharePic = true;
            this.$storage.set('storePic', res.tempFilePath)
            wx.hideLoading();
            // 这里保存图片
            // this.savePicToAlbum(res.tempFilePath);
          },
          fail: function(res) {
            console.log(res);
            wx.hideLoading();
          }
        });
      }, 1500);
    }
  },
}
</script>

<style lang="scss">
.canvasWrap{width: 750px;position: relative;
  .test{position: absolute;top: 50px;width: 750px;line-height: 60px;font-size: 28px;color: #333;left: 0;text-align: center;}
  .sharecanvas{width: 750px;height: 1334px;margin: 0 auto;position: fixed;top: 0;left: -750px;}
  img{margin: 0 auto;display: block;}
}

</style>
