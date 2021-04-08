<template>
    <div class="waveWrapper waveAnimation">
        <!-- 首页 -->
        <div class="wave waveTop"></div>
        <!-- 首页 -->
        <div class="wave waveMiddle"></div>
        <!-- 首页 -->
        <div class="wave waveBottom"></div>
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
    @keyframes move_wave {
        0% {
            transform: translateX(0) translateZ(0) scaleY(-0.7)
        }
        50% {
            transform: translateX(-25%) translateZ(0) scaleY(-0.5)
        }
        100% {
            transform: translateX(-50%) translateZ(0) scaleY(-0.7)
        }
    }
    .waveWrapper {
        height: px(100);
        overflow: hidden;
        position: relative;
        left: 0;
        right: 0;
    }
    .footer .waveWrapper{top:0;}
    .waveTop{background-image: url('~assets/img/components/top.png');z-index: 15;}
    .waveMiddle{background-image: url('~assets/img/components/mid.png');z-index: 10;}
    .waveBottom{background-image: url('~assets/img/components/bot.png');z-index: 5;}
    .wave {
        position: absolute;
        left: 0;
        top:px(-150);
        width: px(1500);
        height: 100%;
        background-repeat: repeat no-repeat;
        background-position: 0 bottom;
        transform-origin: center bottom;
    }
    .waveTop{opacity: 1;}
    .waveTop{
        height:px(150);
        background-size: 50% px(100);
    }
    .waveAnimation .waveTop{
       animation: move_wave 30s linear infinite;
    }
    .waveMiddle{opacity: 1;}
    .waveMiddle{
        height:px(150);
        background-size: 50% px(120);
    }
    .waveAnimation .waveMiddle{
        animation: move_wave 5s linear infinite;
    }
    .waveBottom{opacity: 1;}
    .waveBottom,.Bottom {
        height:px(150);
        background-size: 50% px(100);
    }
    .waveAnimation .waveBottom{
        animation: move_wave 10s linear infinite;
    }
</style>