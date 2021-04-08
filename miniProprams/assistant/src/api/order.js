import base from './base'
import wepy from 'wepy';

export default class auth extends base {
  /**
   * 列表页
   */
  static async lists(id) {
    const url = `${this.cartUrl}/asistant/asistantList.htm?asistantOrderCustomerId=${id}`;
    const data = await this.get(url);
    return data;
  }
  /**
   * 成单记录
   */
  static async orderLists(page, status, noShowLoading) {
    const url = `${this.cartUrl}/asistant/findAsistantOrders.htm`;
    const data = await this.post(url, {page, status}, noShowLoading);
    return data;
  }
  /**
   * 详情
   */
  static async orderDetails(orderCustomerId, noShowLoading) {
    const url = `${this.cartUrl}/asistant/detailAsistantOrder.htm`;
    const data = await this.post(url, {orderCustomerId}, noShowLoading);
    return data;
  }

  static async decodePhoneNumber(miniAppSessionId, encryptedData, iv) {
    const url = `${this.wxUrl}/weixin/miniApp/decodePhoneNumber.do`;
    const data = await this.post(url, {miniAppType: this.miniAppType, miniAppSessionId, encryptedData, iv});
    return data;
  }
}
