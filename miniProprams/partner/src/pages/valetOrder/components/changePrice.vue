<template>
  <div class="change_price" >
    <div class="transition_content" >
      <div class="servicerF change_price" >
        <div class="close"><img @click="hideEditFn" src="~../assets/img/icon/close.png"/></div>
        <div class="til">修改</div>
        <div class="input_wrap">
          <input type="digit" v-model="changePrice" @blur="inputFn" cursor-spacing="90" placeholder-class="placeholder" name="idcode" confirm-type="done" maxlength="11" :placeholder="placeholder" />
        </div>
        <div class="tips">此操作不会改变服务上架价格</div>
        <div class="edit_num" v-if="curItem.codes != 'sbfw_gnsb_zs'">
          <div class="minus" :class="{'disabled': initNum==1}" @click="minusNum" >-</div>
          <div class="init-num">{{ initNum }}</div>
          <div class="plus" :class="{'disabled': initNum==45}" @click="plusNum" >+</div>
        </div>
      </div>
      <button class="confirm-btn" form-type="submit" @click="confirmChangeFn">确定</button>
    </div>


  </div>
</template>
<script>
  export default{
    props: {
      curItem: {
        type: Object,
        default: {}
      }
    },
    data (){
      return{
        initNum: 0,
        changePrice: 0,
        placeholder: ''
      }
    },
    methods: {
      inputFn (e) {
        let v1 = e.mp.detail.value;
        if (v1) {
          this.changePrice = parseFloat(v1).toFixed(2);
        }
        
      },
      minusNum(e) {
        if (this.initNum == 1) {
          return;
        }
        this.initNum --;
      },
      plusNum() {
        if (this.initNum<45) {
          this.initNum++;
        }
        else{
          // this.$message({content:'已达上限45件商品', type: 'warning' })
        }
      },
      // 确认价格修改信息
      confirmChangeFn () {
        let low = parseFloat(this.curItem.guidePrice * 0.7).toFixed(2);
        
        let heigh = parseFloat(this.curItem.guidePrice * 3).toFixed(2);
        console.log('low, heigh', low, heigh, this.changePrice)
        if (parseFloat(this.changePrice)<parseFloat(low) || parseFloat(this.changePrice)>parseFloat(heigh)) {
          this.tips('修改价格超出指导价格范围')
          return
        }
        let regExp = /^[0-9]+\.?[0-9]*$/;
        if (!regExp.test(this.changePrice)) {
          this.tips('请输入正确格式的价格')
          return
        }
        let data_ = this.curItem;
        data_.serviceNumber = this.initNum;
        data_.salePrice = parseFloat(this.changePrice).toFixed(2);
        this.$emit('submitEdit', data_);
      },
      hideEditFn () {
        this.$emit('submitEdit', this.curItem);
      }
    },
    mounted () {
      this.placeholder = `请输入推单价格(${parseFloat(this.curItem.guidePrice * 0.7).toFixed(2)}~${parseFloat(this.curItem.guidePrice * 3).toFixed(2)})`;
      this.initNum = this.curItem.serviceNumber;
      this.changePrice = this.curItem.salePrice;
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
          height: auto; padding-top:40px;text-align: center;color: #333; font-size: 32px;
        }
        .form{
          text,view{font-family: $font-family;}
        }
        .input_wrap{
          text-align: center; margin: 40px auto;
          input{font-size: 30px; color: #515F71; height:90px; line-height: 90px; width: 630px; margin: 0 auto; border:1px solid #e6e6e6; border-radius: 45px; }
          .input-placeholder{color: #B3BFD0;font-size: $text-lg;}
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
          .init-num{width:112px;text-align: center;color: #333; font-size: 30px; line-height: 60px; }
        }
      }
      .confirm-btn{
        width: 100%;background-image: linear-gradient(147deg, #0096FF 0%, #2F80F6 100%); height: 96px;line-height:96px;font-size: $text-xl;color: #fff; border-radius: 0; padding:0;
        &::after{border:0;}
      }
    }
  }


</style>
