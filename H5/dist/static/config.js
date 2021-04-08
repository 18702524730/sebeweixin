var rootConfig = {
  rootUrl: '//user.ipsebe.com',
  indexUrl: '//www.ipsebe.com',
  cartUrl: '//cart.ipsebe.com',
  czUrl:'//cz.ipsebe.com',
  userUrl: '//user.ipsebe.com',
  payUrl: '//iprp.ipsebe.com',
  wxUrl: '//wechat.ipsebe.com/weixin',
  toolsUrl: '//tools.ipsebe.com',
  iptUrl:'//ipt.ipsebe.com'
};
if (location.host.indexOf('localhost') === 0) {
  rootConfig = {
    rootUrl: '//localhost:8088/iprp_portal',
    indexUrl: '//localhost:8088',
    cartUrl: '//localhost:8088/portalsite-cnsebe',
    czUrl: '//localhost:8088/cz',
    userUrl: '//localhost:8088/iprp_portal',
    payUrl: '//localhost:8088/pay',
    wxUrl: '//localhost:8088/weixin',
    toolsUrl: '//localhost:8088/tools',
    iptUrl:'//localhost:8088/ipt'
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
    toolsUrl: '//testtools.ipsebe.com',
    iptUrl:'//testipt.ipsebe.com'
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
    toolsUrl: '//pretools.ipsebe.com',
    iptUrl:'//preipt.ipsebe.com'
  };
}

window.CONFIG = rootConfig;
