<template>
  <div class="page">
    <div class="sureOrder">
      <div class="trademark-data clearfix ">
					<img class="fl" src="~assets/img/myOrders/cs.png" alt="">
					<div class="fl">
						<p class="trademark-name">{{payment.orderName}}</p>
						<p class="trademark-prefer">送300元话费</p>
						<p class="trademark-price clearfix"><span class="fl">￥{{payment.amount|priceformat}}</span><span class="fr">x1</span></p>
					</div>

			</div>
      <div class="pay">微信支付</div>
    </div>

  </div>
</template>
<script>

  import Vue from 'vue'
  import Filters from 'src/utils/filters.js'
  import qs from 'qs'
  const indexUrl = CONFIG.indexUrl;
  const rootUrl = CONFIG.rootUrl;
  const czUrl = CONFIG.czUrl;

  export default {
    data(){
        return{
        	payment:{}
        }
    },
    methods:{
    	//查询订单详情
      search(){
        var self = this;
        self.$http.post('./api/findFictitiousDetails', qs.stringify({
          orderFictitiousSn: '06508604753'
        }))
        .then((response) => {
        	self.payment = response.data[0];
        })
        .catch((error) => {
        });
      }
    },
    mounted(){
    	this.search();
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      priceformat:Filters.priceformat
    }
  }

</script>
<style scoped lang='scss'>

  @import '~assets/css/adaptation.scss';

  .page {
    .sureOrder {
      padding-top: px(30);
      .trademark-data{
					height:px(240);
					padding-top:px(30);
					padding-left: px(30);
          background: #fff;
					border-bottom:px(1) solid #e5e5e5;
					img{
						width:px(180);
						height:px(180);
					}
					div{
						margin-left:px(30);
						height:px(208);
						p{border:0}
						.trademark-name{
							height:px(45);
							line-height:px(45);
							color:#333;
							font-size:px(34);
						}
						.trademark-prefer{
							color:#999;
							font-size:px(28);
							margin-top:px(9);
							height:px(40);
							line-height:px(40);
						}
						.trademark-price{
							margin-top:px(48);
							height:px(36);
							line-height:px(36);
							span{
								font-size:px(32);
								color:#333;
							}
						}
					}
				}

      .pay {
        margin-top: px(21);
        position: relative;
        height: px(88);
        line-height: px(88);
        color: #333;
        font-size: px(32);
        text-indent: px(120);
        background: url(~assets/img/sureOrder_01.jpg) no-repeat px(30) px(17),#fff;
        background-size: px(60);
      }

    }

  }
</style>
