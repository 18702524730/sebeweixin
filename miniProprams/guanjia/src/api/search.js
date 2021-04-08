import base from './base'
import wepy from 'wepy';

export default class search extends base {
	/**
	 * 查询商标
	 */
	static async findTrademark(params, noShowLoading) {
		let ret = {
			keyword: '',
			searchType: 3,
			intCls: '',
			stewardSubjectId:'',
			isCompany: 0,
			page: 1,
			size: 10
		}
		const url = `${this.baseUrl}/steward/smallStewardTadeMark/findTrademark`;
		const data = await this.get(url, {...ret, ...params}, noShowLoading);
		return data;
	}

	/**
	 * 添加商标托管
	 */
	static async addStewardTm(params, noShowLoading) {
		const url = `${this.baseUrl}/steward/smallStewardTadeMark/addStewardTrademarkinfo`;
		const data = await this.post(url, params, noShowLoading);
		return data;
	}

	/**
	 * 取消商标托管
	 */
	static async deleteStewardTm(params, noShowLoading) {
		const url = `${this.baseUrl}/steward/smallStewardTadeMark/deleteStewardTrademarkinfo`;
		const data = await this.post(url, params, noShowLoading);
		return data;
	}

	/**
	 * 搜索历史记录
	 */
	static async selectRecordList(params, noShowLoading) {
		let ret = {
			recordType: 1,
			page: 1,
			size: 6,
		}
		const url = `${this.baseUrl}/steward/smallStewardTadeMark/selectRecordList`;
		const data = await this.get(url, {...ret, ...params}, noShowLoading);
		return data;
	}

	/**
	 * 删除历史记录
	 */
	static async deleteRecord(params, noShowLoading) {
		let ret = {
			recordType: 1,
		}
		const url = `${this.baseUrl}/steward/smallStewardTadeMark/deleteRecord`;
		const data = await this.get(url, {...ret, ...params}, noShowLoading);
		return data;
	}
}
