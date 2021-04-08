<template>
  <div class="add_tit_wrap">
    <div class="page">
      <div style="display:flex;">
        <div class="image_list mr30" v-for="(item,index) in imageList" :key="index">
          <img :src="item" alt="" mode="aspectFit">
          <img class="remove" src="../assets/img/icon/remove.png" @click="remove(index)" alt="">
        </div>

        <div class="uploader_img" @click="chooseImage">
          <img class="mt30" src="../assets/img/icon/carme.png" alt="">
          <p class="mt10">{{imageList.length}}/3</p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  const { cartUrl, wxUrl, userUrl, indexUrl } = CONFIG;
  export default{
    props:{
      wids:{
        type: String,
        default: '140'
      },
      higs:{
        type: String,
        default: '140'
      },
      // 上传文件url
      url:{
        type: String,
        default: `${indexUrl}/file/upload.htm`
      },
      // 接口参数字段名
      uploadKey: {
        type: String,
        default: 'fileData'
      },
      // 上传文件url对应的字段名
      valueName: {
        type: String,
        default: ''
      },
      // 点击图片跳转路径
      toUrl:{
        type: String,
        default: ''
      },
      imgUrl:{
        type: Array,
        default: []
      }
    },
    data(){
      return{
        imgUrl:[],
        showList:false,
        imageUrl:[],//调取接口返回的图片地址

        imageList:[],//当前页面展示用的图片列表
      }
    },
    methods :{
      chooseImage(){
        let self = this;
        console.log(self.imageList,11111111111111)
        if(self.imageList.length >= 3){
          return
        }
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album','camera'],
          success: function (res) {
            self.imageList.push(res.tempFilePaths);
            // 调用上传接口
            self.upFiles(res.tempFilePaths)
          },
          fail: function () {
            console.log('fail');
          },
          complete: function () {
            console.log('commplete');
          }
        })
      },
      upFiles(imgUrl){
        let self = this;
        wx.uploadFile({
          url: self.url, //仅为示例，非真实的接口地址
          filePath: imgUrl[0],
          name: this.uploadKey,
          header: this.API.interfaces.createAuthHeader(),
          success (res){
            let respData = JSON.parse(res.data);
            self.imageUrl.push(respData.url);
            // self.$emit('update:imgUrl', self.imageUrl);
            self.$emit('setUpImage', {url:self.imageUrl, valueName: self.valueName});
          }
        })
      },
      remove(index){
        this.imgUrl.splice(index,1);
        this.imageUrl.splice(index,1);
        this.imageList.splice(index,1);
        
        this.$emit('setUpImage', {url:this.imgUrl, valueName: this.valueName});
      }
    },
    onLoad(){
      console.log('低几次进入页面',this.imgUrl)
      if(!this.imgUrl.length){
        this.imageUrl = [];
        this.imageList = [];
      }else{
        self.$emit('setUpImage', {url:self.imgUrl, valueName: self.valueName});
        this.imageList = this.imgUrl;
      }
    }
  }
</script>
<style lang="scss">
.page{
  .uploader_img{width:140px;height:140px;border:1px dashed #ddd;text-align:center;font-size:0;
    img{width:40px;height:35px;}
    p{color:#ccc;font-size:24px;line-height:33px;border:0;}
  }
  .image_list{position: relative;
    img{width:140px;height:140px;border:1px dashed #ddd;}
    .remove{position: absolute;right:-18px;top:-18px;width:36px;height:36px;border:0;}
  }
}
</style>
