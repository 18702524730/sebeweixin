<template>
 <div class="serviceWrap">
    <!-- <div class="searchPanel">
      <sebe-icon type="search" :size="40"></sebe-icon>
      <input type="search" placeholder="服务搜索" v-model="keyword" />
      <div @click="clearInput" class="searchBtn">搜索</div>
    </div> -->
    <div class="serviceContent">
      <div class="serviceType">
        <p v-for="(bsItem, index) in serviceList"
        :key="index"
        @click="handleClickServiceType(index)"
        :class="serviceActive === index ? 'serviceActive' : ''">{{bsItem.bsClassName}}</p>
      </div>
      <!-- <div class="serviceItem" id="serviceItem"
        :scroll-y="true"
        @bindscroll="handleBindScroll"
        @scrolltolower="scrolltolower"
        @scroll="handleScroll"> -->
      <div class="serviceItem" id="serviceItem"
        :scroll-y="true">
        <div class="typeWrap" v-for="(item, index1) in currentItem.childs" :key="index1">
          <div class="typeTitle">
            <div class="title">{{item.bsClassName}}</div>
            <div class="serviceNum">{{item.childs ? item.childs.length : ''}}项服务</div>
          </div>
          <div v-for="(item1, index2) in item.childs" class="littleItem" :key="index2">
            <div @click="handleClickService(item1)">{{item1.name}}</div>
            <i class="icon iconfont icon-jiantou"></i>
          </div>
        </div>
        
      </div>
      
    </div>
 </div>
</template>

<script>

export default {
  data() {
    return {
      serviceList: [],
      scrollTop: 0,
      serviceActive: 0,
      currentItem: {}
    }
  },
  components: {  },
  async onLoad () {
    this.serviceActive = 0
    await this.findAllCategory()
    this.currentItem = this.serviceList[0]
  },
  methods: {
    handleClickService (item) {
      let query = this.$root.$mp.query;
      if (query.from) {
        this.$storage.set('demandItem', item);
        this.$router.go(-1);
      } else {
        this.$router.push({path: '/pages/store/serviceDetail', query: { productNum: item.productNum }})
      }
    },
    async findAllCategory () {
      let data = await this.API.store.findAllCategory()
      if (data) {
        this.serviceList = data
        console.log(this.serviceList)
      }
    },
    scrolltolower(e){
      console.log(e)
    },
    handleBindScroll (e) {
      console.log(e.detail )
    },
    handleClickServiceType (index) {
      console.log(index)
      this.serviceActive = index
      this.currentItem = this.serviceList[index]
    },
    handleScroll (e) {
      console.log('target', e.target.scrollTop)
      this.scrollTop = e.target.scrollTop
      console.log(this.$refs.serviceItem)
      // this.$refs.serviceItem.changeState()
    }
  }
}
</script>

<style lang="scss">
page{background: #fff;}
.serviceWrap{
  height: 100%;overflow: hidden;display: flex;flex-direction: column;
  .serviceContent{display: flex;padding: 20px 0 0 0;flex-grow: 1;
    .serviceType{flex-basis: 210px;line-height: 94px;color: #333;background: #f8f8f8;
      p{padding-left: 30px;}
      .serviceActive{background: #fff;}
    }
    .serviceItem{flex-grow: 1;line-height: 94px;position: relative;overflow-y: scroll;padding-left: 40px;
      .typeWrap{
    
        .typeTitle{display: flex;line-height: 94px;
          .title{font-size: 26px;color: #999;flex-grow: 1;}
          .serviceNum{font-size: 24px;color: #999;padding-right: 30px;}
        }
        .littleItem{border-bottom:1px solid #eee;display: flex;line-height: 94px;
          >div{width: 452px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
          .icon{font-size: 20px;color: #ddd;height: 88px;width: 48px;text-align: right;padding-right: 20px;}
          .i-icon{transform: translateY(30px);}
        }
      }
    }
  }


  .searchPanel{border:1px solid #eee;border-radius: 32px;padding: 0 30px 0 20px;margin: 20px 20px 0 20px;position: relative;
    height: 64px;background:rgba(248,248,248,1);
    .i-icon{line-height: 60px;padding: 0 20px 0 0;
      &.clearIcon{padding: 0 20px;}
    }
    .searchBtn{line-height: 60px; color: #999;position: absolute;right: 30px; top: 0;}
    input{height: 60px;line-height: 60px;flex-grow: 1;position: absolute;top:0;left: 72px;}
  }
}






</style>
