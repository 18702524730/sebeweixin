<template>
  <div class="nickname_page">
    <div class="line_wrap">
      <div class="line_item">
        <input type="text" class="lef" v-model="inputVal" maxlength="12" v-if="typeName">
        <input type="text" class="lef" v-model="inputVal"  v-if="!typeName">
        <span class="rig" v-if="typeName">{{ nameLength }}/12</span>
      </div>
    </div>
    <div class="tips" v-if="typeName">温馨提示：{{ typeName }}最多12个字。</div>

    <button class="weui-btn weui-btn_warn bottom_fixed" type="warn" @click="saveFn">保存</button>

    <!-- 中间消息提示 -->
    <mptoast  />


    
  </div>
</template>

<script>
  import Filter from 'utils/utils'
  export default {
    data () {
      return {
        inputVal: '',  //输入的值
        typeName: '',
        type: '',
      }
    },
    computed: {
      nameLength: function() {
        return this.inputVal.length
      }
    },
    methods: {
      async saveFn () {
        let data = {};
        data[this.type] = this.inputVal;
        if (this.type == 'email' && !Filter.validator.isMail(this.inputVal)) {
          this.$mptoast({
            text: '邮箱格式错误',        // 显示文本
            icon:'error',          // 图标类型
            duration:  2000,        // 关闭时间
          })
          return
        }
        let resp = await this.API.my.savePersonInfo(data);
        this.$router.go(-1);
      }
    },
    onLoad () {
      let self = this;
      let query = self.$route.query;
      let title = '';
      self.type = query.type;
      switch (self.type) {
        case 'nickname': title='请输入昵称'; self.typeName='用户昵称'; break;
        case 'truename': title='设置姓名'; self.typeName='姓名'; break;
        case 'qq': title='设置QQ号'; self.typeName='QQ号码'; break;
        case 'email': title='设置邮箱'; self.typeName=''; break;
      }
      wx.setNavigationBarTitle({
        title: title
      })
      this.inputVal = query.des;
      this.nameLength = query.des.lenth; 
    },
  }
</script>

<style lang='scss'>
  .nickname_page {
    width: 100%; height: 100%; background: #f8f8f8; padding-top: 20px;
    .line_wrap {
      margin-top: 0;
      .line_item {height: 90px;}
      .lef {width: 100%;}
      .rig {color: #ddd;}
    }
    .tips {padding: 20px; color: #999; font-size: 26px;}
    .bottom_fixed {position: fixed; bottom: 0; width: 100%; height: 98px; line-height: 98px; padding:0; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%); text-align: center; color: #fff; font-size: 32px; border-radius: 0; }
  }
</style>
