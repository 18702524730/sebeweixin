<template>
<div class="order_list">
    <div class="head">
      <a class='head-logo' href="#" @click="goToIndex"><img src='~assets/img/logo.png'></a>
      <!-- <p class="order-title" @click="logout">退出登录</p> -->
    </div>
    <div v-if="data.length" class="lists main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :top-distance="0" bottom-loading-text="" bottom-drop-text="" bottom-pull-text="">
        <div class="pay_list">
          <img v-if="!trueimg" class="logo" src="~assets/img/myOrders/mine_logo.png" alt="">
          <img v-else class="logo" :src="trueimg" alt="">
          <img class="bg" src="~assets/img/myOrders/mine_bk.png" alt="">
          <span>{{truename || truephone}}</span>
          <p v-if="channel == 1">温馨提示：微信与您的账号已自动绑定，无需密码登录</p>
          <p v-else>温馨提示：已为您自动登录</p>
        </div>
        <!-- token:{{token}}<br>
                  openid:{{openid}} -->
        <div class="list_data bbt bpt" v-for="item in data">
          <p class="clearfix bbt">
            <span class="fl">订单号：{{item.order_sn}}</span>
            <span class="fr">{{item.create_time|format}}</span>
          </p>
          <div class="clearfix" @click.stop="orsergo(item)">
            <div class="fl clearfix">
              <p class="trademark-type fl">{{item.orderName}}</p>
              <p class="fl" v-if="item.paymentNumber>1">等{{item.paymentNumber}}个服务项</p>
              <!-- <p class="prefer">送300元话费</p> -->
            </div>
          </div>
          <p class="price clearfix">
            <span>合计：</span><span class="money-num">￥{{item.payment_amount | priceformat}}</span>
            <span class="fr" v-if="item.order_state == -1">交易关闭</span>
            <a class="fr" href="" @click.prevent="gotoPay(item)" v-if="item.order_state == 0">去付款</a>
          </p>
        </div>
      </v-loadmore>
      <p v-if="!untext && !loading" class="bottom-null">
        <span>上拉加载更多</span>
      </p>
      <p v-if="untext" class="bottom-null">
        <i class="fl"></i>
        <i class="fr"></i>
        <span>没有更多了</span>
      </p>
    </div>
    <div v-if="!loading && !data.length" class="data-null">
      <div class="pay_list">
        <img v-if="!trueimg" class="logo" src="~assets/img/myOrders/mine_logo.png" alt="">
        <img v-else class="logo" :src="trueimg" alt="">
        <img class="bg" src="~assets/img/myOrders/mine_bk.png" alt="">
        <span>{{truename || truephone}}</span>
        <p v-if="channel == 1">温馨提示：微信与您的账号已自动绑定，无需密码登录</p>
        <p v-else>温馨提示：已为您自动登录</p>
      </div>
      <img src="~assets/img/myOrders/nothing.png" alt="">
      <p>您还没有订单哦</p>
      <router-link to="/">去下单</router-link>
    </div>
    <div v-transfer-dom>
      <loading v-model="loading" text="请稍候"></loading>
    </div>
    <service-agreement :orderNum="orderNum" :paymentSn="paymentSn" :regAgreement.sync="regAgreement" @closePop="regAgreement=false" v-if="regAgreement"></service-agreement>
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js'
  import serviceAgreement from 'components/serviceAgreement.vue'
  import {Loadmore} from 'mint-ui';
  import { querystring } from 'vux'
  import { CheckIcon, Alert, TransferDomDirective as TransferDom, Loading} from 'vux'
  // import Loadmore from 'vue-loadmore';
  const payUrl = CONFIG.payUrl; //支付接口根路径
  const wxpaymentUrl = payUrl + '/iprp_app/api/wxpayment'; //微信支付接口
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
    directives: {
      TransferDom
    },
    components: {
        'v-loadmore':Loadmore,
        serviceAgreement,
      Alert,
      CheckIcon,
      Loading
    },
    data() {
      return {
        channel: '',
        truename:'',//用户名,暂时为phone（产品原型图给的只有phone）
        truephone:'',
        trueimg:'',
        token:'',
        openid: '',
        datalist:true,//判断是否有数据
        orderNum:'',
        paymentSn:'',
        regAgreement: false,
        submitDisabled: false,
        loading: false,
        untext:false,
        page:0,//页数初始值
        data:[],
        size: 5, //一页显示几个
        pageList:0,  //接口获取所有数据length
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      }
    },
    mounted(){
        this.search(0);
      this.channel = sessionStorage.getItem('channel') || 1;
        this.token = this.$cookie.get('user_token');
        this.openid = getQueryString('openid');
        this.truename = this.$cookie.get('truename');
        this.truephone = this.$cookie.get('phone');
        this.trueimg = this.$cookie.get('avatar');
    },
    methods: {
      goToIndex(){
        this.$router.push({path: '/'});
      },
      //删除关键cookie
      clearCookie(){
        this.$cookie.delete('truename', {domain: '.ipsebe.com'});
        this.$cookie.delete('phone', {domain: '.ipsebe.com'});
        this.$cookie.delete('user_token', {domain: '.ipsebe.com'});
      },
      logout(){
        var self = this;
        var path = location.href;
        self.$http.post("./api/logout?access_token=" + self.$cookie.get('user_token'))
        .then((response) => {
          self.clearCookie();
          self.$router.push({path: '/login',query:{return_url: path}});
        })
        .catch((error) => {
          self.clearCookie();
          if (!error.response) {
            self.$router.push({path: '/login',query:{return_url: path}});
            return;
          }
          var data = error.response.data;
          if (data.status === 401) {
            self.$router.push({path: '/login',query:{return_url: path}});
          }
        });
      },
      //去支付
      gotoPay(item){
          var self = this;
          self.orderNum = item.order_sn;
          self.paymentSn = item.payment_sn;
          self.regAgreement = true;
      },
      search(page){
        var self = this;
        self.loading = true;
        self.orderState = '99';
        //获取当前页面的数据length，将其与接口中的total对比
        if(self.data.length == this.pageList && self.data.length>0){//当当前length等于接口中total则显示“没有更多”
            self.untext = true;
            // 是否还有更多，如果没有就禁止上拉刷新
            this.allLoaded = true; //true是禁止上拉加载
            self.loading = false;
            return;
        }
        self.$http.post('./api/findFictitiousOrderList', qs.stringify({
          orderState: self.orderState,
          page: page,
          size: self.size
        }))
        .then((response) => {
            self.loading = false;
            self.pageList = response.total;
            if(self.pageList === 0){

            }
            if(response.data){
                self.loading = false;
                for(var i=0;i<response.data.length;i++){
                    self.data.push(response.data[i]);
                }
            }
        })
        .catch((error) => {
            if (error.response.status == 401 ) {
                var path = location.href;
        self.$router.push({path: '/login',query:{return_url: path}});
            }
        });
        this.$nextTick(function () {
          //先设置属性为auto，正常滑动，加载完数据后改成弹性滑动
          this.scrollMode = "touch";
        });
      },
      orsergo(item){
          this.$router.push({ name: 'paymentDetail', params:{pay_order:item.order_sn} });
      },
      loadBottom:function() {
          // 上拉加载
          this.page +=1;//每次page加1
          this.search(this.page);
          this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      }
    },
    filters: {
      format: Filters.formatDate.format,
      priceformat:Filters.priceformat
    }
  }
</script>
<style lang="scss">
  @import  "~assets/css/adaptation.scss";
  .order_list{
        background-color:#EFEFF4;
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
        .bbt{border-bottom:px(1) solid #e5e5e5}
        .bpt{border-top:px(1) solid #e5e5e5}
        .pay_list{
            width:px(750);
            height:px(400);
            background:linear-gradient(to left,#3db1fa 0%,#3d95fa 100%);
            text-align:center;
            position: relative;
            padding-top:px(255);
            .bg{
                width:px(490);
                height:px(186);
                position: absolute;
                left:px(117);
                bottom:0;
                margin-top:px(0);
            }
            .logo{
                width:px(180);
                height:px(180);
                position: absolute;
                top:px(60);
                left:px(285);
                margin-top:px(0);
                border-radius:50%;
            }
            span{
                font-size:px(32);
                color:#fff;
            }
            p{
                width:100%;
                font-size:px(26);
                color:#b4dfff;
                text-align:center;
                position: absolute;
                bottom:px(40);
            }
        }
        .lists{
            height:px(1345);
            .list_data{
                padding-bottom:px(15);
                margin-top:px(20);
                background-color:#fff;
                >p{
                    font-size: px(26);
                    color:#999;
                    padding:px(20) 0;
                    line-height:px(26);
                    margin-left: px(30);
                    padding-right: px(30);
                }
                >div{
                    padding-left: px(30);
                    padding-bottom:px(20);
                    padding-top:px(30);
                    img{
                        width:px(180);
                        height:px(180);
                    }
                    p{
                        font-size:px(30);
                    }
                    .trademark-type{
                        padding-left:px(0);
                        margin-bottom:px(10);
                        max-width:px(480);
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .prefer{
                        font-size: px(28);
                        color:#999;
                        margin-bottom:px(48);
                    }
                    .paymoney{
                        width:px(480);
                    }
                }
                .price{
                    font-size: px(32);
                    color:#999;
                    line-height:px(50);
                    padding:0 px(30) 0 0;
                    span{font-size:px(28);}
                    .money-num{
                        color:#f54845;
                        font-size:px(32);
                    }
                    a{
                        text-decoration:none;
                        box-sizing:border-box;
                        color:#f54845;
                        display:block;
                        width:px(140);
                        height:px(60);
                        border-radius:px(6);
                        border:px(1) solid #f54845;
                        text-align:center;
                        line-height:px(62);
                        margin-top:px(-6);
                        font-size:px(26);
                    }
                }
            }
        }
        .bottom-null{
            padding:0 px(30);
            text-align:center;
            margin-top:px(30);
            margin-bottom:px(40);
            span{
                font-size: pz(26);
                color:#bbb;
            }
            i{
                border-bottom:px(1) solid #ddd;
                height:px(1);
                width:px(258);
                margin-top:px(18);
            }
        }
        .data-null{
            text-align:center;
            padding-bottom: px(300);
            img{
                width:px(248);
                height:px(237);
                margin-top:px(101);
            }
            p{
                color:#bbb;
                font-size:px(32);
                margin-top: px(30);
            }
            a{
                display:block;
                box-sizing:border-box;
                width:px(250);
                height:px(70);
                border-radius:px(6);
                border:px(1) solid #3db1fa;
                text-align:center;
                line-height:px(70);
                font-size:px(32);
                color:#3db1fa;
                margin:px(20) auto;
            }
      .pay_list{
        p{font-size:px(28);bottom:px(36); padding: 0 px(30);}
      }
        }
    }
.mint-loadmore {
    overflow: hidden;
}
.lists {
    margin-top: -1px;
    overflow-y: scroll;
}
::-webkit-scrollbar-thumb{width:0;height:0;}
</style>
