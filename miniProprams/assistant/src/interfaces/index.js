import wepy from 'wepy'
const miniAppType = 3; // 2 微商城小程序 3 推单助手小程序

const interfaces = {
	/**
   * 创建ajax头部信息
   */
	createAuthHeader() {
    const token = wepy.getStorageSync('key');
    const sessionId = wepy.getStorageSync('sessionId');
    const header = {};
    if (token) {
      header['Authorization'] = token;
    }
    if (sessionId) {
      header['MiniAppSessionId'] = sessionId;
    }
    header['MiniAppType'] = miniAppType;
    return header;
  },

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
    const url = `${wepy.$instance.globalData.wxUrl}/weixin/miniApp/getWxAccessToken.do`;
    const data = await wepy.request({
      url,
      method: 'POST',
      data: {miniAppType, miniAppSessionId}
    });
    if (data.data.code === 0) {
    	wepy.setStorageSync('accessToken', data.data.accesstoken);
    }else{
    	wepy.setStorageSync('accessToken', '');
    }
    return data.data;
  },

  async reLogin() {
  	try {
  		// 清空所有缓存数据
    	wepy.clearStorageSync()
		} catch(e) {
		}
    let sessionRes = await this.setValidSession(); // 登录获取code,再取得sessionId,并存储
    if (sessionRes.memberDto) {
      this.syncStore(sessionRes);
    }else{
      // 获取用户信息，包括加密的
      let res = await wepy.getUserInfo({
        withCredentials: true,
        lang: 'zh_CN'
      });
      // console.log(res)
      // 解密
      let userInfo = await this.decodeUserInfo(wepy.$instance.globalData.sessionId, res.encryptedData, res.iv);
      // 存储用户信息
      this.syncStore(userInfo);
    }
    return sessionRes;
  },

  async checkLogin() {
  	let sessionRes = {}
  	if (!wepy.getStorageSync('sessionId')) {
  		sessionRes = await this.reLogin()
  		return sessionRes;
  	}
    try {
      // 检查用户登录态
      await wepy.checkSession();
      sessionRes.isLogin = true;
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
