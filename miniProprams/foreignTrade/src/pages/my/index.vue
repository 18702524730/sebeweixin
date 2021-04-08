<template>
  <div class="myWrap">
    <div class="myTitle">
      <div class="avator" >
        <div class="lef_part">
          <div class="img_box" >
            <img src="~assets/img/homepage/hd.png" v-if="isBindPhone" class="img" alt="">
            <img src="~assets/img/homepage/tx.png" v-if="!isBindPhone" class="img" alt="">
          </div>
          <div class="nickname_box ">
            <p class="nickname" v-if="isBindPhone">
              {{ auth.nickname }}
            </p>
            <p class="nickname" v-if="!isBindPhone">
              您还未登录，点击登录平台
            </p>
          </div>
        </div>
      </div>
      <!-- <wave  /> -->
    </div>
    <div class="commitBtn"  v-if="!isBindPhone"><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登录平台</button></div>
    <div class="minebox" v-if="isBindPhone">
      <div class="mine">我的问题</div>
      <scroll-view  :scroll-y="true" v-if="dataList && dataList.length&&loading">
      <div >
        <div class="myitem" v-for="(item,key) in dataList" :key="key" @click="todetail(item.id)">
          <div class="itemleft">
            <div class="tit">{{item.title}}</div>
            <div class="date">{{item.createTime}}</div>
          </div>
          <div class="status" :class="{zhuanjia:item.state =='1',pingtai:item.state =='0',wanjie:item.state =='2'}">{{item.status}}</div>
        </div>
      </div>
        <div class="footer mb30" v-if="nullInfo">到底啦~</div>
      </scroll-view>
      <div class="null_single" v-if="!dataList.length&&loading">
        <img class="portrait" src="~assets/img/order/listNull.jpg">
        <div class="txt mb40">您还没有提交问题</div>
      </div>
    </div>
    <!-- <footerNav></footerNav> -->
  </div>
</template>

<script>
// import footerNav from 'components/footerNav';
import Filters from '../../utils/filters.js'
// import wave from 'components/wave'
export default {
  components: {
    // wave,
    // footerNav
  },
  data () {
    return {
      auth:{},
      arr: [],
      isBindPhone:true,
      triggered: false,
      dataList:[
      ],
      nullInfo: false,
      gifInfo: false,
      page: 1,
      totalsize: 1,
      init: false,
      scrollY: false,
      again:true,
      indexTop:0,
      scrollH:0,

      pgIndex:1,
      pgCount:10,
      total:0,
      loading:false
    }
  },
 // 下拉刷新方法，与methods方法同级
  onPullDownRefresh() {
    this.pgIndex = 1;
    this.search()
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  // 上拉加载，拉到底部触发
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    console.log('上拉加载')
    let pageAll = this.total / this.pgCount;
    if(this.pgIndex >= pageAll) {
      this.nullInfo=true;
      this.gifInfo = false;
      return;
    }
    this.nullInfo=false;
    this.gifInfo = true;
    this.pgIndex += 1;
    this.search()
  },
  methods: {
    async getPhoneNumber(e) {
      
      try {
          let ret =await this.API.interfaces.checkLogin()
          let phone = await this.API.interfaces.getPhoneNumber(e);
          let resp = await this.API.interfaces.bindPhone(phone)
          if(resp.memberDto.phone){
              this.isBindPhone = true;
              this.auth = wx.getStorageSync('auth');
              this.search()
          }
      } catch (err) {
          wx.showToast({
              title: (err && err.response.data.msg) || '获取失败',
              icon: 'none',
              mask: true
          })
      }
    },
    todetail(id){
      this.$router.push({path:'/pages/my/detail?id='+id})
    },
    getstate(n){
      if(n==0){
        return '平台受理中'
      }
      if(n==1){
        return '专家处理中'
      }
      if(n==2){
        return '问题已完结'
      }
    },
    async search(){//初始化
      let self = this;
      let data = {
        pgIndex:this.pgIndex,
        pgCount:this.pgCount
      }
      let resp = await this.API.home.findMyForeignTrade(data,{isLoading: false});
      this.loading = true;
      this.total = resp.totalElements;
      self.gifInfo = false;
      if(resp.elements){//判断是否为空，避免报错
        resp.elements.forEach(item => {
          item['createTime'] =Filters.filters.dateFormat(item['createTime']);
          item['status']  = this.getstate(item.state) 
        });
        if(this.pgIndex == 1){
          self.dataList = resp.elements;
          return;
        }
        for(let i = 0; i < resp.elements.length; i++){
          self.dataList.push(resp.elements[i]);
        }
      }
    }

  },
  // async mounted(){
  //   let data =await this.API.interfaces.checkLogin()
  //   this.isBindPhone = data.isLogin
  //   if(this.isBindPhone){
  //     this.auth = wx.getStorageSync('auth');
  //     this.search()
  //   }
  // },
  async onShow () {
    let query = this.$root.$mp.query;
    console.log('onLaunch_query:', query)
    let data =await this.API.interfaces.checkLogin()
    this.isBindPhone = data.isLogin
    if(this.isBindPhone){
      this.auth = wx.getStorageSync('auth');
      this.search()
    }
  }
}
</script>

<style lang="scss">
.myWrap{
  width: 100%;overflow-x: hidden;min-height: 100%;
  .myTitle{
    background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);;
    .avator{padding: 56px 0 36px 0; height: 298px;
      .lef_part {
        width:100%;
        .img_box {
          width:138px;
          height: 138px;
          margin-right: auto;
          margin-left: auto;
          margin-bottom: 28px;
          .img {width: 138px; height: 138px; border-radius: 50%; border: 4px solid #95C3FD;}
        }
        .nickname_box {
          width: 100%;
          color:#fff;
          .nickname {
            max-width: 400px;
            margin-left: auto;margin-right: auto; text-align: center; line-height: 40px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;color:#fff;
          }
        }
      }
      
    }
  }
  .minebox{
    padding: 0 24px;
    .mine{
      padding: 32px 0 16px; 
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:40px;
    }
    .myitem{
      position: relative;
      padding:38px 24px;
      margin-bottom: 32px;
      background-color: #fff;
      overflow: hidden;
      .itemleft{
        max-width: 480px;
        float: left;
        font-family:'PingFangSC-Regular','PingFang SC';
        font-weight:400;
        .tit{
          height:45px;
          margin-bottom: 28px;
          font-size:32px;
          color:rgba(0,0,0,1);
          line-height:45px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .date{
          height:40px;
          font-size:28px;
          color:rgba(161,161,161,1);
          line-height:40px;
        }
      }
      .status{
        position: absolute;
        right: 0;
        top: 38px;
        height: 50px;
        line-height: 50px;
        width:150px;
        font-size:24px;
        font-family:'PingFangSC-Regular','PingFang SC';
        font-weight:400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 30px 0 0 30px;
        color: #fff;
        text-align: center;
        &.zhuanjia{
          background-color: #FF5353;
        }
        &.pingtai{
          background-color: #666AFF;
        }
        &.wanjie{
          background-color: #A1A1A1;
        }
      }
    }
  }
  .commitBtn{
    margin-top: 150px;
    width:600px;
    height:90px;
    margin-left: auto;
    margin-right: auto;
    background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
    border-radius:45px;
    text-align: center;
    font-size:32px;
    font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:90px;
    button{
      float: left;
      outline: none;
      padding: 0;
      margin:0;
      background: none;
      border: none;
      width:600px;
      height:90px;
      color:rgba(255,255,255,1);
      line-height:90px;
    }
  }
}

</style>
