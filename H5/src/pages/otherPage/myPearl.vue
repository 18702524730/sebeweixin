<template>
  <div class="my_pearl">
    <div class="know_pearl" @click="toPearlIsland"><img src="~assets/img/pearlIsland/minPearl.png" alt=""><p>了解珍珠<img class="ml5" src="~assets/img/pearlIsland/toOld.png" alt=""></p></div>
    <div class="pearl_image">
      <img src="~assets/img/pearlIsland/conch.png" class="conch" alt="">
      <img src="~assets/img/pearlIsland/pearl.png" class="pearl" alt="">
      <img class="bubble_img bubble01" src="~assets/img/pearlIsland/bubble.png">
      <img class="bubble_img bubble02" src="~assets/img/pearlIsland/bubble.png">
      <img class="bubble_img bubble03" src="~assets/img/pearlIsland/bubble.png">
      <img class="bubble_img bubble04" src="~assets/img/pearlIsland/bubble.png">
      <img class="bubble_img bubble05" src="~assets/img/pearlIsland/bubble.png">
      <img class="bubble_img bubble06" src="~assets/img/pearlIsland/bubble.png">
      <img class="bubble_img bubble07" src="~assets/img/pearlIsland/bubble.png">
      <img class="bubble_img bubble08" src="~assets/img/pearlIsland/bubble.png">
    </div>

    <div class="number_pearl">
      <div>
        <p>{{totalObj.totalScore}}</p>
        <div>
          <p><img src="~assets/img/pearlIsland/pearls.png" alt="">持有总量</p>
        </div>
      </div>
      <div>
        <p>{{ totalObj.todayScore }}</p>
        <div>
          <p><img src="~assets/img/pearlIsland/pearls.png" alt="">今日获得</p>
        </div>
      </div>
    </div>
    <div class="details_title ml20 mr20 mt30">
      <p class="title">获得明细</p>
      <p class="reg" @click="toReg"><img class="reg_img mr10" src="~assets/img/pearlIsland/prom.png" alt="">获得规则</p>
    </div>

    <div class="details" ref="detailsInfo">
      <div class="page_list" ref="iptH">
        <div class="info_list" v-for="item in iptList">
          <div class="lists">
            <div class="list_l ml20 mr20">
              <p class="name">{{ item.logType | logTypeFil }}</p>
              <p class="times">{{ item.createDate | dateFormat }}</p>
            </div>
            <p class="mr40"><img class="mr10" src="~assets/img/pearlIsland/debris.png" alt="">+{{ item.score }}</p>
          </div>
        </div>
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
        totalObj:{},
        iptList:{},
        box:'',
        total:0,
        pgIndex:0
      }
    },
    methods: {
      toPearlIsland(){//我的珍珠
        this.$router.push('/pearlIsland');
      },
      toReg(){//规则页面
        this.$router.push('/IPTregulation');
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
        let self = this;
        this.$http.get(iptInfoUrl, {params: {pgIndex: this.pgIndex, pgCount:10}})
        .then( resp => {
          this.total = resp.totalElements;
          if(this.pgIndex == 0){
            this.iptList = resp.elements;
          }else{
            resp.elements.forEach((item)=>{
              self.iptList.push(item);
            })
          }
        })
      },
      pageTrun(){//上拉加载，下拉刷新
        let self = this;
        let iptH = self.$refs.iptH.offsetHeight;//列表高度
        let scrollTop = self.$refs.detailsInfo.scrollTop;//滚动高度
        let clientHeight = self.$refs.detailsInfo.clientHeight;//滚动部分屏幕高度
        if((clientHeight + scrollTop) >= (iptH - 20)){//距离底部20像素就翻页
          if(this.total/10 > this.pgIndex){//是否最后一页
            this.pgIndex += 1;
            this.getIptInfo();
          }
        }
        console.log(" scroll " + self.$refs.detailsInfo.scrollTop,self.$refs.detailsInfo.clientHeight,self.$refs.iptH.offsetHeight)
      }
    },
    mounted () {
      this.pgIndex = 0;
      this.getTotalInfoFn();  //查询总计
      this.getIptInfo();  //查询列表
      this.box = this.$refs.detailsInfo;
      this.$cookie.set('btnBol',this.$route.query.btnBol);
      console.log(this.$route);
      this.box.addEventListener('scroll', this.pageTrun, true);
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      logTypeFil: Filters.logTypeFil
    }
  }
</script>

<style lang='scss'>
@import  "~assets/css/adaptation.scss";
body,html,#app{height:100%;width:100%;position: relative;}
.my_pearl{
    background:url(~assets/img/pearlIsland/bgi.png),url(~assets/img/pearlIsland/bgi-hover.png);
    background-color:#180647;
    background-position:center;
    background-repeat:no-repeat;
    background-blend-mode: lighten;

    height:100%;width:100%;
  .know_pearl{z-index:100;position: absolute;top:63px;right:10px;width:210px;height:70px;border:1px solid #EEEBE5;border-radius:35px;vertical-align: middle;font-size:0;
    >img{width:84px;height:85px;vertical-align: middle;margin-top:-18px;}
    p{font-size:26px;color:#F1EEEC;margin-left:-10px;display:inline-block;line-height:68px;
      >img{width:9px;height:13px;margin-top:-6px;vertical-align: middle;}
    }
  }
  .pearl_image{
    .conch{width:100%;height:652px;margin-top:120px;opacity:1;animation: conchAnimation 3s infinite ease-in-out;}
    .pearl{position: absolute;width:482px;height:488px;top:224px;left:50%;margin-left: -241px;animation: pearlAnimationMy 16s infinite ease-in-out;z-index: 20;}
    .bubble_img{position: absolute;z-index: 1;}
    .bubble01{width:15px;height:15px;top:600px;left:200px;animation: bubble01Animation 3s infinite ease-in;}
    .bubble02{width:10px;height:10px;top:600px;left:375px;animation: bubble02Animation 4s infinite linear;}
    .bubble03{width:10px;height:10px;top:600px;left:250px;animation: bubble03Animation 6s infinite ease-in;}
    .bubble04{width:10px;height:10px;top:600px;left:500px;animation: bubble04Animation 8s infinite ease-in;}
    .bubble05{width:10px;height:10px;top:610px;left:400px;animation: bubble05Animation 3s infinite ease-in;}
    .bubble06{width:10px;height:10px;top:600px;left:530px;animation: bubble06Animation 4s infinite ease-in;}
    .bubble07{width:10px;height:10px;top:610px;left:300px;animation: bubble07Animation 3s infinite ease-in;}
    .bubble08{width:10px;height:10px;top:610px;left:480px;animation: bubble08Animation 3s infinite ease-in;z-index: 25;}
    // @keyframes pearlAnimationMy{
    //   0%{top: 224px;opacity: 0.8;}
    //   50%{top: 144px;opacity: 1;}
    //   100%{top: 224px;opacity: 0.8;}
    // } 
    @keyframes pearlAnimationMy{
      0%{transform: translateY(10px);opacity: 0.8;}
      50%{transform: translateY(-90px);opacity: 1;}
      100%{transform: translateY(10px);opacity: 0.8;}
    }
    @keyframes conchAnimation{
      0%{opacity: 0.85;}
      50%{opacity: 1;}
      100%{opacity: 0.85;}
    }
    @keyframes bubble01Animation{
      0%{top: 580px;opacity: 1;width:10px;height:10px;}
      100%{top: 280px;opacity: 0;left:180px}
    }
    @keyframes bubble02Animation{
      0%{top: 600px;opacity: 1;width:10px;height:10px;}
      50%{top: 350px;opacity: 0;width:20px;height:20px;}
      100%{top: 350px;opacity: 0;width:0px;height:0px;}
    }
    @keyframes bubble03Animation{
      0%{top: 600px;opacity: 1;width:10px;height:10px;}
      25%{top: 280px;opacity: 0;width:20px;height:20px;}
      100%{top: 280px;opacity: 0;width:0px;height:0px;}
    }
    @keyframes bubble04Animation{
      0%{top: 600px;opacity: 1;width:10px;height:10px;}
      25%{top: 280px;opacity: 0;width:15px;height:15px;}
      100%{top: 280px;opacity: 0;width:0px;height:0px;}
    }
    @keyframes bubble05Animation{
      0%{top: 610px;opacity: 1;width:10px;height:10px;}
      100%{top: 280px;opacity: 0;left:420px}
    }
    @keyframes bubble06Animation{
      0%{top: 600px;opacity: 1;width:10px;height:10px;}
      50%{top: 280px;opacity: 0;left:600px;width:15px;height:15px;}
      100%{top: 280px;opacity: 0;left:600px;width:0px;height:0px;}
    }
    @keyframes bubble07Animation{
      0%{top: 610px;opacity: 1;width:10px;height:10px;}
      50%{top: 280px;opacity: 0;left:300px;width:15px;height:15px;}
      100%{top: 280px;opacity: 0;left:300px;width:0px;height:0px;}
    }
    @keyframes bubble08Animation{
      0%{top: 610px;opacity: 1;width:10px;height:10px;}
      50%{top: 280px;opacity: 0;width:15px;height:15px;}
      100%{top: 280px;opacity: 0;width:0px;height:0px;}
    }
  }

  .number_pearl{display:flex;padding:0 160px;flex-direction: row;align-items: center;justify-content: space-between;margin-top:-50px;
    >div{width:200px;
      >p{line-height:65px;font-size:46px;color:#fff;text-align:center;}
      >div{
        p{color:#bbb;line-height:42px;vertical-align: middle;text-align:center;
          img{width:51px;height:44px;vertical-align: middle;}
        }
      }
    }
  }

  
  .details_title{border-bottom:1px solid #282848;position: relative;
    .title{color:#fff;padding-bottom:20px;border-bottom:4px solid #282848;width:146px;line-height:45px;font-size:32px;}
    .reg{color:#999;line-height:37px;font-size:26px;position: absolute;right:20px;top:10px;
      .reg_img{width:32px;height:32px;vertical-align: middle;margin-top:-5px;}
      span{display:inline-block;border-radius:30px;height:30px;width:30px;border:1px solid #979797;text-align:center;line-height:28px;font-size:22px;}
    }
  }

  .details{position: absolute;width:100%;top:945px;left:0;right:0;bottom:0;overflow-y:auto;
    .info_list{padding-top:30px;
      .lists{display:flex;flex-direction: row;align-items: center;justify-content: space-between;border-bottom:1px solid #282848;padding-bottom:20px;
        >p{color:#fff;font-size:36px;margin-top:-20px;
          img{width:22px;height:20px;}
        }
        .list_l{color:#fff;font-size:28px;line-height:40px;
          .name{font-size:28px;line-height:40px;color:#fff;}
          .times{margin-top:12px;font-size:26px;color:#aaa;}
        }
      }
    }
  }
}
</style>
