const { payUrl, indexPath } = CONFIG;
export default {
  // 检查是否登录绑定，若未登录则跳转授权或绑定手机页面，并同时标记页面来源，便于重新绑定手机后的页面跳转
  async checkLoginAndMark(markFrom) {
    let query = this.$root.$mp.query;
    // 若有noHandle标记，不校验登录
    if (query && query.noHandle) {return false}
    if(markFrom=='index'){
      
    }
    let sessionRes = await this.API.interfaces.checkLogin();
    // console.log('sessionRes:',sessionRes, query)
    // 已登录(拾贝登录)
    console.log(sessionRes.isLogin)
    if (sessionRes.isLogin) {
      let userData = this.$storage.get('auth');
      // markFrom不传值，默认为授权页面调用, 直接跳转首页
      if (!markFrom) {
        console.log('in markFrom query', query)
        // this.$storage.set('query', Object({}, query, { noHandle: 1 }))
        // if (query.path && query.path.indexOf('serviceDetail') != -1) {
        //   console.log('entry serviceDetail page')
        //   query.storeCode ? wx.setStorageSync("storeCode", query.storeCode) : ''
        //   query.productNum ? wx.setStorageSync("productNum", query.productNum) : ''
        //   this.$router.replace({path: '/pages/store/serviceDetail'})
        // } else {
        //   console.log('entyr index page', query)
        // }
        if ( (query.path && query.path.indexOf('index/index') != -1) || !query.path)  {
          wx.switchTab({ url: '/pages/index/index'})
        } else if (query.path) {
          console.log('entry other path', query)
          this.$router.replace({
            path: query.path,
            query: {
              ...query,
              noHandle: 1
            }
          });
        }
      }
      return;
    }
    // true 已授权但未绑定  false 未授权
    let isAuth = await this.API.interfaces.getAuthSetting('userInfo');

    // markFrom不传值，默认为授权页面调用，所以不处理
    if (!markFrom && !isAuth) {
      return false;
    }
    let path = isAuth ? '/pages/authorize/bindPhone' : '/pages/authorize/authorize'
    console.log('testquery', query)
    this.$router.replace({
      path,
      query: {
        ...query,
        noHandle: 1,
        from: markFrom
      }
    });
    console.log('isAuth:', isAuth)
    return isAuth;
  },
  // 微信支付
  wechatPay (orderSn, paymentSn, success, fail) {
    let self = this;
    // 防止重复提交
    if (this.isPaying) {
      return;
    }
    this.isPaying = true;

    let paymentBody = {};
    paymentBody.order_sn = orderSn;
    paymentBody.payment_sn = paymentSn;
    paymentBody.payment_type = 2; //支付方式1:公众号支付，2：小程序支付，不传默认1
    paymentBody.openid = self.$storage.get('sessionId');
    let token = self.$storage.get('key');
    let sessionId = self.$storage.get('sessionId');
    let url = payUrl + '/iprp_app/api/wxpayment';
    console.log('paymentBody:', paymentBody, 'sessionId:', self.$storage.get('sessionId'))
    wx.request({
      url: url,
      method: 'POST',
      data: paymentBody,
      header: {
        'Authorization': token,
        'SessionId': sessionId,
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res){
        console.log(res)
        let data = res.data;
        if (data.status && data.status !== 200) {
          self.isPaying = false;
          self.$message({content: data.msg, type: 'error' })
          return;
        }
        let ret = {};
        ret.timeStamp = data.timeStamp;
        ret.nonceStr = data.nonceStr;
        ret.package = data.package;
        ret.signType = data.signType;
        ret.paySign = data.paySign;
        wx.requestPayment({
          ...ret,
          success (res) {
            console.log('支付成功');
            self.isPaying = false;
            success && success();
          },
          fail (e) {
            self.isPaying = false;
            console.log('支付失败');
            fail && fail();
          }
        })
      },
      fail(err){
        self.isPaying = false;
        console.log('调用微信支付：', err);
        fail && fail();
      }
    });
  },
  // 强制更新小程序
  async forceUpdateManager() {
    if (typeof wx.getUpdateManager === 'function') {
      const updateManager = wx.getUpdateManager()
      var userRequireUpdate = false
      // 检测更新
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          // 这儿强制只能点击确定
          console.log('有新版本')
          userRequireUpdate = true
          /*
          wx.showModal({
            title: '提示',
            content: '有新版本，需要更新后才能使用',
            showCancel: false,
            confirmText: '确定',
            success: function(res) {
              if (res.confirm) {
                userRequireUpdate = true
              }
            }
          })
          */
        }
      })

      updateManager.onUpdateReady(function () {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        if (userRequireUpdate) {
          // todo B端清除所有缓存 C端慎重
          // 版本下载完成后跳转至更新页面
          console.log('新版本下载完成')
          wx.redirectTo({
            url: '/pages/store/update'
          })
          // updateManager.applyUpdate()
        }
      })

      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
      })
    }
  }
}
