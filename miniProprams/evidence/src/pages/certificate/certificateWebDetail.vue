<template>
  <div class="certificate_detail">
    <div class="images">
      <scroll-view class="imgList" scroll-x :class="{'maxWidth':detailsInfo.egzCzhUrl&&detailsInfo.zjlCzhUrl}">
        <div class="btnImg" @click="upImage(detailsInfo.egzCzhUrl)">点击查看图片</div>
        <img v-if="detailsInfo.egzCzhUrl"  @click="upImage(detailsInfo.egzCzhUrl)" src="~assets/img/deposit/groupGzs.f49ea5b.png" alt="">
        <img v-if="!detailsInfo.egzCzhUrl" class="ml40" src="~assets/img/deposit/egzCzhUrl.png" alt="">
      </scroll-view>
    </div>
    <scroll-view @touchstart="touchStart" @touchend="touchEnd" class="infoList" :class="{'maxHeight':bolHeight,'minHeight':!bolHeight}" scroll-y :scroll-top="firstTop">
      <div class="data_lists">
        <img src="~assets/img/deposit/more.png" alt="">
        <p>存证网址：<span class="name">{{detailsInfo.url}}</span><span class="look_img" @click="lookFileImage">查看</span></p> 
        <p>申请人：{{detailsInfo.name}}</p>
        <p>申请人身份证：{{detailsInfo.identificationCard}}</p>
        <p>存证渠道：{{czChannel==1?'司法鉴定存证':czChannel==2?'公证存证':czChannel==3?'公证存证':czChannel==4?'公证存证':czChannel==5?'司法鉴定存证':czChannel==6?'互联网公证存证':''}}</p>
        <p>存证种类：{{notarizationPurpose}}</p>
        <p>存证申请时间：{{createTime}}</p>
        <p>存证完成时间：{{updateTime}}</p>
        <p style="margin-bottom: 0;">存证到期时间：{{validTime}}</p>
      </div>
    </scroll-view>
    <null v-if="false"></null>
  </div>
</template>

<script>
import Filters from '../../utils/filters.js'
import Null from 'components/Null.vue';
import { log } from 'util';
const { czUrl } = CONFIG;
export default {
  components: {
    Null
  },
  data () {
    return {
      detailsInfo:{},
      bolHeight:true,
      firstTop:187,
      touchDotY:0,
      touchMoveY:0,
      access_token:''
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
    upImage(imageUrl){
      // wx.getImageInfo({ //将获取图片的信息
      //   src: imageUrl,// 需要下载的图片
      //   success(res){
      //     let filePath = res.path //得到本地的路径
      //     wx.saveImageToPhotosAlbum({
      //       filePath: filePath,
      //       success(res) {
      //         console.log(res)
      //         wx.showToast({
      //           title: '保存成功成功',
      //           icon: 'success'
      //         })
      //       }
      //     })
      //   }
      // })
      wx.downloadFile({
        // 示例 url，并非真实存在
        url: imageUrl,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    },
    async search(){
      let data = {
        order_sn:this.$root.$mp.query.order_sn
      }
      try{
        this.detailsInfo = await this.API.certificate.findNotarizationDetails(data);
        if(this.detailsInfo.fileId){
          
            console.log(this.detailsInfo.fileId)
            let data = {
              fileId:this.detailsInfo.fileId,
              preview:1,
              downType:3
            }
            await this.API.certificate.managerDownCunnarFile(data)
          
        }
      }
      catch(e){}
    },
    
    lookImage(url){
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    },
      // 触摸开始事件
    touchStart(e) {
      this.touchDotY = e.touches[0].pageY;
      this.bolHeight = true;
      console.log(this.touchDotY,'开始')
    },
     // 触摸结束事件
    touchEnd(e) {
      this.touchMoveY = e.mp.changedTouches[0].pageY;
      if(this.touchMoveY<this.touchDotY){//向上
        this.bolHeight = true;
        this.firstTop = 187;
        console.log('向上')
      }else if(this.touchMoveY==this.touchDotY){

      }else{
        this.firstTop = 0;
        this.bolHeight = false;
        console.log('向下')
      }
      console.log(this.touchMoveY,'结束')
    },
    lookFileImage(){
      let url = czUrl+'/cunnar/downSaveFile.do?fileId='+this.detailsInfo.fileId+'&access_token='+this.access_token;;
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    }
  },
  onShow(){
    this.access_token = this.$storage.get('key')
    this.search();
  },
  computed:{
    createTime:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return Filters.filters.dateFormat(this.detailsInfo.createTime);
      },
      set (value) {
      }
    },
    updateTime:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return Filters.filters.dateFormat(this.detailsInfo.updateTime);
      },
      set (value) {
      }
    },
    validTime:{
      // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
      get () {
        return Filters.filters.dateFormat(this.detailsInfo.validTime);
      },
      set (value) {
      }
    },
    notarizationPurpose(){
      return Filters.filters.notarizationUsesformat(this.detailsInfo.notarizationPurpose);
    },
    czChannel(){
      return this.detailsInfo.czChannel
      //return Filters.filters.czChannelFormat(this.detailsInfo.czChannel);
    },
    

  }
}
</script>

<style lang="scss">
.certificate_detail{position: absolute;top:0;left:0;right:0;bottom:0;background-color:#f8f8f8;
  .images{overflow: scroll;width:100%;}
  .maxWidth{width:1240px;}
  .imgList{overflow-x: scroll;height:750px;margin-top: 36px;white-space: nowrap;text-align:center;
    img{width:318px;height:450px;margin: 20px auto 0; display: block;}
    .btnImg{
      text-align: center;
      color: #22aaf9;
    }
  }
  .imageList{width:530px;height:750px;margin-left: 70px;}
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .maxHeight{height:676px;
    .data_lists{top:346px;}
  }
  .minHeight{height:456px;
    .data_lists{top:46px;}
  }
  .infoList{position: absolute;bottom:0;z-index: 20;text-align:center;font-size:0;
    img{width: 312px;height: 46px;position: absolute;top:-44px;left:50%;margin-left: -156px;}
    .data_lists{background-color:#fff;width:630px;border-radius:20px 20px 0 0;box-shadow:0 2px 6px 0 rgba(0,0,0,0.07);margin:0 auto 0;padding-left: 60px;padding-top:50px;height:630px;position: absolute;left:0;right:0;bottom:0;
      p{font-size:28px;color:#666;line-height:100%;margin-bottom: 42px;width:510px;text-align: left;position: relative;text-overflow:ellipsis;white-space :nowrap;}
        .look_img{position:absolute;right:0;top:0;color:#22aaf9;}
        .name{width: 320px;overflow-x: hidden;height:30px;text-overflow:ellipsis;white-space :nowrap;display: inline-block;vertical-align: middle;}
    }
  }

}

</style>
