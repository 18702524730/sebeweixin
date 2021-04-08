<template>
  <div class="noticeWrap">
    <div class="noticeItem" v-for="(item, index) in noticeList" :key="index" @click="$router.push('/pages/index/noticeDetail?id=' + item.id)">
      <div class="noticeLeft">
        <h2>{{item.title}}</h2>
        <p>{{item.time}}</p>
      </div>
      <i class="icon iconfont icon-jiantou"></i>
    </div>
  </div>
</template>

<script>
import filter from '@/utils/filters'
export default {
  data () {
    return {
      noticeList: [],
      pgCount: 10,
      pgIndex: 1,
      totalPages: 1
    }
  },
  components: {

  },
  mounted () {
    this.pgIndex = 1;
    this.init()
  },
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=4",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
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
  onShow () {
    setTimeout(() => {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      })
    }, 200);
  },
  methods: {
    async init (type) {
      console.log(filter)
      let data = await this.API.homePage.indexList({ pgCount: this.pgCount, pgIndex: this.pgIndex, category: 2 })
      data['list'].map(item => {
        item.time = filter.filters.dateFormat(item.createTime)
      })
      this.totalPages = data.totalPages
      this.pgIndex++
      if (type) {
        this.noticeList = this.noticeList.concat(data['list'])
        
      } else {
        this.noticeList = data['list']
      }    
    }
  }
}
</script>

<style lang="scss">
.noticeWrap{margin-top: 20px;background: #fff;padding-left: 20px;
  .noticeItem{padding: 30px 0 30px 0;display: flex;border-bottom:1px solid #eee;
    .noticeLeft{flex-grow: 1;
      h2{font-size: 28px;color: #333;line-height: 40px;padding-bottom: 20px;}
      p{font-size: 24px;color: #999;line-height: 33px;}
    }
    .icon{font-size: 20px;color: #ddd;flex-basis: 58px;text-align: right;display: block;padding-right: 20px;height: 100%;align-self: center;}
    &:last-child{border-bottom: none;}
  }
}
 
</style>
