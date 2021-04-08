<template>
    <section class="user-home">
        <div class="head">
             <div class="portrait">
                <img v-if="!statisticData.member.avatar" src="../../assets/img/sebe.png" alt="">
                <img v-else :src="statisticData.member.avatar" alt="">
            </div>
            <div class="contact">
                <span>{{statisticData.member.truename}}</span><a :href="'#/basicData'"><img src="../../assets/img/xhange.png" alt=""></a>
            </div>
            <div class="vip" v-if="vipData">
              <a>拾贝{{vipData.vipName}}</a>
            </div>
        </div>
        <div class="order">
           <div class="order_tit">
               <span>订单统计</span>
               <a :href="'#/orders'">查看全部>></a>
           </div>
           <div class="payment">
              <ul class="payment_list">
                  <li class="nopay">
                      <a :href="'#/orders?status=0&page=1'">
                        <img src="../../assets/img/nor.png" alt="">
                        <span class="payment_type">待付款</span>
                        <p class="payment_num">{{statisticData[0]}}</p>
                      </a>
                      <p>订单72小时未支付将自动关闭</p>
                   </li>
                   <li class="over">
                      <a :href="'#/orders?status=1&page=1'">
                        <img src="../../assets/img/over.png" alt="">
                        <span class="payment_type">已付款</span>
                        <p class="payment_num">{{statisticData[1]}}</p>
                      </a>
                      <p>订单的状态，由客服及时告知</p>
                  </li>
              </ul>
           </div>
        </div>
        <div class="keeper">
            <div class="keeper_tit">
              <span>拾贝管家</span>
            </div>
            <ul class="keeper_list">
              <li>
                <span class="til">知识产权托管</span>
                <span><i>最大托管数</i><b>{{statisticsData.trademark['depositeTotal']}}</b></span>
                <span><i>已托管数</i><b>{{statisticsData.trademark['trademarkNum']}}</b></span>
                <span><i>剩余托管数</i><b>{{statisticsData.trademark['surplusTrademarkNum']}}</b></span>
                <a href="#trademarkTrustee">查看我的托管</a>
              </li>
              <li class="cz">
                <span class="til">存证</span>
                <span><i>存证数量</i><b>{{statisticsData.cz['czNum']}}</b></span>
                <span><i>出证数量</i><b>{{statisticsData.cz['issueNum'] || 0}}</b></span>
                <span><i>剩余存证数</i><b>{{statisticsData.cz['surplusCzNum']}}</b></span>
                <a href="#myczlist">查看我的存证</a>
              </li>
              <li class="report">
                <span class="til">报告</span>
                <span><i>未报告</i><b>{{statisticsData.report['1']}}</b></span>
                <span><i>报告中</i><b>{{statisticsData.report['2']}}</b></span>
                <span><i>已报告</i><b>{{statisticsData.report['3']}}</b></span>
                <a href="#myReport">查看我的报告</a>
              </li>
            </ul>
        </div>
    </section>
</template>

<script>
  import Vue from 'vue'
  const statisticsUrl = './api/sebeStatistics';
  const vipGradeUrl = './api/findVip';
	export default {
    props:["statisticData"],
		data(){
			return{
        vipData:'',
        loading:false,
        statisticsData: {
          cz:{},
          report:{},
          trademark:{}
        }
			}
		},
		methods:{
      getVipGrade(){
        var self = this;
        this.$http.get(vipGradeUrl)
        .then(function(response) {
          var data = response;
          self.vipData = data.data;
        })
        .catch(function(error) {
        });
      },
      getStatisticsData(){
        var self = this;
        self.loading = true;
        this.$http.get(statisticsUrl)
        .then(function(response) {
          self.loading = false;
          var data = response;
          self.statisticsData = data;
        })
        .catch(function(error) {
          self.loading = false;
        });
      }
		},
		mounted(){
      this.getStatisticsData();
      this.getVipGrade();
		}
	}

</script>

<style lang="scss">
.user-home{
    width:100%;background-color: #f5f5f5;
    .head{padding: 30px 20px;height: 151px;background-color: #FFF;font-size:14px;}
    .head:after {
        display: block;
        content: '';
        clear: both;
    }
    .portrait{width: 85px;height: 85px;border-radius: 50%;overflow: hidden;}
    .portrait img{width: 85px;height:85px;}
    .head div{float: left;}
    .contact{height: 85px;}
    .contact span{font-size: 16px;line-height: 85px;margin-right: 9px;margin-left: 18px}
    .vip{
      padding-left: 70px;line-height: 85px;
      a{
        background: #FFF url(~assets/img/vip_bg.png) 0 0 no-repeat;padding-left:26px;
        b{color: #FF7019;font-weight: normal;}
      }
      a:hover{
        text-decoration:none;color:#333;
      }
    }

    .order{padding: 30px 20px;margin-top:15px;background-color: #FFF}
    .order_tit span{font-size: 18px;color: #333;line-height: 18px}
    .order_tit a{font-size: 14px;color: #999;margin-left: 8px;text-decoration: none;}
    .order_tit a:hover{color: #3db1fa}
    .payment_list:after {
        display: block;
        content: '';
        clear: both;
    }
    .payment_list{margin-top: 17px;}
    .payment_list li{float: left;width: 260px}
    .nopay a{background: #f48091;}
    .over a{background: #91dfc6;}
    .over{margin-left: 32px}
    .payment_list li a{display: block;width:260px;height: 100px;border-radius: 2px;text-decoration: none;margin-bottom: 8px}
    .payment_list li p{text-align: right;font-size: 13px;color:#999;}
    .payment_list li a img{vertical-align:middle;margin-left: 26px;margin-bottom: 6px}
    .payment_list li a span{color: #fff;line-height: 80px;margin-left: 15px}
    .payment_list li a .payment_num{float: right;color: #fff;line-height: 80px;font-size: 24px;margin-right: 46px}
    .payment_list .payment_type{font-size: 18px}

    .keeper{
      padding: 30px 20px;margin-top:15px;background-color: #FFF;font-size:14px;
      .keeper_tit{
        span{font-size: 18px;color: #333;line-height: 18px}
      }
      .keeper_list{
        margin-top:20px;
        li{
          border: 1px solid #e5e5e5;height: 64px;margin-bottom:10px;padding: 14px 0;
          span{
            display: inline-block;width:125px;height: 34px;line-height: 34px;margin-right:60px;
            i{width:80px;display: inline-block;font-style: normal;}
            b{display: inline-block;color: #fe2200;font-weight: normal;}
          }
          span.til{margin-left: 25px;padding-left: 30px;width:180px;margin-right:0;background: #FFF url(~assets/img/home_report.png) 0 0 no-repeat;font-weight:bold;}
          a{float:right;margin-right:15px;display: inline-block;width:110px;height: 34px;line-height: 34px;border-radius: 3px;background-color:#fe2200;color: #fff;text-align: center;}
          a:hover{text-decoration:none;background-color: #E20000;}
        }
        li.cz{
          span.til{background-position: 0 -34px;}
        }
        li.report{
          span.til{background-position: 0 -68px;}
        }
      }
    }
}
</style>
