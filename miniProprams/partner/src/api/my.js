import http from '@/plugins/flyio/request'
const { cartUrl, wxUrl, userUrl, indexUrl } = CONFIG;

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
    const url = `${indexUrl}/partner/b.htm`;
    const data = await http.get(url, params, noShowLoading);
    return data
  },
  // 保存个人资料
  async savePersonInfo (params, noShowLoading) {
    const url = `${indexUrl}/partner/b.htm`;
    const data = await http.put(url, params, noShowLoading);
    return data
  },
  // 查询实名认证信息
  async getAuthInfo (params, noShowLoading) {
    const url = `${indexUrl}/partner/b/auth.htm`;
    const data = await http.get(url, params, noShowLoading);
    return data
  },
  // 我的邀请
  async findInviteOpenStore (params, noShowLoading) {
    const url = `${indexUrl}/my/findInviteOpenStore.htm`;
    const data = await http.get(url, params, noShowLoading);
    return data
  },
  // 我的收益
  async findAcceptCommission (params, noShowLoading) {
    const url = `${indexUrl}/my/findAcceptCommission.htm`;
    const data = await http.get(url, params, noShowLoading);
    return data
  },
  // 统计验收/可用余额/邀请
  async myStatistic (params) {
    const url = `${indexUrl}/my/myStatistic.htm`;
    const data = await http.get(url, params, {}, {
      isLoading: false
    });
    return data
  },
  // 我的邀请易开店、未开店
  async findInviteOpenStore (params) {
    const url = `${indexUrl}/my/findInviteOpenStore.htm`;
    const data = await http.get(url, params);
    return data
  },
  // 查询提现记录
  async findWithDrawRecord (params) {
    const url = `${indexUrl}/my/findWithDrawRecord.htm`;
    const data = await http.get(url, params);
    return data
  },
  // 查询提现详情
  async findWithDrawDetail (id) {
    const url = `${indexUrl}/my/findWithDrawDetail/${id}.htm`;
    const data = await http.get(url);
    return data
  },
  // 查询银行卡信息
  async findBankCard (params) {
    const url = `${indexUrl}/my/findBankCard.htm`;
    const data = await http.get(url, params);
    return data
  },
  // 填写银行卡信息
  async changeBandCard (params) {
    const url = `${indexUrl}/my/changeBandCard.htm`;
    const data = await http.put(url, params);
    return data
  },
  // 填写银行卡信息 新接口
  async newChangeBandCard (params) {
    const url = `${indexUrl}/my/v1/changeBandCard.htm`;
    const data = await http.put(url, params);
    return data
  },
  // 提现
  async withDraw (params) {
    const url = `${indexUrl}/my/withDraw.htm`;
    const data = await http.post(url, params);
    return data
  },
  // 查询个人所得税
  async findPersonalTax (params) {
    const url = `${indexUrl}/my/findPersonalTax.htm`;
    const data = await http.get(url, params);
    return data
  },
  // IPT统计
  async iptStatisticsInfo (params) {
    const url = `${indexUrl}/partner/b/iptStatisticsInfo.htm`;
    const data = await http.get(url, params, {}, {
      isLoading: false
    });
    return data
  },
  // 收支明细
  async findIncomeExpense (params) {
    const url = `${indexUrl}/my/findIncomeExpense.htm`;
    const data = await http.get(url, params);
    return data
  },

  // 材料中心 获取材料列表
  async getMaterialData () {
    const url = `${indexUrl}/partner/b/materialCenter.htm`;
    const data = await http.get(url);
    return data
  },

  // 材料中心 发送到邮箱
  async email (params) {
    const url = `${indexUrl}/partner/b/materialCenter.htm`;
    const data = await http.post(url, params);
    return data
  },

  // 拾贝券 拾贝券数量
  async countProfitCoupon (params) {
    const url = `${indexUrl}/coupon/countProfitCoupon.htm`;
    const data = await http.get(url, params, {}, {
      isLoading: false
    });
    return data
  },

  // 拾贝券 查询拾贝券列表
  async findprofitCoupon (params) {
    const url = `${indexUrl}/coupon/findprofitCoupon.htm`;
    const data = await http.get(url, params);
    return data
  },

  // 拾贝券 自动选择优惠券
  async automaticCoupon (params) {
    const url = `${indexUrl}/coupon/automaticCoupon.htm`;
    const data = await http.post(url, params);
    return data
  },

  // 规则中心 规则中心列表
  async ruleList (params) {
    const url = `${indexUrl}/partner/homepage/category.htm`;
    const data = await http.get(url, params);
    return data
  },

}
