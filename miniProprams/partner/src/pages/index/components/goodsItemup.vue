<template>
    <div class="serviceItemWrap" >
      <div class="serviceItem">
        <img :src="item.picture" alt="" @click="toDetail(item.productNum)">
        <div class="serviceDes">
          <h2 @click="toDetail(item.productNum)">{{item.productName}}</h2>
          <div class="priceWrap" @click="toDetail(item.productNum)">
            <div class="price"><b>￥</b>{{item.salePrice}}</div>
          </div>
          <div class="tc" @click="toDetail(item.productNum)"><img src="../../../assets/img/store/rmb.png" />提成{{item.extract}}元</div>
        </div>
        <div class="settingMenu">
          <div class="userIcon">
            <i class="valetOrder" @click="$router.push('/pages/valetOrder/valetOrder?productNum=' + item.productNum)">代客<br>下单</i>
            <!-- <i class="icon iconfont icon-xingzhuang" @click="$router.push('/pages/valetOrder/valetOrder?productNum=' + item.productNum)"></i> -->
            <div class="share" @click="$emit('show')">...</div>
          </div>
        </div>
      </div>
      <div class="maskMenu" v-if="item.showMenuState" @click="$emit('hide')">
        <div style="font-size: 40rpx;">
          ×
        </div>
        <div @click="$emit('top')">置顶</div>
        <div @click="underProduct">下架</div>
        <div class="share" @click="$emit('share')">分享</div>
      </div>
    </div>
</template>

<script>
 export default {
   data () {
     return {
      //  showMenuState: false
     }
   },
   props: {
     item: {
       type: Object
     },
     storeCode: {
       type: [Number, String]
     }
   },
   components: {

   },
   mounted () {
     console.log('item', this.item)
   },
   methods: {
     toDetail (num) {
       this.$router.push('/pages/store/serviceDetail?productNum=' + num + '&storeCode=' + this.storeCode)
     },
    // 下架
    underProduct () {
      this.$emit('under')
    },
   }
 }
</script>

<style lang="scss">
    .serviceItemWrap{width: 750px;padding: 30px 20px 0;background: #fff;position: relative;margin-top: 20px;
      .serviceItem{display: flex;padding-bottom: 30px;
        >img{width: 160px;height: 160px;}
        
      }
      .maskMenu{position: absolute;top: 0;left: 0;width: 100%;height: 220px;background:rgba(0,0,0,0.5);display:flex;padding: 60px 95px;
        >div{height: 100px;width: 100px;margin: 0 20px;font-size: 28px;color: #333;background: #fff;border-radius: 50px;text-align: center;line-height: 100px;}
        .share{background:linear-gradient(138deg,rgba(253,114,146,1) 0%,rgba(253,94,44,1) 100%);color:#fff; }
      }
      .serviceDes{flex-grow: 1;padding: 0 50px 0 20px;
        h2{font-size: 28px;line-height: 40px;color:#333;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 410px;height: 40px;}
        .priceWrap{display: flex;padding: 27px 0 12px;height: 89px;
          .price{display: flex;font-size: 36px;line-height: 48px;color: #333;padding: 0 10px 0 0;
            b{font-size: 24px;color: #333;align-self: flex-end;line-height: 50px;}
          }
          .editPrice{color: #2F80F6;font-size: 24px;align-self:flex-end;line-height: 48px;}
        }
        .tc{font-size: 24px;line-height: 33px;color: #666;
          img{width: 35px;height: 24px;padding: 0 5px 0 0;transform: translateY(3px)}
        }
      }
      .settingMenu{width: 70px;
        .userIcon{width: 70px;height: 70px;border-radius: 35px;
          text-align: center;line-height: 56px;
          .icon{color: #238DFF;font-size: 34px;width: 68px;height: 68px;line-height: 62px;border:1px solid #238DFF;border-radius: 35px;margin-bottom: 20px;}
          .valetOrder{font-size: 20px;color: #2F80F6;border: 1px solid #2F80F6;height: 70px;border-radius: 35px;width: 70px;display: inline-block;line-height: 24px;margin-bottom: 20px;padding-top: 10px;text-align: center;}
          img{height: 68px;width: 68px;}
          .share{width: 70px;height: 70px;border-radius: 35px;border:1px solid #eee;color:#666;line-height: 46px;font-size: 30px;}
        }
      }
    }
 
</style>
