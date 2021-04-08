<template>
  <div class="find_preal">
    <div class="head_image">
      <div class="images_data image_l" @click="toStrategy">
        <p class="image_tit">岛民攻略</p>
        <p class="image_info">做任务获得更多珍珠</p>
      </div>
      <div class="images_data image_r ml30" @click="prealShop">
        <p class="image_tit">珍珠商城</p>
        <p class="image_info">兑换精美礼品</p>
        <!-- <img src="~assets/img/pearlIsland/titHot.png" alt=""> -->
      </div>
    </div>
    <div class="top">
      <p class="top_tit">排行榜</p>
      <div class="top_tab mt25">
        <p :class="{'check_tab':prealEnergy}" @click="prealEnergy = true,prealEnergyChange()">珍珠持有量TOP20</p>
        <p :class="{'check_tab':!prealEnergy}" @click="prealEnergy = false,prealEnergyChange()">创力持有量TOP20</p>
      </div>
    </div>
    <div class="lists">
      <div class="list_information information_botm" v-for="(item,$index) in prealEnergyLists">
        <div class="information">
          <img v-if="$index == 0" src="~assets/img/pearlIsland/one.png" alt="">
          <img v-if="$index == 1" src="~assets/img/pearlIsland/two.png" alt="">
          <img v-if="$index == 2" src="~assets/img/pearlIsland/threen.png" alt="">
          <p v-if="$index > 2">{{$index+1}}</p>
          <div class="ml35">
            <img :src="item.memberAvatar" alt="">
            <div class="ml15">
              <p class="name">{{item.memberTruename}}</p>
              <p class="phone mt5">{{item.memberPhone|phoneStr}}</p>
            </div>
          </div>
        </div>
        <p class="number">{{prealEnergy?(item.score.toFixed(4)):item.power}}</p>
      </div>
    </div>
    <div class="footer_dialog" v-if="footerDialog">
      <div class="dialog_info">
        <p class="info" v-if="!listBol">很遗憾你未上榜单，继续加油哦。来做岛民任务吧</p>
        <p class="info" v-if="listBol">恭喜上榜！继续保持哦，来做岛民任务吧</p>
        <p class="info_btn" @click="toStrategy">领取珍珠</p>
      </div>
    </div>
    <!-- 底部tab -->
    <div class="tab_footer" :class="{'tab_footer_max':iosX}">
      <div @click="toPearl">
        <img src="~assets/img/pearlIsland/island.png" alt="">
        <p>珍珠岛</p>
      </div>
      <div>
        <img src="~assets/img/pearlIsland/find_click.png" alt="">
        <p class="tab_check">发现</p>
      </div>
      <div @click="toMy">
        <img src="~assets/img/pearlIsland/my.png" alt="">
        <p>我的</p>
      </div>
    </div>
    <p class="prealShop" v-if="prealShopBol">珍珠商城即将上线，敬请期待</p>
    <div class="loading" v-if="loading">
      <img src="~assets/img/pearlIsland/pearl_load.gif" alt="">
    </div>
  </div>
</template>

<script>
  const iptUrl = CONFIG.iptUrl;
  const pearlIslandRankUrl = iptUrl + '/partner/b/pearlIslandRank.htm';

  export default {
    data () {
      return {
        loading:false,
        topList:{},
        prealEnergy:true,
        prealEnergyLists:[],
        scroll: '',
        oldTop:'',
        listBol:false,
        footerDialog:false,
        firstDialog:false,
        prealShopBol:false,
        iosX:false,
      }
    },
    methods:{
      prealShop(){
        let self = this;
        // this.prealShopBol = true;
        // setTimeout((data)=>{
        //   self.prealShopBol = false;
        // },3000)
        this.loading = true;
        this.$http.get(iptUrl+'/duiba/autoLoginUrl.htm?uid='+this.$cookie.get('member_id'))
        .then(resp =>{
          console.log(resp)
          this.loading = false;
          window.location.href = resp;
        })
        .catch(err =>{
          this.loading = false;
        })
      },
      toStrategy(){//岛民攻略
        this.$router.push('/strategyIsland')
      },
      toPearl(){//我的珍珠
        this.$router.replace('/myPearlIsland?btnBol='+this.$cookie.get('btnBol')+'&isHaveStore='+this.$cookie.get('isHaveStore')+'&member_id='+this.$cookie.get('member_id'));
      },
      toMy(){//我的
        this.$router.push('/my')
      },
      prealEnergyChange(){//珍珠创立切换
        let merberId = this.$cookie.get('member_id');
        let self = this;
        this.loading = true;
        if(this.prealEnergy){
          this.prealEnergyLists = this.topList.iptRank;
          this.loading = false;
          for(let i in self.prealEnergyLists){
            if(self.prealEnergyLists[i].memberId == merberId){//是否在榜单里面
              self.listBol = true;
              return;
            }
          }
          self.listBol = false;
        }else{
          this.prealEnergyLists = this.topList.iptPowerRank;
          this.loading = false;
          for(let i in self.prealEnergyLists){
            if(self.prealEnergyLists[i].memberId == merberId){//是否在榜单里面
              self.listBol = true;
              return;
            }
          }
          self.listBol = false;
        }
      },
      topLists(){//获取列表
        let self = this;
        this.loading = true;
        this.$http.get(pearlIslandRankUrl)
        .then(resp=>{
          self.topList = resp;
          this.loading = false;
          self.prealEnergyChange();
        })
        .catch(err=>{
          this.loading = false;
        })
      },
      menu() {//翻页
        let self = this;
        this.scroll = document.body.scrollTop || document.documentElement.scrollTop;
        if(this.oldTop < this.scroll){//向下滚动可以翻页
          if(!sessionStorage.getItem('loginBol')){
            return;
          }
          if(self.scroll > 155 && !self.firstDialog){//滚动到顶部
            self.footerDialog = true;
            self.firstDialog = true;
            setTimeout((data)=>{
              self.footerDialog = false;
            },4000)
          }
        }
        this.oldTop = this.scroll;//赋值当前滚动高度，一遍下一次进行判断
      }
    },
    mounted(){
      let self = this;
      this.screen = window.screen.height;
      if (this.screen >= 780){//适配大屏幕手机，主要是iphoneX
        self.iosX = true;
      }else{
        self.iosX = false;
      }
      this.topLists();
      window.addEventListener('scroll', this.menu);
    },
    filters:{
      phoneStr(number){
        let phone = number.substr(0, 3) + '****' + number.substr(7); 
        return phone;
      }
    }
  }
</script>

<style lang="scss" >
@import  "~assets/css/pearl.scss";
html,body, #app{min-height: 100%;background: #0C083F;}
.find_preal{background: #0C083F;min-height: 100%;padding-bottom:97px;
  .head_image{display:flex;padding:50px 20px 0;
    .image_l{background:url(~assets/img/pearlIsland/strategyHeard.png) no-repeat;}
    .image_r{background:url(~assets/img/pearlIsland/prealMarket.png) no-repeat;}
    .images_data{width:340px;height:137px;background-position:center;background-size:100%;padding:30px 25px;position: relative;
      p{color:#fff;text-align:left;}
      .image_tit{font-size:32px;font-weight:500;line-height:45px;}
      .image_info{font-size:20px;font-weight:400;line-height:28px;margin-top:4px;}
      img{width:137px;height:37px;position: absolute;right:0;top:-18px;}
    }
  }
  .top{margin-top:40px;
    .top_tit{font-size:36px;font-weight:500;color:#fff;margin-left: 37px;}
    .top_tab{height:80px;width:100%;display:flex;border-radius:40px 40px 0px 0px;background:rgba(76,77,123,1);
      p{text-align:center;line-height:80px;width:50%;color:#7C7DA0;font-weight:500;font-size:28px;}
      .check_tab{color:#fff;position: relative;
        &::after{content:'';width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-bottom: 10px solid #fff;position: absolute;bottom:0;left:50%;margin-left:-10px;}
      }
    }
  }
  .lists{background-color:#fff;width:100%;margin-bottom: 40px;
    .list_information{width:702px;height:148px;margin-left:48px;display:flex;flex-direction: row;align-items: center;justify-content: space-between;
      .information{display:flex;flex-direction: row;align-items: center;justify-content: flex-start;
        img{width:38px;height:65px;}
        >p{font-size:36px;color:#333;font-weight:600;width:38px;text-align:center;}
        >div{display:flex;flex-direction: row;align-items: center;justify-content: flex-start;
          img{width:74px;height:74px;border-radius:100%;}
          div{
            .name{font-size:28px;color:#333;line-height:40px;font-weight:500;width:250px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
            .phone{font-size:24px;color:#999;line-height:33px;}
          }
        }
      }
      .number{font-size:32px;line-height:45px;color:#333;margin-right: 50px;}
    }
    .information_botm{border-bottom:1px solid #f1f1f1;}
  }
  .footer_dialog{position: fixed;bottom:140px;left:50%;margin-left: -278px;width:556px;height:97px;background:rgba(0,0,0,0.73);border-radius:9px;padding:18px 30px;animation: footerAnimation 0.2s ease-in forwards;
    .dialog_info{display:flex;
      .info{width:330px;height:60px;line-height:30px;font-size:22px;color:#fff;margin-right:50px;}
      .info_btn{width:124px;height:46px;background:#78D9CA;color:#2f2f2f;font-size:22px;line-height:46px;text-align:center;border-radius:9px;}
    }
  }
  @keyframes footerAnimation{
    0%{bottom:-100px;}
    100%{bottom:140px;}
  }


  .prealShop{width:340px;height:92px;background:rgba(0,0,0,1);opacity:0.7302;border-radius:8px;line-height:92px;text-align:center;font-size:22px;color:#fff;position: fixed;top:50%;left:50%;margin-top: -46px;margin-left:-170px;}

  .loading{position: absolute;top:50%;left:50%;width:130px;height:130px;background-color:rgba(0,0,0,0.6);border-radius:8px;text-align:center;padding-top:25px;margin-left:-65px;margin-top:-250px;z-index: 100;
    img{width:80px;height:80px;}
  }
}
 
</style>
