<template>
    <div class="nopay-detail">
    <div class="head">
      <a class='head-logo' href="#"><img src='~assets/img/logo.png'></a>
      <p class="order-title" @click="goToMyOrder">我的订单</p>
    </div>
        <div class="pay_header">
            <p v-if="pay_state===-1" class="pay-tit">已关闭</p>
            <p v-if="pay_state===0" class="pay-tit">待付款</p>
            <p v-if="pay_state===1" class="pay-tit">已付款</p>
            <p class="pay-txt">极速快捷申报，专家跟踪指导</p>
            <img v-if="pay_state===-1" src="~assets/img/myOrders/close.png" alt="">
            <img v-if="pay_state===0" src="~assets/img/myOrders/nopay_bk.png" alt="">
            <img v-if="pay_state===1" src="~assets/img/myOrders/pay_bk.png" alt="">
        </div>
        <div class="pay_body">
            <div class="body_top bpt" v-if="business != 2">
                <p v-if="pay_state===-1" class="pay-tit">已关闭</p>
                <p v-if="pay_state===0">待付款</p>
                <p v-if="pay_state===1">已付款</p>
                <div class="trademark-data clearfix" :class="{uplist:!itemlist&&paydetail.total>3}">
                    <div class="detail_lists bpt clearfix" v-for="item in paydetail.data">
                        <div class="clearfix servicr_num">
                            <p class="fl">服务单号：{{item.order_sn}}</p>
                            <p v-if="item.order_promotion_code" class="trademark-prefer fr">送{{item.order_promotion_code}}元话费</p>
                        </div>
                        <p class="trademark-name fl">{{item.orderName}}</p>
                        <p class="trademark-price fr"><span class="fr">x1</span></p>
                        <div class="unit fl">
                            <p>&yen;{{item.payment_amount|priceformat}}</p>
                            <p v-if="item.id_code" class="code">{{item.id_code}}服务商</p>
                        </div>
                    </div>
                </div>
                <div class="zoom bpt" v-if="paydetail.total>3">
                    <p @click.prevent="itemlist=!itemlist">
                        {{!itemlist ? "点击展开" : "点击收起"}}
                        <img v-if="!itemlist" src="~assets/img/myOrders/up.png" alt="">
                        <img v-else src="~assets/img/myOrders/down.png" alt="">
                    </p>
                </div>
                <div class="real-pay bbt bpt">
                    <p>
                        <span class="pay-text">实付：</span>
                        <span class="pay-num">￥{{payment.payment_amount|priceformat}}</span>
                    </p>
                </div>
            </div>
            <div class="body_top bpt" v-else>
                <p v-if="pay_state===-1" class="pay-tit">已关闭</p>
                <p v-if="pay_state===0">待付款</p>
                <p v-if="pay_state===1">已付款</p>
                <div class="trademark-data clearfix" :class="{uplist:!itemlist&&paydetail.total>3}">
                    <div class="detail_lists bpt clearfix" v-for="item in paydetail.data">
                        <div class="clearfix servicr_num">
                            <p class="fl">服务单号：{{item.orderSn}}</p>
                            <p v-if="item.order_promotion_code" class="trademark-prefer fr">送{{item.order_promotion_code}}元话费</p>
                        </div>
                        <p class="trademark-name fl">{{payment.orderName}}</p>
                        <p class="trademark-name fl">{{item.fileName}}</p>
                        <p class="trademark-price fr"><span class="fr">{{item.fileSize|fileSizeFilter}}</span></p>
                        <div class="unit fl">
                            <p>￥{{payment.amount|priceformat}}</p>
                        </div>
                    </div>
                </div>
                <div class="zoom bpt" v-if="paydetail.total>3">
                    <p @click.prevent="itemlist=!itemlist">
                        {{!itemlist ? "点击展开" : "点击收起"}}
                        <img v-if="!itemlist" src="~assets/img/myOrders/up.png" alt="">
                        <img v-else src="~assets/img/myOrders/down.png" alt="">
                    </p>
                </div>
                <div class="real-pay bbt bpt">
                    <p>
                        <span class="pay-text">实付：</span>
                        <span class="pay-num">￥{{payment.payment_amount|priceformat}}</span>
                    </p>
                </div>
            </div>
            <div class="body_bottom bbt bpt">
                <a href="tel:4000315426">
                    <p>
                        <img src="~assets/img/myOrders/icon.png" alt="">
                    联系客服
                    </p>
                </a>
            </div>
            <div class="pay_information bpt bbt" :class="{p_h:pay_state==1,np_h:pay_state!=1}">
                <p>订单号：{{payment.order_fictitious_sn}}</p>
                <p>下单时间：{{payment.create_time | dateFormat}}</p>
                <p v-if="pay_state>0">微信交易号：{{payment.payment_sn}}</p>
                <p v-if="pay_state>0">支付时间：{{payment.payment_time | dateFormat}}</p>
            </div>

        </div>
        <div v-if="pay_state===0" class="pos-fix pay_information bpt">
            <a href="" @click.prevent="gotoPay(payment)">去付款</a>
        </div>
        <div v-if="pay_state===1 || pay_state===-1" class="pos-fix pos-fix1 bpt">
            <a class="home-page" href="#/homepage">去首页看看</a>
        </div>
        <div v-transfer-dom>
            <loading v-model="loading" text="请稍候"></loading>
        </div>
    <service-agreement :orderNum="orderNum" :paymentSn="paymentSn" :regAgreement.sync="regAgreement" @closePop="regAgreement=false" v-if="regAgreement"></service-agreement>
    </div>
</template>
<script>
import Vue from 'vue'
import Filters from 'src/utils/filters.js'
import qs from 'qs'
import serviceAgreement from 'components/serviceAgreement.vue'
const indexUrl = CONFIG.indexUrl;
const rootUrl = CONFIG.rootUrl;
const czUrl = CONFIG.czUrl;
import { querystring } from 'vux'
import { CheckIcon, Alert, TransferDomDirective as TransferDom, Loading} from 'vux'
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
      Alert,
      CheckIcon,
      serviceAgreement,
      Loading
    },
    data(){
      return{
        business:'1',
        orderNum:'',
        paymentSn:'',
        regAgreement: false,
        submitDisabled: false,
        loading: false,
        payment:{},
        paySnInfo:{},
        pay_sn:'',
        pay_state:'',
        paydetail:{},
        itemlist:false//服务单号，显示数量
      }
    },
    methods:{
      goToMyOrder () {
        this.$router.push({path: '/myOrders'});
      },
        //去支付
        gotoPay(item){
            var self = this;
            self.orderNum = item.order_fictitious_sn;
            self.paymentSn = item.payment_sn;
            self.regAgreement = true;
        },
        //查询订单详情
      search(){
        var self = this;
        self.loading = true;
        self.$http.post('./api/findFictitiousDetails', qs.stringify({
          orderFictitiousSn: self.pay_sn
        }))
        .then((response) => {
            self.business = response.data[0]['orderBussinessType'] || '1';;
            self.loading = false;
            self.paydetail = response;
            self.payment = response.fictitious;
            self.paySnInfo = response.fictitious;
            self.pay_state = self.payment.order_state;
        })
        .catch((error) => {
            self.loading = false;
            if(error.response.status == 401 ) {
                  var path = location.href;
            self.$router.push({path: '/smsLogin',query:{return_url: path}});
          }
        });
      }
    },
    mounted(){
        var self = this;
        this.pay_sn = this.$route.params.pay_order;//从router获取订单号
        this.search();
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      priceformat:Filters.priceformat,
      fileSizeFilter: Filters.fileSizeFilter
    }
  }

</script>
<style lang="scss">
    @import  "~assets/css/adaptation.scss";
    .bbt{border-bottom:1px solid #e5e5e5}
    .bpt{border-top:1px solid #e5e5e5}
    .nopay-detail{
        position: relative;
        background-color:#efeff4;
        padding-bottom: px(140);
        overflow-y: auto;
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
        .pay_header{
            width: px(750);
            height: px(240);
            padding-left: px(30);
            padding-top:px(78);
            background:linear-gradient(to right,#f57645,#f57845);
            position: relative;
            img{
                width:px(252);
                height:px(170);
                position: absolute;
                top:px(35);
                right:px(52);
            }
            .pay-tit{
                font-size:px(34);
                height:px(48);
                line-height:px(48);
                color:#fff;
            }
            .pay-txt{
                color:#fff;
                font-size:px(26);
                height:px(37);
                line-height:px(37);
                margin-top:px(10);
            }
        }
        .pay_body{
            margin-top:px(20);
            .body_top{
                background-color:#fff;
                >p{
                    margin-left:px(30);
                    height:px(76);
                    line-height:px(76);
                    font-size:px(26);
                    color:#999;
                    text-align: left;
                }
                .uplist{height:px(560);overflow: hidden;}
                .trademark-data{
                    padding-left: px(30);
                    img{
                        width:px(180);
                        height:px(180);
                    }
                    .detail_lists{
                        padding:px(30) px(0);
                        .unit{width:px(480);margin-top:px(10);
                            p{font-size:px(32);color:#333;}
                            .code{color:#999;font-size:px(28);margin-top:px(20);}
                        }
                        .servicr_num{margin-bottom:px(16);}
                        p{
                            font-size:px(30);
                            color:#999;
                            text-align: left;
                            margin-left:0;
                            height:px(30);
                            line-height:px(30);
                        }
                        .trademark-name{
                            width:px(504);
                            height:px(30);
                            margin-bottom: px(10);
                            line-height:px(30);
                            color:#333;
                            font-size:px(30);
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                    div{
                        p{border:0}
                        .trademark-prefer{
                            padding-right: px(30);
                            color:#f54845;
                            font-size:px(28);
                            height:px(30);
                            line-height:px(30);
                        }
                        .trademark-price{
                            height:px(36);
                            line-height:px(36);
                            padding-right:px(30);
                            span{
                                color:#333;
                            }
                        }
                    }
                }
                .zoom{
                    height:px(88);
                    p{
                        text-align:center;
                        line-height:px(88);
                        color:#999;
                        font-size:px(26);
                        img{width:px(25);}
                    }
                }
                .real-pay{
                    p{
                        height:px(88);
                        text-align:right;
                        padding-right:px(28);
                        line-height:px(88);
                        border:0;
                        .pay-text{
                            font-size:px(28);
                            color:#999;
                        }
                        .pay-num{
                            font-size:px(32);
                            color:#F64744;
                        }
                    }
                }
            }
            .body_mid{
                border-bottom:1px solid #e5e5e5;
                border-top:1px solid #e5e5e5;
                box-sizing:border-box;
                background-color:#fff;
                margin-top:px(20);
                padding-left:px(30);
                padding-bottom: px(30);
                .itemlists{
                    margin-top:px(20);
                    height:px(37);
                    line-height:px(37);
                    span{
                        font-size:px(26);
                        color:#999;
                    }
                }
                .bbt{
                    height:px(87);
                    line-height:px(87);
                    padding-right:px(30);
                    .tfl{
                        color:#333;
                        font-size:px(32);
                    }
                    .tfr{
                        color:#999;
                        font-size: px(32);
                    }
                }
            }
            .np_h{height:px(110);}
            .p_h{height:px(190);}
            .pay_information{
                background-color:#fff;
                margin-top:px(20);
                padding-left:px(30);
                padding:px(20) px(30);
                p{
                    color:#999;
                    font-size:px(26);
                    height:px(37);
                    line-height:px(37);
                }
                .service{
                    font-size: px(32);
                    color:#333;
                    padding-right:px(30);
                    height:px(88);
                    line-height:px(88);
                    margin-bottom:px(30);
                    span{
                        color:#999;
                    }
                }
            }
            .body_bottom{
                background-color:#fff;
                margin-top:px(20);
                a{
                    height:px(88);
                    display:block;
                    text-decoration:none;
                    p{
                        text-align:center;
                        line-height:px(88);
                        font-size:px(32);
                        img{
                            vertical-align:middle;
                            width:px(47);
                            height:px(47);
                        }
                    }
                }
            }
        }
        .pos-fix{
            position: fixed;
            bottom:0;
            width:px(750);
            background-color:#fff;
            .home-page{
                display:block;
                width:px(250);
                height:px(60);
                line-height:px(60);
                border-radius:px(6);
                text-align:center;
                border:1px solid #f54845;
                color:#f54845;
                font-size:px(26);
                margin:px(30) auto;
            }
        }
        .pos-fix1{
            position: absolute;
        }
        .pay_information{
            left:px(0);
            bottom:px(0);
            height:px(94);
            width:px(750);
            background-color:#fff;
            margin-top:px(20);
            a{
                box-sizing:border-box;
                display:block;
                width:px(140);
                height:px(60);
                border-radius:px(6);
                margin-top:px(16);
                float:right;
                border:1px solid #f54845;
                text-align:center;
                line-height:px(60);
                margin-right: px(30);
                font-size: px(32);
                color:#f54845;
            }
        }
    }
</style>
