<template>
	<div class="home_page" :class="{noFixed : showBtn}">
    <div class="header">
      <img class="banner" src="~assets/img/home/banner_invoice.png">
    </div>
		<div class="platform">
      <div class="boxes test">
        <form>
          <div class="form_item" id="applyName">
            <label for="applyNameIpt">
              <div class="label_d"><i>*</i>申请人</div>
              <div class="form_item_content">
                <input type="text" name="name" id="applyNameIpt" v-model="dform.applyName" @focus="focusHandle(0)" @blur="blurHandle" maxlength="60" placeholder="请输入商标申请人全称" />
              </div>
            </label>
            <i class="weui-icon weui_icon_clear weui-icon-clear" v-show="dform.applyName && focusArr[0]" @click="del('applyName')"></i>
          </div>
          <div class="form_item" id="addresseeName">
            <label for="addresseeNameIpt">
              <div class="label_d"><i>*</i>收件人</div>
              <div class="form_item_content">
                <input type="text" name="name" id="addresseeNameIpt" v-model="dform.addresseeName" @focus="focusHandle(1)" @blur="blurHandle" maxlength="20" placeholder="请输入收件人姓名" />
              </div>
            </label>
            <i class="weui-icon weui_icon_clear weui-icon-clear" v-if="dform.addresseeName && focusArr[1]" @click="del('addresseeName')"></i>
          </div>
          <div class="form_item" id="addresseePhone">
            <label for="addresseePhoneIpt">
              <div class="label_d"><i>*</i>手机号</div>
              <div class="form_item_content">
                <input type="text" name="name" v-model="dform.addresseePhone" id="addresseePhoneIpt" @focus="focusHandle(2, 'addresseeName')" @blur="blurHandle" maxlength="11" placeholder="请输入收件人手机号" />
              </div>
            </label>
            <i class="weui-icon weui_icon_clear weui-icon-clear" v-if="dform.addresseePhone && focusArr[2]" @click="del('addresseePhone')"></i>
          </div>
          <div class="form_item" id="areaData">
            <label>
              <div class="label_d"><i>*</i>所在地区</div>
              <div class="form_item_content gm">
                <!-- <popup-picker :title="''" :data="list1" v-model="companyScale" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker> -->
                <popup-picker :title="''" :data="areaData" :columns="3" v-model="dform.areaData" show-name placeholder="请选择"></popup-picker>
              </div>
            </label>
          </div>
          <div class="form_item" id="address">
            <label for="addressIpt">
              <div class="label_d"><i>*</i>详细地址</div>
              <div class="form_item_content sr">
                <input type="text" name="name" v-model="dform.address" id="addressIpt" @focus="focusHandle(3, 'areaData')" @blur="blurHandle" maxlength="60" placeholder="请输入详细街道地址" />
              </div>
            </label>
            <i class="weui-icon weui_icon_clear weui-icon-clear" v-if="dform.address && focusArr[3]" @click="del('address')"></i>
          </div>
          <div class="form_item" id="platform">
            <label>
              <div class="label_d"><i>*</i>经营平台</div>
              <div class="form_item_content gm">
                <popup-picker :title="''" :data="platformData" v-model="dform.platform" @on-show="onShow" @on-change="platformChange" placeholder="请选择经营平台"></popup-picker>
              </div>
            </label>
          </div>
          <div class="form_item" v-if="isOther" id="platformName">
            <label for="platformNameIpt">
              <div class="form_item_content sr">
                <input type="text" name="name" id="platformNameIpt" v-model="dform.platformName" @focus="focusHandle(4, 'platform')" @blur="blurHandle" maxlength="10" placeholder="请输入经营平台名称" />
              </div>
            </label>
            <i class="weui-icon weui_icon_clear weui-icon-clear" v-if="dform.platformName && focusArr[4]" @click="del('platformName')"></i>
          </div>
          <div class="form_item other" id="business">
            <label>
              <div class="label_d">留言</div>
              <div class="form_item_content">
                <textarea name="name" v-model="dform.business" @focus="focusHandle(5, 'business')" @blur="blurHandle" maxlength="200" placeholder="请输入您需要的服务或帮助" />
                <div class="textarea-counter">
                  <span>{{dform.business.length}}</span>/200
                </div>
              </div>
            </label>
          </div>
          <div class="tips">
            <h3>【温馨提示】</h3>
            <ul>
              <li><i>●</i>发票为您的报销凭证，同时作为此次服务的售后依据（如退款须提供）。</li>
              <li><i>●</i>我们会在收到正确地址后的3个工作日内进行邮寄，谢谢配合。</li>
            </ul>
          </div>
          <div class="newest">
            <h3>【最新动态】</h3>
            <ul>
              <li><i>●</i>证监会规定：互联网企业必须注册第九类商标才能上市。</li>
              <li><i>●</i>天猫入驻要求：入驻卖场型旗舰店，必须注册35类商标及相应产品商标。</li>
              <li><i>●</i>热门国际商标：美国3800元、英国6500元、欧盟11000元等，受理快、注册周期短、一标多类价格更优惠。</li>
            </ul>
          </div>
          <div class="tm">
            <h3>国内商标注册流程：</h3>
            <img src="~assets/img/home/steps.png">
          </div>
          <!-- <div class="share">
            <img src="~assets/img/home/code.png">
            <p>扫一扫关注拾贝服务号<br>让创新保护不再困难</p>
          </div> -->
        </form>
      </div>
		</div>
    <div class="footer">
      <img src="~assets/img/home/logo.png">
      <p class="tip1">www.ipsebe.com</p>
      <p class="tip">客服电话：<a class="phone" href="tel:4000315426">4000-315-426</a></p>
      <p class="tip">客服邮箱：<a class="email" href="mailto:service@cnsebe.com">service@cnsebe.com</a></p>
    </div>
    <!-- <div v-transfer-dom>
      <alert v-model="show" :title="$t('Congratulations')" @on-show="onShow" @on-hide="onHide"> {{ $t('Your Message is sent successfully~') }}</alert>
    </div> -->
    <div class="btn_wrap">
      <button class="submit" @click.prevent="submit">提交</button>
    </div>
    <toast v-model="showToast" type="warn">{{tip}}</toast>
    <loading :show="loading" text="请稍后"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import Filters from 'src/utils/filters.js';
  import {  Selector, Group,AlertModule,Picker,XInput } from 'vux'

	//const title = '拾贝商城，你掌上的知识产权服务平台。';
	//const link = 'https://wechat.ipsebe.com/weixin/wechat/oauth2servlet';
	//const imgUrl = 'https://sebe360test.oss-cn-beijing.aliyuncs.com/B6D57E3A24A407100265911B94032EB0.jpg';

  const cartUrl = CONFIG.cartUrl;
  const addUrl = cartUrl + '/mainConfirmation/addMainConfirmation.htm';
  const addressUrl = cartUrl + '/mainConfirmation/areas.htm';

	export default {
    components: {
      Group,
      Selector,
      Picker,
      XInput,
    },
		data() {
		  return {
        showBtn: false,
        isOther: false,
        loading: false,
        submited: false,
        showToast:false,
        tip: '',
        platformData: [['速卖通', '淘宝', '天猫', '京东', '亚马逊', '实体店', '其它']],
        focusArr:[],
        areaData: [],
        dform:{
          applyName:'',
          addresseeName:'',
          addresseePhone :'',
          areaData:[],
          address:'',
          platform:[],
          platformName:'',
          business:'',
        },
		  }
		},
		mounted(){
			//this.wxShare(title,link,imgUrl,this.path); //微信分享  在mian.js里Vue的原型里已定义
      this.focusArr.length = 6; //5个input框
      this.getAddressData();
		},
		methods: {
      custormAnchor(anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView(); }
      },
      blurHandle(){
        this.showBtn = false;
        this.focusArr.forEach((item,index) => {
          this.focusArr[index] = false;
        });
      },
      del(name){
        this.dform[name] = '';
      },
      focusHandle(index, elementId){
        this.focusArr[index] = true;
        this.showBtn = true;
        if (elementId) {
          this.custormAnchor(elementId)
        }
      },
      change(){},
      onShow () {
        console.log('on show')
      },
      onHide (type) {
        console.log('on hide', type)
      },
      platformChange (val) {
        if (val[0] == '其它') {
          this.isOther = true;
        }else{
          this.isOther = false;
        }
        this.dform.platformName = '';
        console.log('val change', val)
      },
      checkValid(){
        if (!this.dform.applyName) {
          this.showToast = true;
          this.tip = '请输入商标申请人全称'
          return;
        }
        if (!this.dform.addresseeName) {
          this.showToast = true;
          this.tip = '请输入收件人姓名'
          return;
        }
        console.log(this.dform.addresseePhone)
        if (!this.dform.addresseePhone) {
          this.showToast = true;
          this.tip = '请输入收件人手机号'
          return;
        }
        if (!/^1\d{10}$/.test(this.dform.addresseePhone)) {
          this.showToast = true;
          this.tip = '请输入正确的手机号'
          return;
        }
        if (!this.dform.areaData.length) {
          this.showToast = true;
          this.tip = '请选择所在地区'
          return;
        }
        if (!this.dform.address) {
          this.showToast = true;
          this.tip = '请输入详细街道地址'
          return;
        }
        if (!this.dform.platform.length) {
          this.showToast = true;
          this.tip = '请选择经营平台'
          return;
        }else{
          if (this.dform.platform[0] == '其它') {
            if (!this.dform.platformName) {
              this.showToast = true;
              this.tip = '请输入经营平台名称'
              return;
            }
          }
        }
        return true
      },
      getAddressData(){
        let self = this;
        self.$http.get(addressUrl)
        .then((resp) => {
          var d = resp;
          if (d && d.elements && d.elements.length) {
            d.elements.forEach((item) => {
              item.parent = item.parent + '';
              item.value = item.value + '';
            });
            self.areaData = d.elements;
          }
        })
        .catch((err) => {
        });
      },
      getAddressInfo(){
        let ret = {
          provinceName : '',
          cityName: '',
          areaName: '',
        };
        let selectData = this.dform.areaData;
        let areaData = this.areaData;
        selectData.forEach((item, index) => {
          for (var i = areaData.length - 1; i >= 0; i--) {
            let it = areaData[i];
            if (item == it.value) {
              ret[index == 0 ? 'provinceName' : index == 1 ? 'cityName' : index == 2 ? 'areaName' : 'error'] = it.name;
              return false;
            }
          }
        });
        return ret.provinceName+ret.cityName + ret.areaName;
      },
      submit(){
        if (this.checkValid()) {
          var self = this;
          var data = {
            applyName: this.dform.applyName,
            addresseeName: this.dform.addresseeName,
            addresseePhone : this.dform.addresseePhone,
            provinceid : this.dform.areaData[0],
            cityid: this.dform.areaData[1],
            areaid: this.dform.areaData[2],
            addresseeAddressinfo : this.getAddressInfo() + this.dform.address,
            platform: this.dform.platformName ? this.dform.platformName : this.dform.platform[0],
            business: this.dform.business,
            mailType: 2, //1.表示商标注册证邮寄 2.表示发票邮寄
          }
          console.log(data);
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
            if (d && d.code == 200) {
              AlertModule.show({
                'title': '',
                'content': '提交成功！',
                //'buttonText': str,
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
            if (err.response && err.response.data && err.response.data.status == 400) {
              AlertModule.show({
                'title': '',
                'content': err.response.data.msg,
                //'buttonText': str,
                onShow () {
                },
                onHide () {
                }
              })
            }else{
              this.showToast = true;
              this.tip = '系统繁忙，请稍后再试';
            }
          });
        }
      }
		},
    watch: {
    },
		filters: {
		}
	}
</script>
<style lang="scss">
@import  "~assets/css/adaptation.scss";
	.home_page{
    background: #fff;padding-bottom: px(150);
    .header{
      position: relative;height: px(265);
      .banner{width: px(750);height: px(265);}
    }
		.platform{
      .boxes{
        background: #FFFFFF;
        h4{height: px(81);line-height: px(45);font-size: px(32);color: #333333;text-align: center;font-weight: normal;padding-top: px(36);}
      }
      .test{
        padding-left: px(30);
        .form_item{
          padding: px(10) 0;border-bottom: 1px solid #E5E5E5;min-height: px(102);position: relative;
          >label{display: block;min-height: px(80);width: px(720);}
          .label_d{
            font-size: px(30);color: #666;line-height: px(42);display: inline-block;width:px(166);float: left;margin-top: px(20);
            i{font-size: px(30);color: #F64744;font-style: normal;}
          }
          .form_item_content{
            width: px(480);display: inline-block;line-height: px(42);vertical-align: middle;height: px(42);float: left;position: relative;padding-top: px(20);
            input{width: 100%;border:0;background-color: transparent;height: px(42);line-height: px(42);font-size: px(30);color: #333333;}
            .el-radio__label{font-size: px(30);color: #333333;}
            .el-radio__inner{width: px(32);height: px(32);}
            .vux-cell-box{
              .weui-cell{
                justify-content: center;
              }
              .weui-cell_access:active{background-color: transparent;}
            }
            .vux-calendar{
              .weui-cell{
                padding:0;
                .vux-label{color:#999;}
              }
              .vux-cell-primary{text-align: left;}
              &:before{border:0;}
            }
            .vux-cell-box{
              .weui-cell{
                padding:0;color:#999;
                .vux-label{color:#999;}
              }
              .vux-popup-picker-select,.vux-popup-picker-value{text-align: left!important;width: px(466);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
              &:before{border:0;}
            }
          }
          .gm{
            padding-top: px(20);width: px(520);
          }
          .noborder{border-bottom:0;}
          .el-radio+.el-radio{margin-left: px(40);}
        }
        .weui_icon_clear{position: absolute;right: px(10);top:0;height: px(102);width: px(60);}
        .weui_icon_clear:before{margin-top:px(38);}
        .other{
          min-height: px(320);
          .label_d{width: px(200);}
          .form_item_content{
            display: block;min-height: px(260);position: relative;width: 100%;
            textarea{
              border:0;width: px(720);height: px(168);margin-top: px(20);line-height:px(42);font-size:px(30);color:#999999;resize: none;overflow-y: auto;padding-right: px(30);
            }
            .textarea-counter{position: absolute;right: px(30);bottom: px(22);color: #B2B2B2;text-align: right;font-size: px(17);}
          }
        }
        .tips{
          background:#FFFAFA;margin: px(30) 0;padding: px(30);padding-left: px(10);margin-right: px(30);
          h3{height:px(42); font-size:px(30);color:#B98988;line-height:px(42);font-weight: normal;}
          p{font-size:px(26);color:#B98988;line-height:px(37);margin-top: px(20);}
          ul{
            li{
              color:#B98988;font-size:px(26);line-height: px(37);margin-top: px(10);padding-left:px(30);position: relative;
              i{position: absolute;left: 0;top:0;font-style: normal;}
            }
          }
        }
        .newest{
          background:#FFFDF9;margin: px(30) 0;padding: px(30);padding-left: px(10);margin-right: px(30);
          h3{height:px(42); font-size:px(30);color:#B9A188;line-height:px(42);font-weight: normal;}
          ul{
            li{
              color:#B9A188;font-size:px(26);line-height: px(37);margin-top: px(10);padding-left:px(30);position: relative;
              i{position: absolute;left: 0;top:0;font-style: normal;}
            }
          }
        }
        .tm{
          padding:0 px(60) px(40) px(30);
          h3{height:px(42); font-size:px(30);color:#999;font-weight: normal;}
          img{width: px(599);height: px(586);margin:px(40) auto 0;display:block;}
        }
        .share{
          text-align: center;vertical-align: middle;padding-top: px(35);padding-bottom: px(30);
          img{width: px(160);height: px(160);display: inline-block;vertical-align: middle;}
          p{display: inline-block;font-size:px(26);line-height:px(40);color: #666666;vertical-align: middle;text-align: left;padding-left: px(20);}
        }
        .vux-popup-picker-placeholder{font-size: px(30);color: #999;}
        .vux-cell-value{color:#333;}
        .vux-popup-picker-select-box{width: px(492);}
      }
		}
    .btn_wrap{
      position: fixed;bottom:0;height:px(150);width: 100%;padding:px(30);background:#fff;box-shadow: 0 px(-10) px(30) 0 rgba(0,0,0,0.07) ;
      button.submit{width:px(690);height:px(90); background:linear-gradient(135deg,rgba(16,126,255,1),rgba(61,149,250,1));border-radius: px(6) ;line-height: px(90);text-align: center;font-size: px(34);color: #FFFFFF;}
    }

    .service{
      text-align: center;background-color: #fff;height: px(144);box-sizing: border-box;padding:px(30) 0;
      .tip{font-size: px(26);color: #999;line-height: px(44);color:#999999;}
      a{color:#999;text-decoration: none;}
    }
    .footer{
      text-align: center;background-color: #F8F8F8;height: px(176);box-sizing: border-box;padding-top: px(20);
      img{width: px(140);height: px(23);display: block;margin:0 auto;vertical-align: top;}
      .tip1{font-size: px(26);color: #999;line-height: px(44);color:#999999;margin-top: px(5);}
      .tip{font-size: px(24);color: #999;line-height: px(33);color:#999999;vertical-align: top;}
      a{color:#999;text-decoration: none;}
    }
	}
  .noFixed{
    padding-bottom: 0;
    .btn_wrap{
      position: relative;bottom: auto;
    }
  }
  .weui-toast_forbidden{width: auto!important;padding:0 px(20);max-width: px(600)!important;}
</style>
