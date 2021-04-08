<template>
  <div class="paytype_page">
    <!-- start -->
    <div class="item-list" v-for="(item, index) in partnerProductList" :key="index" >
      <div class="item_li">
        <div class="item_left">
          <div class="item-info" >
            <div class="info-wrapper" >
              <div class="info_img">
                <img :src="item.picture" alt="">
              </div>
              <div class="info_part column-between">
                <div class="info_top row-between" >
                  <div class="name" >{{ item.name }}</div>
                  <div class="num" v-if="!item.type" data-handlename="editItem" style="" >x{{ item.serviceNumber || 1 }} </div>
                </div>
                <div class="info_bottom row-between" >
                  <div class="price" >
                    ¥<span class="p_num">{{item.salePrice}}</span>
                    <icon class="info" v-if="item.codes=='sbfw_gnsb_zs' && item.serviceAbility && item.isOk" @click="showModalFn" type="info" size="15" color="#eee"/>
                  </div>
                  <div v-if="!pageSource" :class="[item.ticketNo ? item.couponType == 1 ? 'sbq1' : 'sbq2' : '', 'sbq']" @click="handleClickSelect(item, index)">{{item.couponName ? item.couponName : '拾贝券'}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="info_box tm_info_box row-between">
            <div class="info_box_inner">
              <div class="lef">
                <div class="line">
                  <div class="typeName">收益金额</div>
                  <div class="des redPrice">￥{{(item.profitA ? item.profitA : item.profit) + (item.extra ? '(含' + item.extra + '元用券收益)' : '')}}</div>
                </div>
                <div class="line trademarkName" v-if="item.codes=='sbfw_gnsb_zs' && item.serviceAbility && item.isOk">
                  <div class="typeName">商标名称</div>
                  <div class="des"><p>{{item.trademarkDTO.trademarkName}}</p>（{{item.workOrderService.length}}个大类，{{item.plusMin}}收费加项目)</div>
                </div>
                <div class="line trademarkName" v-if="!item.serviceAbility && item.spPhone">
                  <div class="typeName">合伙人</div>
                  <div class="des">{{item.spPhone}}</div>
                </div>
              </div>              
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <div class="priceInfo">

      <div class="priceInfoItem">
        <div class="name">服务收益</div>
        <div class="price redPrice">+¥{{serviceProfit}}</div>
      </div>
      <div v-if="!pageSource" class="priceInfoItem">
        <div class="name">用券收益</div>
        <div class="price redPrice">+¥{{extraProfit}}</div>
      </div>
      <div class="priceInfoItem">
        <div class="name">合计收益</div>
        <div class="price">¥{{allProfit}}</div>
      </div>
    </div>
    <div class="fixed_bottom">
      <div class="total_pay ">应付总额：<span class="price"><span class="unit">¥</span>{{ totalPay }}</span></div>
      <form @submit="submitOrderFn" class="submitForm" report-submit="true">
        <button formType="submit">确认支付</button>
      </form>
      <!-- <div class="btn_box" @click="submitOrderFn(1)">确认支付</div> -->
    </div>

    <u-modal :showModal="showModal" :showTitle="showTitle" :content="content" :options="options" @confirmBtn="hidenFn"  />
    <!-- 拾贝券弹框列表 -->
    <div class="transition_up" v-if="minsVisible" :class="{'show_animation': minsVisible}">
      <div class="mask_bg"  @click="minsVisible = false"></div>
      <div class="transition_wrap" >
        <div class="popup_wrap">
          <div class="chooseMin">
            <div class="row-between top_header">
              <span>拾贝券</span><label @click="minsVisible = false">取消</label>
            </div>
          </div>
          <div class="mid_content">
            <div class="categoryItem">
              拾贝券仅对一个服务生效，且一个订单仅能使用一张
            </div>
            <scroll-view class="categoryItemMinWrap" scroll-y="true" @scroll="handleScroll">
              <div class="couponItemWrap" v-for="(item, index) in dataLists" :key="index">
                <div class="couponTop" @click="doCheck(item, index)">
                  <div class="couponLeft">
                    <div :class="item.couponStatus != '-1' ? 'sbq'+item.couponType : 'sxq'">
                      <p><span class="money">{{item.couponType === 2 ? '￥' : ''}}</span>{{item.couponType === 1 ? item.couponAmount*100 : item.couponAmount}}<span>{{item.couponType === 1 ? '%' : ''}}</span></p>
                      <div>{{item.productType === 1 ? '全场通用' : '部分可用'}}</div>
                    </div>
                  </div>
                  <div class="couponRight" :class="{ 'hasUse': item.couponStatus == 1, 'invalid': item.couponStatus == -1 }">
                    <div class="title">
                      <a :class="'q' + item.couponType">{{item.couponTypeName}}</a>
                      <p>{{item.couponName}}</p>
                    </div>
                    <div class="time">
                      <p>{{item.startTime + '-' + item.endTime}}</p>
                      <icon v-if="item" type="success" size="22" :color="item.checked ? '#2F80F6' : '#EEEEEE'"/>
                      <!-- <a @click="handleClickUse">立即使用</a> -->
                    </div>
                    <div class="des">
                      <p>{{item.productType == 2 ? '仅限于' + item.productNameRange : item.productNameRange}}</p>
                    </div>
                  </div>
                </div>
              </div>
                <!-- 没有优惠券 -->
              <div class="null_single" v-if="!dataLists.length&&!loading">
                <img class="portrait" src="~assets/img/store/emptyImg.png">
                <div class="txt mb40">暂无优惠券信息</div>
              </div>
            </scroll-view>
          </div>
          <div class="bt_footer" @click="hideFn">确定</div>
        </div>
      </div>
    </div>
    <!-- 支付弹框 -->
    <transition-up :show="payVisible" >
      <div class="transition_content">
        <div class="shareTitle">请选择支付方式</div>
        <div class="shareIcon">
          <button class="user" @click="selfPay">
            <img src="~assets/img/icon/payIcon.png" alt="">
            <p>自己支付</p>
          </button>
          <div class="circle" @click="goPayCard">
            <img src="~assets/img/icon/wxPayIcon.png" alt="">
            <p>客户支付</p>
            <h5>（支持对公支付）</h5>
          </div>
        </div>
        <span @click="closePayDia">×</span>
      </div>
    </transition-up>
    <!-- <div class="transition_up" v-if="payVisible" :class="{'show_animation': payVisible}">
      <div class="mask_bg"  @click="payVisible = false"></div>
      <div class="transition_wrap" ></div>
    </div> -->
  </div>
</template>
<script>
  import Vue from 'vue';
  import mixin from 'mixins/';
  import Filters from '../../utils/filters.js';
  export default{
    mixins: [mixin],
    data(){
      return{
        typeList: [
          {name: '自己支付', id:1, isSelected: true},
          {name: '客户支付', id:2}
        ],
        payVisible: false,
        payType: 1,  // 1.自己支付 2.客户支付
        minsVisible: false, //显示弹框
        showModal: false,
        showTitle: false,
        pgIndex: 1,
        pgCount: 10,
        totalPage: 1,
        content: '',
        total: 0,
        loading:false,
        gifInfo: false,
        dataLists: [], // 优惠券列表
        selectService: {}, // 当前选中用券的服务
        options: {},
        partnerProductList: [],  //服务信息列表
        totalPay: 0,
        serviceProfit: 0, // 服务收益
        extraProfit: 0.00, // 用券收益
        allProfit: 0.00, // 全部收益
        submitDisabled: false, // 避免二次提交
        paymentSn: '',
        orderSn: '',
        md5: '',
        pageSource: '', // 页面来源
      }
    },
    mounted(){
      this.minsVisible = false;
      this.payVisible = false;
      this.selectService = {};
      this.extraProfit = 0.00;
      let data_ = this.$storage.get('createOrderData');
      console.log('data_', data_)
      this.totalPay = data_.totalPay;
      this.serviceProfit = (data_.totalProfit).toFixed(2);
      this.allProfit = (Number(this.serviceProfit) + Number(this.extraProfit)).toFixed(2);
      console.log('服务收益', this.serviceProfit)
      if (data_.partnerProductList) {
        this.partnerProductList = data_.partnerProductList;
        if (!this.pageSource) {
          this.automaticCoupon();
        }
        console.log('this.partnerProductList', this.partnerProductList)
      }
    },
    onShow () {
      let data_ = this.$storage.get('createOrderData');
      let query = this.$root.$mp.query;
      if (query&&query.from) {
          // 暂时只表示从需求单详情过来
        this.pageSource = true
      } else {
        this.pageSource = ''
      }
      this.submitDisabled = false; // 避免二次提交
      // 支付成功之后
      if (!data_) {
        this.$router.push({path: '/pages/valetOrder/valetOrder'})
      }
    },
    methods: {
      // 券选中事件
      handleClickSelect (item, index) {
        // this.partnerProductList.forEach(it => {
        // })
        // 拾贝券搜索

        // if (this.selectService.selectIndex !== index) {
          this.pgIndex = 1;
          this.search(item.codes);
        // }
        item.selectIndex = index;
        this.selectService = item;
        this.minsVisible = true;
        console.log('selectService', this.selectService)

      },
      // 券列表滚动事件
      handleScroll(e){
        console.log('test', e.mp.detail.scrollTop, e.mp.detail);
        let scrollObj = e.mp.detail;
        if (scrollObj.scrollHeight - 10 < scrollObj.scrollTop + 401 && this.pgIndex <= this.totalPage && !this.loading) {
          console.log(1111)
          this.search(this.selectService.codes)
        }
      },
      // 自动获取优惠券
      async automaticCoupon () {
        let shopList = [];
        let profit = 0;
        this.partnerProductList.forEach((item, index) => {
          profit = Number((item.salePrice * 0.93 - Number(item.peAmount)) * item.extractProportion).toFixed(2)
          shopList.push({
            codes: item.codes,
            profit: profit
          })
        })
        console.log('shopList', shopList)
        // return
        try {
          let data = await this.API.my.automaticCoupon({
            shopList
          });
          if (data && data.codes) {
            console.log('suc')
            let ind = 0;
            ind = this.partnerProductList.findIndex(item => item.codes === data.codes);
            if (ind !== -1) {
              let obj = {
                extra: Number(data.maxProfit).toFixed(2),
                ticketNo: data.ticketNo,
                profitA: (Number(data.maxProfit) + Number(this.partnerProductList[ind].profit)).toFixed(2),
                couponName: data.couponName || ''
              };
              this.extraProfit = Number(data.maxProfit).toFixed(2);
              this.allProfit = (Number(this.serviceProfit) + Number(this.extraProfit)).toFixed(2);
              
              this.$set(this.partnerProductList, ind, Object.assign({}, this.partnerProductList[ind], obj));
              // this.selectService = this.partnerProductList[ind]
            }
            
          }
        } catch (e) {

        }
      },
      // 查询可用优惠券
      async search(codes){
        let data = {
          type: 99,
          codes,
          pgIndex: this.pgIndex,
          pgCount: this.pgCount
        }
        try {
          this.loading = true;
          let resp = await this.API.my.findprofitCoupon(data);
          this.loading = false;
          this.total = resp.totalElements;
          this.totalPage = Math.ceil(this.total / this.pgCount);
          resp.elements.map(item => {
            item.state = false;
            item.checked = false;
            if (this.selectService.ticketNo && this.selectService.ticketNo === item.ticketNo) {
              item.checked = true;
            }
            switch (item.couponType) {
              case 1: item.couponTypeName = '升润券'; break;
              case 2: item.couponTypeName = '提佣券'; break;
            }
          });
          this.gifInfo = false;
          if(this.pgIndex == 1){
            this.dataLists = resp.elements;
          } else {
            this.dataLists = this.dataLists.concat(resp.elements)
          }
          this.pgIndex++;
        }
        catch (e) {
          if(this.pgIndex > 1){
            // this.pgIndex -= 1;
          }
          this.gifInfo = false;
        }
      },
      // 收起弹框
      hideFn(){
        this.minsVisible = false;
        let selectItem = {}; // 选中的拾贝券
        for (let i = 0; i < this.dataLists.length; i++) {
          if (this.dataLists[i].checked) {
            selectItem = this.dataLists[i]
          }
        }
        if (selectItem.checked) {
          this.selectService = Object.assign({}, this.selectService, { 
            ticketNo: selectItem.ticketNo , 
            couponName: selectItem.couponName,
            couponType: selectItem.couponType
          })
        } else {
          if (this.selectService.ticketNo) { // 当前选择服务已经有了优惠券，当优惠券都未勾选时重置为不选择优惠券状态
            let seInd = this.selectService.selectIndex;
            delete this.selectService.ticketNo
            delete this.selectService.couponName
            delete this.selectService.couponType
            delete this.selectService.extra
            delete this.selectService.profitA
            this.extraProfit = 0;
            this.allProfit = this.serviceProfit;
            this.$set(this.partnerProductList, seInd, this.selectService);
          }
          return
        }
        console.log('selectService', this.selectService)
        this.partnerProductList.forEach((it, index) => {
          delete it.ticketNo
          delete it.couponName
          delete it.couponType
          delete it.extra
          delete it.profitA
          if (it.workOrderService) {
            it.profit = Number((it.salePrice * 0.93 - (it.peAmount)) * it.extractProportion*it.workOrderService.length).toFixed(2)
          } else {
            it.profit = Number((it.salePrice * 0.93 - (it.peAmount)) * it.extractProportion*it.serviceNumber).toFixed(2)
          }
          // it.profit = Number((it.salePrice * 0.93 - (it.peAmount || 0)) * it.extractProportion).toFixed(2);
          if (index === this.selectService.selectIndex) {
            it = this.selectService;
            // 计算收益
            if (selectItem.couponType == 1) {
              this.selectService.extra = Number((this.selectService.salePrice * 0.93 - Number(this.selectService.peAmount)) * this.selectService.extractProportion * selectItem.couponAmount).toFixed(2);
              this.extraProfit = this.selectService.extra;
              this.allProfit = (Number(this.extraProfit) + Number(this.serviceProfit)).toFixed(2);
              this.selectService.profitA = (Number(this.selectService.extra) + Number(this.selectService.profit)).toFixed(2);
            } else {
              this.selectService.extra = Number(selectItem.couponAmount).toFixed(2);
              this.extraProfit = this.selectService.extra;
              this.allProfit = (Number(this.extraProfit) + Number(this.serviceProfit)).toFixed(2);
              this.selectService.profitA = (Number(this.selectService.extra) + Number(this.selectService.profit)).toFixed(2);
            }
            this.$set(this.partnerProductList, index, this.selectService);
          }
        })
        // selectItem = this.dataLists.find(item => (item.checked = true));
        console.log('this.partnerProductList', this.partnerProductList)
      },
      doCheck (item, index) {
        this.dataLists.forEach((it, ind) => {
          if (index != ind) {
            it.checked = false
          }
        })
        item.checked = !item.checked;
        // this.selectService = Object.assign({}, this.selectService, { ticketNo: item.ticketNo , couponName: item.couponName})
        this.dataLists[index] = item;
        // this.$set(this.dataLists, index, item);
        console.log('test', item, index, this.dataLists)
      },
      // 确认订单

      async submitOrderFn (e) {
        console.log('sss', e.mp.detail.formId)
        if (this.submitDisabled) {
          return
        }
        this.submitDisabled = true;
        let data_ = this.$storage.get('createOrderData');
        data_.payType = this.payType;
        data_.demandUserId = data_.partnerId;
        data_.partnerProductList = this.partnerProductList;
        data_.formId = e.mp.detail.formId;
        let orderSn='', paymentSn='';
        try {
          let resp = await this.API.valetOrder.createOrder(data_);
          this.orderSn = resp.orderFictitiousSn;
          this.paymentSn = resp.paymentSn;
          this.md5 = resp.md5;
          this.payVisible = true;
          // wx.reLaunch({url: '/pages/valetOrder/payOrder?orderSn=' + orderSn + '&paymentSn=' + paymentSn});
          // this.$router.replace({ path: '/pages/valetOrder/payOrder', query: { orderSn, paymentSn } });
          this.submitDisabled = false;
          // this.$storage.remove('createOrderData');
          console.log(resp)
        }
        catch (e) {
          this.submitDisabled = false;
          return
        }

        /*
        if (type == 1) {   //直接支付
          this.wechatPay(orderSn, paymentSn, () => {
            this.submitDisabled = false;
            this.$router.replace({path: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}`})
          }, () => {
            this.submitDisabled = false;
            // 删除订单
            this.deleteOrderFn(orderSn);
          });
        }
        else if (type == 2) {   //客户支付
          this.submitDisabled = false;
          this.$router.push({path: `/pages/valetOrder/placeUrl?orderFictitiousSn=${orderSn}`})
        }
        */
      },
      // 关闭支付弹框
      closePayDia () {
        let query = this.$root.$mp.query;
        this.payVisible = false;
        let orderSn = this.orderSn;
        let paymentSn = this.paymentSn;
        // 需求单来的跳转到我的页面
        if (query&&query.from) {
          wx.switchTab({url: '/pages/index/my'});
        } else {
          wx.reLaunch({url: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}`});
        }
      },
      // 自己支付
      async selfPay (type) {
        let query = this.$root.$mp.query;
        this.payVisible = false;
        let orderSn = this.orderSn;
        let paymentSn = this.paymentSn;
        this.$storage.remove('createOrderData');
        this.wechatPay(orderSn, paymentSn, () => {
          setTimeout(() => {
            if (query&&query.from) {
              wx.switchTab({url: '/pages/index/my'});
              return
            }
            wx.reLaunch({url: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}`});
          }, 200)
        }, () => {
          if (query&&query.from) {
            wx.switchTab({url: '/pages/index/my'});
            return
          }
          setTimeout(() => {
            wx.reLaunch({url: `/pages/order/orderDetails?orderFictitiousSn=${orderSn}`});
          }, 200)
        });
      },
      // 客户支付
      goPayCard () {
        this.payVisible = false;
        let orderSn = this.orderSn;
        let query = this.$root.$mp.query;
        this.$storage.remove('createOrderData');
        if (query&&query.from) {
          wx.reLaunch({url: `/pages/valetOrder/placeUrl?orderFictitiousSn=${orderSn}&md5=${this.md5}&from=${query.from}`});
          return;
        }
        wx.reLaunch({url: `/pages/valetOrder/placeUrl?orderFictitiousSn=${orderSn}&md5=${this.md5}`});
      },
      // 删除订单
      async deleteOrderFn (orderSn) {
        try {
          let resp = await this.API.valetOrder.deleteOrder({orderFictitiousSn: orderSn});
          console.log(resp);
        }
        catch (e) {}
      },
      hidenFn () {
        this.showModal = false;
      },
      selectTypeFn (item, index, list) {
        list.forEach( info => {
          info.isSelected = false;
        })
        item.isSelected = true;
        Vue.set(list, index, item);
        this.payType = item.id;
      },
      showModalFn () {
        this.showTitle = false;
        this.content = '此处价格已根据您完善的商标信息调整请核对无误后下单。';
        this.showModal = true;
        this.options = {
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#2F80F6'
        }
      }
    },
    computed:{
      dataListInfo:{
        // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
        get () {
          return this.dataLists.forEach((item) => {
            if (item.applicableTimeStart) { 
              item.startTime = item.applicableTimeStart.toString().slice(0, 10); 
              item.startTime = item.startTime.split('-').join('.')
            }
            if (item.applicableTimeEnd) { 
              item.endTime = item.applicableTimeEnd.slice(0, 10);
              item.endTime = item.endTime.split('-').join('.')
            }
          })
        },
        set (value) {
        }
      },
    }
  }
</script>
<style lang="scss">
  @import "../../assets/css/variable";
  .paytype_page {
     padding-bottom: 98px;min-height: 100%;
    .tit_line {width: 100%; height: 78px; line-height: 78px; padding: 0 20px; background: #fff; border-bottom:1PX solid #f3f3f3; color: #999; margin-top: 20px; }
    .type_item_wrap {
      width: 100%; height: auto; background: #fff;
      .type_item {
        height: 94px; line-height: 94px; padding: 0 20px 0 0; margin-left: 20px; border-bottom:1px solid #f3f3f3; display:flex; justify-content: space-between; align-items: center;
        .type_name {color: #333; font-size: 30px;}
        .check {height: 46px;}
        &.active {
          .type_name {color: #2F80F6;}
        }
        &.no_border {border-bottom: none;}
      }
    }
    .info_wrap {
      width: 100%; background: #fff; border-bottom:1PX solid #f3f3f3;
      &:last-child {border-bottom: none;}
      .s_info {
        margin-left: 20px; padding-right: 20px;
        .s_name {width: 100%; font-size: 28px; color: #333; padding: 20px 0;}
        .s_price {
          width: 100%; padding-bottom: 20px;
          .price {
            line-height: 30px;
            .num {color: #F64744; font-size: 28px; margin-right: 10px; vertical-align: middle;}
            .info {height: 30px; vertical-align: middle;}
          }
          .partner {font-size: 26px; color: #666;}
        }
      }
      .tm_name {margin-left: 20px; padding: 20px 10px; line-height: 40px; border-bottom:1px solid #eee; font-size: 26px; color: #666; border-top: 1px solid #f3f3f3;}
    }
    .info_wrap_last {border-bottom: none;}
    .last_info {
      .tm_name {border-bottom: none;}
    }
    .fixed_bottom{
      position: fixed;bottom:0; left:0;z-index: 2;width: 100%;height: 98px; display:flex; background: #fff;
      .total_pay {
        width: 450px; line-height: 98px; font-size: 28px; color: #000; text-align: left; padding-left: 20px;
        .price {
          color: #F64744; font-size: 34px;font-weight: 600;
          .unit {font-size: 28px;font-weight: 600;}
        }
      }
      .btn_box {width: 300px; line-height: 98px; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); color: #fff; font-size: 32px; text-align: center; }
      .submitForm{width: 300px;height: 98px;padding: 0;margin: 0;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
        button{font-size: 32px;text-align: center;color: #fff;background: none;line-height: 98px;width: 300px;height: 98px;border: none;padding: 0;margin: 0;}
      }
    }

      .item-list{
        position: relative; background-color: #FFFFFF; width: 100%; overflow: hidden; box-sizing: border-box; margin-top: 20px; 
        .item_li {
          width: 950px; display: flex; transition:all 0.2s; transform:translate3d(0, 0, 0);
          .item_left {
            width: 750px; 
            .item-info{
              width: 100%; height: 180px; padding: 30px 20px 20px;
              .info-wrapper{
                width: 100%;display: flex;
                .info_img {
                  width:130px; height:130px;
                  img {width:100%; height:100%; background-color:#ccc;}
                }
                .info_part {
                  margin-left: 20px; width: 560px;
                  .info_top {
                    width: 100%;
                    .name{font-size: 26px; color: #333;height: 37rpx;transition: margin-left 0.2s ease-in-out;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:365rpx;line-height: 37px;}
                    .num{font-size: 26px;color: #515F71;text-align: right;line-height: 37px;}
                  }
                  .info_bottom {
                    width: 100%;position: relative;
                    .price{
                      margin-top: 36px;font-size: 24px; color: #333;text-align: left;
                      .p_num {font-size: 34px;}
                      .info {height: 30px; display: inline-block;transform: translateY(-4px);padding-left: 10px;}
                    }
                    .disabled {color: #666; over-flow:hidden; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; }
                    .sbq{position: absolute;bottom: 4px;right: 0;font-size: 24px;color: #333;font-weight: 600;line-height: 40px;padding-left: 40px;
                      background: url('~assets/img/coupon/couponIcon.png') no-repeat 0 6px;background-size: 34px 28px; 
                    }
                    .sbq1{font-weight: normal;color: #fff;font-size: 20px;height: 34px;line-height: 34px;border-radius: 5px;background:linear-gradient(313deg,rgba(255,157,60,1) 0%,rgba(255,200,104,1) 100%);padding: 0 10px;}
                    .sbq2{font-weight: normal;color: #fff;font-size: 20px;height: 34px;line-height: 34px;border-radius: 5px;background:linear-gradient(133deg,rgba(255,139,139,1) 0%,rgba(255,67,67,1) 100%);padding: 0 10px;}
                  }
                }
                .info-desc{
                  width: 100%;display: flex;flex-direction: row;justify-content: space-between;
                  .name{font-size: 26px; color: #333;height: 42rpx;max-width:50%;transition: margin-left 0.2s ease-in-out;}
                  .num{font-size: 34px; color: #333;text-align: right;}
                }
              }
              .option_rig {transform:translate3d(100px, 0, 0);}
              .delete_rig {transform:translate3d(200px, 0, 0);}
            }
            .info_box {
              width:100%; padding-left: 20px; background-color: #fff;transition:all 0.3s;
              .info_box_inner{padding: 20px 20px 0 0; border-top:1px solid #eee; width: 100%;}
              .btn_red { height: 56px; line-height: 54px; border:1px solid #F64744; color: #F64744; border-radius:30px; padding:0 20px; font-size: 28px; }
            }
            .is-edit{
              flex:7;display: flex;text-align: right;position: relative;
              .num{
                width:170rpx;font-size: $text-lg;color: #515F71;text-align: center;
                display: flex;
                .minus,.plus{width:48rpx;height: 48rpx;background: #B3BFD0;border-radius: 2px;color: #FFFFFF;font-size:60rpx;line-height: 38rpx;}
                .disabled{background: #DEE9F7;}
                .plus{font-size:40rpx;line-height: 44rpx;}
                .init-num{width:73rpx;text-align: center;color: #515F71;}
              }
              .complete{
                display: flex;position: absolute;top:-40rpx;right:-40rpx;
                justify-content: center;
                align-items: center;
                width: 100rpx;
                height: 184rpx;
                z-index: 1;
                font-size: $text-lg;
                color: white;
                background: #09BB07;
                border-top-right-radius: 8rpx;
                border-bottom-right-radius: 8rpx;
              }
            }
          }
          .item-oper{
            width: 200px; min-height: 190px;
            .oper-delete{
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100px;
              height: 100%;
              z-index: 1;
              font-size: $text-lg;
              color: white;
              background: #F64744;
            }
            .oper-delete-ask{
              display: flex;
              justify-content: center;
              align-items: center;
              width: 200px;
              height: 100%;
              z-index: 2;
              font-size: $text-lg;
              color: white;
              background: #F64744;
            }
          }
          .close {position: absolute; font-size: 26px; right: 0; top: -10px; color: #333; }
          
          .tm_info_box {
            .lef {
              line-height: 37px;width: 100%;
              .line {
                width: 100%; color: #666; font-size: 26px;display: flex;font-size: 26px;line-height: 37px;padding-bottom: 20px;
                .typeName{color: #333;width: 120px;}
                .des{color: #999;text-align: right;flex-grow: 1;padding-left: 20px;
                  p{display: inline-block;color: #999;width:240px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;vertical-align: bottom;}
                }
                .redPrice{color: #F64744;}
              }
            }
            .rig {color: #F64744; font-size: 28px;}
          }
        }
        .option_left {transform:translate3d(-100px, 0, 0);}
        .delete_left {transform:translate3d(-200px, 0, 0);}
      }
      .priceInfo{padding: 10px 20px;background: #fff;margin-top: 20px;margin-bottom: 50px;
        .priceInfoItem{padding: 10px 0;display: flex;
          .name{font-size: 26px;color: #333;line-height: 40px;}
          .price{font-size: 28px;line-height: 40px;color: #333;flex-grow: 1;text-align: right;}
          .redPrice{color: #F64744;}
        }
      }
    .transition_up {
      position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 8999;
      .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;}
      .transition_wrap {
        position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;
      }
    }
    .show_animation {
      .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
      .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
    }
    .popup_wrap{
      padding-top: 10px;position: relative;
      .chooseMin{
        height: 85px;line-height: 85px;padding: 0 20px;
        span{font-size: 32px;}
        label{color: #999;font-size: 32px;}
      }
      .mid_content{
        height: 940px;padding-bottom: 98px;
        .categoryItem{
          margin: 0;padding: 5px 30px 20px 20px;border-bottom: 0;height: 38px;;line-height: 33px;font-size: 24px;color: #999;
        }
        .categoryItemMinWrap{
          height: 802px;overflow: auto;
          .nodata{background: #fff url(~assets/img/operation/min_bg.jpg) 0 0 repeat-y;background-size: 100%;border-bottom: 0;margin: 0;padding: 0 30px;}
        }
      }
      .bt_footer{position: absolute;bottom:0; text-align: center;z-index: 10000; width: 100%; height: 98px;line-height: 98px;font-size: 32px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }
.couponItemWrap{padding: 0 20px;margin-top: 20px;
  .couponTop{display: flex;box-shadow:0px 2px 8px 0px rgba(0,0,0,0.05);
    .couponLeft{width: 240px;height: 196px;
      >div{text-align: center;padding: 38px 0 26px;height: 196px;background: url('~assets/img/coupon/yellowBg.png') no-repeat 0 0px;background-size: 240px 196px;
        &.sbq2{background: url('~assets/img/coupon/redBg.png') no-repeat 0 0px;background-size: 240px 196px;}
        &.sbq1{background: url('~assets/img/coupon/yellowBg.png') no-repeat 0 0px;background-size: 240px 196px;}
        &.sxq{background: url('~assets/img/coupon/grayBg.png') no-repeat 0 0px;background-size: 240px 196px;}
        p{font-size: 80px;font-weight: 600;line-height: 80px;color: #fff;
          span{font-size: 30px;}
          .money{margin-right: -6px;}
        }
        div{font-size: 24px;font-weight: 500;color:#fff;line-height: 33px;transform: translateY(-12px);}
      }
    }
    .couponRight{flex-grow: 1;height: 196px;padding: 20px;background: #fff;overflow: hidden;
      .title{display: flex;
        a{display: block;height: 34px;line-height: 34px;width: 90px;text-align: center;font-size: 20px;color: #fff;border-radius: 17px;margin-top: 2px;text-decoration: none;}
        .q1{background:linear-gradient(313deg,rgba(255,156,59,1) 0%,rgba(255,192,82,1) 100%);}
        .q2{background:linear-gradient(133deg,rgba(255,124,124,1) 0%,rgba(255,64,64,1) 100%);}
        p{font-size: 26px;color: #333;line-height: 37px;font-weight: 600;padding-left: 10px;flex-grow: 1;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width: 340px;}
      }
      .time{display: flex;padding: 25px 0 15px;border-bottom: 1px dashed #ddd;
        a{display: block;height: 40px;line-height: 40px;width: 118px;border-radius: 20px;font-size: 22px;text-align: center;text-decoration: none;}
        .q1{border: 1px solid #ff9700;color: #ff9700;}
        .q2{border: 1px solid #F64744;color: #F64744;}
        p{flex-grow: 1;font-size: 22px;color: #666;line-height: 40px;}
      }
      .des{font-size: 20px;position: relative;
        p{white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width: 395px;color: #666;line-height: 28px;padding-top: 12px;}
        i{position: absolute;right: 0;width: 40px;height: 40px;text-align: center;line-height: 40px;top: 6px;color: #ddd;font-size: 20px;}
        .icon-x{transform: rotate(90deg);}
        .icon-s{transform: rotate(-90deg);}
      }
      &.invalid{background:#fff url('~assets/img/coupon/invalid.png') no-repeat 315px 0;background-size: 132px 116px;}
      &.hasUse{background:#fff url('~assets/img/coupon/hasUse.png') no-repeat 315px 0;background-size: 132px 116px;}
    }
  }
  .couponBot{padding: 16px 20px 20px;font-size: 24px;line-height: 40px;color: #333;background: url('~assets/img/coupon/desBg.png') repeat-y 0 0px;background-size: 750px 15px;}
}
  .null_single{padding-top: 215px;}
    .transition_content{position: relative;text-align: center;
      .shareTitle{color: #333;font-size: 32px;line-height: 45px;padding: 60px 0 40px;}
      .shareIcon{display: flex;padding-left: 130px;
        >div, >.user{font-size: 0;padding: 0 65px;border: none;
          img{height: 120px;width: 120px;}
          p{font-size: 30px;color:#333;line-height: 42px;padding: 20px 0 10px;}
          h5{font-size: 24px;line-height: 33px;color:#999;padding-bottom: 90px;}
        }
      }
      >span{position: absolute;width: 90px;height: 90px;line-height: 90px;font-size: 60px;right: 0;z-index: 1002;top: 0;color: #ddd;}
    }
  }

.tripList_root{top:0px;left: 0px;width: 100%;height: 100%;overflow: hidden;position: fixed;z-index: 0;}

</style>
