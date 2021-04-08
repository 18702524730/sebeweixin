<template>
  <div class="my_IPT_page">
  <web-view v-if="key" :src="wxUrl+'/H5/index.html#/myPearlIsland?key='+ key+'&isHaveStore='+isHaveStore+'&btnBol=1&member_id='+member_id" style="margin:0;padding:0;border:0;"></web-view>
  </div>
</template>

<script>
const wxUrl = CONFIG.wxUrl;
const iptUrl = CONFIG.iptUrl;
  export default {
    data () {
      return {
        url: '',
        key: '',
        wxUrl: wxUrl,
        isHaveStore:0,
        avatar:'',
        member_id:0,
      }
    },
    methods: {
    },
    onShareAppMessage() {
      let obj = {};
      let auth = this.$storage.get('auth');
      obj = {
        title: auth.truename + '送你20珍珠，再不领就快要失效啦！',
        path: "/pages/my/my_IPT?memberId="+ auth.member_id + "&shareId=23",
        imageUrl: '/static/icon/bgi.png'
      }
      return obj;
    },
    onLoad () {
      this.key='';
      this.member_id=0;
      this.isHaveStore=0;
      console.log('auth.key', this.$storage.get('auth'), this.$storage.get('key'));
      // 判断storage里是否有auth，没有的话跳转至授权页面
      let query = this.$root.$mp.query;
      console.log('dadadadadsdads', Object.assign({}, query, { path: '/pages/my/my_IPT', iptType: true }))
      if (!this.$storage.get('auth')) {
        this.$router.replace({path: '/pages/authorize/authorize', query: Object.assign({}, query, { path: '/pages/my/my_IPT', iptType: true })});
        return;
      }
      this.key=this.$storage.get('key');
      this.member_id = this.$storage.get('auth').member_id;
      this.isHaveStore = this.$storage.get('auth').isHaveStore;
      this.avatar = this.$storage.get('auth').avatar;
      console.log(this.member_id,'测试页面')
    },
    mouted(){
      let memberObj = this.$storage.get("memberObj");
      let params = {};
      if (memberObj.memberId) {
        params.memberId = parseInt(memberObj.memberId);
        params.type = memberObj.type;
        if (memberObj.shareId) {
          params.shareId = parseInt(memberObj.shareId);
        }
        console.log('params', params)
        wx.removeStorageSync('memberObj')
        this.API.interfaces.iptPowerDaily(params, {isLoading: false, errorAction: true});
      }
    }
  }
</script>

<style lang='scss'>
  .my_IPT_page {
    width: 100%; height: 100%; background: #180647;
    .line_wrap {
      margin-top: 0;
      .line_item {
        padding: 30px 0; align-items: flex-start;
        .rig {line-height: 50px;}
      }
    }
  }
</style>
