<template>
  <div class="materials_center">
    <div class="mid_content" v-for="(curDroupData, index) in materialDataArr" :key="index">
      <div class="categoryItem" :class="{'itemHight': curDroupData.checkedNum}" @click="handleClickTitle(curDroupData, index)">
        <div class="itemName">
          <!-- <span id="triangle-left" :class="[curDroupData.state ? 'icon-x' : '', '']"></span> -->
          <i class="icon iconfont icon-xiaochengxu-1" :class="[curDroupData.state ? 'icon-x' : '', '']"></i>
          <p>{{curDroupData.title}}</p>
        </div>
        <i class="icon iconfont icon-jiantou " :class="[curDroupData.state ? 'icon-s' : 'icon-x', '']" ></i>
      </div>
      <div class="categoryItemMinWrap" v-if="curDroupData.state">
        <div class="row-between categoryItemMin" :class="{ 'nodata': !it}" v-for="(it, idx) in curDroupData.subMaterials" :key="idx">
          <label @click.stop="preview(it)" :style="{color: it.checked ? '#2F80F6' : '#333'}" v-if="it">{{it.title}}</label><icon @click="doCheck2(it, idx, index)" v-if="it" type="success" size="19" :color="it.checked ? '#2F80F6' : '#EEEEEE'"/>
        </div>
      </div>
    </div>

    <div class="row-between bottomBar">
      <div class="allCheck">
        <label class="row my-cell" @click="allCheck">
          <icon type="success" size="23" :color="allChecked ? '#2F80F6' : '#eeeeee'"/>
          <div class="ml15 my_cell_bd">全选</div>
        </label>
      </div>
      <div class="toEmail" @click="showEmailPop">发送到邮箱</div>
      <!-- <div class="toPhone" @click="downloadFn">下载到手机</div> -->
    </div>

    <transition-up :show="visible" @hide="hideFn">
      <emailPopup :email.sync="email" @hide="hideFn" @submit="toEmail"></emailPopup>
    </transition-up>

    <mptoast />
    <!-- 消息提示 -->
    <u-message />
    <!-- 弹窗 -->
    <u-modal :showModal="showModal" :options="options" @confirmBtn="confirmFn" @hide="hideFn" />
  </div>
</template>
<script>
  import Vue from 'vue';
  // Use Vuex
  import { mapState, mapActions } from 'vuex'
  import qs from 'qs';
  import Item from './components/itemCheck'
  import emailPopup from './components/emailPopup.vue'
  import download from '../../utils/downloadFiles.js';

  export default {
    components: {
      Item, emailPopup
    },
    data() {
      return {
        email: '',
        visible: false,
        allChecked: false,
        tabs: ["官方资料", "合伙人指引", "培训资料"],
        activeIndex: 0,
        materialDataArr: [],
        showModal: false,
        options: {
          confirmText: '确定',
          confirmColor: '#4272FF'
        },
      }
    },
    mounted(){
      this.allChecked = false;
      this.showModal = false;
      this.visible = false;
      this.activeIndex = 0;
      this.email = '';
      this.materialDataArr = [];
      let userData = this.$storage.get('auth');
      this.email = userData.email;
      this.getMaterialData();
    },
    methods: {
      // 预览
      preview(item) {
        wx.downloadFile({
          url: item.url,
          success: function(res) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath: filePath,
              success: function(res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      },
      // 点击一级类目
      handleClickTitle (item, ind) {
        item.state = !item.state;
        this.$set(this.materialDataArr, ind, Object.assign({}, this.materialDataArr[ind], item));
      },
      // 发送邮箱
      async toEmail() {
        let ret = {
          ids: this.getCheckedData().map((it) => {return it.id}).join(),
          email: this.email,
        }
        await this.API.my.email(ret);
        this.$mptoast('已发送')
      },
      // 显示邮箱弹框
      showEmailPop() {
        if (this.checkValid()) {
          this.visible = true;
        }
      },
      // 隐藏邮箱弹框
      hideFn(){
        this.visible = false;
      },
      // 校验
      checkValid() {
        console.log('this.getCheckedData()', this.getCheckedData())
        if (!this.getCheckedData().length) {
          this.tips('请先勾选文件');
          return false
        }
        return true
      },
      // 获得勾选的数据
      getCheckedData() {
        let arr = [];
        this.materialDataArr.forEach((item) => {
          item.subMaterials.forEach(it => {
            if (it.checked) {
              arr.push(it);
            }
          })
        });
        return arr;
      },
      // 全选
      allCheck() {
        this.allChecked = !this.allChecked
        this.materialDataArr.forEach((item) => {
          this.allChecked ? item.checkedNum = item.subMaterials.length : item.checkedNum = 0;
          item.subMaterials.forEach(it => {
            it.checked = this.allChecked;
          })
        });
        console.log(this.materialDataArr)
      },
      // 单个勾选
      doCheck(item, index){
        this.materialDataArr.splice(index, 1, item);
        let checkedNum = this.getCheckedData().length;
        this.allChecked = checkedNum === this.materialDataArr.length;
      },
      doCheck2 (item, ind, index) {
        // console.log(this.materialDataArr)
        let checkedNum = this.materialDataArr[index].checkedNum || 0;
        if (!item.checked) {
          item.checked = true;
          this.materialDataArr[index].checkedNum = checkedNum + 1;
        } else {
          item.checked =false;
          this.materialDataArr[index].checkedNum = checkedNum - 1;
        }
        let allLen = 0;
        for (let i = 0; i < this.materialDataArr.length; i++) {
          allLen+=this.materialDataArr[i].subMaterials.length;
        }
        let allCheckedNum = this.getCheckedData().length;
        console.log(allLen)
        this.allChecked = allCheckedNum === allLen;
        let arrItem = this.materialDataArr[index];
        arrItem.subMaterials[ind] = item;

        this.$set(this.materialDataArr, index, Object.assign({}, this.materialDataArr[index], arrItem));
        // this.materialDataArr.map(it)

      },
      // 获取材料
      async getMaterialData() {
        let data = await this.API.my.getMaterialData();
        this.materialDataArr = data.filter(item => (
          item.subMaterials && item.subMaterials.length
        ))
        // this.materialDataArr;
        if (this.materialDataArr.length) {
          this.materialDataArr.map(item => {
            item.state = false;
            item.checkedNum = 0;
          })
        }
        console.log(this.materialDataArr)
      },
      // 下载到手机, 只能缓存在手机中，无法保存到文件夹
      downloadFn () {
        if (this.checkValid()) {
          download.downloadSaveFiles ({
            urls: this.getCheckedData().map((it) => {return it.url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com')}),
            success: (res) => {
              this.$mptoast('所有文件保存成功，保存在：' + res.savedFilePath);
              console.log('所有文件保存成功')
            },
            fail: function(e) {
              console.log('下载失败')
            }
          })
        }
      },
      // 选择导航
      selectTabFn (data) {
        console.log(data)
        this.activeIndex = data;
      },
    },
  }
</script>
<style lang="scss">
  #triangle-left{
    transition: all .3s;
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left:15px solid #ddd;
    width: 20px;padding-left: 4px;
  }
  .materials_center {
    padding-bottom: 98px;
    .pub_navbar .weui-navbar__item .weui-navbar__title {font-size: 30px;}
    .tab_content {
      background-color: #fff;/* margin-top: 20px; */
      text-align: center;
    }
    .bottomBar{
      position: fixed;bottom: 0;left: 0;width: 100%;height: 98px;background-color: #fff;font-size: 32px;
      .allCheck{padding-left: 20px;}
      .toEmail{flex-basis: 440px;text-align: center;height: 100%;line-height: 98px; background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);color: #fff;}
      /* .toPhone{flex-basis: 220px;text-align: center;} */
    }
    .mid_content{
      .categoryItem{padding: 0 20px 0 24px;background-color: #fff;margin: 0;border-bottom: 1px solid #eee;position: relative;
        .itemName{display: flex;
          >p{line-height: 92px;transform: translateX(-14px);color:#333;}
        }
        .icon-xiaochengxu-1{transition: all 0.3s;width: 40px;text-align: center;}
        .icon-jiantou{position: absolute;right: 20px;width: 40px;height: 40px;text-align: center;line-height: 40px;top: 26px;color: #ddd;font-size: 20px;transition: all 0.3s;}
        .icon-x{transform: rotate(90deg);}
        .icon-s{transform: rotate(-90deg);}
      }
      .itemHight{
        .itemName{
          p{color:#2F80F6;}
        }
      }
      .categoryItemMinWrap{
        .nodata{background: #fff url(~assets/img/operation/min_bg.jpg) 0 0 repeat-y;background-size: 100%;border-bottom: 0;margin: 0;padding: 0 30px;}
        .categoryItemMin{margin: 0 0 0 30px;padding-right: 20px;
          &:last-child{border-bottom: none;}
          icon{margin: 0;padding: 18px 0 0 20px;height: 92px;}
        }
      }
    }
  }
</style>
