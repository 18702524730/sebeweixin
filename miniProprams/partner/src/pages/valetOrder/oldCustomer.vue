<template>
  <div class="old_customer" >
    <u-navbar :tabs="tabs" :activeIndex="typeTab-1" :marginLeft="13" @selectTab="selectTabFn"  />
    <div v-if="oldCustomerLists && oldCustomerLists.length">
        <div class="customer_info weui-flex" v-for="(item, index) in oldCustomerLists" :key="index" @click="goBack(item,index)">
          <div class="customer_l">
            <img class="portrait" :src="item.avatar || 'https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/AEF0693C7D8FEC4A759B3DED7CEBD429.png'" />
          </div>
          <div class="customer_m weui-flex__item ml30 mr30" :class="{' mt15':!item.companyName}">
            <div v-if="item.companyName">{{item.companyName}}</div>
            <div class="mt10">{{item.applyName}}</div>
            <div class="mt10">{{item.applyPhone}}</div>
          </div>
          <div class="customer_r">
            <icon class="check" type="success" size="23" :color="item.isSelected ? '#FF9639' : '#ddd' " />
          </div>
        </div>

    </div>
    <!-- 没数据 -->
    <div class="null_single" v-if="!oldCustomerLists || !oldCustomerLists.length && !loading">
      <img class="portrait" src="~assets/img/store/emptyImg.png">
      <div class="txt mb40">暂无客户记录</div>
    </div>

    <!-- 加载提示语 -->
    <div class="list_loading_text row-center" v-if="oldCustomerLists && loading">
      <text class="text">加载中...</text>
    </div>
    <div class="list_bottom_test mb30" v-if="oldCustomerLists && moModre">到底啦~</div>


  </div>
</template>
<script>
  import Vue from 'vue';
  import http from '@/plugins/flyio/request';
  import common from '@/utils/common';

  export default {
    data: {
      init: false,
      typeTab: 1,
      oldCustomerLists: [],
      numindex: '',
      tabs: ["企业客户", "个人客户"],
      pgIndex: 1,  //页数
      pgCount: 6,  //每页数量
      pageAll: 1,  //总页数
      moModre: false,  //没有更多值了
      loading: false,
    },
    // 上拉加载，拉到底部触发
    onReachBottom() {
      console.log('上啦加载');
      if (this.pgIndex >= this.pageAll) {
        this.loading = false;
        this.moModre = true;
        return
      }
      this.pgIndex ++;
      this.loading = true;
      this.moModre = true;
      this.getListFn();  //查询
    },
    methods: {
      // 查询老用户列表
      async getListFn () {
        let self = this;
        try {
          let params = {
            customerType: self.typeTab,
            page: self.pgIndex,
            rows: self.pgCount
          }
          self.loading = true;
          let resp = await self.API.valetOrder.findAsistantCustomers(params);
          self.loading = false;
          self.pageAll = Math.ceil(resp.totalsize / params.rows) || 1;
          if (self.pgIndex == 1) {
            self.oldCustomerLists = resp.data;
            return
          }
          self.oldCustomerLists = [...self.oldCustomerLists, ...resp.data];
        }
        catch (e) {} 
      },
      showToast () {
        // this.$mptoast('我是提示信息')
        wx.showActionSheet({
          itemList: ['A', 'B', 'C'],
          success: function(res) {
            console.log(res.tapIndex)
          },
          fail: function(res) {
            console.log(res.errMsg)
          }
        })
      },
      // 选择导航
      selectTabFn (data) {
        this.typeTab = parseInt(data)+1;
        this.pgIndex = 1;
        this.getListFn();  //查询老用户列表
      },
      async tabType(type) {
        this.typeTab = type;
        try {
        	let oldLists = await customer.oldLists(type);
          this.oldCustomerLists = oldLists.data || [];
        }catch(err){
        	this.oldCustomerLists = [];
        }
      	this.$apply();
      },
      loadMore() {
        console.log(222222)
      },
      goBack(item, index) {
        this.numindex = index;
        let data = {
        	applyName: item.applyName,
	    		applyPhone: item.applyPhone,
	    		companyName: item.companyName || '',
	    		customerType: item.customerType
        }
        let createOrderData = this.$storage.get('createOrderData') || {};
        createOrderData.customer = data;
      	this.$storage.set('createOrderData', createOrderData);
        this.$router.go(-1);
      }
    },
    onLoad () {
      this.typeTab = this.$route.query.type || 1;
    },
    mounted () {
      this.getListFn();  //查询老用户列表
    }
  }
</script>
<style lang="scss">
@import "../../assets/css/variable";
.old_customer{
	background-color:#f8f8f8;height:100%;
  .tab{height:94rpx;background-color:#fff;border-bottom:1rpx solid #E0E5EC;
  .bdc{border-bottom:4rpx solid #2F80F6;color: #2F80F6;}
    view{text-align: center;line-height:94rpx;box-sizing:border-box;color: #515F71;font-size: $text-nm;}
  }
  .btn{width:690rpx;height:96rpx;background-image: linear-gradient(147deg, #0096FF 0%, #2F80F6 100%);box-shadow: 0 8rpx 16rpx 0 rgba(47,128,246,0.30);border-radius: 8rpx;color:#fff;margin:0 auto;border:0rpx;font-size: $text-xxl;text-align: center;line-height:94rpx;position: fixed;bottom:30rpx;left:30rpx;}
  .customer_info{width:100%;height:190rpx;padding:30rpx;box-sizing:border-box; border-radius: 8rpx;background-color:#fff; margin-top: 20px; position: relative;
    .customer_l{
      image{border-radius:100%;width:130rpx;height:130rpx;margin-top: 5rpx; border: 1px solid #eee;}
    }
    .customer_m{width:422rpx;
      view{line-height:40rpx;color: #666;font-size: $text-nm;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    }
    .customer_r{
      .check {width:45px;height:45px;position: absolute;bottom:74px; right:32px;}
    }
  }
}
</style>
