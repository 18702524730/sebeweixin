//import http from '@/plugins/flyio/request'
import utils from '@/utils/util'
import API from '@/api'
import storage from '@/utils/storage'
//import Flyio from '@/plugins/flyio/interceptors'
export default {
  /**
   * 自定义方法
   * 组件内使用： this.$utils.validator
   * 全局使用：Vue.utils.validator
   */
  install (Vue) {
    const ret = {
      ...utils,
    }

    Vue.utils = ret.utils;
    Vue.prototype.$utils = ret.utils;
    // 暂时还是用axios, 后面再接入Flyio
    /*Vue.http = http;
    Vue.prototype.$http = Flyio;*/
    Vue.prototype.API = API;

    Vue.prototype.$storage = storage;
  }
}
