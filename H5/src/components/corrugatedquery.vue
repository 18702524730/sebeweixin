<template>
	<div class="waveWrapper waveAnimation">
		<div class="waveWrapperInner bgTop">
            <!-- 查询页 -->
            <div class="wave Top"></div>
		</div>
		<div class="waveWrapperInner bgMiddle">
            <!-- 查询页 -->
            <div class="wave Middle"></div>
		</div>
		<div class="waveWrapperInner bgBottom">
            <!-- 查询页 -->
            <div class="wave Bottom"></div>
		</div>
	</div>
</template>
<script>
    import Vue from 'vue'
    export default {
        // 判断是何处的页面
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
<style lang='scss'>
  	@import '~assets/css/adaptation.scss';
  	
    .tradmark{
        @keyframes move_query {
            0% {
                transform: translateX(0) translateZ(0) scaleY(1)
            }
            50% {
                transform: translateX(-25%) translateZ(0) scaleY(0.5)
            }
            100% {
                transform: translateX(-50%) translateZ(0) scaleY(1)
            }
        }
        .waveWrapper {
            height: px(150);
            overflow: hidden;
            position: absolute;
            left: 0;
            right: 0;
            top: px(380);
        }
        .waveWrapperInner {
            position: absolute;
            width: px(750);
            overflow: hidden;
            height: px(100);
            bottom: -1px;
        }
        .footer .waveWrapper{top:0;}
        .bgTop {
            z-index: 15;
            .Top{background-image: url('~assets/img/components/top.png');}
        }
        .bgMiddle {
            z-index: 10;
            .Middle{background-image: url('~assets/img/components/mid.png');}
        }
        .bgBottom {
            z-index: 5;
            .Bottom{background-image: url('~assets/img/components/bot.png');}
        }
        .wave {
            position: absolute;
            left: 0;
            top:px(-30);
            width: px(1500);
            height: 100%;
            background-repeat: repeat no-repeat;
            background-position: 0 bottom;
            transform-origin: center bottom;
        }
        .waveTop{opacity: 0.8;}
        .Top {
            height:px(150);
            background-size: 50% px(100);
        }
        .waveAnimation .Top {
          // animation: move-wave 3s;
          //  -webkit-animation: move-wave 3s;
          //  -webkit-animation-delay: 1s;
          //  animation-delay: 1s;
           animation: move_query 40s linear infinite;
        }
        .waveMiddle{opacity: 0.8;}
        .Middle {
            height:px(150);
            background-size: 50% px(120);
        }
        .waveAnimation .Middle {
            animation: move_query 10s linear infinite;
        }
        .waveBottom{opacity: 0.6;}
        .Bottom {
            height:px(150);
            background-size: 50% px(100);
        }
        .waveAnimation .Bottom {
            animation: move_query 15s linear infinite;
        }
    }
    
</style>