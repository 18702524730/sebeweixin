import http from '@/plugins/flyio/request'
import interfaces from './interfaces'
import qs from 'qs'
const { cartUrl, wxUrl, czUrl, indexUrl, userUrl } = CONFIG;

export default {
  // 企业/个人实名认证保存
  async subject4MiniApp (params, noShowLoading) {
    const url = `${userUrl}/api/subject4MiniApp`;
    const data = await http.post(url, params, noShowLoading);
    return data;
  },
  // 个人预留手机号验证码获取 验证 https://testcz.ipsebe.com/EvidenceController/subject/authentication.do
  async authentication (params) {
    const url = `${czUrl}/EvidenceController/subject/authentication.do?`+qs.stringify(params);
    const data = await http.post(url);
    return data;
  },
  // 验证验证码
  async verifyIdCard (params) {
    const url = `${czUrl}/EvidenceController/subject/verifyIdCard?`+qs.stringify(params);
    const data = await http.post(url);
    return data;
  },
  // 个人实名认证 银行预留手机号短信验证验证接口
  async verifyMobCode (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/subject/verifyMobCode.do?` + qs.stringify(params);
    const data = await http.post(url, params, noShowLoading);
    return data;
  },
  // 企业实名认证 打款金额验证
  async verifyCompanyAuth (params) {
    console.log(params);
    const url = `${czUrl}/EvidenceController/subject/verifyCompanyAuth.do?` + qs.stringify(params);
    console.log('url', url);
    const data = await http.post(url, params);
    console.log('data')
    return data;
  },
  // 存证对公账户开户行
  async findNotarizationBank (params) {
    console.log('params', `${czUrl}/EvidenceController/findNotarizationBank.do`)
    const url = `${czUrl}/EvidenceController/findNotarizationBank.do`;
    const data = await http.post(url, params);
    return data;
  },
  // 上传企业营业执照
  async uploadImg2Pdf (params) {
    let res = await WXP.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: 'album'
    });
    
    console.log(interfaces.createAuthHeader())
    let data = await WXP.uploadFile({ // uploadImgToPdf
      // url: `${czUrl}/api/file/uploadImg2Pdf`,
      url: `${czUrl}/EvidenceController/uploadImg2Pdf.do`,
      header: interfaces.createAuthHeader(),
      filePath: res.tempFilePaths[0],
      formData: params,
      name: 'fileData'
    })
    let respData = JSON.parse(data.data);
    return respData;
    // return respData.url.replace('hzsebetest.oss-cn-hangzhou.aliyuncs.com', 'testossfile.ipsebe.com').replace('sebe360test.oss-cn-beijing.aliyuncs.com', 'ossfile.ipsebe.com');
  },
  // 申请人列表
  async subject (params, noShowLoading) {
    const url = `${userUrl}/api/subject?` + qs.stringify(params);
    const data = await http.get(url, params, {}, { isLoading: false });
    return data;
  },
  // 查询存证包数量
  async querycznum (params, noShowLoading) {
    const url = `${czUrl}/cunnar/querycznum.do`;
    const data = await http.get(url, params, {}, {isLoading: false});
    return data;
  },
  // 添加原创存证
  async addAttestations (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/addAttestations.do`;
    const data = await http.post(url, params ,noShowLoading);
    return data;
  },
  // 上传存证文件
  async uploadDataEGongZheng (params, noShowLoading) {
    let res = await WXP.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: 'album'
    });
    console.log('fileRes', res)
    let data = await WXP.uploadFile({
      url: `${czUrl}/EvidenceController/uploadDataEGongZheng.do`,
      header: interfaces.createAuthHeader(),
      filePath: res.tempFilePaths[0],
      formData: params,
      name: 'fileData'
    })
    let respData = JSON.parse(data.data);
    return respData
  },

  // 公证云网页截图
  async addWebThread (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/addWebThread.do`;
    const data = await http.post(url, params, noShowLoading);
    return data;
  },
  // 是否截图成功
  async isSuccess4WebThread (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/isSuccess4WebThread.do?evidId=` + qs.stringify(params);
    const data = await http.get(url, noShowLoading);
    return data;
  },
  // 查看截图图片
  async downloadWebEvid (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/downloadWebEvid.do?evidId=` + qs.stringify(params);
    const data = await http.post(url, noShowLoading);
    return data;
  },
  // 添加网页存证
  async addWebAttestations (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/addWebAttestations.do`;
    const data = await http.post(url, params, noShowLoading);
    return data;
  },
  // 存证详情页 https://testwww.ipsebe.com/products/detail.htm?priceId=87
  async czDetail (params, noShowLoading) {
    const url = `${indexUrl}/products/detail.htm`;
    const data = await http.get(url, params, noShowLoading);
    return data;
  },
  // 生成订单 cartUrl+'/cartWeb/nowPlaceOrderMobine.htm'
  async nowPlaceOrderMobine (params, noShowLoading) {
    const url = `${cartUrl}/cartWeb/nowPlaceOrderMobine.htm?` + qs.stringify(params);
    const data = await http.post(url);
    return data;
  },
  // 网页截图
  async addWebThread (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/addBqWebThread.do`;
    const data = await http.post(url, params, noShowLoading);
    return data;
  },
  // 是否截图成功
  async isSuccess4WebThread (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/isSuccess4WebThread.do`;
    const data = await http.get(url, params, noShowLoading,{
      isLoading: false
    });
    return data;
  },
  // 查看截图图片
  async downloadWebEvid (params, noShowLoading) {
    const url = `${czUrl}/EvidenceController/downloadWebEvid.do`;
    const data = await http.get(url, params, noShowLoading,{
      isLoading: false
    });
    return data;
  },
  // 存证前获取验证码
  async getMobCode (params) {
    const url = `${czUrl}/EvidenceController/egongzheng/getMobCode.do?${qs.stringify(params)}`;
    const data = await http.post(url, params);
    return data;
  },
  // 存证前获取验证码
  async findPlatformOrderList4czb (params, noShowLoading) {
    const url = `${czUrl}/api/findPlatformOrderList4czb.do`;
    const data = await http.get(url, params,noShowLoading);
    return data;
  },
}
