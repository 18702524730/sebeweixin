import base from './base'
import wepy from 'wepy';

export default class records extends base {
  /**
   * 列表页
   */
  static async recordLists(page, noShowLoading) {
    const url = `${this.cartUrl}/asistant/findAsistantOrdersPayed.htm`;
    const data = await this.post(url, {page}, noShowLoading);
    return data;
  }
  static async infoChange(customerId, companyName, applyName, applyPhone, remarks) {
    const url = `${this.cartUrl}/asistant/updateAsistantCustomer.htm`;
    const data = await this.post(url,{customerId, companyName, applyName, applyPhone, remarks});
    return data;
  }
  static async infoAdd(customerType, companyName, applyName, applyPhone, remarks) {
    const url = `${this.cartUrl}/asistant/createAsistantCustomer.htm`;
    const data = await this.post(url,{customerType, companyName, applyName, applyPhone, remarks});
    return data;
  }
}
