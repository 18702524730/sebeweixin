<template>
  <div class="my_IPT_page">
    <div class="ipt_head ">
      <div class="num_item">
        <p class="num">{{ totalObj.totalScore }}</p>
        <p class="text">持有总量</p>
      </div>
      <div class="num_item">
        <p class="num b_num">{{ totalObj.todayScore }}</p>
        <p class="text">今日获得</p>
      </div>
      <div class="detail">
        <img src="~assets/img/otherPage/zhenzhu.png" alt="">
        <span class="text">了解珍珠 <i class="fa fa-angle-right" aria-hidden="true"></i></span>
      </div>
    </div>

    <div class="line_wrap">
      <div class="list_title">
        <span class="text">获得明细</span>
        <span class="rule"><i class="icon iconfont icon-yiwen"></i><span class="txt">获得规则</span></span>
      </div>
      <div class="item_box" v-for="item in iptList" >
        <div class="line_item">
          <div class="lef">
            <p class="title">{{ item.logType | logTypeFil }}</p>
            <p class="date">{{ item.createDate | dateFormat }}</p>
          </div>
          <div class="rig" @click="toggleFn(item)">
            <!-- :class="{'num_b': !item.showState}" -->
            <span class="num num_b" >+{{ item.score }}
              <!-- <i class="fa fa-caret-down" :class="{'fa-caret-up': item.showState}" aria-hidden="true"></i> -->
            </span>
          </div>
        </div>
        <!-- <div class="tips_box" v-show="item.showState">
          *此条数据将存储于知金链，正在等待上链确认…
        </div> -->
      </div>
      
    </div>



    
  </div>
</template>

<script>
  const indexUrl = CONFIG.indexUrl; 
  const iptStatisticsInfoUrl = indexUrl + '/partner/b/iptStatisticsInfo.htm';
  const iptInfoUrl = indexUrl + '/partner/b/iptLogInfo.htm';
  import Filters from 'src/utils/filters.js';

  export default {
    data () {
      return {
        iptList: [
          {incomeType: '服务提成', showTime:'', incomeAmount:10.00, showState:true},
          {incomeType: '服务提成', showTime:'', incomeAmount: 121.11 }
        ],
        activeIndex: 0,
        marginLeft: 15,
        show: false,
        totalObj: {},  //总数
      }
    },
    methods: {
      toggleFn (item) {//样式修改，暂时用不上
        this.iptList.forEach( info => {
          info.showState = false;
        })
        item.showState = true;
      },
      // 查询总量信息
      getTotalInfoFn () {
        this.$http.get(iptStatisticsInfoUrl)
        .then( resp => {
          this.totalObj = resp;
        })
      },
      // 查询列表
      getIptInfo () {
        this.$http.get(iptInfoUrl, {params: {pgIndex: 0, pgCount:10}})
        .then( resp => {
          this.iptList = resp.elements;
        })
      }
    },
    mounted () {
      this.getTotalInfoFn();  //查询总计
      this.getIptInfo();  //查询列表
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      logTypeFil: Filters.logTypeFil
    }
  }
</script>

<style lang='scss'>
  .my_IPT_page {
    width: 100%; height: 100%; background: #f8f8f8;
    .ipt_head {
      display: flex; justify-content: space-between; align-items: center; padding-left: 50px; padding-top: 70px; padding-bottom: 76px; background: #fff;
      .num_item {
        min-width: 120px; height: 100%; float: left;
        .num {font-size: 46px; color: #333; font-weight: bold; width: 100%; text-align: center;}
        .b_num {color: #2F80F6;}
        .text {font-size: 30px; color: #bbb; width: 100%; text-align: center;}
      }
      .detail {
        width: 210px; height: 70px; line-height: 60px; background: linear-gradient(90deg,rgba(92,183,251,1) 0%,rgba(47,128,246,1) 100%); box-shadow:0px 2px 16px 0px rgba(184,213,255,1); border-radius:35px; margin-right: 20px; text-align: center;
        img {width: 40px; height: 40px; vertical-align: middle;}
        .text {color: #fff; font-size: 26px; vertical-align: middle;}
      }
    }
    .line_wrap {
       width:100%; height: auto; background-color: #fff; margin-top: 20px; 
      .list_title {
        display: flex; justify-content: space-between; align-items: center; height: 100px; line-height: 100px; margin: 0 20px; border-bottom: 1px solid #eee;
        .text {width: 148px; color: #333; font-size: 32px; border-bottom: 4px solid #2F80F6; font-weight: bold; text-align: center; line-height: 96px;}
        .rule {
          height: 100px; line-height: 100px;
          .txt {color: #999; font-size: 26px; vertical-align: middle; display: inline-block;}
          .iconfont {font-size: 40px; margin-right: 10px; color: #979797; vertical-align: middle;}
        }
      }
      .item_box{
        width: 100%; height: auto; border-bottom: 1px solid #eee;
        .line_item {
          margin-left: 20px; padding: 30px 0; display: flex; justify-content: space-between; align-items:center; border-bottom: 1px solid #eee;
          .lef {
            font-size: 30px; color: #333; text-align: left;
            .green {color: #09BB07;}
            .red {color: #F64744;}
            .title {font-size: 32px; color: #333; line-height: 32px;}
            .t_green {color: #3BAE40;}
            .t_red {color: #E43D3A;}
            .date {font-size: 24px; line-height: 32px; color: #aaa; margin-top: 16px; }
          }
          .more {width: 20px; height: 20px; margin-right: 20px;}
          .center {
            height: 84px;
            .img {width: 110px; height: 84px;}
          }
          .rig {
            text-align: right; margin-right: 20px; color: #999; min-width: 130px; text-align: right;
            .more {margin-right: 0; margin-left: 30px;}
            .num {
              color: #333; font-size: 36px; font-weight: 500; font-weight: bold;
              .fa { margin-left: 16px; }
            }
            .num_b {color: #2F80F6;} 
            .num_black {color: #333;}
            .statu {color: #aaa; font-size: 24px;}
          }
          &:last-child {border-bottom: none;}
        }
        .tips_box {
          padding-left: 20px; height: 90px; line-height: 90px; background: #f8f8f8; color: #999; font-size: 26px; text-align: left; position: relative; top:-2px;
          &:after {position: absolute; top:-46px; left: 88px; content: ''; width: 0; height: 0; border: 24px solid transparent; border-top-width: 24px; border-bottom-width: 24px; border-bottom-color: #f8f8f8; }
        }
      }
      
    }   
  }
</style>
