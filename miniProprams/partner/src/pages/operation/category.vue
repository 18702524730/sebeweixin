<template>
  <div class="category" :class="{'hasTip': isExistPlus}">
    <div class="trademarkInfo">
      <div class="categoryItem"
        v-for="item in cateIdData"
        :key="item.id"
        :class="{itemHight: !!item.checkedNum}" @click="goPath(item)">
        <div class="itemName">
          {{(item.id < 10 ? '0'+ item.id : item.id) + ' ' +item.goodsname}}
        </div>
        <div class="itemDes">
          <label>{{item.checkedNum>0 ? item.checkedNum : ''}}</label>
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div>
    </div>
    <div class="fixed-bottom bottomBar">
      <div class="row-center tip" v-if="isExistPlus">
        <span v-if="plusBig">新增大类<label>{{plusBig}}类</label></span>
        <span v-if="plusMin && plusBig">，</span>
        <span v-if="plusMin">超出小项<label>{{plusMin}}个</label></span>
      </div>
      <div class="row bottomBar_bt">
        <div class="total">
          <img src="~assets/img/operation/sum.png" @click="showPop">
          <i class="num">{{chekedCateIdData.length}}</i>
          <p class="total_price">合计<i>￥</i><i>{{totalPrice}}</i></p>
          <p class="total_tip">共选择{{allMinNum}}个小项</p>
        </div>
        <span class="lc save" @click="goNext">下一步</span>
      </div>
    </div>
    <!-- 消息提示 -->
    <u-message />

    <transition-up :show="visible" @hide="hideFn">
      <div class="popup_wrap">
        <div class="chooseMin">
          <div class="row-between top_header">
            <span>已选类别</span><label @click="hideFn">确定</label>
          </div>
        </div>
        <div class="mid_content">
          <items :data="workOrderService" @doCheck="doCheck"></items>
        </div>
        <div class="bt_footer" @click="hideFn">确定</div>
      </div>
    </transition-up>
  </div>
</template>
<script>
  import Item from './components/categoryItem.vue'
  import Items from './components/categoryItems.vue'
  import tmTypeData from '@/utils/tmTypeData.js'
  export default{
    components: {
      Item, Items
    },
    data() {
      return{
        isWorkOrder: false, // 是否是工单(作业流程)
        salePrice: 0, // 国内商标申请单价
        minPrice: 0, // 小项单价
        oldBigLength: 0, // 原工单大类数量
        oldTotalPrice: 0, // 原工单价格
        cateIdData: [],
        orderData: {},
        workOrderService: [],
        visible: false,
      }
    },
    computed: {
      // 已选择的大类数据
      chekedCateIdData() {
        return this.cateIdData.filter((item) => {
          return !!item.checkedNum
        });
      },
      // 小项数量总和
      allMinNum() {
        let num = 0;
        this.chekedCateIdData.forEach((item) => {
          num += item.checkedNum
        });
        return num;
      },
      // 增加的钱统计
      plusMoney() {
        let { plusMin, minPrice, plusBig, salePrice, oldTotalPrice } = this;
        return plusMin* minPrice + plusBig*salePrice;
      },
      // 价格总计
      totalPrice() {
        let { plusMin, minPrice, plusBig, salePrice, oldTotalPrice, plusMoney } = this;
        let num = oldTotalPrice ? oldTotalPrice + plusMoney
          : this.chekedCateIdData.length * salePrice + plusMin* minPrice;
        return num.toFixed(2);
      },
      // 是否存在加项（仅作业时）
      isExistPlus() {
        return this.isWorkOrder && (this.plusBig || this.plusMin)
      },
      // 增加的大类数量
      plusBig() {
        let oldLen = this.oldBigLength;
        let len = this.chekedCateIdData.length;
        let num = 0;
        if (oldLen && len) {
          num = len - oldLen;
        }
        return num || 0;
      },
      // 增加的小项数量
      plusMin() {
        let num = 0;
        this.chekedCateIdData.forEach((item) => {
          if (item.checkedNum > 10) {
            this.workOrderService.forEach((it) => {
              if (item.id == it.classId) {
                let baseNum = it.oriMinMumber > 10 ? it.oriMinMumber : 10;
                let plusNum = item.checkedNum - baseNum;
                num += (plusNum > 0 ? plusNum : 0)
              }
            });
          }
        });
        return num;
      },
    },
    mounted() {
      let query = this.$root.$mp.query;
      // salePrice=699&workOrderId=13132
      console.log('category_query:', query)
      this.salePrice = query.salePrice || 699;
      console.log('salePrice:', this.salePrice)
      this.init(true);
      this.getMinPrice();
    },
    onShow(){
      console.log('onShow')
      this.init();
    },
    onUnload() {
      this.visible = false;
    },
    methods: {
      // 统计展示
      showPop() {
        if (this.chekedCateIdData.length) {
          this.visible = true;
        }
      },
      init(once) {
        let query = this.$root.$mp.query;
        this.isWorkOrder = !!query.workOrderId;
        if (this.isWorkOrder) {
          // 获取工单详情（本地缓存）
          this.orderData = this.$storage.get(query.workOrderId) || {};
          let workOrderService = this.orderData.workOrderService = this.orderData.workOrderService || [];
          // 获取原始工单中的大类数量
          if (once) {
            // 返回编辑时，oldBigLength不需再覆盖记录
            if (!this.orderData.oldBigLength) {
              this.orderData.oldBigLength = workOrderService.length;
            }
            this.oldBigLength = this.orderData.oldBigLength;
            workOrderService.forEach((item) => {
              // 为空时，默认为10个小项
              if (!item.oriMinMumber) {
                item.oriMinMumber = item.serviceNiceMin.length || 10;
              }
            });
            console.log('oldBigLength:', this.oldBigLength)
          }
          //this.cateIdData[query.id-1]['checkedNum'] = query.checkedNum;
        }else{
          // 获取自定义的详情数据（本地缓存）
          this.orderData = this.$storage.get('workOrderData') || {};
        }
        console.log(this.orderData)
        this.orderData.workOrderService = this.orderData.workOrderService || [];
        let arr = this.orderData.workOrderService;
        this.initAllMinChecked(arr);
        this.workOrderService = arr;
        this.transCateIdData();
      },
      // 获取小项价格
      async getMinPrice() {
        this.minPrice = await this.API.operation.getMinPrice();
      },
      // 统计展示中的小项选择
      doCheck(item, index, classId) {
        this.workOrderService.some((it, idx) => {
          if (it.classId == classId) {
            let serviceNiceMin = it.serviceNiceMin;
            serviceNiceMin.splice(index, 1, item);
            return true;
          }
        });
        console.log('checkMin:', item, index, classId)
      },
      // 初始化选中所有小项
      initAllMinChecked (arr) {
        arr.forEach((it, idx) => {
          let serviceNiceMin = it.serviceNiceMin;
          serviceNiceMin.forEach((its, idxs) => {
            its.checked = true;
          });
          it.checkedNum = serviceNiceMin.length;
        });
      },
      // 初始化大类数据，统计大类下的小项数量
      transCateIdData() {
        let cateIdData = tmTypeData.cateIdData;
        let arr = [];
        cateIdData.forEach((item, index) => {
          let id = item.id;
          item.checkedNum = 0;
          this.workOrderService.forEach((it) => {
            if (it.classId == id) {
              item.checkedNum = it.serviceNiceMin.length;
            }
          });
          arr.push(item);
        })
        //console.log(cateIdData)
        this.cateIdData = arr;
      },
      // 数据处理：筛选掉去除打勾的小项、统计大类下的小项数量
      handleData() {
        this.workOrderService.forEach((it, idx) => {
          let ret = {...it};
          let serviceNiceMin = it.serviceNiceMin;
          ret.serviceNiceMin = serviceNiceMin.filter((its, idxs) => {
            return its.checked
          });
          ret.checkedNum = ret.serviceNiceMin.length;
          if (!ret.serviceNiceMin.length) {
            // 当大类下小项为空时，说明已取消该大类
            this.workOrderService.splice(idx, 1);
          } else {
            this.workOrderService.splice(idx, 1, ret);
          }
        });
        this.transCateIdData();
      },
      // 弹框隐藏
      hideFn(){
        this.handleData();
        this.visible = false;
      },
      // 弹框隐藏
      goPath(item) {
        let query = {...this.$root.$mp.query};
        query.classId = item.id;
        // 这儿存储一下，防止 oriMinMumber 数据丢失
        this.$storage.set(this.isWorkOrder ? query.workOrderId : 'workOrderData', this.orderData);
        this.$router.push({ path: '/pages/operation/group', query });
      },
      // 下一步
      goNext() {
        if (!this.chekedCateIdData.length) {
          this.tips('请选择大类和小项');
          return;
        }
        let query = this.$root.$mp.query;
        this.orderData.plusBig = this.plusBig;
        this.orderData.plusMin = this.plusMin;
        this.handleData();
        // 本地缓存
        this.$storage.set(this.isWorkOrder ? query.workOrderId : 'workOrderData', this.orderData);
        if (this.isWorkOrder) {
          // 作业流程
          this.$router.push({ path: '/pages/operation/confirmAndPush', query });
        }else{
          // 增加代客下单时完善信息的标志
          this.orderData.isOk = true;
          this.$storage.set('workOrderData', this.orderData);
          wx.navigateBack({
            delta: 2
          })
          //this.$router.go(-2);
        }
      }
    },
  }
</script>
<style lang="scss">
  .category{
    height: 100%;padding-bottom: 100px;
    &.hasTip{padding-bottom: 180px;}
    .trademarkInfo{
      width: 100%;background-color: #fff;padding-bottom: 100px;
      .u_input:first-child{border-top: 0;}
      .itemHight{
        .itemName{color: #FF9639;}
        .itemDes{color: #FF9639;}
      }
      .categoryItem:last-child{border-bottom: 0;}
      .file_card{height: 200px;padding: 0 20px;}
    }

    .bottomBar{
      width: 100%;background-color: #fff;z-index: 2;
      .tip{
        font-size:28px;height: 80px;line-height: 80px;box-shadow:0px -8px 16px 0px rgba(187,187,187,0.09);
        span{display: flex;}
        label{color: #FF9639;}
      }
      .bottomBar_bt{
        height: 100px;line-height: 100px;font-size: 32px;
        .total{
          flex: 1;position: relative;height: 100px;border-top:1px solid #eee;
          img{width: 110px;height: 110px;position: absolute;bottom: 10px; left: 20px;}
          .num{width: 40px;height:40px;line-height: 40px;background:#FF9639;border-radius: 20px;color: #fff;text-align: center;font-size: 24px;position: absolute;bottom: 79px; left: 90px;}
          .total_price{
            position: absolute;bottom: 43px; left: 150px;font-weight: bold;font-size: 24px;line-height: 48px;
            i{
              display: inline-block;color: #F64744;font-size: 34px;
              &:first-child{font-size: 24px;}
            }
          }
          .total_tip{
            position: absolute;bottom: 10px; left: 150px;line-height:33px;font-size:24px;color: #999;
          }
        }
        .save{flex-basis: 300px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
      }
    }

    .popup_wrap{
      padding-top: 10px;position: relative;
      .chooseMin{
        height: 85px;line-height: 85px;padding: 0 20px;
        span{font-size: 32px;}
        label{color: #2F80F6;}
      }
      .mid_content{
        height: 940px;padding-bottom: 98px;
        .categoryMinWrap{
          max-height:842rpx;
          .categoryItem{
            background-color: #F8F8F8;margin: 0;padding: 0 30px 0 25px;border-bottom: 0;
            .icon{}
          }
          .categoryItemMinWrap{
            .categoryItemMin:last-child{border-bottom: 0;}
          }
        }
      }
      .bt_footer{position: absolute;bottom:0; text-align: center; width: 100%; height: 98px;line-height: 98px;font-size: 32px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }
  }
</style>
