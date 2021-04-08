<template>
    <div class="authbox">
        <div class="tipicon"></div>
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">请授权手机号信息，方便为您提供更好的服务</button>
        <!-- <button @click="bindPhone()">请授权头像、昵称、手机号等信息，为您提供更好的服务</button> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    methods:{
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
                    this.$emit('bindOk')
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
.authbox{
    width: 100%;
    padding-left: 68px;
    text-align: left;
    height:65px;
    background:rgba(255,252,221,1);
    .tipicon{
        width: 29px;
        height: 29px;
        position: absolute;
        left: 24px;
        top: 18px;
        background-image: url('~assets/img/homepage/warn.png');
        background-position: center center;
        background-size: 100% 100%;
    }
    button{
        width: 100%;
        outline: none;
        border:none;
        margin: 0;
        padding:0;
        background: none;
        height: 65px;
        line-height: 65px;
        font-size: 24px;
        color: #FF1C1C;
        text-align: left
    }
}
</style>

