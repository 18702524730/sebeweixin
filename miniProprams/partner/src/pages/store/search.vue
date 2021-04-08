<template>
 <div class="searchWrap">
   <div class="searchPanel">
      <i class="icon iconfont icon-sousuo"></i>
      <input type="search" :focus="true" @focus="keyword = ''" placeholder="服务搜索" placeholder-class="phcolor" @confirm="searchAllProduct" v-model="keyword" />
      <div @click="searchAllProduct" class="searchBtn" v-if="!cancleState || !keyword">搜索</div>
      <div class="searchBtn" @click="handleClickCancle" v-if="cancleState && keyword">取消</div>
   </div>
   <div class="historyList">
     <div class="historyTitle">
       <div class="hisText" v-if="searchState==2">历史记录</div>
       <div class="clearHis" @click="clearAll" v-if="searchState==2 && historyData.length">清空</div>
       <div class="hisText" v-if="searchList.length">搜索结果</div>
     </div>
     <div class="historyItem" v-if="searchState===2" v-for="item in historyData" :key="item">
       <p @click="handleClickHisItem(item)">{{item}}</p>
     </div>
     <div class="historyItem" v-if="!historyData.length&&searchState===2">
       <p>暂无</p>
     </div>
     <div class="historyItem" v-if="searchList.length" v-for="item in searchList" :key="item">
       <p @click="$router.push('/pages/store/serviceDetail?productNum=' + item.productNum)">{{item.productName}}</p>
     </div>
   </div>
   <div class="notFound" v-if="searchState === 0">
     <img src="~assets/img/store/notFound.png" alt="">
     <p>没有找到搜索结果</p>
   </div>
   <div class="toTop" @click="goTop" v-if="topBtnState">
     <i class="icon iconfont icon-zhiding"></i>
   </div>
   <u-message />
 </div>
</template>

<script>

export default {
  data() {
    return {
      keyword: "",
      historyData: [
      ],
      searchList: [],
      searchState: 2,
      topBtnState: false,
      cancleState: false
    }
  },
  components: {},
  onShow () {
    this.keyword = ''
    this.historyData = []
    this.searchList = []
    this.searchState = 2
    console.log(this.$storage.get('storeCode'))
    this.searchHistory()
  },
  mounted () {
    console.log(wx.getSystemInfoSync().windowHeight)
    let query = wx.createSelectorQuery()
    query.select('.searchWrap').boundingClientRect(rect => {
      console.log(rect.height, rect.width)
    }).exec()
  },
  methods: {
    handleClickHisItem (item) {
      this.keyword = item
      this.searchAllProduct()
    },
    handleClickCancle () {
      this.keyword = ''
      this.searchList = []
      this.cancleState = false
      this.searchState = 2
      this.searchHistory()
    },
    async searchHistory () {
      let data = await this.API.search.searchHistory({type: 1})
      if (data) {
        this.historyData = data
      }
    },
    async searchAllProduct () {
      if (!this.keyword) {
        this.$message({content: '请输入您要搜索的关键字', type: 'error' })
        return
      }
      let data = await this.API.search.searchAllProduct({
        pgIndex: 1,
        pgCount: 100,
        content: this.keyword
      })
      if (data.elements) {
        this.cancleState = true
        this.searchList = data.elements
        this.searchList.length ? this.searchState = 1 : this.searchState = 0
      }
    },
    clearAll () {
      this.API.search.removeSearchHistory({type: 1}).then(() => { this.searchHistory({type: 1}) })
    },
    clearInput () {
      this.keyword = ''
    },
    goTop (e) {  // 一键回到顶部
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    }
  },
  watch: {
    keyword(val){
      if (!val) {
        this.cancleState = true
        this.searchState = 2
        this.historyData = []
        this.searchList = []
        this.searchHistory()
      } else {
        this.cancleState = false
      }
    }
  }
}
</script>

<style lang="scss">
page{background: #fff;height: auto;}
.searchWrap{margin: 20px 20px 0;
  box-sizing: border-box;
  .searchPanel{border-radius: 32px;padding: 0 30px 0 20px;display: flex;background: #f5f5f5;
    .i-icon{line-height: 64px;padding: 0 20px 0 0;
      &.clearIcon{padding: 0 20px;}
    }
    .icon{font-size: 30px;color:#ddd;display: inline;line-height: 64px;}
    .searchBtn{line-height: 64px; color: #999;}
    input{height: 64px;line-height: 64px;flex-grow: 1;padding-left: 20px;}
    .phcolor{line-height: 64px;font-size: 28px;color: #999;}
  }
  .historyList{
    padding: 50px 10px 0;
    .historyTitle{color: #999;line-height: 40px;margin-bottom: 10px;display: flex;
      >div{color: #999;}
      .hisText{flex-grow: 1;}
    }
    .historyItem{color: #999;line-height: 90px;border-bottom:1px solid #eee;display: flex;
      p{color: #666;line-height: 90px;flex-grow: 1;}
      .i-icon{padding: 0 10px 0 30px;line-height: 90px;}
    }
    .clearAll{text-align: center;margin-top: 20px;color: #999;line-height: 46px;
      .i-icon{line-height: 46px;}
    }
  }
  .notFound{
    text-align: center;padding-top: 100px;
    >img{width: 490px;height: 500px;}
    p{font-size: 26px;color: #999;line-height: 37px;}
  }
  .toTop{position: fixed;right: 30px;bottom: 30px;width: 60px;height: 60px;
    .icon{line-height: 60px;text-align: center;font-size: 50px;width: 60px;height: 60px;}
  }
}
</style>
