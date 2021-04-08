import http from '@/plugins/flyio/request'
const { indexUrl } = CONFIG;

export default {
  //查询所有问题
  async findAllForeignTrade(tipconfig) {
    const url = `${indexUrl}/foreignTrade/findAllForeignTradeProblemClasses.htm`;
    return await http.get(url,{},{},tipconfig);
  },
  // 获取帮助
  async submitForeignTrade(data) {
    const url = `${indexUrl}/foreignTrade/submitForeignTradeProblem.htm`;
    return await http.post(url,data);
  },
  // oem鉴别
  async submitOem(data) {
    const url = `${indexUrl}/foreignTrade/submitOemIdentify.htm`;
    return await http.post(url,data);
  },
  // 我的问题列表
  async findMyForeignTrade(data,tipconfig) {
    const url = `${indexUrl}/foreignTrade/findMyForeignTradeProblemList.htm`;
    return await http.get(url,data,{},tipconfig);
  },
  // 我的问题详情
  async findMyForeignTradeDetail(id) {
    const url = `${indexUrl}/foreignTrade/findMyForeignTradeProblemDetail/${id}.htm`;
    return await http.get(url);
  },
}
