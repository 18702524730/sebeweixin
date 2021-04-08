import base from './base'
import wepy from 'wepy';

export default class order extends base {
  /**
   * 列表页
   */
  static async lists(id) {
    const url = `${this.cartUrl}/asistant/asistantList.htm?asistantOrderCustomerId=${id}`;
    const data = await this.get(url);
    return data;
  }
  /**
    *订单页
   */
  static async orderLists(page, noShowLoading) {
    const url = `${this.userUrl}/api/findAsistantOrderList4TradeMarket?orderState=99&page=${page}&size=5`;
    const data = await this.get(url, {}, noShowLoading);
    return data;
  }
    /**
    *订单详情页
   */
  static async orderDetails(orderFictitiousSn) {
    const url = `${this.userUrl}/api/findFictitiousDetails`;
    const data = await this.get(url,{orderFictitiousSn}, true);
    return data;
  }
  /**
    *商标服务单页面
   */
  static async tmLists(page, noShowLoading) {
    const url = `${this.userUrl}/api/selectServceOrderList4TradeMarket?page=${page}&size=5`;
    const data = await this.get(url, {}, noShowLoading);
    return data;
  }
  /**
    *商标服务单详情页
   */
  static async tmDetails(orderSn) {
    const url = `${this.userUrl}/api/findServiceOrderDetail4TradeMarket`;
    const data = await this.get(url,{orderSn}, true);
    return data;
  }
  /**
   * 解密用户手机号
   */
  static async decodePhoneNumber(miniAppSessionId, encryptedData, iv) {
    const url = `${this.wxUrl}/weixin/miniApp/decodePhoneNumber.do`;
    const data = await this.post(url, {miniAppType: this.miniAppType, miniAppSessionId, encryptedData, iv});
    return data;
  }
  /**
    *首页
   */
  static async homepage(orderFictitiousSn) {
    const url = `${this.userUrl}/api/findFictitiousDetails`;
    const data = await this.get(url,{orderFictitiousSn});
    return data;
  }
    /**
    *首页-订单详情页
   */
  static async homepageDetails(priceId) {
    const url = `${this.cartUrl}/products/detail.htm`;
    const data = await this.get(url,{priceId});
    return data;
  }
  // 创建订单
  static async createOrder(item) {
    const url = `${this.cartUrl}/cartWeb/nowPlaceOrderMobine.htm`;
    const data = await this.get(url,item)
    return data;
  }
  // 订单详情
  static async orderDetail(orderFictitiousSn) {
    const url = `${this.userUrl}/api/findFictitiousDetails`;
    const data = await this.get(url,{orderFictitiousSn})
    return data;
  }

  // 商标查询详情页
  static async trademarkDetail(info_id,reg_code) {
    const url = `${this.wxUrl}/weixin/bzgapi/detaile?info_id=${info_id}&reg_code=${reg_code}`;
    const data = await this.get(url)
    return data;
  }

  static async findFeedbackList(orderId) {//查看办理进度
    const url = `${this.indexUrl}/serviceOrder/findFeedbackList.htm?orderId=${orderId}&userType=1`;
    return await this.get(url)
  }

  // 商标查询报告页
  static async pdfPage(info_url) {
    const url = `${this.wxUrl}/weixin/bzgapi/preview.do?pdfUrl=${info_url}`;
    const data = await this.get(url)
    return data;
  }
}
