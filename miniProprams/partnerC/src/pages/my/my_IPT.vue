<template>
  <div class="my_IPT_page">

  <web-view :src="wxUrl+'/H5/index.html#/myPearlIsland?btnBol=2&key='+ key+'&member_id='+member_id"></web-view>
    
  </div>
</template>

<script>
const wxUrl = CONFIG.wxUrl;
  export default {
    data () {
      return {
        url: '',
        key:'',
        wxUrl:wxUrl,
        member_id:0,
      }
    },
    methods: {

    },
    mounted () {
      this.key = this.$storage.get('key');
      this.member_id = this.$storage.get('auth').member_id;
    }
  }
</script>

<style lang='scss'>
  .my_IPT_page {
    width: 100%; height: 100%; background: #f8f8f8; padding-top:20px;
    .line_wrap {
      margin-top: 0;
      .line_item {
        padding: 30px 0; align-items: flex-start;
        .rig {line-height: 50px;}
      }
    }   
  }
</style>
