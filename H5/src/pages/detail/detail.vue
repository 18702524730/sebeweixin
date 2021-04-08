<template>
  <div class="page" :style="styleObject">
    <div class="head">
      <a class='head-logo' href="#"><img src='~assets/img/logo.png'></a>
      <p class="order-title" @click="goToMyOrder" v-if="getIsLogin">我的订单</p>
      <p class="order-title" v-else @click="goToLogin">登录</p>
    </div>
    <div class="body">
      <div class="body-order-img">
        <img  :src='shop.imgSrc' />
      </div>
      <div class="body-order clearfix">
          <h4>{{productPriceName}}</h4>
          <p><span>¥</span>{{standardPrice}}</p>
      </div>

      <div class="body-order-code clearfix" v-if="idcode&&codeBool">
        <p class="fl" v-show="codeShow">已指定{{idcode}}服务商</p>
        <p class="fl code_msg" v-show="!codeShow">{{idcode}}{{codedatamsg}}</p>
        <!-- 如果不存在code且验证通过则显示修改 -->
        <p class="fr code_change" @click="addProviders" v-show="codeid&&codeShow">修改</p>
        <p class="fr code_change" @click="addProviders" v-show="!codeShow">重新指定</p>
      </div>

      <div class="body-order-introduce" v-if=" num > 0 ">
        <h4>{{activityName}}</h4>
        <span>{{activityPrice}}元</span>
        <p>{{introduce}}</p>
      </div>
      <div class="body-order-amount" >
        <h4>购买数量</h4>
        <p>
          <span class="reduce-btn" @click="getReduce"></span>
          <span class="num-btn">{{shopNum}}</span>
          <span class="increase-btn" @click="getIncrease"></span>
        </p>
      </div>
       <div class="body-order-tab" id="tab-bar" :class=" position ? 'position_fixed' : ''" >
          <p class="tab-body" id="tab-body">
            <span class="tab" v-for="(e,index) in tabArr" :class=" checkedIndex == index ? 'checked' : '' " @click="getSlide(index)">{{e}}</span>
          </p>
      </div>
      <div class="tab-box" v-show="position"></div>
      <div class="body-order-slide"  id="slide_contain">
        <div class="slide" v-show=" index == checkedIndex" v-for="(e,index) in slideArr" :key='index'  v-html="e">
        </div>
      </div>
    </div>

    <div class="foot"></div>
    <div class="footer" v-if="type">
      <button v-show="!idcode" class="code_l" @click="addProviders">指定服务商</button><!--有code码隐藏-->
      <button :class="idcode ? 'code_r no_code' : 'code_r'" @click="goShopping" >立即购买</button>
    </div>
    <div v-else class="footer">
      <button class="code_r no_code" @click="goShopping" >立即购买</button>
    </div>
    <div v-transfer-dom>
      <loading v-model="loading" text="请稍候"></loading>
    </div>
    <!-- 弹框 -->
    <x-dialog v-model="show" hide-on-blur>
      <div class="dislog">
        <div class="dislog_top">
          <p class="dislog_tit">指定服务商</p>
          <input v-model="code_number" type="tel" :class="text_data ? 'fs-text' : 'fs-number'" @focus.prevent="placeholder_focus" @blur="textSize" :placeholder="placeholder_txt" maxlength="4" @click="focusclick">
          <p>注：下单后如需修改，请联系客服</p>
        </div>
        <div class="dislog_bottom">
          <p @click="code_validation">确定</p>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  import $ from 'jquery'
  import { ToastPlugin ,Swiper, SwiperItem ,XDialog, Alert ,TransferDomDirective as TransferDom, Loading } from 'vux';
  import { Tab, TabItem, Sticky } from 'vux';
  const cartUrl = CONFIG.cartUrl;
  const indexUrl =  CONFIG.indexUrl;
  export default {
    directives: {
      TransferDom
    },
    components: {
        Tab,TabItem,Sticky,
        Swiper, SwiperItem,XDialog,ToastPlugin,Loading, Alert
    },
    data () {
      return {
          styleObject:{},
          type:false,
          //判断是否验证code码,避免请求后直接显示值，请求成功或失败后显示内容又改变的问题
          codeBool:false,
          loading:false,
          codeShow:true,//服务商状态显示
          show:false,//服务商弹框
          codedata:'',//服务商code返回值
          codeApi: cartUrl + '/cartWeb/validateIdCode.htm',//服务商code码
          shopApi: cartUrl + '/products/detail.htm',   //商品详情
          buyShopApi: cartUrl + '/cartWeb/nowPlaceOrderMobine.htm', //立即购买商品
          getBillApi: '/luckdraw/billloss.htm',  //商品赠送话费的 名额数量  api
          shop: {}, // 表示的是商品
          shopNum: 1,   //商品的数量 默认为1
          checkedIndex: 0, // tab的切换  0 服务介绍 1 常见问题
          activityName:'',
          productPriceName:'',
          activityPrice:'',
          introduce:'',
          commonProblem: '',
          businessIntroduction: '',
          tabArr: ['服务介绍','常见问题'], //tab 的 标题
          slideArr: [],   //滑块的内容
          scroll: '',    //监听的滚动
          getIsLogin: false,  //表示是否登录  false 未登录 true 登录
          regAgreement: false,
          position: false,  //表示是否到tab固定到顶部 true 已经到顶部了
          tabBarTop: '',     //tab到顶部的距离
          resetTabBarTop: '', //用来储存 当 tab到顶部的时候的 offsetTop
          standardPrice: '',   //商品单价
          num: '', //表示 当期商品的赠送话费的名额  <=0 表示  名额没有  .body-order-introduce 隐藏
          id: '',  //表示 当前商品的id
          code:'',//表示服务商code码
          text_data:true, //弹出层输入框字体
          placeholder_txt:'请输入服务商识别码',
          code_number:'',
          idcode:'',//获取服务商code码
          codedatamsg:'',//服务商异常显示
          codeid:true,
          isErrIdcode: false
      }
    },
    mounted () {
      if(this.$route.query.id == 1){
        this.type = true;
      }else{
        this.type = false;
      }

      this.idcode = this.$route.query.idcode;
      // cookie初始化，防止输密码进入不带cookie造成服务商渠道错误
      if(this.$route.query.idcode){//如果连接有code保存到cookie
        this.$cookie.set('idcode',this.$route.query.idcode);
      }else{//如果没有code，则删除
        this.$cookie.delete('idcode');
      }
      this.init();
    },

    watch: {
      scroll () {
        this.tabBarTop = document.getElementById('tab-bar').offsetTop; //监听 tab 到顶部的  距离
        if ( this.scroll >= this.tabBarTop && this.tabBarTop !=0) { //到顶部 固定 然后保存 到顶部的 offsetTop
          this.resetTabBarTop = this.tabBarTop;
          this.position = true;
        } else if ( this.scroll < this.resetTabBarTop && this.tabBarTop == 0) {
          this.position = false;
        }
      }
    },

    methods: {
      // iphone锁屏后无法聚焦，需要迂回方可聚焦
      focusclick(){
        $(".dislog_top input").focus();
      },
      querycode(){
        // 查询识别码
        var self = this;
        this.$http.post(cartUrl+'/cartWeb/findIdCode.htm',qs.stringify({
          productId:self.shop.shopProductId,
          productTypeId:self.shop.shopProductTypeIdProductType,
          serviceTypeId:self.shop.shopProductTypeIdServiceType
        })).then(function(data){
          if(data.data.idCode){
            self.idcode = data.data.idCode;
            if(self.idcode){
              // 设置布尔值，对修改按钮进行隐藏
              self.codeid = false;
            }
            self.code_state(self.idcode);
          }else{
            self.idcode = self.$route.query.idcode;
            self.code_state(self.idcode);
          }
        }).catch(function(error){
          
        })
      },
      code_validation(){
        var self = this;
        self.show = false;
        if (!self.code_number.trim()) {
          return false;
        }else if(!/^\d{4}/.test(self.code_number)){
          self.$vux.toast.show({
            text: '服务商识别码为四位有效数字',
            time:'2000',
            type:'warn',
            position:'middle'
          });
          return false;
        };
        self.code_state(self.code_number);
      },
      code_state(code){
        var self = this;
        self.show = false;
        self.isErrIdcode = false;
        self.loading = true;
        self.$http.post(self.codeApi, qs.stringify({
          productId:self.shop.shopProductId,
          productTypeId:self.shop.shopProductTypeIdProductType,
          serviceTypeId:self.shop.shopProductTypeIdServiceType,
          idCode:code
        })).then(function(resp){
          self.codedata = resp;
          self.loading = false;
          if(resp.code == '0100010' || resp.code == '0100011' || resp.code == '0100012' || resp.code == '0100013' || resp.code == '0100014'){
            // 当错误的时候判断路由是否带有code，当前code是否是路由获取的
            // 如果错误且该code不是从路由获取的，则检查路由获取到的code是否正确
            if(self.$route.query.idcode&&code != self.$route.query.idcode){
              self.code_state(self.$route.query.idcode);
            }
            self.codeShow = false;
            self.codeBool = true;
            self.codedatamsg = "服务商账号异常"
            self.isErrIdcode = true;
          }else{
            self.codeShow = true;
            self.codeBool = true;
          }
          self.idcode = code;
        }).catch(function(data){
          self.loading = false;
          self.$vux.toast.show({
            text: '系统繁忙，请稍候再试'
          });
        });
      },
      placeholder_focus(){
        //解决iphone下fixed失效问题
        $('.weui-dialog').css({'top': '8rem',bottom: 'auto'});
        this.placeholder_txt = '';
        this.text_data = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      textSize(){
        this.styleObject = {};
        $('.weui-dialog').css({'top': '50%',bottom: 'auto'});
        if(this.code_number){
          this.text_data = false;
        }else{
          this.text_data = true;
          this.placeholder_txt = '请输入服务商识别码';
        }
      },
      addProviders(){
        this.show = true;
        this.code_number = '';
        this.text_data = true;
        this.placeholder_txt = '请输入服务商识别码';
      },
      init () {
        //获取商品详情
        this.getBill();  //获取商品赠送话费的剩下的名额
        this.isLogin();   //判断是否登录
        this.getDetail(); //获取商品的价格  图标
        window.addEventListener('scroll', this.listenScroll);
      },

      isLogin () {
        var user_token = this.$cookie.get('user_token');  //cookie没有phone的信息  表示未登录
        if ( !user_token ) {
          this.getIsLogin = false;
        } else {
          this.getIsLogin = true;
        }
      },

      listenScroll () { //window的 offsetTop
        this.scroll = document.body.scrollTop || document.documentElement.scrollTop;
      },

      //头部跳到注册页面
      goToLogin () {
        var path = location.href;
        this.$router.push({path: '/smsLogin',query:{return_url: path}});
      },

      getReduce () { //商品的购买数量减少时间
        this.shopNum == 1 ? '' : this.shopNum--;
      },

      getIncrease () { //商品的购买数量增加事件
        this.shopNum == 45 ? '' : this.shopNum++;

      },

      getSlide (index) {  //点击tab滑块的事件
        this.checkedIndex = index;
        if ( this.tabBarTop != 0 ) {
          document.body.scrollTop = this.tabBarTop;
          document.documentElement.scrollTop = this.tabBarTop;;
        }
        if (this.resetTabBarTop != 0 ) {
          document.body.scrollTop = this.resetTabBarTop
          document.documentElement.scrollTop = this.resetTabBarTop;
        }
      },

      getDetail () {  //获取商品详情
        this.id = this.$route.query.id || 1;
        this.$http.get( this.shopApi + '?priceId=' + this.id).then((resp)=> {
          var data = resp.data;
          this.shop = {
            imgSrc: data.picture,
            shopProductId: data.productId,
            shopProductTypeIdProductType: data.productTypeId,
            shopProductTypeIdServiceType: data.serviceTypeId,
            number: data.number,
            title: data.productPriceName,
            desc: data.activityName + data.activityPrice + '元',
            price: data.standardPrice,
          };

          this.querycode();
          // this.code_state(self.idcode);

          this.standardPrice = data.standardPrice;
          this.activityName = data.activityName;
          this.activityPrice = data.activityPrice;
          this.introduce = data.introduce;
          this.productPriceName = data.productPriceName;
          this.businessIntroduction = data.applyProcess;
          this.commonProblem = data.commonProblem;
          this.slideArr.push(this.businessIntroduction,this.commonProblem);
        }).catch((error)=> {
          console.log(error);
        })
      },

      goToMyOrder () {//查看我的订单
        this.$router.push({path: '/myOrders'});
      },

      getBill () { //商品的赠送话费的名额
        this.id = this.$route.query.id || 1;
        this.$http.get(cartUrl + this.getBillApi).then((resp)=>{
          resp.data.forEach((item,index,arr)=>{
            if ( item.id == this.id ) {
              this.num = item.num;
            }
          });
        }).catch((error)=>{
            console.log(error);
        });
      },

      goShopping () {  //立即购买按钮 未登录  跳到注册 页面  登录 跳到支付页面
        var self = this;
        var idcode;
        idcode = self.idcode;
        var user_token = this.$cookie.get('user_token');
        var data = {
            imgSrc: self.shop.imgSrc,
            id: self.id,
            shopProductId: self.shop.shopProductId,
            shopProductTypeIdProductType: self.shop.shopProductTypeIdProductType,
            shopProductTypeIdServiceType: self.shop.shopProductTypeIdServiceType,
            number: self.shopNum,
            title: self.shop.title,
            desc: self.shop.desc,
            price: self.shop.price,
            idCode: self.isErrIdcode ? '' : idcode
        };
        var path = location.href;
        var newQuery = Object.assign({},{return_url: path},{isShop: true},data);
        if ( !user_token ) {
          this.$router.push({ path: '/smsLogin',query:newQuery});
          return false
        };
        this.$router.push({ path: '/confirm',query: data });
      },
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .page {
    .head {
      position: relative;
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
      background: #efeff4;

      .body-order-img {
        width: px(750);
        height: px(500);
         img {
           width: 100%;
           height: 100%;
         }
      }

      .body-order {
        position: relative;
        height: px(180);
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        background: #fff;


        h4 {
          position: absolute;
          top: px(26);
          left: px(30);
          height: px(48);
          font-size: px(34);
          color: #333;
          font-weight:normal;
          span  {
            padding-left: px(26);
          }

        }


        p {
          position: absolute;
          top: px(94);
          left: px(30);
          width: px(181);
          height: px(56);
          line-height: px(58);
          font-size: px(50);
          color: #f64744;

            span {
              font-size: px(34);
            }
        }
      }
      .body-order-code{height:px(88);background-color:#fff;padding:px(22) px(30);
        p{font-size:px(32);line-height:px(45);height:px(45);}
        .code_msg{color:#f64744}
        .code_change{color:#3db1fa;}
      }

      .body-order-introduce {
        position: relative;
        margin: px(21) auto 0;
        height: px(134);
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        background: #fff;
        h4 {
          position: absolute;
          top: px(20);
          left: px(30);
          height: px(37);
          line-height: px(37);
          font-size: px(32);
          font-weight:normal;
        }

        span {
          position: absolute;
          top: px(20);
          right: px(30);
          font-size: px(32);
          color: #f54845;
        }

        p {
          position: absolute;
          top: px(76);
          left: px(30);
          height: px(37);
          line-height: px(37);
          font-size: px(26);
          color: #999;
        }
      }

      .body-order-amount {
        margin: px(21) auto px(19) ;
        position: relative;
        height: px(88);
        background: #fff;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;

        h4 {
          position: absolute;
          top: px(22);
          left: px(30);
          height: px(45);
          line-height: px(45);
          font-size: px(32);
          font-weight: normal;
        }

        p {

          span {
              display: inline-block;
              width: px(60);
              height: px(60);
              position: absolute;
              top: px(14.4);
          }

          .reduce-btn {
              left: px(541.5);
              background: url(~assets/img/detail/detail_02.jpg) no-repeat;
              background-size: contain;
          }

          .num-btn {
              left: px(601.5);
              line-height: px(60);
              font-size: px(34);
              text-align: center;
              color: #333;

          }

          .increase-btn {
              left: px(661.5);
              background: url(~assets/img/detail/detail_03.jpg) no-repeat;
              background-size: contain;

          }

        }



      }

      .body-order-tab {
        height: px(88);
        overflow: hidden;
        background: #fff;

        .tab-body {
          position: relative;
          width: px(750);
          height: px(88);
          background: #fff;


          .tab {
            display: block;
            position: absolute;
            top: px(21);
            left: px(30);
            height: px(66);
            line-height: px(45);
            font-size: px(32);
            text-align: center;
            background: #fff;

            &:nth-of-type(2) {
              left: px(226);
            }

            &:nth-of-type(3) {
              left: px(592);
            }


          }

          .checked {
            color: #3db1fa;
            border-bottom: 2px solid #3db1fa;
          }
        }
      }

      .tab-box {
        width: 100%;
        height: px(88);
      }

      .position_fixed {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      .body-order-slide {
        background: #fff;
        overflow: auto;

        p {
              line-height: px(48);
              font-size: px(26);
          }

        .slide:nth-of-type(2) {
            h4 {
              display: none;
            }
            p {
              padding: 0 px(30);
            }
          }

          padding-bottom: px(10);
      }
    }
    .foot {
      width: px(750);
      height: px(94);
      clear: both;
    }

    .footer {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      //未填写服务商代码
      .no_code{width:100%;}
      .code_r{background-image: linear-gradient(-225deg, #F57645 0%, #F54845 100%);}
      .code_l{background-image: linear-gradient(-225deg, #F5AD45 0%, #FF7E3E 100%);}
      button {
        width: 50%;
        float:left;
        height: px(94);
        font-size: px(36);
        color: #fff;
      }
    }
    .vux-x-dialog{
      .weui-dialog{
        width:px(690);max-width:px(690);
        .dislog{
          .dislog_top{box-sizing:border-box;width:px(690);padding:px(60) px(135);
            .fs-number{font-size:px(70);letter-spacing: px(30);}
            input{font-size:px(34);height:px(120);width:px(420);text-align:center;margin-bottom:px(20);margin-top:px(30);border:px(1) solid #ddd;-webkit-user-select:auto ;user-select:auto !important;}
            p{font-size:px(26);color:#999;line-height:px(37);}
            .dislog_tit{font-size:px(40);color:#333;line-height:px(56);}
          }
          .dislog_bottom{
            p{border-top:px(1) solid #e5e5e5;color:#3db1fa;height:px(112);line-height:px(112);font-size:px(36);}
          }
        }
      }
    }
  }
</style>
