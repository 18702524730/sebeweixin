<template>
	<div class="tradmark">
		<!-- 头部待定 -->
		<div class="header">
			<div class="header-top"><img src="~assets/img/search/sebeblue.png" alt=""></div>
			<div class="header-bot"><img src="~assets/img/search/tramark.png" alt=""></div>
		</div>
		<!-- 搜索 -->
		<div class="query">
			<form>
				<input type="text" placeholder="请输入商标名称" name="content" @focus="botfooter=false" @blur="iptBlur" v-model="content">
				<button type="submit" @click.enter.prevent="search">立即查询</button>
				<img src="~assets/img/search/SearchBar.png" alt="">
			</form>
		</div>
		<div class="specify">
			<p>搜索指定内容</p>
			<ul>
				<li>
					<a href="#/affinitySearch">近似商标</a>
				</li>
				<li>
					<span>|</span><a class="bd" href="#/exactSearch">精确商标</a>
				</li>
				<!-- <li>
          <a href="#/imgCrop">图形商标</a>
        </li>
        <img src="~assets/img/components/hot.png" alt=""> -->
			</ul>
		</div>
		<!-- 底部波纹 -->
		<div class="footer" v-show="botfooter">
			<corrugated-query></corrugated-query>
			<div class="bottom">
				<p>WWW.IPSEBE.COM</p>
			</div>
		</div>
    <toast v-model="visible"  :text='ver_tip' type="warn" :time="3000" :width="'auto'"></toast>
	</div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
	import Vue from 'vue'
	import qs from 'qs'
	import $ from 'jquery'
	import corrugatedQuery from 'components/corrugatedquery.vue'
	import { ToastPlugin ,Swiper, SwiperItem ,XDialog, Alert ,TransferDomDirective as TransferDom, Loading } from 'vux';
	import { Tab, TabItem, Sticky, Toast } from 'vux';
	const cartUrl = CONFIG.cartUrl;
	const indexUrl =  CONFIG.indexUrl;
	export default {
		directives: {
		  TransferDom
		},
		components: {
			corrugatedQuery,
		    Tab,TabItem,Sticky,Toast,
		    Swiper, SwiperItem,XDialog,ToastPlugin,Loading, Alert
		},
		data () {
		  return {
		  	content:'',
        visible: false,
        ver_tip:'',
		    botfooter:true
		  }
		},
		mounted () {
		  /*this.setTitle();
		  this.setRightEmpty();*/
		  //清空img
		  this.changeImg({
        img: ''
      });
      this.changeAnotherImg({
        anotherImg: ''
      });
      this.updateSelectedTM({
        selectedTMArr: []
      });
		},

		watch: {
		},

		methods: {
      ...mapMutations('main', [
        'changeImg',
        'changeAnotherImg',
        'updateSelectedTM',
      ]),
		  search(){
        var str = this.content;
        if (!str || !(str+'').trim()) {
          this.visible = true;
          this.ver_tip = '请输入商标名称';
          return;
        }
		  	this.$router.push({name:'affinitySearchR',query: {content: this.content}});
		  },
		  iptBlur(){
		  	var self = this;
		  	setTimeout(function(){
		  		self.botfooter=true
		  	},200);
		  }
		}
	};
</script>

<style lang='scss'>
  	@import '~assets/css/adaptation.scss';
	.tradmark{background-color:#fff;height:100vh;position: relative;
		.header{padding-top:px(134);height:px(320);
			.header-top{text-align:center;margin-bottom:px(45);
				img{width:px(220);}
			}
			.header-bot{text-align:center;
				img{width:px(383);height:px(96);}
			}
		}
		.query{padding:px(90) px(30) 0;position: relative;
			input{width: px(690);height: px(88);padding:px(20) px(70);border:1px solid #d9d9d9;font-size:px(30);border-radius:px(6);
    -webkit-appearance: none;appearance: none;}
			button{width: px(690);height: px(88);background-image: linear-gradient(90deg, #337DFF 2%, #59AAFF 100%);
border-radius: px(6);color:#fff;text-align:center;line-height: px(88);margin-top: px(30);}
			img{width:px(30);height:px(30);position: absolute;top:px(122);left:px(50);}
		}
		.specify{
			p{font-size:px(28);margin-top:px(60);color:#999;text-align:center;}
			ul{overflow: hidden;padding-top:px(40);padding-bottom: px(50);position: relative;text-align: center;
				li{display: inline-block;
          span{color: #666;font-size: px(28);}
					a{width:px(250);box-sizing:border-box;height:px(42);line-height:px(42);text-align:center;font-size:px(30);color:#666;display:inline-block;}
				}
				img{width:px(65);height:px(43);position: absolute;top:px(0);right:px(30);}
			}
		}
		.footer{position: relative;padding-top: px(150);position: absolute;bottom: 0;
			.bottom{width:px(750);height:px(96);background: #518BFF;
				p{font-size:px(20);color:#B4DFFF;text-align:center;line-height:px(96);}
			}
		}
	}
</style>
