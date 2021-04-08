<template>
  <div class="real_name_page">
    <div class="line_wrap">
      <div class="line_item img_item">
        <span class="lef">头像</span>
        <span class="rig" @click="changeImgFn">
          <image :src="infoObj.avatar" class="img" alt="" />
          <i class="iconfont detail icon-jiantou"></i>
        </span>
      </div>
      <info-item 
        name="昵称"
        :des="infoObj.truename ? infoObj.truename : ''"
        :showTips="nickInfoItem.showTips"
        :to="'/pages/my/nickName'">
      </info-item>

      
      <div class="line_item">
        <span class="lef">性别</span>
        <span class="rig" @click="showFn">
          <span>{{ sex }}</span>
          <i class="iconfont detail icon-jiantou"></i>
        </span>
      </div>
    </div>

    <div class="line_wrap">
      <div class="line_item">
        <div class="lef">手机号</div>
        <div class="rig">{{ infoObj.phone }}</div>
      </div>
      <info-item
      v-if="infoObj.email"
      name="邮箱"
      :des="infoObj.email"
      :to="'/pages/my/setMail'"></info-item>
    </div>

    

    <!-- <transition-up :show="show" @hide="hideFn">
      <div class="male_item">男性</div>
      <div class="male_item">女性</div>
    </transition-up> -->
    
  </div>
</template>

<script>
  const { wxUrl,indexUrl } = CONFIG;
  import interfaces from 'api/interfaces.js';

  export default {
    data () {
      return {
        show: false,
        phoneItem: {name: '手机号', des: '', id: 1, length: 10, showTips:true},
        emailItem: {name: '邮箱', des: '这是一个店铺介绍', id: 2, length: 20, showTips:false},
        nickInfoItem: {name: '昵称', des: '', id: 1, length: 12, showTips: true},
        infoObj: {},  //个人信息
        list: [{name:'男', id:1}, {name:'女', id:2}]
      }
    },
    computed: {
      sex () {
        if (this.infoObj.sex==1) {
          return '男'
        }
        if (this.infoObj.sex==2) {
          return '女'
        }
      }
    }, 
    methods: {
      // 更换头像
      changeImgFn () {
        let self = this;
        let typeList = ['拍照上传', '本地上传'];
        wx.showActionSheet({
          itemList: typeList,
          success:function(resp) {
            self.selectFn(resp.tapIndex+1);
            self.$storage.remove('invitPic')
          }
        })
      },
      // 选择图片来源
      selectFn (tyoe_) {
        let self = this;
        let sourceType = ['camera'];
        if (tyoe_ == 1) {  //拍照
          sourceType = ['camera'];
        }
        else if (tyoe_ == 2) {   //从手机相册选择
          sourceType = ['camera', 'album'];
        }
        wx.chooseImage({
          count: 1,
          sourceType: sourceType,
          success: function(res) {
            console.log(res)
            // self.imgList = self.imgList.concat(res.tempFilePaths);
            self.showPick = false;
            let tempFilePaths = res.tempFilePaths;
            wx.uploadFile({
              url: `${indexUrl}/file/upload.htm`, 
              header: interfaces.createAuthHeader(),
              filePath: tempFilePaths[0],
              name: 'fileData',
              formData:{
                'user': 'test'
              },
              success: function(res){
                let respData = JSON.parse(res.data);
                self.saveFn({avatar: respData.url});
              }
            })
           }
        })
      },
      // 查询个人信息
      async getPersonInfoFn () {
        try {
          let resp = await this.API.my.getPersonInfo();
          this.infoObj = resp;
          this.nickInfoItem.des = this.infoObj.nickname;
          // 更新缓存中的个人信息
          let auth = this.$storage.get('auth');
          let data_ = {...auth, ...resp};
          this.$storage.set('auth', data_);
        }
        catch (e) {}
      },
      showFn () {
        let self = this;
        let sexList = ['男', '女'];
        wx.showActionSheet({
          itemList: sexList,
          success:function(resp) {
            self.saveFn({sex: resp.tapIndex+1});
          }
        })
      },
      async saveFn (parms) {
        try {
          let resp = await this.API.my.savePersonInfo(parms);
          this.getPersonInfoFn(); //查询
        }
        catch (e) {}
      },
      hideFn () {
        this.show = false;
      }
    },
    onShow () {
      this.getPersonInfoFn();  //默认查询
    },
    // mounted () {
    //   this.getPersonInfoFn();  //默认查询
    // }
  }
</script>

<style lang='scss'>
  .real_name_page {
    width: 100%; height: 100%; background: #f8f8f8; 
    .male_item {width: 100%; height: 120px; line-height:120px; background:#fff; border-bottom:1px solid #eee; font-size:30px; text-align:center; }
    .img_item {
      line-height: 120px;
      .img {width: 90px; height: 90px; vertical-align: middle; margin-right: 20px;}
      .detail {vertical-align: middle;}
    }
  }
</style>
