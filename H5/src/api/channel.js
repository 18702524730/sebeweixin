import http from 'axios'
//import http from 'src/plugins/flyio/request'
const { wxUrl } = CONFIG;

export default {
  /**
   * 根据推单id查询详情
   */
  async getInfo(params) {
    const url = `${wxUrl}/major/addMajor`;
    return await http.post(url, params);
  }
}
