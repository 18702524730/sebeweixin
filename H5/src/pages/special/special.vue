<template>
  <div class="page">
    <div class="specail">
      <div class="head">
        <a class='head-logo' href="#"><img src='~assets/img/logo.png'></a>
        <p class="order-title" @click="goToMyOrder" v-if="login">我的订单</p>
        <p class="order-title" v-else @click="goToLogin">登录</p>
      </div>
      <div class="body">
          <div class="special-head">
             <img class="go-down"  src="~assets/img/special/special_01.png/">
            <!-- <p class="special-head-f">客官</p>
            <p class="special-head-s">您的话费被拾贝承包了</p>
            <p class="special-head-t">注册商标最高送<span>500元</span>话费</p>
            <p class="special-time">8.09-8.31</p> -->
          </div>
          <!-- token:{{token}}<br>
          openid:{{openid}} -->
          <div class="special-body">
            <h4 class="body-title">商标注册服务</h4>
            <div class="body-head">
              <div class="body-rule">
                <h4>下单即送话费和抽奖机会</h4>
                <p>国内商标注册送<span>300</span>元话费，国际商标注册送<span>500</span>元话费</p>
                <p>还有<span>10</span>次幸运大转盘的机会等着你</p>
                <p>关键是：可以 <span>叠加！</span> <span class="icon_big">叠加！</span><span class="icon_bigger">叠加！</span>重要的事情说三遍</p>
              </div>
            </div>
            <div class="prize-list">
              <div class="prize" >
                  <img src="~assets/img/special/special_03.png">
                  <h4>国内商标注册</h4>
                  <p class="reward">送300元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">¥999</span>
                  <p class="beckoning">心动价：<span>¥699</span></p>
                  <button class="buy-btn" @click="goShopping(1)">立即购买</button>
              </div>
              <div class="prize">
                  <img src="~assets/img/special/special_04.png">
                  <h4>美国商标实际使用申请</h4>
                  <p class="reward">送500元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">心动价</span>
                  <p class="beckoning"><span>¥3800</span></p>
                  <button class="buy-btn" @click="goShopping(10)">立即购买</button>
              </div>
              <div class="prize">
                  <img src="~assets/img/special/special_04.png">
                  <h4>美国商标意向注册申请</h4>
                  <p class="reward">送500元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">心动价</span>
                  <p class="beckoning"><span>¥4800</span></p>
                  <button class="buy-btn" @click="goShopping(9)">立即购买</button>
              </div>
              <div class="prize">
                  <img src="~assets/img/special/special_05.png">
                  <h4>英国商标注册申请</h4>
                  <p class="reward">送500元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">心动价</span>
                  <p class="beckoning"><span>¥5500</span></p>
                  <button class="buy-btn" @click="goShopping(69)">立即购买</button>
              </div>
              <div class="prize">
                  <img src="~assets/img/special/special_06.png">
                  <h4>韩国商标注册申请</h4>
                  <p class="reward">送500元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">心动价</span>
                  <p class="beckoning"><span>¥6000</span></p>
                  <button class="buy-btn" @click="goShopping(77)">立即购买</button>
              </div>
              <div class="prize">
                  <img src="~assets/img/special/special_07.png">
                  <h4>法国商标注册申请</h4>
                  <p class="reward">送500元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">心动价</span>
                  <p class="beckoning"><span>¥6800</span></p>
                  <button class="buy-btn" @click="goShopping(105)">立即购买</button>
              </div>
              <div class="prize">
                  <img src="~assets/img/special/special_08.png">
                  <h4>日本商标注册申请</h4>
                  <p class="reward">送500元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">心动价</span>
                  <p class="beckoning"><span>¥8500</span></p>
                  <button class="buy-btn" @click="goShopping(11)">立即购买</button>
              </div>
              <div class="prize">
                  <img src="~assets/img/special/special_09.png">
                  <h4>俄罗斯商标注册</h4>
                  <p class="reward">送500元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">心动价</span>
                  <p class="beckoning"><span>¥11000</span></p>
                  <button class="buy-btn" @click="goShopping(76)">立即购买</button>
              </div>
              <div class="prize">
                  <img src="~assets/img/special/special_10.png">
                  <h4>欧盟商标注册申请</h4>
                  <p class="reward">送500元话费</p>
                  <p class="last" v-if="nostart">活动未开始</p>
                  <p class="last" v-if="!nostart">活动已结束</p>
                  <span class="underline">心动价</span>
                  <p class="beckoning"><span>¥11000</span></p>
                  <button class="buy-btn" @click="goShopping(106)">立即购买</button>
              </div>
            </div>
          </div>
      </div>
      <div class="foot">
        <h4>活动规则</h4>
        <div class="rule">
          <p>一 活动时间：2017年8月9日-2017年8月31日</p>
                <p>二 购买说明：</p>
                <p>1.国内商标注册：每成功购买一单（一单指一个商标一个类别）并完成商标申报，即赠送300元手机话费，仅限前1000单；其中，四川/新疆用户注册商标，一律免服务费（以申报主体地址为准）。</p>
                <p>2.美国商标意向/实际注册：每成功购买一单（一单指一个商标一个类别）并完成商标申报，即赠送500元手机话费，仅限前100单；</p>
                <p>3.其他国家/组织（英国、法国、日本、韩国、俄罗斯、欧盟）商标注册：每成功购买一单（一单指一个国家/组织一个商标）并完成商标申报，即赠送500元手机话费，每个国家仅限前100单；</p>
                <p>三 充值说明：</p>
                <p>1.所送话费将在商标申报（递交至商标局/国外官方机构）之后的2个工作日内充值完成；</p>
                <p>2.用户需配合商标专员提供充值手机号；</p>
                <p>3.因用户原因导致充值错误，需用户自行承担后果；</p>
                <p>四 退款说明：</p>
                <p>1.退款周期为下单后至递交商标局/国外官方机构前，若商标已递交至商标局/国外官方机构，则不作退款处理；</p>
                <p>2.退款需在后台提交退款申请，申请通过后即可操作退款流程；</p>
                <p>3.如有疑问，请联系在线客服；</p>
                <p>五 本活动的最终解释权归拾贝网所有；</p>
        </div>
      </div>
      <div class="last_pic"><img src="~assets/img/special/special_07.jpg"></div>
      <div class="go-turntable-f"  v-show="!translate_s"  @click="getAppear">
        <img class="rotate-img" src="~assets/img/special/special_02.png" >
      </div>

      <div class="go-turntable-s" v-show="translate_s" :class=" disAppear_s ? 'appear' : 'disAppear' "   @click="getAppear_s">
        <img class="rotate-img" src="~assets/img/special/special_02.png" >
      </div>
    </div>
  </div>
</template>
<script>

  const cartUrl = CONFIG.cartUrl;
  const title = '恭喜拾贝网正式上线。注册商标最高送500话费，每天赠送免费幸运大转盘抽奖机会。';
  const link = 'http://wechat.ipsebe.com/weixin/wechat/oauth2servlet';
  const imgUrl = 'http://sebe360test.oss-cn-beijing.aliyuncs.com/850F59A4FFFBACD1AB9443309DB2541F.jpg';
  //获取url中的查询关键字
  function getQueryString(name) {
    var ret = '';
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var s = decodeURIComponent(location.search);
    var r = s.slice(1).match(reg);
    if (r != null) {
      ret = decodeURIComponent(r[2]);
    }
    return ret;
  }

  export default {
    data () {
      return {
        nostart: false,
        login: false, // 登录状态 false 未登录  true 登录
        disAppear_s: false, //是否显示第二个 右下角的动画
        scroll: '', //window 的offsetTop
        path: location.href.split('#')[0], //当期的地址
        id: '',  //表示商品的类型
        getBillApi: '/luckdraw/billloss.htm', //获取商品的剩余状态的数量
        list: {1:''}, //列表的数量  不能为空  否则不能绑定
        translate_s: false,
        token:'',
        openid: ''
      }
    },

    mounted () {
      this.init();
      this.wxShare(title,link,imgUrl,'',this.path); //微信分享  在mian.js里Vue的原型里已定义
    },

    methods: {
      init () {
        window.addEventListener('scroll', this.listenScroll);
        this.token = this.$cookie.get('user_token');
        this.openid = getQueryString('openid');
        this.isLogin(); //判断是否登录
        this.getBill(); //获取商品的赠送话费的名额
      },

      listenScroll () {
        this.scroll = document.body.scrollTop ||document.documentElement.scrollTop;
      },

      isLogin () {
        var user_token = this.$cookie.get('user_token'); //根据cookie是否有token 判断登录
        if ( !user_token ) {
          this.login = false;
        } else {
          this.login = true;
        }
      },

      goToMyOrder () { //查看我的订单
        this.$router.push({path: '/myOrders'});
      },

      //跳到注册页面
      goToLogin () {
        var path = location.href;
        this.$router.push({path: '/smsLogin',query:{return_url: path}});
      },

      goShopping (id) {  //购买  判断登录
        // if ( !this.login ) {
        //   this.goToLogin();
        // } else {
        //   this.$router.push({path: '/detail',query:{id: id || 1}})
        // }
        if (typeof id == 'undefined') {
          var id = 1;
        };
        this.$router.push({path: '/detail',query:{id: id || 1}})
      },

      getAppear () { //表示动画第一次结束 隐藏第一个 右下角图标  显示第二个
        this.translate_s = true;
        this.disAppear_s = true;
      },

      getAppear_s () {
        if ( !this.disAppear_s ) {
          this.disAppear_s = true;

        } else {
          // 表示去 大转盘
          this.$router.push({path: '/prize'});
        }

      },

      //获取商品的 赠送话费的数量
      getBill () {
        var _this = this;
        this.$http.get(cartUrl + this.getBillApi).then((resp)=>{
          var data = resp;
          if (data.code == 0) {
            _this.nostart = false;
            data.data.forEach((item,index,arr)=>{
              _this.list[item.id + ''] = item.num;
            });
          }else if(data.code == '0100008'){
            _this.nostart = true;
          }
        }).catch((error)=>{
            console.log(error);
        });
      },

    },

    watch: {
      scroll () {
        this.disAppear_s = false;
      }
    },

  }

</script>

<style scoped lang='scss'>
  @import '~assets/css/adaptation.scss';
  .page {

    .head {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      overflow: hidden;
      width: 100%;
      height: px(88);
      background: #333;

      .head-logo {
        position:absolute;
        top: px(30);
        left: px(30);
        width: px(197.3);
        height:px(27.1);
        img{width: 100%;height: 100%;display: block;}
      }

      .order-title {
        position: absolute;
        top: px(22);
        right: px(30);
        height: px(45);
        line-height: px(45);
        font-size: px(32);
        text-align: right;
        color: #fff;

      }

    }

    .body {
      clear: both;
      background: #2f59ef;
      .special-head {
        position: relative;
        height: px(504);
        background: url(~assets/img/special/special_01.jpg) no-repeat;
        background-size: px(750);
        color: #fff;

        .go-down {
          position: absolute;
          top: px(452);
          left: px(367);
          width: px(14);
          transform: translate3d(0,0,0);
          // animation: goDown 2s infinite;

        }


        // .special-head-f {
        //   clear:  both;
        //   position: absolute;
        //   top: px(163);
        //   width: px(750);
        //   height: px(85);
        //   line-height: px(84);
        //   font-size: px(84);
        //   text-indent: px(287);
        //   background: url(~assets/img/special/special_01.png) no-repeat px(447) px(50);
        //   background-size: px(24);

        // }

        // .special-head-s {
        //   position: absolute;
        //   top: px(260);
        //   height: px(66);
        //   line-height: px(66);
        //   font-size: px(66);
        //   width: px(750);
        //   text-align: center;
        // }

        // .special-head-t {
        //   position: absolute;
        //   top: px(343);
        //   left: px(196);
        //   width: px(366);
        //   height: px(51);
        //   line-height: px(51);
        //   font-size: px(24);
        //   text-align: center;
        //   letter-spacing: 0;
        //   border-radius: px(30);
        //   background-image: linear-gradient(90deg,#fbb838 0%,#be13eb 100%);

        //   span {
        //     font-size: px(31);
        //   }
        // }

        // .special-time {
        //   position: absolute;
        //   top: px(414);
        //   width: px(750);
        //   letter-spacing: px(9);
        //   text-align: center;
        // }

      }

      .special-body {

        .body-title {
          height: px(120);
          line-height: px(120);
          font-size: px(43);
          text-align: center;
          color: #fff;
          background: url(~assets/img/special/special_02.jpg) no-repeat;
          background-size: px(750);
        }

        .body-head {
          width: px(750);
          height: px(290);
          background: url(~assets/img/special/special_06.jpg) no-repeat;
          background-size: px(750);

          .body-rule {
              margin: 0 px(30);
              position: relative;
              width: px(690);
              height: px(290);
              background: url(~assets/img/special/special_03.jpg) no-repeat;
              background-size: px(690);
              border-radius: px(6);

              h4 {
                position: absolute;
                top: px(52);
                left: px(120);
                height: px(32);
                line-height: px(32);
                font-size: px(32);
                color: #3b3aac;
              }

              p {
                position: absolute;
                left: px(40);
                height: px(22);
                line-height: px(22);
                font-size: px(22);
                color: #333;

              span {
                font-size: px(30);
                font-weight: bolder;
                color: #3b3aac;
              }

              .icon_big {
                font-size: px(33);
              }

              .icon_bigger {
                font-size: px(36);
              }

              &:first-of-type {
                top: px(140);
              }

              &:nth-of-type(2) {
                top: px(180);
              }

              &:nth-of-type(3) {
                top: px(220);
              }
            }
          }
        }

        .prize-list {
          clear: both;
          padding-top: px(12);
          margin: 0 auto;
          width: px(750);
          height: px(2756);
          font-size: 0;
          background: url(~assets/img/special/special_04.jpg) no-repeat;
          background-size: px(750) px(2756);

          .prize {
            margin: px(18) px(18) 0 px(30);
            float: left;
            position: relative;
            width: px(336);
            height: px(530);
            background: #fff;
            text-align: center;
            border-radius: px(3);

            &:first-of-type {
              .underline {
                text-decoration: line-through;
              }
            }


            &:nth-of-type(even) {
                margin: px(18) 0 0 0;
            }

            img {
              margin-top: px(37);
              width: px(117);

            }

            h4 {
              margin-top: px(29);
              height: px(26);
              line-height: px(26);
              font-size: px(26);
              font-weight: normal;
              color: #333;
            }

            .reward {
              margin-top: px(19);
              height: px(35);
              line-height: px(35);
              font-size: px(35);
              font-weight: bolder;
              color: #3256ef;

            }

            .last {
              margin-top: px(14);
              font-size: px(23);
              height: px(23);
              line-height: 1.2;
              color: #fe3d42;
              padding: 0 2rem;
            }

            .underline {
              margin-top: px(38);
              display: inline-block;
              height: px(28);
              line-height: px(28);
              font-size: px(28);
              color: #666;


            }

            .beckoning {
              margin-top: px(15);
              font-size: px(24);
              height: px(31);
              line-height: px(31);
              color: #333;

              span {
                  font-size: px(31);
                  font-weight: bolder;
                  color: #3b3aac;
              }
            }

            .buy-btn {
              margin-top: px(20);
              width: px(270);
              height: px(60);
              line-height: px(60);
              font-size: px(24);
              color: #fff;
              background: linear-gradient(90deg, #01affe 0, #895cff 100%);
              border: 0;
              outline: 0;
              border-radius: px(3);
            }
          }
        }

      }
    }

    .foot {
      margin-bottom: -1px;
      overflow: hidden;
      height: px(1304);
      background: url(~assets/img/special/special_05.jpg) no-repeat;
      background-size: px(750) 100%;

      h4 {
        height: px(180);
        line-height: px(250);
        font-size: px(44);
        text-align: center;
        color: #fff;

      }

      .rule {
        margin: 0 auto;
        padding: px(26) px(24);
        width: px(690);
        background: rgba(39,36,113,.3);
        p {
          line-height: px(42);
          font-size: px(24);
          color: #fff;

        }


      }
    }
    @media (max-width: 375px) {
      .foot {
        height: px(1304);
      }
    }


    @media (max-width: 320px) {
      .foot {
        height: px(1304);
      }
    }

    .last_pic {
      background: linear-gradient(90deg, #324bef 0, #2c6cf2 100%);
      overflow: hidden;

      img{
        width: px(750);
        border: 0;
        outline: 0;
      }
    }

    .go-turntable-f {
      position: fixed;
      right: px(50);
      bottom: px(350);
      z-index: 10;
      opacity: .4;
      width: px(155);
      height: px(155);
      border-radius: 50%;
      animation-delay: 2s;
      animation: translates 2s ease-in-out;
      animation-fill-mode: forwards;
      transition: all 1s ease;

    }

    .go-turntable-s {
      position: fixed;
      right: px(50);
      bottom: px(350);
      z-index: 10;
      opacity: .4;
      width: px(155);
      height: px(155);
      border-radius: 50%;
      animation-delay: 2s;
      transition: all 1s ease;
      animation-fill-mode: forwards;
    }


    .go-turntable-f .rotate-img {
      width: px(155);
      height: px(155);
      animation-delay: 2s;
      animation: rotates 2s ease-in-out;
    }

    .go-turntable-s .rotate-img {
       width: px(155);
       height: px(155);
    }

    .appear {
      display: block;
      animation: opacitys  1s ease-in-out;
      animation-fill-mode: forwards;
    }

    .disAppear {
      display: block;
      animation: opacity_back  1s ease-in-out;
      animation-fill-mode: forwards;
    }

    @keyframes opacity_back {
      0% {
        opacity: 1;
        transform: translate3d(px(50),px(200),0);

        }
      100% {
        opacity: .3;
        transform: translate3d(px(125),px(200),0);
      }
    }

    @keyframes opacitys {
      0% {
        opacity: .3;
        transform: translate3d(px(125),px(200),0);

        }
      100% {
        opacity: 1;
        transform: translate3d(px(50),px(200),0);
      }
    }

    @keyframes rotates {
      0% {
        transform: rotate(0);
      }
      15% {
        transform-origin: px(77.5) px(77.5);
        }

      20% {
        transform: rotate(14.12deg);
        transform-origin: px(77.5) px(77.5);
        }

      25% {
        transform:rotate(28.24deg);
        transform-origin: px(77.5) px(77.5);
        }
      30% {
        transform: rotate(36.71deg);
        transform-origin: px(77.5) px(77.5);
        }

      33% {
        transform: rotate(42.35deg);
        transform-origin: px(77.5) px(77.5);
        }
      100% {
        transform: rotate(360deg);
        transform-origin: px(77.5) px(77.5);
        }
    }

    @keyframes translates {
      0% {
        opacity: .4;
        transform: translate3d(0,0,0);

      }
      15% {
        opacity: 1;
        transform: translate3d(0,px(200),0);
        }

      20% {
         opacity: 1;
        transform: translate3d(px(5),px(194),0);
        }

      25% {
         opacity: 1;
        transform:  translate3d(px(10),px(200),0);
        }
      30% {
         opacity: 1;
        transform: translate3d(px(13),px(197),0);
        }

      33% {
         opacity: 1;
        transform: translate3d(px(15),px(200),0);

        }
      100% {
        opacity: .4;
        transform: translate3d(px(125),px(200),0);

        }
    }


  }
</style>
