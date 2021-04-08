<template>
  <div class="myWrap">
    <div class="myTitle">
      <div class="avator row-between" style="height: 67px;">
        <div class="lef_part row-start">
          <div class="img_box column-center" @click="goDetailFn(0)">
            <img :src="auth.avatar" class="img" alt="">
            <img src="~assets/img/my/real.png" alt="" class="status" v-if="auth.isAuthentication">
            <p class="status_null" v-if="!auth.isAuthentication">未认证</p>
          </div>
          <div class="nickname" @click="goDetailFn(0)">
            <div class="text">{{ auth.truename }}</div>
            <img src="~assets/img/icon/set.png" alt="">
          </div>
        </div>
        <div class="share_box" @click="invitePartnerFn">
          <img src="~assets/img/my/gold.gif" alt="">
          <span class="link">邀请好友开店</span>
        </div>
      </div>
      <div class="money">
        <p>本月入账（元）</p>
        <div class="num" @click="goDetailFn(10)">{{ personInfo.currMonthAccept || 0 }}</div>
      </div>
      <div class="titleBot">
        <div @click="goDetailFn(10)">
          <h2>{{ personInfo.cumulativeAccept || 0 }}</h2>
          <p class="o_7">累计入账（元）</p>
        </div>
        <div @click="goDetailFn(11)">
          <h2 class="o_8">{{ personInfo.nonAccept || 0 }}</h2>
          <p class="o_7">未入账（元）</p>
        </div>
      </div>
    </div>
    <div class="myAssets">
      <div class="title">
        <div class="my">我的资产</div>
        <div class="safe">资金账户安全保护中</div>
      </div>
      <div class="assetsContent">
        <div class="ye" @click="goDetailFn(12)">
          <h2>{{ personInfo.availableBalance || 0 }}</h2>
          <p ><span class="text">可用余额(元)</span></p>
        </div>
        <div class="myIpt">
          <h2 @click="goDetailFn(1)">{{ IPTNum }}</h2>
          <p @click="goDetailFn(1)" ><span class="text">我的珍珠</span></p>
        </div>
      </div>
    </div>
    <div class="orderDetail">
      <div class="orderTitle">
        <span class="orderTitDes">订单详情</span>
        <span class="orderTit" @click="goDetailFn(2)">查看更多订单<i class="icon iconfont icon-jiantou"/></span>
      </div>
      <div class="itemWrap">
        <div @click="goDetailFn(3)">
          <img src="~assets/img/my/confirmIcon.png" alt="">
          <p>待付款</p>
          <soan class="num" v-if="personInfo.waitPay">{{ personInfo.waitPay }}</soan>
        </div>
        <div @click="goDetailFn(4)">
          <img src="~assets/img/my/payIcon.png" alt="">
          <p>已付款</p>
          <soan class="num" v-if="personInfo.payed">{{ personInfo.payed }}</soan>
        </div>
        <div @click="goDetailFn(5)">
          <img src="~assets/img/my/tkIcon.png" alt="">
          <p>售后/退款</p>
        </div>
      </div>
    </div>
    <div class="process">
      <div class="proItem" @click="goDetailFn(6)">
        <i class="icon iconfont icon-fuwu icon1"></i>
        <p>服务/办理进度</p>
        <i class="icon iconfont icon-jiantou icon2"></i>
      </div>
      <div class="proItem" @click="goDetailFn(7)">
        <i class="icon iconfont icon-yaoqing icon1"></i>
        <p class="my_invite row-between">
          <span>我的邀请</span>
          <span v-if="personInfo.income">
            <img src="~assets/img/my/yqIcon.png" class="img" alt="">
            <span class="num">收益: {{ personInfo.income }}元</span>
          </span>
        </p>
        <i class="icon iconfont icon-jiantou icon2"></i>
      </div>
    </div>
    <div class="process process_bottom" >
      <div class="proItem" @click="goDetailFn(8)">
        <i class="icon iconfont icon-cailiaozhongxin icon1"></i>
        <p>材料中心</p>
        <i class="icon iconfont icon-jiantou icon2"></i>
      </div>
      <div class="proItem kefuItem" >
        <i class="icon iconfont icon-lianxikefu icon1"></i>
        <p>拾贝官方客服</p>
        <i class="icon iconfont icon-jiantou icon2"></i>
        <button open-type="contact" class="kefu" />
      </div>
      <div class="proItem" @click="goDetailFn(9)">
        <i class="icon iconfont icon-guanyu icon1"></i>
        <p>关于拾贝</p>
        <i class="icon iconfont icon-jiantou icon2"></i>
      </div>
    </div>

    <!-- 邀请好友开店 -->
    <transition-up :show="showBox" >
      <div class="transition_content">
        <div class="shareTitle">邀请好友开店</div>
        <div class="shareIcon">
          <button class="user" @click="shareFn" open-type="share">
            <img src="~assets/img/store/shareUser.png" alt="">
            <p>分享好友</p>
          </button>
          <div class="circle" @click="handleClickDraw">
            <img src="~assets/img/store/Moments.png" alt="">
            <p>分享朋友圈</p>
          </div>
        </div>
        <div class="btn"  @click="clickShareDia">取消</div>
        <span @click="clickShareDia">×</span>
      </div>
    </transition-up>

    <!-- 实名认证 -->
    <div class="realNameDia" v-if="realNameDiaState">
      <div class="mask">
        <div class="realNameWrap">

          <div class="dia">
            <img src="~assets/img/store/realname.png" />
            <h2>实名认证</h2>
            <p>您还未实名认证，请先进行实名认证！</p>
            <div class="realNameBtn" @click="$router.push('/pages/authorize/realName')">去认证</div>
          </div>
          <div class="canel" @click="realNameDiaState = false"><sebe-icon type="close" size="40" /></div>
        </div>
      </div>
    </div>

    <canvas v-if="cavansState" canvas-id="shareCanvas" class="canvas"></canvas>

    <!-- 底部公共导航 -->
    <footerNav :active.sync="footerActive" />
  </div>
</template>

<script>
import footerNav from 'components/footerNav';
export default {
  components: {
    footerNav
  },
  data () {
    return {
      footerActive: 4,
      auth: {},  //个人信息
      showBox: false,  //展示邀请好友开店弹窗
      codeImgUrl: '',  //二维码
      bgUrl: '',  //背景图临时路径
      headUrl: '',  //顶部背景图
      avatarUrl: '', //头像临时路径
      cavansState: false, //'是否显示canvas'
      personInfo: {},  //统计验收/可用余额/邀请
      IPTNum: 0,  //IPT
      realNameDiaState: false, //实名认证弹窗
    }
  },
  methods: {
    // 分享给好友
    shareFn (res) {
      this.showBox = false;
    },
    // 邀请好友开店
    invitePartnerFn () {
      if (!this.auth.isAuthentication) {
        this.realNameDiaState = true;
        return
      }
      this.showBox = true;
    },
    // 取消分享
    clickShareDia () {
      this.showBox = false;
    },
    goDetailFn (type) {
      let url = '';
      switch (type) {
        case 0: url = '/pages/my/setting'; break;   //个人信息设置
        case 1: url = '/pages/my/my_IPT'; break;
        case 2: url = '/pages/order/orderList'; break;  //全部订单
        case 3: url = '/pages/order/orderList?type=1'; break;  //待付款
        case 4: url = '/pages/order/orderList?type=2'; break;  //已付款
        case 5: url = '/pages/order/orderRefund'; break;  //售后、退款
        case 6: url = '/pages/serviceOrder/orderList'; break;  //服务单
        case 7: url = '/pages/my/invitation'; break;  //我的邀请
        case 8: url = '/pages/my/materialsCenter'; break;  //材料中心
        case 9: url = '/pages/my/aboutSebe'; break;  //关于拾贝
        case 10: url = '/pages/my/earningList?index=0'; break;  //累计入账
        case 11: url = '/pages/my/earningList?index=1'; break;  //未入账
        case 12: url = `/pages/my/balance?availableBalance=${this.personInfo.availableBalance}`; break;  //可用余额
      }
      // 可用余额
      if (type == 12 && !this.auth.isAuthentication) {
        this.realNameDiaState = true;
        return
      }
      this.$router.push({ path: url});
    },
    // 查询IPT总数
    async getIptFn () {
      try {
        let resp = await this.API.my.iptStatisticsInfo();  //B端
        this.IPTNum = parseFloat(resp.totalScore).toFixed(2);
      }
      catch (e){}
    },
    async getMyStatisticFn () {
      try {
        let resp = await this.API.my.myStatistic({interfaceType: 1});  //B端
        this.personInfo = resp;
        for( let key in this.personInfo) {
          if (this.personInfo[key] && key=='availableBalance' || key=='cumulativeAccept' || key=='currMonthAccept' || key=="nonAccept") {
            this.personInfo[key] = this.personInfo[key].toFixed(2);
          }
        }
      }
      catch (e){}
    },
    // 获取图片临时路径
    async downImg () {
      let avavtar = this.$storage.get('auth').avatar;
      let bgUrl = await WXP.getImageInfo({
        src: 'https://testossfile.ipsebe.com/79BE737C5DB5B68C68D3A1114335C50F.jpg'   //背景图
      })
      let headData = await WXP.getImageInfo({
        // src: 'https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/DB9CD5FAE42EEFCDA112FA1830254A8B.png' // 分享背景图地址
        src: 'https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/C5EC74375596C19267B55A3E667C04C2.png'
      });
      let wyUrlData = await WXP.getImageInfo({
        src: avavtar //头像地址
      });
      this.bgUrl = bgUrl.path;
      this.headUrl = headData.path;
      this.avatarUrl = wyUrlData.path;
    },
    // 分享朋友圈
    async handleClickDraw () {
      this.showBox = false;
      await this.downImg();  //获取图片临时路径
      await this.getCodeImg(); //二维码
      this.cavansState = true;  //显示canvas
      wx.showLoading({
        title: '正在生成图片...',
        mask: true,
      });
      let data = {
        bgUrl: this.bgUrl,
        headUrl: this.headUrl,
        avatarUrl: this.avatarUrl,
        nickName: this.auth.nickname,
        codeImgUrl: this.codeImgUrl
      }
      this.drawSharePicFn(data);
    },
    // 获取二维码
    async getCodeImg () {
      let memberId = this.$storage.get('auth').member_id;
      let data = await this.API.store.createwxaqrcode({
        miniAppType: 5,  // 5.合伙人B端
        miniAppSessionId: this.$storage.get('sessionId'),
        path: 'pages/authorize/authorize',
        qrcodeType: 2,
        width: 110,
        scene: `memberId=${memberId}`,
        auto_color: false,
        line_color: {"r":"47","g":"128","b":"246"}
      })
      let codeUrlData = await WXP.getImageInfo({
        src: data.imageurl //服务器返回的图片地址
      });
      this.codeImgUrl = codeUrlData.path;
    },
    async drawSharePicFn (item) {
      const ctx = wx.createCanvasContext('shareCanvas');
      // 绘制全局背景图
      ctx.drawImage(item.bgUrl, 0, 0, 375, 667);
      // 绘制头像
      ctx.drawImage(item.avatarUrl, 148, 291, 80, 80);
      // 绘制中间背景图
      ctx.drawImage(item.headUrl, 0, 25, 375, 618);
      // // 绘制底部矩形背景
      // ctx.rect(15, 400, 345, 255);
      // ctx.setFillStyle('#fff');
      // ctx.fill();
      // 绘制昵称  nickName
      ctx.setFontSize(18);
      ctx.setFillStyle('#333');
      ctx.setTextAlign('center');
      // let marLef = (375 - ctx.measureText(item.nickName).width)/2;
      ctx.fillText(item.nickName, 187, 385);
      // 绘制邀请用语
      ctx.setFontSize(15);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('center');
      ctx.fillText('我在【拾贝宝】开店赚钱，邀请你', 187, 418);
      ctx.setFontSize(15);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('center');
      ctx.fillText('一起加入哦！', 187, 438);
      // 绘制二维码图片
      ctx.drawImage(item.codeImgUrl, 132, 450, 110, 110);
      //绘制最底部文字
      ctx.setFontSize(12);
      ctx.setFillStyle('#999');
      ctx.setTextAlign('center');
      ctx.fillText('长按识别二维码', 187, 575);

      ctx.draw()

      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout( () => {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 375,
            height: 667,
            destWidth: 1500,
            destHeight: 2668,
            fileType: 'jpg',
            quality: 1,
            canvasId: 'shareCanvas',
            success: res => {
                this.shareImage = res.tempFilePath
                this.showSharePic = true
                wx.hideLoading();
                this.savePicToAlbum(res.tempFilePath)
                this.cavansState = false
            },
            fail: function (res) {
                console.log(res)
                wx.hideLoading();
            }
        })
      }, 2000);

      // var rectBot = this.Rect(15, 375, 306, 255);
      // this.drawRoundedRect(rectBot, 4, ctx, 'rgba(64,85,196,0.14)', 'rgba(255,255,255,0.6)');

    },
    savePicToAlbum(tempFilePath) {
      let that = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath,
                  success(res) {
                    wx.showToast({
                      title: '保存成功'
                    });
                  },
                  fail(res) {
                    console.log(res);
                  }
                })
              },
              fail() {
                // 用户拒绝授权,打开设置页面
                wx.openSetting({
                  success: function (data) {
                    console.log("openSetting: success");
                  },
                  fail: function (data) {
                    console.log("openSetting: fail");
                  }
                });
              }
            })
          } else {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功',
                });
              },
              fail(res) {
                console.log(res);
              }
            })
          }
        },
        fail(res) {
          console.log(res);
        }
      })
    },
    Rect(x, y, w, h) {
      return {x:x, y:y, width:w, height:h};
    },
    Point (x, y) {
      return {x:x, y:y};
    },
    drawRoundedRect (rect, r, ctx, shadow, fillStyle) {
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
      ctx.fillStyle = fillStyle ? fillStyle : '#fff';
      ctx.setShadow(0, 15, 28, shadow);
      // ctx.stroke(); // 线框
      ctx.fill() // 填充
    },
  },
  mounted () {
    this.getMyStatisticFn();  //查询统计验收/可用余额/邀请
    this.getIptFn();  //查询IPT
    this.auth = this.$storage.get('auth');
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
}
</script>

<style lang="scss">
.myWrap{
  padding-bottom: 110px; min-height: 100%;
  .myTitle{background: url(~assets/img/my/bg.jpg) no-repeat;
    .avator{padding: 25px 0 0 30px; width: 100%; align-items: flex-start;
      .lef_part {
        width: 500px; align-items: flex-start;
        .img_box {
          width:100px;
          .img {width: 100px; height: 100px; border-radius: 50%; border: 4px solid #95C3FD;}
          .status {width: 128px; height: 36px; margin-top: -18px;}
          .status_null {width: 100px; height: 36px; line-height: 36px; text-align: center; background: #BEBEBE; color: #fff; font-size: 24px; margin-top: -18px; border-radius: 18px; }
        }
        .nickname {
          max-width: 400px; line-height: 56px;  padding-left: 15px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;
          .text {max-width: 344px; font-size: 30px; color: #fff; vertical-align: middle; overflow:hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block;}
          img {width: 30px; height: 30px; margin-left: 10px; vertical-align: middle;}
        }
      }
      .share_box {
        width: 210px; height: 56px; line-height: 56px; border-radius:28px; border-top-right-radius: 0; border-bottom-right-radius: 0; text-align: center; background: #0083F6; padding-right: 10px;
        img {width: 36px; height: 36px; display: inline-block; vertical-align: middle; margin-right: 10px; margin-left:10px; margin-bottom: 5px; }
        .link {font-size: 22px; color: #fff; }
      }
      /*>div{position: relative;
        h3{font-size: 30px;line-height: 56px;color: #fff;padding-left: 15px;}
        >div{position: absolute;top: 0;line-height: 56px;right: 0;border-radius: 28px 0 0 28px;background:rgba(0,131,246,1);
          font-size: 22px;color: #fff;padding:  0 10px;
        }
      }*/
    }
    .money{text-align: center;
      .num {font-size: 64px;color: #fff;line-height: 90px;padding-bottom: 40px;}
      p {font-size: 28px;line-height: 40px;color: rgba(255, 255, 255, .5);}
    }
    .titleBot{display: flex;background:rgba(0,121,255,0.5);padding: 25px 0 24px;
      >div{flex: 1;text-align: center;
        h2{font-size: 36px;line-height: 50px;color:#fff;padding-bottom: 8px;}
        p{font-size:26px;line-height: 37px;color: rgba(255, 255, 255, 0.8);}
        .o_8 {opacity: 0.8;}
        .o_7 {opacity: 0.7;}
      }
    }
  }
  .myAssets{background: #fff;padding: 0 20px; margin-top: 20px;
    .title{display: flex; line-height: 90px;border-bottom:1px solid #eee;margin-bottom: 30px;
      .my{flex-grow: 1;font-size: 28px;color: #333;}
      .safe{font-size: 24px;color: #40BE46;}
    }
    .assetsContent{display: flex;padding-bottom: 33px;
      >div{flex: 1;text-align: center;
        h2{line-height: 50px;font-size: 36px;color: #2f80f6;font-weight: 500;margin-bottom: 13px;}
        p{
          .text {line-height: 40px;font-size: 28px;color: #999; vertical-align: middle;}
          .icon{display: inline;font-size: 36px;transform: translateY(-4px); color: #999; vertical-align: middle;}
        }
      }
      .ye{padding-right: 20px;border-right:1px solid #eee;

      }
      .myIpt{padding-left: 20px;}
    }
  }
  .orderDetail{background: #fff;margin-top: 20px;padding: 0 20px;
    .orderTitle{line-height: 90px;display: flex;border-bottom:1px solid #eee;
      .orderTitDes{font-size: 28px;color: #333;flex-grow: 1;}
      .orderTit{font-size: 24px;color: #999; padding-right: 10px; display: flex;
        .icon{font-size: 20px;height: 90px;color:#ddd;margin-left: 15px;}
      }
    }
    .itemWrap{display: flex;padding: 20px 0 30px;
      >div{flex: 1;text-align:center;font-size: 0; position: relative;
        img{ width: 58px;height: 58px; position: relative;}
        p{line-height: 40px;font-size: 28px;color: #999;}
        .num {position: absolute; top: 1px; left: 53%; border:1px solid #5CB7FB; padding:0 8px; height: 30px; line-height: 28px; border-radius: 50%; background: #fff; text-align: center; font-size: 20px; color: #2F80F6; }
      }
    }
  }
  .process{margin:  20px 0;background: #fff;
    >div{
      line-height: 90px;border-bottom:1px solid #eee;display: flex;padding: 0 30px 0 0; margin-left: 40px;
      &:last-child {border-bottom: none;}
      .icon1{font-size: 44px;height: 90px;color: #999;width: 40px; margin-left: -10px;}
      p{flex-grow: 1;font-size: 28px;color:#333;padding-left: 20px;}
      .my_invite {
        .img {width: 48px; height: 64px; vertical-align: middle;}
        .num {color: #FF402A; font-size: 26px; margin: 0 10px;}
      }
      .icon2{font-size: 20px;height: 90px;color: #ddd;}
    }
    .kefuItem {
      position: relative;
      .kefu {position:absolute; width:100%; height:90px; opacity: 0;}
    }
  }
  .realNameDia {
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      overflow: hidden;
      z-index: 9000;
      color: #fff;
    }
    .realNameWrap {
      position: absolute;
      top: 50%;
      left: 50%;
      right: 0;
      margin-left: -260px;
      height: auto;
      transform: translateY(-50%);
      z-index: 12000;

      .dia {
        background: #fff;
        width: 520px;
        height: 585px;
        border-radius: 12px;
        margin-bottom: 60px;
        text-align: center;
        padding: 56px 70px 0;
        > img {
          width: 285px;
          height: 184px;
        }
        h2 {
          font-size: 34px;
          line-height: 48px;
          font-weight: 600;
          color: #333;
          padding-top: 20px;
        }
        p {
          font-size: 28px;
          color: #999;
          line-height: 40px;
          padding: 20px 0 30px;
        }
        .realNameBtn {
          height: 84px;
          line-height: 84px;
          background: #2f80f6;
          border-radius: 42px;
          font-size: 32px;
          color: #fff;
        }
      }
      .canel {
        width: 98px;
        height: 98px;
        border-radius: 49px;
        background: #fff;
        margin-left: 210px;
        text-align: center;
        line-height: 90px;
        position: relative;
        &:after {
          position: absolute;
          top: -60px;
          left: 48px;
          height: 60px;
          width: 1px;
          border-left:1px dashed #eee;
          content: "";
        }
      }
    }
  }
  .transition_content{position: relative;text-align: center;
    .shareTitle{color: #333;font-size: 32px;line-height: 45px;padding: 60px 0 40px;}
    .shareIcon{display: flex;padding-left: 110px;
      >div, >.user{font-size: 0;padding: 0 65px;border: none;
        img{height: 120px;width: 120px;}
        p{font-size: 30px;color:#333;line-height: 42px;padding: 20px 0 60px;}
      }
    }
    >span{position: absolute;width: 90px;height: 90px;line-height: 90px;font-size: 60px;right: 0;z-index: 1002;top: 0;color: #ddd;}
    .btn{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);height: 98px;line-height: 98px;color: #fff;font-size: 32px;}
  }
  .canvas{width: 750px;height: 1334px;position: fixed;left: -750px; top: 0; }
}

</style>
