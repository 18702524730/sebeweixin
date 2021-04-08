module.exports = [
 // 订单部分
  {
    path: '/pages/order/orderList',
    config: {
      navigationBarTitleText: '全部订单',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    }
  },
  {
    path: '/pages/order/orderDetails',
    config: {
      navigationBarTitleText: '订单详情'
    }
  },
  {
    path: '/pages/order/serviceOrderList',
    config: {
      navigationBarTitleText: '服务单列表'
    }
  },
  {
    path: '/pages/order/serviceOrderDetail',
    config: {
      navigationBarTitleText: '服务单详情',
    }
  },
  {
    path: '/pages/order/serviceOrderDetailF',
    config: {
      navigationBarTitleText: '服务单详情',
    }
  },
  {
    path: '/pages/order/progressManager',
    config: {
      navigationBarTitleText: '办理进度'
    }
  },
  {
    path: '/pages/order/applyRefundOrder',
    config: {
      navigationBarTitleText: '申请退款'
    }
  },
  {
    path: '/pages/order/loadAccept',
    config: {
      navigationBarTitleText: '服务单待验收'
    }
  },

]
