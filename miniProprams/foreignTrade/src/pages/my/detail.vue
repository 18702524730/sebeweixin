<template>
  <div class="mydetailbox">
      <div class="problem">
          <div class="title">{{info.title}}</div>
          <div class="buchong"><span>我的补充：</span>{{info.problemSupplement}}</div>
          <div class="date"><span>提交时间：</span>{{info.createTime}}</div>
      </div>
      <p class="jindu">处理进度</p>
      <div class="jinducont">
          <div class="jinduitem" v-for="(item,key) in jindulist" :key="key">
              <div class="itemtop">
                  <div class="status" :class="{active:key==0}">{{item.status}}</div>
                  <div class="date">{{item.createTime}}</div>
              </div>
              <!-- <div class="itembottom" v-if="item.desc">
                {{item.desc}}
              </div> -->
          </div>
      </div>
      <p class="jindu" v-if="info.expertName||info.expertPhone">处理专家</p>
      <div class="jinducont" v-if="info.expertName||info.expertPhone">
          <div class="jinduitem">
              <div class="itemtop">
                  <div class="status">专家姓名</div>
                  <div class="date">{{info.expertName}}</div>
              </div>
              <div class="itemtop">
                  <div class="status">手机号</div>
                  <div class="date" @tap="phoneCall" :data-phone="info.expertPhone">{{info.expertPhone}}<span class="tel"></span> <span class="boda">拨打电话</span></div>
              </div>
          </div>
      </div>
    <!-- <div class="commitBtn">获取帮助</div> -->
  </div>
</template>

<script>
  import Filters from '../../utils/filters.js'
export default {
  data () {
    return {
      multiIndex: [],
      pickState: false,
      contactsName:'',
      contactsPhone:'',
      platform:'',
      storeName:'',
      demandDescribe:'',
      id:'',
      info:{},
      jindulist:[
      ]
    }
  },
  components: {

  },
  onShow(option){
    this.id = this.$root.$mp.query.id;
    this.getdetail(this.id)
  },
  methods: {
    phoneCall(e){
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone
      })
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
    async getdetail(id){
      let resp = await this.API.home.findMyForeignTradeDetail(id);
      let arr = resp.feedbackList
      resp.createTime = Filters.filters.dateFormat(resp.createTime);
      arr.forEach(item=>{
        item['createTime'] =Filters.filters.dateFormat(item['createTime']);
        item['status']  = this.getstate(item.state)
      })
      this.info = resp;
      this.jindulist = arr
    }
  }
}
</script>

<style lang="scss">
.mydetailbox{
  min-height: 100%;
  padding: 30px 24px;
  font-family:'PingFangSC-Regular','PingFang SC';
    font-weight:400;
  .problem{
    padding: 32px 24px;
    background-color: #fff;
    border-radius: 10px;
    .title{
        margin-bottom: 28px;
        font-size:32px;
        font-family:'PingFangSC-Medium','PingFang SC';
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:45px;
    }
    .buchong{
        margin-bottom: 40px;
        font-size:28px;
        color:rgba(102,102,102,1);
        line-height:40px;
    }
    .date{
        font-size:24px;
        color:rgba(161,161,161,1);
        line-height:34px;
    }
  }
  .jindu{
    padding: 32px 0;
    line-height: 40px;
    font-size: 28px;
    color:#666;
  }
  .jinducont{
    padding: 32px;
    margin-bottom: 40px;
    font-size:28px;
    color:rgba(161,161,161,1);
    background-color: #fff;
    border-radius: 10px;
    .jinduitem{
        .itemtop{
            height: 45px;
            margin-bottom: 32px;
            &:last-child{
              margin-bottom: 0;
            }
        }
        margin-bottom: 30px;
        font-size:28px;
        line-height:45px;
        &:last-child{
            margin-bottom: 0;
        }
        .status{
            float: left;
            color:rgba(161,161,161,1);
            
            &.active{
                font-size:32px;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
        }
        .date{
            float: right;
            color:rgba(161,161,161,1);
            .tel{
              display: inline-block;
              width: 24px;
              height: 24px;
              margin-left: 20px;
              margin-right: 10px;
              background: url('~assets/img/homepage/tel.png') left center no-repeat;
              background-size: 100%;
            }
            .boda{
              
              font-size:28px;
              font-family:'PingFangSC-Regular','PingFang SC';
              font-weight:400;
              color:rgba(102,106,255,1);
            }
        }
        .itembottom{
            font-size:28px;
            color:rgba(102,102,102,1);
            line-height:40px;
        }
    }
  }
  
  .commitBtn{
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
  }
}
 
</style>
