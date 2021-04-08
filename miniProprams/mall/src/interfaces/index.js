import wepy from 'wepy'
const miniAppType = 2; // 2 微商城小程序 3 推单助手小程序

const interfaces = {
  /**
   * 获取session miniAppType 2 用户中心小程序 3 渠道商小程序
   */
  async getSession(code) {
    const url = `${wepy.$instance.globalData.wxUrl}/weixin/miniApp/getMiniAppSessionId.do`;
    const data = await wepy.request({
      url,
      method: 'POST',
      data: {code, miniAppType}
    });
    console.log(data.data)
    return data.data;
  },

  /**
   * 解密用户数据，获取openid
   */
  async decodeUserInfo(miniAppSessionId, encryptedData, iv) {
    const url = `${wepy.$instance.globalData.wxUrl}/weixin/miniApp/decodeUserInfo.do`;
    const data = await wepy.request({
      url,
      method: 'POST',
      data: {miniAppType, miniAppSessionId, encryptedData, iv}
    });
    return data.data;
  },

  /**
   * 设置有效的sessionId
   */
  async setValidSession() {
    const res = await wepy.login();
    const sessionRes = await this.getSession(res.code, miniAppType);
    wepy.$instance.globalData.sessionId = sessionRes.miniAppSessionId;
    wepy.setStorageSync('sessionId', sessionRes.miniAppSessionId);
    return sessionRes;
  },

  /**
   * 获取accesstoken
   */
  async getWxAccessToken(miniAppType, miniAppSessionId) {
    const url = `${wepy.$instance.globalData.wxUrl}/weixin/miniApp2/getWxAccessToken.do`;
    const data = await http.post(url, {miniAppType, miniAppSessionId});
    if (data.code === 0) {
      wx.setStorageSync('accessToken', data.accesstoken);
    }else{
      wx.setStorageSync('accessToken', '');
    }
    return data;
  },

  /**
   * 解密用户手机号
   */
  async decodePhoneNumber(miniAppSessionId, encryptedData, iv) {
    const url = `${wepy.$instance.globalData.wxUrl}/weixin/miniApp/decodePhoneNumber.do`;
    const data = await wepy.request({
      url,
      method: 'POST',
      data: {miniAppType, miniAppSessionId, encryptedData, iv}
    });
    return data;
  },

  /**
   * 获取用户手机号
   */
  async getPhoneNumber(e) {
    const sessionId = wx.getStorageSync('sessionId');
    let phoneData = await this.decodePhoneNumber(sessionId, e.mp.detail.encryptedData, e.mp.detail.iv);
    return phoneData.phoneNumber;
  },

  /**
  * 用户主动点击的授权
  */
  async getUserInfoByUser(data) {
    // 解密
    let userInfo = await this.decodeUserInfo(wx.getStorageSync('sessionId'), data.encryptedData, data.iv);
    // 存储用户信息
    this.syncStore(userInfo);
    return userInfo;
  },

  // 判断用户各项授权
  async getAuthSetting(authName) {
    let res = await wepy.getSetting();
    console.log(res);
    return !!res.authSetting['scope.' + authName];
  },

  async reLogin() {
    try {
      wx.removeStorageSync('auth');
      wx.removeStorageSync('key');
      wx.removeStorageSync('sessionId');
    } catch(e) {
    }
    let sessionRes = await this.setValidSession(); // 登录获取code,再取得sessionId,并存储
    if (sessionRes.key) {
      // 已登录（已授权已绑定）
      this.syncStore(sessionRes);
      sessionRes.isLogin = true;
    }else{
      // 未登录（未授权 或 已授权但未绑定）
      sessionRes.isLogin = false;
      wx.removeStorageSync('auth');
      wx.removeStorageSync('key');
    }
    return sessionRes;
  },

  async checkLogin() {
    let sessionRes = {}
    if (!wx.getStorageSync('sessionId')) {
      sessionRes = await this.reLogin()
      console.log('2')
      return sessionRes;
    }
    try {
      console.log('3')
      // 检查用户微信登录状态
      let data = await wepy.checkSession();
      console.log('checkSession', data)
      sessionRes.isLogin = !!wx.getStorageSync('auth');
    } catch (e) {
      sessionRes = await this.reLogin()
    }
    return sessionRes;
  },


  // 缓存用户数据和token
  syncStore(data){
    let memberDto = data.memberDto;
    let sessionId = data.miniAppSessionId;
    if (memberDto) {
      wepy.setStorageSync('auth', memberDto);
      wepy.$instance.globalData.auth = memberDto;
      // key就是token 不一定存在
      if (data.memberDto.key) {
        wepy.setStorageSync('key', data.memberDto.key);
      }
    }
    if (sessionId) {
      wepy.setStorageSync('sessionId', sessionId);
      wepy.$instance.globalData.sessionId = sessionId;
    }
  }
}

export default interfaces
