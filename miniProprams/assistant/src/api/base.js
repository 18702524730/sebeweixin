import wepy from 'wepy';
import http from '../utils/Http'

export default class base {
  static baseUrl = wepy.$instance.globalData.baseUrl;
  static cartUrl = wepy.$instance.globalData.cartUrl;
  static userUrl = wepy.$instance.globalData.userUrl;
  static wxUrl = wepy.$instance.globalData.wxUrl;
  static miniAppType = wepy.$instance.globalData.miniAppType;
  static get = http.get.bind(http);
  static put = http.put.bind(http);
  static post = http.post.bind(http);
  static delete = http.delete.bind(http);
  static stringGet = http.stringGet.bind(http);
  static stringPost = http.stringPost.bind(http);
}
