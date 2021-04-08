import base from './base'
import wepy from 'wepy';

export default class auth extends base {
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
  // 企业详情
  static async enterpriseDetail (name) {
    const url = `${this.ewardUrl}/steward/companyInfo/selectCompanyDetails`;
    const data = await this.get(url, {companyName: name});
    return data;
  }
  // 旗下商标
  static async trademarkIts (info) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/findTrademark`;
    const data = await this.get(url,info);
    return data;
  }
  // 旗下商标-有搜索框
  static async trademarkFilter (info) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/findFilterTrademark`;
    const data = await this.get(url,info);
    return data;
  }
  //一键托管
  static async allHost (applicationName,applicationType) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/oneBondAllTrademarkinfo`;
    const data = await this.post(url,{applicationName:applicationName,applicationType:applicationType});
    return data;
  }
  // 商标详情
  static async trademarkDetail (info) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/findTrademarkDetails`;
    const data = await this.get(url,info);
    return data;
  }
  // 近似商标
  static async markSimilar (info, noShowLoading) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/approximatetwo`;
    const data = await this.get(url, info, noShowLoading);
    return data;
  }
  // 求购商标
  static async payTrademark (info) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/wantBuy`;
    const data = await this.post(url,info);
    return data;
  }
  // 地址转经纬
  static async getXY (address) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/getXY?address=${address}`;
    const data = await this.get(url);
    return data;
  }
  // 设置企业
  static async addSteward (info) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/addStewardSubject`;
    const data = await this.post(url,info);
    return data;
  }
  // 转换设置企业
  static async shiftSteward (info) {
    const url = `${this.ewardUrl}/steward/smallStewardTadeMark/shiftApplicationType`;
    const data = await this.post(url,info);
    return data;
  }
  //解密用户手机号
  static async decodePhoneNumber(miniAppSessionId, encryptedData, iv) {
    const url = `${this.wxUrl}/weixin/miniApp/decodePhoneNumber.do`;
    const data = await this.post(url, {miniAppType: this.miniAppType, miniAppSessionId, encryptedData, iv});
    return data;
  }
  // 查询官文
  static async byRegno (regNo) {
    const url = `${this.ewardUrl}/steward/noticeListController/findNoticeByRegno`;
    const data = await this.get(url,{regno:regNo});
    return data;
  }
  // 商标局01
  static async InfoidBycodeOne (info) {
    const url = `${this.ewardUrl}/steward/sbgg/tmann/annInfoView/selectInfoidBycode.html`;
    const data = await this.get(url,info);
    return data;
  }
  // 商标局图片同步
  static async InfoidBycodeImage (info) {
    const url = `${this.ewardUrl}/steward/noticeListController/addNoticeImage`;
    const data = await this.post(url,info);
    return data;
  }
}
