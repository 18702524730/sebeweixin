<template>
  <div class="add_tit_wrap">
    <form @submit="goCustomer">
      <div class="add_tit">
        <div class="add_lists">
          <div class="lists_tit">商标名称</div>
          <div class="lists_input mb40 mt20">
            <input placeholder-class="placeholder" v-model="trademark.name" placeholder="请输入商标名称" max-length="20"/>
          </div>
          <div class="lists_tit">商标说明</div>
          <div class="lists_input mb40 mt20">
            <input type="number" placeholder-class="placeholder" v-model="trademark.explian" placeholder="请输入商标说明" max-length="11"cursor-spacing="60"/>
          </div>
          <div class="lists_tit">商标图样</div>
          <div class="lists_input mb40 mt20 clearfix">
            <div class="page">
              <div class="weui-uploader__bd">
                <div class="weui-uploader__files" id="uploaderFiles">
                  <block v-if="files">
                    <div class="weui-uploader__file" @click="predivImage" :id="files">
                      <image class="weui-uploader__img" :src="files" mode="aspectFill" />
                    </div>
                  </block>
                </div>
                <div class="weui-uploader__input-box" v-if="!files">
                  <div class="weui-uploader__input" @click="chooseImage"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn" @click="goCustomer">下一步</div>
      </div>
    </form>
  </div>
</template>
<script>
  import verifyUtils from '../../utils/utils.js';
  import qs from 'qs';
  export default{
    data(){
      return{
        trademark:{
          // name:''
        },
        // files:[],
        files:'',
        itemList:['自动生成', '拍照', '从相册选择']
      }
    },
    methods :{
      goCustomer() {
        // 表单校验，表单校验的内容必须在data里面定义，不然会报错
        var bol = verifyUtils.validator.isEmpty(this.trademark.name || '');
        console.log(bol)
      },
      chooseImage(){
        let self = this;
        wx.showActionSheet({
          itemList: this.itemList,
          success: function (res) {
            console.log("index：" + res.tapIndex, "用户选的值为：" + self.itemList[res.tapIndex]);
            if(res.tapIndex == 1){
              self.cameraAppendImage();
            }
            if(res.tapIndex == 2){
              self.albumAppendImage();
            }
            
          }
        });
      },
      albumAppendImage(){
        let self = this;
        wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            // self.files = self.files.concat(res.tempFilePaths)
            self.files = res.tempFilePaths;
          },
          fail: function () {
            console.log('fail');
          },
          complete: function () {
            console.log('commplete');
          }
        })
      },
      cameraAppendImage(){
        let self = this;
        wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            self.files = self.files.concat(res.tempFilePaths)
          },
          fail: function () {
            console.log('fail');
          },
          complete: function () {
            console.log('commplete');
          }
        })
      },
      predivImage(e) {
        console.log(e);
        wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.files // 需要预览的图片http链接列表
        })
      }
    },
    mounted(){
    }
  }
</script>
<style lang="scss">
.add_tit_wrap{background: #F5F5F5; min-height: 100%;}
.add_tit{width:100%;height:370px;background-image: linear-gradient(178deg, #2F80F6 0%, #43A0FF 100%);padding-top: 100px;box-sizing:border-box;
  .add_lists{background-color:#fff;width:690px;padding:60px 30px 40px;box-shadow: 0 8px 16px 0 rgba(47,128,246,0.09);border-radius:8px;margin:0 auto 40px;box-sizing:border-box;
    .lists_tit{
      color: #515F71;font-size:28px;line-height: 40px;position: relative;
      .txt_num{text-align: right;color: #B3BFD0;font-size:24px; position: absolute;right:0;top: 0;}
      text{color: #B3BFD0;}
    }
    .lists_input{border-bottom:1px solid #e5e5e5;padding-bottom: 20px;line-height:40px;font-size:28px;
      .placeholder{color: #B3BFD0;text-align: left;}
      textarea{color:#515F71;text-align: left;padding:0;text-overflow:clip;overflow:hidden;white-space:nowrap;width:630px;}
      input{color:#515f71;}
    }
  }
}

.btn{width:690px;height:96px;background-image: linear-gradient(147deg, #0096FF 0%, #2F80F6 100%);box-shadow: 0 8px 16px 0 rgba(47,128,246,0.30);border-radius: 8px;color:#fff;margin:0 auto;border:0px;font-size: 34px;text-align: center;line-height:94px;}
</style>
