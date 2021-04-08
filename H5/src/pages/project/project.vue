<template>
    <div class="project">
    <!-- 滚动超过一定高度显示，回到顶部不显示 -->
        <div class="header clearfix" v-if="scrollTab">
        <!-- <div class="header clearfix"> -->
            <p class="query fl" @click="scrollTop(1)">商标查询</p>
            <p class="apply fl" @click="scrollTop(2)">商标注册</p>
            <p class="operating fl" @click="scrollTop(3)">品牌运营</p>
            <p class="difficult fl" @click="scrollTop(4)">疑难解答</p>
        </div>
        <!-- 右侧悬浮按钮 -->
        <img class="collect" @click="freeInfo(),receive=true,receiveNext=false" v-if="collectBtn" src="~assets/img/project/collect.png" alt="">

        <div class="homepage">
            <div class="homepage_query" v-lazy:background-image="sebeAlbb">
                <div class="query">
                    <input placeholder="请输入您所需要查询的商标" type="text" maxlength="30" v-model="trmQuery.queryName">
                    <icon type="search"></icon>
                    <p v-lazy:background-image="btnBgc" @click="querySuccess=false,queryshow=true">免费查询</p>
                </div>
                <div class="iCountUp">
                <span>已为</span>
                <i-count-up
                  :start="1200000"
                  :end="endNum"
                  :duration="2"
                  :options="options"
                  :callback="callback"
                ></i-count-up>
                <span>位客户完成查询</span>
              </div>
            </div>
            <div class="homepage_text" v-lazy:background-image="query">
                <div class="text_top">
                    <p class="tit">商标—网上开店必备条件</p>
                    <p class="txt">2017年各大主流电商平台入驻条件：必备商标注册证或商标受理通知书</p>
                </div>
            </div>
            <div class="homepage_introduce" v-lazy:background-image="text">
                <p>拥有商标的品牌</p>
                <p>更易入驻京东、天猫、亚马逊等主流电商平台</p>
                <p>拥有商标的品牌</p>
                <p>在店铺运营中更易积累品牌忠实客群</p>
                <p>拥有商标的品牌</p>
                <p>将会受到法律保护，受到侵权时，更易维权</p>
                <p>商标是无形资产，店铺运营时将会累计无形资产财富</p>
            </div>
            <img v-lazy="infodata" alt="">
        </div>
        <!-- 第二分页 -->
        <div class="page_two clearfix" v-lazy:background-image="wykd">
            <p>最低成本拿到商标证，无忧开店</p>
            <div class="bgc_fff fl">
                <p class="tag_r" v-lazy:background-image="speed">极速</p>
                <p class="tit">国内商标极速申请</p>
                <p class="txt">48小时内极速申报<br>不予受理免费再注册</p>
                <p class="pay_money">含官费价(元)：<span>699</span></p>
                <a @click="goShopping(1)">立即购买</a>
            </div>
            <div class="bgc_fff fr">
                <p class="tag_r" v-lazy:background-image="speed">双享</p>
                <p class="tit">国内商标双享申请</p>
                <p class="txt">商标注册不成功，免费再注册一次或抵扣驳回复审费用</p>
                <p class="pay_money">含官费价(元)：<span>1299</span></p>
                <a @click="goShopping(108)">立即购买</a>
            </div>
        </div>
        <!-- 高效开店 -->
        <div class="efficient clearfix" v-lazy:background-image="gxkd">
            <p>最快1天拿到受理通知书，高效开店</p>
            <div class="bgc_fff fl">
                <p class="tag_r" v-lazy:background-image="foreign">美国</p>
                <p class="tit">美国商标实际使用申请</p>
                <p class="txt">8-18个月获得商标证</p>
                <p class="txt_time">最快<span>1</span>天获得受理通知书</p>
                <p class="pay_money">含官费价(元)：<span>3800</span></p>
                <a @click="goShopping(10)">立即购买</a>
            </div>
            <div class="bgc_fff fr">
                <p class="tag_r" v-lazy:background-image="foreign">美国</p>
                <p class="tit">美国商标意向使用申请</p>
                <p class="txt">8-18个月获得商标证</p>
                <p class="txt_time">最快<span>1</span>天获得受理通知书</p>
                <p class="pay_money">含官费价(元)：<span>4800</span></p>
                <a @click="goShopping(9)">立即购买</a>
            </div>
            <div class="bgc_fff fl">
                <p class="tag_r" v-lazy:background-image="foreign">欧盟</p>
                <p class="tit">欧盟商标注册申请</p>
                <p class="txt">5-8个月获得商标证</p>
                <p class="txt_time">最快<span>1</span>天获得受理通知书</p>
                <p class="pay_money">含官费价(元)：<span>11000</span></p>
                <a @click="goShopping(106)">立即购买</a>
            </div>
            <div class="bgc_fff fr">
                <p class="tag_r" v-lazy:background-image="foreign">日本</p>
                <p class="tit">日本商标注册申请</p>
                <p class="txt">8-12个月获得商标证</p>
                <p class="txt_time">最快<span>2</span>天获得受理通知书</p>
                <p class="pay_money">含官费价(元)：<span>8500</span></p>
                <a @click="goShopping(11)">立即购买</a>
            </div>
        </div>
        <img class="corrugated" v-lazy="bl01" alt="">
        <!-- 商标购买 -->
        <div class="trademark_pay" v-lazy:background-image="vip">
            <p>心仪商标已被注册？担心注册不成功？</p>
            <div class="buy_trm">
                <p class="tit">商标购买服务</p>
                <p class="txt">急需商标，无需等待，快速购买，立即入驻</p>
                <p class="trm_btn" @click="wechatCode=true">立即咨询</p>
            </div>
            <div class="buy_trm">
                <p class="tit">商标疑难VIP服务</p>
                <p class="txt">心仪的商标无法注册？拾贝为您解决</p>
                <p class="trm_btn" @click="wechatCode=true">立即咨询</p>
            </div>
        </div>
        <!-- 商标出海 -->
        <div class="trademark_sea" v-lazy:background-image="gw">
            <p>电商出海，你的品牌被保护了吗？</p>
            <div class="clearfix">
                <div class="bgc_fff fl">
                    <p class="tag_r" v-lazy:background-image="foreign">美国</p>
                    <!-- <img v-lazy="speed" alt=""> -->
                    <p class="tit">美国商标实际使用申请</p>
                    <p class="txt">8-18个月获得商标证</p>
                    <p class="txt_time">最快<span>1</span>天获得受理通知书</p>
                    <p class="pay_money">含官费价(元)：<span>3800</span></p>
                    <a @click="goShopping(10)">立即购买</a>
                </div>
                <div class="bgc_fff fr">
                    <p class="tag_r" v-lazy:background-image="foreign">美国</p>
                    <!-- <img v-lazy="speed" alt=""> -->
                    <p class="tit">美国商标意向使用申请</p>
                    <p class="txt">8-18个月获得商标证</p>
                    <p class="txt_time">最快<span>1</span>天获得受理通知书</p>
                    <p class="pay_money">含官费价(元)：<span>4800</span></p>
                    <a @click="goShopping(9)">立即购买</a>
                </div>
                <div class="bgc_fff fl">
                    <p class="tag_r" v-lazy:background-image="foreign">英国</p>
                    <!-- <img v-lazy="speed" alt=""> -->
                    <p class="tit">英国商标注册申请</p>
                    <p class="txt">5-8个月获得商标证</p>
                    <p class="txt_time">最快<span>5</span>天获得受理通知书</p>
                    <p class="pay_money">含官费价(元)：<span>6000</span></p>
                    <a @click="goShopping(69)">立即购买</a>
                </div>
                <div class="bgc_fff fr">
                    <p class="tag_r" v-lazy:background-image="foreign">韩国</p>
                    <!-- <img v-lazy="speed" alt=""> -->
                    <p class="tit">韩国商标注册申请</p>
                    <p class="txt">15-18个月获得商标证</p>
                    <p class="txt_time">最快<span>3</span>天获得受理通知书</p>
                    <p class="pay_money">含官费价(元)：<span>6000</span></p>
                    <a @click="goShopping(77)">立即购买</a>
                </div>
                <div class="bgc_fff fl">
                    <p class="tag_r" v-lazy:background-image="foreign">法国</p>
                    <!-- <img v-lazy="speed" alt=""> -->
                    <p class="tit">法国商标注册申请</p>
                    <p class="txt">6-9个月获得商标证</p>
                    <p class="txt_time">最快<span>5</span>天获得受理通知书</p>
                    <p class="pay_money">含官费价(元)：<span>7000</span></p>
                    <a @click="goShopping(105)">立即购买</a>
                </div>
                <div class="bgc_fff fr">
                    <p class="tag_r" v-lazy:background-image="foreign">日本</p>
                    <!-- <img v-lazy="speed" alt=""> -->
                    <p class="tit">日本商标注册申请</p>
                    <p class="txt">8-12个月获得商标证</p>
                    <p class="txt_time">最快<span>2</span>天获得受理通知书</p>
                    <p class="pay_money">含官费价(元)：<span>8500</span></p>
                    <a @click="goShopping(11)">立即购买</a>
                </div>
                <div class="bgc_fff fl">
                    <p class="tag_r" style="padding-right:0" v-lazy:background-image="foreign">俄罗斯</p>
                    <!-- <img v-lazy="speed" alt=""> -->
                    <p class="tit">俄罗斯商标注册申请</p>
                    <p class="txt">18-24个月获得商标证</p>
                    <p class="txt_time">最快<span>1</span>周获得受理通知书</p>
                    <p class="pay_money">含官费价(元)：<span>10000</span></p>
                    <a @click="goShopping(76)">立即购买</a>
                </div>
                <div class="bgc_fff fr">
                    <p class="tag_r" v-lazy:background-image="foreign">欧盟</p>
                    <!-- <img v-lazy="speed" alt=""> -->
                    <p class="tit">欧盟商标注册申请</p>
                    <p class="txt">5-8个月获得商标证</p>
                    <p class="txt_time">最快<span>1</span>天获得受理通知书</p>
                    <p class="pay_money">含官费价(元)：<span>11000</span></p>
                    <a @click="goShopping(106)">立即购买</a>
                </div>
            </div>
        </div>
        <div class="sea">
            <p class="sea_btn" @click="wechatCode=true">更多国家，立即咨询</p>
        </div>
        <img class="corrugated" v-lazy="bl02" alt="">
        <!-- 注册步骤 -->
        <div class="trademark_apply" v-lazy:background-image="bgc02">
            <p>只需6步，轻松注册</p>
            <div class="reg">
                <p class="tit">第一步：顾问对接</p>
                <p class="txt">查询商标是否已被注册<br>商标顾问对意向商标进行成功率评估</p>
            </div>
            <div class="reg">
                <p class="tit">第二步：资料审核</p>
                <p class="txt">企业：营业执照复印件<br>个人：个体工商户营业执照及身份证复印件</p>
            </div>
            <div class="reg">
                <p class="tit01">第三步：商标申报</p>
                <p class="txt">准备商标注册委托书</p>
            </div>
            <div class="reg">
                <p class="tit02">第四步：下发受理通知书</p>
            </div>
            <div class="reg">
                <p class="tit">第五步：商标初审公告</p>
                <p class="txt">表明已通过商标局的实质审查<br>进入为时三个月的公告期</p>
            </div>
            <div class="reg">
                <p class="tit02">第六步：注册成功</p>
            </div>
        </div>
        <div class="entrance" v-lazy:background-image="entrance">
            <p>商标注册还有哪些入口？</p>
            <span>除了拾贝网，你还可在这些地方轻松下单</span>
        </div>
        <img class="corrugated" v-lazy="bl03" alt="">
        <!-- 开店难 -->
        <div class="open_shop" v-lazy:background-image="kdn">
            <p>开店难？</p>
            <p>没经验？没货源？没销量？害怕亏本？</p>
            <span>拾贝及阿里巴巴、亚马逊、eBay等电商平台的资深金牌<br>代运营公司，帮你解决所有烦恼。</span>
        </div>
        <img class="corrugated" v-lazy="lotlogo" alt="">
        <div class="operating opera_list">
            <p class="opera_btn" @click="wechatCode=true">更多需求，联系客服</p>
            <div>
                <p>不知道如何运营店铺？</p>
                <p>无意踩了知识产权的雷导致店铺被下架/关店？</p>
                <p>营销能力不够销量提升慢？</p>
                <span>拾贝常年举办系列电商运营培训课程<br>邀请知识产权、代运营、通关报税等行业资深人士授课</span>
            </div>
        </div>
        <img class="corrugated" v-lazy="operatingNum" alt="">
        <div class="operatingBtn">
            <p @click="wechatCode=true">立即咨询</p>
        </div>
        <img class="corrugated" v-lazy="bl04" alt="">
        <!-- 为什么选择拾贝 -->
        <img class="corrugated" v-lazy="serviceTitle" alt="">
        <img class="corrugated" v-lazy="service" alt="">

        <!-- 维权案例 -->
        <img class="corrugated" v-lazy="activist" alt="">
        <img class="corrugated" v-lazy="jzjt" alt="">
        <img class="corrugated" v-lazy="shk" alt="">
        <div class="ecu" v-lazy:background-image="ecu">
            <p class="tit">遭遇线上侵权？拾贝助你维权！</p>
            <span>电商平台售假 影视/音乐盗播 整站品牌/内容侵权<br>提交网址，快速保存证据</span>
        </div>
        <!-- <img class="corrugated" v-lazy="ecu" alt=""> -->
        <!-- 荣耀资质 -->
        <img class="corrugated" v-lazy="qualification" alt="">
        <img class="corrugated" v-lazy="morelogo" alt="">
        <img class="corrugated" v-lazy="caasa01" alt="">
        <img class="corrugated" v-lazy="cxy002" alt="">
        <img class="corrugated" v-lazy="caasa" alt="">
        <img class="corrugated" v-lazy="bt01" alt="">
        <!-- 常见问题 -->
        <img class="problems corrugated" v-lazy="problemsTitle" alt="">
        <img class="corrugated" v-lazy="Commonproblems01" alt="">
        <img class="corrugated" v-lazy="Commonproblems02" alt="">
        <img class="corrugated" v-lazy="Commonproblems03" alt="">
        <div class="problems_btn">
            <p @click="wechatCode=true">更多电商问题，请联系顾问</p>
        </div>
        <!-- 底部 -->
        <img class="corrugated" v-lazy="footer" alt="">
        <!-- 扫描二维码 -->
        <x-dialog :scroll="false" :show.sync="wechatCode" hide-on-blur>
            <div class="code_img">
                <img class="error" src="~assets/img/project/error.png" alt="" @click="wechatCode=false">
                <img src="~assets/img/project/sebe_code.png" alt="">
                <p>关注公众号 立即咨询</p>
                <p>或咨询客服4000-315-426</p>
            </div>
        </x-dialog>
        <!-- 免费领取 -->
        <x-dialog :show.sync="receive" :scroll="false" class="dialog-demo" hide-on-blur>
            <div class="receive_img">
                <img class="error" src="~assets/img/project/error.png" alt="" @click="receive=false">
                <p class="tit" v-if="!receiveNext">《国内主流电商平台入驻规则及所需资料》<br>免费领取</p>
                <div v-if="!receiveNext">
                    <p class="ipt_txt">联系人：</p>
                    <input type="text" placeholder="请输入姓名" maxlength="30" v-model="receiveData.name">
                    <p class="ipt_txt">*联系电话：</p>
                    <input type="text" placeholder="请输入联系电话" maxlength="11" v-model="receiveData.phone">
                    <span>{{receivePhone}}</span>
                    <template v-if="receiveCodeShow">
                        <input class="code" type="text" maxlength="4" placeholder="请输入验证码" v-model="receiveData.code">
                        <img class="imgCode" :src="codeSrc" alt="">
                        <span>{{receiveCode}}</span>
                    </template>
                </div>
                <p class="txt" v-if="receiveNext">感谢提交，我们将尽快与您联系！</p>
                <p class="receive_btn" @click="freeReceive" v-if="!receiveNext">点击免费领取</p>
                <p class="receive_btn" v-if="receiveNext" @click="receive=false">确定</p>
            </div>
        </x-dialog>
        <!-- 商标查询 -->
        <x-dialog :show.sync="queryshow" :scroll="false" class="dialog-demo" hide-on-blur>
            <div class="receive_img">
                <img class="error" src="~assets/img/project/error.png" alt="" @click="queryshow=false">
                <p v-if="!querySuccess" class="tit">商标免费查询</p>
                <p v-if="querySuccess" class="tit">您的资料已提交</p>
                <div v-if="!querySuccess">
                    <p class="query_txt">*商标名称：</p>
                    <input type="text" v-model="trmQuery.queryName" maxlength="30" placeholder="请输入您希望查询的商标名称">
                    <span>{{queryErr}}</span>
                    <p class="query_txt">联系人：</p>
                    <input type="text" placeholder="请输入联系人姓名" maxlength="30">
                    <span></span>
                    <p class="query_txt">*联系电话：</p>
                    <input type="text" placeholder="请输入联系电话" maxlength="11" v-model="trmQuery.phone">
                    <span>{{phoneErr}}</span>
                    <div v-if="codeShow">
                        <input class="code" maxlength="4" type="text" placeholder="请输入验证码" v-model="trmQuery.code">
                        <img class="imgCode" :src="codeSrc" @click="srcCode" alt="">
                        <span>{{codeErr}}</span>
                    </div>
                </div>
                <div class="sebe_img" v-if="querySuccess">
                    <p>请耐心等待，知识产权顾问会尽快通知您查询结果</p>
                    <img src="~assets/img/project/sebeQuery.png" alt="">
                    <span>扫码添加好友 随时查询进度</span>
                </div>
                <p class="receive_btn" v-if="!querySuccess" @click="queryTrademark()">免费查询商标</p>
                <p class="receive_btn" v-if="querySuccess" @click="queryshow=false,querySuccess=false">确定</p>
            </div>
        </x-dialog>
    </div>
</template>
<script>
import ICountUp from 'vue-countup-v2'
import $ from 'jquery'
import { Icon,XDialog } from 'vux'
import infodata from 'assets/img/project/infodata.jpg'
import bl01 from 'assets/img/project/bl01.jpg'
import bl02 from 'assets/img/project/bl02.jpg'
import bl03 from 'assets/img/project/bl03.jpg'
import bl04 from 'assets/img/project/bl04.jpg'
import lotlogo from 'assets/img/project/lotlogo.jpg'
import ecu from 'assets/img/project/ecu.jpg'
import morelogo from 'assets/img/project/morelogo.png'
import caasa01 from 'assets/img/project/caasa01.png'
import cxy002 from 'assets/img/project/cxy002.png'
import caasa from 'assets/img/project/caasa.png'
import bt01 from 'assets/img/project/bt01.png'
import speed from 'assets/img/project/speed.png'
import foreign from 'assets/img/project/foreign.png'
import operatingNum from 'assets/img/project/operatingNum.png'
import service from 'assets/img/project/service.png'
import serviceTitle from 'assets/img/project/serviceTitle.png'
import activist from 'assets/img/project/activist.png'
import jzjt from 'assets/img/project/jzjt.png'
import shk from 'assets/img/project/shk.png'
import qualification from 'assets/img/project/qualification.jpg'
import problemsTitle from 'assets/img/project/problemsTitle.png'
import Commonproblems01 from 'assets/img/project/Commonproblems01.png'
import Commonproblems02 from 'assets/img/project/Commonproblems02.png'
import Commonproblems03 from 'assets/img/project/Commonproblems03.png'

// 背景
import btnBgc from 'assets/img/project/btn-bgc.png'
import sebeAlbb from 'assets/img/project/sebeAlbb.jpg'
import query from 'assets/img/project/query.jpg'
import text from 'assets/img/project/text.jpg'
import wykd from 'assets/img/project/wykd.jpg'
import gxkd from 'assets/img/project/gxkd.jpg'
import vip from 'assets/img/project/vip.jpg'
import gw from 'assets/img/project/gw.jpg'
import bgc02 from 'assets/img/project/bgc02.jpg'
import kdn from 'assets/img/project/kdn.jpg'
import footer from 'assets/img/project/footer.png'
import entrance from 'assets/img/project/entrance.jpg'
const cartUrl = CONFIG.cartUrl;

export default {
    components: {
    Icon,XDialog,ICountUp
  },
  data(){
    return{
        collectBtn:true,//点击输入框，领取按钮消失，鞥强用户体验
        options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
        // 图片
        operatingNum:operatingNum,
        speed:speed,
        foreign:foreign,
        infodata:infodata,
        bl01:bl01,
        bl02:bl02,
        bl03:bl03,
        bl04:bl04,
        lotlogo:lotlogo,
        ecu:ecu,
        caasa01:caasa01,
        cxy002:cxy002,
        caasa:caasa,
        bt01:bt01,
        morelogo:morelogo,
        service:service,
        serviceTitle:serviceTitle,
        activist:activist,
        jzjt:jzjt,
        shk:shk,
        qualification:qualification,
        problemsTitle:problemsTitle,
        Commonproblems01:Commonproblems01,
        Commonproblems02:Commonproblems02,
        Commonproblems03:Commonproblems03,
        // 背景
        btnBgc:btnBgc,
        sebeAlbb:sebeAlbb,
        query:query,
        text:text,
        wykd:wykd,
        gxkd:gxkd,
        vip:vip,
        gw:gw,
        bgc02:bgc02,
        kdn:kdn,
        footer:footer,
        entrance:entrance,
        // 弹框
        wechatCode:false,//公众号
        receive:false,//免费领取
        queryshow:false,//免费查询
        scrollTab:false,
        cartUrl:cartUrl,
        countSearch:'1200000',
        // 商标查询部分
        trmQuery:{
            queryName:'',
            phone:'',
            code:'',
            name:''
        },
        //商标查询
        querySuccess:false,
        phoneErr:'',
        queryErr:'',
        codeErr:'',
        codeShow:false,
        codeSrc:'',
        //资料领取
        receiveData:{
            phone:'',
            name:'',
            code:''
        },
        receiveNext:false,
        receivePhone:'',
        receiveCode:'',
        receiveCodeShow:false,
        scroll:'',
        endNum:1200000
    }
  },
  methods:{
    goShopping (id) {  //商品详情页
      if (typeof id == 'undefined') {
        var id = 1;
      };
      this.$router.push({path: '/detail',query:{id: id || 1}})
    },
    srcCode(){
        this.codeSrc = this.cartUrl+'/servlet/captchaCode?t='+ Math.random();
    },
    tramerkQuery(){//商标查询
        var self = this;
        if(/^1\d{10}$/.test(this.trmQuery.phone)) {
            self.phoneErr = '';
            // 是否显示验证码
            self.$http.get(this.cartUrl+'/consultation/checkMemberConsultation.htm?phone='+self.trmQuery.phone)
                .then((response) => {
              if(response.isover){
                self.codeShow=true;
                self.srcCode();
              }else{
                self.codeShow=false;
              }
            })
            .catch((error) => {
              console.log(error)
            });
        }else{
            self.phoneErr = '联系电话格式有误';
        }
    },
    // 查询信息初始化
    queryInfo(){
        this.trmQuery.name="";
        this.trmQuery.phone="";
        this.trmQuery.queryName="";
        this.trmQuery.code="";
    },
    queryTrademark(){
        var self = this;
        if(!self.trmQuery.queryName){
            self.queryErr="商标名称不能为空";
            return;
        }else{
            self.queryErr="";
        }
        if(!this.trmQuery.phone){
            self.phoneErr = '联系方式不能为空';
            return;
        }else if(!/^1\d{10}$/.test(self.trmQuery.phone)){
                self.phoneErr = '联系电话格式有误';
            return;
        }else{
            self.phoneErr = '';
        }
        if(self.codeShow&&!self.trmQuery.code){
            self.codeErr="验证码不能为空";
            return;
        }else{
            self.codeErr="";
        }
        self.$http.get(cartUrl+'/consultation/addMemberConsultation.htm?contactName='+self.trmQuery.name+"&contactPhone="+self.trmQuery.phone+"&consultationType=7&consultationModular=15&remarks="+self.trmQuery.queryName+"&captchaCode="+self.trmQuery.code)
            .then((response) => {
        if(response.code==200){
            self.querySuccess=true;
            self.codeShow=false;
            self.queryInfo();
        }else if(response.code == 100015){
                    //验证码错误
                    self.codeErr="验证码错误";
                    self.srcCode();
                }else{
                    if(self.codeShow){
                        self.codeErr=response.msg;
                    }else{
                        self.phoneErr = response.msg;
                    }

                }
      })
      .catch((error) => {
        self.codeShow=false;
        console.log(error)
      });
    },
    // 领取资料
    receiveInfo(){
        var self = this;
        if(/^1\d{10}$/.test(this.receiveData.phone)){
            self.receivePhone="";
                // 是否显示验证码
            self.$http.get(self.cartUrl+'/consultation/checkMemberConsultation.htm?phone='+self.receiveData.phone)
            .then((response) => {
              if(response.isover){
                self.receiveCodeShow=true;
                self.srcCode();
              }else{
                self.receiveCodeShow=false;
              }
            })
            .catch((error) => {
              console.log(error)
            });
        }else{
            self.receivePhone="联系电话格式有误";
        }
    },
    freeReceive(){
        var self = this;
        if(!self.receiveData.phone){
            self.receivePhone="联系电话不能为空";
            return;
        }else if(!/^1\d{10}$/.test(this.receiveData.phone)){
            self.receivePhone="联系电话格式有误";
            return;
        }
        if(self.receiveCodeShow&&self.querySuccess){
            self.receiveCode="验证码不能为空";
            return;
        }
        self.$http.get(cartUrl+'/consultation/addMemberConsultation.htm?contactName='+self.receiveData.name+"&contactPhone="+self.receiveData.phone+"&consultationType=7&consultationModular=16&captchaCode="+self.receiveData.code)
            .then((response) => {
        if(response.code==200){
            self.receiveNext=true;
            self.freeInfo();
        }else if(response.code == 100015){
                    //验证码错误
                    self.receiveCode="验证码错误";
                    self.srcCode();
                }else{
                    if(self.receiveCodeShow){
                        self.receiveCode=response.msg;
                    }else{
                        self.receivePhone = response.msg;
                    }
                }
      })
      .catch((error) => {
        console.log(error)
      });
    },
    // 领取信息初始化
    freeInfo(){
            this.receiveData.phone="";
            this.receiveData.name="";
            this.receiveData.code="";
            this.receiveCode="";
            this.receivePhone="";
            this.receiveCodeShow=false;
    },
    callback(ins){//查询数量
        var self = this;
            self.$http.get(self.cartUrl+'/consultation/countSearch.htm?t='+ new Date().getTime())
            .then((response) => {
        self.countSearch = response.countSearch?response.countSearch:'1200000';
        ins.update(self.countSearch);
      })
      .catch((error) => {
        self.countSearch = '1200000';
        console.log(error)
      });
    },
    callbackNum(){
        var self = this;
            self.$http.get(self.cartUrl+'/consultation/countSearch.htm?t='+ new Date().getTime())
            .then((response) => {
        self.endNum = response.countSearch?response.countSearch-0:1200000;
      })
      .catch((error) => {
        self.endNum = 1200000;
      });
    },
    // 定位
    scrollTop(top){
            var sTop = document.body || document.documentElement;
            var startTOP = sTop.scrollTop;
        if(top==1){
            sTop.scrollTop = 0;
        }else if(top==2){
            var setTop = $(".page_two").offset().top-80/32*24;
            sTop.scrollTop = setTop;
        }else if(top==3){
            var setTop = $(".opera_list").offset().top;
            sTop.scrollTop = setTop;
        }else if(top==4){
            var setTop = $(".problems").offset().top-50;
            sTop.scrollTop = setTop;
        }
    },
        menu() {
            var self = this;
        this.scroll = document.body.scrollTop;
        if(this.scroll>600){
            self.scrollTab = true;
        }else if(this.scroll == 0){
            self.scrollTab = false;
        }
    }
  },
  mounted(){
    this.callbackNum();
        window.addEventListener('scroll', this.menu);
  },
  watch:{
    "trmQuery.phone":function(now,old){
        if(/^1\d{10}$/.test(now)){
            this.tramerkQuery();
        }
    },
    "receiveData.phone":function(now,old){
        if(/^1\d{10}$/.test(now)){
            this.receiveInfo();
        }
    }
  }
}

</script>
<style lang="scss">
@import  "~assets/css/adaptation.scss";
.project{-webkit-overflow-scrolling:touch;background-color:#36006b;}
.project{font-size:0;padding-bottom:px(0);margin-bottom:px(-10);
    // 去除ios输入框内阴影
    input{-webkit-appearance: none;}
    // 公共样式-白块
    .bgc_fff{width:px(333);padding:px(48) px(20);background-color:#fff;position: relative;border-radius:px(7);border:px(1) solid #c70094;text-align:center;margin-top: px(55);
        .tag_r{width:px(70);height:px(70);position: absolute;top:px(-1);right:px(-2);font-size: px(20);color:#fff;background-size:100%;text-align:right;line-height:px(20);padding-top:px(10);padding-right: px(8);}
        p{text-align:center;}
        .tit{font-size:px(26);color:#333;font-weight: bold;line-height:px(26);}
        .txt,.txt_time{font-size:px(20);color:#666;line-height:px(30);margin-top: px(15);}
        .txt_time{
            span{font-size:px(40);font-weight: bold;color:#333}
        }
        .pay_money{font-size:px(22);width:px(280);border-top:px(1) dashed #999;margin:px(30) auto 0;height:px(80);line-height:px(80);color:#cb0090;text-align:left;
            span{font-size: px(36);font-weight: bold;}
        }
        a{background-image: linear-gradient(-90deg, #ba00ce 6%, #db0078 98%);width:px(240);height:px(60);display:inline-block;border-radius:px(6);color:#fff;font-size:px(26);line-height:px(60);margin-top: px(20);}
    }
    .collect{width:px(190);position: fixed;top:px(800);right:px(0);z-index:10}
    .header{font-size:px(20);width:px(750);position: fixed;top:0;z-index: 10;
        p{width:25%;height:px(80);color:#fff;font-size:px(28);text-align:center;line-height:px(80);box-shadow:0px 1px 5px #7500be;}
        .query{background-color:#ed004a;}
        .apply{background-color:#ed0083;}
        .operating{background-color:#c300e0;}
        .difficult{background-color:#9b11e0;}
    }
    .homepage{font-size:0;
        .homepage_query{background-repeat:no-repeat;background-size: 100%;width:px(750);height:px(599);padding-top:px(410);
            .query{height:px(80);width:px(620);margin:0 auto;position: relative;
                input{height:px(80);width:px(620);background-color:#fff;border:1px solid #fff;border-radius:px(40);font-size:px(26);padding-left: px(80);padding-right:px(170);-webkit-appearance: none;}
                i{font-size:px(40);position: absolute;top:px(20);left:px(25);color:#ffab00}
                p{background-size: 100%;font-size:px(28);color:#fff;width:px(173);height:px(80);line-height: px(80);text-align:center;position: absolute;top:0;right:0;}
            }
            >p{font-size:px(24);line-height:px(24);color:#fff;text-align:center;margin-top: px(20);}
        }
        .homepage_text{background-size: 100%;width:px(750);height:px(700);padding-top:px(290);
            .text_top{
                .tit{font-size:px(38);color:#fff;font-weight:bold;text-align:center;line-height:px(38);}
                .txt{font-size:px(22);color:#fff;width:px(500);margin:px(20) auto 0;text-align:center;line-height:px(36);}
            }

        }
        .homepage_introduce{background-size: 100%;width:px(750);height:px(300);
            p{color:#fff;font-size:px(24);text-align:center;line-height:px(40);}
        }
        img{width:px(750);height:px(500);}
    }
    // 第二页
    .page_two{background-size: 100%;width:px(750);height:px(500);padding:0 px(30);
        >p{font-size:px(38);color:#FFF;font-weight: bold;text-align:center;line-height:px(38)}
    }
    // 高效开店
    .efficient{background-size: 100%;width:px(750);height:px(1000);padding:px(50) px(30);
        >p{font-size:px(38);color:#FFF;font-weight: bold;text-align:center;margin-bottom: px(35);line-height:px(38)}
        .bgc_fff{margin-top: px(20);}
    }
    // 购买商标
    .trademark_pay{background-size: 100%;width:px(750);height:px(850);padding-top: px(75);
        >p{font-size:px(38);color:#FFF;font-weight: bold;text-align:center;line-height:px(38)}
        .buy_trm{width:px(690);border-radius:px(7);padding-top:px(60);padding-bottom: px(45);background-color:#fff;margin: px(40) auto 0;
            p{text-align:center;}
            .tit{font-size:px(34);color:#333;font-weight: bold;line-height:px(34);}
            .txt{font-size:px(26);color:#666;line-height:px(26);margin-top: px(25);margin-bottom:px(30);}
            .trm_btn{width:px(540);margin:0 auto;height:px(70);background-image: linear-gradient(-90deg, #ba00ce 6%, #db0078 98%);border-radius:px(6);font-size:px(26);text-align:center;line-height:px(70);color:#fff;}
        }
    }
    // 商标出海
    .trademark_sea{background-size: 100%;width:px(750);height:px(1900);padding:px(0) px(30);
        >p{font-size:px(38);color:#FFF;font-weight: bold;text-align:center;line-height:px(58);margin-bottom:px(30);}
        .bgc_fff{margin-top: px(17);}
    }
    .sea{height:px(82);background-color:#7000ba;padding-top:px(1);
        .sea_btn{width:px(690);margin:0 auto;height:px(80);border-radius:px(6);font-size:px(30);border:px(1) solid #fff;font-weight: normal;line-height:px(78);color:#fff;text-align:center;}
    }
    // 商标注册
    .trademark_apply{background-size: 100%;width:px(750);height:px(1500);
        >p{font-size:px(38);color:#FFF;font-weight: bold;text-align:center;line-height:px(58);margin-bottom:px(30);}
        .reg{width:px(690);height:px(200);border-radius:px(100);background-color:#9b1ac1;margin:px(20) auto 0;
            p{text-align:center;color:#fff;}
            .tit{font-size:px(36);font-weight: bold;line-height:px(36);padding-top:px(40);}
            .txt{font-size:px(26);line-height:px(36);margin-top: px(20);}
            .tit01{font-size:px(36);font-weight: bold;line-height:px(36);padding-top:px(60);}
            .txt01{font-size:px(26);line-height:px(36);margin-top: px(20);}
            .tit02{font-size:px(36);font-weight: bold;height:px(200);line-height:px(200);}
        }
    }
    // 开店难
    .open_shop{background-size: 100%;width:px(750);height:px(250);text-align:center;
        >p{font-size:px(38);color:#FFF;font-weight: bold;text-align:center;line-height:px(38);margin-bottom:px(30);}
        span{font-size:px(22);color:#ddd;}
    }
    // 运营
    .operating{width:px(750);background-color:#7b00c9;
        .opera_btn{width:px(690);height:px(80);border-radius:px(6);border:px(1) solid #fff;font-size:px(30);color:#fff;margin:0 auto;line-height:px(80);text-align:center;}
        >div{padding-top:px(100);text-align:center;
            >p{font-size:px(32);color:#FFF;font-weight: bold;text-align:center;line-height:px(38);margin-bottom:px(15);}
            span{color:#ddd;font-size:px(26);line-height:px(36);}
        }
    }
    // 咨询按钮
    .operatingBtn{width:px(750);height:px(200);background-color:#7b00c9;padding-top:px(1);
        p{width:px(690);height:px(80);margin:0 auto;border-radius:px(6);border:px(1) solid #fff;color:#Fff;font-size:px(30);text-align:center;line-height:px(80);margin-top:px(50)}
    }
    .ecu{width:px(750);height:px(400);text-align:center;padding-top:px(120);
        .tit{font-size:px(38);color:#FFF;font-weight: bold;text-align:center;line-height:px(38);margin-bottom:px(30);}
        span{font-size:px(26);color:#FFF;line-height:px(46);}
    }
    .problems_btn{width:px(750);height:px(170);background-color:#500692;padding-top:px(1);
        p{width:px(690);margin:px(0) auto;height:px(80);border-radius:px(6);font-size:px(30);border:px(1) solid #fff;font-weight: normal;line-height:px(78);color:#fff;text-align:center;}
    }
    // 接触部分波纹
    .corrugated{width:px(750);display:block;}
    .entrance{background-size: 100%;width:px(750);height:px(749);text-align:center;
        >p{font-size:px(38);color:#FFF;font-weight: bold;text-align:center;line-height:px(38);margin-bottom:px(30);}
        span{font-size:px(22);color:#ddd;}
    }
}
// 弹框
.code_img{text-align:center;height:px(600);width:px(600);border-radius:px(6);background-color:#fff;padding-top:px(100);position: relative;
    .error{position: absolute;top:px(25);right:px(25);width:px(25);height:px(25);}
    img{width:px(355);height:px(355);}
    p{font-size:px(26);line-height:px(26);text-align:center;color:#666;margin-top: px(30);}
}
.receive_img{text-align:center;width:px(690);border-radius:px(6);background-color:#fff;padding-top:px(80);position: relative;padding-bottom:px(60);
    .error{position: absolute;top:px(25);right:px(25);width:px(25);height:px(25);}
    >div{padding:0 px(60);position: relative;}
    .tit{font-size:px(32);font-weight: bold;line-height:px(50);margin-bottom:px(25)}
    .ipt_txt{font-size:px(28);color:#333;text-align:left;line-height:px(28);margin-top: px(35);margin-bottom:px(20)}
    .query_txt{font-size:px(28);color:#333;text-align:left;line-height:px(28);margin-bottom:px(20)}
    input{height:px(80);width:px(570);border-radius:px(4);border:px(1) solid #ddd;font-size:px(26);padding:0 px(20);-webkit-appearance: none;}
    span{font-size:px(22);color:#ff7c13;display:block;text-align:left;height:px(35);line-height:px(35);width:px(570);margin:auto;}
    .code{padding-right: px(140);}
    .imgCode{width:px(120);height:px(50);position: absolute;right:px(70);bottom:px(50);}
    .receive_btn{width:px(570);height:px(90);background:url(~assets/img/project/receiveBtn.jpg) no-repeat;background-size:100%;margin:px(5) auto 0;font-size:px(30);color:#FFF;line-height:px(90)}
    .txt{font-size:px(30);line-height:px(30);margin-bottom:px(25)}
    .sebe_img{text-align:center;
        img{width:px(415);}
        p{font-size:px(26);font-weight: normal;width:px(690);margin-left: px(-60);line-height:px(26);margin-bottom:px(50);}
        span{color:#333;text-align:center;line-height:px(80);height:px(80);}
    }

}
.dialog-demo{
    .weui-dialog{width:px(690);max-width:px(690);}
}
.iCountUp {text-align:center;
    span{font-size: px(24);margin: 0;color: #FFF;}
}
</style>
