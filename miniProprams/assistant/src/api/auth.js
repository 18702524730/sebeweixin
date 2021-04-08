import base from './base'
import wepy from 'wepy';

export default class auth extends base {
  /**
   * 获取session miniAppType  2 微商城小程序 3 推单助手小程序
   */
  static async getSession(code, miniAppType) {
    const url = `${this.wxUrl}/weixin/miniApp/getMiniAppSessionId.do`;
    const data = await this.post(url, {code:code, miniAppType:miniAppType});
    return data;
  }

  /**
   * 设置有效的session
   */
  static async setValidSession(miniAppType) {
    return wepy.login().then(res => {
      const sessionRes = this.getSession(res.code, miniAppType);
      wepy.setStorageSync('sessionId', sessionRes.miniAppSessionId);
      return sessionRes;
    });
  }

  /**
   * 获取accesstoken
   */
  static async getWxAccessToken(miniAppSessionId) {
    const url = `${this.wxUrl}/weixin/miniApp/getWxAccessToken.do`;
    const data = await this.post(url, {miniAppType: this.miniAppType, miniAppSessionId});
    return data;
  }

  /**
   * 封装 request 方法，在第一次登陆态失效后自动登录并转换 session 后重发请求
   */
  /*request (data, tryagain) {
      return new Promise ((resolve, reject) => {
          wepy.request(data)
          .then(res = > {
              if (res.data.retCode === 'xxxxx') { // 登录态验证失败
                  if (tryagain) {
                      reject('Something is wrong'); // code 置换 session 后依然返回登录态验证失败
                      return;
                  }
                  return wepy.login() // 可能是session过期等原因，获取最新 code
                      .then(loginRes => this.getSession(loginRes.code)) // 使用最新code置换 session
                      .then(sessionData => {
                          G.session = sessionData.session;
                          return this.request(data, true); // 重发请求
                      }).catch(reject);
              } else {
                  resolve(res);
              }
          })
          .catch(reject);
      });
  }*/

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
  static async login(miniAppSessionId, phone, phoneCode) {
    const appCode = wepy.$instance.globalData.app_code;
    const url = `${this.wxUrl}/weixin/miniApp/bindPhoneAndLogin.do`;
    const data = await this.post(url, {miniAppType: this.miniAppType, miniAppSessionId, phone, phoneCode});
    return data;
  }
  /**
   * 短信验证码
   */
  static async sms (phone) {
    const url = `${this.userUrl}/api/login/sendPhoneCode`;
    const data = await this.post(url, {phone: phone});
    return data.msg;
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
