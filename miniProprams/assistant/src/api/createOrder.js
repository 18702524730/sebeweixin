import base from './base'
import wepy from 'wepy';

export default class createOrder extends base {
  /**
   * 根据id查询商品类目
   */
  static async findShopProduct(shopBusinessTypeId = 0, shopProductId = 0, noShowLoading) {
    const url = `${this.cartUrl}/asistant/findShopProduct.htm`;
    const data = await this.post(url,{ shopBusinessTypeId, shopProductId }, noShowLoading);
    return data;
  }

  /**
   * 查询商品所有类目
   */
  static async findShopProductAll(noShowLoading) {
    const url = `${this.cartUrl}/asistant/findShopProductAll.htm`;
    const data = await this.post(url, {}, noShowLoading);
    return data;
  }

}
