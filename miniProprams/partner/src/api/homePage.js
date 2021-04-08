import http from '@/plugins/flyio/request'
import qs from 'qs'
const { indexUrl, iptUrl } = CONFIG

export default {
  /**
   * 首页数据 https://testwww.ipsebe.com/partner/homepage.htm
   */
  async indexData () {
    const url = `${indexUrl}/partner/homepage.htm`
    return await http.get(url, {}, {}, {
      isLoading: false
    })
  },
  /**
   * 公告详情
   */
  async noticeDetail (params) {
    const url = `${indexUrl}/partner/homepage/${params.id}.htm`
    return await http.get(url)
  },
  /**
   * 公告详情
   */
  async indexList (params) {
    const url = `${indexUrl}/partner/homepage/category.htm`
    return await http.get(url, params)
  },
  /**
   * 查询是否有珍珠未收取
   * https://testipt.ipsebe.com/partner/b/beachIptInfo.htm
   */
  async beachIptInfo (params) {
    const url = `${indexUrl}/partner/b/beachIptInfo.htm`
    return await http.get(url, params, {}, {
      isLoading: false
    })
  },
  /**
   * C端邀请添加珍珠
   * https://testipt.ipsebe.com/partner/c/invitedIpt.htm
   */
  async invitedIpt(params) {
    const url = `${indexUrl}/partner/c/invitedIpt.htm?memberId=${params.memberId}`
    return await http.post(url, params, {}, {
      isLoading: false
    })
  },
  /**
   * banner 进入珍珠商城前请求该接口获取要进入的H5页面
   * https://testipt.ipsebe.com/partner/c/invitedIpt.htm
   */
  async autoLoginUrl(params) {
    const url = `${indexUrl}/duiba/autoLoginUrl.htm?uid=${params.uid}`
    // const url = `${indexUrl}/duiba/autoLoginUrl.htm`
    return await http.get(url)
  },
}
