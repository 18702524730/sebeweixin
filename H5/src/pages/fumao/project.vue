<template>
    <div class="fumaobox">
        <img class="fumaocont" v-lazy="cont" alt="">
        <div class="zhucebtn" @click="goShopping">
            一键商标注册
        </div>
    </div>
</template>
<script>
import cont from 'assets/img/project/cont.png'


export default {
    components: {
  },
  data(){
    return{
        // 图片
        cont: cont,
    }
  },
  methods:{
    goShopping () {  //商品详情页
      this.$router.push({path: '/detail',query:{id: 1122}})
    },
    
  },
  mounted(){
  },
}

</script>
<style lang="scss">
@import  "~assets/css/adaptation.scss";
.fumaobox{-webkit-overflow-scrolling:touch;background-color:#184ddb;min-height: px(1334)}
.fumaobox{font-size:0;padding-bottom:px(100);
    // 去除ios输入框内阴影
    input{-webkit-appearance: none;}
    .fumaocont {
        width: px(750)
    }
    .zhucebtn {
        position: fixed;
        bottom: 0;
        left: 0;
        width: px(750);
        height: px(100);
        background-color: #3567E5;
        color: #fff;
        font-size: px(36);
        text-align: center;
        line-height: px(100);
    }
}
</style>
