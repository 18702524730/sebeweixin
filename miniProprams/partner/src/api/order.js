// https://testuser.ipsebe.com/api/findFictitiousOrderList
import http from '@/plugins/flyio/request'
import qs from 'qs'
const { indexUrl, spUrl } = CONFIG

export default {
  /**
   * 订单接口
   */
  async orderList(params) {
    const url = `${indexUrl}/order/findOrderList.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async orderDetails(params) {
    const url = `${indexUrl}/order/findOrderDetails.htm`;
    return await http.get(url, qs.stringify(params))
  },
  // 服务单接口
  async findServiceOrderList(params) {//服务单列表
    const url = `${indexUrl}/serviceOrder/findServiceOrderList.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async findServiceOrderDetail(params) {//服务单详情
    const url = `${indexUrl}/serviceOrder/findServiceOrderDetail.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async ServiceAccept(params) {//服务验收
    const url = `${indexUrl}/serviceOrder/startServiceAccept.htm`;
    return await http.post(url, params)
  },
  async handleOrder(params) {//办理
    const url = `${indexUrl}/serviceOrder/handleOrder.htm`;
    return await http.post(url, params)
  },
  async receiveOrder(params) {//接单
    const url = `${indexUrl}/serviceOrder/receiveOrder.htm`;
    return await http.post(url, params)
  },
  async findOrderServiceState(params) {//查看可设置的服务状态
    const url = `${indexUrl}/serviceOrder/findOrderServiceState.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async setServiceState(params) {//设置服务状态
    const url = `${indexUrl}/serviceOrder/setServiceState.htm`;
    return await http.post(url, params)
  },
  async findFeedbackList(params) {//查看办理进度
    const url = `${indexUrl}/serviceOrder/findFeedbackList.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async handleOrder(params) {//查看办理进度
    const url = `${indexUrl}/serviceOrder/handleOrder.htm`;
    return await http.post(url, params)
  },



  
  // 作业中
  async findWorkOrderList(params) {//作业中列表
    const url = `${indexUrl}/workOrder/findWorkOrderList.htm`;
    return await http.get(url)
  },
  async findWorkOrderDetail(params) {//作业中详情
    const url = `${indexUrl}/workOrder/findWorkOrderDetail.htm`;
    return await http.get(url, qs.stringify(params))
  },

  
  // 退款单接口
  async findRefundList(params) {//退款列表
    const url = `${indexUrl}/refund/findRefundList.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async orderRefundDetails(params) {//退款详情
    const url = `${indexUrl}/refund/findRefundDetail.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async agreeRefund(params) {//同意退款
    const url = `${indexUrl}/refund/agreeRefund.htm`;
    return await http.post(url, params)
  },
  async listAuditReasonType(params) {//退款原因
    const url = `${indexUrl}/refund/listAuditReasonType.htm`;
    return await http.get(url)
  },
  async refuseRefund(params) {//拒绝退款
    const url = `${indexUrl}/refund/refuseRefund.htm`;
    return await http.post(url,params)
  },

  // 门诊室接口
  async saveMemberDemand(params) {//拒绝退款
    const url = `${indexUrl}/memberDemand/saveMemberDemand.htm`;
    return await http.post(url,params)
  },
  // 删除订单
  async deleteOrder(params) {//拒绝退款
    const url = `${indexUrl}/order/deleteOrder.htm`;
    return await http.get(url, qs.stringify(params))
  },
  // pdf转为jpg
  async preview(params) {//拒绝退款
    const url = `${spUrl}/iprp_servicer/api/preview?pdf_url=${params.pdf_url}`;
    return await http.get(url)
  },
  
  // https://testsp.ipsebe.com/iprp_servicer/api/preview?pdf_url=https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/9F4A16853C01051F77960060AE065964.pdf
}
