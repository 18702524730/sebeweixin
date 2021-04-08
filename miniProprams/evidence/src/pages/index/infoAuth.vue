<template>
  <div class="authWrap">
    <div class="warning" v-if="tabActiveIndex === 0">请仔细核对您填写的企业对公账户，我们会通过小额打款的方式进行实名认证</div>
    <div class="tabWrap" v-if="!noShowTab">
      <div v-for="(item, index) in tabs" :key="index" :class="['tabItem', tabActiveIndex === index ? 'activeTab' : '']" @click="handleClickTab(index)">
        <p>{{item}}</p>
      </div>
    </div>
    <div class="contentWrap">
      <form>
        <div class="typeItem">
          <div class="typeDes">主体类型</div>
          <div class="typeInfo">
            <icon type="success" size="14" color="#22aaf7" />{{formDes[tabActiveIndex][0]}}
          </div>
        </div>
        <div class="inputGroup">
          <div class="inputDes">{{formDes[tabActiveIndex][1]}}</div>
          <input type="text" v-model="conForm.apply_name" :maxlength="tabActiveIndex === 0 ? 60 : 20" :placeholder="'请填写'+formDes[tabActiveIndex][1]">
        </div>
        <div class="inputGroup">
          <div class="inputDes">{{formDes[tabActiveIndex][2]}}</div>
          <input type="text" v-model="conForm.apply_number" :maxlength="18" :placeholder="'请填写'+formDes[tabActiveIndex][2]">
        </div>
        <div class="inputGroup">
          <div class="inputDes">{{formDes[tabActiveIndex][3]}}</div>
          <input type="text" v-model="conForm.apply_phone" :maxlength="13" :placeholder="'请填写'+formDes[tabActiveIndex][3]">
        </div>
        <div class="inputGroup" v-if="tabActiveIndex === 1">
          <div class="inputDes">申请人银行卡号</div>
          <input type="text" v-model="conForm.bankCard" :maxlength="19" placeholder="请填写申请人银行卡号">
        </div>
        <div class="inputGroup" v-if="tabActiveIndex === 0">
          <div class="inputDes">企业对公账户</div>
          <input type="text" v-model="conForm.inAcctNo" :maxlength="32" placeholder="请填写企业对公账户">
        </div>
        <div class="inputGroup" v-if="tabActiveIndex === 1">
          <div class="inputDes">申请人银行预留手机号</div>
          <input type="text" v-model="conForm.bankPhone" :maxlength="11" placeholder="请填写申请人银行预留手机号">
        </div>
        <div class="inputGroup" v-if="tabActiveIndex === 0" style="position:relative;">
          <div class="inputDes">对公账户开户行</div>
          <!-- <picker @change="pickChange" value="id" range-key="name" :range="objectArray">
              <view class="picker text">
                请选择对公账户开户行
              </view>
          </picker> -->
          <input type="text" 
          v-model="bankName" 
          @focus="bankWrapStatus = true" 
          @blur="handleBankBlur"
          @click="handleChangeBank"
          @input="handleChangeBank"
          cursor-spacing="154"
          placeholder="请选择对公账户开户行">
          <div class="bankWrap" v-if="bankWrapStatus">
            <div class="bankItem" v-for="(item, index) in filterBankList" :key="index" @click="selectBank(item)">
              {{item.bankName}}
            </div>
          </div>
        </div>
        <div class="inputGroup" v-if="tabActiveIndex === 0">
          <div class="inputDes">企业营业执照副本复印件（加盖公章）</div>
          <!-- <input type="file" class="uploadWrap" />  -->
          <div class="uploadWrap">
            <div class="upload" @click="upload" v-if="conForm.standby1">
              <img v-if="imgUrl" :src="imgUrl" mode="aspectFit" alt="">
            </div>
            <div class="upload" @click="upload" v-else>+</div>
            <div class="uploadDes">
              <div class="topDes">请上传企业营业执照副本复印件，并加盖企业公章</div>
              <div class="botDes">
                格式说明：<br />格式为JPG/JPEG/PNG，大小限制2M以内
              </div>
            </div>
          </div>
        </div>
        <div class="comfirmBtn" @click="handleSave">提交认证</div>
      </form>
    </div>
    <!-- 弹框 -->
    <div class="modal-mask" catchtouchmove="preventTouchMove" v-if="showModal">
      <div class="maskBg" @click="showModal = false"></div>
      <div class="mymodal-dialog">
        <div class="mymodal-dialog-in">
          <div class="modal-title">
            <p class="tit">请填写验证码</p>
          </div>
          <div class="modal-content">
            <div class="inputWrap">
              <input type="text" :maxlength="6" v-model="msgCode" placeholder="请填写银行预留手机号验证码"><div :class="[preventCode ? '' : 'prenentMsg', 'msgCode']" @click="getCode">{{codeText}}</div>
            </div>
            
          </div>
          <div class="modal-footer">
            <div class="btn_item btn-confirm line" @click="confirm" data-status="confirm" >确定</div>
          </div>
        </div>
      </div>
    </div>
    <div class="imessage" :class="[messageObj.status ? 'showMsg' : '', messageObj.type === 'success' ? 'successMsg' : '']">
      {{ messageObj.content }}
    </div>
    <!-- <u-message/> -->
  </div>
</template>

<script>
const { czUrl, spUrl } = CONFIG;
import interfaces from '@/api//interfaces';
import { mapState, mapActions } from 'vuex';
export default {
  data () {
    return {
      messageObj: {
        status: false,
        content: '',
        type: 'error'
      },
      preventDbcStatus: false, // 防止重复提交
      applyId: '',
      msgCode: '',
      showModal: false,
      tabActiveIndex: 0,
      tabs: ['企业', '个人'],
      formDes: [
        ['大陆企业', '申请人企业名称', '统一社会信用代码', '企业联系电话'],
        ['大陆个人', '申请人姓名', '申请人身份证号', '申请人联系电话'],
      ],
      conForm: {
        apply_id:null,
        apply_type:2,//主体类型
        is_default:1, //是否默认主体
        apply_name:'1',//姓名
        apply_number:'',//身份证号或信用代码
        apply_phone:'',//企业/申请人联系电话
        standby1: null, // 营业执照
        standby1_name: null,
        is_checked: null, //1表示已实名认证过
        bankCard: null, // 银行卡号 个人
        bankPhone: null, //.银行预留手机号 个人
        bankName: null, //..企业 开户行名称
        bankCode: null, //..企业 开户行code
        inAcctNo: null // 企业 对公账户
      },
      bankList: [], // 对公开户行列表
      filterBankList: [],
      selectBankObj: {bankName: '', bankCode: ''},
      bankWrapStatus: false,
      bankName: '',
      codeText: '60s后可重发',
      preventCode: true,
      msgCodeTimer: '',
      noShowTab: false,
      imgUrl: ''
    }
  },
  computed: {
    ...mapState('auth', ['authInfo'])
  },
  components: {
  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  async mounted () {
    this.showModal = false;
    this.noShowTab = false;
    this.imgUrl = '';
    this.bankName = '';
    this.preventDbcStatus = false;
    if (this.msgCodeTimer) {
      clearInterval(this.msgCodeTimer);
    }
    console.log('infoitem', this.authInfo)
    this.tabActiveIndex = 0;
    if (!this.$root.$mp.query.type) {
      this.init();
    } else {
      let query = this.$root.$mp.query;
      this.conForm = {
        apply_id: null,
        apply_type:2,//主体类型
        is_default:'1', //是否默认主体
        apply_name:'',//姓名
        apply_number:'',//身份证号或信用代码
        apply_phone:'',//企业/申请人联系电话
        standby1: null, // 营业执照
        standby1_name: null,
        is_checked: null, //1表示已实名认证过
        bankCard: null, // 银行卡号 个人
        bankPhone: null, //.银行预留手机号 个人
        bankName: null, //..企业 开户行名称
        bankCode: null, //..企业 开户行code
        inAcctNo: null // 企业 对公账户
      }
      if (query.go == '/pages/deposit/webDeposit') {
        this.tabActiveIndex = 1;
        this.noShowTab = true;
        this.conForm.apply_type = 5
      } else {
        this.conForm.apply_type = 2
      }
    }
    this.getBankList('');

  },
  watch: {
    messageObj: {
      handler (newVal, oldVal) {
        if (newVal.status) {
          setTimeout(() => {
            this.messageObj.status = false;
          }, 1500)
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('auth', [
      'initInfo'
    ]),
    closeDia(){
      this.showModal = false
      clearInterval(this.msgCodeTimer);
      this.codeText = "重发验证码";
      this.preventCode = true;
    },
    // 
    async confirm () {
      let data = await this.API.homePage.verifyMobCode({
        apply_subject_id: this.applyId,
        mobile_code: this.msgCode
      })
      if (data.code == 200) {
        let query = this.$root.$mp.query;
        // this.$message({content: '认证成功', type: 'success'});
        this.messageObj = { content: '认证成功', type: 'success', status: true };
        setTimeout(() => {
          this.$router.replace({path: query.go});
        }, 1000)
      } else {
        this.messageObj = { content: data.desc, type: 'error', status: true };
      }
    },
    // pdf转为jpg
    async preview () {
      let data = await this.$http.get(spUrl + '/iprp_servicer/api/preview?pdf_url='+this.conForm.standby1);
      this.imgUrl = data.urls[0];
    },
    // 修改时初始化信息
    init () {
      this.conForm = {
        is_default:'1', //是否默认主体
        apply_name:'',//姓名
        apply_number:'',//身份证号或信用代码
        apply_phone:'',//企业/申请人联系电话
        standby1: null, // 营业执照
        standby1_name: null,
        is_checked: null, //1表示已实名认证过
        bankCard: null, // 银行卡号 个人
        bankPhone: null, //.银行预留手机号 个人
        bankName: null, //..企业 开户行名称
        bankCode: null, //..企业 开户行code
        inAcctNo: null // 企业 对公账户
      }
      this.conForm = this.authInfo;
      this.conForm.bankCard = null;
      this.conForm.inAcctNo = null;
      if (this.conForm.bankName) {
        this.bankName = this.conForm.bankName
      }
      console.log('authinfo, conform', this.authInfo, this.conForm)
      if (this.authInfo.apply_type === 5){
        this.tabActiveIndex = 1
      } else {
        this.tabActiveIndex = 0
      }
      if (this.authInfo.is_checked == 4) {
        // 审核失败时
        this.messageObj = { content: this.authInfo.authFailReason, type: 'error', status: true };
      }
      this.preview();
    },
    // 重获验证码
    getCode () {
      if (this.preventCode) {
        this.preventCode = false;
        this.getCapcha();
      }
    },
    // 个人认证银行预留手机号获取 apply_subject_id 提交认证后可获取到
    async getCapcha () {
      let data = await this.API.homePage.authentication({
        apply_subject_id: this.applyId, 
        bank_card: this.conForm.bankCard, 
        bank_phone: this.conForm.bankPhone
      });
      if (data.code != 200) {
        this.preventCode = true;
      } else {
        this.timeout();
      }
    },
    // 个人银行预留手机号验证
    async verifyMobCode () {
      let data = await this.API.homePage.verifyMobCode({apply_subject_id: '', mobile_code: ''});
      if (data.code == 200) {
        this.messageObj = { content: '验证成功！', type: 'success', status: true };
        setTimeout(() => {
          this.showModal = false;
          clearInterval(this.msgCodeTimer);
          this.codeText = '60s后可重发';
          this.preventCode = false;
          this.$router.replace({url: '/pages/index/applicantList'}); // 返回列表页
        }, 1000)
      } else {
          this.messageObj = { content: data.desc, type: 'error', status: true };
      }
    },
    handleChangeBank () {
      this.filterBankList = this.bankList.filter(item => {
        return item.bankName.indexOf(this.bankName) != -1;
      })
    },
    async getBankList (bankName) {
      try{
        let data = await this.$http.post(czUrl + '/EvidenceController/findNotarizationBank.do',{
          bankName: bankName
        });
        this.bankList = data.data;
        this.filterBankList = Object.assign({}, this.bankList);
        console.log('data', this.bankList)
      } catch (err) {

      }
    },
 
    // 
    handleBankBlur () {
      setTimeout(() => {
        this.bankWrapStatus = false;
        this.bankName = this.selectBankObj.bankName;
      }, 200)
    },
    // 银行点击事件
    selectBank (item) {
      console.log(item)
      this.selectBankObj = Object.assign({}, item);
      this.bankName = this.selectBankObj.bankName;
      console.log('bankObj', this.selectBankObj, this.bankName)
    },
    pickChange (e) {
      console.log(e.mp.detail)
    },
    // 提交认证
    async handleSave () {
      let content;
      let query = this.$root.$mp.query;
      if (this.selectBankObj.bankCode) {
        this.conForm.bankName = this.selectBankObj.bankName;
        this.conForm.bankCode = this.selectBankObj.bankCode;
      }
      if (!this.tabActiveIndex) {
        if (!this.conForm.apply_name) {
          content = '请填写申请人企业名称'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.apply_number) {
          content = '请填写统一社会信用代码'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        let reg1 = /(^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$)|([0-9A-Za-z]{15})/;
        if (!reg1.test(this.conForm.apply_number)) {
          content = '统一社会信用代码格式错误'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.apply_phone) {
          content = '请填写企业联系电话'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        let reg2 = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
        if (!reg2.test(this.conForm.apply_phone)) {
          content = '请填写正确的联系电话，固话前请加区号和-'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.inAcctNo) {
          content = '请填写申请企业对公账户'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        let reg3 = /^[0-9]\d{0,}$/;
        if (!reg3.test(this.conForm.inAcctNo)) {
          content = '企业对公账户格式错误'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.bankCode) {
          content = '请选择企业对公账户开户行'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.standby1) {
          content = '请先上传企业营业执照副本复印件'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
      } else {
        let nameReg = /^[\u4e00-\u9fa5]{2,20}$/;
        if (!this.conForm.apply_name) {
          content = '请填写申请人姓名'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!nameReg.test(this.conForm.apply_name)) {
          content = '请填写2-20个汉字'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.apply_number) {
          content = '请填写申请人身份证号'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        let reg1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg1.test(this.conForm.apply_number)) {
          content = '身份证号格式错误'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.apply_phone) {
          content = '请填写申请人联系电话'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        let reg2 = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
        if (!reg2.test(this.conForm.apply_phone)) {
          content = '请填写正确的联系电话，固话前请加区号和-'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.bankCard) {
          content = '请填写申请人银行卡号'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        let reg3 = /^[1-9]{1}\d{10,18}$/;
        if (!reg3.test(this.conForm.bankCard)) {
          content = '银行卡号格式错误'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        if (!this.conForm.bankPhone) {
          content = '请填写申请人银行预留手机号'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
        let reg4 = /^1[3-9]\d{9}$/;
        if (!reg4.test(this.conForm.bankPhone)) {
          content = '手机号格式错误'
          this.messageObj = { content, type: 'error', status: true };
          return
        }
      }
      console.log('this.conform', this.conForm, this.preventDbcStatus)
      try{
        if (this.codeText != '重发验证码'&&this.codeText != '60s后可重发') {
          this.showModal = true;
          return;
        }
        // 防止重复提交
        if (this.preventDbcStatus) {
          return;
        }
        this.preventDbcStatus = true;
        let data = await this.API.homePage.subject4MiniApp(this.conForm);
        this.$store.dispatch('auth/initInfo', {info: data});
        if (data.apply_id) {
          this.conForm.apply_id = data.apply_id;
        }
        if (this.conForm.apply_type == 5) {
          // 个人认证
          console.log(data.apply_id)
          let aData = await this.API.homePage.verifyIdCard({
            apply_subject_id: data.apply_id
          });
          let query = this.$root.$mp.query;
          let go = query.go || '';
          let self = this;
          if (aData.status == 200) {
            //this.showModal = true;
            //this.applyId = data.apply_id;
            //this.timeout();
            this.messageObj = { content: aData.msg, type: 'success', status: true };
            let timer = setInterval(function(){
              clearInterval(timer)
              self.$router.push(go)
            },1500)
          } else if(aData.status == 201){
            this.messageObj = { content: aData.msg, type: 'error', status: true };
          }else {
            this.messageObj = { content: "系统繁忙，请稍后再试！", type: 'error', status: true };
          }
        } else {
          if (data.apply_id) {
            this.messageObj = { content: '企业实名认证已提交', type: 'success', status: true };
            setTimeout(() => {
              this.$router.replace({path:'/pages/index/applicantList', query});
            }, 1000)
          } else {
            this.messageObj = { content: data.desc || '服务器错误', type: 'error', status: true };
          }
        }
        this.preventDbcStatus = false;
        console.log(this.conForm);
      } catch (err) {
        this.preventDbcStatus = false;
      }

    },
    //定时器 发送验证码的定时器
    timeout () {
      var self = this;
      var second = 59;
      this.msgCodeTimer = setInterval(function(){
        if(second<=0){
          clearInterval(self.msgCodeTimer);
          second = 59;
          self.codeText = "重发验证码";
          self.preventCode = true;
        }else{
          self.codeText = second + "s后可重发";
          self.preventCode = false;
          second--;
        }
      }, 1000);
    },
    // 隐藏弹窗
    hideFn () {
      this.showModal = false;
    },
    // 弹窗回调
    confirmFn (data) {
      if (data) {
        console.log('确定回调')
      }
      else{
        console.log('取消回调')
      }
      this.showModal = false;
    },
    handleClickTab (ind) {
      let query = this.$root.$mp.query;
      console.log('tabparams', query, this.authInfo.apply_id, this.conForm)
      if (!query.type&&this.authInfo.apply_id) {
        console.log(123)
        this.messageObj = { content: '修改信息不能切换类型！', type: 'error', status: true };
        return;
      }
      this.conForm = {
        apply_id: null,
        apply_type:2,//主体类型
        is_default:'1', //是否默认主体
        apply_name:'',//姓名
        apply_number:'',//身份证号或信用代码
        apply_phone:'',//企业/申请人联系电话
        bankCard:'', // 申请人银行卡号
        standby1: null, // 营业执照
        standby1_name: null,
        is_checked: null, //1表示已实名认证过
        bankCard: null, // 银行卡号 个人
        bankPhone: null, //.银行预留手机号 个人
        bankName: null, //..企业 开户行名称
        bankCode: null, //..企业 开户行code
        inAcctNo: null // 企业 对公账户
      }
      this.tabActiveIndex = ind;
      ind === 1 ? this.conForm.apply_type = 5 : this.conForm.apply_type = 2;
    },
    async upload () {
      if (!this.conForm.apply_name){
        this.messageObj = { content: '请先填写企业名称', type: 'error', status: true };
        return;
      }
       wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log('choose', res, res.tempFilePaths[0].split('.'))
          let imgArr = res.tempFilePaths[0].split('.');
          let imgType = imgArr[imgArr.length - 1];
          if (imgArr[imgArr.length - 1] == 'png'||imgArr[imgArr.length - 1] == 'jpg'||imgArr[imgArr.length - 1] == 'jpeg') {
            wx.uploadFile({
              url: `${czUrl}/EvidenceController/uploadImg2Pdf.do`,
              header: interfaces.createAuthHeader(),
              filePath: res.tempFilePaths[0],
              formData: {fileName: this.conForm.apply_name},
              name: 'fileData',
              success: res => {
                let respData = JSON.parse(res.data);
                if (respData.url) {
                  this.conForm.standby1 = respData.url;
                  this.conForm.standby1_name = decodeURI(respData.fileName);
                  this.preview();
                  console.log('fileInfo', this.conForm.standby1, this.conForm.standby1_name)
                } else {
                  this.messageObj = { content: respData.desc || '上传失败', type: 'error', status: true };
                }
              },
              fail: err => { console.log('uploadfail', err) }
            })
          } else {
            this.messageObj = { content: '请上传JPG/JPEG/PNG格式文件', type: 'error', status: true };
          }
        },
        fail: err => { console.log(err) }
      })
    }
  }
}
</script>

<style lang="scss">
.authWrap{background: #fff;min-height: 100%;position: relative;
  .warning{line-height: 50px;color: #e47d03;font-size: 20px;background: #fde8a2;text-align: center;}
  .tabWrap{display: flex;background: #f8f8f8;
    .tabItem{width: 375px;text-align:center;
      p{display: inline-block;border-bottom: 8px solid #f8f8f8;line-height: 100px;font-size: 36px;color: #909090;font-weight: 500;}
    }
    .activeTab{
      p{border-bottom: 8px solid #22aaf7;color: #22aaf7;}
    }
  }
  .contentWrap{padding-bottom: 128px;
    .typeItem{display: flex;line-height: 90px;border-bottom: 1px solid #eee;font-size: 30px;margin: 0 30px;
      .typeDes{color:#333;flex-grow: 1;}
      .typeInfo{display: flex;text-align: right;color: #22aaf7;
        icon{height: 59px;width: 38px;line-height: 28px;padding-top: 32px;padding-right: 10px;}
      }
    }
    .inputGroup{padding-top: 20px;margin: 0 30px;
      .inputDes{line-height: 70px;font-size: 30px;color: #333;}
      >input{line-height: 66px;color: #909090;font-size: 28px;background: #f8f8f8;height: 66px;border-radius: 4px;padding-left: 15px;}
      .picker{line-height: 66px;color: #909090;font-size: 28px;background: #f8f8f8;height: 66px;border-radius: 4px;padding-left: 15px;}
      .uploadWrap{
        display: flex;
        .uploadDes{flex-grow: 1;padding-left: 54px;
          .topDes{font-size: 20px;color: #909090;width: 300px;line-height: 24px;padding-top: 16px;}
          .botDes{font-size: 20px;color: #909090;width: 300px;padding-top: 32px;line-height: 24px;}
        }
      }
      .upload{width: 176px;height: 176px;border: 1px dashed #eee;line-height: 170px;text-align: center;color: #eee;font-size: 60px;
        img{height: 100%;width: 100%;}
      }
      .bankWrap{position: absolute;top: 160px;left: 0;z-index: 100;background: #fff;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);width: 690px;
      padding: 10px 30px;height: 340px;overflow-y: auto;border-radius: 8px;transition: all .2s;
        .bankItem{line-height: 70px;color: #909090;font-size: 26px;}
      }
    }
    .comfirmBtn{line-height: 98px;color: #fff;font-size: 32px;background: #22aaf7;text-align: center;position: fixed;width: 100%;
      left: 0;bottom: 0;
    }
  }
  .maskBg{width: 100%;height: 100%;position: absolute;left: 0;top:0;background: rgba(0,0,0,.1);}
  .mymodal-dialog{width: 690px;margin-left: -345px;
    .modal-title{padding-top: 70px;text-align: center;font-size: 34px;line-height: 36px;color:#333;padding-bottom: 60px;}
    .mymodal-dialog-in .modal-content{margin-bottom: 60px;padding: 0 70px;
      .inputWrap{display: flex;}
      input{background: #f8f8f8;height: 70px;line-height: 70px;border-radius: 4px;width: 360px;text-align: left;padding-left: 15px;
        font-size: 26px;color: #909090;
      }
      .msgCode{width: 190px;height: 70px;line-height: 70px;text-align: center;background:#22aaf7;font-size: 22px;color: #fff;}
      .prenentMsg{background: #909090;}
    }
    .modal-footer{
      .btn_item{height: 104px;line-height: 104px;color: #22aaf7;font-size: 36px;}
    }
  }
  .imessage{
      display:none;width:750px;min-height:64px;line-height:2.3;position:fixed;top:0;left:0;right: 0;color:#fff;text-align:center;font-size:28px;z-index:10100;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background:#ed3f14;height: 64px;
      opacity: 0;transition: all 0.3s;
    }
  .showMsg{opacity: 1;display: block;}
  .successMsg{background: #19be6b;}
}
 
</style>

