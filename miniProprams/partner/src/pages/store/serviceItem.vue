<template>
<div>
  <div class="typeTitle" :class="fixedState ? 'isFixed' : ''">
    <div class="title">{{sItem}}</div>
    <div class="serviceNum">30项服务</div>
  </div>
  <div v-for="(item, index1) in 7" class="littleItem" :key="index1">{{sItem}}  {{index1}}</div>
</div>

</template>

<script>
 export default {
   name: 'serviceItem',
   data () {
     return {
       fixedState: false
     }
   },
   props: {
     index: {
       type: Number
     },
     sItem: {
       type: [String, Object]
     },
     scrollTop: {
       type: Number
     }
   },
   components: {

   },
   mounted () {
     console.log(this.index, this.sItem)
   },
   methods: {
     changeState () {
       let index = this.index
       if (this.index === 0) {
         (this.scrollTop*2 < (index + 1) * 8 * 94 && this.scrollTop > 5) ? this.fixedState = true : this.fixedState = false
       } else {
         (this.scrollTop*2 < (index + 1) * 8 * 94 && this.scrollTop*2 > index * 8 *94) ? this.fixedState = true : this.fixedState = false
       }
     }
   },
   watch: {
     scrollTop (val) {
       this.changeState()
     }
   }
 }
</script>

<style lang="scss">
  .typeTitle{display: flex;line-height: 94px;
    .title{font-size: 26px;color: #999;flex-grow: 1;}
    .serviceNum{font-size: 26px;color: #999;padding-right: 30px;}
  }
  .littleItem{border-bottom:1px solid #eee;}
  .isFixed{position: fixed;top: 102px;background: #fff;}
</style>
