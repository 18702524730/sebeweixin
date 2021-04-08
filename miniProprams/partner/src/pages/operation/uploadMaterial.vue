<template>
  <div class="uploadMaterial">
    <div class="items">
      <h3>主体文件</h3>
      <div class="row-between file_card" v-if="applyType==1 || applyType==2">
        <label>{{applyType == 1 ? '申请人身份证正反面复印件（需签名）' : '营业执照副本复印件（需盖公章）'}}</label>
        <upImage v-if="applyType == 1" :fileName="'申请人身份证正反面复印件'" :imgUrl.sync="standby1" :valueName="'standby1'" @doClick="editPic"></upImage>
        <upImage v-if="applyType != 1" :fileName="'营业执照副本复印件'" :imgUrl.sync="standby1" :valueName="'standby1'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==1">
        <label>个体工商户营业执照副本复印件（需签名）</label>
        <upImage :imgUrl.sync="standby2_1" :fileName="'个体工商户营业执照副本复印件'" :valueName="'standby2_1'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==4">
        <label>企业登记证件（需加盖企业公章）</label>
        <upImage :imgUrl.sync="standby1" :fileName="'企业登记证件'" :valueName="'standby1'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==4">
        <label>企业登记证件译本1（需加盖企业公章）</label>
        <upImage :imgUrl.sync="standby2_1" :fileName="'企业登记证件译本1'" :valueName="'standby2_1'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==4">
        <label>企业登记证件译本2（需加盖企业公章）</label>
        <upImage :imgUrl.sync="standby2_2" :fileName="'企业登记证件译本2'" :valueName="'standby2_2'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==4">
        <label>企业登记证件译本3（需加盖企业公章）</label>
        <upImage :imgUrl.sync="standby2_3" :fileName="'企业登记证件译本3'" :valueName="'standby2_3'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==3">
        <label>申请人护照（需签名）</label>
        <upImage :imgUrl.sync="standby1" :fileName="'申请人护照'" :valueName="'standby1'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==3">
        <label>中文护照译本1（需签名）</label>
        <upImage :imgUrl.sync="standby2_1" :fileName="'中文护照译本1'" :valueName="'standby2_1'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==3">
        <label>中文护照译本2（需签名）</label>
        <upImage :imgUrl.sync="standby2_2" :fileName="'中文护照译本2'" :valueName="'standby2_2'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card" v-if="applyType==3">
        <label>中文护照译本2（需签名）</label>
        <upImage :imgUrl.sync="standby2_3" :fileName="'中文护照译本2'" :valueName="'standby2_3'" @doClick="editPic"></upImage>
      </div>
    </div>
    <div class="items">
      <h3>委托文件</h3>
      <div class="row-between file_card">
        <label>委托书（需盖公章）</label>
        <upImage :imgUrl.sync="proxyUrl" :fileName="'委托书'" :valueName="'proxyUrl'" :limit="true" :limitWid="4000" :limitHei="2000" @doClick="editPic"></upImage>
      </div>
    </div>
    <div class="items">
      <h3>合同文件</h3>
      <div class="row-between file_card">
        <label>合同文件1（需盖公章）</label>
        <upImage :imgUrl.sync="contractUrl1" :fileName="'合同文件1'" :valueName="'contractUrl1'" @doClick="editPic"></upImage>
      </div>
      <div class="row-between file_card">
        <label>合同文件2（需盖公章）</label>
        <upImage :imgUrl.sync="contractUrl2" :fileName="'合同文件2'" :valueName="'contractUrl2'" @doClick="editPic"></upImage>
      </div>
    </div>
    <div class="fixed-bottom row-center bottomBar">
      <span class="lc save" @click="submitFn">提交审核</span>
    </div>
    <!-- 消息提示 -->
    <u-message />
  </div>
</template>
<script>
  import mixin from 'mixins/';
  import { mapState, mapActions } from 'vuex'
  import upImage from 'components/upImage';
  export default{
    mixins: [mixin],
    components: {
      upImage
    },
    data() {
      return{
        isWorkOrder: false, // 是否是工单(作业流程)
        applySubject: {},
        applyType: 1,
        workOrderId: '',
      }
    },
    computed: {
      ...mapState({
        standby1: state => state.operation.standby1,
        standby2_1: state => state.operation.standby2_1,
        standby2_2: state => state.operation.standby2_2,
        standby2_3: state => state.operation.standby2_3,
        proxyUrl: state => state.operation.proxyUrl,
        contractUrl1: state => state.operation.contractUrl1,
        contractUrl2: state => state.operation.contractUrl2,
      })
    },
    mounted() {
      let query = this.$root.$mp.query;
      this.$storage.remove('fileName')
      console.log('uploadMaterial_query:', query)
      this.applyType = query.applyType-0;
      this.workOrderId = query.workOrderId;
      this.init();
    },
    methods: {
      init() {
        // 清除state中的数据
        this.clearStateData();
        let query = this.$root.$mp.query;
        // 取老工单的缓存数据
        let data = this.$storage.get(query.workOrderId);
        this.applySubject = data.applySubject || {}
        let standby2 = this.applySubject.standby2 || '';
        // 初始化standby2 子数据
        if (standby2) {
          let [ standby2_1, standby2_2, standby2_3 ] = standby2.split(',');
          console.log(standby2_1, standby2_2, standby2_3)
          this.updateImg(standby2_1, 'standby2_1');
          this.updateImg(standby2_2, 'standby2_2');
          this.updateImg(standby2_3, 'standby2_3');
        }
        this.updateImg(this.applySubject.standby1, 'standby1');

        let proxyUrl = data.trademarkDTO.proxyUrl;
        if (proxyUrl) {
          this.updateImg(proxyUrl, 'proxyUrl');
        }
        // 合同书后台已经多合一，这儿需要全部重新上传
        /*let contractUrl = data.trademarkDTO.contractUrl;
        if (contractUrl) {
          let [ contractUrl1, contractUrl2 ] = contractUrl.split(',');
          this.updateImg(contractUrl1, 'contractUrl1');
          this.updateImg(contractUrl2, 'contractUrl2');
        }*/
        console.log(this.applySubject)
      },
      ...mapActions('operation', [
        'updateImgUrl',
      ]),
      // 设置state中的数据
      updateImg(url, valueName) {
        this.updateImgUrl({url, valueName});
      },
      // 有图片时，点击图片跳转编辑
      editPic(url, valueName, fileName) {
        this.$storage.set('fileName', fileName)
        this.$router.push({
          path: '/pages/operation/editPic',
          query: {
            imgUrl: url,
            valueName,
          }
        });
      },
      // 校验
      checkPics() {
        let { checkEmpty, standby1, standby2_1, standby2_2, standby2_3, proxyUrl, contractUrl1, contractUrl2 } = this;
        let { applyType } = this.applySubject;
        let ret = false;
        if (applyType == 1) {
          ret = checkEmpty(standby1, '请上传营业执照副本复印件') && checkEmpty(standby2_1, '请上传个体工商户营业执照副本复印件（需签名）');
        } else if(applyType == 2){
          ret = checkEmpty(standby1, '请上传营业执照副本复印件');
        } else if(applyType == 3){
          ret = checkEmpty(standby1, '请上传申请人护照') && checkEmpty(standby2_1 || standby2_2 || standby2_3, '请上传中文护照译本');
        } else if(applyType == 4){
          ret = checkEmpty(standby1, '请上传企业登记证件') && checkEmpty(standby2_1 || standby2_2 || standby2_3, '请上传企业登记证件译本');
        }
        return ret && checkEmpty(proxyUrl, '请上传委托书') && checkEmpty(contractUrl1 || contractUrl2, '请上传合同文件')
      },
      // 组装standby2数据，以','分隔
      combineStandby2() {
        let arr = [];
        ['standby2_1', 'standby2_2', 'standby2_3'].forEach((name) => {
          if (this[name]) {
            arr.push(this[name])
          }
        });
        return arr.join();
      },
      // 组装合同书链接，以','分隔
      combineContractUrl() {
        let arr = [];
        ['contractUrl1', 'contractUrl2'].forEach((name) => {
          if (this[name]) {
            arr.push(this[name])
          }
        });
        return arr.join();
      },
      // 清除state数据
      clearStateData() {
        [
          'standby1',
          'standby2_1',
          'standby2_2',
          'standby2_3',
          'proxyUrl',
          'contractUrl1',
          'contractUrl2',
        ].forEach((name) => {
          this.updateImg('', name);
        });
      },
      // 提交审核
      async submitFn() {
        if (this.checkPics()) {
          this.applySubject.standby1 = this.standby1;
          this.applySubject.standby2 = this.combineStandby2();
          let query = this.$root.$mp.query;
          let workOrderId = query.workOrderId;
          let ret = {
            workOrderId,
            applySubject: this.applySubject,
            proxyUrl: this.proxyUrl,
            contractUrl: this.combineContractUrl()
          }
          await this.API.operation.submitToCheck(ret);
          this.clearStateData();
          this.$storage.remove(query.workOrderId);
          // wx.reLaunch({ url: '/pages/serviceOrder/orderList?feedbackState=4' });
          // this.$router.push({ path: '/pages/serviceOrder/orderList', query: {feedbackState: 4} });
          wx.switchTab({url: '/pages/index/my'});
        }
      }
    },
  }
</script>
<style lang="scss">
  .uploadMaterial{
    min-height: 100%;padding-top: 20px; padding-bottom: 118px;
    .items{
      background-color: #fff;margin-top: 20px;
      h3{font-size:26px;height:77px;line-height: 77px;padding-left: 20px;color: #999999;background-color: #fff;border-bottom:1px solid #eee;}
      .file_card{height: 200px;padding-right: 20px;margin-left: 20px;border-bottom:1px solid #eee;}
      .file_card:last-child{border-bottom: 0;}
    }
    .items:first-child{margin-top: 0;}
    .bottomBar{
      width: 100%; height: 98px;line-height: 98px;font-size: 32px;background-color: #fff;z-index: 2;
      span{flex: 1;color: #2F80F6;}
      .save{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }
  }
</style>
