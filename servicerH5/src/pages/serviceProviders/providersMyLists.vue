<template>
	<div class="my_list">
		<div v-show="!no_bind&&!loading">
			<p class="header ellipsis">{{datalist.name}}</p>
			<div class="content">
				<h2>基本信息</h2>
				<div>
					<p class="ellipsis"><span class="text_left">账号类型</span>：<span class="text_right">&nbsp;&nbsp;{{accountstate[admin]}}</span></p>
					<p class="ellipsis" v-if="admin != 1"><span class="text_left">姓名</span>：<span class="text_right">&nbsp;&nbsp;{{datalist.operatorName || "--"}}</span></p>
					<p class="ellipsis"><span class="text_left">负责人</span>：<span class="text_right">&nbsp;&nbsp;{{datalist.sp_contacts || "--"}}</span></p>
					<p class="ellipsis"><span class="text_left">手机号</span>：<span class="text_right">&nbsp;&nbsp;{{datalist.phone | phone}}</span></p>
					<p class="ellipsis"><span class="text_left">所在地区</span>：&nbsp;&nbsp;{{datalist.areaInfo || "--"}}</p>
					<p class="ellipsis"><span class="text_left">详细地址</span>：&nbsp;&nbsp;{{datalist.address || "--"}}</p>
					<p class="ellipsis" style="margin-bottom:0"><span class="text_left">创建时间</span>：<span class="text_right">&nbsp;&nbsp;{{datalist.create_time | formattxt}}</span></p>
				</div>
			</div>
			<div class="content">
				<h2>服务范围</h2>
				<ul>
					<li>
						<p class="fl border_top border_right">服务分类</p>
						<p class="fl border_top">服务名称</p>
					</li>
					<li v-for="item in scopeof">
						<p class="fl border_top border_right ellipsis">{{item.bs_class_name}}</p>
						<p class="fl border_top ellipsis">{{item.name}}</p>
					</li>
				</ul>
			</div>
			<p v-if="admin == 1" class="footer">提示：业务权限变动需签署合作协议，请与拾贝平台管理员联系。</p>
			<p v-if="admin != 1" class="footer">提示：业务权限变动请与所属服务商的负责人联系。</p>
		</div>
		<div v-show="no_bind&&!loading" class="no_bind">
			<img src="~assets/img/providers/nobind.png" alt="">
			<p class="title">访问受限</p>
			<p class="prompt">您的账户尚未绑定，请前往拾贝网服务商中心</p>
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
				accountstate:['代理人账号','服务商账号'],
				loading:false,
				datalist:'',
				scopeof:'',
				no_bind:true,
				admin:''
			}
		},
		mounted(){
			this.seach();
			this.hideMenu();
		},
		methods:{
			seach(){
				var self = this;
				self.loading = true;
				this.$http.get(serviceUrl+'/api/service_info_h5')
				.then((response) => {
					self.loading = false;
					self.admin = response.data.isAdmin;
					self.datalist = response.data;
				})
				.catch((error) => {

					self.loading = false;
				});
				// 服务范围
				this.$http.get(serviceUrl+'/api/businesses/operator')
				.then((response) => {
					self.loading = false;
					self.no_bind = false;
					self.scopeof = response.data.elements;
				})
				.catch((error) => {
					self.loading = false;
					self.no_bind = true;
				});
			}
		},
	    filters: {
	      formattxt: Filters.formatDate.formattxt,
	      priceformat:Filters.priceformat,
	      payStatusformat:Filters.payStatusformat,
	      phone:Filters.phone
	    }  
	}
</script>
<style lang='scss'>
	@import '~assets/css/adaptation.scss';
	.my_list{padding-top:px(30);
		.no_bind{text-align:center;padding-top:px(300);
	  		img{width: px(331);height: px(267);}
	  		.title{font-size:px(34);color:#333;}
	  		.prompt{font-size:px(26);color:#999;width:px(520);margin: 0 auto;}
	  	}
		.footer{padding:0 px(27);font-size:px(24);color:#bbb;margin-top:px(30);margin-bottom:px(60);}
		.ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
		.header{width:px(690);height:px(88);border-radius:px(3);background-color:#fff;text-align:center;line-height:px(88);font-size:px(28);margin:px(0) auto px(20);}
		.content{padding:px(30);background-color:#fff;width:px(690);margin:0 auto px(20);
			h2{font-size:px(26);line-height: px(37);}
			>div{border-radius:px(3);background-color:#Fff;margin-top:px(10);
				p{font-size:px(26);line-height:px(37);height:px(37);margin-bottom:px(10);color:#666;
					.text_left{display:inline-block;text-align:justify;text-align-last: justify;width:px(110);}
					.text_right{display:inline-block;width:px(480);line-height:px(37);height:px(37);}
				}
			}
			>ul{margin-top:px(20);border-right:1px solid #ddd;border-bottom:1px solid #ddd;border-left:1px solid #ddd;
				li{overflow: hidden;width:px(630);
					.border_right{border-right:1px solid #ddd;box-sizing:border-box;}
					.border_top{border-top:1px solid #ddd;}
					p{width:px(314);font-size:px(26);color:#666;text-align:center;line-height:px(60);height:px(60);margin:0 auto;padding:0 px(45);}
				}
			}
		}
	}
</style>