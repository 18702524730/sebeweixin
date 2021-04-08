var rootConfig = {
	rootUrl: '//user.ipsebe.com',
  indexUrl: '//www.ipsebe.com',
  cartUrl: '//cart.ipsebe.com',
  czUrl:'//cz.ipsebe.com',
  userUrl: '//user.ipsebe.com',
  payUrl: '//iprp.ipsebe.com',
  wxUrl: '//wechat.ipsebe.com/weixin',
  toolsUrl: '//tools.ipsebe.com'
};
if (location.host.indexOf('localhost') === 0) {
	rootConfig = {
	  rootUrl: '//localhost:8083/iprp_portal',
    indexUrl: '//localhost:8083/www',
    cartUrl: '//localhost:8083/portalsite-cnsebe',
    czUrl: '//localhost:8083/cz',
    userUrl: '//localhost:8083/iprp_portal',
    payUrl: '//localhost:8083/pay',
    wxUrl: '//localhost:8083/weixin',
    toolsUrl: '//localhost:8083/tools'
	};
}
if (location.host.indexOf('test') === 0) {
	rootConfig = {
	  rootUrl: '//testuser.ipsebe.com',
    indexUrl: '//testwww.ipsebe.com',
    cartUrl: '//testcart.ipsebe.com',
    czUrl:'//testcz.ipsebe.com',
    userUrl: '//testuser.ipsebe.com',
    payUrl: '//testiprp.ipsebe.com',
    wxUrl: '//testwechat.ipsebe.com/weixin',
    toolsUrl: '//testtools.ipsebe.com'
	};
}
if (location.host.indexOf('pre') === 0) {
	rootConfig = {
	  rootUrl: '//preuser.ipsebe.com',
    indexUrl: '//prewww.ipsebe.com',
    cartUrl: '//precart.ipsebe.com',
    czUrl:'//precz.ipsebe.com',
    userUrl: '//preuser.ipsebe.com',
    payUrl: '//preiprp.ipsebe.com',
    wxUrl: '//prewechat.ipsebe.com/weixin',
    toolsUrl: '//pretools.ipsebe.com'
	};
}

window.CONFIG = rootConfig;
