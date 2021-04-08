<template>
  <div class="myEnergy">
    <div class="myPearlHead">
      <div class="des">持有创力总数</div>
      <h2 v-if="!totalObj.totalPower">0</h2>
      <h2 v-else>
        <ICountUp
          :startVal="0"
          :endVal="totalObj.totalPower"
          :end="totalObj.totalPower"
          :decimals="decimals"
          :duration="duration"
          :options="options"
        />
      </h2>
      <div class="yestdayNum">
        <div class="text">昨日获得总数</div>
        <div class="num">{{totalObj.yesterdayPower||0}}</div>
        <div class="rule" @click="dialogRule=true"><i class="icon iconfont icon-yiwen"></i>获得规则</div>
      </div>
      <!-- <div class="energyRule"><p @click="dialogRule=true"><i class="icon iconfont icon-yiwen"></i>获得规则</p></div> -->
    </div>
    <div class="myContent">
      <div class="contentTop">
        <div class="pearlDes">创力即创新能力的简称，代表生成珍珠的能力，本质是活跃度贡献证明，在珍珠岛上越活跃，获得的创力越高，每天生成的珍珠越多。 </div>
        <h2>获得记录</h2>
        <div class="scroll_list" ref="detailsInfo">
          <div ref="iptH">
            <div class="listItem" v-for="(item,index) in iptList" :key="index">
              <div class="top">
                <div class="des">{{item.logType | logTypePower}}</div>
                <div class="num">+{{item.power}}</div>
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
    <div class="dialog_rule" v-if="dialogRule">
      <div class="rules">
        <div class="move" @click="dialogRule=false"><img src="~assets/img/project/error.png" alt=""></div>
        <p class="title">获得规则</p>
        <p class="rules_info mt40"><span>①</span>日常登录行为，奖励20创力</p>
        <p class="rules_info mt10"><span>②</span>分享小程序任一页面给好友，分享内容每被点击一次，奖励10创力（同一用户每天点击只记录一次）</p>
      </div>
    </div>
  </div>
</template>
<script>
  import ICountUp from 'vue-countup-v2';
  const iptUrl = CONFIG.iptUrl;
  const StatisticsUrl = iptUrl + '/partner/b/iptPowerStatisticsInfo.htm';
  const iptPowerUrl = iptUrl + '/partner/b/iptPowerLogInfo.htm';
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
        dialogRule:false,
        // 数字缓动参数
        decimals: 0,
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
        this.$http.get(StatisticsUrl)
        .then( resp => {//接口为之前老接口，数据不匹配，测试使用
          this.totalObj = resp;
          console.log((resp))
        })
      },
      // 查询列表
      getIptInfo () {
        this.loading = true;
        this.$http.get(iptPowerUrl, {params: {pgIndex: this.pgIndex, pgCount:10}})
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
        console.log(1111)
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
      let self = this;
      this.pgIndex = 0;
      this.getTotalInfoFn();  //查询总计
      this.getIptInfo();  //查询列表
      this.box = this.$refs.detailsInfo;
      this.box.addEventListener('scroll', self.pageTrun)
      
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      logTypePower: Filters.logTypePower
    }
  }
</script>

<style lang="scss" >
html,body, #app{min-height: 100%;background: #fff;}
.myEnergy{background: #fff;min-height: 100%;
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
    .energyRule{line-height: 46px;font-size: 26px;color: #fff;text-align: right;
      p{display: inline-block;}
      .icon{font-size: 36px;padding-right: 6px;transform: translateY(4px);display: inline-block;}
    }
  }

  .myContent{margin-top: -52px;background: #fff;border-radius: 40px 40px 0 0;position: absolute;top:300px;bottom:0;left:0;right:0;
    .contentTop{background: #fff;padding: 40px 0 0 30px;border-radius: 40px 40px 0 0;}
    .pearlDes{font-size: 24px;color: #999;padding: 0 30px 40px 0;}
    h2{font-size: 32px;color: #333;line-height: 46px;padding-bottom: 6px;background: url('~assets/img/pearlIsland/administer.png') no-repeat;
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
  .dialog_rule{position: absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index: 100;
    .rules{width:580px;height:360px;position: absolute;top:40%;left:50%;margin-left:-290px;background-color:#fff;border-radius:8px;padding:30px 50px 55px;
      .move{position: absolute;width:60px;height:60px;padding:15px;top:0;right:10px;
        img{width:30px;height:30px;}
      }
      .title{font-size:36px;line-height:50px;text-align:center;font-weight:bold;color:#333;}
      .rules_info{font-size:28px;color:#333;line-height:40px;
        span{font-size:32px;}
      }
    }
  }

  .loading{position: absolute;top:50%;left:50%;width:130px;height:130px;background-color:rgba(0,0,0,0.6);border-radius:8px;text-align:center;padding-top:25px;margin-left:-65px;margin-top:0px;z-index: 100;
    img{width:80px;height:80px;}
  }
  .info_null{text-align:center;padding-top:190px;
    img{width:256px;height:256px;}
    p{font-size:28px;line-height:40px;color:#666;text-align:center;}
  }
}
 
</style>

