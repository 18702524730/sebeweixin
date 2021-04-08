<template>
  <!-- 小项list -->
  <div class="itemCheckBox">
    <div class="row-between itemCheck" v-for="(it, idx) in data" v-if="it.category==index" :key="it.id" @click="doHandle(it, idx)">
      <label @click.stop="preview(it)">{{it.title}}</label><icon type="success" size="23" :color="it.checked ? checkedColor : grayColor"/>
    </div>
  </div>
</template>

<script>
const grayColor = '#EEEEEE';
const checkedColor = '#2F80F6';
export default {
  props: {
    data: Array,
    index: Number,
  },
  data() {
    return {
      grayColor: grayColor,
      checkedColor: checkedColor,
      checkedData: []
    }
  },
  mounted() {
    console.log(this.index)
  },
  components: {},
  methods: {
    doHandle (item, index) {
      let ret = {...item};
      ret.checked = !ret.checked;
      this.$emit('doCheck', ret, index);
    },
    preview(item) {
      wx.downloadFile({
        url: item.url,
        success: function(res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function(res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.itemCheckBox{
  .itemCheck{
    height: 125px;border-bottom:1px solid #eee;line-height: 125px;margin: 0 20px;font-size:30px;
    label{max-width: 640px;padding-left: 0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align: left;}
    icon{margin-top: 48px;}
  }
  .itemCheck:last-child{border-bottom: 0;}
}
</style>
