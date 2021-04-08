const WxNotificationCenter = require('./WxNotificationCenter.js');

export default class Event {
  // 服务协议更新事件
  static SERVICE_AGREEMENT_UPDATE = 'SERVICE_AGREEMENT_UPDATE';
  
  static listen(eventName, callback, observer) {
    WxNotificationCenter.addNotification(eventName, callback, observer);
  }

  static emit(eventName, params) {
    WxNotificationCenter.postNotificationName(eventName, params);
  }

  static remove(eventName, observer) {
    WxNotificationCenter.removeNotification(eventName, observer);
  }
}
