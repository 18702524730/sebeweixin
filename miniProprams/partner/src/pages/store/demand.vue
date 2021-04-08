<template>
  <div class="demandWrap">
    <div class="form">
      <div class="my_input">
        <div class="label_name"><div class="require">*</div><div>客户姓名</div></div>
        <input type="text" v-model="form.name" placeholder-class="palceholderClass" placeholder="请输入客户姓名" :maxlength="20" />
      </div>
      <div class="my_input">
        <div class="label_name"><div class="require">*</div><div>联系电话</div></div>
        <input type="text" v-model="form.phone" placeholder-class="palceholderClass" placeholder="我们将与该号码取得联系" :maxlength="11" />
      </div>
      <div class="my_input my_area">
        <div class="label_name"><div class="require">*</div><div>需求描述</div></div>
        <div class="textarea" :class="[platform == 'ios' ? 'ios' : 'android']" v-if="showModal">{{form.requirementDesc}}</div>
        <textarea :maxlength="200" v-else :class="[platform == 'ios' ? 'ios' : 'android']" v-model="form.requirementDesc" placeholder-class="palceholderClass" placeholder="例如：客户需要商标注册，2个类，200字以内"></textarea>
      </div>
      <div class="my_input my_area" style="border-bottom: none;">
        <div class="label_name"><div class="require"></div><div>备注内容</div></div>
        <div class="textarea" :class="[platform == 'ios' ? 'ios' : 'android']" v-if="showModal">{{form.remark}}</div>
        <textarea :maxlength="200" v-else :class="[platform == 'ios' ? 'ios' : 'android']" placeholder-class="palceholderClass" v-model="form.remark" placeholder="例如：联系客户时以张总介绍的身份，200字以内"></textarea>
      </div>
    </div>
    <div class="demandService">
      <div class="demandTit">
        <div class="label_name">需求服务</div><div class="des">（选填，填写后可帮您预估收益）</div>
      </div>
      <div class="serviceWrap">
        <div class="serviceItemWrap" v-for="(item, index) in serviceList" :key="index">
          <img :src="item.picture" alt="">
          <div class="content">
            <div class="top">{{item.productName}}</div>
            <div class="middle">
              <div class="redu" @click="handleClickChangeNum('redu', index)">-</div>
              <div class="num">{{item.num}}</div>
              <div class="add" @click="handleClickChangeNum('add', index)">+</div>
            </div>
            <div class="bottom">
              <div class="price"><span>￥</span>{{item.salePrice}}</div><div class="profit">提成{{item.allProfit}}元</div>
            </div>
          </div>
          <div class="actions"></div>
        </div>        
      </div>

      <div class="serviceBtn" @click="addService"><img src="~assets/img/store/addIcon.png" />请添加服务</div>
    </div>
     <div class="fixed_bottom">
      <div class="total_pay " v-if="form.requirementProductList&&form.requirementProductList.length">预计收益：<span class="price"><span class="unit">¥</span>{{ totalProfit }}</span></div>
      <div class="total_pay " v-else style="color: #999">暂无预计收益</div>
      <form @submit="submit" class="submitForm" report-submit="true">
        <button formType="submit">提交需求</button>
      </form>
      <!-- <div class="btn_box" @click="submit">提交需求</div> -->
    </div>
    <!-- 消息提示 -->
    <u-message />
    <!-- 弹窗 -->
    <u-modal :showModal="showModal" :content="'确定移除该服务吗？'" :options="options" @confirmBtn="confirmFn" @hide="showModal = false" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showModal: false,
      options: {
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#2F80F6'
      },
      form: {
        name: '',
        phone: '',
        requirementDesc: '',
        remark: '',
        requirementProductList: []
      },
      totalProfit: 0, // 预期收益
      selectIndex: 0,
      platform: 'android',
      serviceList: [] // 服务列表
    }
  },
  onShow () {
    this.init();
    setTimeout(() => {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      })
    }, 200);
  },
  mounted () {
    this.form = {
      name: '',
      phone: '',
      requirementDesc: '',
      remark: '',
      requirementProductList: []
    }
    this.serviceList = [];
    this.totalProfit = 0;
    wx.getSystemInfo({
      success:  (res) => {
        if (res.platform == 'ios') {
          this.platform = 'ios';
        } else {
          this.platform = 'android';
        }
      }
    })
  },
  methods: {
    // 确定删除
    confirmFn (data) {
      if (data) {
        this.serviceList.splice(this.selectIndex, 1);
        this.form = Object.assign({}, this.form, { requirementProductList: this.serviceList });
        this.$storage.set('demandObj', this.form);
        this.comptedProfit();
      } else {
        this.showModal = false;
        // console.log(2)
      }
      return

    },
    // 添加服务
    addService () {
      this.from = Object({}, this.form, {requirementProductList: this.serviceList});
      this.$storage.set('demandObj', this.form);
      this.$router.push({path: '/pages/store/service', query: {from: '/pages/store/demand'}});
    },
    //  + -
    handleClickChangeNum (type, index) {
      if (type === 'add') {
        this.$set(this.serviceList, index, Object.assign({}, this.serviceList[index], {
          num: this.serviceList[index]['num'] + 1,
          allProfit: Number((this.serviceList[index]['num'] + 1) * this.serviceList[index]['profit']).toFixed(2)
        }))
      } else {
        if (this.serviceList[index]['num'] == 1) {
          this.showModal = true;
          this.selectIndex = index;
          return;
        }
        this.$set(this.serviceList, index, Object.assign({}, this.serviceList[index], {
          num: this.serviceList[index]['num'] - 1,
          allProfit: Number((this.serviceList[index]['num'] - 1) * this.serviceList[index]['profit']).toFixed(2)
        }))
      }
      this.form = Object.assign({}, this.form, { requirementProductList: this.serviceList });
      this.$storage.set('demandObj', this.form);
      this.comptedProfit();
    },
    async init () {
      let query = this.$root.$mp.query;
      this.form = {name: '', phone: '', requirementDesc: '', remark: '', requirementProductList: []};
      let demandObj = this.$storage.get('demandObj');
      let demandItem = this.$storage.get('demandItem');
      let auth = this.$storage.get('auth');
      demandObj&&(this.form = demandObj)
     
      this.serviceList = this.form.requirementProductList;
      if (demandItem&&demandItem.codes) {
        // 如果已添加过则数量加1
        let curIndex = this.serviceList.findIndex((item) => (item.codes === demandItem.codes))
        if (curIndex != -1) {
          this.$set(this.serviceList, curIndex, Object.assign({}, this.serviceList[curIndex], {
            num: this.serviceList[curIndex]['num'] + 1,
            allProfit: Number((this.serviceList[curIndex]['num'] + 1) * this.serviceList[curIndex]['profit']).toFixed(2)
          }));
          console.log('serviceList', this.serviceList)
          this.comptedProfit();
          return;
        }
        let data = await this.API.store.findRequirementProductPrice({partnerId: auth.member_id, codes: demandItem.codes});
        data.salePrice = data.salePrice || 799;
        data.salePrice = (data.salePrice).toFixed(2);
        data.profit = Number((data.salePrice * 0.93 - data.peAmount) * data.requirementReturnProportion).toFixed(2)
        this.serviceList.push({
          salePrice: data.salePrice || 799,
          productName: demandItem.name,
          picture: demandItem.picture,
          profit: data.profit,
          num: 1, 
          requirementReturnProportion: data.requirementReturnProportion, 
          codes: demandItem.codes
        });
        this.form = Object.assign({}, this.form, { requirementProductList: this.serviceList });
        this.serviceList.map(item => {
          item.allProfit = Number(item.profit*item.num).toFixed(2);
        })
        console.log('serviceList', this.serviceList)
        this.$storage.set('demandObj', this.form);
        this.$storage.remove('demandItem');
      }
      this.comptedProfit();
    },
    comptedProfit () {
      // 合计收益
      this.totalProfit = this.serviceList.reduce((total, item) => {
        return total + item.profit * item.num;
      }, 0);
      this.totalProfit = this.totalProfit.toFixed(2);
    },
    // 获取服务价格及需求分佣比
    async findRequirementProductPrice () {
      try{
        let query = this.$root.$mp.query;
        let data = await this.API.store.findRequirementProductPrice({partnerId:4486, codes: query.codes});
        data.profit = Number(data.salePrice) * (data.requirementReturnProportion || 0.1);
        data.salePrice = data.salePrice.toFixed(2);
        this.serviceList = this.serviceList.push({
          salePrice: data.salePrice, 
          num: 1, 
          profit: data.profit,
          requirementReturnProportion: 0.1,
          codes: query.codes
        }) 
      } catch (err) {

      }
    },
    async submit (e) {
      console.log('sss', e.mp.detail.formId)
      if (!this.form.name) {
        this.$message({content: '请输入客户姓名', type: 'error'});
        return;
      }
      if (!this.form.phone) {
        this.$message({content: '请输入客户联系电话', type: 'error'});
        return;
      }
      if (!this.form.requirementDesc) {
        this.$message({content: '请输入需求描述', type: 'error'});
        return;
      }
      let reg = /(^1[3-9]\d{9}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
      if (!reg.test(this.form.phone)) {
        this.$message({content: '联系电话格式不正确', type: 'error'});
        return;
      }
      console.log('form', this.form);
      try {
        let aData = await this.API.store.submitRequirement(this.form);
        this.$router.replace({path: '/pages/store/demandSubmit', query: {requirementSn: aData.requirementSn}});
      }catch(err){}
    }
  }
}
</script>

<style lang="scss">
.demandWrap{padding-bottom: 128px;min-height: 100%;padding-top: 20px;
  .form{
    background: #fff;margin: 0 0 20px;
  }
  .my_input{
    .label_name{display: flex;
      >div{line-height: 44px;font-size: 28px;
        &.require{color: #F64744;padding-right: 6px;}
      }
    }
  }
  .my_area{display: block;height: 315px;
    .label_name{line-height: 90px;height: 90px;
      >div{line-height: 86px;}
    }
    .textarea{width: 710px;height: 225px;line-height: 40px;font-size: 28px;}
    textarea{line-height: 40px;font-size: 28px;width: 710px;height: 225px;}
    .ios{transform: translateY(-20px);}
    .android{transform: translateY(-8px);}
  }
  .demandService{background: #fff;padding: 0 0 40px 20px;
    .demandTit{display: flex;line-height: 40px;padding: 25px 0 15px 0;
      .label_name{font-size: 28px;color: #333;}
      .des{font-size: 28px;color:#999;}
    }
    .serviceBtn{height: 80px;line-height: 77px;text-align: center;border-radius: 40px;border: 1px dashed #2f80f6;color: #2F80F6;
      width: 710px;margin-top: 15px;
      >img{height: 28px;width: 38px;padding-right: 10px;transform: translateY(4px);}
    }
    .serviceItemWrap{
      display: flex;border-bottom: 1px solid #eee;padding: 25px 0;
      >img{width: 130px;height: 130px;border-radius: 4px;}
      .content{padding-left: 20px;
        .top{line-height: 37px;font-size: 26px;}
        .middle{height: 52px;padding-left: 400px;display: flex;text-align: center;padding-top: 2px;
          .add, .redu{height: 48px;width: 48px;border-radius: 24px;font-size: 40px;line-height: 44px;color: #fff;
          background:rgba(221,221,221,1);}
          .add{background:rgba(221,221,221,1);}
          .num{width: 63px;font-size: 30px;color: #333;line-height: 48px;}
        }
        .bottom{font-size: 24px;
          >div{display: inline-block;vertical-align: middle;}
          .price{line-height: 40px;padding-right: 10px;font-size: 28px;font-weight: 500;
            span{font-size: 24px;font-weight: 500;}
          }
          .profit{color: #f64744;}
        }
      }
      &:last-child{border-bottom: none;}
    }
    .serviceItemWrap:last-child{border: none;}
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
    .submitForm{flex-grow: 1;height: 98px;padding: 0;margin: 0;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
      button{font-size: 32px;text-align: center;color: #fff;background: none;line-height: 98px;width: 300px;height: 98px;border: none;padding: 0;margin: 0;}
     }
  }
  .palceholderClass{color: #bbb;line-height: 40px;}
}
 
</style>
