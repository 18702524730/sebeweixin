import http from 'axios';
import qs from 'qs'
//import http from 'src/plugins/flyio/request'
const { indexUrl } = CONFIG;

export default {
  /**
   * IPT统计
   */
  async iptLogInfo (params) {
    const url = `${indexUrl}/partner/b/iptLogInfo.htm`;
    return await http.get(url, {params});
  }
}
