<template>
	<div class="service_detail">
		<div class="right_detail" v-show="!loading">
			<div class="now_detail">
				<p><span>{{servicedetail.order_feedback_state_xuhao}}</span>办理状态：{{servicedetail.order_feedback_state}}</p>
				<div>
					<p><span class="text_left">用户昵称</span>：<span class="text_right">{{memberdetail.nickname}}</span></p>
					<p><span class="text_left">姓名</span>：<span class="text_right">{{memberdetail.truename}}</span></p>
					<p><span class="text_left">性别</span>：<span class="text_right">{{sex_arr[memberdetail.sex]}}</span></p>
					<p v-show="memberdetail.industryName"><span class="text_left">所属行业</span>：<span class="text_right">{{memberdetail.industryName}}</span></p>
					<p v-show="memberdetail.phone"><span class="text_left">联系方式</span>：<span class="text_right">{{memberdetail.phone}}</span></p>
					<p v-show="memberdetail.member_qq"><span class="text_left">QQ</span>：<span class="text_right">{{memberdetail.member_qq}}</span></p>
					<p v-show="memberdetail.member_wechat"><span class="text_left">微信号</span>：<span class="text_right">{{memberdetail.member_wechat}}</span></p>
					<p v-show="memberdetail.email" style="margin-bottom:0"><span class="text_left">邮箱</span>：<span class="text_right">{{memberdetail.email}}</span></p>
				</div>
				<div>
					<p><span class="text_left">商品分类</span>：<span class="text_right">{{servicedetail.bs_class_name}}</span></p>
					<p><span class="text_left">商品名称</span>：<span class="text_right">{{servicedetail.bs_name}}</span></p>
					<p><span class="text_left">服务单号</span>：<span class="text_right">{{servicedetail.order_sn}}</span></p>
					<p><span class="text_left">支付单号</span>：<span class="text_right">{{servicedetail.payment_sn}}</span></p>
					<p><span class="text_left">金额</span>：<span class="text_right">{{servicedetail.payment_amount | priceformat}}</span></p>
					<p><span class="text_left">支付状态</span>：<span class="text_right" :class="{color_r:servicedetail.payment_state==1,color_g:servicedetail.payment_state!=1}">{{servicedetail.payment_state | payStatusformat}}</span></p>
					<p><span class="text_left">下单时间</span>：<span class="text_right">{{servicedetail.create_time | dateFormat}}</span></p>
					<p style="margin-bottom:0"><span class="text_left">支付时间</span>：<span class="text_right">{{servicedetail.payment_time | dateFormat}}</span></p>
				</div>
				<p class="detail_footer"><span>{{servicedetail.next_order_feedback_state_xuhao}}</span>下个状态：{{servicedetail.next_order_feedback_state}}</p>
			</div>
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
				sex_arr:['', '男', '女'],
				order_id:'',
				memberdetail:{},
				servicedetail:'',
				loading:false
			}
		},
		mounted(){
			this.order_id = this.$route.params.order_id;
			this.seach();
		},
		methods:{
			seach(){
				var self = this;
				self.loading = true;
				this.$http.get(serviceUrl+'/api/findBsOrderDetailById?order_id='+this.order_id)
				.then((response) => {
					self.loading = false;
					self.memberdetail = response.data.memberDTO;
					self.servicedetail = response.data;
					console.log(self.servicedetail)
				})
				.catch((error) => {
					self.loading = false;
				})
			}
		},
	    filters: {
	      dateFormat: Filters.formatDate.dateFormat,
	      priceformat:Filters.priceformat,
	      payStatusformat:Filters.payStatusformat,
	      phone:Filters.phone
	    }  
	}
</script>
<style lang='scss'>
	@import '~assets/css/adaptation.scss';
	html,body,#app{height:100%;}
	.service_detail{height:100%;
		.right_detail{min-height: 100%;border-left: px(1) dashed #ddd;margin-left: px(60);position: relative;
			.now_detail{padding-top: px(30);margin-left:px(-30);
				>p{font-size:px(28);color:#666;margin-bottom:px(60);
					span{font-size:px(34);color:#fff;display:inline-block;width:px(60);height:px(60);text-align:center;border-radius:50%;background-image: linear-gradient(-90deg, #3D95FA 0%, #3DB1FA 100%);line-height:px(60);margin-right: px(20);}
				}
				.detail_footer{margin-top:px(60);color:#999;
					span{background-image: linear-gradient(-90deg, #ddd 0%, #ddd 100%);}
				}
				>div{width:px(690);border-radius:px(3);background-color:#Fff;margin-top:px(20);padding:px(30);
					p{font-size:px(26);line-height:px(37);height:px(37);margin-bottom:px(10);color:#666;
						.text_left{display:inline-block;text-align:justify;text-align-last: justify;width:px(120);}
						.text_right{margin-left: px(10);}
						.color_r{color:#F64744;}
						.color_g{color:#09BB07;}
					}

				}
			}
		}
	}
</style>