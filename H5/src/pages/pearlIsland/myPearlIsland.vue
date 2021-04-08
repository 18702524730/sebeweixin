<template>
  <div class="my_pearl" :class="{'my_pearl_max':iosX}">
    <div class="tit_num">
      <p @click="$router.push('/myPearlNum')">
        <img class="img_l" src="~assets/img/pearlIsland/header_pearl.png" alt="">
        <span class="ml10">珍珠</span>
        <span class="ml10" v-show="!totalScoreBol">
          {{totalScore ? totalScore.toFixed(4) : '--'}}
        </span>
        <ICountUp class="ml10"
          v-show="totalScoreBol"
          :startVal="startVal"
          :endVal="endVal"
          :end="endVal"
          :decimals="decimals"
          :duration="duration"
          :options="options"
        />
      </p>
      <p @click="$router.push('/myEnergy')" class="ml20">
        <img class="img_r" src="~assets/img/pearlIsland/administer.png" alt="">
        <span class="ml10">创力</span>
        <span class="ml10">{{totalPower||"--"}}</span>
      </p>
       <div class="tit_img">
        <img v-if="!trueimg" src="~assets/img/pearlIsland/portrait.png" alt="">
        <img v-else :src="trueimg" alt="">
       </div>
    </div>
    <div class="pearl_image">
      <img src="~assets/img/pearlIsland/conch.png" class="conch" alt="">
      <img src="~assets/img/pearlIsland/pearl.png" class="pearl_length" :class="{'pearl_max':integralNum<maxCount.length&&maxCount.length,'pearl_max_null':integralNum==maxCount.length||!maxCount.length}" alt="">
      <template v-if="integralNum==maxCount.length||!maxCount.length">
        <img class="bubble_img bubble01" src="" v-lazy="bubble">
        <img class="bubble_img bubble02" src="" v-lazy="bubble">
        <img class="bubble_img bubble03" src="" v-lazy="bubble">
        <img class="bubble_img bubble04" src="" v-lazy="bubble">
        <img class="bubble_img bubble05" src="" v-lazy="bubble">
        <img class="bubble_img bubble06" src="" v-lazy="bubble">
        <img class="bubble_img bubble07" src="" v-lazy="bubble">
        <img class="bubble_img bubble08" src="" v-lazy="bubble">
      </template>
      <p v-if="integralNum==maxCount.length||!maxCount.length">珍珠生长中</p>
      <div v-else class="tit_hint">
        <span>*珍珠24小时不领取将消失</span>
      </div>
    </div>
    <!-- 珍珠收集部分 -->
    <div class="random" v-if="randomArr && randomArr.length">
      <div class="my_random">
        <div class="ball" v-for="(item,index) in randomArr" :key="index" :class="{'animate':item.top==-80}" :style="{left: `${item.left}px`,top:`${item.top}px`}" @click="iptClick(item,index)">
          <div class="pearl_get" v-if="(10*integralBlock)<=index<=(10*integralBlock+9)">
            <div class="image_gif">
              <img class="pareal_gif" v-if="item.top!=-80" src="~assets/img/pearlIsland/pareal.png" alt=""> 
              <img class="pearl_integral" src="~assets/img/pearlIsland/pearl_integral.png" alt="">
              <p v-if="item.top!=-80">{{item.info.score.toFixed(4)}}</p>
            </div>
          </div> 
        </div>
      </div>
    </div>
  
    <!-- 名称 -->
    <div class="tit_name" :class="{'tit_name_X':iosX}" @click="toInformation">
      <img src="~assets/img/pearlIsland/trumpet.png" alt="">
      <swiper auto height="29px" direction="vertical" loop :interval="3000" class="text-scroll" :show-dots="false">
        <swiper-item v-for="(information,$index) in informationLists" :key="information.id" v-if="$index<3">
          <p class="ml20 mr30">{{information.title}}</p>
        </swiper-item>
      </swiper>
      <p @click.stop="toInformation">更多<span>›</span></p>

      <div class="toHomePage" :class="{'toHomePageMax':iosX}" @click="toHomePage" v-if="btnBol==1">
        <img class="ml15" src="~assets/img/pearlIsland/sebeb.png" alt="">
        <p class="ml5">拾贝宝</p>  
      </div>
    </div>
    <!-- list -->
    <div class="type_list">
      <div class="list" @click="toPearlIsland">
        <div class="image"><img src="~assets/img/pearlIsland/know.png" class="conch" alt=""></div>
        <p>了解珍珠</p>
      </div>
      <div class="list ml25 mr25" @click="toShop">
        <div class="image"><img src="~assets/img/pearlIsland/prealShop.png" class="conch" alt=""></div>
        <p>珍珠商城</p>
        <img v-if="newBol" src="~assets/img/pearlIsland/NEW.png" alt="">
      </div>
      <div class="list" @click="invitation" :class="{'hint_index':hintBol}">
        <div class="image"><img src="~assets/img/pearlIsland/add.png" class="conch" alt=""></div>
        <p>邀请好友</p>
      </div>
    </div>
    <!-- 底部tab -->
    <div class="tab_footer" :class="{'tab_footer_max':iosX}">
      <div>
        <img src="~assets/img/pearlIsland/island_click.png" alt="">
        <p class="tab_check">珍珠岛</p>
      </div>
      <div @click="toFind">
        <img src="~assets/img/pearlIsland/find.png" alt="">
        <p>发现</p>
      </div>
      <div @click="toMy">
        <img src="~assets/img/pearlIsland/my.png" alt="">
        <p>我的</p>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <img src="~assets/img/pearlIsland/pearl_load.gif" alt="">
    </div>
    <!-- 弹框邀请好友部分 -->
    <div class="dialog" v-if="dialogBol">
      <div class="dialog_info">
        <div class="header">
          <p>邀请好友</p>
          <div @click="dialogBol=false"><img src="~assets/img/pearlIsland/move.png" alt=""></div>
        </div>
        <div class="pearl_num">
          <div class="num_info info_l">
            <img src="~assets/img/pearlIsland/ten.png" alt="">
            <p class="num">10<span>珍珠</span></p>
            <p class="wing">注册奖励</p>
          </div>
          <div class="num_info info_r">
            <img src="~assets/img/pearlIsland/thirty.png" alt="">
            <p class="num">30<span>珍珠</span></p>
            <p class="wing">开店奖励</p>
          </div>
        </div>
        <!-- <p class="footer" @click.stop="ToMy">前往邀请</p> -->
        <div class="footer_invite">
          <div v-if="btnBol==1" @click="toShare">
            <img src="~assets/img/pearlIsland/share.png" alt="">
            <p>分享好友</p>
          </div>
          <div @click="toShares">
            <img src="~assets/img/pearlIsland/wechat.png" alt="">
            <p>分享朋友圈</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 二维码部分 -->
    <!-- <div class="dialog_code" v-if="dialogCodeBol" @click="dialogCodeBol=false">
      <div class="dialog_info">
        <div class="header_code" @click.stop="dialogCodeBol=true">
          <img class="innovate" src="~assets/img/pearlIsland/innovate.png" alt="">
          <p class="code_tit mt15">全球知识产权与创新保护共享生态通证</p>
          <div class="code_info">
            <p>长按识别小程序码，注册开启</p>
            <img src="~assets/img/pearlIsland/QRcode.png" alt="">
          </div>
          <p class="know_pearl" @click.stop="toPearlIsland"><img src="~assets/img/pearlIsland/prom.png" alt=""><span>了解珍珠</span></p>
        </div>
      </div>
    </div> -->
    <!-- 弹框注册成功部分 -->
    <div class="dialog_register" v-if="firstBol" @click="firstBol = false">
      <img src="~assets/img/pearlIsland/bling.png" alt="">
      <div class="dialog_reg">
        <div class="preal_img">
          <img src="~assets/img/pearlIsland/thirty.png" alt="">
        </div>
        <div class="reg_first" v-if="firstReg"><!--首次注册-->
          <p class="suc_txt">注册成功！奖励珍珠</p>
          <p class="preal_num mt10">+20.0000</p>
          <p class="txt mt20">继续拾取一批珍珠吧！</p>
        </div>
        <div class="reg_first" v-if="firstGather"><!--首次拾取完一页-->
          <p class="suc_txt">完成拾取！本次拾取珍珠</p>
          <p class="preal_num mt10">+{{(endVal-20).toFixed(4)}}</p>
          <p class="txt mt20">邀请好友注册，获得更多珍珠哦！</p>
        </div>
      </div>
    </div>
    <!-- 弹框引导邀请 -->
    <div class="dialog_hint" v-if="hintBol" @click="hintBol = false">
      <div class="hint">
        <p class="hint_txt">点击此处邀请好友获得更多珍珠</p>
        <img class="hint_img" src="~assets/img/pearlIsland/hand_toBottom.png" alt="">
        <p class="hint_btn">我知道了</p>
      </div>
    </div>
    <div class="first_login" v-if="loginBol">
      <p>登录成功，创力+20</p>
    </div>
  </div>
</template>
<script>
  import ICountUp from 'vue-countup-v2';
  import wx from 'weixin-js-sdk';
  const iptUrl = CONFIG.iptUrl;
  const wxUrl = CONFIG.wxUrl;
  const indexUrl = CONFIG.indexUrl;

  const iptProfileUrl = iptUrl + '/partner/b/iptProfile.htm';
  const StatisticsUrl = iptUrl + '/partner/b/iptPowerStatisticsInfo.htm';
  const beachIptInfoUrlB = iptUrl + '/partner/b/beachIptInfo.htm';
  const beachIptInfoUrlC = iptUrl + '/partner/c/beachIptInfo.htm';
  const category = indexUrl + '/partner/homepage/category.htm';
  import bubble from 'src/assets/img/pearlIsland/bubble.png';
  import Filters from 'src/utils/filters.js';
  import axios from 'axios'
  import { Swiper,SwiperItem } from 'vux';
  export default {

    components: {
      ICountUp,Swiper,SwiperItem
    },
    data () {
      return {
        loading:false,
        bubble:bubble,//珍珠图片
        clientWidth: document.documentElement.clientWidth,//珍珠显示宽度
        randomArr: [],//珍珠随机位置
        maxCount: [],//后台返回数据

        dialogBol:false,
        dialogCodeBol:false,
        newArrayInfo:[],//当前显示珍珠携带的数据


        integralNum:0,//收取珍珠数，点击次数
        integralBlock:0,//一页显示10个
        // 个人信息
        truename:'',
        phone:'',
        trueimg:'',

        totalPower:0,//创力数量

        iosX:false,
        totalScore:0,//珍珠数量
        // 数字缓动参数
        startVal: 0,
        endVal: 0,
        decimals: 4,
        duration: 1,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        },
        loginBol:false,//首次登录
        screen:0,//屏幕尺寸

        totalScoreBol:false,

        firstBol:false,//首次注册，收取
        firstGather:false,//首次收取
        firstReg:false,//首次注册
        hintBol:false,//引导
        informationLists:[],//公告
        regFirst:false,
        btnBol:1,
        newBol:false,
      }
    },
    methods: {
      toShares(){//分享朋友圈
        let btnBol = this.$cookie.get('btnBol');
        if(btnBol == 1){
          wx.miniProgram.reLaunch({url: '/pages/prealInvite/prealInvite'});
        }else{
          wx.miniProgram.reLaunch({url: '/pages/prealInvite/prealInvites'});
        }
      },
      toShare(){//分享朋友
        wx.miniProgram.reLaunch({url: '/pages/prealInvite/prealInvite'});
      },
      toHomePage(){
        wx.miniProgram.reLaunch({url: '/pages/index/index'});
      },
      informationSearch(){
        let self = this;
        this.$http.get(category+'?category=8')
        .then( resp => {
          console.log(resp.list.length)
          self.informationLists = resp.list;
        })
      },
      invitation(){//判断是否是C入口
        if(this.hintBol){//引导页出现时候点击不起效
          return;
        }
        let btnBol = this.$cookie.get('btnBol');
        if(btnBol == 1){//回到B端小程序分享页面
          wx.miniProgram.reLaunch({url: '/pages/prealInvite/shareB'});
        }else{
          this.dialogBol=true;
        }
      },
      ToMy(){//回到我的页面
        wx.miniProgram.reLaunch({url: '/pages/index/my?share=1'});
      },
      toFind(){//跳转发现页面
        this.$router.push('/pearlFind')
      },
      toPearlIsland(){//珍珠介绍页
        this.dialogCodeBol = false;
        this.$router.push('/pearlIsland')
      },

      getTotalInfoFn () {// 查询总量信息
        let self = this;

        axios.create({
          headers: {'MiniAppType': 'foobar'}
        });
        this.$http.get(iptProfileUrl+'?t='+(new Date()).getTime())
        .then( resp => {
          console.log(resp)
          if(resp.isFirst){//首次登陆弹框
            self.loginBol = true;
            sessionStorage.setItem('loginBol',resp.isFirst);
            setTimeout(()=>{
              self.loginBol = false;
            },1500)
          }
          this.totalPower = resp.ipt_power; 
          this.totalScore = resp.ipt;
          this.endVal = resp.ipt;
          if(this.totalScore <= 20){//判断是否是第一次注册进来的
            console.log(this.totalScore,'测试')
            this.regFirst = true;//注册进入
            this.firstBol = true;
            this.firstReg = true;
            setTimeout((data)=>{
              self.firstBol = false;
              self.firstReg = false;
            },3000)
          }
        })
        .catch((err)=>{
          this.totalPower = 0; 
          this.totalScore = 0;
          this.endVal = 0;
        })
      },
      getIptInfo () {// 查询列表
        let self = this;
        self.loading = true;
        let url = '';
        if(this.$route.query.btnBol == 1){
          url = beachIptInfoUrlB;
        }else{
          url = beachIptInfoUrlC;
        }
        this.$http.get(url+'?t='+(new Date()).getTime())
        // this.$http.get('http://192.168.1.138:8080/overview.htm')
        .then( resp => {
          self.loading = false;
          self.maxCount = resp;
          if(!self.maxCount.length){//当请求数据为空时候就不执行，避免卡死
            self.randomArr = [];
            return;
          }
          this.splitArray();
        })
        .catch((err)=>{
          this.loading = false;
          this.randomArr = [];
          this.maxCount = [];
        })
      },

      toPearlIsland(){//我的珍珠
        this.$router.push('/pearlIsland')
      },
      toShop(){//珍珠商城
        let self = this;
        this.loading = true;
        this.$http.get(iptUrl+'/duiba/autoLoginUrl.htm?uid='+this.$cookie.get('member_id'))
        .then(resp =>{
          console.log(resp)
          this.loading = false;
          self.shopTo();
          window.location.href = resp;
        })
        .catch(err =>{
          this.loading = false;
        })
      },
      toInformation(){//岛民公告
        this.$router.push('/informationLists')
      },
      toMy(){//我的
        this.$router.push('/my')
      },

      iptClick(item,index){//点击当前珍珠
        if(item.checkBol){
          return;
        }
        this.totalScoreBol = true;
        this.randomArr[index].top = -80;
        this.randomArr[index].left = 10;
        this.integralNum += 1;
        if(this.maxCount.length < 10){
          if(this.regFirst && this.integralNum == this.maxCount.length){//第一次将珍珠收取
            this.firstBol = true;
            this.firstGather = true;
            setTimeout((data)=>{
              this.firstBol = false;
              this.firstGather = false;
              this.hintBol = true;//新手邀请引导
            },3000)
          }
        }else{
          if(this.regFirst && this.integralNum == 10){//第一次将珍珠收取
            this.firstBol = true;
            this.firstGather = true;
            setTimeout((data)=>{
              this.firstBol = false;
              this.firstGather = false;
              this.hintBol = true;//新手邀请引导
            },3000)
          }
        }
        
        item.checkBol = true;
        // 数字缓动提前开始
        this.startVal = this.endVal
        this.endVal += item.info.score;
        let re = /^[0-9]+$/ ;
        if(re.test(this.integralNum/10)){//如果收取的是10的整数倍，即当前页面所有的珍珠都收取完成
          this.integralBlock += 1;
          setTimeout(()=>{//延时加载
            this.splitArray();
          },500)
        }
        this.beachIptInfo(item);
      },
      beachIptInfo(item){//领取珍珠接口
        let self = this;
        let url = '';
        let btnBol = this.$cookie.get('btnBol');
        if(btnBol == 1){
          url = beachIptInfoUrlB;
        }else{
          url = beachIptInfoUrlC;
        }
        axios({
          method: 'post',
          url:url+"?beachIptId="+item.info.id,
          headers: {'MiniAppType': this.btnBol==1?5:6}
        })
        .then( resp => {
          self.totalScore = item.info.score;
        })
        .catch((err)=>{
        })
      },
      splitArray(){//数组拆分，只让当前页面显示最多10个
        let self = this;
        let splitInfo = [];
        for(let i=0;i<self.maxCount.length;i++){
          if((10*self.integralBlock) <= i && i <= (10*self.integralBlock+9)){
            splitInfo.push(self.maxCount[i]);
          }
        }
        this.newArrayInfo = splitInfo;
        this.randomArr = [];
        this.createdBalls();
      },
      createdBalls() {//计算位置，不带有其他功能
        let count = this.newArrayInfo.length;//页面显示数量
        const showHeight = 150;  //限制钻石生成区域高度,需要按照二倍体来计算
        const showWidth = this.clientWidth -100;//钻石生成宽度
        while (count > 0) {//一直循环，直到位置不重合
          const row = Math.floor(Math.random() * showHeight)
          const col = Math.floor(Math.random() * showWidth)
          if (this.randomArr.length === 0) {
            this.randomArr.push({left: col+30,top: row})
            count -= 1
          } else {
            const noOverlap = this.randomArr.every(v => Math.hypot(v.left - col-30, v.top - row) > 60)  //这里的主要目的就是来保证每次随机生成的点确定的图片位置不会有重叠
            if (noOverlap) {
              this.randomArr.push({left: col+30,top: row})
              count -= 1
            }
          }
        }
        this.arrAddInfo();
      },
      arrAddInfo(){//将后台返回数据绑定到randomArr上面
        for(let i in this.randomArr){
          this.randomArr[i].info = this.newArrayInfo[i];
        }
      },
      search(){//获取用户信息
        let self = this;
        let phone;
        if(!sessionStorage.getItem('phone')){//手机号是必有的，判断手机号，避免重复请求
          console.log('测试')
          this.$http.get(indexUrl+'/partner/b.htm')
          .then((resp)=>{
            sessionStorage.setItem('avatar',resp.avatar);
            sessionStorage.setItem('truename',resp.truename);
            sessionStorage.setItem('phone',resp.phone);
            this.trueimg = resp.avatar;
            this.truename = resp.truename;
            phone = resp.phone;
            if(phone){
              self.phone = phone.substr(0, 3) + '****' + phone.substr(7); 
            }
            return;
          })
        }
        this.trueimg = sessionStorage.getItem('avatar');
        this.truename = sessionStorage.getItem('truename');
        phone = sessionStorage.getItem('phone');
        if(phone){
          self.phone = phone.substr(0, 3) + '****' + phone.substr(7); 
        }
      },
      newSearch(){//首次未进入珍珠商城会显示new红色图标
        this.$http.get(iptUrl+'/partner/b/visitedStore.htm')
        .then(resp=>{
          this.newBol = !resp;
        })
      },
      shopTo(){//如果进入商城则调取接口，防止下次进入还会显示new图片
        this.$http.post(iptUrl+'/partner/b/visitedStore.htm')
        .then(resp=>{
          this.newBol = !resp;
        })
      }
    },
    mounted () {
      this.newSearch()
      let self = this;
      this.screen = window.screen.height;
      if (this.screen >= 780){//适配大屏幕手机
        self.iosX = true;
      }else{
        self.iosX = false;
      }
      this.btnBol = this.$route.query.btnBol;
      if(!this.$route.query.key&&!this.$cookie.get('user_token')){//如果没有key值传过来就显示二维码
        this.dialogCodeBol = true;
      }
      this.$cookie.set('isHaveStore',this.$route.query.isHaveStore);//保存是否开店的信息
      this.$cookie.set('btnBol',this.$route.query.btnBol);//保存来源B端还是C
      this.$cookie.set('member_id',this.$route.query.member_id);//C端分享时候使用
      // 请求放在最后，避免接口超时造成页面假死
      this.search();//个人信息
      this.getTotalInfoFn();  //查询总计
      this.getIptInfo();  //查询列表
      this.informationSearch();//查询公告
    },
    filters: {
    }
  }
</script>

<style lang='scss'>
@import  "~assets/css/adaptation.scss";
@import  "~assets/css/pearl.scss";
body,html,#app{height:100%;width:100%;position: relative;background-color:#180647;}
.my_pearl_max{padding-top:20px;}
.my_pearl{
    background:url(~assets/img/pearlIsland/bgi.png),url(~assets/img/pearlIsland/bgi-hover.png);min-height:100%;width:100%;padding-bottom:120px;
    background-color:#180647;
    background-position:center;
    background-repeat:no-repeat;
    background-blend-mode: lighten;

  // 随机珍珠位置
  .random{position: absolute;top:220px;
    .my_random{
      position: relative;
      div:nth-child(1),div:nth-child(3),div:nth-child(5),div:nth-child(7),div:nth-child(9){
        .pearl_get{
          .image_gif{animation: pearlGif 4s infinite ease;}
        }
      }
      div:nth-child(2),div:nth-child(4),div:nth-child(6),div:nth-child(8),div:nth-child(10){
        .pearl_get{
          .image_gif{animation: pearlEndGif 4s infinite ease;}
        }
      }
    }
    // 珍珠位置，尺寸
    .ball{position: absolute;width: 90px;height: 122px;text-align: center;z-index: 100;
      .pearl_get{position: relative;
        .image_gif{position: absolute;top:0;left:0;font-size:0;width:86px;
          .pearl_integral{width:42px;height:42px;margin:10px auto 0;opacity:0.8;}
          .pareal_gif{width:62px;height:62px;animation: pearlGetAnimation 4s infinite linear;position: absolute;top:0;left:12px;}
          p{color:#fff;font-size:20px;margin-top:10px;text-align:center;}
        }
      }
      @keyframes pearlGif{
        0%{transform:translateY(30px);}
        50%{transform:translateY(0px);}
        100%{transform:translateY(30px);}
      }

      @keyframes pearlEndGif{
        0%{transform:translateY(0px);}
        50%{transform:translateY(30px);}
        100%{transform:translateY(0px);}
      }
      
      @keyframes pearlGetAnimation{
        0%{transform:rotate(0deg);opacity:0.3;}
        50%{transform:rotate(180deg);opacity:0.8;}
        100%{transform:rotate(360deg);opacity:0.3;}
      }
    }
    .animate{
      opacity:0;-webkit-transition:all 1.0s ease;transition:all 1.0s ease;
    }
  }
  .tit_num{height:58px;position: absolute;left:20px;top:24px;z-index: 100;display:flex;width:710px;position: relative;
    p{height:58px;display:flex;flex-direction: row;align-items: center;background-color:#212244;border-radius:29px;padding:0 20px;}
    span{font-size:24px;vertical-align: middle;color:#fff;display:block;line-height:58px;flex-direction: row;align-items: center;}
    .img_l{width:32px;height:32px;vertical-align: middle;}
    .img_r{width:32px;height:36px;vertical-align: middle;}
    .tit_img{position: absolute;right:0;top:0;
      >img{width:60px;height:60px;border-radius:53px;display:inline-block;border:4px solid #2D849D;}
    }
    
  }
  .pearl_image{position: relative;
    .conch{width:100%;height:652px;margin-top:80px;opacity:1;animation: conchAnimation 3s infinite ease-in-out;}
    .pearl_length{position: absolute;width:482px;height:488px;top:180px;left:50%;margin-left: -241px;z-index: 20;}
    .pearl_max_null{animation: pearlAnimationNull 8s infinite ease-in-out;}
    .pearl_max{animation: pearlAnimationMy 8s infinite ease-in-out;}
    p{font-size:28px;color:#E7F8FF;width:100%;text-align:center;position: absolute;top:560px;}
  }
  .tit_hint{text-align:center;position: absolute;top:640px;width:100%;
    span{line-height:58px;font-size:24px;color:#686884;vertical-align: middle;}
  }
  div.tit_name_X{margin-top:20px;margin-bottom: 40px;height:70px;}
  .tit_name{display:flex;flex-direction: row;align-items: center;justify-content: space-between;padding:0 30px;background-color:#151640;height:58px;margin-top: -50px;position: relative;
    img{width:20px;height:25px;z-index: 100;margin-top: 1px;}
    p{font-size:24px;color:#5adfcb;;vertical-align: middle;display:inline-block;z-index: 100;
      span{font-size:28px;line-height:25px;margin-left:7px;}
    }
    div{
      >p{display:inline-block;}
    }
    .text-scroll {width:600px;
      span{color:#5adfcb;vertical-align: middle;}
      p{font-size: 24px;text-align: left;line-height: 58px;color:rgba(255,255,255,0.7);vertical-align: middle;width:528px;white-space:nowrap; text-overflow:ellipsis; overflow:hidden;}
      img{width:20px;height:25px;vertical-align: middle;}
    }
    div.toHomePageMax{top:-75px;}
    .toHomePage{display:flex;position: absolute;top:-75px;left:0;width:162px;height:53px;background:rgba(13,161,138,1);border-radius: 0 27px 27px 0;
      img{width:32px;height:32px;vertical-align: middle;margin-top:8px;}
      p{color:rgba(255,255,255,0.7);font-size:28px;vertical-align: middle;line-height:53px;}
    }
  }

  .type_list{text-align:center;margin-top:25px;padding:0 20px;display:flex;
    .list{width:220px;height:260px;border-radius:8px;background:linear-gradient(360deg,rgba(61,66,109,1) 0%,rgba(33,34,68,1) 100%);box-shadow:0px 2px 4px 0px rgba(4,5,42,0.5);padding-top: 50px;margin-top:constant(safe-area-inset-bottom) !important;margin-bottom:env(safe-area-inset-bottom) !important;position: relative;
      >div{width:92px;height:92px;background-color:#070735;border-radius:92px;margin:0px auto 40px;padding-top:18px;
        img{width:56px;height:56px;}
      } 
      p{font-size:28px;color:#7d7da8;line-height:40px;}
      >img{width:86px;height:37px;position: absolute;top:-6px;right:-10px;}
    }
    .hint_index{z-index: 1000;}
  }
  
  .loading{position: absolute;top:50%;left:50%;width:130px;height:130px;background-color:rgba(0,0,0,0.6);border-radius:8px;text-align:center;padding-top:25px;margin-left:-65px;margin-top:-250px;z-index: 100;
    img{width:80px;height:80px;}
  }
  .first_login{width:272px;height:83px;border-radius:8px;background-color:rgba(0,0,0,0.7);position: absolute;top:30%;left:50%;margin-left:-136px;z-index: 100;
    p{font-size:24px;text-align:center;line-height:83px;color:#fff;}
  }
}
</style>
