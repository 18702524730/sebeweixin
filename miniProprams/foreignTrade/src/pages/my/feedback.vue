<template>
  <div class="feedback">
    <h3>详情描述</h3>
    <div class='con'>
      <textarea v-model="feedbackContent" placeholder="如果您对我们有什么建议、想法和期望，请告诉我们" maxlength="200"></textarea>
      <hr>
      <ul class="imgWrap">
        <li v-for="item in imgList" :key="index">
          <img :src="item">
        </li>
        <li>
          <div class="upload_item" @click="showPickListFn"><img src="~assets/img/icon/upload_bg.png"></div>
        </li>
      </ul>
    </div>
    <button class="submit" @click="submitFn">立即反馈</button>
    <p class="remind">不知如何描述问题：</p>
    <p class="remind">拨打<span @click="makePhoneCall('4000-315-426')">4000-315-426，</span>每天9:00-18:00专业客服为您解答</p>

    <u-message />
    <!-- 选择图片上传方式 -->
    <pickList :list="list" :showList.sync="showPick" @select="selectFn" @hide="hideFn" key="sho11wList"></pickList>
  </div>
</template>

<script>
  const wxUrl = CONFIG.wxUrl;
  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  import qs from 'qs'
  import pickList from 'components/pickList';

  export default {
    components: {
      pickList
    },
    data () {
      return {
        submitDisabled: false,
        list: [
          {title: '拍照', id: 1},
          {title: '从手机相册选择', id: 2}
        ],
        imgList: [],  //待上传的图片列表
        showPick: false,
        feedbackContent: '',
      }
    },
    methods: {
      // 输入结束时给变量赋值
      textAreaBlurFn (e) {
        this.feedbackContent = e.detail.value;
      },
      // 点击上传按钮
      showPickListFn () {
        this.showPick = true;
        console.log(this.showPick)
      },
      // 提交
      async submitFn () {
        let params = {
          opinionContent: this.feedbackContent,
          opinionImage: this.feedbackUrl
        }
        if (!params.opinionContent) {
          this.$message({content:'请填写详情描述', type:'error'});
          return
        }
        let resp = await this.API.my.addOpinionFeedback(params);
        Tips.success('提交成功');
        this.$router.push('/pages/my/my');
      },

      //校验 手机号 密码 验证码
      checkValid() {
        var postData = this.postData;
        var phone = postData.phone;
        var token = postData.token;
        if (!phone.trim()) {
          this.$message.error('请输入手机号')
          return false;
        } else if(!/^1\d{10}$/.test(phone)){
          this.$message.error('请输入正确的手机号');
          return false;
        }
        return true;
      },
      // 拨打客服电话
      makePhoneCall (phone) {
        wx.makePhoneCall({
          phoneNumber: phone
        })
      },
      hideFn(data) {
        this.showPick = data;
      },
      // 选择图片来源
      selectFn (data) {
        let self = this;
        let sourceType = ['camera'];
        if (data.id == 1) {  //拍照
          sourceType = ['camera'];
        }
        else if (data.id == 2) {   //从手机相册选择
          sourceType = ['camera', 'album'];
        }
        wx.chooseImage({
          count: 1,
          sourceType: sourceType,
          success: function(res) {
            console.log(res)
            self.imgList = self.imgList.concat(res.tempFilePaths);
            self.showPick = false;
            let tempFilePaths = res.tempFilePaths;
            wx.uploadFile({
              url: `${wxUrl}/steward/FileController/uploadData`, //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'fileData',
              formData:{
                'user': 'test'
              },
              success: function(res){
                let respData = JSON.parse(res.data);
                self.feedbackUrl = respData.url;
                self.$apply();
              }
            })
           }
        })
      },
      // 预览图片
      previewFn (item) {
        let urlList = this.imgList.map((info) => {
          return info.path
        })
        console.log(urlList)
        wx.previewImage({
          current: item.path, // 当前显示图片的http链接
          urls: urlList // 需要预览的图片http链接列表
        })
      },
    }
  }
</script>

<style lang='scss'>
  .feedback{
    background-color: #F8F8F8;min-height: 100%;justify-content: flex-start;
    h3{height:74px;line-height: 74px;font-size:28px;padding-left: 30px;color: #999;background-color: #F2F2F2;}
    .con{
      min-height: 540px;background-color: #fff;
      textarea{width: 100%;height: 353px;padding: 40px 30px;font-size:28px;line-height: 40px;}
      hr{background-color: #eee;margin-left: 30px;margin-right: 30px;height: 1rpx;}
      .imgWrap{
        padding: 30px;
        li{
          float: left;margin-right: 20px;
          img{width: 134px;height: 127px;}
        }
      }
    }
    .submit{margin: 30px auto 60px;width:690px;padding: 22px 0;text-align: center;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:5px;color: #fff;font-size:30px;line-height: 42px;border:0;display: block;}
    .remind{
      line-height: 32px;color:#999;text-align: center;margin-bottom: 15px;
      span{color:#4272FF;}
    }
  }
</style>
