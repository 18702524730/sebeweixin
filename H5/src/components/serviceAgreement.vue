<template>
  <div class="body-mask-c" v-if="regAgreement" @click="closePop">
    <div class="dialog-box">
      <h1>拾贝网服务协议</h1>
      <div class="content">
        <div class="info">
          <!-- <p v-if="info.name">用户名称：{{info.name}}</p> -->
          <p>用户注册手机号：{{info.phone}}</p>
          <p>订单号：{{orderNum}}</p>
          <p>订单总金额：¥{{payData.payMoney}}</p>
          <p>订单服务类目：{{category}}</p>
          <p>服务单号：{{ids}}</p>
        </div>
        <p class="text-p">
          本协议是本网站（网址：http://www.ipsebe.com/）的所有者杭州拾贝知识产权服务有限公司（以下简称“拾贝”）与用户（即购买本网站相关服务的购买者）订立的契约，“用户”在本协议中也简称为“您”。本协议适用于您在本网站下单购买的相关服务。</p>
        <p class="text-p">
          在接受本协议前，请您务必审慎阅读，充分理解各条款内容，关于本协议，提示您特别关注风险条款、免责条款，以及拾贝对您违规、违约行为的认定处理条款等。如您不同意本协议的任何内容或无法准确理解拾贝对条款的解释，请不要同意本协议或购买使用本协议项下的服务，否则我们将视为您已接受本协议所有条款内容，同意接受本协议约束。届时您不得以未阅读本协议的内容或未获得拾贝对您疑问条款的解答等理由，主张本协议无效或要求撤销本协议。</p>
        <p class="text-p">1.服务类目（包括但不限于以下内容）</p>
        <p class="text-p">1.1商标方面：国内、外商标注册；商标续展、变更、转让；商标确权、维权及行政诉讼等服务。</p>
        <p class="text-p">1.2专利方面：发明、实用新型、外观设计专利申请服务及其他疑难专利案件等服务。</p>
        <p class="text-p">1.3著作权方面：著作权登记、变更、转让、许可、著作权纠纷及游戏版号等服务。</p>
        <p class="text-p">1.4科技项目方面：国家级高新技术企业的认定、科技项目服务、电子存证服务、网络文化经营资质办理等服务。</p>
        <p class="text-p">2.用户权利与义务</p>
        <p class="text-p">2.1您购买拾贝网提供的相关服务时应遵循诚信原则，应通过合规方式购买使用。</p>
        <p class="text-p">2.2您确保您向拾贝提供或通过本网站上传的所涉资料真实、合法、正确、有效的，包括但不限于姓名、有效证件号码（身份证、公司注册证、护照等）、邮箱地址、联系电话、联系地址、邮编等信息。信息如有变更应及时书面通知到拾贝，如因您注册或提供的信息不真实而产生的一切法律后果及责任，由您承担。</p>
        <p class="text-p">2.3您应按本网站的具体流程及费用办理相关服务，否则拾贝有权终止该服务。</p>
        <p class="text-p">2.4在您购买本网站相关服务后，您有权知悉该服务的任何阶段工作进展情况。</p>
        <p class="text-p">2.5您在本网站实施的所有行为均应遵守国家相关的法律、法规规定、本协议约定和本网站各项规则要求，不违背社会功德良俗及公共利益，不损害他人的合法权益。如您违反前述的，一切责任后果由您承担。</p>
        <p class="text-p">3.拾贝的权利与义务</p>
        <p class="text-p">3.1拾贝尽力在现有技术上维护本网站的正常运行，并努力提升和优化技术，以便给用户提供更优质的用网体验。</p>
        <p class="text-p">3.2拾贝应在收到用户支付的款项及提供合规的相应文件后，及时向用户提供专业服务。</p>
        <p class="text-p">3.3拾贝将积极维护您的合法权益，未经您的事先同意，不得更改您委托办理的服务事项。</p>
        <p class="text-p">3.4拾贝有义务对您的个人信息以及相关资料保密。</p>
        <p class="text-p">3.5若拾贝向您提供相关服务并收到国家或地方官方机构下发的相关文件时，拾贝应及时通知您或将文件邮寄给您。</p>
        <p class="text-p">4.服务使用、变更、中断或终止</p>
        <p class="text-p">4.1 拾贝为您提供的各项服务，您应正当、合理、善意地使用。如发生下列任何一种情形，拾贝有权不通知您而中断或终止向您提供服务：</p>
        <p class="text-p">4.1.1您提供的个人资料不真实、或未按相关规则填写信息又未能提供合理证明；</p>
        <p class="text-p">4.1.2您违反相关法律法规或本协议的约定；</p>
        <p class="text-p">4.1.3拾贝出于安全原因或其他必要情形的考虑。</p>
        <p class="text-p">4.2如因本网站系统维护或升级的需要而需暂停服务，拾贝将尽可能事先进行通知，但由于不可预计的、临时性的调整维护或升级导致需要暂停服务的，拾贝不承担任何责任。</p>
        <p class="text-p">4.3拾贝会尽力维护本网站的正常运行，但由于拾贝无法预测或无法控制的因素导致本网站发生技术故障而造成你购买的服务产生错误或其他情况的，届时按实际而非技术错误时的情况处理。</p>
        <p class="text-p">5.协议的订立、生效和服务期限</p>
        <p class="text-p">5.1用户通过在本网站确认本协议或以其他方式确认本协议，包括但不限于未点击确认本协议而购买了本网站相关服务的，均表示用户与拾贝已就本协议达成一致并同意接受本协议的全部约定内容。</p>
        <p class="text-p">5.2本协议自用户确认之时即刻生效。</p>
        <p class="text-p">5.3本协议服务期限至拾贝向用户提供的服务结束之日止，如用户与拾贝另行签订了有关本网站服务的协议，且另行签订的协议与本协议有冲突的，以另行签订的协议为准。</p>
        <p class="text-p">6.管辖及法律适用</p>
        <p class="text-p">6.1本协议签订地为中华人民共和国杭州市江干区。</p>
        <p class="text-p">6.2本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国法律。</p>
        <p class="text-p">6.3若您和拾贝之间发生任何纠纷或争议，您可以与拾贝友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。</p>
        <p class="text-p">6.4本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
        <p class="text-p">6.5本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
        <p class="text-p">7.合理免责条款</p>
        <p class="text-p">7.1商标</p>
        <p class="text-p">7.1.1国内商标注册申请存在3至6个月的盲查期，该期间内您的商标有可能与他人享有在先权的商标相同或构成近似从而被驳回；</p>
        <p class="text-p">7.1.2当您申请的国内商标通过商标局实质审查会有三个月公告期，在此期间您的商标有可能会被第三人提出异议；</p>
        <p class="text-p">7.1.3您申请的国际商标有可能因不符合相关国家的法律法规规定或其他不可控制的因素而被驳回等；</p>
        <p class="text-p">7.1.4拾贝向您提供的国内外商标查询及建议等仅供参考，不具有法律效力。</p>
        <p class="text-p">7.2专利与版权</p>
        <p class="text-p">7.2.1因您对技术资料的未完全交底或因您提供费减材料不充分（若存在费减）或未及时提供导致无法进行费减造成的损失，或因技术内容缺乏新颖性、创造性、公开不充分或已有在先申请等不符合专利申请条件都可能给您造成损失；</p>
        <p class="text-p">7.2.2若您未在法定期限内缴纳您的专利申请过程中和授权后所有发生的官费，有可能会造成您权利的丧失及其他损失；</p>
        <p class="text-p">7.2.3因您提供的软件鉴别资料/美术或文字作品证明材料不充分或不符合相关法律的规定有可能导致您的软件著作权/作品著作权登记申请失败或造成其他损失。</p>
        <p class="text-p">7.3其它服务</p>
        <p class="text-p">7.3.1项目申报、游戏版号、游戏资质办理本身均存在一定的风险，有可能因为政府、政策等原因导致办理失败。</p>
        <p class="text-p">7.3.2若您提供的维权/电子存证等其他服务所需的相关证明文件存在瑕疵或您未按照本网站相关页面操作要求（例：所需存证的网页应在非登录状态下进行电子存证）进行操作，有可能导致您选择的服务办理失败。</p>
        <p class="text-p">7.4您应对拾贝提供的各种服务相关法律文书及时做出回复，如因您的过错（超过期限、证据不充分等）有可能导致服务费用增加、权利丧失等。</p>
        <p class="text-p">7.5服务相关法律文书的下发时间以国家/国外官方机构实际发文为准，如遇政治、战争、不可抗力或官方机构自身原因有可能造成您不能及时收到文件或导致您产生其他损失。</p>
        <p class="text-p">7.6拾贝对出现上述7.1-7.5中的任一情形不承担任何责任。</p>
        <p class="text-p">8.费用支付及退款</p>
        <p class="text-p">8.1您理解并同意委托拾贝办理本网站相关服务，并承担服务所产生的相关费用。</p>
        <p class="text-p">8.2拾贝收取相关服务的费用仅指该服务顺利情况下办理完成的费用，如发生非顺利状态下程序（包含但不限于重新注册、变更、转让、许可、续展、驳回复审、补充证据、审查意见、异议、争议、答辩或其它诉讼程序等），费用另计。</p>
        <p class="text-p">8.3您可以随时提出终止在本网站购买的服务，但因拾贝提供服务已产生的费用不予退还。</p>
        <p class="text-p">9.关于优惠活动</p>
        <p class="text-p">9.1如遇优惠活动，具体规则请以拾贝网优惠信息为准。</p>
        <p class="text-p">10.附则</p>
        <p class="text-p">本协议内容包括以上条款及拾贝已经发布的或将来可能发布的各类协议。视为本协议不可分割的一部分，具有同等法律效力。在您使用该服务时，已经阅读、理解并接受本协议的全部条款及各类规则，并承诺遵守中国的各类法律规定，如有违反而导致任何法律责任，您将以自己的名义独立承担相应的法律责任。</p>
        <!-- <p class="service">如未能解决您的问题，请<a href="">联系客服</a></p> -->
      </div>
    </div>
    <div class="agree" @click.stop="isChecked=isChecked">
      <check-icon :value.sync="isChecked">同意<a>《拾贝网服务协议》</a></check-icon>
      <a class="confirm-btn" @click.prevent="toPay">确定</a>
    </div>
    <div v-transfer-dom>
      <alert v-model="show">亲，不要忘了阅读并勾选《拾贝网服务协议》哦~</alert>
    </div>
    <!-- <div class="close" @click="regAgreement = false"></div>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import qs from 'qs'
  import Filters from 'src/utils/filters.js'
  import { querystring } from 'vux'
  import { CheckIcon, Alert, TransferDomDirective as TransferDom, Loading} from 'vux'
  const cartUrl = CONFIG.cartUrl;
  const getOrderUrl = cartUrl+'/cartWeb/orderDetail.htm'; //获取订单信息接口
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
    props:["orderNum", "paymentSn", "regAgreement"],
    directives: {
      TransferDom
    },
    components: {
      Alert,
      CheckIcon,
      Loading
    },
		data(){
			return{
        info:{},
        //orderNum: '06600002312',
        productOrderData:[],
        payData: {},
        ids:'',
        category:'',
        show: false, //勾选协议提醒弹框
        isChecked: false,  //勾选协议
        submitDisabled: false, //避免二次提交
			}
		},
		methods:{
      closePop(){
        this.$emit('closePop');
      },
      //调用公众号支付
      toPay () {
        var self = this;
        if (self.submitDisabled) {
          return;
        }
        if (!self.isChecked) {
          self.show = true;
          return;
        }
        self.closePop();
        self.submitDisabled = true;

        var paymentBody = {};
        paymentBody.order_sn = self.orderNum;
        paymentBody.payment_sn = self.paymentSn;
        // openid存在时，后台走微信公众号支付，不存在时走h5支付
        // openid由后台配置的首页链接中自动加入
        paymentBody.openid = getQueryString('openid');


        self.$http.post(wxpaymentUrl, qs.stringify(paymentBody))
        .then(function(response) {
          self.submitDisabled = false;
          self.data = paymentBody;
          var d = response;
          if (d.wapurl) {
            location.href = d.wapurl;
            return;
          }
          console.log(d)
          self.data = d;
          var cfg = {
            appId: d.appId+'',
            timeStamp: d.timeStamp+'', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: d.nonceStr+'', // 支付签名随机串，不长于 32 位
            package: d.package+'', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: d.signType+'', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: d.paySign+''
          }
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            cfg,
            function(res){
              self.error_ = res;
              // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                self.$router.push({name: 'paymentDetail', params:{pay_order:paymentBody.order_sn} });
                //self.$router.push({path: '/myOrders'});
              }else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                self.$vux.toast.show({
                  text: '取消支付'
                })
              }else{
                self.$vux.toast.show({
                  text: '支付失败'
                })
              }
            }
          );
        })
        .catch(function(error) {
          self.data = error;
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
      },
      getOrderInfo(){
        var self = this;
        self.$http.post(getOrderUrl, qs.stringify({orderNum: this.orderNum})).then(function(response) {
          //console.log(JSON.parse(response));
          var data = response;
          self.detailLoading = false;
          if (data.code == 'success') {
            self.payData = data.data.payOrder[0];
            self.productOrderData = data.data.productOrder;
            var arr = self.productOrderData;
            var category = [], ids = [];

            $.each(arr, function(i,item){
              category.push(item.productName);
              ids.push(item.orderNum)
            });
            self.category = category.join();
            self.ids = ids.join();
          }else{
            self.productOrderData = [];
            if (data.msg == '请登录' || data.code == '0100002') {
              var url = location.href;
              self.$cookie.delete('user_token');
              self.$router.push({path: '/smsLogin',query:{return_url: url}});
            }
          }
        }, function(response) {
          self.detailLoading = false;
          console.log(response)
        });
      }
		},
		mounted(){
      this.regAgreement = true;
      this.urlParamsObj = this.$route.query;
      this.info = {};
      this.info.name = this.$cookie.get('truename');
      this.info.phone = this.$cookie.get('phone');
      this.getOrderInfo();
      console.log(this.urlParamsObj);
		},
    filters:{
      //价格保留两位小数
      priceformat: Filters.priceformat
    }
	}

</script>

<style lang="scss">
@import  "~assets/css/adaptation.scss";
.body-mask-c {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  width: px(750);
  height: 100%;
  background: rgba(0,0,0,0.40);

  .dialog-box {
    position: absolute;
    top: px(30);
    right: px(30);
    bottom: px(30);
    width: px(690);
    /* height: px(991); */
    background: #fff;
    padding: 0 px(40);
    box-shadow: 0 6px 30px 0 rgba(0,0,0,0.10);
    border-radius: px(6);

    h1 {
      position: absolute;
      top: px(60);
      margin: 0 auto px(20);
      font-size: px(32);
      line-height:1.6;
      color: #333;
    }

    .content {
      position: absolute;
      top:px(130);
      bottom:px(130);
      width: px(610);
      /* height: px(780); */
      margin: 0 auto;
      overflow: auto;
      .info{padding-bottom: px(20)}

      p {
        font-size: px(24);
        line-height: px(36);
        color: #666;
        text-align: left;
        word-break:break-all;
      }

    }

  }

  .agree{
    position: absolute;
    border-top: 1px solid #e5e5e5;
    width:px(690);
    bottom: px(30);
    right: px(30);
    height:px(112);padding:px(30) px(40) 0 px(32);font-size:px(30);background-color: #fff;border-radius: px(6);border-top-right-radius: 0;border-top-left-radius: 0;
    .weui-icon-success, .weui-icon-success-circle, .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{color:#3DB1FA;font-size: px(46);}
    .vux-check-icon > i:before{margin-right: 0.1rem;font-size: px(46);}
    span a{color: #3DB1FA;}
    .confirm-btn{display: inline-block;float: right;color: #3DB1FA;position: relative;top: px(2)}
  }
  .agree > div{display: inline-block;height:px(40);line-height: px(40);}

  .close {
    position: absolute;
    top: px(1060.8);
    left: px(336.8);
    width: px(90.5);
    height: px(90.5);
    border-radius: 50%;
    background: url(~assets/img/detail/chacha.png) no-repeat center center,#666;
    background-size: px(42.5);
  }

}
//vux alert确定按钮字体颜色修改为蓝色
.weui-dialog__ft a.weui-dialog__btn_primary{color:#3DB1FA;text-decoration:none; }
</style>
