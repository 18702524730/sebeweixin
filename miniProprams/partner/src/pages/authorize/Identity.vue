<template>
  <div class="identityWrap">
    身份选择页面
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    debuonce (methods, delay) {
      var timer = null;
      return function () {
        timer&&clearTimeout(timer)
        setTimeout(() => {
          methods.apply(this, arguments)
        }, delay);
      }
    },
    throttle (methods, delay) {
      var timer = null,
          start;
      return function fn() {
        var now = new Date();
        !start&&(start = now)
        timer&&clearTimeout(timer)
        if (new Date() - start > delay) {
          methods.apply(this, arguments)
          start = now
        } else {
          setTimeout(() => {
            methods.apply(fn, arguments)
          }, delay);
        }
      }
    }
  },
}
</script>

<style lang='scss'>

 
</style>
