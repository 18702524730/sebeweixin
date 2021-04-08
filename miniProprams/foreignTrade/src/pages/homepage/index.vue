<template>
<div class="foreignhome">
  <div v-if="!isBindPhone">
    <getphone @bindOk="change"></getphone>
  </div>
  <div></div>
  <div class="banners">
    <div class="titles"></div>
    <div class="zx_btn"  @click="toproblem">立即咨询</div>
  </div>
  <div class="services">
    <div class="service_tit">
      <div class="left_border"></div>
      <div class="css_h1">服务专栏</div>
    </div>
    <div>
      <div class="servise_list" @click="tolink(1)">
        <div class="servise_li_img li_image1"></div>
        <div class="servise_li_txt">
          <div>出口转内销服务</div>
          <div>品牌注册</div>
        </div>
      </div>
      <div class="servise_list" @click="tolink(2)">
        <div class="servise_li_img li_image2"></div>
        <div class="servise_li_txt">
          <div>境内电商维权</div>
          <div>平台维权</div>
        </div>
      </div>
      <div class="servise_list" @click="tolink(3)">
        <div class="servise_li_img li_image3"></div>
        <div class="servise_li_txt">
          <div>跨境电商服务</div>
          <div>电商产品入驻主要要点</div>
        </div>
      </div>
      <div class="servise_list" @click="tolink(4)">
        <div class="servise_li_img li_image4"></div>
        <div class="servise_li_txt">
          <div>贸易纠纷预警及应对</div>
          <div>贸易纠纷处理——337</div>
        </div>
      </div>
      <div class="servise_list" @click="tolink(5)">
        <div class="servise_li_img li_image5"></div>
        <div class="servise_li_txt">
          <div>展会知识产权服务</div>
          <div>海外参展的知识产权侵权后果及应对手段</div>
        </div>
      </div>
    </div>
  </div>
  <div class="kefu"><button open-type="contact"></button></div>
  <div class="phone" @tap="phoneCall" data-phone="15019259250"></div>
  <div @click="toOem" class="jianbie"></div>
</div>
</template>

<script>
import getphone from '../../components/getMessage.vue'
  export default{
    data(){
      return{
        isBindPhone: true,
        dataList:[
        ],
        other:[]
      }
    },
    components:{
      getphone
    },
    methods: {
      phoneCall(e){
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone
        })
      },
      change(){
        this.isBindPhone = true;
      },
      todetail(it){
        let jianyi = it['solution']
        wx.setStorageSync('itemsolution',jianyi)
        this.$router.push({path:'/pages/homepage/detail?id='+it.id})
      },
      toOem(){
        this.$router.push({path:'/pages/homepage/oempage'})
      },
      toproblem(){
        this.$router.push({path:'/pages/homepage/other'})
      },
      tolink(k){
        wx.setStorageSync('k',k)
        this.$router.push({path:'/pages/homepage/forTheDomesticMarket'})
      },
    },
    async onShow(){
      
      let data =await this.API.interfaces.checkLogin()
      this.isBindPhone = data.isLogin
      //this.search()
      console.log(data)
      console.log(wx.getStorageSync('sessionId'))
      console.log(wx.getStorageSync('key'))
    },

  }
</script>
<style lang="scss">
@import "../../assets/css/variable";
.banners{
  position: relative;
  opacity: .9;
  width: 100%;
  height: 414px;
  background: url('//sebe360test.oss-cn-beijing.aliyuncs.com/foreignTrade/banner.png') no-repeat rgba(4,85,177,1);
  background-size: 100% 100%;
}
.titles{
  background: url('~assets/img/homepage/title.png') no-repeat;
  background-size: contain;
  width: 480px;
  height: 52px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 89px;
}
.servise_list{
  border-top: 2px solid #EEEEEE;
  display: flex;
  align-items: center;
  padding: 32px 28px;
}
.servise_li_txt{
  margin-left: 25px;
  margin-top: -22px;
}
.servise_li_txt>div:first-child{
  height:48px;
  font-size:34px;
  font-weight:bold;
  color:rgba(51,51,51,1);
  line-height:48px;
}
.servise_li_txt>div:last-child{
  height:40px;
  font-size:28px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:40px;
}
.li_image1{
  background: url('~assets/img/homepage/lia1.png') no-repeat;
}
.li_image2{
  background: url('~assets/img/homepage/lib1.png') no-repeat;
}
.li_image3{
  background: url('~assets/img/homepage/lic1.png') no-repeat;
}
.li_image4{
  background: url('~assets/img/homepage/lid1.png') no-repeat;
}
.li_image5{
  background: url('~assets/img/homepage/lie1.png') no-repeat;
}
.servise_li_img{
  width: 178px;
  height: 122px;
  background-size: 100% 100%;
}
.services{
  width: 100%;
  border-radius: 33px;
  background: #fff;
  position: relative;
  top: -75px;
}
.service_tit{
  padding: 48px 0 18px;
  display: flex;
  align-items: center;
}
.left_border{
  width:6px;
  height:32px;
  background:rgba(85,88,222,1);
  margin: 0 25px;
}
.css_h1{
  width:128px;
  height:45px;
  font-size:32px;
  font-weight:600;
  color:rgba(51,51,51,1);
  line-height:45px;
}
.zx_btn{
  width:268px;
  height:70px;
  background:linear-gradient(270deg,rgba(239,119,119,1) 0%,rgba(253,88,88,1) 100%);
  border-radius:35px;
  position: absolute;
  text-align: center;
  font-size:34px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:70px;
  left: 50%;
  transform: translateX(-50%);
  top: 194px;
}
.foreignhome{
  position: relative;
  background-color: #EFEFEF;
  min-height: 100%;
  padding-bottom: 50px;
  .jianbie{
    height: 125px;
    width: 100%;
    margin-top: -25px;
    background:url('~assets/img/homepage/oem.png') center center no-repeat;
    background-size: 100% 100%;
  }
}
</style>
