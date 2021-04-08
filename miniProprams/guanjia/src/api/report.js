import base from './base'
import wepy from 'wepy';

export default class reportApi extends base {
  /**
   * 生成专业分析报告
   */
  static async makeTadeMarkReport(params = {}, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/makeTadeMarkReport`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

}
