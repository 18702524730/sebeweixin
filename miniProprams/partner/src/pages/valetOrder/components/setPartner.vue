<template>
  <div class="change_price" >
    <div class="transition_content" >
      <div class="servicerF" >
        <div class="close"><img @click="hideServicer" src="~../assets/img/icon/close.png"/></div>
        <div class="til">{{ curItem.name }}</div>
        <div class="input_wrap">
          <input type="number" v-model="idcode" cursor-spacing="90" placeholder-class="placeholder" name="idcode" confirm-type="done" maxlength="11" placeholder="请输入指定合伙人手机号码" />
        </div>
      </div>
      <button class="confirm-btn" form-type="submit" @click="submiCodeFn">确定</button>
    </div>


  </div>
</template>
<script>
  import Filter from 'utils/utils';
  export default{
    props: {
      curItem: {
        type: Object,
        default: {}
      }
    },
    data (){
      return{
        idcode: '',
      }
    },
    methods: {
      // 确认指定合伙人
      async submiCodeFn () {
        let data_ = this.curItem;
        data_.spPhone = this.idcode;
        if (!Filter.validator.isMobile(this.idcode)) {
          this.tips('请输入格式正确的合伙人手机号码')
          return
        }
        try {
          let resp = await this.API.valetOrder.examinePhone({spPhone: this.idcode, codes: this.curItem.codes});
          data_.isOk = true;
          this.$emit('submitPartner', data_);
        }
        catch (e) {
          // this.tips('合伙人号码格式不存在')
        }
      },
      hideServicer () {
        this.curItem.isOk = false;
        this.$emit('submitPartner', this.curItem);
      }
    },
    mounted () {
      this.idcode = this.curItem.spPhone;
    }
  }
</script>
<style lang="scss">
  @import "../../../assets/css/variable";
  .change_price {
    .transition_content { width: 100%; box-sizing: border-box;background-color: #FFF;border-top-left-radius:10rpx;border-top-right-radius:10rpx; transition: height 0.2s ease-out; overflow: hidden;
      .servicerF{
        position: relative;display: block;width: 100%;height: 100%; padding: 24px;
        .close{
          position: absolute; right:24px; top:24px;text-align: right;
          img {width: 24px;height: 24px;}
        }
        .til{
          height: auto; padding-top:40px;text-align: center;color: #333;font-size:$text-xxl;
        }
        .form{
          text,view{font-family: $font-family;}
        }
        .input_wrap{
          text-align: center; margin: 40px auto;
          input{font-size: 40px; color: #333; height:90px; line-height: 90px; width: 630px; margin: 0 auto; border:1PX solid #e6e6e6; border-radius: 45px; }
          .input-placeholder{color: #bbb;font-size: $text-lg;}
        }
        .tips{
          font-size: 24px; color: #bbb;line-height: 24px; margin: 0 auto 40px auto; text-align: center;
        }
      }
      .change_price {
        .input_wrap {margin-bottom: 20px;}
        .edit_num {
          width:100%; display: flex; justify-content: center; margin-bottom: 60px;
          .minus,.plus{ width:68px;height: 60px;background: #ddd;border-radius: 2px; color: #FFFFFF;font-size:60px; line-height: 50px; text-align: center;}
          .disabled{background: #eee;}
          .plus{}
          .init-num{width:112px;text-align: center;color: #333; font-size: 30px; }
        }
      }
      .confirm-btn{
        width: 100%;background-image: linear-gradient(147deg, #0096FF 0%, #2F80F6 100%); height: 96px;line-height:96px;font-size: $text-xl;color: #fff; border-radius: 0; padding:0;
        &::after{border:0;}
      }
    }
  }


</style>
