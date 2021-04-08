import wepy from 'wepy'
import Tips from './Tips';
import interfaces from '../interfaces'
const app = getApp();

// HTTP工具类
export default class http {
  static async request (method, url, data, noShowLoading) {
    const param = {
      url: url,
      method: method,
      data: data
    };
    if (!noShowLoading) {
    	Tips.loading();
    }
    try{
	    const res = await wepy.request(param);
	    if (!noShowLoading) {
	    	Tips.loaded();
	    }
	    if (this.isSuccess(res)) {
	    	if (res.data && res.data.code == '0800001') {
	    		console.log('httpJs:0800001');
	    		interfaces.reLogin();
	    	}
	      return res.data;
	    } else {
	      console.error(method, url, data, res);
	      // 后端接口太乱，不统一，没法统一处理一致的异常
	      throw res.data; // this.requestException(res);
	    }
    }catch(err){
    	console.error('request: catch error');
    	if (!noShowLoading) {
	    	Tips.loaded();
	    }
    	return {
    		code: 404
    	}
    }
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return false;
    }
    const wxData = res.data;
    return wxData;
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {};
    error.statusCode = res.statusCode;
    const wxData = res.data;
    const serverData = wxData.data;
    if (serverData) {
      error.serverCode = wxData.code;
      error.message = serverData.message;
      error.serverData = serverData;
    }
    return error;
  }

  static get (url, data, noShowLoading) {
    return this.request('GET', url, data, noShowLoading)
  }

  static put (url, data, noShowLoading) {
    return this.request('PUT', url, data, noShowLoading)
  }

  static post (url, data, noShowLoading) {
    return this.request('POST', url, data, noShowLoading)
  }

  static patch (url, data, noShowLoading) {
    return this.request('PATCH', url, data, noShowLoading)
  }

  static delete (url, data, noShowLoading) {
    return this.request('DELETE', url, data, noShowLoading)
  }

  static setHeader (){
  	const token = wepy.getStorageSync('key');
    const sessionId = wepy.getStorageSync('sessionId');
    const header = {};
    if (token) {
      header['Authorization'] = token;
    }
    if (sessionId) {
      header['SessionId'] = sessionId;
    }
    return header;
  }
  static stringGet (url, data) {
  	let header = this.setHeader();
  	header['content-type'] = 'application/x-www-form-urlencoded';
    return wepy.request({
		  url: url,
		  method: 'GET',
		  data: data,
		  header: header
		});
  }

  static stringPost (url, data) {
    let header = this.setHeader();
  	header['content-type'] = 'application/x-www-form-urlencoded';
    return wx.request({
		  url: url,
		  method: 'POST',
		  data: data,
		  header: header
		});
  }
}
