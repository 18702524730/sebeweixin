<template>
  <div class="steps-wrap">
    <div class="row-center steps">
      <label :class="{'cur': step==1, 'over': step>1}"><span>1</span>绑定手机</label><i class="icon iconfont icon-xiaochengxu-1" :class="{'cur': step==2, 'over': step>2}"></i><label :class="{'cur': step==2, 'over': step>2}"><span>2</span>0元开店</label><i class="icon iconfont icon-xiaochengxu-1" :class="{'cur': step==3}"></i><label :class="{'cur': step==3}"><span>3</span>实名认证</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: Number,
  },
  data() {
    return {}
  },
  components: {},
  methods: {
  }
}
</script>

<style lang="scss">
.steps-wrap{
  position: fixed;bottom: 60px;width: 100%;
  .steps{
    label{
      font-size:24px;color: #999;
      span{display: inline-block;text-align: center;width: 40px;height: 40px;line-height: 40px;border-radius: 20px;font-size:24px;color: #fff;background-color: #eee;margin-right: 5px;}
      &.over{
        span{background-color: #2F80F6;opacity:0.5;}
      }
      &.cur{
        color: #666;
        span{background-color: #2F80F6;}
      }
    }
    .icon{
      font-size: 32px;margin: 0 25px 0 15px;height: 40px;line-height: 40px;color: #eee;
      &.over{
        color: #2F80F6;opacity:0.5;
      }
      &.cur{
        color: #2F80F6;
      }
    }
  }
}
</style>
