<template>
  <div class="applicantWrap">
    <div class="itemWrap">
      <div class="applicantItem" v-for="(item, index) in dataList" :key="index" @click="goResult(item)">
        <div class="applicantName inline">{{item.apply_name}}</div>
        <span class="applicantType">{{item.applyText}}</span>
        <div class="label" v-if="item.is_checked">{{item.authText}}</div>
      </div>
      
    </div>
    <img v-if="dataList&&dataList.length === 0" src="~assets/img/certificate/null.png" alt="">
    <div class="addBtn" @click="addUser">
      <div class="userBtn">增加申请人</div>
    </div>
    <!-- <u-message /> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      dataList: []
    }
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
  async onShow () {
    this.dataList = [];
    if (this.$root.$mp.query.go == '/pages/index/fileEvidence') {
      await this.subject(2);
    }
    await this.subject(5);
  },
  
  methods: {
    ...mapActions('auth', [
      'initInfo'
    ]),
    // 
    addUser () {
      let query = this.$root.$mp.query;
      let go = query.go || '';
      if (this.dataList.length >= 10) {
        wx.showToast({
          title: '当前主体信息数量已达上限，可前往拾贝官网管理',
          icon: 'none',
          duration: 2000
        })
        // this.$message({content: '当前主体信息数量已达上限，可前往拾贝官网管理', type: 'error'});
        return;
      }
      this.$router.push({path: '/pages/index/infoAuth', query: { type: 'add', go }})
    },
    // 去结果页
    goResult (item) {
      this.$store.dispatch('auth/initInfo', {info: item});
      let query = this.$root.$mp.query;
      let go = query.go || '';
      if (item.is_checked == 1) {
        // 原创存证
        this.$router.push(go)
        // 网页存证
        // this.$router.push('/pages/deposit/webDeposit')
      } else {
        if (item.apply_type == 2) {
          if (item.is_checked == 2 || item.is_checked == 3) {
            // 跳转至结果页面
            this.$router.push({
              path: '/pages/index/authResult', query: {go}
            })
          } else {
            // 跳转至添加页面
            this.$router.push({
              path: '/pages/index/infoAuth', query: {go}
            })
          }
        }
        if (item.apply_type == 5) {
          // 跳转至添加页面
          this.$router.push({
            path: '/pages/index/infoAuth', query: {go}
          })
        }
      }

    },
    // 获取申请人、企业列表
    async subject (type) {
      let data = await this.API.homePage.subject({typesList: type, access_token: this.$storage.get('key')});
      data.elements.map(item => {
        if (item.apply_type === 2) {
          item.applyText = '大陆企业'
        } else {
          item.applyText = '大陆个人'
        }
        switch (item.is_checked) {
          case 1:
            item.authText = '已认证';
            return;
          case 2:
            item.authText = '待审核';
            return;
          case 3:
            item.authText = '待验证';
            return;
          case 4:
            item.authText = '认证失败';
            return;
          default:
            item.authText = '';
        }
      })
      this.dataList = [...this.dataList, ...data.elements];
      console.log('data', this.dataList)
    }
  }
}
</script>

<style lang="scss">
page{background: #fff;}
.applicantWrap{padding: 0 30px 0;min-height: 100%;text-align:center; >img{width: 542px;height: 315px;}
  .itemWrap{overflow-y: auto;min-height: 100%;padding-bottom: 168px;text-align: left;
    
  }
  .applicantItem{position: relative;border-bottom: 1px solid #eee;padding: 45px 0;
    .applicantName{font-size: 34px;color:#333;padding-right: 20px;line-height: 40px;display: inline-block;max-width: 580px;
      
    }
    .applicantType{font-size: 24px;color:#909090;}
    .label{position: absolute;right: 0;top: 0;display: block;width: 125px;height: 38px;line-height: 38px;background: #22aaf7;font-size: 24px;text-align: center;color:#fff;}
  }
  .userBtn{
    margin: 0 auto;width: 690px;height: 88px;line-height: 88px;color: #fff;font-size: 32px;border-radius: 44px;text-align: center;background: #22aaf7;
  }
  .addBtn{width: 100%;height: 168px;position: fixed;left: 0;bottom: 0;background: #fff;}
}
 
</style>
