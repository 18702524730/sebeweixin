// https://testuser.ipsebe.com/api/findFictitiousOrderList
import http from '@/plugins/flyio/request'
import qs from 'qs'
const { indexUrl, spUrl } = CONFIG

export default {
  /**
   * 根据推单id查询详情
   */
  async orderList(params) {//订单列表
    const url = `${indexUrl}/order/findMemberOrderList.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async orderDetails(params) {//订单详情
    const url = `${indexUrl}/order/findMemberOrderDetails.htm`;
    return await http.get(url, qs.stringify(params))
  },
  // 服务单接口
  async findServiceOrderList(params) {//服务单列表
    const url = `${indexUrl}/serviceOrder/findServiceOrderListForClient.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async confirmServiceAccept(params) {//服务验收
    const url = `${indexUrl}/serviceOrder/confirmServiceAccept.htm`;
    return await http.post(url,params)
  },
  async findServiceOrderDetail(params) {//服务详情
    const url = `${indexUrl}/serviceOrder/findServiceOrderDetailForClient.htm`;
    return await http.get(url, qs.stringify(params))
  },
  async findDetailForNonInfoClient(params) {//非信息化服务详情
    const url = `${indexUrl}/serviceOrder/findDetailForNonInfoClient.htm`;
    return await http.get(url, qs.stringify(params))
  },
  

  // 进展
  async findFeedbackList(params) {
    const url = `${indexUrl}/serviceOrder/findFeedbackList.htm`;
    return await http.get(url, qs.stringify(params))
  },
  // 退款
  async listRefundReasonType(params) {//退款原因
    const url = `${indexUrl}/refund/listRefundReasonType.htm`;
    return await http.get(url)
  },
  async createRefund(params) {//退款
    const url = `${indexUrl}/refund/createRefund.htm`;
    return await http.post(url, params)
  },

  // 门诊室接口
  async saveMemberDemand(params) {//拒绝退款
    const url = `${indexUrl}/memberDemand/saveMemberDemand.htm`;
    return await http.post(url,params)
  },
    // pdf转为jpg
  async preview(params) {//拒绝退款
    const url = `${spUrl}/iprp_servicer/api/preview?pdf_url=${params.pdf_url}`;
    return await http.get(url)
  },
  
}
