<template>
    <section class="confirm-home">
      <div class="body_top">
        <div class="trademark-data clearfix ">
          <div class="imgwrap">
            <img :src="urlParamsObj.imgSrc" alt="">
          </div>
          <div class="info">
            <p class="trademark-name">{{urlParamsObj.title}}</p>
            <p class="trademark-prefer" v-if="num>0">{{urlParamsObj.desc}}</p>
            <p class="trademark-price clearfix"><span class="fl">￥{{urlParamsObj.price|priceformat}}</span><span class="fr">x{{urlParamsObj.number}}</span></p>
          </div>
        </div>
      </div>
      <ul class="payType">
        <li>微信支付</li>
      </ul>
      <div class="payType code" v-if="paramsidcode">
        <p><span>已指定{{paramsidcode}}服务商</span></p><!-- <input type="tel" v-model="urlParamsObj.idCode" placeholder="请输入服务商识别码" maxlength="4"> -->
      </div>
      <div class="bottom-wrap">
        <!-- <div>微信发送参数：{{data1}}</div>
        <div>获取签名：{{data}}</div>
        <div>微信返回：{{error_}}</div> -->
        <!-- <div class="agree"><check-icon :value.sync="isChecked">同意<a href="" @click.prevent="goToRule">《拾贝网服务协议》</a></check-icon></div> -->
        <p>支付成功后可在【我的订单】中查看详情</p>
        <div class="total-wrap">合计：<b>¥{{urlParamsObj.price*urlParamsObj.number | priceformat}}</b><a href="" @click.prevent="submitOrder">立即下单</a></div>
      </div>
      <div v-transfer-dom>
        <alert v-model="show">亲，不要忘了阅读并勾选《拾贝网服务协议》哦~</alert>
      </div>
      <div v-transfer-dom>
        <alert v-model="code_show">{{code_msg}}</alert>
      </div>
      <div v-transfer-dom>
        <loading v-model="loading" text="请稍候"></loading>
      </div>
      <service-agreement :orderNum="orderNum" :paymentSn="paymentSn" :regAgreement.sync="regAgreement" @closePop="regAgreement=false" v-if="regAgreement"></service-agreement>
    </section>
</template>

<script>
  import Vue from 'vue'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js'
  import serviceAgreement from 'components/serviceAgreement.vue'
  import { querystring } from 'vux'
  import { CheckIcon, Alert, TransferDomDirective as TransferDom, Loading} from 'vux'
  const cartUrl = CONFIG.cartUrl;
  const createOrderUrl = cartUrl+'/cartWeb/nowPlaceOrderMobine.htm'; //生成订单接口
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
    props:["statisticData"],
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
        paramsidcode:'',//当前code
        codeApi: cartUrl + '/cartWeb/validateIdCode.htm',//服务商code码
        data:{},
        data1:{},
        error_0:{},
        error_:{},
        info: {},
        id: '',
        num:'',
        orderNum:'',
        paymentSn:'',
        regAgreement: false,
        show: false, //勾选协议提醒弹框
        isChecked: true,  //勾选协议
        submitDisabled: false, //避免二次提交
        loading: false, //加载提示
        urlParamsObj:{}, //url查询参数
        code_show:false,//服务商code异常
        code_msg:''//服务商code码异常显示内容
      }
    },
    methods:{
      querycode(){
        // 查询识别码
        var self = this;
        this.$http.post(cartUrl+'/cartWeb/findIdCode.htm',qs.stringify({
          productId:self.urlParamsObj.shopProductId,
          productTypeId:self.urlParamsObj.shopProductTypeIdProductType,
          serviceTypeId:self.urlParamsObj.shopProductTypeIdServiceType
        })).then(function(data){
            if(data.data.idCode){
              // 设置布尔值，对修改按钮进行隐藏
              self.codeid = false;
              self.idcode = data.data.idCode;
            }else{
              self.codeid = true;
              self.idcode = self.urlParamsObj.idCode;
            }
            console.log(self.codeid)
            self.code_state(self.idcode);
        }).catch(function(error){
        })
      },
      code_state(code){
        var self = this;
        self.show = false;
        self.loading = true;
        self.$http.post(self.codeApi, qs.stringify({
          productId:self.urlParamsObj.shopProductId,
          productTypeId:self.urlParamsObj.shopProductTypeIdProductType,
          serviceTypeId:self.urlParamsObj.shopProductTypeIdServiceType,
          idCode:code
        })).then(function(resp){
          self.codedata = resp;
          self.loading = false;
          if(resp.code == '0100010' || resp.code == '0100011' || resp.code == '0100012' || resp.code == '0100013' || resp.code == '0100014'){
            // 使用获取的code
            self.paramsidcode = self.urlParamsObj.idCode;
          }else{
            self.paramsidcode = code;
          }
        }).catch(function(data){
          self.loading = false;
          self.$vux.toast.show({
            text: '系统繁忙，请稍候再试'
          });
        });
      },
      getBill () {
        this.id = this.$route.query.id || 1;
        this.$http.get(cartUrl + '/luckdraw/billloss.htm').then((resp)=>{
          resp.data.forEach((item,index,arr)=>{
            if ( item.id == this.id ) {
              this.num = item.num;
            }
          });
        }).catch((error)=>{
            console.log(error);
        });
      },
      goToRule () {
        this.regAgreement = true;
      },
      // 生成订单、调用公众号支付
      submitOrder (data) {
        var self = this;
        var idcode = self.urlParamsObj.idCode;
        if(!idcode){
        }else if(!/^\d{4}/.test(idcode)){
          self.$vux.toast.show({
            text: '服务商识别码为四位有效数字',
            time:'2000',
            type:'warn',
            position:'middle'
          });
          return false;
        };
        //判断识别码渠道
        if(idcode == this.$cookie.get('idcode')){
          // 扫码进入
          self.urlParamsObj.invitedChannel = 3;
        }else if(idcode != this.$cookie.get('idcode') || !this.cookie.get('idcode')){
          // 非扫码
          self.urlParamsObj.invitedChannel = 5;
        }
        if (self.submitDisabled) {
          return;
        }
        if (!self.isChecked) {
          self.show = true;
          return;
        }
        self.submitDisabled = true;
        self.loading = true;
        self.$http.post(createOrderUrl, qs.stringify(this.urlParamsObj))
        .then(function(response) {
          var data = response;
          self.submitDisabled = false;
          self.loading = false;
          if (data.code == 'success') {
            var payOrder = data.data.payOrder[0];
            self.orderNum = payOrder.orderNum;
            self.paymentSn = payOrder.paymentSn;
            //paymentBody.openid = getQueryString('openid');
            self.regAgreement = true;
          } else {
            if (data.msg == '请登录' || data.code == '0100002') {
              var url = location.href;
              self.$cookie.delete('user_token');
              self.$router.push({path: '/smsLogin',query:{return_url: url}});
            }else if(data.code == '0100010' || data.code == '0100011' || data.code == '0100012' || data.code == '0100013' || data.code == '0100014'){
              self.code_msg = data.msg;
              self.code_show = true;
            }else{
              self.$vux.toast.show({
                text: '系统繁忙，请稍候再试'
              })
            }
          }
        })
        .catch(function(error) {
          if(error.response.data.status == 401 || error.response.data.msg == 'token错误') {
            var url = location.href;
            self.$cookie.delete('user_token');
            self.$router.push({path: '/smsLogin',query:{return_url: url}});
          }
          self.error_0 = error;
          self.submitDisabled = false;
          self.fullscreenLoading = false;
        });
      },
      //解决支付路径问题，hash前必须有问号
      directRightUrl() {
        let { href, protocol, host, search, hash } = window.location
        if (host.indexOf('localhost') !== -1) {return;}
        const pathname = '/H5/' // 解决支付路径问题添加的前缀，替换成你的
        search = search || '?'
        hash = hash || '#/'
        let newHref = `${protocol}//${host}${pathname}${search}${hash}`
        if (newHref !== href) {
          window.location.replace(newHref)
        }
      }
    },
    mounted(){
      this.urlParamsObj = this.$route.query;
      this.getBill();
      this.querycode();
      /*this.info = {};
      this.info.name = this.$cookie.get('true_name');
      this.info.phone = this.$cookie.get('phone');
      this.info.amount = this.urlParamsObj.price;*/
      //this.directRightUrl();
    },
    filters:{
      //价格保留两位小数
      priceformat: Filters.priceformat
    }
  }

</script>

<style lang="scss">
@import  "~assets/css/adaptation.scss";
.confirm-home{
  width:100%;background-color: #efeff4;position: relative;
  .body_top{
    margin-top:px(20);background-color:#fff;
    .trademark-data{
      height:px(240);
      padding-top:px(30);
      padding-left: px(30);
      border-top:1px solid #e5e5e5;
      border-bottom:1px solid #e5e5e5;
      .imgwrap{
        width:px(180);
        height:px(180);
        overflow: hidden;
        text-align:center;
        position: absolute;left: px(30);top: px(30);
        img{
          height:px(180);
          position:relative;
          left: px(-42)
        }
      }
      div.info{
        padding-left:px(210);
        padding-right:px(30);
        height:px(208);
        p{border:0}
        .trademark-name{
          height:px(45);
          line-height:px(45);
          color:#333;
          font-size:px(34);
        }
        .trademark-prefer{
          color:#999;
          font-size:px(28);
          margin-top:px(9);
          height:px(40);
          line-height:px(40);
        }
        .trademark-price{
          margin-top:px(48);
          height:px(36);
          line-height:px(36);
          span{
            font-size:px(32);
            color:#333;
          }
        }
      }
    }
  }
  .payType{
    padding-left:px(30);margin-top:px(20);width:100%;background-color: #FFF;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;
    li{padding-left:px(80);font-size: px(34);height: px(88);line-height: px(86);background: #FFF url(~assets/img/confirm/weixin_pay.png) 0 px(16) no-repeat;background-size: px(56) px(54);}
  }
  .code{height:px(88);
    p{height:px(88);line-height:px(88);
      input{border:px(0) solid #ddd;height:px(45);box-sizing:border-box;margin-top:px(-8);margin-left: px(30);}
    }
  }
  .bottom-wrap{
    position: fixed;bottom: 0;left: 0;width:100%;
    /* .agree{
      text-align: center;height:px(40);line-height: px(40);font-size:px(28);
      .weui-icon-success, .weui-icon-success-circle, .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{color:#3DB1FA;font-size: px(46);}
      .vux-check-icon > i:before{margin-right: 0.1rem;font-size: px(46);}
      span a{color: #3DB1FA;}
    } */
    p{height:px(37);line-height: px(37);font-size:px(26);color:#bbb;margin-bottom: px(30);margin-top: px(33);text-align: center;}
    .total-wrap{
      height:px(94);line-height: px(94);font-size:px(34);background-color: #FFF;padding-left:px(30);
      b{color:#f00;font-weight:normal;}
      a{width:px(250);height:px(94);float: right;line-height: px(94);text-align: center;font-size:px(36);color: #fff;background-image: linear-gradient(-225deg, #F54845 0%, #F57645 100%);display: inline-block;}
      a{text-decoration: none;}
    }
  }
}
//vux alert确定按钮字体颜色修改为蓝色
.weui-dialog__ft a.weui-dialog__btn_primary{color:#3DB1FA;text-decoration:none; }
</style>
