<template>
  <div class="homepage">
    <div class="banner clearfix" @click="project">
      <a href="#" class="fl banner_left"></a>
      <span class="fr" v-if="!isLogin" @click.stop="goToLogin">登录</span>
      <span class="fr" v-else @click.stop="goToMyOrder">我的订单</span>
    </div>
    <!-- 复制 -->
    <!-- <input type="text" id="copy" :value="name"> -->
    <!-- <p id="copy">{{name}}</p> -->
    <!-- <button id="btn" data-clipboard-target="#copy" style="background-color:red;">复制</button> -->
    <div class="fun_list clearfix">
      <a href="#/tradmarkQuery" class="fl">
        <img src="~assets/img/homepage/query.png" alt="">
        <!-- <img src="../../assets/img/homepage/banner.jpg">
        <img src="https://sebe360test.oss-cn-beijing.aliyuncs.com/E51945B08189DB12FE2EB0CCBD20165C.png"> -->
        <p>商标查询</p>
      </a>
      <!-- <a href="https://wechat.ipsebe.com/page/templates/brandScore/brandScoreIndex.html" class="fl">
        <img src="~assets/img/homepage/trademark.png" alt="">
        <p>商标打分</p>
      </a> -->
      <a href="https://mp.weixin.qq.com/s/RBB5BdsPOnQt1VcqwvY58w" class="fl">
        <img src="../../assets/img/homepage/aboutsebe.png" alt="">
        <p>关于拾贝</p>
      </a>
      <a href="tel:4000315426" class="fl">
        <img src="~assets/img/homepage/personal.png" alt="">
        <p>联系客服</p>
      </a>
    </div>
    <div class="trademark_lists">
      <p class="list_tit">商标服务 · 品牌起航</p>
      <p class="list_text">注册公司后，没有什么比注册商标更重要，200+国家/地区拥有长期、稳定、专业的合作机构</p>
      <ul class="list_data">
        <li class="clearfix" v-for="item in datalist" :key="item.name" @click="goShopping(item.id)">
          <img :src="item.src" alt="" class="fl">
          <p class="fl pay_name">{{item.name}}</p>
          <img src="~assets/img/homepage/next.png" alt="" class="fr next">
          <p class="fr pay_money">&yen; {{item.paynumber}}</p>
        </li>
      </ul>
      <p class="list_bottom">更多业务板块正在陆续上线中……</p>
    </div>
    <div class="platform">
      <div class="platform_bgu">
        <span>一站式知识产权服务平台</span>
        <p>我们重视每一个客户</p>
        <p class="mb-55">大型企业相信我们的专业，我们相信中小企业的未来</p>
        <div>
          <!-- <p>150<span>家</span></p> -->
          <p>150家</p>
          <span>优质服务商入驻</span>
          <p>1000万</p>
          <span>覆盖客户数</span>
          <p>100万</p>
          <span>优质服务（次）</span>
        </div>
        <!-- <img src="~assets/img/homepage/Group.png" alt=""> -->
      </div>
    </div>
    <div class="cooperation">
      <ul class="clearfix">
        <li class="fl mvl"><img class="csj" src="~assets/img/homepage/csj.png" mode="widthFix" alt=""></li>
        <li class="fl"><img class="albb" src="~assets/img/homepage/albb.png" mode="widthFix" alt=""></li>
        <li class="fl"><img class="caasa" src="~assets/img/homepage/logo.png" mode="widthFix" alt=""></li>
        <li class="fl"><img class="number" src="~assets/img/homepage/360.png" mode="widthFix" alt=""></li>
        <li class="fl mvl"><img class="jd" src="~assets/img/homepage/jd.png" mode="widthFix" alt=""></li>
        <li class="fl"><img class="honor" src="~assets/img/homepage/honor.png" mode="widthFix" alt=""></li>
        <li class="fl"><img class="baidu" src="~assets/img/homepage/baidu.png" mode="widthFix" alt=""></li>
        <li class="fl"><img class="huic" src="~assets/img/homepage/huic.png" mode="widthFix" alt=""></li>
      </ul>
    </div>
    <div class="footer">
      <div class="clearfix login">
        <p v-if="!isLogin" class="fl"><span @click="goToLogin">登录</span> | <span @click="goRegister">注册</span></p>
        <p class="fr" @click="goTop">回到顶部</p>
      </div>
      <a href="tel:4000315426">客服电话：4000-315-426</a>
      <img src="~assets/img/homepage/caasa.png" alt="" mode="widthFix">
      <p>杭州拾贝知识产权服务有限公司为</p>
      <p>中国产学研合作促进会反侵权假冒创新战略联盟理事长单位</p>
      <hr>
      <p>浙ICP备15042618号 | 浙公网安备 33010402003197号</p>
      <p> © 2018 拾贝公司 All Rights Reserved</p>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'

  import srcchina from 'assets/img/homepage/china.png'
  import srcusa from 'assets/img/homepage/usa.png'
  import srcrussia from 'assets/img/homepage/russia.png'
  import srcenglish from 'assets/img/homepage/english.png'
  import srcEuropean from 'assets/img/homepage/European.png'
  import srcfrench from 'assets/img/homepage/french.png'
  import srcjepan from 'assets/img/homepage/jepan.png'
  import srckorea from 'assets/img/homepage/korea.png'
  //复制功能
  import Clipboard from 'clipboard';
  import Filters from 'utils/filters.js';
  const userUrl = CONFIG.userUrl;
  const title = '拾贝商城，你掌上的知识产权服务平台。';
  const link = 'https://wechat.ipsebe.com/weixin/wechat/oauth2servlet';
  const imgUrl = 'https://sebe360test.oss-cn-beijing.aliyuncs.com/B6D57E3A24A407100265911B94032EB0.jpg';
  //let clipboard = new Clipboard('#btn');
  //复制成功执行的回调
  /*clipboard.on('success', (e)=> {
    console.log(e);
  });
  clipboard.on('error', function(e) {
    console.error('复制失败，请手动复制');
  });*/

  export default {
    data() {
      return {
        name:"123545456",
        isLogin:false,
        path: '', //location.href.split('#')[0], //当期的地址
        datalist:[//商标服务数据
          {
            src:srcchina,
            name:'国内商标注册',
            paynumber:'699',
            id:1
          },
          {
            src:srcusa,
            name:'美国商标实际使用申请',
            paynumber:'3800',
            id:10
          },
          {
            src:srcusa,
            name:'美国商标意向注册申请',
            paynumber:'4800',
            id:9
          },
          {
            src:srcenglish,
            name:'英国商标注册申请',
            paynumber:'6000',
            id:69
          },
          {
            src:srckorea,
            name:'韩国商标注册申请',
            paynumber:'6000',
            id:77
          },
          {
            src:srcfrench,
            name:'法国商标注册申请',
            paynumber:'7000',
            id:105
          },
          {
            src:srcjepan,
            name:'日本商标注册申请',
            paynumber:'8500',
            id:11
          },
          {
            src:srcrussia,
            name:'俄罗斯商标注册申请',
            paynumber:'10000',
            id:76
          },
          {
            src:srcEuropean,
            name:'欧盟商标注册申请',
            paynumber:'11000',
            id:106
          }
        ]
      }
    },
    mounted(){
			//this.wxShare(title,link,imgUrl,this.path, this.getLogin); //微信分享  在mian.js里Vue的原型里已定义
      //this.getInfo(6);
      this.loadInit();
    },
    methods: {
      // 初始化 检查登录态
      async loadInit(){
        try {
          let data = await this.API.interfaces.checkLogin();
          let key = wx.getStorageSync('key');
          if (data.isLogin && key) {
            this.isLogin = true;
          }
          else {
            this.isLogin = false;
          }
          this.pageInit();
        } catch(e) {
          console.log(e)
        }
      },

      // 初始化
      async pageInit(){
        let self = this;
        //self.methods.getCompanyListFn.bind(self)();   // 默认加载公司列表
      },

      // 查询子账号信息
      async getInfo (id) {
        try {
          let typeList = await this.API.home.getInfo(id);
          console.log(typeList)
        }
        catch(e){
          console.log('error error error')
        }
      },
      goToMyOrder () {//查看我的订单
        this.$router.push({path: '/myOrders'});
      },
      project(){
        this.$router.push({path: '/project'});
      },
      goShopping (id) {  //商品详情页
        if (typeof id == 'undefined') {
          var id = 1;
        };
        this.$router.push({path: '/detail',query:{id: id || 1}})
      },

      getLogin () {
        var user_token = this.$cookie.get('user_token'); //根据cookie是否有token 判断登录
        if ( !user_token ) {
          this.isLogin = false;
        } else {
          this.isLogin = true;
        }
      },
      goTop(){
        /*var sTop = document.body || document.documentElement;
        var startTOP = sTop.scrollTop;
        var timer = setInterval(function(){
          startTOP -= 20;
          if(startTOP<0){
            clearInterval(timer);
          }
          sTop.scrollTop = startTOP;
        },1);*/
      },
      //跳到登录页面
      goToLogin () {
        var path = location.href;
        var idx = path.indexOf('?');
        if (idx != -1) {
          path = path.slice(0, idx);
        }
        this.$router.push({path: '/smsLogin', query:Object.assign({}, this.$route.query, {return_url: path})});
      },
      //跳到注册页面
      goRegister () {
        var path = location.href;
        var idx = path.indexOf('?');
        if (idx != -1) {
          path = path.slice(0, idx);
        }
        this.$router.push({path: '/register', query:Object.assign({}, this.$route.query, {return_url: path})});
      }
    },

    filters: {
      //format: Filters.formatDate.format,
      //priceformat:Filters.priceformat
    }
  }
</script>
<style lang="scss">
@import  "~assets/css/adaptation.scss";
  .homepage{
    >div{width:px(750);}
    .mb-55{margin-bottom:px(55)}
    .banner{height:px(500);background:url(~assets/img/homepage/banner.jpg) no-repeat;background-size:100%;padding:px(30);
      .banner_left{width:px(197);height:px(28);display:block;background:url(~assets/img/homepage/special.png) no-repeat;background-size:100%;}
      a,span{font-size:px(32);color:#fff;line-height:px(32);display:block;}
    }
    .fun_list{background-color:#fff;padding:px(50) 0;border-bottom:px(1) solid #ddd;
      a{
        width:33.3%;text-decoration:none;text-align:center;
        p{font-size: px(26);color:#333;line-height:px(26);text-align:center;}
        img{width:px(100);height:px(100);}
      }
    }
    .trademark_lists{padding:px(60) px(30) 0;
      p{text-align:center;line-height:100%;}
      .list_tit{font-size:px(38);margin-bottom:px(15);color:#333;}
      .list_text{font-size:px(26);color:#999;line-height:px(37);padding:0 px(47);}
      .list_data{margin-top:px(40);
        li{width:px(690);height:px(130);background-color:#fff;border-radius:3px;margin-top:px(20);padding:px(25);
          p{line-height:px(80);margin-left: px(30);}
          .pay_name{width:px(320);text-align:left;text-overflow:ellipsis;white-space :nowrap;overflow: hidden;}
          .pay_money{color:#218dff;margin-right: px(30);}
          img{width:px(80);height:px(80);vertical-align: middle;}
          .next{width:px(20);height:px(35);vertical-align: middle;margin-top:px(23);}
        }
      }
      .list_bottom{font-size:px(24);color:#bbb;margin-top:px(40);margin-bottom:px(60);}
    }
    .platform{background-color:#fff;padding:px(90) 0;border-top:px(1) solid #ddd;
      .platform_bgu{height:px(966);width:px(750);text-align:center;background-position:bottom;
        div{width:px(640);height:px(768);
          background:url(~assets/img/homepage/Group.png) no-repeat;background-size:100%;margin:0 auto;padding-top: px(144);
          p{color:#333;font-size:px(70);line-height:px(98);position: relative;margin-top:px(44);
            span{font-size:px(40);position: absolute;margin-left: px(10);}
          }
          >span{color:#666;font-size:px(30);margin-top:px(10);}
        }
        span{font-size:px(38);}
        >p{font-size:px(26);color:#999;line-height:px(37);margin-top:px(15);}
      }
    }
    .cooperation{height:px(205);background-color:#fff;border-top:px(1) solid #ddd;
      ul{padding:px(30);
        li{width:px(150);height:px(70);text-align:center;margin-left:px(30);margin-top:px(5);line-height:px(70);
          img{vertical-align: middle;}
          .csj{width:px(52);}
          .albb{width:px(113);}
          .caasa{width:px(86);}
          .number{width:px(95);}
          .jd{width:px(96);}
          .honor{width:px(121);}
          .baidu{width:px(97);}
          .huic{width:px(101);}
        }
        .mvl{margin-left:0;}
      }
    }
    .footer{background-color:#333;padding:px(30) px(30) px(78);text-align:center;
      hr{width:px(55);background-color:#696969;margin:px(20) auto;}
      p{color:#999;font-size: px(20);line-height:px(28);}
      a{display:block;width:px(690);height:px(94);margin:px(40) auto;border:px(2) solid #666;border-radius:px(6);text-align:center;line-height:px(90);color:#999;text-decoration:none;font-size:px(30);}
      img{width:px(140);}
      .login{
        p{font-size:px(28);
          span{cursor: pointer;}
        }
      }
    }
  }
</style>
