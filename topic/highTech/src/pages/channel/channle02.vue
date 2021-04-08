<template>
  <div class="channel_02" :class="{'image_size':sizeImg}">
    <img class="sebe_image" src="~assets/img/channel/sebe.png" alt="">
    <p class="tit" :class="{'tit_pos':tit_bol}">这些行业问题，您是否感同身受？</p>
    <div class="problem_left no_01" :class="{'no_01_pos':no_01_bol}">
      <i><img src="~assets/img/channel/No.1.png" alt=""></i>
      <p class="mt50">公司业务链条单一，难以满足客户全方位需求。</p>
    </div>
    <div class="problem_left no_03" :class="{'no_03_pos':no_03_bol}">
      <i><img src="~assets/img/channel/No.3.png" alt=""></i>
      <p class="mt50">专业能力有限，行业资源缺乏，无法解决客户疑难需求。</p>
    </div>
    <div class="problem_left no_05" :class="{'no_05_pos':no_05_bol}">
      <i><img src="~assets/img/channel/No.5.png" alt=""></i>
      <p class="mt50">从业者收入单一，难以突破，就业任职难以晋升。</p>
    </div>
    <div class="problem_right no_02" :class="{'no_02_pos':no_02_bol}">
      <i><img src="~assets/img/channel/No.2.png" alt=""></i>
      <p class="mt20">客户拓展／客户营销／客户下单／流程管理／信息通知／工作驳杂无从入手，效率极低。</p>
    </div>
    <div class="problem_right no_04" :class="{'no_04_pos':no_04_bol}">
      <i><img src="~assets/img/channel/No.4.png" alt=""></i>
      <p class="mt50">坐班，考核，学习机会少，成长空间小。</p>
    </div>
    <img class="partner_02" :class="{'partner_pos':partner_bol}" src="~assets/img/channel/partner02.png" alt="">
  </div>
</template>

<script>
 export default {
	data () {
   	return {
   		sizeImg:false,
      partner_bol:false,
      no_01_bol:false,
      no_02_bol:false,
      no_03_bol:false,
      no_04_bol:false,
      no_05_bol:false,
      tit_bol:false,
      pageBol:false
	  }
	},
	methods:{
    callMethodTwo () {
      console.log('测试02222')
      var self = this;
      if(this.pageBol){
        return;
      }
      this.pageBol = true;
      this.sizeImg = true;
      this.tit_bol = true;
      setTimeout(function() {
        self.no_01_bol = true;
      }, 500);
      setTimeout(function() {
        self.no_02_bol = true;
      }, 1000);
      setTimeout(function() {
        self.no_03_bol = true;
      }, 1500);
      setTimeout(function() {
        self.no_04_bol = true;
      }, 2000);
      setTimeout(function() {
        self.no_05_bol = true;
      }, 2500);
      setTimeout(function() {
        self.partner_bol = true;
      }, 3000);

    }
	},
	mounted() {
	}
 }
</script>

<style lang="scss">
html,body,#app{height: 100%;}
.channel_02{
	width: 750px;height: 100%;background:#202c5a url(~assets/img/channel/bgi.jpg) no-repeat;background-size:100%;text-align:center;background-position-y:40px;position: relative;
  .sebe_image{position: absolute;top:20px;left:0;width:140px;}
  .tit{width:100%;font-size:40px;color:#fff;line-height:100%;text-align:center;position: absolute;top:-50px;font-weight:bolder;}
  .tit_pos{top:120px;transition:top 0.5s;}
  >div{position: absolute;width:315px;height:282px;background-color:#fff;padding:40px;text-align:left;
    p{font-size:24px;line-height:34px;color:#243752;}
    i{width:64px;height:64px;position: absolute;display:block;background-color:#212c45;border-radius:100%;text-align:center;top:-32px;left:125px;
      img{height:30px;margin-top:15px;}
    }
  }
  .problem_left{//left:75px
    border-radius:100px 0 100px 0;left:-315px;opacity: 0.9;
  }
  .problem_right{//right:75px;
    border-radius:0 100px 0 100px;right:-315px;opacity: 0.98;
  }
  .no_01{top:218px;}
  .no_01_pos{left:75px;transition:left 0.5s;}
  .no_02{top:306px;}
  .no_02_pos{right:75px;transition:right 0.5s;}
  .no_03{top:540px;}
  .no_03_pos{left:75px;transition:left 0.5s;}
  .no_04{top:647px;}
  .no_04_pos{right:75px;transition:right 0.5s;}
  .no_05{top:862px;}
  .no_05_pos{left:75px;transition:left 0.5s;}
  .partner_02{position: absolute;width:312px;top:880px;right:0;opacity:0;}
  .partner_pos{opacity:1;transition:opacity 0.5s;}
}
.image_size{background-size:110%;background-position-x:center;transition:all 4s;}
</style>
