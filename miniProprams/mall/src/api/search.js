import base from './base'
import wepy from 'wepy';
import qs from 'qs'

export default class search extends base {
  /**
   * 近似查询列表
   */
  static async similarLists(param, noShowLoading) {
    const url = `${this.wxUrl}/weixin/bzgapi/similar`;
    const data = await this.stringPost(url, param, noShowLoading);
    return data.data;
  }

  /**
   * 精确查询列表
   */
  static async preciseLists(param, noShowLoading) {
    const url = `${this.wxUrl}/weixin/bzgapi/precise`;
    const data = await this.stringPost(url, param, noShowLoading);
    return data.data;
  }

  /**
   * 图形查询列表
   */
  static async doimgLists(param, noShowLoading) {
    const url = `${this.wxUrl}/weixin/bzgapi/doimgByUrl`;
    const data = await this.stringPost(url, param, noShowLoading);
    return data.data;
  }

  /**
   * 生成报告
   */
  static async creatReport(param, noShowLoading) {
    const url = `${this.wxUrl}/weixin/bzgapi/makereportToUrl`;
    const data = await this.stringPost(url, param, noShowLoading);
    return data.data;
  }

  /**
   * 商标详情页
   */
  static async details(param, noShowLoading) {
    const url = `${this.wxUrl}/weixin/bzgapi/detaile`;
    const data = await this.get(url, qs.stringify(param), noShowLoading);
    return data;
  }




}
