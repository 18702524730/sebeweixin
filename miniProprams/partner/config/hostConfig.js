var rootConfig = {}
if (process.env.METHOD === 'production') {
  rootConfig = {
  	rootUrl: 'https://user.ipsebe.com',
    indexUrl: 'https://www.ipsebe.com',
    iptUrl: 'https://ipt.ipsebe.com',
    cartUrl: 'https://cart.ipsebe.com',
    czUrl:'https://cz.ipsebe.com',
    userUrl: 'https://user.ipsebe.com',
    payUrl: 'https://iprp.ipsebe.com',
    wxUrl: 'https://wechat.ipsebe.com',
    toolsUrl: 'https://tools.ipsebe.com', // sp.ipsebe.com
    spUrl: 'https://sp.ipsebe.com'
  };
}else{
	rootConfig = {
	  rootUrl: 'https://testuser.ipsebe.com',
    indexUrl: 'https://testwww.ipsebe.com',
    iptUrl: 'https://testipt.ipsebe.com',
    cartUrl: 'https://testcart.ipsebe.com',
    czUrl:'https://testcz.ipsebe.com',
    userUrl: 'https://testuser.ipsebe.com',
    payUrl: 'https://testiprp.ipsebe.com',
    wxUrl: 'https://testwechat.ipsebe.com',
    toolsUrl: 'https://testtools.ipsebe.com',
    spUrl: 'https://testsp.ipsebe.com'
	};
}

const cfg = {
  // 指定首页的路径
  indexPath: '/pages/index/index'
}

export default Object.assign({}, rootConfig, cfg)
