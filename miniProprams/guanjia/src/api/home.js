import base from './base'
import wepy from 'wepy';

export default class homeQuery extends base {
  /**
   * 查询企业列表
   */
  static async findCompanyList (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findStewardSubject`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  /**
   * 查询企业列表(企业管理)
   */
  static async findCompanyListd (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findStewardSubjectD`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

   /**
   * 查询企业列表(消息列表页)
   */
  static async findFilterSub (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findFilterSub`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  /**
   * 查询核心商标
   */
  static async findCoreTrademark (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findCoreTrademark`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  /**
   * 删除核心商标
   */
  static async deleteCoreStewardTrademarkinfo (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/deleteCoreStewardTrademarkinfo`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

  /**
   * 查询核心商标详情
   */
  static async findCoreTrademarkDetails (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findCoreTrademarkDetails`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  /**
   * 查询已托管商标列表
   */
  static async findStewardTrademark (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findStewardTrademark`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  /**
   * 添加核心商标
   */
  static async addCoreStewardTrademarkinfo (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/addCoreStewardTrademarkinfo`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

  /**
   * 查询已托管商标列表
   */
  static async findStewardTrademark (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findStewardTrademark`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  /**
   * 商标分类
   */
  static async statisticsTrademark (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/statisticsTrademark`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  /**
   * 删除托管商标
   */
  static async deleteStewardTrademarkinfo (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/deleteStewardTrademarkinfo`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

  /**
   * 消息中心
   */
  static async statisticsNews (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/statisticsNews`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

   /**
   * 删除企业
   */
  static async deleteStewardSubject (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/deleteStewardSubject`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

  /**
   * 查询消息列表（总列表）
   */
  static async findNewsList (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findNewsList`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

   /**
   * 查询消息列表
   */
  static async findNews (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findNews`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  /**
   * 企业设为首页展示
   */
  static async firstHomePage (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/firstHomePage`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

  /**
   * 消息列表页设为已读状态
   */
  static async readNews (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/readNews`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

  // 查询商标托管的数据信息
  static async findVip () {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findVip`;
    const data = await this.get(url, {}, true);
    return data;
  }

  // 查询相同近似商标
  static async findNewsTrademark (params, noShowLoading = true) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findNewsTrademark`;
   	const data = await this.get(url, params, noShowLoading);
    return data;
  }

  // 统计消息类型数量
  static async statisticsNewsTypeClass (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/statisticsNewsTypeClass`;
    const data = await this.get(url, params, noShowLoading);
    return data;
  }

  // 上传文件
  static async uploadData (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/FileController/uploadData`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

  // 反馈意见
  static async addOpinionFeedback (params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/addOpinionFeedback`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

}
