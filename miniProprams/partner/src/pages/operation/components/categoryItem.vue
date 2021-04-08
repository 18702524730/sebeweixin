<template>
  <!-- 单条大类或群组 -->
  <div class="categoryItem" :class="{'itemHight': isHight}" @click="doHandle">
    <div class="itemName">
      <i v-if="preIcon" class="icon iconfont icon-xiaochengxu-1"></i>{{name}}
    </div>
    <div class="itemDes">
      <label>{{num>0 ? num : ''}}</label>
      <i v-if="sufIcon" class="icon iconfont icon-jiantou"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    num: Number,
    to: String,
    preIcon: {// 左侧是否有icon
      type: Boolean,
      default: false,
    },
    sufIcon: {// 右侧是否有icon
      type: Boolean,
      default: true,
    },
    isHight: {// 高亮状态
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  components: {},
  methods: {
    doHandle () {
      this.$emit('doHandle')
    }
  }
}
</script>

<style lang="scss">
/* 使用commons.scss中大类小项公用样式 */
</style>
