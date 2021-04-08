import base from './base'
import wepy from 'wepy';

export default class confirm extends base {
  /**
   * 根据推单id查询详情
   */
  static async getInfo(id) {
    const appCode = wepy.$instance.globalData.app_code;
    const url = `${this.cartUrl}/asistant/asistantList.htm?asistantOrderCustomerId=${id}`;
    const data = await this.get(url);
    return data;
  }
  /**
   * 短信验证码
   */
  static async getOrderDetail (orderNum) {
    const url = `${this.cartUrl}/cartWeb/orderDetail.htm?orderNum=${orderNum}`;
    const data = await this.get(url);
    return data;
  }
  /**
   * 生成订单
   */
  static async createOrder(param) {
    const appCode = wepy.$instance.globalData.app_code;
    const url = `${this.cartUrl}/asistant/asistantOrder.htm`;
    const data = await this.post(url, param);
    console.log(data)
    return data;
  }

  /**
   * 获取订单详情
   */
  static async getOrderInfo(orderNum) {
  	const token = wepy.getStorageSync('key');
    const sessionId = wepy.getStorageSync('sessionId');
    const url = `${this.cartUrl}/cartWeb/orderDetail.htm`; // 获取订单信息接口
    const data = await wx.request({
		  url: url,
		  method: 'POST',
		  data: {
		  	orderNum
		  },
		  header: {
		  	'Authorization': token,
		  	'SessionId': sessionId,
		    'content-type': 'application/x-www-form-urlencoded' // 默认值
		  }
		});

    console.log(data)
    return data;
  }

  /**
   * 小程序支付
   */
  static async toPayment(params) {
  	const url = `${this.payUrl}/iprp_app/api/wxpayment`;
    const data = await this.post(url, params);
    let ret = {}
    ret.timeStamp = data.timeStamp;
    ret.nonceStr = data.nonceStr;
    ret.package = data.package;
    ret.signType = data.signType;
    ret.paySign = data.paySign;
    wepy.requestPayment(ret);
  }










  /**
   * 检查登录状态
   */
  static isLogin() {
    const loginCode = this.getConfig('login_code');
    return loginCode != null;
  }
  /**
   * 登录
   */
  static async login(phone, code) {
    const appCode = wepy.$instance.globalData.app_code;
    const url = `${this.baseUrl}/auth/login?phone=${phone}&sms_code=${code}&app_code=${appCode}`;
    const dara = await this.get(url);
    return dara.login_code;
  }

  /**
   * 检查登录情况
   */
  static async check(loginCode) {
    const url = `${this.baseUrl}/auth/check?login_code=${loginCode}`;
    const data = await this.get(url)
    return data.result;
  }

  /**
   * 设置权限值
   */
  static getConfig(key) {
    return wepy.$instance.globalData.auth[key];
  }

  /**
   * 读取权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({key: key, data: value});
    wepy.$instance.globalData.auth[key] = value;
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    wepy.$instance.globalData.auth[key] = null;
    await wepy.removeStorage({key: key});
  }
}
