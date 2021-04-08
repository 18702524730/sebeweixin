<template>
<div class="cardWarp">
  <div class="editCard">
    <div class="inputItem">
      <input type="text" :maxlength="length" v-model="des" :placeholder="placeholder">
      <div class="textLen">{{des.length}}/{{length}}</div>
    </div>
   <p v-if="showTips">温馨提示：{{tips}}</p>
 </div>
 <button type="primary" @click="handleSave">保存</button>
 <u-message />
</div>

</template>

<script>
export default {
  data() {
    return {
      showTips: true,
      tips: '',
      length: 10,
      des: '',
      btnState: false,
      placeholder: ''
    }
  },
  components: {},
  onLoad () {
    wx.setNavigationBarTitle({
      title: this.$route.query.title || '修改信息'
    })
    this.showTips = this.$route.query.showTips;
    this.tips = `${this.$route.query.title}最多${this.$route.query.length}字`
    this.length = this.$route.query.length;
    this.des = this.$route.query.des;
    this.type = this.$route.query.type || '';
    this.placeholder = '请输入您的'+this.$route.query.title;
  },
  mounted () {
    console.log(this.$route.query)
  },
  methods: {
    handleClearInput () {
      this.des = ''
    },
    async handleSave () {
      console.log(1)
      let msg = true
      if (!this.des) {
        this.$message({content: '输入不能为空', type: 'error' })
        return
      }
      console.log(2)
      if (this.type == 'phone') {
        if (!/^1[3-9][0-9]{9}$/.test(this.des)) {
          console.log('手机号格式不正确')
        }
      }
      let aa = this.$route.query.id;
      console.log(aa)
      let params;
      if (this.$route.query.id == 'storeName') {
        params = { storeName: this.des }
      } else {
        params = { introduce: this.des }
      }
      console.log(3)
      await this.API.store.updateStoreInfo({ storeCode: this.$storage.get('storeCode'), storeInfo: params })
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
page{background: #f8f8f8;}
.cardWarp{margin: 20px 0 0;
  button{
    position: fixed;
    padding: 0;
    bottom: 0;
    width: 750px;
    border-radius: 0;
    display:block;
    font-size: 32px;
    background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);
    line-height: 98px;
  }
}
.editCard{margin-bottom: 40px;border-radius: 10px;
  .inputItem{display: flex;background: #fff;padding: 0 20px;margin-bottom: 20px;
    input{height: 90px;line-height: 90px;flex-grow: 1;font-size: 30px;}
    .clearIcon{padding: 24px 0 0 20px}
    .textLen{line-height: 90px;color: #bbb;font-size: 28px;}
  }
  
  
  p{height: 37px;line-height: 37px;color: #999;font-size: 26px;padding-left: 20px;}
}
</style>
