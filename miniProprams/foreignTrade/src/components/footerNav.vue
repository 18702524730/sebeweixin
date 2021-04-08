<template>
  <!-- 底部导航 -->
  <div class="pub_footer_nav">
    <!-- <div class="nav_link" @click="active == 99 ? '' : $router.push('/pages/index/index')">
      <img src="~src/assets/img/icon/index.png" alt="">
    </div> -->
    <view class="tabbar">
    <div class="nav_link" v-for="(item, index) in navDataList" :key="index" :class="{'active': index==activeIndex}" @click="selectNavFn(index)">
      <div class="img_box">
        <img class="icon" v-if="index==activeIndex" :src="activeIcon[index]" />
        <img class="icon" v-if="index!=activeIndex" :src="icon[index]" />
        <!-- <div class="red_num" v-if="item.num">{{ item.num }}</div> -->
      </div>
      <div class="txt" >{{ item.title }}</div>
    </div>
  </div>


</template>

<script>
  import interfaces from 'api/interfaces';
  import icon_1 from '../assets/img/homepage/home.png'
  import icon_1_active from '../assets/img/homepage/homeactive.png'
  import icon_2 from '../assets/img/homepage/message.png'
  import icon_2_active from '../assets/img/homepage/messageactive.png'
  import icon_3 from '../assets/img/homepage/my.png'
  import icon_3_active from '../assets/img/homepage/myactive.png'
  let navData = [
    // {title: '首页', linkUrl: '' },
    {title: '首页', linkUrl: '', num: '' },
    {title: '资讯', linkUrl: '', num: '' },
    {title: '我的', linkUrl: '' }
  ]


  export default {
    // events = {
    //   updateNumChange: (v) => {
    //     if (v) {
    //       this.methods.statisticsNews.bind(this)();
    //     }
    //   }
    // }

    props: {
      active: {
        type: Number,
        default: 0
      },
      updateNum: {
        type: Boolean,
        default: false,
        twoway:true
      }
    },

    data () {
      return {
        navDataList: navData,
        activeIndex: 0,
        icon: [icon_1, icon_2, icon_3],
        activeIcon: [icon_1_active, icon_2_active, icon_3_active]
      }
    },
    async mounted() {
      this.activeIndex = this.active;
      let data = await interfaces.checkLogin();
      let key = this.$storage.get('key');
      if (data.isLogin && key) {
        // this.statisticsNews();
      }
    },
    onShow () {
      this.activeIndex = this.active;
    },
    methods: {
      selectNavFn (index) {
        if (this.activeIndex == index) {
          return
        }
        this.activeIndex = index;
        let url = '';
        switch (index) {
          // case 0: url = '/pages/index/index'; break;
          case 0: url = '/pages/homepage/index'; break;
          case 1: url = '/pages/message/list'; break;
          case 2: url = '/pages/my/index'; break;
        }
        wx.switchTab({
          url: url
        })
      },
    }
  }
</script>

<style lang="scss">
  .pub_footer_nav {
    display: flex; justify-content: center; align-items:center; width: 100%; height: 98px; background: #fff; position: fixed; left: 0; bottom: 0; box-shadow: 0 -10px 14px 0 rgba(66,114,255,0.07);
    .nav_link {
      >img{width: 80px;height: 80px;}
      width: 33.3%; height: 98px; padding-top: 10px; box-sizing:border-box; text-align: center; position: relative;
      .img_box {
        width: 50px; height: 54px; margin: 0 auto; position: relative;font-size: 0;
        .icon {width: 100%; height: 100%;}
        .red_num {position:absolute; right: 0; top: -2px; padding: 0 10px; height:22px; line-height: 22px; background:#F43631; border:1px solid #fff; border-radius: 20px; font-size: 18px; color:#fff; text-align: center; transform:translate(50%);}
      }
      .icon {}
      .txt {font-size: 20px; color: #999; width: 100%; text-align: center;line-height: 32px;}
      &.active {
        .txt {color: #4272FF; }
      }
    }
  }
</style>
