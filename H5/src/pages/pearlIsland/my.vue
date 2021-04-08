<template>
  <div class="myWrap">
    <div class="myHead">
      <div class="avatar" style="">
        <img v-if="!trueimg" src="~assets/img/pearlIsland/portrait.png" alt="">
        <img v-else :src="trueimg" alt="">
      </div>
      
      <div class="userInfo">
        <div class="userName">
          <p>{{truename || 'asdsas'}}</p>
          <span class="mt10">珍珠岛民</span>
        </div>
        <div class="userPhone">{{phone}}</div>
      </div>
    </div>
    <div class="myContent">
      <div class="contentTop">
        <h2>我的资产</h2>
        <div class="infoItem" @click="$router.push('/myPearlNum')">
          <div class="name">珍珠</div>
          <div class="num">{{totalScore.toFixed(4)}}</div>
          <i class="icon iconfont icon-jiantou"></i>
        </div>
        <div class="infoItem noBorder" @click="$router.push('/myEnergy')">
          <div class="name">创力</div>
          <div class="num">{{totalPower}}</div>
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div>
      <!-- <div class="contentBot" style="padding-bottom:0;">
        <div class="infoItem noBorder" @click="$router.push('/myExchange')">
          <div class="name">我的兑换</div>
          <div class="num"></div>
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div> -->
      <div class="contentBot">
        <div class="infoItem" @click="toPearlIsland">
          <div class="name">创新珍珠</div>
          <div class="num"></div>
          <i class="icon iconfont icon-jiantou"></i>
        </div>
        <img @click="toPearlIsland" class="botImg" src="~assets/img/pearlIsland/myBottomPic.png" alt="">
      </div>
    </div>
    <!-- 底部tab -->
    <div class="tab_footer" :class="{'tab_footer_max':iosX}">
      <div @click="toPearl">
        <img src="~assets/img/pearlIsland/island.png" alt="">
        <p>珍珠岛</p>
      </div>
      <div @click="toFind">
        <img src="~assets/img/pearlIsland/find.png" alt="">
        <p>发现</p>
      </div>
      <div>
        <img src="~assets/img/pearlIsland/my_click.png" alt="">
        <p class="tab_check">我的</p>
      </div>
    </div>
  </div>
</template>

<script>
  const iptUrl = CONFIG.iptUrl;
  const iptProfileUrl = iptUrl + '/partner/b/iptStatisticsInfo.htm';
  const StatisticsUrl = iptUrl + '/partner/b/iptPowerStatisticsInfo.htm';

export default {
  data () {
    return {
      iosX:false,
      trueimg:'',
      truename:'',
      phone:'',

      totalScore:0,//珍珠数量
      totalPower:0,//创力
    }
  },
  methods:{
    getTotalInfoFn () {// 查询ipt总量信息
      this.$http.get(iptProfileUrl)
      .then( resp => {
        this.totalScore = resp.totalScore;
      })
    },
    totalPowerInfoFn () {// 查询创力总量信息
      this.$http.get(StatisticsUrl)
      .then( resp => {
        this.totalPower = resp.totalPower;
      })
    },
    toPearl(){//我的珍珠
      this.$router.replace('/myPearlIsland?btnBol='+this.$cookie.get('btnBol')+'&isHaveStore='+this.$cookie.get('isHaveStore')+'&member_id='+this.$cookie.get('member_id'));
    },
    toPearlIsland(){//珍珠介绍页
      this.$router.push('/pearlIsland');
    },
      toFind(){//跳转发现页面
        this.$router.push('/pearlFind')
      },
  },
  mounted(){
    let self = this;
    this.screen = window.screen.height;
    if (this.screen >= 780){//适配大屏幕手机
      self.iosX = true;
    }else{
      self.iosX = false;
    }
    this.getTotalInfoFn();  //查询总计
    this.totalPowerInfoFn();
    let phone = sessionStorage.getItem('phone');
    this.phone = phone.substr(0, 3) + '****' + phone.substr(7); 
    this.truename = sessionStorage.getItem('truename');
    this.trueimg = sessionStorage.getItem('avatar');
  },
}
</script>

<style lang="scss" >
@import  "~assets/css/pearl.scss";
html,body, #app{min-height: 100%;background: #fff;}
.myWrap{background: #fff;min-height: 100%;
  .myHead{display: flex;padding: 60px 30px 154px;font-size: 0;background: url('~assets/img/pearlIsland/my_bgi.png') no-repeat;background-size: 750px auto;
    >.avatar{width: 150px;height: 150px;border-radius: 75px;background-position: center center;
      img{width: 150px;height: 150px;border-radius:100%;}
    }
    .userInfo{flex-grow: 1;padding-left: 40px;
      .userName{padding-top: 28px;
        p{font-size: 32px;line-height: 46px;color: #fff;display: inline-block;padding-right: 8px;max-width:200px;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;vertical-align: top;}
        span{font-size: 20px;line-height: 34px;color: #fff;display: inline-block;width: 120px;height: 34px;border-radius: 17px;text-align: center;
        background: linear-gradient(to right,#1e13af, #99ffc4);transform: translateY(-4px);}
      }
      .userPhone{font-size: 28px;color: #a1a2cb;line-height: 40px;padding-top: 4px;}
    }
  }
  .myContent{margin-top: -52px;background: #f4f4f4;border-radius: 40px 40px 0 0;
    .contentTop{background: #fff;padding: 44px 0 0 30px;border-radius: 40px 40px 0 0;}
    h2{font-size: 32px;color: #333;line-height: 46px;padding-bottom: 34px;}
    .infoItem{display: flex;font-size: 28px;line-height: 90px;padding-right: 30px;color: #333;border-bottom: 1px solid #eee;
      .name{width: 150px;}
      .num{flex-grow: 1;text-align: right;padding-right: 20px;}
      .iconfont{color: #ddd;}
    }
    .noBorder{border-bottom: none;}
    .contentBot{margin-top: 20px;background: #fff;padding-left: 30px;padding-bottom: 100px;
      .botImg{width: 690px;padding: 30px 0 30px 0;}
    }
  }
}
 
</style>
