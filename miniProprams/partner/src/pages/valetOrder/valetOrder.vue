<template>
  <div class="valet_order">
    <div class="add_tit_wrap" >
      <form @submit="goCustomer">
      <div class="add_tit">
        <div class="add_tab weui-flex">
          <div class="weui-flex__item" @click="tabTypeFn(1)">
            <div :class="{'tab_click': typeTab==1,'mr10': typeTab==1}" class="fr item">企业客户</div>
          </div>
          <div class="weui-flex__item" @click="tabTypeFn(2)">
            <div class="item" :class="{'tab_click':typeTab==2,'ml10':typeTab==2}">个人客户</div>
          </div>
        </div>
        <div class="add_lists" :class="{'higher':  typeTab==1}">
          <div class="lists_tit" v-if=" typeTab==1"><span class="require">*</span>企业名称</div>
          <div class="lists_input mb40 mt20" v-if=" typeTab==1">
            <input placeholder-class="placeholder" v-model="input.companyName" id="companyName" placeholder="请输入申请企业名称" maxlength="60" />
          </div>

          <div class="lists_tit"><span class="require">*</span>联系人</div>
          <div class="lists_input mb40 mt20">
            <input placeholder-class="placeholder" v-model="input.applyName" id="applyName" placeholder="请输入联系人姓名" maxlength="20" />
          </div>

          <div class="lists_tit"><span class="require">*</span>手机号</div>
          <div class="lists_input mb40 mt20">
            <input type="number" placeholder-class="placeholder" v-model="input.applyPhone" id="applyPhone" placeholder="请输入联系人手机号码" maxlength="11"  @blur="isSubmitFn" cursor-spacing="60"/>
          </div>
          <div class="lists_tit">订单留言<span class="tips">（选填）</span><div class="txt_num">{{ orderMessage ? orderMessage.length : 0 }}/200</div></div>
          <div class="lists_input mt20">
            <!-- <textarea v-if="!platType" auto-height="true" placeholder-class="placeholder" v-model="input.orderMessage" placeholder="请输入您的订单留言，例如商标名称／大类／小项等" maxlength="200" cursor-spacing="120" /> -->
            <textarea auto-height="true" placeholder-class="placeholder" v-model="orderMessage" placeholder="请输入您的订单留言，例如商标名称／大类／小项等" maxlength="200" cursor-spacing="120" />
          </div>

          <div class="lists_tit mt40" v-if="typeTab==2"><span class="require">*</span>是否个体工商户
            <span class="switch">
              <switch checked color="#2F80F6" @change="switch1Change" />
            </span>
          </div>

        </div>
        <div class="btn_next" :class="{'btn_next_submit': isSubmit}" @click="goCustomer">战略调整，暂不支持下单</div>
        <div class="go_old" @click="goOld">选择老客户</div>
      </div>
      </form>
    </div>

    <!-- 消息提示 -->
    <u-message />


  </div>
</template>
<script>
  import Vue from 'vue';
  import http from '@/plugins/flyio/request'
  // Use Vuex
  import { mapState, mapActions } from 'vuex'
  import qs from 'qs';
  import utils from '@/utils/utils';
  import uInput from 'components/weui/input';
  import uMessage from 'components/weui/message';
  import uModal from 'components/weui/modal';
  import download from '../../utils/downloadFiles.js';

  export default {
    components: {
      uInput,
      uMessage,
      uModal
    },
    data() {
      return {
        init: false,
        typeTab: 1,  // 1.企业客户  2.个体客户
        userData: {},
        createOrderData: '',
        platType: false,
        input: {
          companyName: '',
          applyName: '',
          applyPhone: '',
          orderMessage: '',
          individual: 1,  //是否是个体工商户
          customerType: 1
        },  //输入对象
        isSubmit: false,  //是否可以提交
        customer: {},  //用户数据
        orderMessage: ''
      }
    },
    onShow () {
      // 初始化缓存数据
      let createOrderData = this.$storage.get('createOrderData') || {};
      if (createOrderData.customer) {
        this.input = {...createOrderData.customer};
        this.typeTab = this.input.customerType;
        this.isSubmitFn();
      }
      setTimeout(() => {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#f8f8f8'
        })
      }, 200);
    },
    mounted () {
      // 清空缓存
      this.input = {
        companyName: '',
        applyName: '',
        applyPhone: '',
        orderMessage: '',
        individual: 1,  //是否是个体工商户
        customerType: 1
      }
      this.orderMessage = '';
      this.isSubmit = false;
      let query = this.$root.$mp.query;
      if (!query.from) {
        this.$storage.remove('createOrderData');
      } else {
        this.typeTab = 2;
      }
      // !query.from&&this.$storage.remove('createOrderData');  //服务信息
      this.$storage.remove('workOrderData');  //大类小项信息
    },
    methods: {
      ...utils.validator,  //注入表单校验方法
      // 查询服务
      async getServiceListFn (id) {
        if (!id) {
          return
        }
        else{
          try {
            let resp = await this.API.store.productDetail({productNum: id});
            let oldData = this.$storage.get('createOrderData') || {};
            oldData.partnerProductList = [];
            let obj_ = {
              codes: resp.codes,
              guidePrice: resp.guidePrice,
              salePrice: resp.salePrice,
              name: resp.productName,
              extractProportion: resp.extractProportion,
              serviceAbility: resp.serviceAbility,
              saleTaskReturnProportion: resp.saleTaskReturnProportion,
              taskReturnProportion: resp.taskReturnProportion,
              picture: resp.picture,
              peAmount: resp.peAmount,
              serviceAbility: resp.serviceAbility,
              serviceNumber: 1,
              id: resp.id
            }
            oldData.partnerProductList.push(obj_);
            oldData.customer = this.customer;
            oldData.orderMessage = this.customer.orderMessage;
            this.$storage.set('createOrderData', oldData);
            this.$router.push({path: '/pages/valetOrder/confirm'})
          }
          catch (e) {}
        } 
      },
      // 是否个体工商户
      switch1Change (e) {
        this.input.individual = e.target.value ? 1 : 0;
      },
      myInput(e) {
        const fieldName = e.currentTarget.id;
        this.input[fieldName] = e.detail.value;
        this.$apply();
      },
      goOld (){
        let type_ = this.typeTab;
        this.$router.push({path: '/pages/valetOrder/oldCustomer?type='+ type_});
      },
      // 下一步
      goCustomer() {
        if (this.isEmpty(this.input.companyName) && this.typeTab==1) {
          this.$message({content:'请输入企业名称', type: 'error' })
          return
        }
        if (this.isEmpty(this.input.applyName)) {
          this.$message({content:'请输入联系人', type: 'error' })
          return
        }
        if (this.isEmpty(this.input.applyPhone)) {
          this.$message({content:'请输入手机号', type: 'error' })
          return
        }
        if (!this.isMobile(this.input.applyPhone)) {
          this.$message({content:'请输入格式正确的手机号', type: 'error' })
          return
        }
        return
        this.isSubmit = true;
        let type_ = {
          customerType: this.typeTab,
          orderMessage: this.orderMessage
        }
        let data_ = {...this.input, ...type_};
        if (this.typeTab==1) {  //企业客户
          data_.individual = null;
        }
        if (this.typeTab==2) {  //个人客户
          data_.companyName = '';
          data_.individual = this.input.individual==undefined ? 1 : this.input.individual;
        }
        this.customer = data_;
        let query = this.$root.$mp.query;
        if (query&&!query.productNum) {
          let oldData = this.$storage.get('createOrderData') || {};
          oldData.customer = this.customer;
          oldData.orderMessage = this.customer.orderMessage;
          if(!oldData.partnerProductList){
            oldData.partnerProductList = []
          }
          this.$storage.set('createOrderData', oldData);
          this.$router.push({path: '/pages/valetOrder/confirm', query});
          return;
        } 
        let id_ = this.$route.query.productNum;
        id_ ? this.getServiceListFn(id_) : this.$router.push({path: '/pages/valetOrder/confirm'})
        // this.getServiceListFn(id_); //查询服务
      },
      tabTypeFn (type) {
        this.typeTab = type;
        this.input.customerType = this.typeTab;
        this.input = {};  //清空输入框
        this.orderMessage = '';
        this.isSubmitFn();
      },
      isSubmitFn () {
        if (!this.isEmpty(this.input.companyName) && !this.isEmpty(this.input.applyName) && !this.isEmpty(this.input.applyPhone) && this.typeTab==1 || !this.isEmpty(this.input.applyName) && !this.isEmpty(this.input.applyPhone) && this.typeTab==2) {
          // this.isSubmit = true
        }
        else { this.isSubmit = false }
      },
      phoneBlur(){
        console.log(this.isPhoneValid)
        this.isPhoneValid();
      }
    },
    computed: {
      customerType () {
        this.input.customerType = this.typeTab;
      },
      navbarSliderClass() {
        if (this.activeIndex == 0) {
          return 'weui-navbar__slider_0'
        }
        if (this.activeIndex == 1) {
          return 'weui-navbar__slider_1'
        }
        if (this.activeIndex == 2) {
          return 'weui-navbar__slider_2'
        }
      }
    },
  }
</script>
<style lang="scss">
  @import "../../assets/css/variable";
  .valet_order {
    height: 100%;
    .require {color: #F64744;}
    .add_tit_wrap{ min-height: 100%;}
    .add_tit{width:100%; padding-top: 60px;box-sizing:border-box;
      .add_tab{width: 690px;box-sizing:border-box;margin:0 auto; align-items: flex-end;
        .weui-flex__item{
          .fr{float: right;}
          .item {width:330px;height:80px; line-height: 80px; background-color:#fff;border-radius: 6px 6px 0 0;line-height:80px;color: #999;opacity: 0.5;text-align: center;font-size: 30px;}
          .tab_click{height: 90px; line-height: 90px; opacity: 1;width:340px;transition: opacity 0.2s; color: #2F80F6; font-size: 30px;}
        }
      }

      .add_lists{background-color:#fff;width:690px;padding:60px 30px 40px;box-shadow:0px 0px 20px 0px rgba(221,221,221,0.5); border-radius:0px 6px 6px 6px; margin: 0 auto 40px; box-sizing:border-box;min-height: 566px; transition: min-height 0.3s;
        .lists_tit{
          color: #333;font-size: 28px;line-height: 40px;position: relative;
          .txt_num{text-align: right;color: #bbb;font-size:$text-xs; position: absolute;right:0;top: 0;}
          .switch {position: absolute;right:0;top: -10rpx; height:50px; zoom: .8; }
          .tips {color: #bbb;}

        }
        .lists_input{border-bottom:1px solid #eee;padding-bottom: 20px;line-height:40px;font-size:$text-nm;
          .placeholder{color: #bbb;text-align: left; font-size: 28px;}
          textarea{color:#333;text-align: left;padding:0;text-overflow:clip;overflow:hidden;white-space:nowrap;width:630px;}
          input{color:#333;}
        }
      }
      .higher{min-height: 740px;}
      .go_old{text-align: center;width:168px;margin:30px auto 0;color: #999; font-size:$text-nm;}
    }
    .btn_next {width:690px; height:90px; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);  border-radius: 5px;color:#fff;margin:0 auto;font-size: $text-xl; text-align: center;line-height:90px; opacity: 0.5;}
    .btn_next_submit {opacity: 1;}
  }
</style>
