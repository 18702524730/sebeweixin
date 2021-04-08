import base from './base'
import wepy from 'wepy';

export default class companyApi extends base {
  /**
   * 查询我的企业列表和关注的企业列表
   */
  static async findStewardSubject(params = {}, noShowLoading) {
  	let ret = {
  		applicationType: 1,
  		page: 1,
  		size: 10
  	}
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/findStewardSubject`;
    const data = await this.get(url, {...ret, ...params}, noShowLoading);
    return data;
  }

  /**
   * 根据企业名称查询企业列表
   */
  static async companyInfoList(params = {}, noShowLoading) {
  	let ret = {
  		companyName: '',
  		page: 1,
  		size: 10
  	}
    const url = `${this.baseUrl}/steward/companyInfo/selectVagueCompanyInfo`;
    const data = await this.get(url, {...ret, ...params}, noShowLoading);
    return data;
  }

  /**
   * 根据企业关键字查企业名称列表
   */
  static async companyNameList(companyName, noShowLoading) {
  	if (!companyName) {return}
    const url = `${this.baseUrl}/steward/companyInfo/selectCompanyInfoName`;
    const data = await this.get(url, {companyName}, noShowLoading);
    return data;
  }


  /**
   * 设置企业
   */
  static async addStewardSubject(params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/addStewardSubject`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

  /**
   * 设置企业更换类型
   */
  static async shiftApplicationType(params, noShowLoading) {
    const url = `${this.baseUrl}/steward/smallStewardTadeMark/shiftApplicationType`;
    const data = await this.post(url, params, noShowLoading);
    return data;
  }

}
