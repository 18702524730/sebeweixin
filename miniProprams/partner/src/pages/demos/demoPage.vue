<template>
  <div class="demo_page">
    <!-- <div class="one_line">
      <u-navbar :tabs="tabs" :activeIndex="activeIndex" @selectTab="selectTabFn"  />
    </div> -->
    <div class="one_line">
      <u-navbar :tabs="tabs2" :activeIndex="activeIndex2" :marginLeft="marginLeft" @selectTab="selectTabFn2"   />
    </div>

    <div class="title">
      <div>按钮</div>
      <button>原始按钮</button>
      <button type="primary">高亮按钮</button>
      <button type="primary" disabled>禁用按钮</button>
      <button type="danger">高亮按钮</button>
      <button type="warn">高亮按钮</button>
      <button size="small">小按钮</button>
      <button size="small" type="primary">小高亮按钮</button>
    </div>

    <div class="title">
      <div>弹窗</div>
      <button class="weui-btn weui-btn_warn" type="warn" @click="showModalFn" >只有一个按钮弹窗</button>
      <button class="weui-btn weui-btn_warn" type="warn" @click="showModalFn2" >两个按钮弹窗</button>
    </div>
    <!-- 弹窗 -->
    <u-modal :showModal="showModal" :options="options" @confirmBtn="confirmFn" @hide="hideFn" />

    <div class="title">
      <div>顶部消息提示</div>
      <button class="weui-btn weui-btn_primary" @click="showMessageFn('success')" >顶部提示(成功)</button>
      <button class="weui-btn weui-btn_primary" type="success" @click="showMessageFn('warning')" >顶部提示(警示)</button>
      <button class="weui-btn weui-btn_primary" type="success" @click="showMessageFn('error')" >顶部提示(失败)</button>
      <button class="weui-btn weui-btn_primary" @click="showMessageFn()" >顶部提示(完整参数)</button>
    </div>
    <!-- 消息提示 -->
    <u-message />

    <div class="title">
      <div>中间消息提示</div>
      <button class="weui-btn weui-btn_primary" @click="showToast" >提示消息</button>
      <button class="weui-btn weui-btn_primary" @click="showToast(1)" >提示消息(完整参数-成功)</button>
      <button class="weui-btn weui-btn_primary" @click="showToast(2)" >提示消息(完整参数-失败)</button>
      <button class="weui-btn weui-btn_primary" @click="showToast(3)" >提示消息(完整参数-提示)</button>
    </div>
    <!-- 中间消息提示 -->
    <mptoast  />

    <div class="title">
      <div>输入框 （其他参考实名认证页面）</div>
      <u-input title="真实姓名" :value="testValue" placeholder="请输入"></u-input>
      <u-input title="身份证号码" placeholder="请输入"></u-input>
      <u-input title="验证码" isCode="true" :start="start" :second="second" @codeFn="codeSubmitFn" placeholder="请输入"></u-input>
    </div>
      <div>--复选框--</div>
      <div class="page__bd">
        <check-box
          :title="'value: ' + JSON.stringify(checkboxValue)"
          :options="checkboxOptions"
          v-model="checkboxValue"
        />
      </div>
    <div>--类目--</div>
    <div class="storeInfo">
      <item v-for="item in infoItem"
      :key="item.id"
      :name="item.name"
      :des="item.des"
      :to="'/pages/store/editInfo?id=' + item.id + '&length=' + item.length"></item>
        <!-- <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera> -->
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import qs from 'qs'


  //复制功能
  import Clipboard from 'clipboard';
  import Filters from 'utils/filters.js';
  const userUrl = CONFIG.userUrl;
  import CheckBox from '@/components/weui/checkBox.vue';
  import Item from '@/components/infoItem.vue'
  export default {
    data() {
      return {
        showModal: false,
        testValue: '测试姓名',
        options: {
          confirmText: '确定',
          confirmColor: '#4272FF'
        },
        tabs: ["企业客户", "个人客户"],
        activeIndex: 0,
        tabs2: ['全部', '待付款', '已付款', '已关闭'],
        activeIndex2: 0,
        marginLeft: 3,  //底部条距离左边的百分比
        checkboxOptions: [
          { label: '选项A', value: 'a', disabled: true },
          { label: '选项B', value: 'b' },
          { label: '选项C', value: 'c' },
        ],
        checkboxValue: ['a'],
        infoItem: [
          {name: '店铺名称', des: 'AAA', id: 1, length: 10},
          {name: '店铺介绍', des: '这是一个店铺介绍', id: 2, length: 20},
        ],
        ctx: ''
      }
    },
    components: {
      CheckBox, Item
    },
    mounted(){

    },
    methods: {
      // 选择导航
      selectTabFn (data) {
        this.activeIndex = data;
      },
      selectTabFn2 (data) {
        this.activeIndex2 = data;
      },
      showToast (type) {
        if (type == 1) {
          this.$mptoast({
            text: '温馨提示',        // 显示文本
            icon:'success',          // 图标类型
            duration:  2000,        // 关闭时间
            /*最后两个参数需要再定义，不然会样式乱掉*/
            // textClass: 'my-class',   // 样式类名
            // iconClass: 'icon-class' // 图标类名
          })
        }
        else if (type == 2) {
          this.$mptoast({
            text: '温馨提示',        // 显示文本
            icon:'error',          // 图标类型
            duration:  2000,        // 关闭时间
          })
        }
        else if (type == 3) {
          this.$mptoast({
            text: '温馨提示',        // 显示文本
            icon:'info',          // 图标类型
            duration:  2000,        // 关闭时间
          })
        }
        else{
          this.$mptoast('我是提示信息')
        }
      },
      showMessageFn (type) {
        if (type) {
          this.$message({content:'请输入手机号码', type: type })
        }
        else{
          this.$message({
            visible: true,
            content: '消息内容',  //内容
            duration: 3,  //显示秒数
            type: 'default', // default || success || warning || error
          })
        }
      },
      showModalFn () {
        this.showModal = true;
        this.options = {
          showCancel: false,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#4272FF'
        }
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
      showModalFn2 () {
        this.showModal = true;
        this.options = {
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#4272FF'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .demo_page {padding-top: 50px; }
  .title {
    padding: 20px; margin-top: 30px;
    button{margin-right: 20px;margin-top: 20px;}
  }
  .one_line {width: 100%; height:90px; margin-bottom:20px;}
</style>
