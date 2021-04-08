import http from '@/plugins/flyio/request'
import qs from 'qs'
const { indexUrl, wxUrl } = CONFIG

export default {
  /**
   * 店铺信息
   */
  async storeInfo (params) {
    const url = `${indexUrl}/partner/${params.storeCode}/storeInfo.htm`
    return await http.get(url)
  },
  /**
   * 修改店铺信息
   */
  async updateStoreInfo (params) {
    const url = `${indexUrl}/partner/${params.storeCode}/updateStoreInfo.htm`
    return await http.post(url, params.storeInfo)
  },
  /**
   * 店铺服务类目
   */
  async storeCategory (params) {
    const url = `${indexUrl}/partner/${params.storeCode}/category.htm`;
    return await http.post(url)
  },
  /**
   * 店铺服务列表
   */
  async productList (params) {
    const url = `${indexUrl}/partner/${params.storeCode}/productList.htm`;
    return await http.post(url, params)
  },
  /**
   * 服务详情
   */
  async productDetail (params) {
    const url = `${indexUrl}/partner/${params.storeCode}/${params.productNum}/productDetail.htm`;
    return await http.post(url)
  },
  /**
   * 服务置顶
   */
  async stickProduct (params) {
    const url = `${indexUrl}/partner/${params.storeCode}/stickProduct.htm`;
    return await http.post(url, params)
  },
  /**
   * 服务上架
   */
  async shelfProduct (params) {
    const url = `${indexUrl}/partner/${params.storeCode}/shelfProduct.htm`;
    return await http.post(url, params)
  },
  /**
   * 服务下架
   */
  async underProduct (params) {
    const url = `${indexUrl}/partner/${params.storeCode}/underProduct.htm`;
    return await http.post(url, params)
  },  
  /**
  * 服务上架修改
  */
 async shelfProductUpdate (params) {
   const url = `${indexUrl}/partner/${params.storeCode}/shelfProductUpdate.htm`;
   return await http.post(url, params)
 },
 /**
  * 所有服务类目
  */
 async findAllCategory () {
   const url = `${indexUrl}/partner/findAllCategory.htm`;
   return await http.get(url)
 },
 /**
  * 获取二维码
  */
 async createwxaqrcode (params) {
    const url = `${wxUrl}/weixin/miniApp/createwxaqrcode.do`;
    return await http.post(url, params)
  },
  /**
   * 主动下单
   */
  async creatPartnerOrder (params) {
    const url = `${indexUrl}/weixin/createOrder/creatPartnerOrder.do`;
    return await http.post(url, params)
  }
}
