<template>
  <div class="helpWrap">
    <!-- <div class="item row-between">
      <p><span class="require">*</span><span class="des">联系人</span></p>
      <input v-model="contactsName" maxlength="10" placeholder="请输入联系人姓名" />
    </div> -->
    <div class="logobox"></div>
    <div class="item">
      <p class="des">品牌名称：</p>
      <input v-model="brand"  placeholder="请输入您的品牌名称" />
    </div>
    <div class="item">
      <p class="des">来源国：</p>
      <input v-model="originCountry" maxlength="20" placeholder="请输入您品牌的来源国" />
    </div>
    <div class="item">
      <p class="des">权属号（如有）：</p>
      <input v-model="ownSn" maxlength="20" placeholder="请输入您的权属号" />
    </div>
    <!-- <div class="item row-between">
      <p><span class="require">*</span><span class="des">需求类型</span></p>
      <picker
      mode="multiSelector"
      @change="bindMultiPickerChange"
      @columnchange="bindMultiPickerColumnChange"
      range-key="name"
      :value="multiIndex"
      :range="multiArray">
        <view class="picker" :style="{'color': pickState ? '#333' : '#ddd'}">
          {{ pickState ? multiArray[0][multiIndex[0]].name + '/' + multiArray[1][multiIndex[1]].name : '请选择' }}
          <i class="icon iconfont icon-jiantou" />
        </view>
      </picker>
    </div>
    <div class="des">
      <span class="require">*</span><span class="des">需求描述</span>
      <textarea v-model="demandDescribe" placeholder="请输入您的需求描述，最多500字" />
    </div> -->
    <div class="commitBtn" @click="submit" v-if="isBindPhone">立即鉴别</div>
    <div class="commitBtn"  v-if="!isBindPhone"><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">立即鉴别</button></div>
    <div class="tips"  v-if="!isBindPhone">提交过程可能需要授权手机号！</div>
    <!-- 消息 -->
    <!-- <u-message  /> -->
  </div>
</template>

<script>
  import utils from '@/utils/utils';
export default {
  data () {
    return {
      brand:'',
      originCountry:'',
      ownSn:'',
      isBindPhone: true
    }
  },
  components: {

  },
  async onShow(){
      let data =await this.API.interfaces.checkLogin()
      this.isBindPhone = data.isLogin
  },
  methods: {
    ...utils.validator,  //注入表单校验方法
    async submit(){//校验并提交
      // console.log(this.multiArray[1][this.multiIndex[1]].name)
      if(!this.brand){
        wx.showToast({
            title:'请输入品牌名称',
            icon: 'none',
            mask: false
        })
        return;
      }
      if(!this.originCountry){
        wx.showToast({
            title:'请输入来源国',
            icon: 'none',
            mask: false
        })
        return;
      }

      let data = {
        brand:this.brand,
        originCountry:this.originCountry,
        ownSn:this.ownSn,
      }
      try {
        let resp = await this.API.home.submitOem(data);
        this.brand = '';
        this.originCountry = '';
        this.ownSn = '';
        this.$router.push({path:'/pages/homepage/osuccess'});
      }catch (e) {
        wx.showToast({
            title: '提交失败',
            icon: 'none',
            mask: true
        })
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
.helpWrap{
  min-height: 100%;
  background: #fff;
  .logobox{
    height: 239px;
    background-image: url('~assets/img/homepage/oemlogo.png');
    background-size: auto 100%;
    background-position: center center;
    margin-bottom: 48px;
  }
  .item{
    padding: 0 24px;
    margin-bottom: 48px;
    font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
    .des{ 
      margin-bottom: 24px;
      font-size:28px;
      color:rgba(102,102,102,1);
      line-height:40px;
    }
    input{line-height: 70px;height: 70px;text-align: left;width:100%;border:1px solid #e0e0e0; padding: 14px 24px;}
    .require{color: #F64744;}
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
    margin-top: 100px;
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
