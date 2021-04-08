<template>
<div class="manage_progress">
  <div class="manage_info row-start">
    <img :src="manageInfo.servicePicture" alt="">
    <div class="ml30">
      <p class="name">{{manageInfo.serviceName}}</p>
      <p class="mt15 money"><span>￥</span>{{payMoney}}</p>
    </div>
  </div>
  <div class="info_progress">
    <div class="mt15" v-for="(item,$index) in progressList" :key="$index" :class="{'progress':$index == 0}">
      <p class="mr20 timer">{{item.createTime}}</p>
      <div class="mid">
        <img src="~assets/img/order/new.png" alt="">
      </div>
      <div class="ml25 data_img">
        <p>{{item.feedbackState}}</p>
        <div class="mt5" :class="{'after_border':$index != progressList.length-1}">
          <p class="note">{{item.memo || ''}}</p>
          <p class="file mt5" v-if="item.url" @click="lookFile(item.url)">查看官文</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import Filters from '../../utils/filters.js'
  export default{
  data(){
    return{
      progressList:[],
      orderId:'',
      manageInfo:{}
    }
  },
  methods: {
    async search(){//初始化
      let data = {
        orderId:this.orderId,
        userType:2
      }
      try {
        let resp = await this.API.order.findFeedbackList(data);
        this.progressList = resp;
        this.progressList.forEach((item)=>{
          item.createTime = Filters.filters.dateFormat(item.createTime);//时间格式转换
          console.log(item.createTime )
        })
        console.log(resp)
      }
      catch (e) {
      }
    },
    async lookFile(url){
      console.log(url)
      var imgArr = url.split('.');
      if (imgArr[imgArr.length-1] === 'pdf') {
        url = await this.API.order.preview({pdf_url: url})
        wx.previewImage({
          urls: url.urls // 需要预览的图片http链接列表
        })
      } else {
        wx.previewImage({
          urls: [url] // 需要预览的图片http链接列表
        })
      }
    }
  },
  mounted(){
    this.orderId = this.$root.$mp.query.orderId || 353953;
    this.manageInfo = this.$storage.get('manageInfo') || {};
    this.search()
  },
  computed:{

      payMoney:{
        get(){
          return Filters.filters.priceformat(this.manageInfo.payMoney);
        }
      }
    }
  
  }
</script>
<style lang="scss">
@import "../../assets/css/variable";
.manage_progress{width:100%;height:100%;padding-top: 20px;overflow: auto;
  .manage_info{width:710px;background-color:#fff;position: relative;margin:0 auto;box-shadow:0px 2px 4px 0px rgba(210,210,210,0.5);
border-radius:5px;padding:30px;
    img{width:130px;height:130px;}
    div{width:490px;height:130px;
      .note{height:74px;}
      p.name{height:74px;line-height:37px;}
      p.money{line-height:40px;font-weight:500;}
      p{color:#333;font-size:28px;max-height:74px;overflow: hidden;
        span{font-size:24px;}
      }
    }
  }
  .info_progress{width:710px;margin:20px auto;box-shadow:0px 2px 4px 0px rgba(210,210,210,0.5);border-radius:5px;background-color:#fff;padding-top:40px;
    >div.progress{
      .data_img{
        p{color:#2F80F6;}
        div{
          .note{color:#333;}
        }
      }
      .timer{color:#2F80F6;}
      .mid{position: relative;background-color:#fff;
        img{width:30px;height:30px;position: absolute;top:-5px;left:-5px;}
      }
    }
    >div{display:flex;padding-left: 45px;
      .timer{text-align:right;width:130px;color:#999;font-size:24px;}
      .data_img{
        p{font-size:28px;color:#999;line-height:42px;
          span{font-size:$text-sm;}
        }
        div.after_border{
          &:after{content:'';width:2px;height:100%;background-color:#ddd;position: absolute;top:5px;left:-35px;}
        }
        div{position: relative;min-height:95px;padding-top:5px;
          p{font-size:24px;line-height:33px;}
          .note{color:#999;width:445px;
          }
          .file{color:#2f80f6;}
        }
        .border_l{
          border-left:1px solid #ddd;padding-left:35px;margin-left: -35px;padding-bottom:35px;
        }
      }
      .mid{width:20px;height:20px;background-color:#d8d8d8;border-radius:20px;margin-top:12px;position: relative;}
      .list_img{width:130px;height:130px;}
    }
  }
}
</style>
