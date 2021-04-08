<template>
 <div class="storeInfo">
  <div class="infoItem storeAvator">
    <div class="itemName">店铺头像</div>
    <div class="itemDes" @click="editAvator">
      <img v-if="storeInfo.avatar" :src="storeInfo.avatar" alt="">
    </div>
    <i class="icon iconfont icon-jiantou"></i>
  </div>
   <item v-for="item in infoItem"
   :key="item.id"
   :name="item.name"
   :des="item.des"
   :to="'/pages/store/editInfo?id=' + item.id + '&length=' + item.length"></item>

    <!-- <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera> -->
 </div>
</template>

<script>

import Item from './components/infoItem.vue'
const { indexUrl } = CONFIG;
import interfaces from 'api/interfaces.js';
export default {
  data () {
    return {
      infoItem: [
        {name: '店铺名称', des: 'AAA', id: 'storeName', length: 10},
        {name: '店铺介绍', des: '这是一个店铺介绍', id: 'introduce', length: 20},
      ],
      ctx: '',
      storeInfo: ''
    }
  },
  components: {
    Item
  },
  onLoad () {
    // this.ctx = wx.createCameraContext()
    this.getStoreInfo()
  },
  onShow () {
    this.getStoreInfo()
  },
  methods: {
    async getStoreInfo () {
      let data = await this.API.store.storeInfo({})
      if (data) {
        this.storeInfo = data
        this.$storage.set("storeInfo", this.storeInfo);
        this.infoItem[0].des = data.storeName
        this.infoItem[1].des = data.introduce
      }
    },
    editAvator () {
      let that = this;
      wx.showActionSheet({
        itemList: ['拍照', '从手机相册选择'],
        success: res => {
          console.log(res.tapIndex)
            wx.chooseImage({
              count: 1,
              sourceType: ['camera', 'album'],
              success: res => {
                console.log(res)
                let tempImagePath = res.tempFilePaths;
                // this.API.common.uploadFile({fileData: res.tempFilePaths[0]}).then(res => {
                //   console.log(res)
                // })
                wx.uploadFile({
                  url: `${indexUrl}/file/upload.htm`,
                  header: interfaces.createAuthHeader(),
                  filePath: tempImagePath[0],
                  name: 'fileData',
                  formData:{
                    'user': 'test'
                  },
                  success: async (res) => {
                    let respData = JSON.parse(res.data);
                    let params = { avatar: respData.url }
                    await this.API.store.updateStoreInfo({ storeCode: this.$storage.get('storeCode'), storeInfo: params })
                    this.getStoreInfo()
                  }
                });
              }
            })

        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
page{background: #f8f8f8;}
.storeInfo{background: #fff;margin-top: 20px;
  .storeAvator{height: 118px;line-height: 118px;
    .itemDes{line-height: 118px;
      img{width: 90px;height: 90px;margin-top: 14px;border-radius: 45px;}
    }
  }
  >div{
    &:last-child{border-bottom: none;}
  }
}
</style>
