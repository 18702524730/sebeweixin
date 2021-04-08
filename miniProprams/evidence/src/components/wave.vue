<template>
    <div class="waveWrapper waveAnimation">
        <div class="wave_in">
            <div class="wave waveTop"></div>
            <div class="wave waveMiddle"></div>
            <div class="wave waveBottom"></div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        // 判断是何处的页面
        props:["typegated"],
        data () {
            return{
            }
        },
        mounted () {
        },

        watch: {
        },

        methods: {
        }
    };
</script>
<style lang='scss' scoped>
    @import '~assets/css/adaptation.scss';
    .waveWrapper {
        width: 100%;
        height: px(100);
        overflow: hidden;
        position: absolute; bottom: px(-30); left: 0;
        background-color: transparent;
        .wave_in{position: relative;}
        .wave {
            width: 100%; height: px(165); position:absolute; left:0; top:0;
            animation:sploosh 3s ease-in-out both infinite; 
            -webkit-animation:sploosh 3s ease-in-out both infinite;
            background-image: url(~assets/img/my/wave.png);
            background-size: 100% 100%;
            background-color: transparent;
        }
        .waveTop{-webkit-animation-delay: 0s;  animation-delay: 0s; opacity:0.3;}
        .waveMiddle{-webkit-animation-delay: -2s;  animation-delay: -2s; opacity:0.6;}
        .waveBottom{-webkit-animation-delay: -4s;  animation-delay: -4s; opacity:1;}
    }

    @-webkit-keyframes sploosh{
      0% {background-position: 0 0;}
      100% {background-position: px(750) 0;}
    }
    @keyframes sploosh{
      0% {background-position: 0 0;}
      100% {background-position: px(750) 0;}
    }
</style>