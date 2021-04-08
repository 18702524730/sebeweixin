<template>
  <div class="account_details">
    <u-navbar :tabs="tabs" :activeIndex="activeIndex" :marginLeft="marginLeft" @selectTab="selectTabFn" />

    <div class="line_wrap" >
      <div class="line_item"  v-for="(item, index) in earningList" :key="index">
        <div class="lef">
          <p class="title">{{ item.remark }}</p>
          <p class="date">{{ item.createTime }}</p>
        </div>
        <div class="rig">
          <span class="num num_blue">{{ item.amount }}</span>
        </div>
      </div>
    </div>

    <!-- 没及记录 -->
    <div class="null_single" v-if="!earningList.length && !loading">
      <img class="portrait" src="~assets/img/store/emptyImg.png">
      <div class="txt mb40">您还没有收支记录</div>
    </div>
    <!-- 加载提示语 -->
    <div class="list_loading_text row-center" v-if="loading">
      <text class="text">加载中...</text>
    </div>
    <div class="list_bottom_test mb30" v-if="earningList && earningList.length && moModre">到底啦~</div>


    
  </div>
</template>

<script>

import Filters from 'utils/filters';
  export default {
    data () {
      return {
        tabs: ['收入', '支出'],
        activeIndex: 0,
        marginLeft: 15,
        show: false,
        earningList: [],
        unEarningList: [],
        pgIndex: 1,  //页数
        pgCount: 10,  //每页数量
        pageAll: 1,  //总页数
        moModre: false,  //没有更多值了
        loading: false,
      }
    },
    computed: {
      timeFil () {
        this.earningList.forEach( item => {
          item.createTime = Filters.filters.dateFormat(item.createTime, 'yyyy-MM-dd');
        })
      }
    },
    // 下拉刷新方法，与methods方法同级
    async onPullDownRefresh() {
      console.log("下拉刷新");
      this.pgIndex = 1;
      this.getEaneringListFn();
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },
    // 上拉加载，拉到底部触发
    onReachBottom() {
      console.log('上啦加载');
      if (this.pgIndex >= this.pageAll) {
        this.loading = false;
        this.moModre = true;
        return
      }
      this.pgIndex ++;
      this.loading = true;
      this.moModre = true;
      this.getEaneringListFn();  //查询
    },
    methods: {
      selectTabFn (data) {
        this.activeIndex = data;
        this.pgIndex = 1;
        this.getEaneringListFn();  //查询我的收益
      },
      // 查询我的收益
      async getEaneringListFn () {
        let self = this;
        let data = {
          pgIndex: self.pgIndex,
          pgCount: self.pgCount,
          type: parseInt(self.activeIndex) + 1
        }
        self.loading = true;
        let resp = await self.API.my.findIncomeExpense(data);
        self.loading = false;
        self.pageAll = Math.ceil(resp.totalElements / self.pgCount);
        if (self.pgIndex == 1) {
          self.earningList = resp.elements;
          return
        }
        self.earningList = [...self.earningList, ...resp.elements];
      }
    },
    mounted () {
      this.getEaneringListFn();  //查询我的收益
    }
  }
</script>

<style lang='scss'>
  .account_details {
    width: 100%; height: 100%; background: #f8f8f8; 
    .line_wrap {
      .line_item {
        padding: 30px 0; align-items: flex-start;
        .rig {
          line-height: 50px;
        }
      }
    }   
  }
</style>
