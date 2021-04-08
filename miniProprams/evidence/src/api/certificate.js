import http from '@/plugins/flyio/request'
import qs from 'qs'
const { cartUrl, wxUrl, userUrl, indexUrl,czUrl,imgUrl } = CONFIG;

export default {
  //预览图
  async managerDownCunnarFile (params) {
    const url = `${imgUrl}/cunnar/managerDownCunnarFile.do?`+qs.stringify(params);
    const data = await http.post(url);
    return data;
  },
  // 查看存证列表页
  async findNotarizationByNotarizationType (params) {
    const url = `${userUrl}/api/findNotarizationByNotarizationType?`+qs.stringify(params);
    const data = await http.post(url);
    return data;
  },
  // 查看存证详情
  async findNotarizationDetails (params) {
    const url = `${userUrl}/api/findNotarizationDetails?`+qs.stringify(params);
    const data = await http.post(url);
    return data;
  },
  
}
