<template>
  <div>

  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
export default {
  data () {
    return {

    }
  },
  components: {

  },
  mounted () {
    wx.miniProgram.postMessage({ data: 'success' })
  }
}
</script>

<style>

 
</style>
