<template>
  <div class="cash_page">
    <div class="line_wrap">
      <div class="line_item" v-for="(item,index) in cashList" :key="index" @click="cahsDetailFn(item)">
        <div class="lef">
          <p class="title" :class="{'t_green': item.withdrawState==1, 't_red': item.withdrawState==-1}">余额提现  ({{ item.status }})</p>
          <p class="date">{{ item.createDate }}</p>
        </div>
        <div class="rig">
          <p class="num num_black">¥{{ item.amount }}</p>
        </div>
      </div>
    </div>

    <!-- 没及记录 -->
    <div class="null_single" v-if="!cashList.length && !loading">
      <img class="portrait" src="~assets/img/store/emptyImg.png">
      <div class="txt mb40">您还没有提现记录</div>
    </div>
    <!-- 加载提示语 -->
    <div class="list_loading_text row-center" v-if="loading">
      <text class="text">加载中...</text>
    </div>
    <div class="list_bottom_test mb30" v-if="cashList && cashList.length && moModre">到底啦~</div>

    
  </div>
</template>

<script>
  import filter from 'utils/filters';
  export default {
    data () {
      return {
        cashList: [],
        Filters: filter.filters,
        pgIndex: 1,  //页数
        pgCount: 10,  //每页数量
        pageAll: 1,  //总页数
        moModre: false,  //没有更多值了
        loading: false,
      }
    },
    computed: {
      filterList () {
        this.cashList.forEach( item => {
          item.status = this.Filters.cahsStatu(item.withdrawState, 'yyyy-MM-dd');
          item.createDate = this.Filters.dateFormat(item.createTime, 'yyyy-MM-dd');
        })
      }
    },
    // 下拉刷新方法，与methods方法同级
    async onPullDownRefresh() {
      console.log("下拉刷新");
      this.pgIndex = 1;
      this.getListFn();
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
      this.getListFn();  //查询
    },
    methods: {
      // 提现详情
      cahsDetailFn (item) {
        this.$router.push({path: `/pages/my/cashDetail?id=${item.id}&state=${item.withdrawState}`})
      },
      // 提现记录
      async getListFn () {
        let self = this;
        self.loading = true;
        try {
          let data = {
            pgIndex: self.pgIndex,
            pgCount: self.pgCount
          }
          let resp = await self.API.my.findWithDrawRecord(data);
          self.loading = false;
          self.pageAll = Math.ceil(resp.totalElements / data.pgCount);
          if (self.pgIndex == 1) {
            self.cashList = resp.elements;
            return
          }
          self.cashList = [...self.cashList, ...resp.elements];
        }
        catch (e) {}
      },
    },
    mounted () {
      this.getListFn();  //查询提现列表
    }
  }
</script>

<style lang='scss'>
  .cash_page {
    width: 100%; height: 100%; background: #f8f8f8; 
    .account_box {
      width: 100%; height:auto; background:#fff; padding-top: 50px;
      .money_box {
        width: 460px; height:460px; box-sizing:border-box; border-radius: 50%; border: 8px solid #09BB07; margin: 0 auto; background: #F8FFF8; position: relative;
        .num {text-align: center; color: #333; font-size: 62px; line-height: 62px; width: 100%; position: absolute; top: 168px; }
        .statu {color: #09BB07; font-size: 32px; text-align: center; width: 100%; position: absolute; top: 240px; font-weight: 500; }
        .ball {width: 38px; height: 38px; border-radius: 50%; background: #53CB5A; position: absolute; left: 50%;}
      }
      .btn_gray {
        width: 710px; height: 90px; margin: 40px 20px 30px 20px; background: #F8F8F8; color: #333; font-size: 32px; border:1px solid #E9E9E9; border-radius: 10px;
        &:after {border:none;};
      }
    }
    .line_wrap {
      .line_item {
        padding: 30px 0; align-items: flex-start;
        .rig {line-height: 40px;}
      }
      .refund {
        .num {color: #333;}
      }
      .rule_box {
        height: 88px; line-height: 88px; border-bottom:1px solid #eee; margin-left: 20px; padding-right: 20px;
        .rig {color: #999;}
      }
    }  
  }
</style>
