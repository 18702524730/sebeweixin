<template>
  <div class="information_lists">
    <div class="informations" v-for="item in informationLists">
      <p class="informations_title">{{item.title}}</p>
      <p class="informations_info mt20">{{item.content}}</p>
      <div class="mt35">
        <p class="time">{{item.createTime | format}}</p>
        <a v-if="item.jumpUrl" :href="item.jumpUrl" target="_blank"><span class="txt">立即查看</span><img src="~assets/img/pearlIsland/toNext.png" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script>
  const indexUrl = CONFIG.indexUrl;
  const findMarketingContentList = indexUrl + '/partner/homepage/category.htm';
  import Filters from 'src/utils/filters.js';
  export default {
    data () {
      return {
        informationLists:[]
      }
    },
    methods:{
      informationSearch(){
        this.$http.get(findMarketingContentList+'?category=8')
        .then( resp => {
          console.log(resp)
          this.informationLists = resp.list;
        })
      }
    },
    mounted(){
      this.informationSearch();
    },
    filters:{
      format: Filters.formatDate.formatPreal,
      phoneStr(number){
        let phone = number.substr(0, 3) + '****' + number.substr(7); 
        return phone;
      }
    }
  }
</script>

<style lang="scss" >
html,body, #app{min-height: 100%;background: #0C083F;}
.information_lists{background: #0C083F;min-height: 100%;padding-top:38px;padding-bottom:40px;
  .informations{padding:35px 30px;background-color:#fff;border-radius:8px;width:702px;margin:0 auto 20px;
    .informations_title{font-size:32px;color:#333;line-height:45px;font-weight:600;}
    .informations_info{font-size:24px;line-height:42px;color:#666;}
    div{display:flex;flex-direction: row;align-items: center;justify-content: space-between;
      .time{font-size:24px;color:#999;line-height:33px;}
      a{display:flex;font-size:24px;flex-direction: row;align-items: center;
        .txt{color:#2ABEA4;vertical-align: middle;line-height:33px;}
        span{color:#999;vertical-align: middle;line-height:30px;}
        img{width:13px;height:20px;vertical-align: middle;margin-left:12px;margin-top: -1px;}
      }
    }
  }
}
 
</style>
