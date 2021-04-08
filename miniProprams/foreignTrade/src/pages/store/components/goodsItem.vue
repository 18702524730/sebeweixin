<template>
  <div class="goodsItem">
    <div class="goodsMask" @click="settingShow = false" v-if="!shelfState || (shelfState && settingShow)" :style="{height: shelfState ? '100%' : ''}">
      <div class="onShelf" v-if="!shelfState" @click="$router.push('/pages/store/serviceDetail?productNum=' + item.productNum)">
        <i class="icon iconfont icon-shangjiashangpin"></i>
        <!-- <sebe-icon type="search" :size="30" color="#fff"></sebe-icon> -->
        <p>上架</p>
      </div>
      <div class="settingItem" v-else>
        <div class="share">分享</div>
        <div class="offShelf">下架</div>
        <div class="toTop">置顶</div>
      </div>
    </div>
    <div class="settingMenu" v-if="shelfState">
      <div class="settingIcon" @click="showMenu">
        <sebe-icon type="setup" :size="35" color="#fff"></sebe-icon>
      </div>
      <div class="userIcon">
        <sebe-icon type="group" :size="35" color="#fff"></sebe-icon>
      </div>
    </div>
    <img v-if="item.picture" :src="item.picture" alt="">
    <!-- <div></div> -->
    <div class="goodsTitle" @click="$router.push('/pages/store/serviceDetail?productNum=' + item.productNum)">{{item.productName}}</div>
    <div v-if="shelfState" class="goodsPrice">
      <p><span>￥</span>{{item.salePrice}}</p>
      <div>修改价格</div>
    </div>
    <div v-if="shelfState" class="percentage">提成400元</div>
  </div>
</template>

<script>
 export default {
   data () {
     return {
       settingShow: false
     }
   },
   props: {
     shelfState: {
       type: Boolean,
       default: true
     },
     item: {
       type: Object
     }
   },
   components: {

   },
   mounted () {
    //  console.log(this.shelfState)
   },
   methods: {
     showMenu () {
       this.settingShow = true
     }
   }
 }
</script>

<style lang="scss">

.goodsItem{position: relative;font-size: 0;width: 345px;padding-bottom: 20px;background: #fff;margin-top: 20px;
  .goodsMask{width: 345px;height: 345px;background: rgba(0,0,0,.3);position: absolute;display: flex;align-items: center;z-index: 100;
    justify-content: center;
    .onShelf{height: 100px;width: 100px;background: #ff9639;border-radius: 50px;text-align: center;
      .icon{font-size: 30px;color: #fff;width: 100px;height: 40px;margin-top: 12px;}
      p{color: #fff;font-size: 20px;text-align: center;}
    }
    .settingItem{
      >div{
        height: 100px;width: 100px;border-radius: 50px;background: #fff;text-align: center;line-height: 100px;color: #333;
      }
      .share{background:linear-gradient(138deg,rgba(253,114,146,1) 0%,rgba(253,94,44,1) 100%);color: #fff;}
      .offShelf{margin: 30px 0; }
    }
  }
  .settingMenu{position: absolute;right: 10px;top: 15px;
    >div{height: 64px;width: 64px;border:1px solid #fff;border-radius: 50%;text-align: center;line-height: 54px;margin-bottom: 15px;}
    .userIcon{background:linear-gradient(147deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border: none;height: 64px;width: 64px; }
  }
  .goodsTitle{font-size: 28px;line-height: 40px;font-weight: 400;color: #333;margin-top: 20px;padding-left: 20px;overflow: hidden;
  text-overflow: ellipsis;white-space: nowrap;}
  .goodsPrice{
    display: flex;padding-left: 20px;margin: 10px 0;
    p{font-size: 34px;color: #333;line-height: 48px;padding-right: 10px;
      span{font-size: 24px;}
    }
    div{color: #2F80F6;font-size: 24px;align-self:baseline;line-height: 56px;}
  }
  .percentage{font-size: 24px;line-height: 33px;padding-left: 20px;color: #666;}
  >img{width: 345px;height: 345px;}
}
</style>
