var rootConfig = {}
if (process.env.METHOD === 'production') {
  rootConfig = {
  	rootUrl: 'https://user.ipsebe.com',
    indexUrl: 'https://www.ipsebe.com',
    cartUrl: 'https://cart.ipsebe.com',
    czUrl:'https://cz.ipsebe.com',
    spUrl: 'https://sp.ipsebe.com',
    userUrl: 'https://user.ipsebe.com',
    payUrl: 'https://iprp.ipsebe.com',
    wxUrl: 'https://wechat.ipsebe.com',
    toolsUrl: 'https://tools.ipsebe.com',
    imgUrl: 'https://cz.ipsebe.com'
  };
}else{
	rootConfig = {
	  rootUrl: 'https://testuser.ipsebe.com',
    indexUrl: 'https://testwww.ipsebe.com',
    cartUrl: 'https://testcart.ipsebe.com',
    czUrl:'https://testcz.ipsebe.com',
    // czUrl:'http://192.168.1.12:8382/iprp_portal',
    // czUrl:'http://192.168.1.12:7000/nota',
    spUrl: 'https://testsp.ipsebe.com',
    userUrl: 'https://testuser.ipsebe.com',
    payUrl: 'https://testiprp.ipsebe.com',
    wxUrl: 'https://testwechat.ipsebe.com',
    toolsUrl: 'https://testtools.ipsebe.com',
    imgUrl: 'https://testcz.ipsebe.com'
	};
}

const cfg = {
  // 指定首页的路径
  indexPath: '/pages/index/index'
}

export default Object.assign({}, rootConfig, cfg)
