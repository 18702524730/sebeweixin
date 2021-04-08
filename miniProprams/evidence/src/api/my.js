import http from '@/plugins/flyio/request'
const { cartUrl, wxUrl, userUrl, indexUrl,czUrl } = CONFIG;

export default {
  // 统计消息类型数量
  async statisticsNewsTypeClass (params, noShowLoading) {
    const url = `${wxUrl}/steward/smallStewardTadeMark/statisticsNewsTypeClass`;
    const data = await http.get(url, params, noShowLoading);
    return data;
  },

  // 上传文件
  async uploadData (params, noShowLoading) {
    const url = `${wxUrl}/steward/FileController/uploadData`;
    const data = await http.post(url, params, noShowLoading);
    return data;
  },

  // 反馈意见
  async addOpinionFeedback (params, noShowLoading) {
    const url = `${wxUrl}/steward/smallStewardTadeMark/addOpinionFeedback`;
    const data = await http.post(url, params, noShowLoading);
    return data;
  },

  // 查询个人资料
  async getPersonInfo (params, noShowLoading) {
    const url = `${indexUrl}/partner/c.htm`;
    const data = await http.get(url, params, noShowLoading);
    return data
  },
  // 保存个人资料
  async savePersonInfo (params, noShowLoading) {
    const url = `${indexUrl}/partner/c.htm`;
    const data = await http.put(url, params, noShowLoading);
    return data
  },
  // IPT统计
  async iptStatisticsInfo (params) {
    const url = `${indexUrl}/partner/c/iptStatisticsInfo.htm`;
    const data = await http.get(url, params);
    return data
  },
  // 统计验收/可用余额/邀请
  async myStatistic (params) {
    const url = `${indexUrl}/my/myStatistic.htm`;
    const data = await http.get(url, params);
    return data
  },
  // 查询所有所属行业
  async industry (params) {
    const url = `${userUrl}/api/industry?fthCode=01`;
    const data = await http.get(url, params);
    return data
  },
  // 查询所有所属行业
  async findStaticCount (params) {
    const url = `${czUrl}/EvidenceController/findStaticCount.do`;
    const data = await http.get(url, params);
    return data
  },
  
}
