import base from './base'
import wepy from 'wepy';

export default class confirm extends base {
	/**
   * 生成订单
   */
  static async validateIdCode(param) {
    const url = `${this.cartUrl}/cartWeb/validateIdCode.htm`;
    const data = await this.stringPost(url, param);
    return data;
  }

  /**
   * 根据推单id查询详情
   */
  static async getInfo(id) {
    const appCode = wepy.$instance.globalData.app_code;
    const url = `${this.cartUrl}/asistant/asistantList.htm?asistantOrderCustomerId=${id}&app_code=${appCode}`;
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
    const url = `${this.cartUrl}/asistant/createAsistantOrder.htm`;
    const data = await this.post(url, param);
    return data;
  }


  /**
   * 生成二维码
   */
  static async getWxAcode(accessToken, param) {
    const url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${accessToken}`;
    const data = await this.post(url, param);
    return data;
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
