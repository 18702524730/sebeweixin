import http from '@/plugins/flyio/request'
const { cartUrl, wxUrl, userUrl, indexUrl } = CONFIG;

export default {
  // 获取客户列表信息 主体类型，0：全部 1：国内个人，2：国内企业，3：境外个人，4：境外企业
  async getCustomerList (applyType) {
    const url = `${indexUrl}/workOrder/findApplyMemberList.htm`;
    const data = await http.get(url, {applyType});
    return data.elements;
  },

  // 根据id获取单条客户信息
  async getCustomerItem (applySubjectId) {
    const url = `${indexUrl}/workOrder/findApplyMemberDetail.htm`;
    const data = await http.get(url, {applySubjectId});
    return data;
  },

  // 保存/修改单条客户信息
  async saveCustomerItem (ret) {
    const url = `${indexUrl}/workOrder/modifyApplyMember.htm`;
    const data = await http.post(url, ret);
    return data;
  },

  // 删除单条客户信息
  async delCustomerItem (applySubjectId) {
    const url = `${indexUrl}/workOrder/deleteApplyMember.htm`;
    const data = await http.delete(url, {applySubjectId});
    return data;
  },

  // 查询群组和小项
  async getNiceGroup (classId) {
    const url = `${indexUrl}/createOrder/getNiceGroupByClassId/${classId}.htm`;
    const data = await http.get(url);
    return data.elements;
  },

  // 提交用户确认
  async confirmAndPush (ret) {
    const url = `${indexUrl}/workOrder/dojob.htm`;
    const data = await http.post(url, ret);
    return data;
  },

  // 提交审核
  async submitToCheck (ret) {
    const url = `${indexUrl}/workOrder/submit.htm`;
    const data = await http.post(url, ret);
    return data;
  },

  // 匹配企业信息
  async findCompanyInfo (name) {
    const url = `${indexUrl}/workOrder/findCompanyInfo.htm`;
    const data = await http.get(url, {name});
    return data.elements;
  },

  // 搜索企业详情
  async findCompanyDetail (name) {
    const url = `${indexUrl}/workOrder/findCompanyDetail.htm`;
    const data = await http.get(url, {name});
    return data;
  },

  // 获取小项价格
  async getMinPrice () {
    const url = `${indexUrl}/createOrder/getMinPrice.htm`;
    const data = await http.get(url, {}, {}, {
      isLoading: false
    });
    return data.price;
  },

  // 自动生成商标图片
  async autoCreateTmPic (trademarkName) {
    const url = `${indexUrl}/workOrder/autoCreateTmPic.htm`;
    const data = await http.get(url, {trademarkName});
    return data.url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
  },

}
