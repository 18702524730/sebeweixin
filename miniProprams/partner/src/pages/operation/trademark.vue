<template>
  <div class="trademark">
    <div class="trademarkInfo">
      <div class="my_input">
        <div class="label_name">商标名称</div>
        <input type="text" v-model.lazy="trademarkDTO.trademarkName" placeholder="请输入商标名称" :maxlength="60" />
      </div>
      <div class="my_input">
        <div class="label_name">商标说明</div>
        <input type="text" v-model="trademarkDTO.trademarkDesc" placeholder="请输入商标说明" :maxlength="180" />
      </div>
      <div class="row-between file_card">
        <label>商标图样</label>
        <upImage :list="list" :imgUrl.sync="blackWhitePicUrl" valueName="blackWhitePicUrl" @doClick="editPic" @customize="autoCreat" @showActionList="saveData" :limit="true" :limitWid="1500" :limitHei="800"></upImage>
      </div>
    </div>
    <div class="row tip"><i>!</i><label>自动默认以“宋体字样自左向右排列”递交官方</label></div>
    <div class="fixed-bottom row-center bottomBar">
      <span class="lc save" @click="goNext">下一步</span>
    </div>
    <!-- 消息提示 -->
    <u-message />
  </div>
</template>
<script>
  import mixin from 'mixins/';
  import upImage from 'components/upImage';
  import { mapState, mapActions } from 'vuex'
  const uploadUrl = CONFIG.stewardUrl + '/steward/FileController/uploadData'
  export default{
    mixins: [mixin],
    components: {
      upImage
    },
    data() {
      return{
        salePrice:'', //服务单价
        list: [
          {
            id: 0,
            name: '自动生成'
          },
          {
            id: 1,
            name: '拍照'
          },
          {
            id: 2,
            name: '从相册选择'
          }
        ],
        uploadUrl: uploadUrl,
        isWorkOrder: false, // 是否是工单(作业流程)
        orderData: {},
        trademarkDTO: {
          trademarkName: '',
          trademarkDesc: '',
          blackWhitePicUrl: ''
        },
      }
    },
    computed: {
      ...mapState({
        blackWhitePicUrl: state => state.operation.blackWhitePicUrl,
      })
    },
    onShow () {

    },
    mounted() {
      this.orderData.index = this.$route.query.index;
      this.init();
      console.log('blackWhitePicUrl', this.blackWhitePicUrl)
    },
    methods: {
      // 计算字节
      computeBytes (str) {
        var num = str.length;
        for(var i = 0 ; i < num; i++) {
          if(str.charCodeAt(i) > 255){
              num++;
          }
        }
        return num;
      },
      // 从代客下单过来：salePrice=699  从作业过来：workOrderId=1234564
      async init() {
        let query = this.$root.$mp.query;
        console.log('trademark_query:', query)
        // 编辑图片页面跳回来的标记
        let fromEditPic = this.$storage.get('fromEditPic');
        this.isWorkOrder = !!query.workOrderId;
        if (this.isWorkOrder) {
          let d = this.$storage.get(query.workOrderId);
          console.log('获得工单缓存：', d)
          if (!d) {
            let ret = await this.API.order.findWorkOrderDetail({workOrderId: query.workOrderId})
            d = {
              workOrderService: ret.workOrderService || [],
              trademarkDTO: ret.trademarkDTO || {},
              workOrderId: query.workOrderId,
              salePrice: ret.payInfo.salePrice,
              storeCode: ret.storeCode,
            }
            console.log('缓存不存在，通过接口获取工单详情')
            this.$storage.set(query.workOrderId, d);
          }
          // 获取工单详情（本地缓存）
          this.orderData =  d || {};
          this.salePrice = d.salePrice;
        }else{
          // 获取自定义的详情数据（本地缓存）
          this.orderData = this.$storage.get('workOrderData') || this.orderData;
        }
        /*this.orderData = {
          "trademarkDTO": {
              "trademarkName": "kkk",
              "trademarkDesc": "商标说明商标说明",
              "blackWhitePicUrl": "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/BE777D908B95EB20239A31C870C0A633.png"
          },
        }*/
        this.trademarkDTO = this.orderData.trademarkDTO = this.orderData.trademarkDTO || {};
        if (this.blackWhitePicUrl) {
          // 从编辑图片页面跳回来，重新给值
          if (fromEditPic) {
            this.trademarkDTO.blackWhitePicUrl = this.blackWhitePicUrl;
          }else{
            // 清空
            this.updateImg('', 'blackWhitePicUrl');
          }
        }
        if (this.trademarkDTO.blackWhitePicUrl) {
          this.updateImg(this.trademarkDTO.blackWhitePicUrl, 'blackWhitePicUrl')
        }
        this.$storage.remove('fromEditPic');
      },
      ...mapActions('operation', [
        'updateImgUrl',
      ]),
      // 设置state中的数据
      updateImg(url, valueName) {
        this.updateImgUrl({url, valueName});
      },
      // 自动生成
      async autoCreat() {
        let name = this.trademarkDTO.trademarkName;
        if (!name) {
          this.tips('请输入商标名称');
          return;
        }
        let url = await this.API.operation.autoCreateTmPic(name);
        this.updateImg(url, 'blackWhitePicUrl');
      },
      // 缓存数据
      saveData() {
        let query = this.$root.$mp.query;
        this.$storage.set(this.isWorkOrder ? query.workOrderId : 'workOrderData', this.orderData);
      },
      // 有图片时，点击图片跳转
      editPic(url, valueName) {
        this.saveData();
        let ret = {
          path: '/pages/operation/editPic',
          query: {
            imgUrl: url,
            valueName,
          }
        }
        if (this.trademarkDTO.trademarkName) {
          ret.query.name = this.trademarkDTO.trademarkName;
          // 用于控制editPic页面 是否有'自动生成'菜单
          ret.query.isTrademark = 1;
        }
        this.$router.push(ret);
      },
      // 校验表单
      checkValid() {
        let name = this.trademarkDTO.trademarkName;
        let trademarkDesc = this.trademarkDTO.trademarkDesc;
        let blackWhitePicUrl = this.blackWhitePicUrl;
        if (!name) {
          this.tips('请输入商标名称');
          return false;
        }
        if (!trademarkDesc) {
          this.tips('请输入商标说明');
          return false;
        }
        if (!blackWhitePicUrl) {
          this.tips('请上传商标图样');
          return false;
        }
        if (this.computeBytes(name) > 60) {
          this.tips('商标名称限制60字节及以内');
          return false;
        }
        if (this.computeBytes(trademarkDesc) > 180) {
          this.tips('商标说明限制180字节及以内');
          return false;
        }
        return true;
      },
      // 下一步
      goNext() {
        // 这儿延时是避免input框的blur有延迟，导致获取的值错误
        setTimeout(()=>{
          if (!this.checkValid()) {return}
          let ret = this.$root.$mp.query;
          let query = {...ret};
          query.salePrice = query.salePrice ? query.salePrice : this.salePrice
          this.trademarkDTO.blackWhitePicUrl = this.blackWhitePicUrl;
          this.$storage.set(this.isWorkOrder ? query.workOrderId : 'workOrderData', this.orderData);
          this.$router.push({ path: '/pages/operation/category', query });
        }, 100)
      },
    },
    watch: {
      blackWhitePicUrl(){
        console.log(this.blackWhitePicUrl);
        this.trademarkDTO.blackWhitePicUrl = this.blackWhitePicUrl;
      }
    },
  }
</script>
<style lang="scss">
  .trademark{
    height: 100%;padding-top: 20px;
    .trademarkInfo{
      width: 100%;background-color: #fff;
      .file_card{height: 200px;padding: 0 20px;}
    }
    .tip{
      font-size:24px;color: #999;padding-left: 20px;margin-top: 20px;
      i{width:30px;height:30px;background:#FF9639;border-radius: 15px;color: #fff;text-align: center;font-size: 20px;}
      label{padding-left: 10px;}
    }
    .bottomBar{
      width: 100%; height: 98px;line-height: 98px;font-size: 32px;background-color: #fff;z-index: 2;
      span{flex: 1;color: #2F80F6;}
      .save{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
    }
  }
</style>
