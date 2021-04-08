// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import './assets/css/reset.css'
import './assets/css/common.css'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import store from './vuex/store'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { routes } from './routes'
import vueWechatTitle from 'vue-wechat-title'
Vue.use(vueWechatTitle)
import { WechatPlugin, ToastPlugin } from 'vux'
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)

//mockdata数据模拟
//import Mock from './mock'
//Mock.bootstrap();

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCookie);
Vue.use(VueAxios, axios)

const wx = Vue.wechat;
Vue.prototype.wxShare = function(title, link, imgUrl, path) {
    this.$http.get('http://wechat.ipsebe.com/weixin/wechat/getJsAPISignByUrl' + "?url=" + path).then((resp) => {
        var ticket = resp.data.ticket;
        wx.config({
            debug: false,
            appId: resp.data.appid,
            nonceStr: resp.data.nonce,
            signature: resp.data.sign,
            timestamp: resp.data.timestamp + '',
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
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
// 屏蔽所有微信分享功能
Vue.prototype.hideMenu = function() {
    function onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu');
    }
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
}



// axios默认传统表单提交方式
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 配置全局根路径
var rootUrl = CONFIG.rootUrl;
global.Path = axios.defaults.baseURL = CONFIG.rootUrl;
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    config.headers.Authorization = VueCookie.get('service_token'); // || 'iprp_member-1c9923cdc0c1475cb69506c01a46a0708a6792c29d3a4a8abbb0d245eb31035f';
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 拦截未登录
axios.interceptors.response.use(function(response) {
    // Do something with response data
    return response;
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
    render: h => h(App)
}).$mount('#app-box')