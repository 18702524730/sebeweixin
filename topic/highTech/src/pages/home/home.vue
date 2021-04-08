<template>
	<div class="home_page">
    <div class="header">
      <img class="banner" src="~assets/img/home/banner.jpg">
      <img class="red" src="~assets/img/home/red.png">
      <a class="test_btn" href="#test_til" @click.prevent="custormAnchor('test_til')">
        <span>企业高新评估报告</span>
        <!-- <span class="preview shake-little shake-constant">shake-little
          <i></i><i></i><i></i>
        </span> -->
        <span class="preview"><!-- shake-little -->
          <i class="fade shake-constant first"></i><i class="fade shake-constant second"></i><i class="fade shake-constant third"></i>
        </span>
      </a>
    </div>
		<div class="platform">
      <div class="boxes chart">
        <h4>杭州市“国高企”数量争取实现倍增</h4>
        <img src="~assets/img/home/chart.png">
      </div>
      <div class="boxes support">
        <h4>加大对“国高企”申报认定财政支持力度</h4>
        <div class="cus">通过 <i>初审</i> 市财政给予一次性<b>20万元补助</b></div>
        <div class="cus rend">通过 <i>认定</i> 市财政再给予一次性<b>40万元奖励</b></div>
      </div>
      <div class="test_til" id="test_til">
        <h3>开始测评</h3>
        <p>共8项</p>
      </div>
      <div class="boxes test">
        <form>
          <div class="form_item">
            <label><i>*</i>企业名称</label>
            <div class="form_item_content">
              <input type="text" name="name" v-model="dform.companyName" maxlength="30" placeholder="请输入企业名称" />
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>联系电话</label>
            <div class="form_item_content">
              <input type="text" name="name" v-model="dform.phone" maxlength="14" placeholder="请输入联系电话" />
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>企业注册时间</label>
            <div class="form_item_content">
              <calendar title="" placeholder="请选择日期" v-model="dform.registerData"></calendar>
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>企业规模</label>
            <div class="form_item_content gm">
              <popup-picker :title="''" :data="list1" v-model="companyScale" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择企业规模"></popup-picker>
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>年销售收入</label>
            <div class="form_item_content sr">
              <popup-picker :title="''" :data="list2" v-model="yearSale" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择年销售收入"></popup-picker>
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>企业近三年研发费用(万元)</label>
            <div class="form_item_content">
              <input type="text" name="name" v-model="dform.researchCost" maxlength="10" placeholder="请输入企业近三年研发费用" />
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>企业近三年销售收入(万元)</label>
            <div class="form_item_content">
              <input type="text" name="name" v-model="dform.saleCost" maxlength="10" placeholder="请输入企业近三年销售收入" />
            </div>
          </div>
          <div class="form_item">
            <label><i>*</i>知识产权</label>
            <div class="form_item_content noborder">
              <el-radio v-model="radio" label="0">无知识产权</el-radio>
              <el-radio v-model="radio" label="1">有知识产权(商标除外)</el-radio>
            </div>
          </div>
          <div class="has" v-if="radio==1">
            <div class="form_item">
              <label>拥有知识产权数量(商标除外)</label>
              <div class="form_item_content">
                <input type="text" name="name" v-model="dform.propertyNumber" maxlength="10" placeholder="请输入知识产权数量" />
              </div>
            </div>
            <div class="form_item">
              <label>包含</label>
              <div class="form_item_content">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox :label="1">发明专利</el-checkbox>
                  <el-checkbox :label="3">外观设计专利</el-checkbox>
                  <el-checkbox :label="2">实用新型专利</el-checkbox>
                  <el-checkbox :label="4">软件著作权</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="footer">
            <button @click.prevent="submit">提交</button>
            <p class="tip">如有疑惑请咨询专家</p>
            <a class="phone" href="tel:17816082754">17816082754</a> 或 <a class="phone" href="tel:18679126516">18679126516</a>
          </div>
        </form>
      </div>
		</div>
    <!-- <div v-transfer-dom>
      <alert v-model="show" :title="$t('Congratulations')" @on-show="onShow" @on-hide="onHide"> {{ $t('Your Message is sent successfully~') }}</alert>
    </div> -->
    <toast v-model="showToast" type="warn">{{tip}}</toast>
    <loading :show="loading" text="请稍后"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import Filters from 'src/utils/filters.js';
  import { AlertModule } from 'vux'

	const title = '拾贝商城，你掌上的知识产权服务平台。';
	const link = 'https://wechat.ipsebe.com/weixin/wechat/oauth2servlet';
	const imgUrl = 'https://sebe360test.oss-cn-beijing.aliyuncs.com/B6D57E3A24A407100265911B94032EB0.jpg';
  const cartUrl = CONFIG.cartUrl;
  const addUrl = cartUrl + '/hightech/addHightech.htm';

	export default {
		data() {
		  return {
        loading: false,
        submited: false,
        showToast:false,
        tip: '',
        companyScale:[],
        yearSale:[],
        list1: [['50人以下', '50-100人', '100人以上']],
        list2: [['5000万以下', '5000万-2亿', '2亿以上']],
        /*dform:{
          companyName:'sfsf',
          phone:'13600544165',
          registerData:'2018-04-12',
          companyScale:'1',
          yearSale:'2',
          researchCost:'11',
          saleCost:'12',
          propertyNumber:'12',
          intellectualPropertyRight:'1'
        },*/
        dform:{
          companyName:'',
          phone:'',
          registerData:'',
          companyScale:'',
          yearSale:'',
          researchCost:'',
          saleCost:'',
          propertyNumber:'',
          intellectualPropertyRight:''
        },
        radio: '0',
        checkList:[]
		  }
		},
		mounted(){
			//this.wxShare(title,link,imgUrl,this.path); //微信分享  在mian.js里Vue的原型里已定义
		},
		methods: {
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
      },
      onShow () {
        console.log('on show')
      },
      onHide (type) {
        console.log('on hide', type)
      },
      onChange (val) {
        console.log('val change', val)
      },
      checkValid(){
        if (!this.dform.companyName) {
          this.showToast = true;
          this.tip = '请输入企业名称'
          return;
        }
        if (!this.dform.phone) {
          this.showToast = true;
          this.tip = '请输入联系电话'
          return;
        }
        if (!/^[0-9]*[\+\-]?[0-9]+$/.test(this.dform.phone)) {
          this.showToast = true;
          this.tip = '请输入正确的手机或电话'
          return;
        }
        if (!this.dform.registerData) {
          this.showToast = true;
          this.tip = '请选择企业注册时间'
          return;
        }
        if (!this.companyScale.length) {
          this.showToast = true;
          this.tip = '请选择企业规模'
          return;
        }
        if (!this.yearSale.length) {
          this.showToast = true;
          this.tip = '请选择年销售收入'
          return;
        }
        if (!this.dform.researchCost) {
          this.showToast = true;
          this.tip = '请输入近三年研发费用'
          return;
        }
        if (!/(^0(\.\d{1,2})?$)|(^[1-9]\d*(\.\d{1,2})?$)/.test(this.dform.researchCost)) {
          this.showToast = true;
          this.tip = '研发费用请输入数字，可精确到小数点后两位'
          return;
        }
        if (!this.dform.saleCost) {
          this.showToast = true;
          this.tip = '请输入近三年销售收入'
          return;
        }
        if (!/(^0(\.\d{1,2})?$)|(^[1-9]\d*(\.\d{1,2})?$)/.test(this.dform.saleCost)) {
          this.showToast = true;
          this.tip = '销售收入请输入数字，可精确到小数点后两位'
          return;
        }
        if (this.radio == 1 && !/(^[1-9]\d*$)/.test(this.dform.propertyNumber)) {
          this.showToast = true;
          this.tip = '知识产权数量请输入正整数'
          return;
        }
        if (this.radio == 1 && !this.checkList.length) {
          this.showToast = true;
          this.tip = '请选择一种知识产权类型'
          return;
        }
        return true
      },
      submit(){
        if (this.checkValid()) {
          var self = this;
          var data = Object.assign({}, this.dform);
          var getCompanyScale = () => {
            let ret = '';
            this.list1[0].forEach((item, index) => {
              if (item == this.companyScale[0]) {
                ret = index+1;
              }
            });
            return ret;
          }
          var getYearSale = () => {
            let ret = '';
            this.list2[0].forEach((item, index) => {
              if (item == this.yearSale[0]) {
                ret = index+1;
              }
            });
            return ret;
          }
          data.companyScale = getCompanyScale();
          data.yearSale = getYearSale();
          data.intellectualPropertyRight = this.checkList.join();
          if (this.submited) {
            return;
          }
          this.submited = true;
          this.loading = true;
          data.source = this.$route.meta.source || '';
          self.$http.post(addUrl, data)
          .then((resp) => {
            this.submited = false;
            this.loading = false;
            var d = resp;
            if (d.evaluating) {
              var str = d.evaluating == 1 ? '重点培育' : d.evaluating ==2 ? '鼓励申报' : d.evaluating ==3 ? '推荐申报' : '确定'
              AlertModule.show({
                'title': '',
                'content': '恭喜您！您的测评结果为',
                'buttonText': str,
                onShow () {
                },
                onHide () {
                }
              })
            }
          })
          .catch((err) => {
            this.submited = false;
            this.loading = false;
            this.showToast = true;
            this.tip = '系统繁忙，请稍后再试';
          });
        }
      }
		},
    watch: {
      radio(){
        this.dform.propertyNumber = '';
        this.checkList = [];
      }
    },
		filters: {
		  format: Filters.formatDate.format,
		  priceformat:Filters.priceformat
		}
	}
</script>
<style lang="scss">
@import  "~assets/css/adaptation.scss";
@import  "~assets/css/cssshake.css";
	.home_page{
    background: #022966;padding-bottom: px(20);
    .header{
      position: relative;height: px(300);
      .banner{width: px(750);height: px(300);}
      .red{position: absolute;left:px(72);bottom:px(-50);width: px(140);height: px(148);}
      .test_btn{position: absolute;right:px(84);bottom:px(-30);width: px(400);height: px(84);line-height: px(84);background-image: linear-gradient(155deg, #FF2626 0%, #F77928 100%);box-shadow: 0 px(5) px(5) 0 rgba(86,0,0,0.47);border-radius: px(200);
        font-size: px(32);color: #FFFFFF;text-align: center;
        span{
          display: inline-block;
          i{display: inline-block;width: px(16);height: px(16);border-top: 1px solid #fff;border-right: 1px solid #fff;transform: rotate(45deg) }
        }
        .preview{position: relative;top:px(-4);}
        .shake-little.shake-constant{animation-duration:3000ms;margin-left: px(5);}
        .fade.shake-constant {
          //animation-name: fade;
          animation-duration: 1020ms;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .first{animation-delay: 0ms;animation-name: fade;}
        .second{animation-delay: 340ms;animation-name: fade1;}
        .third{animation-delay: 680ms;animation-name: fade2;}
      }
    }
		.platform{
      padding: px(84) px(20) 0;
      .boxes{
        background: #FFFFFF;box-shadow: 0 px(8) px(8) 0 rgba(18,89,196,0.29);border-radius: px(8);margin-top: px(20);
        h4{height: px(81);line-height: px(45);font-size: px(32);color: #333333;text-align: center;font-weight: normal;padding-top: px(36);}
      }
      .chart{
        text-align: center;padding-bottom: px(30);
        h4{}
        img{width: px(544);height: px(374);margin-top: px(30);}
      }
      .support{
        padding-bottom: px(40);
        .cus{
          font-size: px(34);color: #333333;background: #fff url(~assets/img/home/cup.png) px(50) center no-repeat;background-size: px(80) px(80);padding-left: px(170);margin-top: px(40);padding-right: px(48);
          i{font-size: px(34);color: #151515;font-style: normal;font-weight: bold;}
          b{font-size: px(34);color: #FFA524;display: block;}
        }
        .rend{background-image: url(~assets/img/home/flag.png);margin-top: px(30);}
      }
      .test_til{
        height: px(204);text-align: center;background: transparent url(~assets/img/home/test.png) center center no-repeat;background-size: px(500) px(142);color:#fff;margin-bottom: px(-20);
        h3{padding-top: px(40);font-size: px(48);color: #FFFFFF;font-weight: normal;}
        p{font-size: px(24);color: #FFFFFF;}
      }
      .test{
        padding-top: px(10);
        .form_item{
          padding: 0 px(40);
          >label{
            font-size: px(32);color: #666;line-height: px(45);margin-top: px(30);display: block;
            i{font-size: px(32);color: #F64744;font-style: normal;}
          }
          .form_item_content{
            border-bottom: 1px solid #E5E5E5;padding:px(17) 0 px(29);
            input{width: 100%;border:0;background-color: transparent;height: px(45);line-height: px(45);font-size: px(32);color: #333333;}
            .el-radio__label{font-size: px(32);color: #333333;}
            .el-radio__inner{width: px(32);height: px(32);}
            .vux-calendar{
              .weui-cell{
                padding:0;
                .vux-label{color:#999;}
              }
              .vux-cell-primary{text-align: left;}
              &:before{border:0;}
              //.vux-cell-placeholder{position: relative;top:px(10);display: inline-block;width: px(44);height: px(44);background: #fff url(~assets/img/home/t.png) 0 center no-repeat;background-size: px(44) px(44);margin-right: px(15);}
            }
            .vux-cell-box{
              .weui-cell{
                padding:0;color:#999;
                .vux-label{color:#999;}
              }
              .vux-popup-picker-select,.vux-popup-picker-value{text-align: left!important;}
              &:before{border:0;}
            }
            //.vux-popup-picker-placeholder{position: relative;top:px(10);display: inline-block;width: px(44);height: px(44);background: #fff url(~assets/img/home/s.png) 0 center no-repeat;background-size: px(44) px(44);margin-right: px(15);}
          }
          /* .gm{
            .vux-popup-picker-placeholder{background-image: url(~assets/img/home/g.png);}
          }
          .sr{
            .vux-popup-picker-placeholder{background-image: url(~assets/img/home/s.png);}
          } */
          .noborder{border-bottom:0;}
          .el-radio+.el-radio{margin-left: px(40);}
        }
        .has{
          background: #F8F8F8;height: px(456);padding:px(30) 0;color: #333333;
          .form_item{
            >label{color:#333;}
            .el-checkbox__inner{
              width: px(32);height: px(32);
              &::after{left:px(10);}
            }
            .el-checkbox__label{color:#333;font-size: px(32);}
            .el-checkbox{margin-left: 0;width: px(300);}
            &:last-child{
              .form_item_content{
                border-bottom:0;text-align: left;
                label{margin-bottom: px(15);}
              }
            }
          }
        }
        .footer{
          text-align: center;padding-bottom: px(60);padding-top: px(40);font-size: px(28);
          button{background-image: linear-gradient(90deg, #4272FF 0%, #237CFF 100%);box-shadow: 0 px(4) px(40) 0 rgba(18,89,196,0.31);border-radius: px(200);width: px(560);height: px(84);line-height: px(84);text-align: center;font-size: px(32);color: #FFFFFF;}
          .tip{font-size: px(28);color: #333333;line-height: px(40);padding-top: px(40);}
          .phone{font-size: px(28);color: #2A79FF;line-height: px(40);padding-top: px(2);}
        }
      }
		}
	}
  .weui-toast_forbidden{width: auto!important;padding:0 px(20);max-width: px(600)!important;}
  @keyframes fade {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.8;
    }
  }
  @keyframes fade1 {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.8;
    }
  }
  @keyframes fade2 {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.8;
    }
  }
  //.vux-popup-header-right{color: }
</style>
