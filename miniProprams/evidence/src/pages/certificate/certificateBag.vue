<template>
  <div class="certificate_bag">
    <p class="ml30">剩余存证包数量：<span>{{cznum||0}}</span></p>
    <div class="bag_list">
      <scroll-view :scroll-y="true" upper-threshold class="lists_scroll">
        <div class="row-between lists" v-for="item in certificateLists" :key="item.id" @click="toOrderDetails(item)">
          <div class="row-start">
            <img src="~assets/img/deposit/fileImage.png" alt="">
            <div class="ml30">
              <p class="name">{{item.orderName}}</p>
              <p class="number mt15">订单号：{{item.order_fictitious_sn}}</p>
              <p class="timer mt15">{{item.create_start_time}}</p>
            </div>
          </div>
          <p :class="{'bag_number':item.orderBussinessType==2,'bag_number_may':item.orderBussinessType!=2}">{{item.orderBussinessType!=2?'+'+item.paymentNumber:'-'+item.paymentNumber}}个</p>
        </div>
        <div class="bottom_gif row-center mt20" v-if="gifInfo">
          <text>加载中...</text>
        </div>

        <div class="footer mb30 mt20" v-if="nullInfo">到底啦~</div>
      </scroll-view>
    </div>
    <p class="shop_czb" @click="shopCzb">购买存证包</p>
    <!-- 没订单 -->
    <Null v-if="!certificateLists.length&&loading"></Null>
  </div>
</template>

<script>
  import Filters from '../../utils/filters.js';
export default {
  data () {
    return {
      nullInfo: false,
      gifInfo: false,
      loading:false,
      total:0,
      pgCount:10,
      pgIndex:0,
      cznum:0,

      certificateLists:[]
    }
  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    // to doing..
    console.log('下拉刷新')
    this.pgIndex = 0;
    this.search()
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    // 到底部在这里需要做什么事情
    let pageAll = this.total / this.pgCount;
    if(this.pgIndex >= pageAll) {//是否是最后一页
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
  methods:{
    shopCzb(){//购买存证包
      this.$router.push({path: '/pages/index/serviceDetail', query: {from: '/pages/certificate/certificateBag'}})
    },
    toOrderDetails(item){//去详情页
      this.$store.dispatch('auth/orderinfo', {orderinfo: item});
      this.$router.push({path: '/pages/certificate/orderDetail'});
    },
    async search(){//初始化
      let self = this;
      let data = {
        page:this.pgIndex,
        size:this.pgCount
      }
      console.log(data)
      try{
        let resp = await this.API.homePage.findPlatformOrderList4czb(data);
        this.loading = true;
        this.total = resp.total_elements;
        if(this.pgIndex == 0){ 
          self.certificateLists = resp.elements;
          return;
        }
        this.gifInfo = false;
        for(var i = 0; i < resp.elements.length; i++){
          self.certificateLists.push(resp.elements[i]);
        }
      }
      catch(e){
      }
    },
    async czbNumber(){//存证包数量
      try{
        let cznum = await this.API.homePage.querycznum();
        this.cznum = cznum.data;
      }
      catch(e){}
    },
  },
  mounted(){
    this.czbNumber();
    this.search();
  },
  computed:{
    dateTime () {
      this.certificateLists.forEach(item => {
        let stime = item.create_time;//开始时间
        console.log(stime)
        let etime = Date.parse(new Date());//结束时间
        let usedTime = etime - stime;  //两个时间戳相差的毫秒数
        //计算天数
        let days=Math.floor(usedTime/(24*3600*1000));
        console.log(days)
        if(days <= 0){//如果是一天之内的
          return item.create_start_time = Filters.filters.dateFormatHM(stime)
        }else if(days==1){//昨天的
          let _date = new Date(stime)
          let hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
          let minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
          let time = "昨天 "+hour+":"+minutes;
          return item.create_start_time = time;
        }else{//几天前直接显示时间
          return item.create_start_time = Filters.filters.dateFormat(stime);
        }
      })
    }
  }
}
</script>

<style lang="scss">
.certificate_bag{background-color:#f8f8f8;height: 100%;
  >p{font-size:30px;color:#333;line-height:80px;height:80px;
    span{color:#22aaf9;}
  }
  .bag_list{background-color:#fff;width:100%;padding-bottom: 120px;
    .lists_scroll{height: 100%;}
    .lists{width:690px;margin:0 auto;height:140px;border-bottom:1px solid #eee;
      img{width:90px;height:90px;border-radius:90px;}
      >div{text-align:left;
        >div{margin-top: 2px;
          p{line-height:100%;}
          .name{font-size:28px;color:#333;}
          .number{font-size:20px;color:#333;}
          .timer{font-size:20px;color:#909090;}
        } 
      }
      .bag_number{font-size:36px;color:#000;}
      .bag_number_may{font-size:36px;color:#ff3b3b;}
    }
  }

  .shop_czb{position: fixed;bottom: 0;width: 100%;height: 100px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color:#fff;font-size: 32px;text-align: center;line-height: 100px;}
}

</style>
