<template>
  <div class="homePage">
    <div class="card top" @click="goSelectUser(1)">
    	<img src="~assets/img/homePage/original.png" alt="">
    </div>
    <div class="card botttom" @click="goSelectUser(2)">
    	<img src="~assets/img/homePage/webEvidence.png" alt="">
    </div>
    <p class="service_btn">
    	<img src="~assets/img/homePage/hint.png" alt="">	
      <span class="ml20">根据所需选择服务</span>
    </p>
  </div>
</template>
<script>
import mixin from 'mixins/';
export default {
  mixins: [mixin],
  data () {
    return {
      Animation01:false,
      Animation02:false,
      Animation03:false
    }
  },
  async onShow(){
    //await this.checkLoginAndMark('index');
  },
    // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    obj = {
      path: "/pages/index/index"
    }
    return obj;
  },
  methods:{
    goSelectUser (type) {
      let go;
      if (type == 1) {
        go = '/pages/index/fileEvidence'
      } else {
        go = '/pages/deposit/webDeposit'
      }
      this.$router.push({
        path: '/pages/index/applicantList',
        query: { go }
      })
    },
    toOriginal(){//原创存证
      this.$router.push('/pages/index/fileEvidence')
    },
    webEvidence(){//网页存证
      this.$router.push('/pages/index/webpageEvidence')
    }
  },
  mounted(){
  }
}
</script>

<style lang='scss'>
.homePage{
	.card{width:750px;margin:0 auto;position: relative;}
	.top{
    img{width:750px;height:498px;}
  }
	.botttom{
    img{width:750px;height:510px;}
  }

	.service_btn{width:298px;height:50px;margin: 0 auto 0;border-radius:50px;border:1px solid #909090;text-align:center;
    span{color:#909090;font-size:22px;vertical-align: middle;}
    img{vertical-align: middle;width:30px;height:30px;}
	}
}
</style>