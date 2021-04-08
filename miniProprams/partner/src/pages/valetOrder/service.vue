<template>
 <div class="serviceWrap">
    <!-- <div class="searchPanel">
      <sebe-icon type="search" :size="40"></sebe-icon>
      <input type="search" placeholder="服务搜索" v-model="keyword" />
      <div @click="clearInput" class="searchBtn">搜索</div>
    </div> -->
    <div class="serviceContent">
      <div class="serviceType">
        <p class="nav_item" v-for="(item, index) in serviceList" :key="index" :class="serviceActive === index ? 'serviceActive' : ''" @click="selectTypeFn(index)" >
        {{ item.bsClassName }} <span class="num">{{ item.selectNum }}</span> </p>
      </div>
      <div class="serviceItem" id="serviceItem"
        :scroll-y="true"
        @bindscroll="handleBindScroll"
        @scrolltolower="scrolltolower"
        @scroll="handleScroll">
        <div class="typeWrap" v-for="(item, index_) in secondList" :key="index_">
           <div class="typeTitle" >
              <div class="title">{{ item.bsClassName }}</div>
              <div class="serviceNum">{{ item.childs.length }}项服务</div>
            </div>
            <div class="check_box_item row-between" v-for="(info, index1) in item.childs" :key="index1" @click="selectFn(info, index1, item.childs)">
              <span class="name">{{ info.name }}</span>
              <icon class="check" type="success" size="23" :color="info.isSelected ? '#FF9639' : '#eee' " />
            </div>
        </div>      
      </div>   
    </div>
  
    <div class="next_box">
      <div class="select_num">您已选择<span class="orange">{{ serviceNum }}项服务</span></div>
      <button class="btn" @click="nextFn">下一步</button>
    </div>

 </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      serviceList: [],
      scrollTop: 0,
      serviceActive: 0,  //选择的一级分类
      secondList: [],  //二级服务
      selectedList: [],  //选择的服务
    }
  },
  computed: {
    // 选择的所有服务数
    serviceNum () {
      let num = 0;
      this.selectedList = [];
      this.serviceList.forEach (item => {
        item.selectNum = this.getSelectNumFn(item.childs).num;
        item.selectList = this.getSelectNumFn(item.childs).arr;
        num += item.selectNum;
        this.selectedList = this.selectedList.concat(item.selectList)
      })
      return num
    }
  },
  mounted () {
    this.serviceActive = 0;
    this.findpartnerProductFn();  //查询服务商品列表
  },
  methods: {
    // 查询服务商品列表
    async findpartnerProductFn () {
      try {
        let resp = await this.API.valetOrder.findpartnerProduct();
        this.serviceList = resp;
        this.secondList = this.serviceList[0].childs;
      }
      catch (e) {}
    },
    // 下一步
    async nextFn () {
      console.log(this.selectedList);
      let data_ = this.$storage.get('createOrderData');
      data_.partnerProductList = data_.partnerProductList || [];
      let arr = [];
      let query = this.$root.$mp.query;
      if (query&&query.from == 'reqManagement') { // 需求单过来的
        let selectItem = this.selectedList[0];
        let codes = selectItem.codes;
        let objData = await this.API.store.findRequirementProductPrice({partnerId: data_.partnerId, codes});
        let newObj = Object.assign({}, selectItem, objData);
        this.selectedList[0] = newObj;
        console.log('data_.partnerProductList', this.selectedList)
      }
      if (!data_.partnerProductList.length) {
        data_.partnerProductList = this.selectedList;
      } else {
        // 如果原来就有国美商标注册申请的话，新增的要和原来的价格保持统一
        let price_ = 0;
        data_.partnerProductList.forEach( item => {
          if (item.codes == 'sbfw_gnsb_zs') {  //国内商标注册申请
            price_ = item.salePrice;
          }
        })
        console.log('selectedList', this.selectedList)
        this.selectedList.forEach((item) => {
          if (item.codes == 'sbfw_gnsb_zs') {  //国内商标注册申请
            if (price_ != 0) {
              item.salePrice = price_;
            }
            arr.push(item);
          } else {
            console.log('data_.partnerProductList', data_.partnerProductList)
            let tem = data_.partnerProductList.some( (info) => {
              if (item.codes == info.codes ) {   
                info.serviceNumber = info.serviceNumber+1;
                return true
              }
            })
            if (!tem) {
              arr.push(item);
            }
          }
        })
      }
      
      data_.partnerProductList = data_.partnerProductList.concat(arr);
      this.$storage.set('createOrderData', data_);
      this.$router.go(-1)
    },
    // 得到选择的数量
    getSelectNumFn (list) {
      let self = this;
      let totalSelected = 0;
      let arr = [];
      list.forEach( second => {
        second.childs.forEach( third => {
          if (third.isSelected) {
            totalSelected ++;
            arr.push(third);
          }
        })
      })
      return {num: totalSelected, arr: arr}
    },
    selectFn (item, index, list) {
      let query = this.$root.$mp.query;
      if (query&&query.from) {
        this.serviceList.map(serItem => {
          serItem.childs.map(dIt => {
            dIt.childs.map(dIt => {
              dIt.isSelected = false;
            })
          })
        })
        item.isSelected = true;
        item.serviceNumber = 1;
        console.log('serviceList', this.serviceList)
      } else {
        item.isSelected = !item.isSelected;
        item.serviceNumber = 1;
      }
      Vue.set(list, index, item);
    },
    // 选择一级服务类目
    selectTypeFn (index) {
      this.serviceActive = index;
      this.secondList = this.serviceList[index].childs;
    },
    scrolltolower(e){
      console.log(e)
    },
    handleBindScroll (e) {
      console.log(e.detail )
    },
    handleScroll (e) {
      console.log('target', e.target.scrollTop)
      this.scrollTop = e.target.scrollTop
      console.log(this.$refs.serviceItem)
      // this.$refs.serviceItem.changeState()
    }
  }
}
</script>

<style lang="scss">
.serviceWrap{
  height: 100%;overflow: hidden;display: flex;flex-direction: column; background: #fff;
  .serviceContent{display: flex;padding: 20px 0 0 0;flex-grow: 1;
    .serviceType{flex-basis: 210px;line-height: 94px;color: #333;background: #f8f8f8; width: 210px;
      .nav_item { 
        padding-left: 30px;
        .num {display: inline-block; height: 34px; line-height: 34px; border-radius: 50%; background-color: #FF9639; color: #fff; min-width: 34px; font-size: 24px; text-align: center;}
      }
      .serviceActive{background: #fff;}
    }
    .serviceItem{flex-grow: 1;line-height: 94px;position: relative;overflow-y: scroll;padding-left: 40px; padding-bottom: 170px; width:540px;
      .typeWrap{
        .typeTitle{display: flex;line-height: 94px; padding-right: 22px;
          .title{font-size: 26px;color: #999;flex-grow: 1;width: 380px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
          .serviceNum{font-size: 26px;color: #bbb;}
        }
        .check_box_item {
          height: 94px; line-height: 94px; border-bottom:1px solid #eee; padding-right: 22px;
          .name {font-size: 28px; color: #333;width: 400px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
          .check { height:46px; vertical-align: middle; display: inline-block;}
        }
      }
    }
  }
  .searchPanel{border:1px solid #eee;border-radius: 32px;padding: 0 30px 0 20px;margin: 20px 20px 0 20px;position: relative;
    height: 64px;
    .i-icon{line-height: 60px;padding: 0 20px 0 0;
      &.clearIcon{padding: 0 20px;}
    }
    .searchBtn{line-height: 60px; color: #999;position: absolute;right: 30px; top: 0;}
    input{height: 60px;line-height: 60px;flex-grow: 1;position: absolute;top:0;left: 72px;}
  }
  .next_box {
    width: 100%; height: auto; position: fixed; bottom:0; box-shadow:0px -8px 16px 0px rgba(187,187,187,0.09);
    .select_num {
      width: 100%; height: 80px; line-height: 80px; background: #fff; text-align: center; color: #999; font-size: 28px;
      .orange {color: #FF9639;}
    }
    .btn {width: 100%; height: 96px; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); text-align: center; color: #fff; font-size: 32px; border-radius: 0;}
  }
}




</style>
