<template>
  <div class="custorWrap">
    <img v-if="imgUrl" :src="imgUrl" mode="widthFix" alt="" @click="previewImg">
    <div class="botMenu">
      <div @click="autoCreate" v-if="isTrademark">自动生成</div>
      <div @click="chooseImg('camera')">拍照</div>
      <div @click="chooseImg('album')">从相册选择</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const uploadUrl = CONFIG.indexUrl + '/file/upload.htm';
export default {
  data () {
    return {
      trademarkName: '', // 商标名称
      isTrademark: false, // 是否是商标图片，可调用自动生成
      imgUrl: '', // 图片链接
      valueName: '', // 图片变量字段名称
    }
  },
  components: {},
  mounted() {
    //name=sf&isTrademark=1&valueName=standby1&imgUrl=http://
    let query = this.$root.$mp.query;
    console.log('editPic_query:', query)
    if (this.$storage.get('fileName')) {
      wx.setNavigationBarTitle({
        title: this.$storage.get('fileName')
      })
    }
    this.trademarkName = query.name;
    // 控制是否有'自动生成'菜单
    this.isTrademark = this.trademarkName && query.isTrademark;
    this.valueName = query.valueName;
    this.imgUrl = query.imgUrl;
  },
  methods: {
    ...mapActions('operation', [
      'updateImgUrl',
    ]),
    async autoCreate() {
      let url = await this.API.operation.autoCreateTmPic(this.trademarkName);
      this.updateImgUrl({ url, valueName: 'blackWhitePicUrl' });
      console.log('blackWhitePicUrl:',this.$store.state.operation.blackWhitePicUrl)
      // 设置跳转来源标记，跳转后使用
      this.$storage.set('fromEditPic', 1);
      this.$router.go(-1);
    },
    previewImg () {
      wx.previewImage({
        current: this.imgUrl, // 当前显示图片的http链接
        urls: [this.imgUrl] // 需要预览的图片http链接列表
      })
    },
    async chooseImg (type) {
      let url = await this.API.common.uploadImg(type);
      this.updateImgUrl({url, valueName: this.valueName})
      console.log('blackWhitePicUrl:',this.$store.state.operation.blackWhitePicUrl)
      this.$storage.set('fromEditPic', 1);
      this.$router.go(-1);
    }
  },
}
</script>

<style lang="scss">
.custorWrap{
  img{width: 750px;}
  .botMenu{display: flex;position: fixed;bottom: 0;left: 0;height: 98px;border-top:1px solid #eee;width: 100%;background: #f8f8f8;
    >div{flex: 1;text-align: center;line-height: 98px;border-right:1px solid #eee;
      &:last-child{border-right: none;}
    }
  }
}
</style>
