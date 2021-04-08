<template>
  <!-- 大类下展开小项 -->
  <div class="categoryMinWrap">
    <div v-for="(item, index) in data" :key="index">
      <div class="categoryItem" :class="{'itemHight': !!item.checkedNum}">
        <div class="itemName">
          <i class="icon iconfont icon-xiaochengxu-1"></i>{{item.className}}
        </div>
        <div class="itemDes">
          <label>{{item.checkedNum ? item.checkedNum : ''}}</label>
        </div>
      </div>
      <div class="categoryItemMinWrap">
        <div class="row-between categoryItemMin" v-for="(it, idx) in item.serviceNiceMin" :key="it.minId" @click="doCheck(it, idx, item.classId)">
          <label>{{it.minName}}</label><icon type="success" size="19" :color="it.checked ? '#FF9639' : '#EEEEEE'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  data() {
    return {
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    doCheck (item, index, classId) {
      let ret = {...item};
      ret.checked = !ret.checked;
      this.$emit('doCheck', ret, index, classId);
    }
  }
}
</script>

<style lang="scss">
.categoryMinWrap{
  max-height: 753px;overflow: auto;
  // 性能上考虑，这儿不直接引用子组件。使用commons.scss中大类小项公用样式
}
</style>
