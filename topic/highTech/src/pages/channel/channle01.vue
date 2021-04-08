<template>
  <div class="channel_01" :class="{'image_size':sizeImg}">
		<img class="img_logo" :class="{'img_logo_pos':img_logo_bol}" src="~assets/img/channel/logo.png" alt="">
		<img class="img_tit" :class="{'img_tit_pos':img_tit_bol}" src="~assets/img/channel/chnnelTit.png" alt="">
		<p class="presentation" :class="{'presentation_pos':img_tit_bol}">基于保护赋能，建立在区块链上的合伙人计划</p>
		<p class="time" :class="{'time_pos':time_bol}">[&nbsp;2018年10月重磅来袭&nbsp;]</p>
		<img class="years_l" :class="{'year02':year02_bol}" src="~assets/img/channel/year-2.png" alt="">
		<img class="years_l" :class="{'year00':year00_bol}" src="~assets/img/channel/year-0.png" alt="">
		<img class="years_r" :class="{'year01':year01_bol}" src="~assets/img/channel/year-1.png" alt="">
		<img class="years_r" :class="{'year08':year08_bol}" src="~assets/img/channel/year-8.png" alt="">
		<div class="des" :class="{'desShow': year08_bol}">
			<p>国际知识产权服务及交易平台</p>
			<p>杭州拾贝知识产权服务有限公司</p>
		</div>

  </div>
</template>

<script>
 export default {
	data () {
   	return {
   		sizeImg:false,
   		img_logo_bol: false,
   		img_tit_bol: false,
   		time_bol: false,
   		year01_bol: false,
   		year00_bol: false,
   		year02_bol: false,
   		year08_bol: false,
   		pageBol:false
	  }
	},
	methods:{
		callMethod () {
			var self = this;
         if(this.pageBol){
         	return;
         }
         this.pageBol = true;
         document.onreadystatechange = function () {
            console.log("测试加载完成与否",document.readyState)
            if(document.readyState=="complete"){
               self.sizeImg = true;
               self.img_logo_bol = true;
               setTimeout(function() {
                  self.img_tit_bol = true;
               }, 100);
               setTimeout(function() {
                  self.time_bol = true;
               }, 500);
               setTimeout(function() {
                  self.year02_bol = true;
               }, 1000);
               setTimeout(function() {
                  self.year00_bol = true;
               }, 1500);
               setTimeout(function() {
                  self.year01_bol = true;
               }, 2000);
               setTimeout(function() {
                  self.year08_bol = true;
               }, 2500);
            }
         }

      }
	},
	mounted() {}
 }
</script>

<style lang="scss">
.channel_01{
	width: 750px;height: 100%;background:#202c5a url(~assets/img/channel/bgi.jpg) no-repeat;background-size:100%;text-align:center;background-position-y:0;position: relative;
	img,p{position: absolute;}
	.img_logo{width:222px;top:-80px;left:264px;}
	.img_logo_pos{top:80px;transition:all 0.5s;}
	.img_tit{width:650px;top:230px;left:-600px;}
	.img_tit_pos{left:45px;transition:all 0.5s;}
	p{line-height:100%;text-align:center;width:100%;}
	.presentation{font-size:27px;color:#fff;top:370px;left:-750px;}
	.presentation_pos{left:0;transition:all 0.5s;}
	.time{font-size:28px;color:#07d09e;top:430px;left:-750px;}
	.time_pos{left:0;transition:all 0.5s;}
	.years_l,.years_r{height:150px;}
	.years_l{left:-45px;}
	.years_r{right:-45px;}
	.year02{top:596px;left:148px;transition:all 0.5s;}
	.year01{top:662px;right:245px;transition:all 0.5s;}
	.year00{top:808px;left:285px;transition:all 0.5s;}
	.year08{top:822px;right:125px;transition:all 0.5s;}
}
.des{position:absolute;font-size: 24px;line-height: 40px;text-align: center;bottom: 40px;width: 100%;color: #fff;height: 88px;
	left: -750px;
	transition: all .5s ease .5s;
	&.desShow{left: 0;}
	p{position: static;line-height: 44px;color: rgba(255, 255, 255, .6);}
}
.image_size{background-size:110%;background-position-x:center;background-position-y:0;transition:all 3s;}
</style>
