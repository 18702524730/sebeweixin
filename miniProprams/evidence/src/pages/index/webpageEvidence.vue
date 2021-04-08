<template>
  <div class="web_deposit">
    <div class="header row-between">
      <p>剩余存证包数量：{{querycznum}}</p>
      <p class="to_shop"><span>购买存证包</span><img src="~assets/img/deposit/to_right.png" alt=""></p>
    </div>
    <div class="input_lists row-start">
      <p>申请人</p>
      <input type="text" v-model="name">
    </div>

    <div class="title">
      <p class="ml30">存证种类</p>
    </div>
    <div class="type_list">
      <p v-for="(item,$index) in typeNameLists" :key="item.name" class="mt20 ml20" :class="{'check_type':$index==typeIndex}" @click="checkType($index,item)">{{item.name}}</p>
    </div>

    <div class="title">
      <p class="ml30">存证网址</p>
    </div>
    <div class="web">
      <div class="web_input row-start">
        <input type="text" v-model="webUrl" placeholder="请输入所需存证的网址">
        <p @click="regTest">截取</p>
      </div>
      <div class="tips mt20 ml10">
        <p>1、不支持对要求登录的网页进行存证；</p>
        <p>2、请直接复制浏览器地址栏网址，所存网址需含http、https等相关元素；</p>
        <p>3、上传的存证版权归用户自己所有，未经用户授权，平台绝对不会私自使用</p>
        <p class="ml30">用户上传的作品。</p>
      </div>
    </div>

    <div class="title" v-if="imageUrl">
      <p class="ml30">证据信息</p>
    </div>
    <div class="evidence" v-if="imageUrl">
      <scroll-view class="evidenceData" scroll-x>
        <div class="row-start">
          <!-- <input type="text" placeholder="网页截图地址"> -->
          <p class="img_url" @click="previewImg">{{webUrl}}</p>
          <img class="ml30 mr30" src="~assets/img/deposit/preview.png" alt="" @click="previewImg">
          <p class="img_remove" @click="moveImg">删除</p>
        </div>
      </scroll-view>
    </div>

    <div class="footer row-between">
      <div class="row-start">
        <div class="name">
          <p class="name_title">扣除存证包</p>
          <p class="tips">（保存时间三年）</p>
        </div>
        <p class="number ml30">2<span>个</span></p>
      </div>
      <p class="btn" @click="addWeb">立即下单</p>
    </div>
    <!-- 消息提示 -->
    <u-message />
  </div>
</template>
<script>
import uMessage from 'components/weui/message';
  export default {
  	components: {
      uMessage
    },
    data () {
      return {
        typeNameLists:[
          {name:'电商维权',id:1},{name:'自媒体内容维权',id:2},{name:'设计作品未经授权发布',id:3},{name:'其他',id:8}
        ],
        typeIndex:3,
        webUrl:"https://www.ipsebe.com",
        querycznum:0,
        imageUrl:'',
        notarizationPurpose:''
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
    	async search(){
    		wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [] // 需要预览的图片http链接列表
        })
    		let resp = await this.API.homePage.querycznum();
    		if(resp){
    			wx.hideLoading()
    			this.querycznum = resp.data || 0;
    			if(resp.code == '4010008'){
    				// this.$router.push('/pages/authorize/authorize');
    				// return;
    			}
    			if(!resp.data){
    				this.$message({content:resp.desc, type: 'error' })
    			}
    		}
    	},
      checkType(index,item){
        this.typeIndex = index;
        this.notarizationPurpose = item.id;
      },
      regTest(){
	        this.cutImage()
        let strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
        + "[a-z]{2,6})" // first level domain- .com or .museum 
        + "(:[0-9]{1,4})?" // 端口- :80 
        + "((/?)|" // a slash isn't required if there is no file name 
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
        let re=new RegExp(strRegex);
        if (re.test(this.url)){
	        wx.showLoading({
	          title: '截取中...',
	        })
	        this.cutImage()
          console.log('成功')
        }else{ 
    			this.$message({content:'输入的存证网址有误', type: 'error' })
          console.log('失败')
        }
      },
      async cutImage(){//截取网页
      	let info = {
      		orderApplySubjectId:760,
      		urls:[this.webUrl]
      	}
      	console.log('测试接口数据',info)
      	let data = await this.API.homePage.addWebThread(info);
      	if(data.code == '4010008'){
      		this.$message({content:data.desc, type: 'error' });
      		return;
      	}
      	if(data.code == '0'){//截取成功，调用截图成功接口

      	}else{
      		this.$message({content:'网页截取失败', type: 'error' });
      	}
      },
      previewImg(){
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [] // 需要预览的图片http链接列表
        })
      },
      moveImg(){//删除截图
      	this.webUrl = '';
      	this.imageUrl = '';
      },
      addWeb(){
      	let data = {
      		czChannel:3,
      		payType:2,
      		// fileData:,//截图返回的订单号
      		notarizationType:1,
      		source:1,//业务来源
      		notarizationPurpose:this.notarizationPurpose,
      		// orderApplySubjectId:'',
      	}
      }
    },
    mounted(){
      this.search();
    }
  }
</script>
<style lang="scss">
.web_deposit{position: absolute;top:0;left:0;right:0;bottom:0;background-color:#f8f8f8;
  .header{padding:0 30px;height:80px;
    p{font-size:28px;line-height: 100%;color:#333;}
    .to_shop{color:#22aaf9;
      span{vertical-align: middle;}
      img{width:11px;height:23px;vertical-align: middle;margin-left: 12px;}
    }
  }
  .input_lists{height:88px;background-color:#fff;padding:0 30px;
    p{font-size:30px;color:#333;line-height:100%;vertical-align: middle;}
    input{color:#909090;font-size:30px;vertical-align: middle;margin-left:86px;width:450px;}
  }
  .title{height:80px;
    p{color:#909090;font-size:28px;line-height:80px;}
  }
  .type_list{background-color:#fff;padding:10px 10px 30px;
    p{width:336px;height:96px;border:1px solid #909090;border-radius:4px;font-size:28px;color:#909090;font-weight:500;text-align:center;line-height:94px;display:inline-block;}
    .check_type{border-color:#22aaf9;color:#22aaf9;background-color:#ebf8ff;}
  }
  .web{background-color:#fff;padding:30px;
    .web_input{
      input{border:1px solid #909090;color:#909090;border-radius:4px 0 0 4px;width:518px;height:78px;border-right:0;padding:0 10px;}
      p{width:174px;height:78px;background-color:#22aaf9;color:#fff;font-size:28px;text-align:center;line-height:78px;border-radius:0 8px 8px 0;}
    }
    .tips{
      p{font-size:20px;color:#909090;line-height:100%;}
    }
  }

  .evidence{background-color:#fff;width:100%;overflow-x: scroll;margin-bottom: 120px;
    .evidenceData{width:922px;
      div{padding-left: 30px;height:90px;
        .img_url{width:620px;font-size:28px;color:#333;line-height:90px;}
        img{width:48px;height:46px;}
        .img_remove{width:172px;height:90px;background-color:#fe1312;color:#fff;font-size:28px;text-align:center;line-height:90px;}
      }
    }
  }
  .footer{width:100%;height:100px;background-color:#fff;position: fixed;bottom:0;left:0;padding-left: 35px;
    .name{
      .name_title{font-size:30px;color:#333;}
      .tips{font-size:24px;color:#909090;}
    }
    .number{font-size:50px;color:#fa1313;
      span{font-size:30px;}
    }
    .btn{width:280px;height:100px;color:#fff;font-size:32px;text-align:center;line-height:100px;background-color:#22aaf9;}
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
}

</style>
