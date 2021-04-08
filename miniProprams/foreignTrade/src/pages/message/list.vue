<template>
<div class="zixun">
  <div class="titlebox">
    <div class="title" @click="change(item,index)" :class="{active:nowtab==index}" v-for="(item,index) in tablist" :key="index">{{item.name}}</div>
  </div>
  <div class="kefu"><button open-type="contact"></button></div>
  <div class="phone" @tap="phoneCall" data-phone="15019259250"></div>
  <div class="itembox" @click="todetail(item.id)" v-for="(item,key) in dataList" :key="key">
    <div class="title">{{item.title}}</div>
    <div class="date">{{item.publishDate}}</div>
  </div>
</div>
</template>

<script>
// import getphone from '../../components/getMessage.vue'
const { indexUrl } = CONFIG;
import http from '@/plugins/flyio/request'
import Filters from '../../utils/filters.js'
  export default{
    data(){
      return{
        nowtab:0,
        id:38,
        tablist:[
          {name:'要闻',id:'38'},
          {name:'政策',id:'39'},
          {name:'培训活动',id:'37'},
          // {name:'历史培训',id:'4'},
        ],
        dataList:[
        ]
      }
    },
    components:{
    //   getphone
    },
    methods: {
      phoneCall(e){
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone
        })
      },
      change(it,k){
        this.nowtab = k;
        this.id = it.id
        this.getlist(this.id)
        // if(k==1){
        //   this.$router.push({path:'/pages/message/otherlist'})
        // }
        // if(k==2){
        //   this.$router.push({path:'/pages/message/otherlists'})
        // }
        
      },
      getlist(id){
        http.get(indexUrl+'/cms/api/directive/contentList?categoryId='+id,{},{},{isLoading: false}).then(res=>{
          var list = res.page.list
          if(list&&list.length){
            list.forEach(item=>{
              item.createDate = Filters.filters.dateFormat(item.createDate)
              item.publishDate = Filters.filters.dateFormat(item.publishDate)
            })
            this.dataList = list
          }
          console.log(list)
        })
      },
      todetail(id){
        this.$router.push({path:'/pages/message/mdetail?id='+id})
      },
    },
    onShow(){
      this.getlist(this.id)
    },
    mounted(){
      
    }
  }
</script>
<style lang="scss">
@import "../../assets/css/variable";

.zixun{
  position: relative;
  min-height: 100%;
  .titlebox{
    padding: 30px 24px 0;
    background-color: #fff;
    margin-bottom: 16px;
    overflow: hidden;
    .title{
      float: left;
      width: 120px;
      padding-bottom: 16px;
      width:120px;
      font-size:30px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:#333;
      line-height:42px;
      margin-right: 74px;
      text-align: center;
      &:last-child{
        margin-right: 0;
      }
      &.active{
        color:#666AFF;
        border-bottom: 4px solid #2F80F6;
      }
    }
  }
  .itembox{
    padding: 38px 48px;
    margin-bottom: 16px;
    background-color: #fff;
    
    .title{
      height:45px;
      font-size:32px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,1);
      line-height:45px;
      margin-bottom: 28px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .date{
      height:40px;
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(161,161,161,1);
      line-height:40px;
    }
  }
  
}
</style>
