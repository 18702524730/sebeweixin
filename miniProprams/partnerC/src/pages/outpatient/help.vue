<template>
  <div class="helpWrap">
    <div class="item row-between">
      <p><span class="require">*</span><span class="des">联系人</span></p>
      <input v-model="contactsName" maxlength="10" placeholder="请输入联系人姓名" />
    </div>
    <div class="item row-between">
      <p><span class="require">*</span><span class="des">联系电话</span></p>
      <input v-model="contactsPhone" maxlength="11" placeholder="请输入联系人电话" />
    </div>
    <div class="item row-between">
      <span class="des">经营平台</span>
      <input v-model="platform" maxlength="20" placeholder="请输入经营平台" />
    </div>
    <div class="item row-between">
      <span class="des">店铺名称</span>
      <input v-model="storeName" maxlength="20" placeholder="请输入店铺名称" />
    </div>
    <div class="item row-between">
      <p><span class="require">*</span><span class="des">需求类型</span></p>
      <picker
      mode="multiSelector"
      @change="bindMultiPickerChange"
      @columnchange="bindMultiPickerColumnChange"
      range-key="name"
      :value="multiIndex"
      :range="multiArray">
        <view class="picker" :style="{'color': pickState ? '#333' : '#ddd'}">
          {{ pickState ? multiArray[0][multiIndex[0]].name + '/' + multiArray[1][multiIndex[1]].name : '请选择' }}
          <i class="icon iconfont icon-jiantou" />
        </view>
      </picker>
    </div>
    <div class="des">
      <span class="require">*</span><span class="des">需求描述</span>
      <textarea v-model="demandDescribe" placeholder="请输入您的需求描述，最多500字" />
    </div>
    <div class="commitBtn" @click="submit">提交</div>
    <!-- 消息 -->
    <u-message  />
  </div>
</template>

<script>
  import utils from '@/utils/utils';
export default {
  data () {
    return {
      multiIndex: [],
      pickState: false,
      multiArray: [
        [
          { id: 0, name: '投诉维权' },
          { id: 1, name: '知产疑难' },
          { id: 2, name: '重点项目' }
        ], [
          { id: 0, name: '电商投诉维权' },
          { id: 1, name: '海关投诉维权' },
          { id: 2, name: '质监投诉维权' },
          { id: 3, name: '线下维权打假' }
        ]
      ],
      multiArrayList:[
        [
          { id: 0, name: '电商投诉维权' },
          { id: 1, name: '海关投诉维权' },
          { id: 2, name: '质监投诉维权' },
          { id: 3, name: '线下维权打假' }
        ],
        [
          { id: 0, name: '商标疑难' },
          { id: 1, name: '专利疑难' },
          { id: 2, name: '知识产权诉讼' }
        ],
        [
          { id: 0, name: '中国驰名商标' },
          { id: 1, name: '中国专利奖' },
          { id: 2, name: '中国质量奖' }
        ]
      ],
      contactsName:'',
      contactsPhone:'',
      platform:'',
      storeName:'',
      demandDescribe:'',
    }
  },
  components: {

  },

  methods: {
    ...utils.validator,  //注入表单校验方法
    async submit(){//校验并提交
      // console.log(this.multiArray[1][this.multiIndex[1]].name)
      if(!this.contactsName){
        this.$message({content:'请输入联系人姓名', type: 'warning' });
        return;
      }
      if(!this.contactsPhone){
        this.$message({content:'请输入联系人电话', type: 'warning' });
        return;
      }
      if (!this.isMobile(this.contactsPhone)) {
        this.$message({content:'请输入格式正确的手机号', type: 'error' })
        return
      }
      if(this.multiIndex.length < 2){
        this.$message({content:'请选择需求类型', type: 'warning' });
        return;
      }
      if(!this.demandDescribe){
        this.$message({content:'请输入您的需求描述，最多500字', type: 'warning' });
        return;
      }

      let data = {
        contactsPhone:this.contactsPhone,
        contactsName:this.contactsName,
        platform:this.platform,
        storeName:this.storeName,
        demandType:this.multiArray[1][this.multiIndex[1]].name,
        demandDescribe:this.demandDescribe,
      }
      console.log(data)
      try {
        let resp = await this.API.order.saveMemberDemand(data);
        this.pickState = false;
        this.multiIndex = [];
        this.contactsPhone = '';
        this.contactsName = '';
        this.platform = '';
        this.storeName = '';
        this.demandType = '';
        this.demandDescribe = '';
        this.$router.go(-1);
        console.log(resp)
      }
      catch (e) {
      }
    },
    // piker部分方法
    bindMultiPickerChange (e) {
      console.log(e, e.mp.detail.value)
      this.pickState = true;
      this.multiIndex = e.mp.detail.value
    },
    bindMultiPickerColumnChange (e) {
      let self = this;
      if(e.mp.detail.column == 0){
        self.multiIndex[e.mp.detail.column] = e.mp.detail.value;//给选中的一列赋值，避免选中后文案回到初始值
        self.$set(this.multiArray,1,self.multiArrayList[e.mp.detail.value]);//给第二列赋值，第一列变化，第二列以前联动
      }
      console.log(self.multiArray)
    }
  }
}
</script>

<style lang="scss">
.helpWrap{background: #fff;margin-top: 20px;padding: 0 20px;
  .item{display: flex;line-height: 90px;border-bottom:1px solid #eee;font-size: 28px;color: #333;
    input{flex-grow: 1;line-height: 90px;height: 90px;text-align: right;max-width:460px;}
    .require{color: #F64744;}
  }
  .des{
    span{line-height: 90px;}
    textarea{width: 100%;height: 190px;}
    .require{color: #F64744;}
  }
  .picker{width: 570px;text-align: right;position: relative;padding-right: 26px;
    .icon{position: absolute;right: 0px;top: 0;font-size: 20px;color: #ddd;height: 90px}
  }
  .commitBtn{width: 750px;height: 98px;line-height: 98px;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
    color: #fff;font-size: 32px; position: fixed;bottom: 0;left: 0;text-align: center;
  }
}
 
</style>
