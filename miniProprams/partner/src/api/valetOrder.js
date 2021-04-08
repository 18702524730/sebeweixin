import http from '@/plugins/flyio/request'
const { indexUrl } = CONFIG;

export default {
  /**
   * 代客下单
   */
  async createOrder (data) {
    const url = `${indexUrl}/createOrder/pushPartnerOrder.htm`;
    return await http.post(url, data);
  },
  /**
   * 查询老用户
   */
  async findAsistantCustomers (data) {
    const url = `${indexUrl}/asistant/findAsistantCustomers.htm`;
    return await http.post(url, data);
  },
  /**
   * 查询服务商品
   */
  async findpartnerProduct (data) {
    const url = `${indexUrl}/createOrder/findpartnerProduct.htm`;
    return await http.get(url, data);
  },
  /**
   * 删除订单
   */
  async deleteOrder (data) {
    const url = `${indexUrl}/createOrder/deleteOrder.htm`;
    return await http.post(url, data);
  },
   /**
   * 合伙人是否存在
   */
  async examinePhone (data) {
    const url = `${indexUrl}/createOrder/examinePhone.htm`;
    return await http.get(url, data);
  },
  /**
   * 获取小项价格
   */
  async getMinPrice (data) {
    const url = `${indexUrl}/createOrder/getMinPrice.htm`;
    return await http.get(url, data);
  }

}
