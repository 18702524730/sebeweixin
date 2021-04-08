<template>
  <div class="search_result_tip" :class="{hidden: hide}" @click="hide=true">
    <div class="mask"></div>
    <img src="~assets/img/tip.png">
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
      var isResultTipFirst = localStorage.getItem('isResultTipFirst');
      if (isResultTipFirst) {
        this.hide = true;
        return;
      }
      localStorage.setItem('isResultTipFirst', true);
    },
    methods: {
      /*click(key){
        console.log(key)
      },*/
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .search_result_tip {
    .mask{position: fixed;top:0;left:0;right: 0;bottom:0;z-index: 1000;background-color: rgba(0, 0, 0, 0.4);}
    img{position: fixed;top: 50%;left:50%;z-index: 1001;width: px(360);height: px(249);margin-left:px(-360/2);margin-top: px(-200/2);}
  }
</style>
