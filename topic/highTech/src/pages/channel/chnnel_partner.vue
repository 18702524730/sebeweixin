<template>
 <div class="chnnel">
	<wc-swiper class="swiper" v-show="state" :therehold="30" :autoplay="false" @transitionend="slideIndex">
		<wc-slide>
			<channle-first ref="child01"></channle-first>
		</wc-slide>
		<wc-slide>
			<channle-two ref="child02"></channle-two>
		</wc-slide>
		<wc-slide>
			<channel-three ref="child03"></channel-three>
		</wc-slide>
		<wc-slide>
			<channel-four ref="child04"></channel-four>
		</wc-slide>
		<wc-slide>
			<channel-five @showOrHide="handleShowOrHide" ref="child05"></channel-five>
		</wc-slide>

		<!-- <wc-slide></wc-slide>
		<wc-slide></wc-slide> -->
	</wc-swiper>
	<div class="channel05" v-show="!state">
		<channel-six @showOrHide="handleShowOrHide" ref="child06"></channel-six>
	</div>
 </div>
</template>

<script>
import channleFirst from './channle01.vue'
import channleTwo from './channle02.vue'
import channelThree from './channel03.vue'
import channelFour from './channel04.vue'
import channelFive from './channel05.vue'
import channelSix from './channel06.vue'
const title = 'SEBE拾贝-生态合伙人计划';
const link = CONFIG.wxUrl.replace('/weixin', '') + '/highTech/#/channel';
const imgUrl = 'https://sebe360test.oss-cn-beijing.aliyuncs.com/C13B31C92E6E2D49590D40F56848C693.jpg'
const desc = '基于保护赋能，建立在区块链上的合伙人计划';
 export default {
   data () {
     return {
			 state: true,
       path: location.href.split('#')[0], //当期的地址
     }
   },
   components: {
   	channleFirst,channleTwo, channelThree, channelFour, channelFive, channelSix
   },
   mounted(){
   	this.$refs.child01.callMethod()
    this.wxShare(title, link, imgUrl, desc, this.path); //微信分享  在mian.js里Vue的原型里已定义
   },
   methods:{
		handleShowOrHide () {
			this.state = !this.state
			if (!this.state) {
				this.$refs.child05.closeForm()
				this.$refs.child05.callMethod()
				setTimeout(() => {
					this.$refs.child06.callMethod2()
				}, 100)
			} else {
				this.$refs.child06.openForm()
				setTimeout(() => {
					this.$refs.child06.callMethod3()
				}, 100)
			}
			//  setTimeout(() => {
			// 	this.state = !this.state
			// 	if (!this.state) {
			// 		this.$refs.child05.closeForm()
			// 		this.$refs.child05.callMethod()
			// 	} else {
			// 		this.$refs.child06.openForm()
			// 	}
			//  }, 500)
		 },
   	slideIndex(e){
         // 滚动到当前页面的时候调用子组件的样式动效，首页需要检测是否加载完成，其余页面不需要，子组件的页面需要加bol判断，因为当前页面事件可能会调用很多次，防止多次操作造成bug
   		if(e == 0 || !e){
   			this.$refs.child01.callMethod();
   		}
   		if(e == 1){
   			this.$refs.child02.callMethodTwo();
			 }
			if(e == 2 || e == 3 || e == 4){
				let child = 'child0' + (e + 1)
   			this.$refs[child].callMethod();
   		}

   	}
   }
 }
</script>

<style lang="scss">
html,body,#app,.chnnel{height: 100%;overflow: hidden;}
.swiper {
	height: 100%;
}
.chnnel{
   .wc-pagination{
    div.wc-dot-active{width:14px;height:14px;background:#fff;border-radius:100%;}
    .wc-dot{width:10px;height:10px;background:#9295a4;border-radius:100%;}
   }
}
.channel05{height: 100%;}
</style>
