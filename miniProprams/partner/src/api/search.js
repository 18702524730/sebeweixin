import http from '@/plugins/flyio/request'
import qs from 'qs'
const { indexUrl } = CONFIG

export default {
  /**
   * 搜索历史
   */
  async searchHistory (params) { // type = b/c   b为B端搜索历史,c为c端搜索历史
    const url = `${indexUrl}/partner/searchHistory.htm`
    return await http.post(url, params)
  },
  /**
   * 清除搜索历史
   */
  async removeSearchHistory (params) { // type = b/c   b为B端搜索历史,c为c端搜索历史
    const url = `${indexUrl}/partner/removeSearchHistory.htm`
    return await http.post(url, params)
  },
  /**
   * 搜索商品
   */
  async searchAllProduct (params) {
    const url = `${indexUrl}/partner/searchAllProduct.htm`;
    return await http.post(url, params)
  }
}
