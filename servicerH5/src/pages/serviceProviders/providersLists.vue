<template>
	<div class="providerslist">
		<!-- 未绑定页面 -->
		<div v-show="no_bind&&!loading" class="no_bind">
			<img src="~assets/img/providers/nobind.png" alt="">
			<p class="title">访问受限</p>
			<p class="prompt">您的账户尚未绑定，请前往拾贝网服务商中心</p>
		</div>
		<!-- 绑定后页面 -->
		<div v-show="!no_bind" class="service_list">
			<div :class="{service_mt30:!box,service_mt_30:box}" class="search">
				<img :class="{img_blur:!box}" src="~assets/img/providers/SearchBar.png" alt="">
				<input type="text" v-model="service_name" placeholder="请输入客户姓名/服务单号" :class="{input_blur:box}" @focus="box=false">
				<p v-show="!box" :class="{p_blur:!box}" @click="seach(service_name)">搜索</p>
				<p v-show="box" :class="{p_blur:!box}" @click="seach()">取消</p>
			</div>
			<div v-show="servicelist.length == 0&&!dataBool&&!loading" class="noservice_prompt">
				<img src="~assets/img/providers/search.png" alt="">
				<p>您还没有服务单信息</p>
			</div>
			<div v-show="servicelist.length == 0&&dataBool&&!loading" class="service_prompt">
				<img src="~assets/img/providers/searchover.png" alt="">
				<p>未查询到数据</p>
			</div>
			<div v-show="servicelist.length > 0" class="service_details" v-for="item in servicelist" @click="local(item.order_id)">
				<p>客户姓名：{{item.buyer_name || "--"}}</p>
				<p>联系方式：{{item.buyer_mobile || "--"}}</p>
				<p>服务名称：{{item.bs_name || "--"}}</p>
				<p>支付状态：<span :class="{color_r:item.payment_state==0,color_g:item.payment_state==1}">{{item.payment_state | payStatusformat}}</span></p>
				<p>办理状态：{{item.order_feedback_state || "--"}}</p>
				<p>服务单号：{{item.order_sn || "--"}}</p>
				<div>
					<p>查看详情</p>
				</div>
			</div>
			<p v-show="servicelist.length > 0" class="bottom-null">
				<i class="fl"></i>
				<i class="fr"></i>
				<span>没有更多了</span>
			</p>
		</div>
		<loading v-model="loading" text="请稍候"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Filters from '../../api/filters.js'
	import {Loading} from 'vux';
	const serviceUrl = CONFIG.serviceUrl;
	export default {
		components: {
	      Loading
	    },
		data(){
			return{
				no_bind:true,//是否绑定
				loading:false,
				box:false,//输入框交互
				service_name:'',
				servicelist:'',
				dataBool:false,
			}
		},
		methods:{
			local(order_id){
				 location.href = '#/ServiceDetail/' + order_id;
			},
			seach(item){
				var self = this;
				var listurl='';
				if(item){
					self.dataBool = true;
					self.box=true;
					listurl = serviceUrl+'/api/findBsOrdersListH5?pg_count=50&keyWord=' + item;
				}else{
					self.dataBool = false;
					self.service_name = '';
					self.box=false;
					listurl = serviceUrl+'/api/findBsOrdersListH5?pg_count=50'
				}
				self.loading = true;
				this.$http.get(listurl)
				.then((response) => {
					self.loading = false;
					self.no_bind = false;
					self.servicelist = response.data.elements;
				})
				.catch((error) => {
					self.loading = false;
					self.no_bind = true;
				})
			}
		},
		mounted(){
			this.seach();
			this.hideMenu();
		},
	    filters: {
	      format: Filters.formatDate.format,
	      priceformat:Filters.priceformat,
	      payStatusformat:Filters.payStatusformat
	    }
	}
</script>
<style scoped lang='scss'>
  @import '~assets/css/adaptation.scss';
  .providerslist{
  	.no_bind{text-align:center;padding-top:px(300);
  		img{width: px(331);height: px(267);}
  		.title{font-size:px(34);color:#333;}
  		.prompt{font-size:px(26);color:#999;width:px(520);margin: 0 auto;}
  	}
  	.service_list{padding-top:px(30);text-align:center;
  		.bottom-null{
			padding:0 px(30);
			text-align:center;
			margin-top:px(30);
			margin-bottom:px(40);
			span{
				font-size: px(26);
				color:#bbb;
			}
			i{
				border-bottom:px(1) solid #ddd;
				height:px(1);
				width:px(258);
				margin-top:px(25);
			}
		}
		.service_mt30{margin:0 auto;}
  		.service_mt_30{margin:px(-30) auto 0;}
  		.search{height:px(90);position: relative;
  			img{width:px(30);height:px(30);position: absolute;top:px(30);left:px(30);z-index:5;margin-top:px(0);}
			input{width:px(690);position: absolute;top:px(0);left:px(30);height:px(90);background-color:#fff;border-radius:px(3);border:px(0);padding:px(0) px(90);font-size:px(28);}
			p{font-size:px(28);position: absolute;top:px(25);right:px(30);z-index:5;line-height: px(40);color:#3db1fa;}
			// 输入框失焦聚焦
			.input_blur{width:px(750);left:px(0);}
			.p_blur{right:px(60);}
			.img_blur{left:px(60);}
  		}
  		.noservice_prompt{
  			img{width: px(331);height: px(267);margin-top: px(250);}
  			p{color:#999;font-size:px(30);}
  		}
  		.service_prompt{
  			img{width: px(331);height: px(267);margin-top: px(250);}
  			p{color:#999;font-size:px(30);}
  		}
  		.service_details{width:px(690);height:px(400);background-color:#fff;border-radius:px(3);margin:px(20) auto 0;padding:px(30);text-align:left;border:px(1) solid #f5f5f5;border-radius:px(6);
			p{color:#666;font-size:px(26);line-height:px(37);height:px(37);margin-bottom: px(10);
				.color_r{color:#F64744;}
				.color_g{color:#09BB07;}
			}
			div{border-top:px(1) solid #e5e5e5;margin-top:px(20);padding-top:px(20);font-size:px(0);
				p{font-size:px(26);color:#999;line-height:100%;}
			}
  		}
  	}
  }

</style>
