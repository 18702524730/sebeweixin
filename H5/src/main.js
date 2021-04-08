// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/font/iconfont.css'
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css/animate.min.css'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { routes } from './router'
import vueWechatTitle from 'vue-wechat-title'
import Plugin from '@/plugins'

Vue.use(Plugin)

Vue.use(vueWechatTitle)
import { WechatPlugin, ToastPlugin ,Icon ,XDialog, Msg, AlertPlugin} from 'vux'
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(Icon)
Vue.use(XDialog)
Vue.use(Msg)
Vue.use(AlertPlugin)

import VueScroller from './components/vue-scroller'
Vue.use(VueScroller)

import loadingGif from 'assets/img/prehold.png'
import errhold from 'assets/img/errhold.png'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errhold,
  // loading: loadingGif,
  attempt: 1
})

//mockdata数据模拟
//import Mock from './mock'
//Mock.bootstrap();

Vue.use(VueRouter)
Vue.use(VueCookie);
Vue.use(VueAxios, axios)
const wxUrl = CONFIG.wxUrl;
const wx = Vue.wechat;
Vue.prototype.wxShare = function(title, link, imgUrl, desc, path, cb) {
    path = encodeURIComponent(path);
    console.log(this.$route.query.sgtoken)
    let d = {
      url: path,
    }
    let sgtoken = this.$route.query.sgtoken;
    if (sgtoken) {
      d.sgtoken = sgtoken;
    }
    this.$http.get(wxUrl + '/wechat/getJsAPISignByUrl', {
      params: d
    }).then((resp) => {
        cb && cb.bind(this)();
        console.log('分享-----------------------：')
        console.log('返回的数据：',resp)
        console.log('拼装的config：',{
            debug: false,
            appId: resp.appid,
            nonceStr: resp.nonce,
            signature: resp.sign,
            timestamp: resp.timestamp,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        })
        wx.config({
            debug: false,
            appId: resp.appid,
            nonceStr: resp.nonce,
            signature: resp.sign,
            timestamp: resp.timestamp,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline','navigateTo']
        });

        wx.ready(function() {
            // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
            // 则可以直接调用，不需要放在ready函数中。
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: function(resp) {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function(error) {

                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function(resp) {

                    // 用户确认分享后执行的回调函数
                },
                cancel: function(error) {

                    // 用户取消分享后执行的回调函数
                }
            });
        });
    }).catch((error) => {
        console.log(error);
    })
}

Vue.prototype.hideMenu = function(title, link, imgUrl, path) {
    wx.ready(function() {
        // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
        // 则可以直接调用，不需要放在ready函数中。
        wx.hideMenuItems({
            menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:QZone","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:QZone"] // 要隐藏的菜单项
        });
    });
}

Vue.prototype.chooseImage = function(cb) {
  var path = encodeURIComponent(location.href.split('#')[0]);
  //alert(path);
  this.$http.get(wxUrl + '/wechat/getJsAPISignByUrl' + "?url="+ path).then((resp) => {
    //alert(JSON.stringify(resp));
    console.log('选择图片-----------------------：');
    console.log('返回的数据：',resp)
    console.log('拼装的config：',{
        debug: false,
        appId: resp.appid,
        nonceStr: resp.nonce,
        signature: resp.sign,
        timestamp: resp.timestamp,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseImage', 'getLocalImgData']
    });

    wx.config({
        debug: false,
        appId: resp.appid,
        nonceStr: resp.nonce,
        signature: resp.sign,
        timestamp: resp.timestamp,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseImage', 'getLocalImgData']
    });
    wx.ready(function() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.getLocalImgData({
            localId: localId,
            success: function (res) {
              var localData = res.localData;
              cb(localData);
            }
          });
        }
      });
    });
  }).catch((error) => {
    console.log(error);
  })
}

// 得到URL查询参数
function getQueryObj () {
  let obj_ = {};
  if (location.href.split('?')[1]) {
    let arr_ = location.href.split('?')[1].split('&');
    arr_.forEach( item => {
      let arr = item.split('=');
      obj_[arr[0]] = arr[1]
    })
  }
  return obj_
}

// axios默认传统表单提交方式
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 配置全局根路径
var rootUrl = CONFIG.rootUrl;
global.Path = axios.defaults.baseURL = CONFIG.rootUrl;
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    let obj_ = getQueryObj();
    if (obj_.key) {
      // 合伙人小程序跳转过来的话用小程序的token
      config.headers.Authorization = obj_.key;
      // config.headers.MiniAppSessionId = obj_.sessionId;
    }
    else{
      config.headers.Authorization = VueCookie.get('user_token');
    }
    // config.headers.Authorization = VueCookie.get('user_token'); // || 'iprp_member-1c9923cdc0c1475cb69506c01a46a0708a6792c29d3a4a8abbb0d245eb31035f';
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 拦截未登录
axios.interceptors.response.use(function(response) {
    // Do something with response data
    return response.data;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});

NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')
