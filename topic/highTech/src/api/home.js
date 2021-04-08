import http from 'axios'
//import http from 'src/plugins/flyio/request'
const { cartUrl } = CONFIG;

export default {
  /**
   * 根据推单id查询详情
   */
  async getInfo(id) {
    const url = `${cartUrl}/asistant/asistantList.htm?asistantOrderCustomerId=${id}`;
    return await http.get(url);
  }
}
