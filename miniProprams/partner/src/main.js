import '../static/sdk/ald-stat'
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'
import SebeIcon from '@/components/sebe-icon.vue'

Vue.use(MpvueRouterPatch)
Vue.component('sebe-icon', SebeIcon)
import mpvueToastRegistry from 'mptoast/src/registry'
mpvueToastRegistry(Vue)

// 中间消息提示
import mptoast from 'mptoast'
Vue.component('mptoast', mptoast)
// 输入框
import uInput from 'components/weui/input';
Vue.component('uInput', uInput)
// 顶部消息提示
import uMessage from '@/components/weui/message';
Vue.component('uMessage', uMessage)
// modal弹窗
import uModal from '@/components/weui/modal';
Vue.component('uModal', uModal)
// 导航
import uNavbar from '@/components/weui/navbar';
Vue.component('uNavbar', uNavbar)
// 底部弹窗--过渡动画
import transitionUp from '@/components/weui/transitionUp';
Vue.component('transitionUp', transitionUp)
// 编辑信息
import infoItem from '@/components/infoItem.vue';
Vue.component('infoItem', infoItem)
// 编辑信息
import checkBox from '@/components/weui/checkBox.vue';
Vue.component('checkBox', checkBox)

// 上拉加载，下拉刷新
// import scrollView from 'vue-scroller'
// Vue.use(scrollView);

Vue.config.productionTip = false

import Plugin from '@/plugins'
Vue.use(Plugin)

const app = new Vue({
  store,
  ...App
})

app.$mount()

export default {
  config: {
    pages: [],
    // permission: {
    //   "scope.userLocation": {
    //     "desc": "你的位置信息将用于小程序位置接口的效果展示"
    //   }
    // },
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      "borderStyle": "white",
      "backgroundColor": "#fff",
      "selectedColor": "#2F80F6",
      "list": [{
        "pagePath": "pages/index/index",      
        "iconPath": "/static/icon/index.png",
        "selectedIconPath": "/static/icon/indexActive.png",
        "text": "首页"
      }, {
        "pagePath": "pages/outpatient/index",
        "iconPath": "/static/icon/outpatient.png",
        "selectedIconPath": "/static/icon/outpatientActive.png",
        "text": "需求"
      }, {
        "pagePath": "pages/index/store",      
        "iconPath": "/static/icon/store.png",
        "selectedIconPath": "/static/icon/storeActive.png",
        "text": "店铺"
      },{
        "pagePath": "pages/index/my",
        "iconPath": "/static/icon/my.png",
        "selectedIconPath": "/static/icon/myActive.png",
        "text": "我的"
      }]
    },
    "navigateToMiniProgramAppIdList": [
      "wxd3395f89f8ce776a", "wx05d45b713ed26a0e", "wxe0112bc6d0b9da8e", "wxe0112bc6d0b9da8e", "wx10617813540e0d66", "wx6b2a8d87bb8c6ce4"
    ]
  }
}
