<template>
<div class="outpatient">
  <div class="outpatient_list row-between">
    <p :class="{'check_type':outpatientType==1}" @click="outpatientType = 1">投诉维权</p>
    <p :class="{'check_type':outpatientType==2}" @click="outpatientType = 2">知产疑难</p>
    <p :class="{'check_type':outpatientType==3}" @click="outpatientType = 3">重点项目</p>
  </div>
  <div class="info_list">
    <knotty v-if="outpatientType==2"></knotty>
    <safeguard v-if="outpatientType==1"></safeguard>
    <project v-if="outpatientType==3"></project>
  </div>
 
  <!-- 底部公共导航 -->
  <!-- <footerNav :active.sync="footerActive" /> -->
</div>
</template>

<script>
  import knotty from './components/knotty.vue';
  import safeguard from './components/safeguard.vue';
  import project from './components/project.vue';
  // import footerNav from 'components/footerNav';
  export default{
    components: {
      knotty, safeguard, project
    },
    data(){
      return{
        footerActive: 1,
        outpatientType:1
      }
    },
    methods: {
    },
    mounted(){
    }

  }
</script>
<style lang="scss">
@import "../../assets/css/variable";
.outpatient{
  position: relative;
  .outpatient_list{width:750px;height:94px;background-color:#fff;padding:25px 20px 0;position: fixed;top:0;z-index: 10;
    p{font-size:$text-lg;border-bottom:4px solid #fff;width:180px;color:#333;text-align:center;padding-bottom: 20px;line-height: 42px;}
    .check_type{color:#2f80f6;border-color:#2f80f6;}
  }
  .info_list{margin-top: 94px;}
}
</style>
