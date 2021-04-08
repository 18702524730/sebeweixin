<template>
<div class="demand_list">
  <div class="demand_tab row-start">
    <div class="demand_type" @click="showActionSheet">
      <p class="mr20">{{typeDemand==1?'我提交的':'我承接的'}}<img src="~assets/img/icon/toBottom.png" alt=""></p>
    </div>
    <div style="width:100%;overflow-x:auto;">
      <div class="demand_type_list">
        <p class="mr40 ml20" :class="{'check_tab':demandType == 99}" @click="searchType(99)">全部 {{!statusNumbers.status_99?0:statusNumbers.status_99>99?'99+':statusNumbers.status_99}}</p>
        <p class="mr40" :class="{'check_tab':demandType == 0}" @click="searchType(0)">待处理 {{!statusNumbers.status_0?0:statusNumbers.status_0>99?'99+':statusNumbers.status_0}}</p>
        <p class="mr40" :class="{'check_tab':demandType == 1}" @click="searchType(1)">处理中 {{!statusNumbers.status_1?0:statusNumbers.status_1>99?'99+':statusNumbers.status_1}}</p>
        <p :class="{'check_tab':demandType == 2}" @click="searchType(2)">已完成 {{!statusNumbers.status_2?0:statusNumbers.status_2>99?'99+':statusNumbers.status_2}}</p>
      </div>
    </div>
  </div>
  <div style="height:94rpx;"></div>
  <scroll-view :scroll-y="true" upper-threshold @bindscrolltoupper="scrollT" @bindscroll="scrollT" @bindscrolltolower="addLists" :scroll-top="indexTop">
    <div class="list_info mb20 row-between" v-for="(item,$index) in demandLists" :class="{'mt20':$index==0}" :key="item.requirementDesc" @click="toDetails(item)">
      <div class="info_l">
        <p class="name">{{item.name}}<span>（{{item.phone}}）</span></p>
        <p class="info mt20">{{item.requirementDesc}}</p>
        <p class="times mt10">{{item.createTime}}</p>
      </div>
      <div class="info_r">
        <p class="pending" :class="{'success':item.status==2,'handing':item.status==1,'pending':item.status==0,'shut':item.status==-1,}">{{item.statusText}}</p>
      </div>
    </div>
    <div class="bottom_gif row-center" v-if="gifInfo">
      <text>加载中...</text>
    </div>

    <div class="footer mb30" v-if="nullInfo">到底啦~</div>
  </scroll-view>
  <!-- 没订单 -->
  <div class="null_single" v-if="!demandLists.length&&loading">
    <img class="portrait" src="~assets/img/store/emptyImg.png">
    <div class="txt mb40">您还没有相关需求单</div>
  </div>
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  export default{
  data(){
    return{
      indexTop:0,
      demandType:99,
      typeDemand:1,

      loading:false,
      nullInfo:false,
      pgIndex:1,
      total:0,
      pgCount:5,
      gifInfo:false,
      statusNumbers:{},

      demandLists:[]
    }
  },
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    // to doing..
    console.log('下拉刷新')
    this.pgIndex = 1;
    this.search()
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  // 上拉加载，拉到底部触发
  onReachBottom() {
    if(!this.demandLists.length){
      return;
    }
    // 到底部在这里需要做什么事情
    let pageAll = this.total / this.pgCount;
    if(this.pgIndex >= pageAll) {
      this.loading = true;
      this.nullInfo=true;
      this.gifInfo = false;
      return;
    } 
    this.pgIndex += 1;
    this.nullInfo=false;
    this.gifInfo = true;
    this.search()
    console.log('上拉加载',this.pgIndex)
  },
  onLoad () {
    this.pgIndex = 1;
    this.demandType = 99;
    this.demandLists = [];
    this.typeDemand = 1;
        this.Requirement();
    this.search();
  },
  methods: {
    searchType(index){//提交需求或是承接底部切换
      this.demandType = index;
      console.log(this.demandType)
      this.pgIndex = 1;
      this.search();
    },
    showActionSheet(){//底部切换
      let self = this;
      wx.showActionSheet({
        itemList: ['我提交的', '我承接的'],
        success (res) {
          console.log(res.tapIndex)
          self.typeDemand = res.tapIndex+1;
          self.pgIndex = 1;
          self.demandType = 99;
          self.Requirement();
          self.search();
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    async search(){//请求列表数据
      let self = this;
      console.log(this.demandType)
      let data = {
        status:this.demandType==99?'':this.demandType,
        dependentType:this.typeDemand,
        pgIndex:this.pgIndex,
        pgCount:this.pgCount
      }
      try {
        let resp = await this.API.demand.findPartnerRequirementList(data);
        this.loading = true;
        self.gifInfo = false;
        this.nullInfo=false;
        this.total = resp.totalElements;
        if(this.pgIndex == 1){
          self.demandLists = resp.elements;
          return;
        }
        for(var i = 0; i < resp.elements.length; i++){
          self.demandLists.push(resp.elements[i]);
        }
      }
      catch (e) {
        self.gifInfo = false;
      } 
    },
    toDetails(item){
      this.$router.push({path: '/pages/demandManage/reqManagement?requirementSn='+item.requirementSn});
    },
    async Requirement(){
      let data = {
        dependentType:this.typeDemand
      }
      try {
        let resp = await this.API.demand.statisticsRequirement(data);
        this.statusNumbers = resp;
      }
      catch (e) {
      } 
    }
    
  },
  onShow(){

  },
  computed:{
    dataListInfo:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return this.demandLists.forEach((item) => {
          // item.createTime = Filters.filters.dateFormat(item.createTime);
          item.statusText = Filters.filters.demandStates(item.status);
        })
      },
      set (value) {
      }
    },
  }
}
</script>
<style lang="scss">
  .demand_list{position: relative;height:100%;
    .demand_tab{background:#fff;padding:0 20px 0 20px;display:flex;width:100%;position: fixed;font-size:0;z-index: 100;top:0;
      &.demand_tab::after{content:'';width:80px;height:94px;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);position: absolute;bottom:0;right:0;z-index: 100;}
      &.demand_tab::before{content:'';width:30px;height:94px;background:linear-gradient(90deg,rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);position: absolute;bottom:0;left:180px;z-index: 100;}
      .demand_type{width:240px;}
      .demand_type_list{display:flex;overflow-x: auto;width: 100%;white-space:nowrap;height:94px;
        p{display:inline-block;transform:translate3d(0,0,0);z-index: 1;}
      }
      p{font-size:28px;color:#333;line-height:40px;border-bottom:4px solid #fff;padding-top:27px;padding-bottom:24px;text-align:center;
        img{width:40px;height:40px;vertical-align: middle;}
      }
      p.check_tab{border-color:#2f80f6;color:#2f80f6;font-weight:600;}
    }
    .lists{height:100%;}
    .list_info{width:100%;height:206px;background:#fff;padding:30px 20px;
      .info_l{
        .name{font-size:30px;color:#333;line-height:42px;
          span{font-size:26px;}
        }
        .info{font-size:26px;color:#666;width:600px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .times{font-size:26px;color:#999;}
      }
      .info_r{
        p{font-size:24px;width:100px;height:98px;text-align:center;line-height:98px;border:1px solid #bbb;border-radius:100px;}
        p.pending{border-color:#F64744;color:#F64744;}
        p.handing{border-color:#2F80F6;color:#2F80F6;}
        p.success{border-color:#36AF47;color:#36AF47;}
        p.shut{border-color:#BBBBBB;color:#BBBBBB;}
      }
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
</style>
