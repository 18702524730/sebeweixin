import base from './base'
import wepy from 'wepy';

export default class customer extends base {
  /**
   * 列表页
   */
  static async oldLists(customerType, noShowLoading) {
    const url = `${this.cartUrl}/asistant/findAsistantCustomers.htm`;
    const data = await this.post(url,{customerType}, noShowLoading);
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
  static async infoNamePhoto(avatar, truename) {
    const url = `${this.userUrl}/api/updateAsistantMember`;
    const data = await this.post(url,{avatar, truename});
    return data;
  }
}
