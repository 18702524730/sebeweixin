import '../static/sdk/ald-stat'
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'
import SebeIcon from '@/components/sebe-icon.vue'
Vue.use(MpvueRouterPatch)
Vue.component('sebe-icon', SebeIcon)
import mpvueToastRegistry from 'mptoast/registry'
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


import mpVueToastRegistry from 'mptoast/registry';
mpVueToastRegistry(Vue)

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
        "iconPath": "/static/icon/store.png",
        "selectedIconPath": "/static/icon/storeActive.png",
        "text": "存证"
      }, {
        "pagePath": "pages/my/index",
        "iconPath": "/static/icon/outpatient.png",
        "selectedIconPath": "/static/icon/outpatientActive.png",
        "text": "我的"
      }]
    },
    // tabBar: {
    //   "list": [{
    //     "pagePath": "pages/oldCustomer/oldCustomer",
    //     "text": "老用户"
    //   }, {
    //     "pagePath": "pages/valetOrder/valetOrder",
    //     "text": "下单"
    //   }]
    // },
  }
}
