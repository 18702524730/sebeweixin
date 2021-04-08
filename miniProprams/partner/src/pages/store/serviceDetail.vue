<template>
 <div class="detailWrap">
   <div class="detailImg" v-if="productDetail.productName" :style="{background: 'url(' + productDetail.picture + ') no-repeat center center', backgroundSize: 'cover'}">
      <div class="settingMenu">
        <div class="settingIcon" @click="wx.switchTab({ url: '../index/store'})">
          <img src="~assets/img/store/homeIcon.png" alt="">
        </div>
        <div class="userIcon" @click="testShare">
          <img src="~assets/img/store/shareIcon.png" alt="">
        </div>
      </div>
   </div>
   <div class="serviceDes">
     <h2>{{productDetail.productName}}</h2>
     <p class="des">{{productDetail.introduce || ''}}</p>
     <div v-if="productDetail.groundStatus == 0">
      <div class="priceWrap">
        <label>售价</label>
        <div class="price"><b>￥</b>{{productDetail.salePrice}}</div>
        <div class="tc">提成{{productDetail.extract}}元</div>
      </div>
        <!-- <div class="platformPrice">
          <div class="pt"><div>平台指导价：</div><b>¥</b><i>{{productDetail.guidePrice}}</i></div>
          <div class="tc">提成{{productDetail.extract}}元</div>
        </div> -->

     </div>
      <div class="platformPrice3" v-if="productDetail.groundStatus == 1">
        <div class="editPrice">平台指导价：</div>
        <div class="price"><b>￥</b>{{productDetail.guidePrice}}</div>
        <div class="watchPrice" @click="showUpState">
          <!-- <i class="icon iconfont icon-shangjiashangpin"></i> -->
          添加服务
        </div>
      </div>
     </div>
      <div class="ability" v-if="productDetail.groundStatus == 0">
        服务能力：{{productDetail.serviceAbility === 1 ? '自己作业' : '平台作业'}}
        <div class="edit" @click="showUpState">服务设置</div>
      </div>
     <div id="tabs" :class="[menuFixed ? 'fixed' : '', 'tabs']" :style="{borderBottom: tabsActiveIndex != 0 ? '1px solid #eee' : 'none'}"><tabs :tabs="tabs" :activeIndex="tabsActiveIndex" :width="375" @selectTab="selectTabFn"></tabs></div>

      <div v-if="tabsActiveIndex == 1" :class="['slide', menuFixed ? 'tabFixed' : '']" :style="{padding: '15px 15px 25px'}">
        <rich-text v-if="productDetail.commonProblem" :nodes="productDetail.commonProblem"></rich-text>
      </div>
      <div :class="['slide', 'slideImg', menuFixed ? 'tabFixed' : '']" v-if="!tabsActiveIndex">
        <rich-text v-if="productDetail.applyProcess" :nodes="productDetail.applyProcess"></rich-text>
      </div>
      <div :class="['slide', 'slideFile', menuFixed ? 'tabFixed' : '']" :style="{ minHeight: (screenHeight*2+90)+'rpx'}" v-if="tabsActiveIndex == 2">
        <div class="fileItem" v-for="(item, index) in productDetail.materials" :key="index">
          <div class="fileName" @click.stop="preview(item)">{{item.title}}</div>
          <img @click="handleClickEmail(item.id)" src="~assets/img/store/email.png" alt="">
        </div>
        <!-- <rich-text v-if="productDetail.applyProcess" :nodes="productDetail.applyProcess"></rich-text> -->
      </div>

     <div class="bottom">
       <div class="share" @click="testShare">
         <i class="icon iconfont icon-zhuanfa"></i>
         <p>分享服务</p>
        </div>
       <div class="btn" @click="clickOrder">代客下单</div>
     </div>

      <div class="transition_up" v-if="upState" :class="{'show_animation': upState}">
        <div class="mask_bg"  @click="hideFn"></div>
        <div class="transition_wrap" >
          <div class="transition_content">
            <div class="upService">服务设置</div>
            <div class="platform">平台指导价：￥<span>{{productDetail.guidePrice}}</span></div>
            <input type="digit" class="priceInput" v-model="price" placeholder-class="phcolor" confirm-type="done"  cursor-spacing="154"
              :placeholder="'建议销售价格在' + minPrice + '~'+ maxPrice +'之间'">
            <div class="iconItem" v-if="!productDetail.allowPartnerTask" @click="taskState = !taskState">
              <!-- <icon type="success" size="23" color="#2F80F6"/> -->
              <icon type="success" size="23" :color="taskState ? '#2F80F6' : '#eee'"/>
              <i>自己作业</i>
            </div>
            <div class="noTask" v-if="productDetail.allowPartnerTask">
              <h3>暂不支持自己作业</h3>
              <p>由于业务本身难度及风险把控原因，暂不支持自己作业哦。若您有自己作业能力，请联系平台客服。</p>
            </div>
            <div :class="['taskDes', taskState ? 'taskDesShow' : '']">
              <p>温馨提示，自己作业是严格按照平台要求完成订单所有申报材料准备（包括撰写、查询等），材料准备完成之后平台负责对订单进行申报。在自己作业时，请认真负责对待每一位客户，平台将进行定期抽检，若发现订单质量存在问题，平台将取消合伙人自己作业的资格。</p>
            </div>
            
            <div class="tc">可获提成：￥{{redPackage}}</div>
            <button class="confirm-btn btn" form-type="submit" @click="handleClickUpShelf">确定</button>
            <input type="text" style="display:none">
            <span @click="upState = false">×</span>
          </div>
        </div>
      </div>
      <div class="transition_up" v-if="shareDiaState" :class="{'show_animation': shareDiaState}">
        <div class="mask_bg"  @click="hideFn"></div>
        <div class="transition_wrap" >
          <div class="shareTransitionContent">
            <div class="shareTitle">分享给客户</div>
            <div class="shareIcon">
              <button class="user" @click="share" open-type="share">
                <img src="~assets/img/store/shareUser.png" alt="">
                <p>分享好友</p>
              </button>
              <div class="circle" @click="drawSharePic(productDetail.picture)">
                <img src="~assets/img/store/Moments.png" alt="">
                <p>分享朋友圈</p>
              </div>
            </div>
            <div class="btn">确定</div>
            <span @click="shareDiaState = false">×</span>
          </div>
        </div>
      </div>
      <u-message />
      <u-modal :showModal="showModal" :options="options" :content="'您的店铺还没有上架此商品哦！'" @confirmBtn="confirmFn" @hide="hideFn2" />

      <div class="transition_up" v-if="visible" :class="{'show_animation': visible}">
        <div class="mask_bg"  @click="visible = false"></div>
        <div class="transition_wrap">
          <emailPopup :email.sync="email" @hide="visible = false" @submit="toEmail"></emailPopup>
        </div>
      </div>
      <mptoast />
 </div>
</template>

<script>
import Tabs from '@/components/weui/navbar.vue'
import CheckBox from '@/components/weui/checkBox.vue'
import emailPopup from './components/emailPopup.vue'
export default {
  data() {
    return {
      tabs: ['服务介绍', '常见问题', '材料文件'],
      wx: wx,
      tabsActiveIndex: 0,
      visible: false,
      upState: false,
      checkState: true,
      shareDiaState: false,
      taskState: false, // 作业状态
      menuFixed: false, // tabs吸顶状态
      menuTop: '', // tabs距离顶部距离
      price: '', // 填写的售价
      redPackage: '0.00', // 提成
      checkboxOptions: [
        { label: '是否自己作业', value: 'a' }
      ],
      productDetail: {},
      showModal: false,
      options: {
        showCancel: true,
        cancelText: '稍后分享',
        cancelColor: '#000000',
        confirmText: '去上架服务',
        confirmColor: '#2F80F6'
      },
      screenHeight: 663,
      email: '',
      fileId: '' // 发送的文件ID
    }
  },
  computed: {
    maxPrice () {
      let val;
      this.productDetail.guidePrice ? val = (this.productDetail.guidePrice * 3).toFixed(2) : val = ''
      return val
    },
    minPrice () {
      let val;
      this.productDetail.guidePrice ? val = (this.productDetail.guidePrice * 0.7).toFixed(2) : val = ''
      return val
    }
  },
  components: { Tabs, CheckBox, emailPopup },
  onLoad () {
    console.log(this.$route.query)
    this.getProductDetail()
  },
  mounted () {
    this.taskState = false;
    this.tabsActiveIndex = 0;
    var self = this;
    wx.getSystemInfo({
      success (res) {
        self.screenHeight = res.windowHeight + 20;
        console.log(res.windowHeight);
      }
    });
    let userData = this.$storage.get('auth');
    this.email = userData.email;
  },
  onShow () {
    this.upState = false
    this.shareDiaState = false
    this.price = ''
    this.showModal = false
  },
  onPageScroll (e){
    e.scrollTop > this.menuTop ? this.menuFixed = true : this.menuFixed = false
  },
  // 监听用户点击页面内转发按钮
  onShareAppMessage() {
    let obj = {};
    let memberId = this.$storage.get('auth').member_id;
    obj = {
      title: '我在【拾贝宝】开店赚钱，邀请你一起加入哦！',
      path: "/pages/authorize/authorize?memberId="+ memberId + "&shareId=15",
      imageUrl: '/static/icon/bg.jpg'
    }
    return obj;
  },
  methods: {
    // 预览
    preview(item) {
      if (!item.url){
        return;
      }
      item.url = item.url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
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
    // 点击发送邮件
    handleClickEmail (id) {
      this.visible = true;
      this.fileId = id;
    },
    // 发送邮箱
    async toEmail() {
      let ret = {
        ids: this.fileId,
        email: this.email,
      }
      await this.API.my.email(ret);
      this.$mptoast('已发送')
    },
    showUpState () {
      this.upState = true
      if (!this.productDetail.groundStatus) {
        this.price = this.productDetail.salePrice
        this.redPackage = this.productDetail.extract
        this.productDetail.serviceAbility == 1 ? this.taskState = true : this.taskState = false
      } else {
        this.price = ''
        this.redPackage = '0.00'
        this.taskState = false
      }
    },
    // 分享事件
    testShare () {
      if (!this.productDetail.groundStatus) {
        this.$router.push({
          path: '/pages/store/share',
          query: {
            productNum: this.productDetail.productNum,
            introduce: this.productDetail.introduce,
            salePrice: this.productDetail.salePrice,
            picture: this.productDetail.picture,
            productName: this.productDetail.productName
          }
        })
      } else {
        this.showModal = true
      }
    },
    clickOrder () {
      if (this.productDetail.groundStatus == 1) {
        this.showUpState()
      } else {
        this.$router.push('/pages/valetOrder/valetOrder?productNum=' + this.productDetail.productNum)
      }
    },
    // 隐藏弹窗
    hideFn2 () {
      this.showModal = false;
    },
    // 弹窗回调
    confirmFn (data) {
      if (data) {
        this.upState = true
      }
      else{
        // console.log('取消回调')
      }
      this.showModal = false;
    },
    hideFn () {
      this.upState = false
      this.shareDiaState = false
    },
    async handleClickUpShelf () {
      if (!this.price) {
        this.$message({content: '请输入销售价格', type: 'error' })
        return
      }
      let numReg = /^\d+(\.\d+)?$/;
      if(!numReg.test(this.price)){
        this.$message({content: '请输入正确的数字', type: 'error' })
        return
      }
      if (Number(this.price) > parseFloat(Number(this.maxPrice)) || parseFloat(Number(this.price)) < Number(this.minPrice)) {
        this.$message({content:'请输入0.7~3倍平台指导价之间的价格', type: 'error' })
        return
      }
      let params = {
        storeCode: this.$route.query.storeCode || this.$storage.get('storeCode'),
        productNum: this.productDetail.productNum,
        salePrice: this.price,
        extract: this.redPackage,
        serviceAbility: this.taskState ? 1 : 0
      }
      if (this.productDetail.groundStatus == 1) {
        await this.API.store.shelfProduct(params)
        this.$storage.remove('category')
      } else {
        await this.API.store.shelfProductUpdate(params)
      }
      this.getProductDetail()
      this.upState = false
    },
    async getProductDetail () {
      console.log(this.$route.query.productNum)
      let data = await this.API.store.productDetail({ productNum: this.$route.query.productNum })
      data.guidePrice = Number(data.guidePrice).toFixed(2)
      data.salePrice = Number(data.salePrice).toFixed(2)
      this.price = data.salePrice
      data ? this.productDetail = data : ''
      if (!this.productDetail || (this.productDetail && !this.productDetail.materials.length)) {
        this.tabs = ['服务介绍', '常见问题'];
        this.$set(this.tabs, 0, '服务介绍');
      } else {
        this.tabs = ['服务介绍', '常见问题']; // 材料文件
        this.$set(this.tabs, 2, '材料文件');
      }
      wx.nextTick(() => {
        var query = wx.createSelectorQuery()
        query.select('#tabs').boundingClientRect()
        query.exec( (res)  => {
          console.log('res', res)
          this.menuTop = res[0].top
        })
      })
    },
    checkboxChange(e) {
      console.log(this.checkState)
      console.log('radio 携带的值为：', e.mp.detail);
    },
    selectTabFn (e) {
      console.log(e);
      this.tabsActiveIndex = e
    },
  },
  watch: {
    price (val) {

        this.price = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        this.price = val.replace(/^\./g,""); //验证第一个字符是数字
        this.price = val.replace(/\.{2,}/g,""); //只保留第一个, 清除多余的
        this.price = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        this.price = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数

        this.taskState ?
        this.redPackage = Number((val * 0.93 - this.productDetail.peAmount) * this.productDetail.saleTaskReturnProportion).toFixed(2) :
        this.redPackage = Number((val * 0.93 - this.productDetail.peAmount) * this.productDetail.taskReturnProportion).toFixed(2)
      // } else {
        // this.redPackage = '--'
      // }
      if (Number(this.redPackage < 0)) {
        this.redPackage = '--'
      }
    },
    taskState (val) {
      // if (this.price > Number(this.productDetail.guidePrice)) {
        val ?
        this.redPackage = Number((this.price * 0.93 - this.productDetail.peAmount) * this.productDetail.saleTaskReturnProportion).toFixed(2) :
        this.redPackage = Number((this.price * 0.93 - this.productDetail.peAmount) * this.productDetail.taskReturnProportion).toFixed(2)
      // } else {
      //   this.redPackage = '--'
      // }
      if (Number(this.redPackage) < 0) {
        this.redPackage = '--'
      }
    }
  }
}
</script>

<style lang="scss">
page{background: #f8f8f8;}
.detailWrap{padding-bottom: 98px;
  .weui-cells:before,.weui-cells:after{border: none;}
  .weui-cell {margin: 0 250px;padding: 0;}
  .weui-navbar{position: relative;}
  .weui-navbar__item {flex-basis: 120px;}
  .check_box .weui-check__label{border: none;}
  .bottom{position: fixed;bottom: 0;width: 100%;display: flex;height: 98px;line-height: 98px;z-index: 1000;
    .share{flex-basis: 150px;background: #fff;color: #2F80F6;text-align: center;font-size: 22px;
      .icon{font-size: 30px;width: 150px;color: #2F80F6;height: 42px;line-height: 42px;margin-top: 12px;display: block;}
      p{line-height: 30px;font-size: 22px;color: #2F80F6;}
    }
    .btn{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);flex-grow: 1;text-align: center;color: #fff;
    font-size: 32px;}
  }
  .detailImg{position: relative;font-size: 0;height: 510px;background-size: 750px 510px;
    >img{width: 750px;height: 510px;}
    .settingMenu{position: absolute;right: 20px;top: 20px;
      >div{height: 60px;width: 60px;border-radius: 50%;text-align: center;line-height: 54px;margin-bottom: 20px;
        .icon{color: #fff;font-size: 32px;width: 60px;height: 60px;border:1px solid #fff;border-radius: 30px;}
        img{width: 60px;height: 60px;}
      }
      >.userIcon{line-height: 58px;}
    }
  }
  .ability{line-height: 90px;color: #666;display: flex;margin: 20px 0;background: #fff;padding: 0 20px;font-size: 28px;
    .icon{font-size: 36px; color: #666;width: 34px;padding-right: 10px;height: 90px;line-height: 90px;text-align: left;margin-left: -4px;}
    .edit{flex: 1;text-align: right;font-size: 28px;color: #2f80f6;line-height: 90px;}
  }
  .serviceDes{padding: 30px 20px 0;background: #fff;margin-bottom: 20px;
    >h2{font-size: 32px;color: #333;line-height: 45px;padding-bottom: 10px; }
    .des{font-size: 24px;color: #999;line-height: 33px;padding-bottom: 20px;}
    .priceWrap{display: flex;padding-bottom: 20px;
      .icon{font-size: 40px;color: #FF9639;}
      label{border:1px solid #f64744;font-size: 24px;line-height: 40px;padding: 0 10px;height: 42px;color:#f64744;align-self:center;
        border-radius: 4px;
      }
      .price{display: flex;font-size: 48px;line-height: 67px;color: #F64744;padding: 0 10px;
        b{font-size: 24px;color: #F64744;align-self: flex-end;line-height: 50px;}
      }
      .editPrice{color: #2F80F6;font-size: 24px;align-self:flex-end;line-height: 50px;}
      >img{width: 50px;padding-top: 26px;}
      .tc{font-size: 26px;line-height: 37px;color: #ff9639;flex-grow: 1;padding-top: 20px;}
    }
    .platformPrice3{display: flex;position: relative;padding-bottom: 30px;
      .price{display: flex;font-size: 48px;line-height: 67px;color: #2F80F6;padding: 0 10px 0 0;
        b{font-size: 24px;color: #2F80F6;align-self: flex-end;line-height: 50px;}
      }
      .editPrice{color: #333;font-size: 24px;align-self:flex-end;line-height: 50px;}
      .watchPrice{position: absolute;top: 7px;line-height: 60px;right: -20px;border-top-left-radius: 30px;border-bottom-left-radius: 30px;
        font-size:24px;color: #fff;background:linear-gradient(270deg,rgba(255,199,107,1) 0%,rgba(255,150,57,1) 100%);padding: 0 20px 0 30px;display: flex;
        .icon{font-size: 27px;color: #fff;width: 40px;padding-right: 12px;height: 60px;line-height: 60px;}
      }
    }
    .platformPrice{padding: 8px 0 20px;display: flex;border-bottom:1px solid #eee;
      .pt{font-size: 24px;color: #666;line-height: 33px;flex-grow: 1;display:flex;
        >div{font-size: 24px;color: #666;}
        >b{display: inline;font-size: 18px;color: #666;}
        >i{display: inline;font-size: 28px;line-height: 33px;color: #666;vertical-align: bottom;}
      }
      .tc{font-size: 24px;line-height: 33px;color: #ff9639;}
    }
    .platformPrice2{height: 90px;position: relative;padding-bottom: 30px;
      .pt{line-height: 43px;font-size: 24px;color: #333;padding-top: 17px;display:flex;
        img{height: 67px;width: 157px;margin-top: -15px;}
      }
      .watchPrice{position: absolute;right: -20px;top: 0;border-top-left-radius: 30px;border-bottom-left-radius: 30px;display: flex;
        line-height: 60px;font-size:24px;color: #2f80f6;padding: 0 20px 0 15px;border:1px solid #2f80f6;border-right: none;
        .icon{font-size: 28px;color: #2f80f6;width: 36px;height: 60px;line-height: 60px;}
        .text{color: rgba(47,128,246,1);}
      }
    }

  }
  .transition_content{position: relative;text-align: center;
    .upService{color: #333;font-size: 32px;line-height: 45px;padding: 60px 0 40px;}
    .platform{font-size: 28px;color:#999;line-height: 40px;}
    .priceInput{border:1px solid #e6e6e6;line-height: 88px;border-radius: 43px;height: 90px;margin: 20px 60px 34px;font-size: 50px;}
    .phcolor{font-size: 26px;color: #bbb;line-height: 88px;}
    .tc{color: #FF9639;font-size: 32px;line-height: 45px;margin: 30px 0 30px;}
    >span{position: absolute;width: 90px;height: 90px;line-height: 90px;font-size: 60px;right: 0;z-index: 1002;top: 0;color: #ddd;}
    // .btn{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);height: 98px;line-height: 98px;color: #fff;font-size: 32px;}
    .confirm-btn{
      width: 100%;background-image: linear-gradient(147deg, #0096FF 0%, #2F80F6 100%); height: 96px;line-height:96px;font-size: 32px;color: #fff; border-radius: 0; padding:0;
      &::after{border:0;}
    }
    .check_box{font-size: 28px;color: #333;
      .weui-cells{font-size: 28px;}
    }
    .iconItem{line-height: 45px;
      icon{height: 45px;}
      i{vertical-align: middle;padding-left: 11px;}
    }
    .noTask, .taskDes{text-align: center;
      h3{font-size: 28px;color: #333;line-height: 40px;padding-bottom: 14px;}
      p{font-size: 24px;color:#F64744;line-height: 33px;padding: 0 60px;}
    }
    .taskDes{transition: all .2s;height: 0;overflow: hidden;}
    .taskDesShow{height: 180px;padding-top: 14px;}
  }
  .shareTransitionContent{position: relative;text-align: center;
    .shareTitle{color: #333;font-size: 32px;line-height: 45px;padding: 60px 0 40px;}
    .shareIcon{display: flex;padding-left: 110px;
      >div, >.user{font-size: 0;padding: 0 65px;border: none;
        img{height: 120px;width: 120px;}
        p{font-size: 30px;color:#333;line-height: 42px;padding: 20px 0 60px;}
      }
    }
    >span{position: absolute;width: 90px;height: 90px;line-height: 90px;font-size: 60px;right: 0;z-index: 1002;top: 0;color: #ddd;}
    .btn{background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);height: 98px;line-height: 98px;color: #fff;font-size: 32px;}
  }
  .slide{background: #fff;
    p{padding: 0 20px;}
    >image{width: 750px;height: 100%;}
  }
  .slideImg{min-height: 1200px;font-size: 0;}
  .slideFile{background:rgba(248,248,248,1);
    .fileItem{display: flex;height: 92px;border-bottom: 1px solid #eee;padding: 0 20px;background: #fff;
      &:last-child{border-bottom: none;}
    }
    .fileName{line-height: 92px;color: #333;font-size: 28px;flex-grow: 1;}
    img{width: 48px;height: 68px;padding-top: 20px;}
  }
  .tabFixed{padding-top: 90px;}
  .tabs{background: #fff;height: 90px;
    &.fixed{
      position: fixed;width: 750px;top: 0; left: 0;
    }
    .pub_navbar{width: 50%;height: 88px;margin-left: -5px;
      .weui-navbar__slider_0 {
        transform: translateX(0);
      }
      .weui-navbar__item{height: 90px;padding: 0 25px;
        .weui-navbar__title{font-size: 28px;height: 90px;line-height: 88px;border-bottom: 4px solid rgba(255,255,255,0);}
      }
      .weui-bar__item_on{
        .weui-navbar__title{border-bottom: 4px solid #2F80F6;}
      }
      .weui-navbar__slider{width: 120px;height: 0;}
    }
  }
  @keyframes moveUp {
    from {
      transform: translateY(100%)
    }
    to {
      transform: translateY(0)
    }
  }
  @keyframes moveDown {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(100%)
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .transition_up {
    position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 8999;
    .mask_bg {position:fixed; left:0; bottom: 0;width: 100%; height: 100%;z-index: 9000;}
    .transition_wrap {
      position:fixed; left:0; bottom: 0; z-index:9001; width: 100%; height: auto; background: #fff; box-shadow:0px -10px 30px 0px rgba(47,128,246,0.09); border-radius:10px 10px 0px 0px; overflow: hidden;
    }
  }
  .show_animation {
    .mask_bg {animation: fadeIn 0.3s ease-out; display:block;}
    .transition_wrap {animation: moveUp 0.3s ease-out; bottom: 0;}
  }
}

</style>
