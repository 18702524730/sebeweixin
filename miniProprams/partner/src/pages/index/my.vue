<template>
  <div class="my_wrap">
    <div class="head_box">
      <img src="~assets/img/my/top_bg.png" class="bg_img" alt="">
      <div class="head_content row-start">
        <div class="lef_part">
          <div class="img_box" @click="goDetailFn(0)">
            <img :src="auth.avatar" class="img" alt="">
          </div>
        </div>
        <div class="rig_part">
          <div class="top_box row-between">
            <p class="nickname row-center" @click="goDetailFn(0)">
              <span class="text">{{ auth.truename ? auth.truename : ''}}</span>
              <img src="~assets/img/icon/set.png" class="icon" alt="">
            </p>
            <img src="~assets/img/my/ip.png" class="img" alt="" @click="goDetailFn(1)">
          </div>
          <div class="bottom_box row-between">
            <img src="~assets/img/my/is_real.png" alt="" class="status" v-if="auth.isAuthentication">
            <p class="status_null" v-if="!auth.isAuthentication">未认证</p>
            <p class="question row-center" @click="goDetailFn(1)">
              <span class="text">今天你领珍珠了吗？</span>
              <i class="iconfont icon-jiantou"></i>
            </p>
          </div>
        </div>
      </div>
      <div class="car_box" @click="invitePartnerFn">
        <p class="tit">邀请好友开店</p>
        <p class="info">邀请好友开店，坐享<span class="red">10%</span>“睡后收入”</p>
        <p class="invit">立即邀请</p>
        <img src="~assets/img/my/money_bg.png" alt="" class="bg">
      </div>
    </div>

    <div class="num_box">
      <div class="item_line row-center">
        <div class="item" @click="goDetailFn(10)">
          <p class="title">本月入账(元)</p>
          <p class="num_line row-between">
            <span class="num num_b">{{ personInfo.currMonthAccept || 0 }}</span>
          </p>
        </div>
        <div class="item item_rig" @click="goDetailFn(11)">
          <p class="title">未入账(元)</p>
          <p class="num_line row-between">
            <span class="num num_red">{{ personInfo.nonAccept || 0 }}</span>
            <i class="iconfont icon-jiantou"></i>
          </p>
        </div>
      </div>
      <div class="item_line row-center">
        <div class="item item_lef" @click="goDetailFn(10)">
          <p class="title">累计入账(元)</p>
          <p class="num_line row-between">
            <span class="num">{{ personInfo.cumulativeAccept || 0 }}</span>
          </p>
        </div>
        <div class="item item_rig" @click="goDetailFn(12)">
          <p class="title">可提现金额(元)</p>
          <p class="num_line row-between">
            <span class="num">{{ personInfo.availableBalance || 0 }}</span>
            <i class="iconfont icon-jiantou"></i>
          </p>
        </div>
      </div>
      <div class="item_line row-center">
        <div class="item item_lef" @click="goDetailFn(1)">
          <p class="title">创新珍珠</p>
          <p class="num_line row-between">
            <span class="num">{{ IPTNum }}</span>
          </p>
        </div>
        <div class="item item_rig" @click="goDetailFn(13)">
          <p class="title">拾贝券(张)</p>
          <p class="num_line row-between">
            <span class="num num_o">{{ couponNum || 0 }}</span>
            <i class="iconfont icon-jiantou"></i>
          </p>
        </div>
      </div>
    </div>

    <div class="orderDetail">
      <div class="orderTitle"  @click="goDetailFn(2)">
        <span class="orderTitDes">我的订单</span>
        <span class="orderTit">查看更多订单<i class="icon iconfont icon-jiantou"/></span>
      </div>
      <div class="itemWrap">
        <div @click="goDetailFn(3)">
          <img src="~assets/img/my/icon_1.png" alt="">
          <p>待付款</p>
          <soan class="num" v-if="personInfo.waitPay">{{ personInfo.waitPay }}</soan>
        </div>
        <div @click="goDetailFn(4)" class="payment">
          <img src="~assets/img/my/icon_2.png" alt="">
          <p>已付款</p>
          <soan class="num" v-if="personInfo.payed">{{ personInfo.payed }}</soan>
        </div>
        <div @click="goDetailFn(5)" class="sh">
          <img src="~assets/img/my/icon_3.png" alt="">
          <p>售后/退款</p>
        </div>
      </div>
    </div>

    <div class="orderDetail">
      <div class="orderTitle " style="border: none;" @click="goDetailFn(6)">
        <span class="orderTitDes">服务作业</span>
        <span class="orderTit">请及时跟进服务状态<i class="icon iconfont icon-jiantou"/></span>
      </div>
    </div>
    <div class="orderDetail">
      <div class="orderTitle " style="border: none;" @click="goDetailFn(16)">
        <span class="orderTitDes">需求管理</span>
        <span class="orderTit">查看及管理需求<i class="icon iconfont icon-jiantou"/></span>
      </div>
    </div>

    <div class="tool_wrap">
      <div class="banner" @click="invitePartnerFn"><img src="~assets/img/my/banner_bg.png" alt=""></div>
      <div class="item_wrap row-center">
        <div class="item b_rig b_bottom column-center" @click="invitePartnerFn">
          <img src="~assets/img/my/t_1.png" alt="" class="img">
          <p class="text">邀请好友</p>
        </div>
        <div class="item b_rig b_bottom column-center" @click="goDetailFn(15)">
          <img src="~assets/img/my/t_3.png" alt="" class="img">
          <p class="text">规则中心</p>
        </div>
        <div class="item b_bottom column-center" @click="goDetailFn(8)">
          <img src="~assets/img/my/t_4.png" alt="" class="img">
          <p class="text">材料中心</p>
        </div>
      </div>
      <div class="item_wrap row-center">
        <button class="item b_rig column-center" open-type="contact">
          <img src="~assets/img/my/t_5.png" alt="" class="img">
          <p class="text">官方客服</p>
        </button>

        <div class="item b_rig column-center" style="border-radius: 0;"  @click="goDetailFn(9)">
          <img src="~assets/img/my/t_6.png" alt="" class="img">
          <p class="text">关于拾贝</p>
        </div>
        <div class="item column-center">
          <p class="more">更多精彩</p>
          <p class="more">敬请期待</p>
        </div>
      </div>
    </div>
    <div class="wrap_blank"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footerActive: 4,
      auth: {},  //个人信息
      showBox: false,  //展示邀请好友开店弹窗
      codeImgUrl: '',  //二维码
      bgUrl: '',  //背景图临时路径
      headUrl: '',  //顶部背景图
      avatarUrl: '', //头像临时路径
      personInfo: {},  //统计验收/可用余额/邀请
      IPTNum: 0.0000,  //IPT
      couponNum: 0
    }
  },
  onShow () {
    this.getMyStatisticFn();  //查询统计验收/可用余额/邀请
    this.getIptFn();  //查询IPT
    this.getCouponNum();
    this.auth = this.$storage.get('auth');
    if(this.$route.query.share == 1){
      this.invitePartnerFn();
    }
    setTimeout(() => {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#4172FF'
      })
    }, 200);
  },
  mounted () {
  },
  onHide(){
    console.log('离开页面')
    if(this.$route.query.share == 1){
      this.$route.query.share = 2;
    }
    // this.showBox = false;
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=3",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  methods: {
    // 获取拾贝券数量
    async getCouponNum () {
      let data = await this.API.my.countProfitCoupon();
      this.couponNum = data.number;
    },
    // 分享给好友
    shareFn (res) {
      let self = this;
      wx.showTabBar({
        animation: true,
        success: function() {
          self.showBox = false;
        }
      })
    },
    // 邀请好友开店
    invitePartnerFn () {
      this.$router.push('/pages/my/myInvite');
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
        case 7: url = '/pages/my/myInvite'; break;  //我的邀请
        case 8: url = '/pages/my/materialsCenter'; break;  //材料中心
        case 9: url = '/pages/my/aboutSebe'; break;  //关于拾贝
        case 10: url = '/pages/my/earningList?index=0'; break;  //累计入账
        case 11: url = '/pages/my/earningList?index=1'; break;  //未入账
        case 12: url = `/pages/my/balance?availableBalance=${this.personInfo.availableBalance}`; break;  //可用余额
        case 13: url = `/pages/my/couponList`; break;  //拾贝券 /pages/my/couponList
        case 14: url= `/pages/toolbox/index`; break; // 工具箱
        case 15: url= `/pages/my/ruleCenter`; break; // 规则中心
        case 16: url= `/pages/demandManage/demandLists`; break; // xuqiuguanli
      }
      this.$router.push({ path: url});
    },
    // 查询IPT总数
    async getIptFn () {
      try {
        let resp = await this.API.my.iptStatisticsInfo();  //B端
        this.IPTNum = parseFloat(resp.totalScore).toFixed(4);
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
    testShare () {
      this.showBox = false;
      wx.showTabBar({
        animation: true
      }) 
      this.$router.push({
        path: '/pages/store/share',
        query: {
          nickName: this.$storage.get('auth').nickname || '',
          avatar: this.$storage.get('auth').avatar,
          memberId: this.$storage.get('auth').member_id
        }
      })
    }
  }
}

</script>
<style lang="scss">
  .my_wrap {
    .head_box {
      width: 100%; height: 260px; background:linear-gradient(180deg,rgba(66,114,255,1) 0%,rgba(35,141,255,1) 100%); position: relative;
      .bg_img {width: 628px; height: 240px; position: absolute; right: 0; bottom: 0; } 
      .head_content {
        position: absolute; left: 30px; right: 20px; top: 28px; z-index: 1;
        .lef_part {
          .img_box {
            width: 128px; height: 128px; border-radius: 50%; overflow: hidden; border: 4px solid rgba(255,255,255,.3); margin-right: 20px;
            .img {width: 100%; height: 100%;}
          }
        }
        .rig_part {
          width: calc(100% - 140px);
          .top_box {
            width: 100%;position: relative;
            .nickname {
              // margin-bottom: 10px;
              .text {font-size: 32px; color: #fff; font-weight: 600; margin-right: 10px; max-width: 344px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block;}
              .icon {width: 30px; height: 30px; }
            }
            .img {width: 85px; height: 63px; padding-right: 10px;position: absolute;top: 0px;right: 5px;}
          }
          .bottom_box {
            width: 100%;margin-top: 6px;
            .status {width: 98px; height: 30px;}
            .status_null {width: 100px; height: 36px; line-height: 36px; text-align: center; background: #BEBEBE; color: #fff; font-size: 24px; margin-top: -18px; border-radius: 18px; }
            .question {
              .text {font-stretch: 24px; color: #fff; margin-right: 10px;}
              .iconfont {color: #fff; font-size: 20px;}
            }
          } 
        }
      }
      .car_box {
        width: 690px; height: 136px; padding: 25px 0 0 30px; background: #fff; box-shadow:0px 4px 16px 0px rgba(54,93,176,0.11); border-radius:5px; position: absolute; left: 30px; bottom: -65px;
        .tit {font-size: 30px; color: #333; margin-bottom: 5px; font-weight: 600;}
        .info {
          font-size: 24px; color: #999; 
          .red {color: #F64744;}
        }
        .invit {height: 56px; line-height: 56px; padding: 0 23px; color: #fff; font-size: 24px; background:linear-gradient(115deg,rgba(242,223,179,1) 0%,rgba(197,165,103,1) 100%); box-shadow:10px 10px 20px 0px rgba(209,180,123,0.41); border-radius:28px; position: absolute; right: 30px; top: 40px; z-index: 1;}
        .bg {width: 233px; height: 98px; position: absolute; right: 10px; bottom: 0;}
      }
    }
    .num_box {
      width: 100%; background: #fff; padding: 75px 30px 0 30px;
      .item_line {
        width: 100%; border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none; 
          .item {padding-bottom: 30px;}
        }
        .item {
          width: 50%; padding: 20px 0 20px 30px;
          .title {font-size: 26px; color: #999; margin-bottom: 10px; line-height: 37px;}
          .num_line {
            width: 100%; line-height: 48px;
            .num {font-size: 34px; color: #333; font-weight: 400;}
            .num_red {color: #F64744; font-size: 44px;font-weight: 500;}
            .num_b {font-size: 44px; font-weight: 500;}
            .num_o {color: #FF9639;}
            .iconfont {color: #ddd; font-size: 20px;}
          }
        }
        .item_rig {
          padding-left: 60px;
        }
        .item_lef {
          border-right: 1px solid #eee; 
        }
      }
    }
    .orderDetail{background: #fff;margin-top: 20px;
      .orderTitle{line-height: 80px;display: flex;margin: 0 30px;border-bottom:1px solid #eee;
        .orderTitDes{font-size: 28px;color: #333;flex-grow: 1;}
        .orderTit{font-size: 24px;color: #999; display: flex;
          .icon{font-size: 20px;height: 80px;color:#ddd;margin-left: 15px;}
        }
      }
      .itemWrap{display: flex;padding: 30px 0 35px; 
        >div{flex: 1;text-align:center;font-size: 0; position: relative;
          img{ width: 60px;height: 60px; position: relative;}
          p{line-height: 37px;font-size: 26px;color: #666;padding-top: 20px;}
          .num {position: absolute; top: 1px; left: 53%; border:1px solid #2F80F6; padding:0 8px; height: 30px; line-height: 28px; border-radius: 15px; background: #fff; text-align: center; font-size: 20px; color: #2F80F6; }
        }
      }
    }
    .wrap_blank{height: 60px;}
    .tool_wrap {
      width: 100%; margin-top: 20px; background: #fff;
      .banner {
        width: 100%; height: 160px; border-bottom: 1px solid #eee; position: relative;
        img {width: 690px; height: 150px; position: absolute; left: 30px; top: 0;}
      }
      .item_wrap {
        width: 100%; height: auto;
        .item {border: none;
          width: 33.3333%; height: 196px; text-align: center;
          .img {width: 60px; height: 60px;}
          .text {color: #666; font-size: 26px; margin-top: 20px;border: none;}
        }
        .kefuItem {
          position: relative;
          .kefu {position:absolute; width:100%; height:100%; opacity: 0;}
        }
        .b_rig {border-right: 1px solid #eee;}
        .b_bottom {border-bottom: 1px solid #eee;}
      }
      .more{font-size: 24px;color: #ddd;line-height: 40px;}
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
  }
</style>
