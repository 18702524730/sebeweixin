<template>
  <div class="detailbox">
    <div class="item">
      <p class="jianyi">解决建议：</p>
      <div class="jianyicont">
          {{solution}}
      </div>
    </div>
     <div class="item">
      <p class="jianyi">问题补充（选填）：</p>
      <textarea v-model="demandDescribe" maxlength="500" placeholder="补充问题、详述诉求（根据您的描述为您提供专属建议）" />
    </div>
    <div class="commitBtn" @click="submit" v-if="isBindPhone">获取帮助</div>
    <div class="commitBtn"  v-if="!isBindPhone"><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取帮助</button></div>
    <div class="tips"  v-if="!isBindPhone">提交过程可能需要授权手机号！</div>
    <div class="kefu"><button open-type="contact"></button></div>
    <div class="phone" @tap="phoneCall" data-phone="15019259250"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      multiIndex: [],
      pickState: false,
      contactsName:'',
      contactsPhone:'',
      platform:'',
      storeName:'',
      demandDescribe:'',
      id:'',
      solution:'',
      isBindPhone: true
    }
  },
  components: {

  },
  async onShow(option){
    this.id = this.$root.$mp.query.id;
    this.solution = wx.getStorageSync('itemsolution')
    let data =await this.API.interfaces.checkLogin()
    this.isBindPhone = data.isLogin
    console.log(data)
      console.log(wx.getStorageSync('sessionId'))
      console.log(wx.getStorageSync('key'))
  },
  methods: {
    phoneCall(e){
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone
      })
    },
    async submit(){//校验并提交
      let data = {
          problemClassId: this.id,
          problemSupplement: this.demandDescribe
        }
        
      console.log(data)
      try {
        let resp = await this.API.home.submitForeignTrade(data)
        this.demandDescribe = ''
        this.$router.replace({path:'/pages/homepage/success'})
        console.log(resp)
      }catch (e) {
      }
    },
    async getPhoneNumber(e) {
      if(!e.mp.detail.encryptedData){
        wx.showToast({
            title: '请授权手机号信息，方便为您提供更好的服务',
            icon: 'none',
            mask: true
        })
      }else{
        try {
            let ret =await this.API.interfaces.checkLogin()
            let phone = await this.API.interfaces.getPhoneNumber(e);
            let resp = await this.API.interfaces.bindPhone(phone)
            if(resp.memberDto.phone){
                this.isBindPhone = true
            }
        } catch (err) {
            wx.showToast({
                title: (err && err.response.data.msg) || '获取失败',
                icon: 'none',
                mask: true
            })
        }
      }
    },
  }
}
</script>

<style lang="scss">
.detailbox{
  background: #fff;
  min-height: 100%;
  .jianyi{
    padding: 24px 0;
    height: 102px;
    line-height: 55px;
    font-size: 28px;
    font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
    color:#666;
  }
  .jianyicont{
    padding: 24px 60px;
    font-size:28px;
    font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
    color:#fff;
    line-height:48px;
    background-color:#2A83F7 ;
    border-radius: 14px;
  }
  .item{
    padding: 0 24px;
    margin-bottom:64px ;
    textarea{
      width:702px;
      height:291px;
      margin-left: auto;
      margin-right: auto;
      padding: 24px;
      background:rgba(251,251,251,1);
      border:1px solid rgba(224,224,224,1);
      font-size:28px;
      font-family:'PingFangSC-Regular','PingFang SC';
      font-weight:400;
      color: #A1A1A1;
      line-height:40px;
    }
  }
  .tips{
    font-size: 24px;
    text-align: center;
    line-height: 40px;
    color: #999;
  }
  .commitBtn{
    width:600px;
    height:90px;
    margin-left: auto;
    margin-right: auto;
    background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
    border-radius:45px;
    text-align: center;
    font-size:32px;
    font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:90px;
    button{
      float: left;
      outline: none;
      padding: 0;
      margin:0;
      background: none;
      border: none;
      width:600px;
      height:90px;
      color:rgba(255,255,255,1);
      line-height:90px;
    }
  }
}
 
</style>
