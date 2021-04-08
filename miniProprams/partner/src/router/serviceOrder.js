module.exports = [
	{
    path: '/pages/serviceOrder/orderList',
    config: {
      navigationBarTitleText: '全部服务',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    root: 'pages/serviceOrder/',
  }, 
  {
    path: '/pages/serviceOrder/orderDetail',
    config: {
      navigationBarTitleText: '服务详情'
    },
    root: 'pages/serviceOrder/',
  }, 
  {
    path: '/pages/serviceOrder/setServiceStates',
    config: {
      navigationBarTitleText: '更新服务状态'
    },
    root: 'pages/serviceOrder/',
  },
  {
    path: '/pages/serviceOrder/worksDetails',
    config: {
      navigationBarTitleText: '商标详情'
    },
    root: 'pages/serviceOrder/',
  },
  {
    path: '/pages/serviceOrder/manageProgress',
    config: {
      navigationBarTitleText: '办理进展'
    },
    root: 'pages/serviceOrder/',
  },
]  