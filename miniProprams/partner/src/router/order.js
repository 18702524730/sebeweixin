module.exports = [
 // 订单部分
  {
    path: '/pages/order/orderList',
    config: {
      navigationBarTitleText: '全部订单',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    root: 'pages/order/',
  },
  {
    path: '/pages/order/orderDetails',
    config: {
      navigationBarTitleText: '订单详情',
    },
    root: 'pages/order/',
  },  
  {
    path: '/pages/order/orderRefund',
    config: {
      navigationBarTitleText: '全部退款订单',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    root: 'pages/order/',
  }, 
  {
    path: '/pages/order/orderRefundDetail',
    config: {
      navigationBarTitleText: '退款单详情'
    },
    root: 'pages/order/',
  },
  {
    path: '/pages/order/orderRefundReject',
    config: {
      navigationBarTitleText: '拒绝退款'
    },
    root: 'pages/order/',
  } 
]  