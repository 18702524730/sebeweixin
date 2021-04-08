<template>
  <div class="img_crop">
    <template v-if="!img">
      <h2>请上传商标图样</h2>
      <p class="top_tip">点击空白区域上传图片/滑动可裁剪</p>
    </template>
    <template v-if="img">
      <h2>滑动手指，裁切图片</h2>
      <p class="top_tip">背景越简洁，搜索准确度越精准哦~</p>
    </template>
    <div class="photo_up_wrap" v-if="!img" @click="wxUploadImg">
      <!-- <input type="file" id="uploads" ref="uploads" style="opacity: 0;width:100%;height: 100%;" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event)"> -->
      <!-- <div id="uploads" ref="uploads" style="opacity: 0;width:100%;height: 100%;" @click="uploadImg($event)"></div> -->
    </div>
    <vueCropper v-if="img"
      ref="cropper"
      :img="img"
      :outputSize="crop.size"
      :outputType="crop.outputType"
      :info="crop.info"
      :canScale="crop.canScale"
      :autoCrop="crop.autoCrop"
      :autoCropWidth="crop.width"
      :autoCropHeight="crop.height"
      :fixed="crop.fixed"
      :fixedNumber="crop.fixedNumber" class="photo_up_wrap ok" style="width:275px;height:275px;"
    ></vueCropper>
    <div class="footer"> <!-- style="position:absolute; clip:rect(0 0 0 0);" -->
      <button @click="finish">立即查询</button>
      <p>温馨提示：苹果手机拍照选图功能仅支持IOS9以上版本</p>
    </div>
    <cropTip></cropTip>
  </div>
</template>

<script>
  import qs from 'qs'
  import $ from 'jquery'
  import vueCropper from 'components/vue-cropper'
  import cropTip from 'components/cropTip.vue'
  //import { ToastPlugin ,Swiper, SwiperItem ,XDialog, Alert ,TransferDomDirective as TransferDom, Loading } from 'vux';
  //import { Tab, TabItem, Sticky } from 'vux';
  const cartUrl = CONFIG.cartUrl;
  const indexUrl =  CONFIG.indexUrl;
  export default {
    directives: {
      //TransferDom
    },
    components: {
        vueCropper,cropTip,
        //Tab,TabItem,Sticky,
        //Swiper, SwiperItem,XDialog,ToastPlugin,Loading, Alert
    },
    data () {
      return {
        testData:'',
        crop: {
          //img: '',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          width: 300,
          height: 250
        }
      }
    },
    mounted () {
      //this.setTitle();
      //this.setRightEmpty();
      //this.img = this.$store.state.anotherImg;
      this.$store.commit('updateSelectedTM', {
        selectedTMArr: []
      });
    },
    methods: {
      wxUploadImg(){
        var self = this;
        //self.testData = 'click55';
        this.chooseImage(function(dataURL){
          //self.testData = dataURL;
          if (dataURL.indexOf('base64') === -1) {
            dataURL = 'data:image/jpeg;base64,' + dataURL
          }
          self.$store.commit('changeImg', {
            img: dataURL
          });
          // changeAnotherImg用于重新上传后的原图
          self.$store.commit('changeAnotherImg', {
            anotherImg: dataURL
          });
        });
      },
      finish (type) {
        this.$refs.cropper.getCropData((data) => {
          this.$router.push({
            path:'imgSearchR'
          })
          this.$store.commit('changeImg', {
            img: data
          });
          this.$store.commit('changeAnotherImg', {
            anotherImg: ''
          });
        })
      },
      uploadImg (e) {
        var self = this;
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          self.convertImgToBase64(e.target.result, function(dataURL){
            //self.crop.img = dataURL;
            // changeImg用于以crop后的图
            self.$store.commit('changeImg', {
              img: dataURL
            });
            // changeAnotherImg用于重新上传后的原图
            self.$store.commit('changeAnotherImg', {
              anotherImg: dataURL
            });
          });
        }
        reader.readAsDataURL(file)
      },
      convertImgToBase64(url, callback) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
          var canvas = document.createElement('CANVAS');
          var ctx = canvas.getContext('2d');
          var dataURL;
          canvas.height = this.height;
          canvas.width = this.width;
          ctx.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL('image/jpeg', 0.65);
          callback(dataURL);
          img = null;
          canvas = null;
        };
        img.src = url;
      }
    },
    computed: {
      img () {
        var img = this.$store.state.anotherImg;
        /*if (img) {
          this.crop.img = img;
        }*/
        return img;
      }
    }
  };
</script>

<style lang='scss'>
  @import '~assets/css/adaptation.scss';
  .img_crop {
    background-color: #F8F8F8;height: 100vh;
    h2{color: #666;font-size: px(40);text-align: center;line-height: px(56);padding-top: px(90);}
    .top_tip{color: #999;font-size: px(30);text-align: center;line-height: px(42);margin-top: px(30);}
    .photo_up_wrap{
      height: px(550);width: px(550);margin: px(50) auto 0;background-color: #D9D9D9;background: #fff url(~assets/img/imgSearch/upload_no.png) 0 0 no-repeat;background-size: 100% 100%;
      #uploads{-webkit-tap-highlight-color: transparent;}
    }
    .photo_up_wrap.ok{
      background-image: url(~assets/img/imgSearch/upload_ok.png);
    }
    .footer{
      text-align: center;
      button{width: px(550); height: px(88);line-height: px(88);margin-top: px(60);background-image: linear-gradient(90deg, #337DFF 2%, #59AAFF 100%);border-radius: px(6);color: #fff;font-size: px(30);}
      p{line-height: px(37);font-size:px(26);color:#999;margin-top: px(30);}
    }
  }
</style>
