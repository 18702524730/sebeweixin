import wepy from 'wepy';
const app = getApp();

const init = {
  /**
   * 获取session miniAppType 2 用户中心小程序 3 渠道商小程序
   */
  async getSession(code, miniAppType) {
    const url = `${wepy.$instance.globalData.wxUrl}/weixin/miniApp/getMiniAppSessionId.do`;
    const data = await wepy.request({
      url, 
      method: 'POST',
      data: {code:code, miniAppType:miniAppType}
    });
    console.log(data.data)
    return data.data;
  },

  /**
   * 解密用户数据，获取openid
   */
  async decodeUserInfo(miniAppType, miniAppSessionId, encryptedData, iv) {
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
  async setValidSession(miniAppType) {
    const res = await wepy.login();
    const sessionRes = await this.getSession(res.code, miniAppType);
    wepy.$instance.globalData.sessionId = sessionRes.miniAppSessionId;
    wepy.setStorageSync('sessionId', sessionRes.miniAppSessionId);
    return sessionRes;
  },

  async checkLogin() {
    try {
      // 检查用户登录态
      await wepy.checkSession();

    } catch (e) {
      // 登录态失效
      let sessionRes = await this.setValidSession(2); // 登录获取code,再取得sessionId,并存储
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
        let userInfo = await this.decodeUserInfo(2, wepy.$instance.globalData.sessionId, res.encryptedData, res.iv);
        // 存储用户信息
        this.syncStore(userInfo);
      }
    }
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

module.exports = init
