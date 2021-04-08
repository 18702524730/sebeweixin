<template>
 <div class="infoItem">
   <div class="itemName">{{name}}</div>
   <div class="itemDes" @click="toEdit">{{des}}</div>
   <i class="icon iconfont icon-jiantou"></i>
 </div>
</template>

<script>
export default {
  props: {
    name: String,
    des: String,
    to: String
  },
  data() {
    return {}
  },
  components: {},
  methods: {
    toEdit () {
      this.$router.push(this.to + '&title=' + this.name + '&des=' + this.des)
    }
  }
}
</script>

<style lang="scss">
.infoItem{display: flex;border-bottom:1px solid #eee;line-height: 88px;margin: 0 20px;
  .itemName{flex-basis: 200px;color: #333;font-size: 30px;}
  .itemDes{flex-grow: 1;text-align: right;color: #999; font-size: 30px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
    width: 482px;
  }
  .icon{font-size: 20px;color: #ddd;height: 88px;width: 28px;text-align: right;}
  .i-icon{transform: translateY(-3px);}
}
</style>
