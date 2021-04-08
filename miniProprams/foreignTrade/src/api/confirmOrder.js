import http from '@/plugins/flyio/request'
const { indexUrl } = CONFIG;

export default {
  // 主动下单
  async creatPartnerOrder (params) {
    const url = `${indexUrl}/createOrder/creatPartnerOrder.htm`;
    return await http.post(url, params)
  },
  // 推单 确认订单查询
  async findConfirmPartnerOrder (params) {
    const url = `${indexUrl}/createOrder/findConfirmPartnerOrder.htm`;
    return await http.get(url, params)
  },
  // 推单 查询推单商标信息
  async findConfirmTrademark (params) {
    const url = `${indexUrl}/createOrder/findConfirmTrademark.htm`;
    return await http.get(url, params)
  },
  // 用户确认页 获取工单详情
  async findWorkOrderConfirm (workOrderId) {
    const url = `${indexUrl}/workOrder/findWorkOrderConfirm.htm`;
    return await http.get(url, {workOrderId})
  },
  // 用户确认页 确认并支付
  async infoAgree (workOrderId) {
    const url = `${indexUrl}/workOrder/infoAgree.htm`;
    return await http.post(url, {workOrderId})
  },
  // 用户确认页 退回修改
  async infoReturn (workOrderId) {
    const url = `${indexUrl}/workOrder/infoReturn.htm`;
    return await http.post(url, {workOrderId})
  },
}
