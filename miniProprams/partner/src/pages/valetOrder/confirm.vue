<template>
  <div class="confirm_page" >
    <div class="confirm" >
      <div class="item-wrapper">
        <div class="noService" v-if="partnerProductList&&!partnerProductList.length">
          <img src="~assets/img/store/noService.png" alt="">
          <p>暂无服务，请添加服务项，才可进入<br>下一步哦~</p>
        </div>
        <div class="item-list" v-for="(item, index) in partnerProductList" :key="index" >
          <div class="item_li" @touchstart="touchStart($event)" @touchend="touchEnd($event,index)" :class="{'option_left': item.type, 'delete_left': item.type&&item.delYes}"  >
            <div class="item_left">
              <div class="item-info" >
                <div class="info-wrapper" >
                  <div class="info_img">
                    <img :src="item.picture" alt="">
                  </div>
                  <div class="info_part column-between" @click="recover(index)">
                    <div class="info_top row-between" >
                      <div class="name" >{{ item.name }}</div>
                      <div class="num" @click="editFn(item, index)" v-if="!item.type" data-handlename="editItem" style="padding-right: 50rpx;background: transparent url(https://sebe360test.oss-cn-beijing.aliyuncs.com/0CDD5774654873E50E94D838A604E61D.png) right center no-repeat;background-size: 30rpx 30rpx;" >x{{ item.serviceNumber || 1 }} </div>
                    </div>
                    <div class="info_bottom row-between" >
                      <div class="price" >¥<span class="p_num">{{item.salePrice}}</span></div>
                      <div class="idcode" :class="{'disabled': item.spPhone}" v-if="!item.serviceAbility" @click="showServicer(item, index)" >{{item.spPhone ? '合伙人：'+item.spPhone : '指定合伙人作业'}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="info_box row-end" v-if="item.codes=='sbfw_gnsb_zs' && item.serviceAbility && !item.isOk && !item.type" >
                <button class="btn_red" @click="addInfo(item, index, 'add')">完善商标注册信息</button>
              </div>
              <div class="info_box tm_info_box row-between" v-if="item.codes=='sbfw_gnsb_zs' && item.serviceAbility && item.isOk">
                <div class="lef">
                  <div class="line">商标名称：{{ item.trademarkDTO.trademarkName }}（{{ item.workOrderService.length}}个大类，{{ item.plusMin }}收费加项）<p>共计：¥{{ item.itemPrice }}</p></div>
                </div>
                <span class="rig" @click="addInfo(item, index, 'edit')" v-if="!item.type" >编辑</span>
              </div>
            </div>
            <!-- v-if="item.isDelete" -->
            <div class="item-oper"  >
              <div class="oper-delete" @click="deleteConfirmFn(item, index)" data-handlename="askDeleteItem" v-if="!item.delYes" >删除</div>
              <div class="oper-delete-ask" @click="deleteSubmitFn(item, index)" data-handlename="deleteItem" v-if="item.delYes">确认删除</div>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed_bottom">
        <div class="add_service" @click="addServiceFn">
          <img src="~assets/img/icon/add_service.png" class="img" alt="">
          <span class="text">添加服务</span>
        </div>
        <div class="btn_box" @click="nextFn">
          <div class="next">下一步</div>
          <div class="total">共{{ partnerProductList.length }}项，合计¥{{ totalPay }} </div>
        </div>
        <!-- <button class="confirm-btn" @click="create">生成下单链接</button> -->
      </div>
    </div>

    <!-- 指定合伙人作业 -->
    <transition-up :show="servicerShow" >
      <set-partner :curItem="curItem" @submitPartner="submitPartnerFn" />
    </transition-up>

    <!-- 编辑服务信息 -->
    <transition-up :show="editShow" @hide="hideEditFn">
      <change-price :curItem="curItem" @submitEdit="submitEditFn" />
    </transition-up>

    <!-- 消息提示 -->
    <u-message />

    <!-- 确认弹窗 -->
    <u-modal :showModal="showModal" :showTitle="showTitle" :options="options" :content="content" @confirmBtn="confirmBtnFn"  />

  </div>
</template>
<script>
  import Vue from 'vue'
  import changePrice from './components/changePrice';
  import setPartner from './components/setPartner';
  import Touches from 'utils/Touches';
  export default{
    components: {
      changePrice,
      setPartner
    },
    data(){
      return{
        workOrderData: {}, //完善商标信息数据
        minPrice: '', //小项单价
        tmSalePrice: '', //国内商标注册申请单价
        idCodeIsExit: false,
        total: 0,
        postData: {},
        editItem:'editItem',
        partnerProductList: [],
        curItem: {},  //选择的服务
        curIndex: 0,
        startX: 0,
        minusDisabled: false,
        plusDisabled: false,
        servicerShow: false,
        idcode: '',
        init: false,
        loginMassage: {},
        delYes: false,
        editShow: false,  //编辑服务信息
        initNum: 1,  //默认数量
        changePrice: '',  //修改价格
        showTitle: false,
        showModal: false, //显示弹窗
        content: '您还未完善商标注册信息，是否确定下一步？',
        options: {}
      }
    },
    computed: {
      totalPay () {
        let price = 0;
        this.partnerProductList.forEach( item => {
          if (item.plusMin || item.codes=='sbfw_gnsb_zs' && item.workOrderService && item.workOrderService.length ) {
            item.itemPrice = parseFloat(item.salePrice) * parseInt(item.workOrderService.length) + parseFloat(this.minPrice) * parseInt(item.plusMin)
          }
          else{
            item.itemPrice = parseFloat(item.salePrice) * parseInt(item.serviceNumber);
          }
          price += item.itemPrice;
        })
        return price.toFixed(2)
      },
      priceFil () {
        this.partnerProductList.forEach( item => {
          if (item.salePrice) {
            item.salePrice = parseFloat(item.salePrice).toFixed(2);
          }
        })
      }
    },
    async onShow () {
      this.showModal = false;  //默认隐藏确认弹窗
      this.servicerShow = false;  //弹窗默认隐藏
      this.editShow = false;  //编辑弹窗默认隐藏
      let data_ = this.$storage.get('createOrderData');
      if (data_&&data_.partnerProductList) {
        this.partnerProductList = data_.partnerProductList;
      } else {
        this.partnerProductList = []
      }
      let ret = this.$storage.get('workOrderData');
      if (ret.isOk) {
        await this.getMinPrice();
        this.workOrderData = ret;
        let index = this.workOrderData.index;
        let item = this.partnerProductList[index];
        item.trademarkDTO = this.workOrderData.trademarkDTO;
        item.workOrderService = this.workOrderData.workOrderService;
        item.plusMin = this.workOrderData.plusMin;
        item.isOk = this.workOrderData.isOk;
        item.itemPrice = parseFloat(item.salePrice) * parseInt(item.serviceNumber) + parseFloat(this.minPrice) * parseInt(item.plusMin)
      }
      data_.partnerProductList = this.partnerProductList;
      // Vue.set(this.partnerProductList, index, item);
      let totalObj = this.totalPayFn();
      this.totalPay = Number(totalObj.price).toFixed(2);
      this.$storage.set('createOrderData', data_);
    },
    methods:{
      // 确认弹窗
      confirmBtnFn (data) {
        if (data) {
          this.submiteNextFn();  //确认下一步
        }
        else{
          this.showModal = false;
        }
      },
      // 点击回复原状
      recover(index){
        this.partnerProductList[index].type = 0
      },
      // 滑动开始
      touchStart(e){
        // 获取移动距离，可以通过打印出e，然后分析e的值得出
        this.startX = e.mp.changedTouches[0].clientX;
      },
      // 滑动结束
      touchEnd(e,index){
        if (this.partnerProductList.length == 1) {
          return
        }
        // 获取移动距离
        this.endX = e.mp.changedTouches[0].clientX; 
        if(this.startX-this.endX > 10){
          for(let i=0;i<this.partnerProductList.length;i++){
            this.partnerProductList[i].type = 0;
            this.partnerProductList[index].delYes = false;
          }
          this.partnerProductList[index].type = 1;
        }
        else if(this.startX-this.endX < -10){
          for(let i=0;i<this.partnerProductList.length;i++){
            this.partnerProductList[i].type = 0
            this.partnerProductList[index].delYes = false;
          }
        }
        Vue.set(this.partnerProductList, index, this.partnerProductList[index]);  //渲染视图
      },
      // 删除服务
      deleteFn (item, index) {
        item.isDelete = true;
        Vue.set(this.partnerProductList, index, item);
      },
      // 删除
      deleteConfirmFn (item, index) {
        item.delYes = true;
        Vue.set(this.partnerProductList, index, item);
      },
      // 确认删除
      deleteSubmitFn (item, index) {
        this.partnerProductList.splice(index, 1);
        let data_ = this.$storage.get('createOrderData');
        data_.partnerProductList = this.partnerProductList;
        this.$storage.set('createOrderData', data_);
      },
      totalPayFn () {
        let price = 0;
        let obj = {};
        this.partnerProductList.forEach( item => {
          if (item.plusMin || item.codes=='sbfw_gnsb_zs' && item.workOrderService) {
            item.itemPrice = parseFloat(item.salePrice) * parseInt(item.workOrderService.length) + parseFloat(this.minPrice) * parseInt(item.plusMin)
          }
          else{
            item.itemPrice = parseFloat(item.salePrice) * parseInt(item.serviceNumber);
          }
          price += item.itemPrice;
        })
        obj = { price };
        return obj
      },
      // 完善商标信息
      addInfo(item, index, type) {
        if (type == 'add') {
          let data_ = this.$storage.get('workOrderData') || {}; 
          data_.trademarkDTO = {};
          data_.workOrderService = [];
          data_.picture = '';
          data_.isOk = false;
          data_.index = index;
          this.$store.commit('operation/UPDATEIMGURL', {valueName:'blackWhitePicUrl', url:''});
          this.$storage.set('workOrderData', data_);  //大类小项信息
        }
        else if(type == 'edit') {
          this.$storage.set('workOrderData', item);  //大类小项信息
        }
        this.$router.push('/pages/operation/trademark?salePrice=' + item.salePrice + '&index=' + index)
      },
      //  确认指定合伙人
      submitPartnerFn (data) {
        if (data.isOk) {
         this.curItem = data; 
        }
        else{
         this.curItem.spPhone = '';
        }
        this.servicerShow = false;
        this.partnerProductList[this.curIndex] = this.curItem;
        let data_ = this.$storage.get('createOrderData');
        data_.partnerProductList = this.partnerProductList;
        this.$storage.set('createOrderData', data_)
      },
      // 确认修改价格和数量
      submitEditFn (data) {
        this.curItem = data;
        this.partnerProductList[this.curIndex] = data;
        if (data.codes=='sbfw_gnsb_zs') {
          this.partnerProductList.forEach( item => {
            if (item.codes=='sbfw_gnsb_zs') {
              item.salePrice = data.salePrice;
            }
          })
        }
        this.editShow = false;
        let data_ = this.$storage.get('createOrderData');
        data_.partnerProductList = this.partnerProductList;
        this.$storage.set('createOrderData', data_)
      },
      // 添加服务
      addServiceFn () {
        let query = this.$root.$mp.query;
        this.$router.push({path: '/pages/valetOrder/service', query})
      },
      // 下一步
      nextFn () {
        if (!this.partnerProductList.length) {
          this.$message({content:'请先添加服务项再进行下一步', type: 'error' });
          return;
        }
        let confirm_ = this.partnerProductList.some( item => {
          return (item.codes == 'sbfw_gnsb_zs' && !item.isOk && item.serviceAbility)
        })
        if (confirm_) {
          this.showModal = true;
          this.options = {
            showCancel: true,
            cancelText: '完善信息',
            cancelColor: '#000000',
            confirmText: '下一步',
            confirmColor: '#2F80F6'
          }
        }
        else{
          this.submiteNextFn();  //确认下一步
        }
      },
      // 确认下一步
      submiteNextFn () {
        let data_ = this.$storage.get('createOrderData') || {};
        data_.partnerProductList = this.partnerProductList;
        // 计算收益和总收益
        let totalProfit = 0;
        let query = this.$root.$mp.query;
        data_.partnerProductList.forEach(item => {
          if(query&&query.from){
            // 需求单过来的推单
            item.profit = Number((item.salePrice * 0.93 - (item.peAmount)) * item.requirementReturnProportion*item.serviceNumber).toFixed(2)
          }else if (item.workOrderService) {
            item.profit = Number((item.salePrice * 0.93 - (item.peAmount)) * item.extractProportion*item.workOrderService.length).toFixed(2)
          } else {
            item.profit = Number((item.salePrice * 0.93 - (item.peAmount)) * item.extractProportion*item.serviceNumber).toFixed(2)
          }
          totalProfit += parseFloat(item.profit);
        });
        console.log('data_', data_)
        data_.totalPay = this.totalPay;
        data_.totalProfit = totalProfit;
        this.$storage.set('createOrderData', data_);
        this.$router.push({path: '/pages/valetOrder/payType', query})
      },
      // 编辑服务信息
      editFn (item, index) {
        this.editShow = true;
        this.curItem = item;
        this.curIndex = index;
        this.initNum = item.serviceNumber || 1;
        this.changePrice = item.salePrice;
      },
      // 隐藏编辑服务信息弹窗
      hideEditFn () {
        this.editShow = false;
      },
      unDel(){
        Touches._resetData(this.itemData, 'left');
        Touches._resetData(this.itemData, 'delYes');
      },
      goback(){
        var data = this.postData;
        wepy.setStorageSync('createOrderData', data);
        wepy.navigateTo(
          {
            url: '/pages/createOrder/chooseBusiness'
          }
        )
      },
      appointedServicer(idCode){
        this.servicerShow = false;
        this.curItem.idCode = idCode;
        this.itemData[this.curIndex] = this.curItem;
        this.postData.asistantOrderDtoList = this.itemData;
        wepy.setStorageSync('createOrderData', this.postData);
        //this.$apply();
        console.log('this.curItem:',this.curItem)
      },
      showServicer(item, idx){
        this.curItem = item;
        this.curIndex = idx;
        this.servicerShow = true;
      },
      hideServicer(){
        this.servicerShow = false;
      },
      handle(e){
        console.log(e)
        let handleName = e.currentTarget.dataset.handlename;
        let name = e.currentTarget.dataset.myname;
        let value = e.currentTarget.dataset.myvalue;
        let num = e.currentTarget.dataset.num;
        let idx = e.currentTarget.dataset.index;
        if (num) {
          this.initNum = num;
          this.minusDisabled = num == 1;
          this.itemData[idx].productNum = num;
          console.log(this.itemData[idx].productNum);
        }
        let itemData = Touches[handleName](e, this.itemData, name, value)
        // 删除成功后 恢复数量的+操作
        if (handleName == 'deleteItem') {
          this.plusDisabled = false;
        }
        this.itemData = itemData;
        this.postData.asistantOrderDtoList = this.itemData;
        wepy.setStorageSync('createOrderData', this.postData);
        //item.delYes = false;
        this.$apply();
        this.calTotalPrice();
      },
      back() {
        this.isNeedValidate = false;
      },
      async create({detail}) {
        await Tips.confirm('已选择业务确定生成？', {
          title: '',
          cancelText: '考虑一下',
          cancelColor: '#888888',
          confirmText: '确定生成',
          confirmColor: '#2F80F6'
        })
        console.log(this.postData)
        let createR;
        try {
          createR = await confirm.createOrder(this.postData);
          console.log(createR)
          if (createR.asistantCode) {
            wepy.navigateTo({
              url: '/pages/placeUrl/placeUrl?'+qs.stringify({id: createR.asistantCode})
            });
          }
        } catch (err) {
          console.log(err)
          /*
          if (err.serverCode == 10501) {
            createR = err.serverData.login_code;
            Tips.loaded();
            await Tips.modal('提示');
          } else {
            this.tips(err.message);
            return;
          }
          */
        }
      },
      // 获取小项单价 todo
      async getMinPrice() {
        try {
          let resp = await this.API.valetOrder.getMinPrice();
          this.minPrice = resp.price;
        }
        catch (e) {}
      },
    }
  }
</script>
<style lang="scss">
  @import "../../assets/css/variable";
  .confirm_page {
    background-color:#f8f8f8; width:100%; height:100%;
    .confirm{
      position: relative;box-sizing: border-box;width: 100%;min-height: 100%;padding-top: 20px;background-color: #F8F8F8; padding-bottom: 110px; 
      .item-wrapper{
        width: 100%;box-sizing: border-box;
        .noService{margin-top: 322px;text-align: center;font-size: 0;
          >img{width: 300px;height: 300px;}
          >p{padding-top: 20px;font-size: 26px;line-height: 37px;color: #bbb;}
        }
      }
      .item-list{
        position: relative; background-color: #FFFFFF; width: 100%; overflow: hidden; box-sizing: border-box; margin-bottom: 20px; 
        .item_li {
          width: 950px; display: flex; transition:all 0.2s; transform:translate3d(0, 0, 0);
          .item_left {
            width: 750px; 
            .item-info{
              width: 100%; height: 190px; padding: 30px 20px;
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
                    .name{font-size: 26px; color: #333;height: 42rpx;transition: margin-left 0.2s ease-in-out;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:365rpx;}
                    .num{font-size: $text-nm;color: #515F71;text-align: right;}
                  }
                  .info_bottom {
                    width: 100%;
                    .price{
                      margin-top: 36px;font-size: 24px; color: #333;text-align: left;
                      .p_num {font-size: 34px;}
                    }
                    .idcode{font-size: $text-sm;color: #2F80F6;margin-top: 40px;transition: margin-left 0.2s ease-in-out; text-align:right;}
                    .disabled {color: #666; over-flow:hidden; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; }
                  }
                }
                .info-desc{
                  width: 100%;display: flex;flex-direction: row;justify-content: space-between;
                  .name{font-size: 26px; color: #333;height: 42rpx;max-width:50%;transition: margin-left 0.2s ease-in-out;}
                  .num{font-size: 34px; color: #333;text-align: right;}
                }
                .info-content{
                  width: 100%;display: flex;flex-direction: row;justify-content: space-between;margin-top: 20rpx;
                  .idcode{font-size: $text-nm;color: #2F80F6;transition: margin-left 0.2s ease-in-out;}
                  .price{font-size: $text-lg;color: #515F71;}
                }
                
              }
              .option_rig {transform:translate3d(100px, 0, 0);}
              .delete_rig {transform:translate3d(200px, 0, 0);}
            }
            .info_box {
              width:100%; padding: 24px 20px; background-color: #fff; border-top:1px solid #eee; transition:all 0.3s;
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
              width: 590px; line-height: 37px;
              .line {
                width: 100%; color: #666; font-size: 26px;
                p {color: #666; font-size: 26px;}
              }
            }
            .rig {color: #F64744; font-size: 28px;}
          }
        }
        .option_left {transform:translate3d(-100px, 0, 0);}
        .delete_left {transform:translate3d(-200px, 0, 0);}
      }
      .add{
        position: fixed;bottom:245rpx;right:30px;z-index: 2;width: 130px;height: 130px;border-radius:50%; background: #FFFFFF;display: flex;align-items: center;justify-content: center;box-shadow: 0 8px 16px 0 rgba(184,184,184,0.30);
        .add_text{
          color: #eee;font-size: 70rpx;line-height:56rpx;height: 70rpx;overflow:hidden;
        }
      }
      .fixed_bottom{
        position: fixed;bottom:0; left:0;z-index: 2;width: 100%;height: 100px; display:flex;
        .add_service {
          width: 150px; height:100px; background: #fff; text-align: center; display:flex; flex-direction:column; justify-content: center;
          .img {width: 30px; height: 37px; margin: 0 auto; }
          .text {font-size: 22px; color: #2F80F6; width: 100%; text-align: center;}
        }
        .btn_box {
          width: 600px; height:100px; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
          .next {font-size: 30px; line-height:30px; color: #fff; width:100%; text-align: center; padding-top: 14px;}
          .total {
            width: 100%; font-size: 24px; text-align: center; color: #fff; opacity: 0.7; margin-top: 4px;
          }
        }
      }
    }
  }


</style>
