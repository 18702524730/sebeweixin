<template>
  <div class="web_deposit">
    <div class="header row-between">
      <p>剩余存证包数量：{{cznum}}</p>
      <p class="to_shop" @click="toCzb"><span>购买存证包</span><img src="~assets/img/deposit/to_right.png" alt=""></p>
    </div>
    <div class="input_lists row-start">
      <p>申请人</p>
      <div>{{authInfo.apply_name}}</div>
    </div>

    <div class="title">
      <p class="ml30">存证种类</p>
    </div>
    <div class="type_list">
      <p v-for="(item,$index) in typeNameLists" :key="item.name" class="mt20 ml20" :class="{'check_type':$index==typeIndex}" @click="checkType($index,item)">{{item.name}}</p>
    </div>
    <div class="title">
      <p class="ml30">取证名称</p>
    </div>
    <div class="web">
      <div class="web_input row-start qz_inp">
        <input type="text" v-model="qzName" placeholder="请输入取证名称">
      </div>
    </div>
    <div class="title">
      <p class="ml30">存证网址</p>
    </div>
    <div class="web">
      <div class="web_input row-start">
        <input type="text" v-model="url" placeholder="请输入所需存证的网址">
        <p @click="regTest">截取</p>
      </div>
      <div class="tips mt20 ml10">
        <p>1、不支持对要求登录的网页进行存证；</p>
        <p>2、请直接复制浏览器地址栏网址，所存网址需含http、https等相关元素；</p>
        <p>3、上传的存证版权归用户自己所有，未经用户授权，平台绝对不会私自使用</p>
        <p class="ml30">用户上传的作品。</p>
      </div>
    </div>

    <div class="title" v-if="imgUrls.length">
      <p class="ml30">证据信息</p>
    </div>
    <div class="evidence">
      <scroll-view class="evidenceData" scroll-x>
        <div class="row-start" v-for="(item,$index) in imgUrls" :key="item.evidId">
          <!-- <input type="text" placeholder="网页截图地址"> -->
          <p class="img_url">{{item.url}}</p>
          <span @click.stop="previewImg(item)">预览</span>
          <p class="img_remove" @click.stop="moveImg($index)">删除</p>
        </div>
      </scroll-view>
    </div>

    <div class="footer row-between">
      <div class="row-start">
        <div class="name">
          <p class="name_title">扣除存证包</p>
          <p class="tips">（保存时间三年）</p>
        </div>
        <p class="number ml30">{{imgUrls.length||0}}<span>个</span></p>
      </div>
      <p class="btn" @click="shopCzb">立即下单</p>
    </div>
    <u-message/>
    
    <u-modal :showModal="showModal" :content="content" :options="options" @confirmBtn="confirmFn" />
    <u-modal :showModal="showModalVerify" :content="contentVerify" :options="optionsVerify" @confirmBtn="confirmFnVerify" />
    <u-modal :showModal="showModalOrder" :content="contentOrder" :options="optionsOrder" @confirmBtn="confirmFnOrder" />
  </div>
</template>
<script>
  import {mapState} from 'vuex';
const { cartUrl, wxUrl, czUrl, indexUrl, userUrl } = CONFIG;
  export default {
    data () {
      return {
        qzName:'',
        typeNameLists:[
          {name:'电商维权',id:1},{name:'自媒体内容维权',id:2},{name:'设计作品未经授权发布',id:3},{name:'其他',id:8}
        ],
        typeIndex:3,
        url:'',
        timer:'',
        imgUrls:[],//网页截图列表
        access_token:'',
        czUrl:czUrl,
        cznum:0,
        notarizationPurpose:8,

        addUrls:false,

        evidId:[],
        showModal:false,
        showModalVerify:false,
        showModalOrder:false,

        content:'网页存证成功',
        contentVerify:'请您仔细核对网址，提交后不可修改',
        contentOrder:'订单生产失败，请重试',

        options: {
          showCancel: true,
          cancelText: '查看存证',
          cancelColor: '#000000',
          confirmText: '继续存证',
          confirmColor: '#22aaf9'
        },
        optionsVerify: {
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确认',
          confirmColor: '#22aaf9'
        },
        confirmFnOrder:{
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确认',
          confirmColor: '#22aaf9'
        },
        order_sn:''
      }
    },
    computed:{
      ...mapState('auth', ['authInfo'])
    },
    onUnload(){
      this.imgUrls = [];
      this.evidId = [];
      clearInterval(this.timer)
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
      toCzb(){//前往购买存证包
        this.$router.push({path: '/pages/index/serviceDetail', query: {from: '/pages/deposit/webDeposit'}})
      },
      checkType(index,item){//存证种类切换
        this.typeIndex = index;
        this.notarizationPurpose = item.id;
      },
      regTest(){//网页地址校验
        if(!this.url){
          this.$message({content: '请输入需要存证的网页地址', type: 'error'});
          return;
        }
        let strRegex = "^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+"; 
        let re=new RegExp(strRegex);
        if (re.test(this.url)){
          this.cutImage();
          console.log('成功1')
        }else{ 
          this.$message({content: '输入网址不合法，检查网址是否已包含http、https等元素', type: 'error'});
          console.log('失败')
        }
      },
      async cutImage(){//截取网页
        console.log("截取")
        if(this.imgUrls.length>=5){
          this.$message({content: '网页存证数量不能够超过五个', type: 'error'});
          return;
        }
        if(!this.url){
          this.$message({content: '请输入需要存证的网页地址', type: 'error'});
          return;
        }
        let data = {
          orderApplySubjectId: this.authInfo.apply_id,
          qzName:this.qzName,
          urls:[this.url]
        }
        let self = this;
        this.addUrls = true;//初始化
        try{
          let cutImg = await this.API.homePage.addWebThread(data);
          if(cutImg.desc == '请求成功'){
            self.cutImgSuccess(cutImg.data);
          }else{
            self.$message({content: cutImg.desc, type: 'error'});
          }
        }
        catch(e){}
      },
      cutImgSuccess(evidId){//截图是否成功
        console.log('截图是否成功');
        wx.showLoading({
          title: '网页截取中...',
        })
        let self = this;
        this.timer = setInterval(()=>{
          self.cutImageSuccess(evidId)
        },1000)
      },
      async cutImageSuccess(evidId){//截图是否成功请求接口
        let data = {
          evidId:evidId
        }
        try{
          let cutImg = await this.API.homePage.isSuccess4WebThread(data);
          if(cutImg.status=='1'&&this.addUrls){//请求十次或者是成功后就停止
            this.addUrls = false;
            clearInterval(this.timer);
            let imgUrl = {
              evidId:cutImg.evidId,
              url:this.url
            }
            this.url = '';
            this.evidId.push(cutImg.evidId);
            this.imgUrls.push(imgUrl)
            wx.hideLoading();
            return;
          }
        }
        catch(e){}
      },
      previewImg(item){//图片预览
        let url = this.czUrl+'/EvidenceController/downloadWebEvid.do?evidId='+item.evidId+'&access_token='+this.access_token;
        console.log(url)
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [url] // 需要预览的图片http链接列表
        })
      },
      moveImg(index){//删除截图
      let self = this;
        wx.showModal({
          title: '',
          content: '删除后无法恢复，是否确认删除该数据？',
          success(res) {
            if (res.confirm) {
              self.imgUrls.splice(index, 1);
              self.evidId.splice(index, 1);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      async czbNumber(){//存证包数量
        try{
          let cznum = await this.API.homePage.querycznum();
           this.cznum = cznum.data;
        }
        catch(e){}
      },
      async shopCzb(){//下单
        if(!this.imgUrls.length){
          this.$message({content: '请输入需要存证的网页地址并截取', type: 'error'});
          return;
        }
        let self = this;
        if(!this.cznum||this.cznum<this.imgUrls.length){//没有存证包或者是存证包数量不足，return
          wx.showModal({
            title: '',
            content: '抱歉，由于您的存证包数量不足，请前往购买存证包。',
            confirmText:"前往购买",
            success(res) {
              if (res.confirm) {
                this.$router.push({path: '/pages/index/serviceDetail', query: {from: '/pages/deposit/webDeposit'}})
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          }) 
          return;
        }
        console.log(this.authInfo);
        this.showModalVerify = true;
      },
      confirmFnVerify(info){
        if(info){
          this.showModalVerify = false;
          this.search();
        }else{
          this.showModalVerify = false;
        }
          
      },
      async search(){
        let self = this;
        let data = {
          orderApplySubjectId:this.authInfo.apply_id,
          notarizationPurpose:this.notarizationPurpose,
          source:1,
          notarizationType:1,
          fileData:this.evidId,
          payType:2,
          czChannel:6
        }
        try{
          let resp = await this.API.homePage.addWebAttestations(data);
          this.showModal = true;
          this.order_sn = resp.data[0].ordersn;
          // 初始化
          this.imgUrls = [];
          this.evidId = [];
        }
        catch(e){
          this.showModalOrder = true;
        }
      },
      // 弹框处理事件
      confirmFn (data) {
        console.log(data)
        if (data) {//继续存证
          //留在当前页面
          this.showModal = false;
        } else{//查看详情
          this.showModal = false;
          this.$router.push({path: '/pages/certificate/certificateWebDetail?order_sn='+this.order_sn});
        }
      },
      confirmFnOrder(info){
        this.showModalOrder = false;
      }
    },
    onShow(){
      this.czbNumber();
      this.access_token = this.$storage.get('key')
      clearInterval(this.timer)
      console.log(this.authInfo,'测试数据')
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
    div{color:#909090;font-size:30px;vertical-align: middle;margin-left:86px;width:450px;}
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
    .qz_inp{
      input{
        width: 692px;
        border-right: 1px solid #909090;
      }
    }
    .tips{
      p{font-size:20px;color:#909090;line-height:100%;}
    }
  }

  .evidence{background-color:#fff;width:100%;overflow-x: scroll;margin-bottom: 120px;
    .evidenceData{width:922px;
      div{padding-left: 30px;height:90px;
        .img_url{width:620px;font-size:28px;color:#333;line-height:90px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
        span{width:102px;line-height:46px;display: block;color:#22aaf9;font-size:28px;}
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
