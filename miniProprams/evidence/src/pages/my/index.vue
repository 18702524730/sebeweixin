<template>
  <div class="myWrap">
    <div class="title">
    	<div class="title_info">
    		<img :src="authInfo.avatar" alt="">
    		<p v-if="sessionRes.isLogin">{{authInfo.truename}}</p>
				<h1 v-else>您还未登录，请先 <span @click="tologin">登录</span></h1>
    	</div>
    	<i class="bgi_01"></i>
    	<i class="bgi_02"></i>
    	<i class="bgi_03"></i>
    	<i class="bgi_04"></i>
    	<i class="bgi_05"></i>
    </div>
		<div class="my_lists mt20">
			<div class="row-between" @click="toOriginal">
				<p>我的原创存证</p>
				<p class="toList">{{czLists.ycCount||0}}个<i></i></p>
			</div>
			<div class="row-between" @click="toWeb">
				<p>我的网页存证</p>
				<p class="toList">{{czLists.wyCount||0}}个<i></i></p>
			</div>
			<div class="row-between" @click="toPackage">
				<p>我的存证包</p>
				<p class="toList">{{czLists.leftCzNum||0}}个<i></i></p>
			</div>
		</div>
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
    	Animation03:false,
      czLists:[],
      authInfo:{},
			sessionRes:''
    }
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
		tologin(){
			this.checkLoginAndMark('index');
		},
    toOriginal(){
      this.$router.push('/pages/certificate/OriginalLists')
    },
    toWeb(){
      this.$router.push('/pages/certificate/webCertificate')
    },
    toPackage(){
      this.$router.push('/pages/certificate/certificateBag')
    },
    async searchLists(){
      try{
        this.czLists = await this.API.my.findStaticCount();
      }
      catch(e){
      }
      console.log(this.czLists,'测试')
    }
  },
  async onShow(){
		this.sessionRes = await this.API.interfaces.checkLogin();
		if(this.sessionRes.isLogin){
			this.authInfo = this.$storage.get('auth');
			this.searchLists();
		}
  }
}
</script>

<style lang="scss">
.myWrap{position: absolute;top:0;left:0;right:0;bottom:0;background-color:#f8f8f8;
	.title{width:100%;height:500px;background-color:#2f84fe;position: relative;overflow: hidden;
		.title_info{width:100%;text-align:center;position: absolute;top:100px;left:0;z-index: 10;
			img{border:6px solid #fff;width: 234px;height:234px;border-radius:100%;box-shadow:0px 0px 20px 0px rgba(91,161,252,0.8);}
			p{font-size:36px;color:#fff;line-height:100%;margin-top: 15px;}
			h1{
				font-size:30px;
				padding: 10px;
				margin-top: 20px;
				background: rgba(255,255,255,.6);
				span{
					color: #2F80F6;
				}
			}
		}
		i{box-shadow:0px 0px 20px 0px rgba(91,161,252,0.8);border-radius:100%;background-color:#fff;opacity: 0.05;position: absolute;z-index: 1;left:50%;}
		.bgi_01{width: 316px;height:316px;top:59px;margin-left: -158px;}
		.bgi_02{width: 406px;height:406px;top:9px;margin-left: -203px;}
		.bgi_03{width: 496px;height:496px;top:-41px;margin-left: -248px;}
		.bgi_04{width: 586px;height:586px;top:-91px;margin-left: -293px;}
		.bgi_05{width: 676px;height:676px;top:-141px;margin-left: -338px;}
	}
	.my_lists{width:100%;background-color:#fff;
		>div{width:693px;margin-left:30px;border-bottom:1px solid #eee;height:97px;padding-left: 20px;
			p{font-size:28px;color:#333;
				i{width:16px;height:16px;border-top:1px solid #333;border-right:1px solid #333;transform:rotate(45deg);}
			}
		}
	}
}

</style>
