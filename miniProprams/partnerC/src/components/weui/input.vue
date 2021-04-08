<template>
  <div class="u_input ">
    <!-- <label v-if="title" class="weui-input label">{{ title }}</label>
    <input
      class="weui-input"
      type="text"
      :disabled="disabled"
      :focus="autofocus"
      v-model="value"
      :placeholder="placeholder"
    > -->

    <div class="weui-cell">
      <div class="weui-cell__hd"><label class="weui-label" :style="'width:' + leftWidth +'rpx'">{{ title }}</label></div>
      <div class="weui-cell__bd" v-if="!isCode">
        <input class="weui-input" :style="'text-align:'+ align "
          type="text"
          :value="value"
          :maxlength="maxlength"
          @change="change"
          :placeholder="placeholder"
        >
      </div>
      <div class="weui-cell__bd" v-if="isCode">
        <input class="weui-input input_code" :style="'text-align:'+ align "
          type="text"
          :value="value"
          :maxlength="maxlength"
          @change="change"
          :placeholder="placeholder"
        >
        <v-code @tap="codeFn" :start="start" :second="second" ></v-code>
      </div>
    </div>



  </div>

</template>

<script>
import vCode from './vcode';

export default {
  components: {
    vCode
  },
  props: {
    align: {
      type: String,
      default: 'right'
    },
    leftWidth: {   //左边title的宽度
      type: Number,
      default: 200
    },
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String
    },
    // text || textarea || password || number
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'normal'
    },
    right: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    isCode: {
      type: Boolean,
      default: false  //是否是验证码`
    },
    start: {
      type: Boolean,
      default: false  //是否开始倒计时
    },
    second: {
      type: Number,
      default: 60   //总秒数
    }
  },
  data () {
    return {

    }
  },
  methods: {
    change(e) {
      this.$emit('update:value', e.mp.detail.value);
    },
    codeFn() {
      this.$emit('codeFn');
    }
  }
}
</script>

<style lang="scss">
  .u_input {
    border-bottom:1px solid #eee; margin: 0 0 0 20px;
    .weui-cell {font-size: 28px; padding: 0;}
    .weui-label {width: 200px; display: inline-block; font-size: 28px;}
    .weui-input {height: 90px; min-height: 90px; line-height: 90px; font-size: 28px;text-align: right; padding-right: 20px;}
    // &:first-child {border-top:1px solid #eee;}
    &:last-child {border-bottom: none;}
    .input_code {width: 350px;}
  }
</style>
