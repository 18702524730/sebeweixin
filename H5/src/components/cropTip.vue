<template>
  <div class="crop_tip" :class="{hidden: hide}" @click="hide=true">
    <div class="mask"></div>
    <img src="~assets/img/tip1.png">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        hide: false
      }
    },
    mounted () {
      var isCropTipFirst = localStorage.getItem('isCropTipFirst');
      if (isCropTipFirst) {
        this.hide = true;
        return;
      }
      localStorage.setItem('isCropTipFirst', true);
    },
    methods: {
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .crop_tip {
    .mask{position: fixed;top:0;left:0;right: 0;bottom:0;z-index: 1000;background-color: rgba(0, 0, 0, 0.4);}
    img{position: fixed;top: 50%;left:50%;width: px(378);height: px(203);margin-left:px(-378/2);margin-top: px(-320/2);z-index: 1001;}
  }
</style>
