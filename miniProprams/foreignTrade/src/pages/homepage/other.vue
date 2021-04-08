<template>
<div class="otherproblem">
  <!-- <div v-if="hasPhone">
    <getphone @complete="change"></getphone>
  </div> -->
  <div class="foreigntitle">外贸知识产权问题快速解决通道:</div>
  <div class="itemproblem" @click="todetail(item)" v-for="(item,key) in dataList" :key="key">
    {{item.title}}
  </div>
  <div class="itemproblem">
    <button open-type="contact"><span class="kefuicon"></span>上述问题均与您不符，请接入人工服务</button>
  </div>
  <div class="kefu"><button open-type="contact"></button></div>
  <div class="phone" @tap="phoneCall" data-phone="15019259250"></div>
</div>
</template>

<script>
// import getphone from '../../components/getMessage.vue'
  export default{
    data(){
      return{
        hasPhone: true,
        dataList:[]
      }
    },
    components:{
      // getphone
    },
    methods: {
      change(){
        this.hasPhone = false;
      },
      phoneCall(e){
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone
        })
      },
      todetail(it){
        let jianyi = it['solution']
        wx.setStorageSync('itemsolution',jianyi)
        this.$router.push({path:'/pages/homepage/detail?id='+it.id})
      },
      getPhoneNumber(e) {
      },
      async search(){//初始化
        let resp = await this.API.home.findAllForeignTrade({isLoading: false});
        if(resp){//判断是否为空，避免报错
          let arrnow = []
          for(let i = 0; i < resp.length; i++){
            if(!resp[i]['sub']||!resp[i]['sub'].length){
              arrnow.push(resp[i])
            }
            if(resp[i]['sub']&&resp[i]['sub'].length){
              for(let j = 0; j<resp[i]['sub'].length; j++){
                arrnow.push(resp[i]['sub'][j])
              }
            }
          }
          console.log(arrnow)
          this.dataList = arrnow
        }
      },
    },
    onShow(){
      this.search()
    },
    mounted(){
    }

  }
</script>
<style lang="scss">
@import "../../assets/css/variable";
.otherproblem{
  position: relative;
  background-color: #fff;
  min-height: 100%;
  padding-bottom: 30px;
  .foreigntitle{
    position: relative;
    padding-left: 24px;
    height: 102px;
    padding-top: 37px;
    line-height: 55px;
    font-size: 28px;
    margin-bottom: 36px;
    font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
    color:rgba(191,191,191,1);
  }
  .itemproblem{
    position: relative;
    width:702px;
    height:104px;
    padding: 0 24px;
    margin-bottom: 40px;
    background:rgba(255,255,255,1);
    box-shadow:0px 5px 21px 0px rgba(0,0,0,0.05);
    border-radius:52px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size:28px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(102,106,255,1);
    line-height:104px;
    .kefuicon{
      display: inline-block;
      width: 29px;
      height: 29px;
      background-image: url('~assets/img/homepage/icon_2.png');
      background-size: 100% 100%;
      background-position: center center;
      margin-right: 10px;
    }
    button{
      float: left;
      border:none;
      outline: none;
      margin: 0;
      padding: 0;
      background: none;
      width:100%;
      height:104px;
      line-height: 104px;
      color:rgba(102,106,255,1);
    }
  }
  
}
</style>
