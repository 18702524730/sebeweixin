// 服务单页面
import providersServiceLists from './pages/serviceProviders/providersLists.vue'
// 我的服务单
import  MyServiceLists from './pages/serviceProviders/providersMyLists.vue'
// 服务单详情
import  ServiceDetail from './pages/serviceProviders/providersDetail.vue'

let routes = [
    {
        path: '/',
        name: 'providersServiceLists',
        meta: {
            title: '我的服务单'
        },
        component: providersServiceLists
    },
    {
        path: '/ServiceDetail/:order_id',
        name: 'ServiceDetail',
        meta: {
            title: '查看详情'
        },
        component: ServiceDetail
    },
    {
        path: '/MyServiceLists',
        name: 'MyServiceLists',
        meta: {
            title: '我的服务单'
        },
        component: MyServiceLists
    }
];

//export default routes;
export { routes };