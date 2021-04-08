// 首页
const homepage = () => import(/* webpackChunkName: "group-home" */ '../pages/home/home.vue')
const newPage = () => import(/* webpackChunkName: "group-new" */ '../pages/home/new.vue')
const postalPage = () => import(/* webpackChunkName: "group-postal" */ '../pages/home/postal.vue')
const invoicePage = () => import(/* webpackChunkName: "group-invoice" */ '../pages/home/invoice.vue')
const chnnel_partner = () => import(/* webpackChunkName: "group-chnnel-partner" */'../pages/channel/chnnel_partner.vue')
let routes = [
    {
        path: '/channel',
        name: 'channel02',
        meta: {
            title: '生态合伙人计划'
        },
        component: chnnel_partner
    },
    {
        path: '/',
        name: 'default',
        meta: {
            title: '杭州市高新技术企业培育三年行动计划',
            source: '短信'
        },
        component: homepage
    },
    {
        path: '/yjy',
        name: 'yjy',
        meta: {
            title: '银江园区管委会',
            source: '银江园区管委会'
        },
        component: homepage
    },
    {
        path: '/new',
        name: 'default',
        meta: {
            title: '巧鹿',
            source: '巧鹿'
        },
        component: newPage
    },
    {
        path: '/postal',
        name: 'default',
        meta: {
            title: '商标注册证邮寄地址确认函',
            source: '短信'
        },
        component: postalPage
    },
    {
        path: '/invoice',
        name: 'default',
        meta: {
            title: '发票邮寄地址确认函',
            source: '短信'
        },
        component: invoicePage
    },
];

//export default routes;
export { routes };
