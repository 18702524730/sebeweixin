<template>
  <div class="ruleWrap">
    <div class="ruleItemWrap">
      <div class="ruleItem" v-for="(item, index) in ruleList" :key="index" @click="$router.push('/pages/index/detail?id=' + item.id + '&title=' + item.title)">
        <p>{{item.title}}</p>
        <i class="icon iconfont icon-jiantou" style="color: #ddd;"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleList: [], // 列表
      pgIndex: 1,
      totalPages: 1
    }
  },
  components: {

  },
  mounted () {
    this.pgIndex = 1;
    this.init();
  },
    // 下拉刷新方法，与methods方法同级
  async onPullDownRefresh() {
    console.log("下拉刷新");
    this.pgIndex = 1;
    this.init();
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    if (this.totalPages >= this.pgIndex) {
      this.init(true);
    }
  },
  methods: {
    async init (type) {
      let data = await this.API.my.ruleList({ pgCount: 15, pgIndex: this.pgIndex, category: 7 })

      this.totalPages = data.totalPages
      this.pgIndex++
      if (type) {
        this.ruleList = this.ruleList.concat(data['list'])
        
      } else {
        this.ruleList = data['list']
      }    
    },
  }
}
</script>

<style lang="scss">
.ruleWrap{padding: 20px 0 0 0;min-height: 100%;
  .ruleItemWrap{
    padding-left: 20px;background: #fff;
    .ruleItem{display: flex;border-bottom: 1px solid #eee;position: relative;
      p{font-size: 28px;color:#333;line-height: 90px;}
      .icon-jiantou{position: absolute;right: 20px;top: 0;font-size: 26px;height: 90px;line-height: 90px;}
      &:last-child{border-bottom: none;}
    }
  }

}
 
</style>
