<template>
    <div class="serviceItemWrap"  @click="toDetail(item.productNum)">
      <div class="serviceItem">
        <img :src="item.picture" alt="">
        <div class="serviceDes">
          <h2>{{item.productName}}</h2>
          <div class="priceWrap">
            <div class="price"><b>￥</b>{{item.salePrice}}</div>
          </div>
        </div>
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
     },
     phone: {
       type: [Number, String]
     }
   },
   components: {

   },
   methods: {
     toDetail (num) {
       this.$router.push('/pages/store/serviceDetail?productNum=' + num + '&storeCode=' + this.storeCode + '&phone=' + this.phone)
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
      .serviceDes{flex-grow: 1;padding: 0 20px 0 20px;position: relative;
        h2{font-size: 28px;line-height: 40px;color:#333;}
        .priceWrap{display: flex;padding: 0;position: absolute;bottom: 0;left: 20px;
          .price{display: flex;font-size: 34px;line-height: 48px;color: #333;padding: 0 10px 0 0;
            b{font-size: 24px;color: #333;align-self: flex-end;line-height: 50px;}
          }
        }
      }

    }
 
</style>
