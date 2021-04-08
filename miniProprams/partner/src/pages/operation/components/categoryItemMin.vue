<template>
  <!-- 小项list -->
  <div class="categoryItemMinWrap">
    <div class="row-between categoryItemMin" v-for="(it, idx) in data" :key="it.minId" @click="doHandle(it, idx)">
      <label>{{it.minName}}</label><icon type="success" size="19" :color="it.checked ? checkedColor : grayColor"/>
    </div>
  </div>
</template>

<script>
const grayColor = '#EEEEEE';
const checkedColor = '#FF9639';
export default {
  props: {
    data: Array,
  },
  data() {
    return {
      grayColor: grayColor,
      checkedColor: checkedColor,
      checkedData: []
    }
  },
  components: {},
  methods: {
    doHandle (item, index) {
      let ret = {...item};
      ret.checked = !ret.checked;
      this.$emit('doCheck', ret, index);
    }
  }
}
</script>

<style lang="scss">
/* 使用commons.scss中大类小项公用样式 */
</style>
