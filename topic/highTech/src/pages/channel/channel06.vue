<template>
 <div class="channleWrap channelWarp3 image_size">
   <!-- <img class="sebe_image" src="~assets/img/channel/sebe.png" alt=""> -->
    <div class="brightPoint point08" :class="state ? 'animatePoint01' : ''">
      <h2>一手标源</h2>
      <p>商标交易一手资源，随买随卖。</p>
      <div class="label">亮点8</div>
    </div>
    <div class="brightPoint point09" :class="state ? 'animatePoint01' : ''">
      <h2>学习培训</h2>
      <p>行业资讯、专业业务、业务开拓、发展合伙人系列培训助力合伙人高速成长。</p>
      <div class="label">亮点9</div>
    </div>
    <div class="imgBox" :class="state ? 'animateImg' : ''">
      <img src="~assets/img/channel/channle05Bg.png" alt="">
    </div>
    <a type="button" class="joinBtn" :class="state ? 'animateBtn' : ''" @click="showForm">立即加入</a>
    <div class="boxForm" :class="formState ? 'animateForm' : ''">
      <div class="closeForm" @click="closeForm">×</div>
      <div class="formItem"><input type='text' :maxlength="10" v-model="name" placeholder="*请输入您的姓名"/></div>
      <div class="formItem"><input type='text' :maxlength="11" v-model="phone" placeholder="*请输入电话号码" /></div>
      <div class="formItem"><input type='text' :maxlength="50" v-model="remark" placeholder="*请输入您所擅长领域，例：商标、专利" /></div>
      <a @click="handleJoin">立即加入</a>
      <p v-show="errorTextState" class="errorText">{{errorText}}</p>
    </div>
    <div @click="closeForm" :class="['mask', formState ? 'maskShow' : '', confirmState ? 'maskShow' : '']"></div>
    <div class="confirm" :class="confirmState ? 'animateForm' : ''">
      <div class="closeForm" @click="closeForm">×</div>
      <p>感谢您对拾贝的支持</p>
      <p>我们将尽快与您取得联系！</p>
      <a class="confirmOk" @click="closeForm">确定</a>
    </div>
 </div>
</template>
<script>
const wxUrl = CONFIG.wxUrl
import axios from 'axios'
export default {
   data () {
     return {
       state: true,
       name: '',
       phone: '',
       remark: '',
       formState: false,
       btnState: false,
       confirmState: false,
			 sizeImg: false,
			 errorTextState: false,
			 errorText: ''
     }
   },
   components: {
   },
   mounted () {
   },
   methods: {
      callMethod () {
        this.state = true
        this.sizeImg = true
      },
      callMethod2 () {
        this.formState = true
      },
      callMethod3 () {
        this.formState = false
      },
     showForm () {
			 this.formState = true
			 this.errorTextState = false
			 this.phone = ''
			 this.name = ''
			 this.remark = ''
     },
     closeForm () {
      this.formState = false
      this.confirmState = false
      this.$emit('showOrHide')
     },
     validPhone (val) {
       const reg = /^1[3-9][0-9]{9}$/
       let flag
       reg.test(val) ? flag = true : flag = false
       return flag
     },
     handleTouchMove () {
       return
     },
     openForm () {
       this.formState = true
       this.errorTextState = false
     },
     handleJoin () {
       this.valide()
       if (this.validPhone(this.phone) && this.name && this.remark) {
          this.API.channel.getInfo({
            phone: this.phone,
            name: this.name,
            major: this.remark
          }).then((res) => {
						if (res.code == '200') {
							this.formState = false
							this.confirmState = true
							this.phone = ''
							this.name = ''
							this.remark = ''
						} else {
							this.errorTextState = true
							this.errorText = res.msg
						}

          }).catch(() => {})
       }
     },
     valide () {
			 if (!this.name) {
				 this.errorTextState = true
				 this.errorText = '请完善姓名'
				 return
			 }
			 if (!this.phone) {
				 this.errorTextState = true
				 this.errorText = '请完善手机号'
				 return
       }
      if (!this.validPhone(this.phone)) {
				 this.errorTextState = true
				 this.errorText = '手机号输入有误'
				 return
       }
			 if (!this.remark) {
				 this.errorTextState = true
				 this.errorText = '请完善擅长领域'
				 return
			 }
       this.errorTextState = false
     }
   },
   watch: {
     name (val) {
      if (!this.name) {
				 this.errorTextState = true
				 this.errorText = '请完善姓名'
				 return
			 }
      this.errorTextState = false
     },
     phone (val) {
			 if (!this.phone) {
				 this.errorTextState = true
				 this.errorText = '请完善手机号'
				 return
       }
      if (!this.validPhone(this.phone)) {
				 this.errorTextState = true
				 this.errorText = '手机号输入有误'
				 return
       }
      this.errorTextState = false
     },
     remark (val) {
			 if (!this.remark) {
				 this.errorTextState = true
				 this.errorText = '请完善擅长领域'
				 return
       }
       this.errorTextState = false
     }
   }
 }
</script>
<style lang="scss">
html, body{
  height: 100%;
}
#app{height: 100%;}
.channelWarp3{padding-top: 120px;}
.channleWrap{
  .sebe_image{position: absolute;top:20px;left:0;width:140px;}
  .brightPoint{
    &.point08{background: rgba(255,255,255,.08) url(~assets/img/channel/point08.png) no-repeat 533px 12px;background-size: 149px 117px;
      // top:12.9%;
			// top: 172px;
			transition: all .5s ease .6s;
    }
    &.point09{background: rgba(255,255,255,.08) url(~assets/img/channel/point09.png) no-repeat 529px 35px;background-size: 149px 118px;
      // top: 29.3%;
			// top: 375px;
			transition: all 0.5s ease 1.1s;
    }
    &.animatePoint01{margin-left: 0;}
  }
  .imgBox{padding: 0 60px 0 75px;font-size: 0;
		// top: 50%;
    opacity: 0;
    &.animateImg{opacity: 1;transition: all .5s ease 1.6s;}
    img{width: 557px;}
  }
  .joinBtn{width: 630px;height: 100px;text-align: center;background: #07d09e;margin-left: 30px;border-radius: 50px;line-height: 100px;
    text-decoration: none;touch-action: none;animation: boxShadowAnimate ease-in  2s infinite;margin-top: -10px;
    font-size: 34px;color: #000;display: block;opacity: 0;
    transition: all .5s ease 2.1s;
    &.animateBtn{opacity: 1;}
  }
  .boxForm{background: #fff;border-top-left-radius: 10px;border-top-right-radius: 10px;position: absolute;left: 0;bottom: -570px;width: 100%;
    padding: 70px 0 50px;font-size: 30px;transition: bottom 0.3s;

    &.animateForm{bottom: 0;z-index: 1000;}
    .formItem{height: 90px;border: 1PX solid #ccd0d6;margin: 0 60px;border-radius: 45px;margin-bottom: 30px;}
    input{border: none;text-align: center;width: 540px;height: 84px;line-height: 84px;color: #223350;
      border-radius: 45px;margin-left: 45px;font-size: 30px;
    }
    > a{display: block;margin: 0 60px;background: #07d09e;border-radius: 45px;height: 90px;line-height: 90px;text-align: center;
      color: #fff;
      &.btnDisable{opacity: 0.5;}
    }
    .errorText{font-size: 24px;color: #f12929;text-align: center;width: 100%;position: absolute;top: 0;line-height: 70px;}
  }
  .confirm{background: #fff;position: absolute;bottom: -496px;width: 100%;left: 0;padding: 198px 60px 50px;border-top-left-radius: 10px;
    border-top-right-radius: 10px;background:#fff url(~assets/img/channel/ok.png) no-repeat 325px 70px;background-size: 100px 100px;
    transition: bottom 0.3s;
    p{font-size: 32px;color: #223350;text-align: center;line-height: 56px;}
    .confirmOk{display: block;height: 90px;line-height: 90px;border-radius: 45px;background: #07d09e;text-align: center;color: #fff;
    margin-top: 46px;}
    &.animateForm{bottom: 0;z-index: 1000;}
  }
  .closeForm{position: absolute;top: 0px;right: 0px;font-size: 30px;color: #999999;z-index: 100;width: 70px;text-align: center;height: 70px;line-height: 70px;}
  .mask{position: absolute;width: 100%;height: 100%;top: 0;left: 0;display: none;
    background: rgba(0, 0, 0, 0.2);
    &.maskShow{display: block;}
  }
  @keyframes boxShadowAnimate {
    0% {
      box-shadow: 0px 15px 98px 0px  rgba(94, 195, 123, 0.7);
    }
    50% {
       box-shadow: 0px 15px 98px 0px  rgba(94, 195, 123, 0);
    }
    100% {
      box-shadow: 0px 15px 98px 0px  rgba(94, 195, 123, 0.7);
    }
  }
}
</style>
