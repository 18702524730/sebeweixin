import http from '@/plugins/flyio/request'
const { cartUrl, wxUrl, userUrl, indexUrl } = CONFIG;

export default {


  // 上传图片、文件到云盘，获得url
  async uploadFile (params) {
    const url = `${indexUrl}/file/upload.htm`;
    const data = await http.post(url, params);
    return data;
  },

  // 获取省市区数据
  async getAreaData () {
    const url = cartUrl + '/mainConfirmation/areas.htm';
    const data = await http.post(url);
    return data.elements;
  },

  // 获取国家数据
  async getCountryData () {
    const url = userUrl + '/api/country';
    const data = await http.get(url);
    return data;
  },
}
