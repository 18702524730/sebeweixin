<template>
  <div class="customerEdit" @click="showSuggest=false">
    <div class="customerWrap">
      <div class="subjectInfo">
        <h3>主体信息</h3>
        <div class="row-between selector">
          <label>主体类型</label>
          <picker @change="subjectChange" :value="index" :range="subjectTypeArr" :range-key="'name'" class="subject-picker">
            <div class="picker placeholder" v-if="subjectText=='请选择'">
              <label>请选择</label>
              <i class="icon iconfont icon-jiantou"></i>
            </div>
            <div class="picker" v-if="subjectText!='请选择'">
              <label>{{subjectText}}</label>
              <i class="icon iconfont icon-jiantou"></i>
            </div>
          </picker>
        </div>

        <div class="my_input" v-if="applyType==3 || applyType==4">
          <div class="label_name">{{applyType==3 ? '申请人姓名（英文）':'企业名称（英文）'}}</div>
          <input type="text"
            v-model.lazy="postData.applyNameEn"
            :maxlength="60"
            :placeholder="applyType==3 ? '请填写申请人英文姓名' : '请填写英文版企业名称'"/>
        </div>

        <div class="my_input search_box">
          <div class="label_name">{{applyType==1 ? '申请人姓名' : applyType==2 ? '申请人企业名称' : applyType==3 ? '申请人姓名（中文）':'企业名称（中文）'}}</div>
          <input type="text"
            v-model="applyName"
            :placeholder="namePlaceholder"
            :maxlength="applyType==1 ? 20 : 60"
            :confirmType="'done'"/>
            <!-- @change="nameChange" -->
          <div v-if="applyType==2" class="search" :class="{'hight': applyName && applyName.length>=2}" @click="nameChange">智能查询</div>
        </div>

        <div class="suggest" v-if="showSuggest && companyInfoData.length">
          <div v-for="(it, index) in companyInfoData" :key="index" @click="fillData(it.name)">{{it.name}}</div>
          <i class="icon iconfont icon-xiaochengxu-"></i>
        </div>

        <div class="my_input" v-if="applyType!=4">
          <div class="label_name">{{applyType==1 ? '申请人身份证号码' : applyType==2 ? '统一社会信用代码' : '申请人护照号'}}</div>
          <input type="text"
            v-model.lazy="postData.applyNumber"
            :placeholder="'请填写'+ (applyType==1 ? '申请人身份证号码' : applyType==2 ? '统一社会信用代码' : '申请人护照号')"
            confirm-type="next"
            :maxlength="applyType==3 ? 30 : 18"/>
        </div>

        <div class="my_input">
          <div class="label_name">{{(applyType==1 || applyType==3) ? '申请人联系电话' : '企业联系电话'}}</div>
          <input type="text"
            v-model.lazy="postData.applyPhone"
            :placeholder="'请填写'+ (applyType==1 || applyType==3) ? '申请人联系电话' : '企业联系电话'"
            :maxlength="(applyType==3 || applyType==4) ? 30 : 13"/>
        </div>

        <div class="row-between selector">
          <label>{{(applyType==1 || applyType==3) ? '申请人地址' : '企业注册地址'}}</label>
          <!-- <picker
            v-if="applyType==1 || applyType==2"
            mode="multiSelector"
            @change="areaChange"
            @columnchange="areaColumnChange"
            :value="multiIndex"
            :range="areaDataArr"
            :range-key="'name'"> -->
          <picker
            v-if="applyType==1 || applyType==2"
            mode="region"
            @change="areaChange"
            :value="region">
            <div class="picker placeholder" v-if="areaText=='请选择'">
              <label>请选择</label>
              <i class="icon iconfont icon-jiantou"></i>
            </div>
            <div class="picker" v-if="areaText!='请选择'">
              <label>{{areaText}}</label>
              <i class="icon iconfont icon-jiantou"></i>
            </div>
          </picker>
          <picker
            v-if="applyType==3 || applyType==4"
            mode="selector"
            @change="countryChange"
            :value="index"
            :range="countryArr"
            :range-key="'zh_name'">
            <div class="picker placeholder" v-if="countryText=='请选择'">
              <label>请选择</label>
              <i class="icon iconfont icon-jiantou"></i>
            </div>
            <div class="picker" v-if="countryText!='请选择'">
              <label>{{countryText}}</label>
              <i class="icon iconfont icon-jiantou"></i>
            </div>
          </picker>
        </div>
        <div class="my_input">
          <div class="label_name">{{(applyType==1 || applyType==3) ? '申请人详细地址' : '企业注册详细地址'}}</div>
          <input type="text"
            v-model.lazy="postData.applyAddress"
            :placeholder="'请填写'+ (applyType==1 || applyType==3) ? '申请人详细地址' : '企业注册详细地址'"
            :maxlength="80"/>
        </div>
        <div class="my_input">
          <div class="label_name">邮政编码</div>
          <input type="number"
            v-model.lazy="postData.applyZipCode"
            placeholder="请填写邮政编码"
            cursor-spacing="60"
            :maxlength="6"/>
        </div>
      </div>

      <div class="contactInfo">
        <h3>联系人信息</h3>
        <div class="my_input">
          <div class="label_name">联系人姓名</div>
          <input type="text"
            v-model.lazy="postData.contactsName"
            placeholder="请输入联系人姓名"
            cursor-spacing="70"
            :maxlength="60"/>
        </div>
        <div class="my_input">
          <div class="label_name">联系人电话</div>
          <input type="text"
            v-model.lazy="postData.contactsPhone"
            placeholder="请输入联系人电话"
            cursor-spacing="80"
            :maxlength="(applyType==3 || applyType==4) ? 30 : 13"/>
        </div>
      </div>

      <div class="row-between saveType" @click="saveToMemberInfo=!saveToMemberInfo" v-if="isInfo">
        <label>保存信息至已有客户</label><icon type="success" size="21" :color="saveToMemberInfo ? '#2F80F6' : '#EEEEEE'"/>
      </div>

      <!-- 申请人信息页面隐藏 -->
      <div class="file" v-if="!isInfo">
        <h3>主体证明文件</h3>
        <div class="row-between file_card">
          <label>{{applyType == 1 ? '申请人身份证正反面复印件（需签名）' : applyType == 2 ? '营业执照副本复印件（需盖公章）': applyType == 4 ? '企业登记证件（需加盖企业公章）' : '申请人护照（需签名）'}}</label>
          <upImage :imgUrl.sync="standby1" :valueName="'standby1'" @doClick="editPic"></upImage>
        </div>
        <div class="row-between file_card" v-if="applyType != 2">
          <label>{{applyType == 1 ? '个体工商户营业执照副本复印件（需签名）': applyType == 4 ? '企业登记证件译本1（需加盖企业公章）' : '中文护照译本1（需签名）'}}</label>
          <upImage :imgUrl.sync="standby2_1" :valueName="'standby2_1'" @doClick="editPic"></upImage>
        </div>
        <div class="row-between file_card" v-if="applyType == 3 || applyType == 4">
          <label>{{applyType == 4 ? '企业登记证件译本2（需加盖企业公章）' : '中文护照译本2（需签名）'}}</label>
          <upImage :imgUrl.sync="standby2_2" :valueName="'standby2_2'" @doClick="editPic"></upImage>
        </div>
        <div class="row-between file_card" v-if="applyType == 3 || applyType == 4">
          <label>{{applyType == 4 ? '企业登记证件译本3（需加盖企业公章）' : '中文护照译本3（需签名）'}}</label>
          <upImage :imgUrl.sync="standby2_3" :valueName="'standby2_3'" @doClick="editPic"></upImage>
        </div>
      </div>
    </div>

    <!-- 申请人信息 -->
    <div class="fixed-bottom row-center bottomBar" v-if="isInfo">
      <span class="lc del" @click="goCustomerList">选择已有客户</span><span class="lc save" @click="goNext">下一步</span>
    </div>

    <!-- 编辑客户 新增客户 -->
    <div class="fixed-bottom row-center bottomBar" v-if="!isInfo">
      <span class="lc del" v-if="isEdit" @click="del">删除</span><span class="lc save" @click="submitFn">保存</span>
    </div>

    <!-- 消息提示 -->
    <u-message />
    <mptoast/>
  </div>
</template>
<script>
  import mixin from 'mixins/';
  console.log(mixin)
  import { mapState, mapActions } from 'vuex'
  import Item from '@/components/infoItem.vue'
  import upImage from 'components/upImage';
  const subjectTypeArr = [
    {
      id: 1,
      name: '大陆个体'
    },
    {
      id: 2,
      name: '大陆企业'
    },
    {
      id: 3,
      name: '港澳台及境外个人'
    },
    {
      id: 4,
      name: '港澳台及境外企业'
    }
  ];
  const applySubject = {
    applyType: '',
    applyName: '',
    applyNameEn: '',
    applyNumber: '',
    applyPhone: '',
    applyEmail: '',
    applyZipCode: '',
    applyAreaInfo: '',
    applyAddress: '',
    contactsName: '',
    contactsPhone: '',
    saveToMemberInfo: true,
    standby1: '',
    standby2: ''
  }
  export default{
    components: {
      Item, upImage
    },
    mixins: [mixin],
    data() {
      return{
        applyName: '',
        options: {},
        showSuggest: false, //是否展示企业名称搜索结果
        saveToMemberInfo: true, //默认保存到已有客户
        companyInfoData:[], //企业信息数据
        applyType: 2, //默认选择 2大陆企业
        id: '', // 客户id
        isEdit: false, //是否是编辑和新增页面
        isInfo: true, //是否是信息填写页面
        subjectText: '请选择',
        subjectTypeArr: subjectTypeArr, //主体类型
        countryText: '请选择',
        countryArr: [{}], // 国家数据
        areaText: '请选择', // 省市区选中文字
        // areaDataArr: [[], [], []],
        // oriAreaDataArr: [],
        // multiIndex: [0, 0, 0],
        region: ['', '', ''], // 省市区选中数据
        postData: Object.assign({}, applySubject),
      }
    },
    computed: {
      namePlaceholder() {
        let ret = ''
        if (this.applyType == 1) {
          ret = '请填写申请人姓名'
        }else if(this.applyType == 2){
          ret = '请填写申请人企业名称'
        }else if(this.applyType == 3){
          ret = '请填写申请人中文姓名'
        }else if(this.applyType == 4){
          ret = '请填写中文版企业名称'
        }
        return ret;
      },
      ...mapState({
        standby1: state => state.operation.standby1,
        standby2_1: state => state.operation.standby2_1,
        standby2_2: state => state.operation.standby2_2,
        standby2_3: state => state.operation.standby2_3
      })
    },
    mounted() {
      this.getData();
    },
    onShow() {
      this.init();
    },
    onHide() {
      // 缓存一下
      if (this.isInfo) {
        let query = this.options;
        let data = this.$storage.get(query.workOrderId)
        data.applySubject = this.postData;
        this.$storage.set(query.workOrderId, data);
      }
    },
    onUnload() {
      this.resetAll();
      let query = this.options;
      if (query.id) {
        this.$storage.remove('customerItem_' + query.id);
      }
    },
    methods: {
      async init() {
        /*
         * isInfo=1 申请人信息空页; isInfo=1&id=xxx 申请人信息选择已有客户后;
         * id=xxx 编辑客户页; id=0 新增客户页
         */
        const pages = getCurrentPages();
        console.log('customerEidt_pages:', pages)
        console.log('customerEidt_options:', pages[pages.length-1].options)
        // BUG: this.$root.$mp.query 和 pages[pages.length-1].options 不一致
        let query = this.options = pages[pages.length-1].options;
        console.log('customerEdit_query:', query)
        this.isInfo = !!query.isInfo && (!!query.workOrderId || !!query.id);
        this.isEdit = !this.isInfo && query.id && query.id !== '0'
        let title = this.isInfo ? '申请人信息' : this.isEdit ? '编辑客户' : '新增客户'
        wx.setNavigationBarTitle({title});
        console.log('isInfo_isEdit：', this.isInfo, this.isEdit);
        if (this.isInfo) {
          let data = '';
          // query.id存在，说明是从选择已有客户回来
          if (query.id) {
            data = this.$storage.get('customerItem_' + query.id);
          }
          let d = {};
          if (!data) {
            d = this.$storage.get(query.workOrderId);
            if (!d || !d.applySubject) {
              d = await this.API.order.findWorkOrderDetail({workOrderId: query.workOrderId}) || {}
              console.log('缓存不存在，通过接口获取工单详情')
            }
            data = d.applySubject || {};
          }
          console.log('this.postData:', data);
          this.postData = data;
          this.applyName = data.applyName;
          this.$storage.set(query.workOrderId, {
            workOrderId: query.workOrderId,
            applySubject: d.applySubject || {},
            trademarkDTO: d.trademarkDTO || {},
          });
          this.initSelectBox();
          return;
        }
        if (this.isEdit) {
          this.id = query.id;
          await this.getCustomerInfo();
          this.applyName = this.postData.applyName;
          this.initSelectBox();
          let standby2 = this.postData.standby2 || '';
          if (standby2) {
            let [ standby2_1, standby2_2, standby2_3 ] = standby2.split(',');
            console.log(standby2_1, standby2_2, standby2_3)
            this.updateImg(standby2_1, 'standby2_1');
            this.updateImg(standby2_2, 'standby2_2');
            this.updateImg(standby2_3, 'standby2_3');
          }
          this.updateImg(this.postData.standby1, 'standby1');
        }else{
          // 上传选择面板或修改图片
          let isChoose = this.$storage.get('isChoose') || this.$storage.get('fromEditPic');
          if (isChoose) {
            this.$storage.remove('isChoose');
            this.$storage.remove('fromEditPic');
            return;
          }
          this.resetAll();
          this.initSelectBox();
          this.updateImg('', 'standby1');
        }
      },
      resetAll(){
        this.postData = {...applySubject};
        this.applyType = 2;
        this.applyName = '';
        this.areaText = '请选择'
      },
      // 初始化下拉框显示数据
      initSelectBox() {
        let applyType = this.postData.applyType;
        if (applyType) {
          this.applyType = applyType;
        }else{
          this.postData.applyType = this.applyType;
        }
        this.subjectText = subjectTypeArr[this.applyType-1].name;
        let applyAreaInfo = this.postData.applyAreaInfo;
        if (applyAreaInfo) {
          if (applyType == 1 || applyType == 2) {
            this.areaText = applyAreaInfo;
          }else{
            this.countryText = applyAreaInfo;
          }
        }
      },
      // 获取国家数据
      getData() {
        if (this.applyType == 3 || this.applyType == 4) {
          this.getCountryData();
        }else{
          // this.transAreaData();
        }
      },
      // 企业名称结果变化监听
      async nameChange(e) {
        let v = this.applyName;
        if (!v || v.length < 2) {
          // this.tips('请输入企业名称');
          return;
        }
        this.companyInfoData = await this.API.operation.findCompanyInfo(v) || [];
        if (this.companyInfoData.length) {
          this.showSuggest = true;
        }else{
          this.$mptoast('查询不到相关企业');
        }
      },
      // 搜索公司结果-点击填充
      async fillData(name) {
        this.showSuggest = false;
        let item = await this.API.operation.findCompanyDetail(name);
        this.applyName = item.applyName;
        this.postData.applyNumber = item.applyNumber;
        this.postData.applyPhone = item.applyPhone;
        this.postData.applyEmail = item.applyEmail;
        this.postData.applyZipCode = item.applyZipCode;
        this.postData.applyAddress = item.applyAreaInfo;
        this.areaText = item.applyAddress;
        this.postData.applyAreaInfo = item.applyAddress;
        this.companyInfoData = [];
      },
      // 校验表单下拉框
      checkAddress(isCountry) {
        let { applyAreaInfo, applyAddress, applyNumber } = this.postData;
        if (!applyAreaInfo) {
          this.tips(`请选择${isCountry?'国家':'地址'}`);
          return false;
        }
        if (!applyAddress) {
          this.tips('请输入详细地址');
          return false;
        }
        return true;
      },
      // 校验表单输入框
      checkForm(){
        let { checkEmpty, checkName, checkIdCard, checkPhone, checkEmail, checkZipCode, checkCompanyNumber, checkForeignPhone, checkAddress } = this;
        let { applyType, applyName, applyNameEn, applyNumber, applyPhone, applyEmail, applyZipCode, contactsName, contactsPhone } = this.postData;
        if (!applyType) {
          this.tips('请选择主体类型');
          return false
        }
        if (applyType == 1) {
          return checkName(applyName) && checkIdCard(applyNumber) && checkPhone(applyPhone) && checkAddress() && checkZipCode(applyZipCode) && checkName(contactsName, '联系人') && checkPhone(contactsPhone, '联系人') ;
        } else if(applyType == 2){
          return checkEmpty(applyName, '请填写申请人企业名称') && checkCompanyNumber(applyNumber) && checkPhone(applyPhone) && checkAddress() && checkZipCode(applyZipCode) && checkName(contactsName, '联系人') && checkPhone(contactsPhone, '联系人') ;
        } else if(applyType == 3){
          return checkEmpty(applyNameEn, '请填写申请人姓名（英文）') && checkEmpty(applyName, '请填写申请人姓名（中文）') && checkEmpty(applyNumber, '请填写申请人护照号') && checkPhone(applyPhone) && checkAddress(true) && checkZipCode(applyZipCode) && checkName(contactsName, '联系人') && checkPhone(contactsPhone, '联系人') ;
        } else if(applyType == 4){
          return checkEmpty(applyNameEn, '请填写企业名称（英文）') && checkEmpty(applyName, '请填写企业名称（中文）') && checkPhone(applyPhone) && checkAddress(true) && checkZipCode(applyZipCode) && checkName(contactsName, '联系人') && checkPhone(contactsPhone, '联系人') ;
        }
      },
      // 校验文件的上传
      checkPics() {
        let { checkEmpty, standby1, standby2_1, standby2_2, standby2_3 } = this;
        let { applyType } = this.postData;
        if (applyType == 1) {
          return checkEmpty(standby1, '请上传营业执照副本复印件') && checkEmpty(standby2_1, '请上传个体工商户营业执照副本复印件（需签名）');
        } else if(applyType == 2){
          return checkEmpty(standby1, '请上传营业执照副本复印件');
        } else if(applyType == 3){
          return checkEmpty(standby1, '请上传申请人护照') && checkEmpty(standby2_1 || standby2_2 || standby2_3, '请上传中文护照译本');
        } else if(applyType == 4){
          return checkEmpty(standby1, '请上传企业登记证件') && checkEmpty(standby2_1 || standby2_2 || standby2_3, '请上传企业登记证件译本');
        }
      },
      ...mapActions('operation', [
        'updateImgUrl',
      ]),
      // 设置state中数据
      updateImg(url, valueName) {
        this.updateImgUrl({url, valueName});
      },
      // 编辑图片文件
      editPic(url, valueName) {
        this.$router.push({
          path: '/pages/operation/editPic',
          query: {
            imgUrl: url,
            valueName,
          }
        });
      },
      // 编辑时，获取客户详情
      async getCustomerInfo() {
        this.postData = await this.API.operation.getCustomerItem(this.id);
      },
      // 转换地址接口数据 => [[], [], []]
      /*async transAreaData() {
        let areaDataArr = this.$storage.get('areaDataArr');
        if (!areaDataArr) {
          areaDataArr = this.oriAreaDataArr = await this.API.common.getAreaData();
        }
        this.oriAreaDataArr = areaDataArr;
        this.$storage.set('areaDataArr', areaDataArr);

        let arr = this.areaDataArr;
        this.oriAreaDataArr.forEach((item, index) => {
          let id = item.deep == 1 ? item.value : item.parent;
          let ret = {
            id: id,
            value: item.value,
            name: item.name
          }
          if (item.deep == 1) {
            arr[0].push(ret);
          }else if(item.deep == 2 && id == arr[0][0]['value']){
            arr[1].push(ret);
          }else if(item.deep == 3 && id == arr[1][0]['value']){
            arr[2].push(ret);
          }
        })
        return arr;
      },*/
      // 国家数据
      async getCountryData() {
        let countryArr = this.$storage.get('countryArr');
        if (!countryArr) {
          countryArr = this.countryArr = await this.API.common.getCountryData();
        }
        this.countryArr = countryArr;
        this.$storage.set('countryArr', countryArr);
      },
      // 主体类型切换
      subjectChange(e) {
        this.subjectText = subjectTypeArr[e.mp.detail.value].name;
        this.applyType = subjectTypeArr[e.mp.detail.value].id;
        this.postData = {...applySubject};
        if (this.applyType == 1 || this.applyType == 2) {
          this.areaText = '请选择'
        } else {
          this.countryText = '请选择'
          this.countryArr = [{}];
        }
        this.postData.applyType = this.applyType;
      },
      // 国家切换
      countryChange(e) {
        this.countryText = this.countryArr[e.mp.detail.value].zh_name;
        this.postData.applyAreaInfo = this.countryText;
      },
      // 省市区切换
      areaChange(e) {
        // let multiIndex = e.mp.detail.value;
        // let arr = this.areaDataArr;
        // this.areaText = [arr[0][multiIndex[0]].name, arr[1][multiIndex[1]].name, arr[2][multiIndex[2]].name].join(' ');
        this.region = e.mp.detail.value;
        this.areaText = this.region.join('');
        this.postData.applyAreaInfo = this.areaText;
      },
      // 省市区组件中每列切换
      /*areaColumnChange(e) {
        let arr = [].concat(this.areaDataArr);
        let column = e.mp.detail.column;
        let columnIndex = e.mp.detail.value;
        let v = arr[column][columnIndex].value;
        let d = this.oriAreaDataArr;
        arr[column + 1] = [];

        d.forEach((item, index) => {
          let id = item.parent;
          let ret = {
            id: id,
            value: item.value,
            name: item.name
          }
          //切换省时，初始化市的数据
          if (column == 0 && item.deep == 2 && id == v) {
            arr[1].push(ret);
          //切换市时，初始化区的数据
          }else if(column == 1 && item.deep == 3 && id == v){
            arr[2].push(ret);
          }
        })
        // 设置选中项
        this.multiIndex[column] = columnIndex;
        if (column == 0) {
          this.multiIndex[1] = 0;
          this.multiIndex[2] = 0;
        }else if(column == 1) {
          this.multiIndex[2] = 0;
        }
        this.areaDataArr = arr;
        //切换省时，还要初始化区的数据
        if (column == 0) {
          this.areaColumnChange({
            mp: {
              detail: {
                column: 1,
                value: 0,
              }
            }
          })
        }
      },*/
      // 组装standby2数据
      combineStandby2() {
        let arr = [];
        ['standby2_1', 'standby2_2', 'standby2_3'].forEach((name) => {
          if (this[name]) {
            arr.push(this[name])
          }
        });
        return arr.join();
      },
      // 删除
      del() {
        this.API.operation.delCustomerItem(this.id);
        this.$mptoast('删除成功');
        this.$router.back();
      },
      // 保存
      submitFn() {
        setTimeout(async ()=>{
          if (!this.checkForm()) {return}
          if (!this.checkPics()) {return}
          let { postData, standby1 } = this;
          postData.applySubjectId = this.id;
          postData.standby1 = standby1;
          postData.standby2 = this.combineStandby2();
          await this.API.operation.saveCustomerItem(postData);
          this.$mptoast('保存成功');
          let query = this.options;
          this.$storage.remove('customerItem_' + query.id);
          this.$router.back();
        }, 100)
      },
      // 去选择已有客户
      goCustomerList() {
        let query = this.options;
        if (query.id) {
          this.$storage.remove('customerItem_' + query.id);
        }
        this.$router.push({ path: '/pages/operation/customerList', query });
      },
      // 下一步
      goNext() {
        // 这儿延时是避免input框的blur有延迟，导致获取的值错误
        setTimeout(()=>{
          console.log(this.postData)
          if (!this.checkForm()) {return}
          let query = this.options;
          let ret = {...query}
          ret.applyType = this.applyType;
          this.postData.saveToMemberInfo = this.saveToMemberInfo;
          let data = this.$storage.get(query.workOrderId)
          data.applySubject = this.postData;
          // 本地缓存
          this.$storage.set(query.workOrderId, data);
          this.$storage.remove('customerItem_' + query.id);
          this.$router.push({ path: '/pages/operation/uploadMaterial', query: ret });
        }, 100)
      },
    },
    watch: {
      applyType() {
        let applyType = this.applyType;
        // 当postData不存在数据时，初始化postData
        if (!this.postData.applyType) {
          this.postData = {...applySubject};
          this.postData.applyType = applyType;
        }
        this.getData();
      },
      standby1() {
        console.log(this.standby1)
      },
      applyName() {
        this.postData.applyName = this.applyName;
      }
    }
  }
</script>
<style lang="scss">
  .customerEdit{
    height: 100%;padding-top: 20px;font-size: 28px;
    h3{font-size:26px;height:77px;line-height: 77px;padding-left: 20px;color: #999999;background-color: #fff;border-bottom:1px solid #eee;}
    .input-placeholder{color: #bbb;}
    .customerWrap{
      margin-bottom: 98px;
      .subjectInfo{
        background-color: #fff;
        .selector{
          height: 90px;padding: 0 10px 0 0;margin-left: 20px;border-bottom:1px solid #eee;
          //.subject-picker{width: 270px;}
          .placeholder{color: #bbb;}
          .picker{line-height: 40px;}
        }
        .suggest{
          background-color: #F8F8F8;position: relative;margin-top: -1px;padding: 20px;
          >div{
            height: 40px;line-height: 40px;font-size: 28px;margin-bottom: 10px;
            &:last-child{margin-bottom: 0;}
          }
          .icon{position: absolute;left: 110px; top: -32px;color: #F8F8F8;font-size: 40px;width: 40px;height: 40px;}
        }
        .my_input{
          font-size: 28px;
          &:last-child{border-bottom: 0;}
        }
        .search_box{
          input{flex-basis:360px;}
          .search{white-space:nowrap;height: 28px;line-height: 1;font-size: 28px;padding: 0 20px;border-left: 1px solid #ddd;color: #bbb;}
          .hight{color: #2F80F6;}
        }
      }
      .contactInfo{
        background-color: #fff;margin-top: 20px;
        .my_input{
          font-size: 28px;
          &:last-child{border-bottom: 0;}
        }
      }
      .saveType{
        height: 94px;line-height: 94px;margin: 20px 0 0;background-color: #fff;
        label{padding-left: 20px;}
        icon{margin-top: 40px;margin-right: 20px;}
      }
      .file{
        background-color: #fff;margin-top: 20px;
        .file_card{height: 200px;padding: 0 20px;}
      }
    }
    .bottomBar{
      width: 100%; height: 98px;line-height: 98px;font-size: 32px;background-color: #fff;z-index: 2;
      span{flex: 1;color: #2F80F6;}
      .save{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }
    .icon-jiantou{font-size: 20px;color: #ddd;width: 28px;height: 40px;text-align: right;}
  }
</style>
