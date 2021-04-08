<template>
  <div class="transition_up" v-if="show" :class="{'show_animation': show}">
    <div class="mask_bg"  @click="hideFn"></div>
    <div class="transition_wrap" >
      <slot></slot>
    </div>


  </div>

</template>

<script>

export default {
  props: ['show'],
  data () {
    return {
      value: '',
    }
  },
  methods: {
    hideFn() {
      this.$emit('hide');
    }
  }
}
</script>

<style lang="scss">
  @keyframes moveUp {
    from {
      transform: translateY(100%)
    }
    to {
      transform: translateY(0)
    }
  }
  @keyframes moveDown {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(100%)
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .transition_up {
    position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 8999;
    .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;}
    .transition_wrap {
      position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;
    }
  }
  .show_animation {
    .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
    .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
  }

</style>
