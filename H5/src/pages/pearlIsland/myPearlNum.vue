<template>
  <div class="myPearlWrap">
    <div class="myPearlHead">
      <div class="des">持有珍珠总数</div>
      <h2 v-if="!totalObj.totalScore">0</h2>
      <h2 v-else>
        <ICountUp
          :startVal="0"
          :endVal="totalObj.totalScore"
          :end="totalObj.totalScore"
          :decimals="decimals"
          :duration="duration"
          :options="options"
        />
      </h2>
      <div class="yestdayNum">
        <div class="text">昨日获得总数</div>
        <div class="num">{{totalObj.yesterdayScore||0}}</div>
        <div class="rule" @click="$router.push('/rules')"><i class="icon iconfont icon-yiwen"></i>获得规则</div>
      </div>
    </div>
    <div class="myContent">
      <div class="contentTop">
        <div class="pearlDes">珍珠是创新珍珠的简称，是知识产权与创新保护共享生态的通证,各类生态角色每一次有价值的行为互动都将记录在区块链上，并奖励珍珠作为量化的权益证明。</div>
        <h2>获得记录</h2>
        <div class="scroll_list" ref="detailsInfo">
          <div ref="iptH">
            <div class="listItem" v-for="(item,index) in iptList" :key="index">
              <div class="top">
                <div class="des">{{item.logType | logTypeFil}}</div>
                <div class="num">+{{item.score.toFixed(4)}}</div>
              </div>
              <div class="time">{{item.createDate|dateFormat}}</div>
            </div>
          </div>
        </div>
        <div class="info_null" v-if="(!iptList||!iptList.length)&&!loading">
          <img src="~assets/img/pearlIsland/null.png" alt="">
          <p class="mt15">暂无数据</p>
        </div>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <img src="~assets/img/pearlIsland/pearl_load.gif" alt="">
    </div>
  </div>
</template>

<script>
  import ICountUp from 'vue-countup-v2';
  const iptUrl = CONFIG.iptUrl;
  const iptProfileUrl = iptUrl + '/partner/b/iptStatisticsInfo.htm';
  const iptInfoUrl = iptUrl + '/partner/b/iptLogInfo.htm';
  import Filters from 'src/utils/filters.js';
export default {
    components: {
      ICountUp
    },
  data () {
    return {
      totalObj:{},
      box:'',
      total:0,
      loading: false,
      pgIndex:0,
      iptList:[],

      oldTop:0,//判断向上还是向下滚动
      // 数字缓动参数
      decimals: 4,
      duration: 1,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
    }
  },
  methods:{
    getTotalInfoFn () {// 查询总量信息
      this.$http.get(iptProfileUrl)
      .then( resp => {//接口为之前老接口，数据不匹配，测试使用
        this.totalObj = resp;
        console.log((resp))
      })
    },
    // 查询列表
    getIptInfo () {
      this.loading = true;
      this.$http.get(iptInfoUrl, {params: {pgIndex: this.pgIndex, pgCount:10}})
      .then( resp => {
        this.loading = false;
        this.total = resp.totalElements;
        if(this.pgIndex == 0){
          this.iptList = resp.elements;
        }else{
          resp.elements.forEach((item)=>{
            this.iptList.push(item);
          })
        }
      }).catch(err => {
        this.loading = false
      })
    },
    pageTrun(){
      let iptH = this.$refs.iptH.offsetHeight;//列表高度
      let scrollTop = this.$refs.detailsInfo.scrollTop;//滚动高度
      let clientHeight = this.$refs.detailsInfo.clientHeight;//滚动部分屏幕高度
      console.log(iptH,clientHeight, scrollTop)
      if(this.oldTop < scrollTop){//向下滚动可以翻页
        if((clientHeight + scrollTop) >= (iptH - 20) && !this.loading && this.total/10 > this.pgIndex){//距离底部20像素就翻页
          console.log('翻页')
          this.pgIndex += 1;
          this.getIptInfo();
        }
      }
      this.oldTop = scrollTop;//赋值当前滚动高度，一遍下一次进行判断
    }
  },
  mounted(){
    this.pgIndex = 0;
    this.getTotalInfoFn();  //查询总计
    this.getIptInfo();  //查询列表
    this.box = this.$refs.detailsInfo;
    this.box.addEventListener('scroll', this.pageTrun)
  },
  filters: {
    dateFormat: Filters.formatDate.dateFormat,
    logTypeFil: Filters.logTypeFil
  }

}
</script>

<style lang="scss" >
html,body, #app{min-height: 100%;background: #fff;}
.myPearlWrap{background: #fff;min-height: 100%;
  .myPearlHead{background: url('~assets/img/pearlIsland/my_pra.png') no-repeat;background-size: 750px auto;padding: 22px 30px 80px 48px;
    .des{font-size: 24px;line-height: 34px;color: rgba(255,255,255, 0.5);}
    >h2{font-size: 64px;line-height: 90px;color: #fff;padding: 5px 0;}
    .yestdayNum{display: flex;line-height: 46px;
      .text{font-size: 24px;color: rgba(255,255,255, 0.5);transform: translateY(2px);}
      .num{font-size: 32px;color: #fff;padding: 0 0 0 4px;flex-grow: 1;}
      .rule{font-size: 26px;color: #fff;
        .icon{font-size: 36px;padding-right: 6px;transform: translateY(4px);display: inline-block;}
      }
    }
  }

  .myContent{margin-top: -52px;background: #fff;border-radius: 40px 40px 0 0;position: absolute;top:300px;bottom:0;left:0;right:0;
    .contentTop{background: #fff;padding: 40px 30px 30px 30px;border-radius: 40px 40px 0 0;}
    .pearlDes{font-size: 24px;color: #999;padding: 0 30px 40px 0;}
    h2{font-size: 32px;color: #333;line-height: 46px;padding-bottom: 6px;background: url('~assets/img/pearlIsland/pearls.png') no-repeat;
      background-size: 60px 50px;padding-left: 70px;
    }
    .scroll_list{overflow-y:auto;position: absolute;top:250px;bottom:0;left:0;right:0;padding-left: 20px;z-index: 100;

    }
    .listItem{color: #333;border-bottom: 1px solid #eee;padding: 30px 30px 0 10px;
      .top{display: flex;line-height: 50px;padding-bottom: 4px;
        .des{font-size: 30px;flex-grow: 1;}
        .num{font-size: 36px;font-weight: 500;}
      }
      .time{font-size: 24px;color: #aaa;line-height: 34px;padding-bottom: 20px;}
    }
    .noBorder{border-bottom: none;}
  }
  .info_null{text-align:center;padding-top:190px;
    img{width:256px;height:256px;}
    p{font-size:28px;line-height:40px;color:#666;text-align:center;}
  }

  .loading{position: absolute;top:50%;left:50%;width:130px;height:130px;background-color:rgba(0,0,0,0.6);border-radius:8px;text-align:center;padding-top:25px;margin-left:-65px;margin-top:0px;z-index: 100;
    img{width:80px;height:80px;}
  }
}
 
</style>
