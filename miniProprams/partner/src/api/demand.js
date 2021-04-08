import http from '@/plugins/flyio/request'
import qs from 'qs'
const { indexUrl } = CONFIG;

export default {
  async findPartnerRequirementList(params) {//需求管理列表
    const url = `${indexUrl}/requirement/findPartnerRequirementList.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async findPartnerRequirementDetail(params) {//需求管理详情
    const url = `${indexUrl}/requirement/findPartnerRequirementDetail.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async closeRequirement(params) {//关闭需求单
    const url = `${indexUrl}/requirement/closeRequirement.htm`;
    return await http.post(url, params)
  },
  async addRequirementMessage(params) {//添加留言
    const url = `${indexUrl}/requirement/addRequirementMessage.htm`;
    return await http.post(url, params)
  },
  async statisticsRequirement(params) {//需求单统计
    const url = `${indexUrl}/requirement/statisticsRequirement.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async startProcessingRequirement(params) {//需求处理
    const url = `${indexUrl}/requirement/startProcessingRequirement.htm`;
    return await http.post(url, params)
  },
  async findpartnerProductBycode(params) {//需求处理
    const url = `${indexUrl}/createOrder/findpartnerProductBycode.htm`;
    return await http.post(url, params)
  },

}
