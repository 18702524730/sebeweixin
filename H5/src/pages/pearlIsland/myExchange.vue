<template>
  <div class="myExchange">
    <div class="noList">
      <img src="~assets/img/pearlIsland/noList.gif" alt="">
      <p>暂无兑换记录~</p>
    </div>
    <div class="exchangeItem" v-for="(item, index) in 3" :key="index" v-if="false">
      <div class="itemLeft">
        <h3>兑换优惠券</h3>
        <p>2018-08-9 12:23:21</p>
      </div>
      <div class="itemRight">-323</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="scss">
html,body, #app{min-height: 100%;background: #fff;}
.myExchange{padding: 0 20px;
  .exchangeItem{display: flex;padding: 20px 0 18px;border-bottom: 1px solid #eee;
    .itemLeft{flex-grow: 1;
      h3{font-size: 30px;line-height: 42px;color: #333;padding-bottom: 16px;font-weight: 500;}
      p{font-size: 24px;color: #aaa;line-height: 34px;}
    }
    .itemRight{line-height: 50px;padding-top: 18px;font-size: 36px;color: #000;font-weight: 600;}
  }
  .noList{text-align: center;font-size: 0;padding-top: 400px;
    >img{width: 220px;height: 220px;}
    p{font-size: 30px;line-height: 42px;color: #999;padding-top: 24px;}
  }
}
 
</style>
