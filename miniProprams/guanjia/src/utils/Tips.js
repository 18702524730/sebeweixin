/**
 * 提示与加载工具类
 */
export default class Tips {
  static isLoading = false;
  static pause = false;
  /**
   * 弹出提示框
   */

  static success(title, duration = 1500) {
    wx.showToast({
      title: title,
      icon: 'success',
      mask: true,
      duration: duration
    })
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, duration);
      });
    }
  }

  /**
   * 弹出确认窗口
   */
  static modal (text, options = {}) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: options.title || '温馨提示',
        content: text,
        showCancel: false,
        confirmText: options.confirmText || '确定',
        confirmColor: options.confirmColor || '#4272FF',
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res);
        }
      })
    })
  }

  /**
   * 弹出确认窗口
   */
  static confirm (text, options = {}, payload = {}) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: options.title || '温馨提示',
        content: text,
        showCancel: options.showCancel || true,
        cancelText: options.cancelText || '取消',
        cancelColor: options.cancelColor || '#000000',
        confirmText: options.confirmText || '确定',
        confirmColor: options.confirmColor || '#4272FF',
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  }

  static toast (title, onHide, icon = 'none') {
    wx.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration: 1500
    })
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 1500)
    }
  }

  /**
   * 警告框
   */
  static alert (title) {
    wx.showToast({
      title: title,
      image: '/images/icons/alert.png',
      mask: true,
      duration: 1500
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }
  /**
   * 错误框
   */

  static error (title, onHide) {
    wx.showToast({
      title: title,
      image: '/images/icons/error.png',
      mask: true,
      duration: 1500
    });
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 1500)
    }
  }

  /**
   * 弹出加载提示
   */
  static loading (title = '加载中', force = false) {
    if (this.isLoading && !force) {
      return;
    }
    this.isLoading = true;
    if (wx.showLoading) {
      wx.showLoading({
        title: title,
        mask: true
      });
    } else {
      wx.showNavigationBarLoading();
    }
  }

  /**
   * 加载完毕
   */
  static loaded () {
    if (this.isLoading) {
      this.isLoading = false;
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideNavigationBarLoading();
      }
    }
  }

  /**
   * 弹出下拉动作栏
   */
  static action (...items) {
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: items,
        success: function (res) {
          const result = {
            index: res.tapIndex,
            text: items[res.tapIndex]
          }
          resolve(result)
        },
        fail: function (res) {
          reject(res.errMsg)
        }
      })
    })
  }

  static actionWithFunc (items, ...functions) {
    wx.showActionSheet({
      itemList: items,
      success: function (res) {
        const index = res.tapIndex
        if (index >= 0 && index < functions.length) {
          functions[index]()
        }
      }
    })
  }

  static share (title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功')
      }
    }
  }

  static setLoading () {
    this.isLoading = true;
  }
}
