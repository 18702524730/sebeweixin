import http from '@/plugins/flyio/request'
const { cartUrl } = CONFIG;

export default {
  /**
   * 根据推单id查询详情
   */
  async getInfo(id) {
    const url = `${cartUrl}/asistant/asistantList.htm`;
    return await http.get(url, {asistantOrderCustomerId : id});
  }
}
