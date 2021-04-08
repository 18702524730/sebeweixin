<template>
  <div class="earning_details">
    <u-navbar :tabs="tabs" :activeIndex="activeIndex" :marginLeft="marginLeft" @selectTab="selectTabFn"   />
    
    <div v-if="activeIndex==0">
      <div class="month_total row-between">
        <div class="lef">
          <p class="title">{{ date }}月</p>
          <p class="total">已入账¥ {{ earningData.currMonthAccepted }}</p>
        </div>
        <div class="rig">
          <picker class="weui-btn" mode="date" :value="date" start="1999-01-01" end="2099-01-01" fields="month" @change="DateChange">
            <i class="iconfont date icon-rili"></i>
          </picker>
        </div>
      </div>
      <div class="line_wrap">
        <div class="line_item" v-for="(item, index) in earningList" :key="index" v-if="earningList && earningList.length" >
          <div class="lef">
            <p class="title">{{ item.incomeTypeTitle }}</p>
            <p class="date">{{ item.showTime }}</p>
          </div>
          <div class="rig">
            <p class="num">¥{{ item.incomeAmount }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeIndex==1">
      <div class="month_total none row-between">
        <div class="lef">
          <p class="total">未入账¥ {{ earningData.unAccept }}</p>
        </div>
      </div>
      <div class="line_wrap">
        <div class="line_item" :class="{'gray_item': item.showState==1}" v-for="(item, index) in earningList" :key="index" v-if="earningList && earningList.length">
          <div class="lef">
            <p class="title">{{ item.incomeTypeTitle }}</p>
            <p class="date">{{ item.showTime }}</p>
          </div>
          <div class="center" v-if="item.showState==1">
            <img src="~assets/img/order/refundSuc.png" class="img" alt="">
          </div>
          <div class="rig">
            <p class="num">¥{{ item.incomeAmount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 没及记录 -->
    <div class="null_single" v-if="!earningList.length && !loading">
      <img class="portrait" src="~assets/img/store/emptyImg.png">
      <div class="txt mb40">没有查询到收益记录</div>
    </div>
    <!-- 加载提示语 -->
    <div class="list_loading_text row-center" v-if="loading">
      <text class="text">加载中...</text>
    </div>
    <div class="list_bottom_test mb30" v-if="earningList && earningList.length && moModre">到底啦~</div>

    
  </div>
</template>

<script>
  const monthNow = parseInt(new Date().getMonth())+parseInt(1) <= 9 ? `0${parseInt(new Date().getMonth())+parseInt(1)}` : parseInt(new Date().getMonth())+parseInt(1);
  // _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1)
  // const dateNow = new Date().getFullYear() +'-'+ monthNow;
  const dateNow = new Date().getFullYear() +'-'+ monthNow;
  const nowTime = new Date(dateNow).getTime();
  console.log('dateNow', dateNow, nowTime)
  import Filters from 'utils/filters';
  export default {
    data () {
      return {
        tabs: ['已入账', '未入账'],
        activeIndex: 0,
        marginLeft: 12,
        show: false,
        earningList: [],
        date: dateNow,
        earningData: {},  //数据
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
          item.showTime = Filters.filters.dateFormat(item.showTime, 'yyyy-MM-dd');
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
      console.log('上拉加载');
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
      // 查询我的收益
      async getEaneringListFn () {
        let self = this;
        let data = {
          pgIndex: self.pgIndex,
          pgCount:self.pgCount,
          isAccept: self.activeIndex==0 ? 1 : 0
        }
        if (self.activeIndex == 0) {  //已入账
          console.log(this.data)
          data.showTime = this.date == dateNow ? nowTime : new Date(self.date).getTime();
          console.log('data.showTime',this.date, dateNow, data.showTime)
        }
        self.loading = true;
        let resp = await self.API.my.findAcceptCommission(data);
        self.loading = false;
        self.earningData = resp;
        self.pageAll = Math.ceil(resp.totalElements / self.pgCount);
        if (self.pgIndex == 1) {
          self.earningList = resp.elements;
        }
        else{
          self.earningList = [...self.earningList, ...resp.elements];
        }
        self.earningList.forEach( item => {
          if (item.incomeType == 1) {  //服务分润
            item.nickname ? item.incomeTypeTitle = '服务分润-' + item.nickname : item.incomeTypeTitle = '服务分润'
          } else if (item.incomeType == 2) {
            item.nickname ? item.incomeTypeTitle = '邀约奖励-' + item.nickname : item.incomeTypeTitle = '邀约奖励'
          }
        })
      },
      selectTabFn (data) {
        this.activeIndex = data;
        this.pgIndex = 1;
        this.getEaneringListFn();  //查询我的收益
      },
      // 选择日期
      DateChange (e) {
        this.date = e.mp.detail.value;
        this.getEaneringListFn();  //查询我的收益
      }
    },
    mounted () {
      this.date = dateNow
      let index_ = this.$route.query.index;
      this.activeIndex = index_;
      this.getEaneringListFn();  //查询我的收益
    }
  }
</script>

<style lang='scss'>
  .earning_details {
    width: 100%; height: 100%; background: #f8f8f8; 
    .month_total {
      padding: 20px; align-items: center; background: #F8F8F8;
      .lef {
        text-align: left;
        .title {color: #333; font-size: 28px;}
        .total {color: #2F80F6; font-size: 28px;}
      }
      .rig {
        .date {font-size: 60px; color: #888; }
      }
    }
    .none {padding: 28px 0 40px 20px;}
    .line_wrap {
      margin-top: 0;
      .line_item {
        padding: 30px 0; align-items: flex-start;
        .rig {line-height: 40px;}
      }
      .gray_item {
        .lef {
          .title {color: #999;}
          .date {color: #aaa;}
        }
        .rig {
          .num {color: #999;}
        }
      }
    }   
  }
</style>
