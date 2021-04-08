<template>
  <div class="myWrap">
    <div class="myTitle">
      <div class="avator row-between" >
        <div class="lef_part row-start">
          <div class="img_box column-center">
            <img :src="auth.avatar" class="img" alt="">
          </div>
          <div class="nickname_box ">
            <p class="nickname" @click="goDetailFn(1)">
              <span class="text">{{ auth.nickname }}</span>
              <img src="~assets/img/icon/set.png" alt="">
            </p>
            <p class="ipt" @click="goDetailFn(2)">
              <span class="text">我的珍珠: {{ IPTNum }}</span>
              <i class="icon iconfont icon-yiwen"></i>
            </p>
          </div>
        </div>
      </div>
      <wave  />
    </div>
    

    <div class="myAssets">
      <div class="orderDetail">
        <div class="orderTitle">
          <span class="orderTitDes">订单详情</span>
          <span class="orderTit" @click="goDetailFn(3)">查看更多订单<i class="icon iconfont icon-jiantou"/></span>
        </div>
      </div>
      <div class="assetsContent">
        <div class="ye" @click="goDetailFn(4)">
          <h2>{{ personInfo.waitPay || 0 }}</h2>
          <p>待付款</p>
        </div>
        <div class="myIpt" @click="goDetailFn(5)">
          <h2 >{{ personInfo.payed || 0 }}</h2>
          <p >已付款</p>
        </div>
      </div>
    </div>
    <div class="service_progress">
      <div class="orderDetail">
        <div class="orderTitle">
          <span class="orderTitDes">服务进度</span>
          <span class="orderTit" @click="goDetailFn(6)">查看全部服务<i class="icon iconfont icon-jiantou"/></span>
        </div>
        <div class="itemWrap">
          <div @click="goDetailFn(7)">
            <img src="~assets/img/my/ser_1.png" alt="">
            <p>待服务</p>
            <span class="num" v-if="personInfo.waitService">{{ personInfo.waitService }}</span>
          </div>
          <div @click="goDetailFn(8)">
            <img src="~assets/img/my/ser_2.png" alt="">
            <p>服务中</p>
            <span class="num" v-if="personInfo.inService">{{ personInfo.inService }}</span>
          </div>
          <!-- <div @click="goDetailFn(9)">
            <img src="~assets/img/my/ser_3.png" alt="">
            <p>待验收</p>
            <span class="num" v-if="personInfo.waitAccept">{{ personInfo.waitAccept }}</span>
          </div> -->
          <div @click="goDetailFn(10)">
            <img src="~assets/img/my/ser_4.png" alt="">
            <p>服务完成</p>
            <span class="num" v-if="personInfo.finishService">{{ personInfo.finishService }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="process process_bottom" >
      <div class="proItem kefuItem" >
        <img src="~assets/img/my/icon_2.png" alt="">
        <p>拾贝官方客服</p>
        <i class="icon iconfont icon-jiantou icon2"></i>
        <button open-type="contact" class="kefu" />
      </div>
      <div class="proItem" @click="goDetailFn(11)">
        <img src="~assets/img/my/icon_3.png" alt="">
        <p>关于拾贝</p>
        <i class="icon iconfont icon-jiantou icon2"></i>
      </div>
    </div>

    <!-- 底部公共导航 -->
    <!-- <footerNav :active.sync="footerActive" /> -->
  </div>
</template>

<script>
// import footerNav from 'components/footerNav';
import wave from 'components/wave'
export default {
  components: {
    wave
  },
  data () {
    return {
      footerActive: 3,
      auth: {},  //个人信息
      showBox: false,  //展示邀请好友开店弹窗
      codeImgUrl: '',  //二维码
      bgUrl: '',  //背景图临时路径
      headUrl: '',  //顶部背景图
      avatarUrl: '', //头像临时路径
      cavansState: false, //'是否显示canvas'
      personInfo: {},  //统计验收/可用余额/邀请
      IPTNum: 0.0000,  //IPT
    }
  },
  methods: {
    // 分享给好友
    shareFn () {
      this.showBox = false;
    },
    // 邀请好友开店
    invitePartnerFn () {
      this.showBox = true;
    },
    // 取消分享
    clickShareDia () {
      this.showBox = false;
    },
    goDetailFn (type) {
      let url = '';
      switch (type) {
        case 1: url = '/pages/my/personalInfo'; break;   //个人信息设置
        case 2: url = '/pages/my/my_IPT'; break;
        case 3: url = '/pages/order/orderList'; break;  //全部订单
        case 4: url = '/pages/order/orderList?orderState=0'; break;  //待付款
        case 5: url = '/pages/order/orderList?orderState=1'; break;  //已付款
        case 6: url = '/pages/order/serviceOrderList'; break;  //全部服务  
        case 7: url = '/pages/order/serviceOrderList?feedbackState=1'; break;  //待服务  
        case 8: url = '/pages/order/serviceOrderList?feedbackState=2'; break;  //服务中
        case 9: url = '/pages/order/loadAccept'; break;  //待验收
        case 10: url = '/pages/order/serviceOrderList?feedbackState=3'; break;  //服务完成
        case 11: url = '/pages/my/aboutSebe'; break;  //关于拾贝
      }
      this.$router.push({ path: url});
    },
    // 查询IPT总数
    async getIptFn () {
      try {
        let resp = await this.API.my.iptStatisticsInfo();  //C端
        this.IPTNum = parseFloat(resp.totalScore).toFixed(4);
      }
      catch (e){}
    },
    async getMyStatisticFn () {
      try {
        let resp = await this.API.my.myStatistic({interfaceType: 2});  //C端
        this.personInfo = resp;
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
        src: 'https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/DB9CD5FAE42EEFCDA112FA1830254A8B.png' // 分享背景图地址
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
      this.cavansState = true;  //显示canvas
      await this.downImg();  //获取图片临时路径
      let data = {
        bgUrl: this.bgUrl,
        headUrl: this.headUrl,
        avatarUrl: this.avatarUrl,
        nickName: this.auth.nickname
      }
      this.drawSharePicFn(data);
    },

  },
  onShow () {
    this.getMyStatisticFn();  //查询统计验收/可用余额/邀请
    this.getIptFn();  //查询IPT
    this.auth = this.$storage.get('auth');
  }
}
</script>

<style lang="scss">
.myWrap{
  width: 100%;overflow-x: hidden;
  .myTitle{background: url(~assets/img/my/bg.png) no-repeat; position: relative; overflow: hidden;
    .avator{padding: 42px 0 0 30px; height: 280px; align-items: flex-start;
      .lef_part {
         align-items: flex-start;
        .img_box {
          width:120px; margin-right: 10px;
          .img {width: 120px; height: 120px; border-radius: 50%; border: 4px solid #95C3FD;}
          .status {font-size: 130px; color: #F6BB1B; margin-top: -110px; margin-left: -100px; }
          .status_none {color: #BEBEBE;}
        }
        .nickname_box {
          width: 100%; display: flex; justify-content: flex-start; flex-direction: column;  padding-left: 15px;
          .nickname {
            max-width: 400px; text-align: left; line-height: 45px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;
            .text {max-width: 344px; font-size: 32px; color: #fff; vertical-align: middle; overflow:hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block;}
            img {width: 30px; height: 30px; margin-left: 10px; vertical-align: middle;}
          }
          .ipt {
            width:400px; margin-top: 15px; line-height: 37px;
            .text {font-size: 26px; color: #fff; vertical-align: middle; margin-right: 10px; display: inline-block;}
            .iconfont {font-size: 36px; color: #fff; vertical-align: middle; display: inline; margin-left: 10px;}
          }
        }
      }
      .share_box {
        width: 198px; height: 56px; line-height: 56px; border-radius:28px; text-align: center; background: #0083F6; padding-right: 18px; margin-right: -10px;
        img {width: 36px; height: 36px; display: inline-block; vertical-align: middle; margin-right: 10px;}
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
      .num {font-size: 64px;color: #fff;line-height: 90px;padding-bottom: 40px; }
      p {font-size: 28px;line-height: 40px;color: rgba(255, 255, 255, .5);}
    }
    .titleBot{display: flex;background:rgba(0,121,255,0.5);padding: 25px 0 24px;
      >div{flex: 1;text-align: center;
        h2{font-size: 36px;line-height: 50px;color:#fff;padding-bottom: 8px;}
        p{font-size:26px;line-height: 37px;color: rgba(255, 255, 255, 0.8);}
      }
    }
  }
  .myAssets{background: #fff;padding: 0 20px;
    .title{display: flex; line-height: 90px;border-bottom:1px solid #eee;margin-bottom: 30px;
      .my{flex-grow: 1;font-size: 28px;color: #333;}
      .detail {
        .text {font-size: 24px;color: #40BE46;}
        .fonticon {}
      }
    }
    .assetsContent{display: flex;padding: 30px 0;
      >div{flex: 1;text-align: center;
        h2{line-height: 53px;font-size: 38px;color: #2f80f6;font-weight: 500;margin-bottom: 10px;}
        p{line-height: 37px;font-size: 26px;color: #333;
          .icon{display: inline;font-size: 36px;transform: translateY(-4px);}
        }
      }
      .ye{padding-right: 20px;

      }
      .myIpt{padding-left: 20px;}
    }
  }
  .service_progress {
    padding: 0 20px; margin-top: 20px; background: #fff;
    .itemWrap{display: flex;padding: 30px 0 35px;
      >div{flex: 1;text-align:center;font-size: 0; position: relative;
        img{ width: 44px;height: 52px; position: relative;}
        p{line-height: 37px;font-size: 26px;color: #999; margin-top: 20px;}
        .num {position: absolute; top: 0; left: 124px; border:1px solid #F64744; line-height: 26px; border-radius: 15px; background: #fff;  text-align: center; font-size: 20px; color: #F64744; background: #fff; padding: 0 8px; height: 30px; line-height: 28px; }
      }
    }
  }
  .orderDetail{background: #fff;
    .orderTitle{line-height: 90px;display: flex;border-bottom:1px solid #eee;
      .orderTitDes{font-size: 28px;color: #333;flex-grow: 1;}
      .orderTit{font-size: 24px;color: #999; padding-right:10px; display: flex;
        .icon{font-size: 20px;height: 90px;color:#ddd;margin-left: 15px;}
      }
    }
  }
  .process{margin:  20px 0;background: #fff;
    >div{
      line-height: 90px;border-bottom:1px solid #eee;display: flex;padding: 0 30px; align-items: center;
      &:last-child {border-bottom: none;}
      .icon1{font-size: 44px;height: 90px;color: #999;width: 40px;}
      img {width: 36px; height: 36px;}
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
  .process_bottom {margin-bottom: 110px;}
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
  .canvas{width: 750px;height: 1334px;position: fixed;left: 0; top: 0; }
}

</style>
