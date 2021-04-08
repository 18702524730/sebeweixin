// 首页
const homepage = () => import(/* webpackChunkName: "group-index" */ '../pages/homePage/homePage.vue')


//注册
const Register = () => import(/* webpackChunkName: "group-reglogin" */ '../pages/register/register.vue')
//注册协议
const registerProtocol = () => import(/* webpackChunkName: "group-reglogin" */ '../pages/register/registerProtocol.vue')

//登录
const Login = () => import(/* webpackChunkName: "group-reglogin" */ '../pages/login/login.vue')
//短信登录
const smsLogin = () => import(/* webpackChunkName: "group-reglogin" */ '../pages/login/smsLogin.vue')


//商品详情
const Detail = () => import(/* webpackChunkName: "group-cart" */ '../pages/detail/detail.vue')
//确认订单
const Confirm = () => import(/* webpackChunkName: "group-cart" */ '../pages/confirm/confirm')
//协议
const ServiceAgreement = () => import(/* webpackChunkName: "group-cart" */ '../components/serviceAgreement.vue')


//我的订单-订单列表
const myOrders = () => import(/* webpackChunkName: "group-order" */ '../pages/myOrders/myOrderList.vue')
//我的订单-详情
const paymentDetail = () => import(/* webpackChunkName: "group-order" */ '../pages/myOrders/paymentDetail.vue')


//抽奖页面
const Prize = () => import(/* webpackChunkName: "group-spe" */ '../pages/prize/prize.vue')
//专题页面
const Special = () => import(/* webpackChunkName: "group-spe" */ '../pages/special/special.vue')
//专题页
const project = () => import(/* webpackChunkName: "group-spe" */ '../pages/project/project.vue')
const fumao = () => import(/* webpackChunkName: "group-spe" */ '../pages/fumao/project.vue')


// 商标查询
const tradmarkQuery = () => import(/* webpackChunkName: "group-search" */ '../pages/tradmarkQuery/tradmarkQuery.vue')
// 图片搜索
const imgCrop = () => import(/* webpackChunkName: "group-search" */ '../pages/imgSearch/imgCrop.vue')
// 图片搜索结果
const imgSearchR = () => import(/* webpackChunkName: "group-search" */ '../pages/imgSearch/searchResult.vue')
// 精确搜索
const exactSearch = () => import(/* webpackChunkName: "group-search" */ '../pages/exactSearch/search.vue')
// 精确搜索结果
const exactSearchR = () => import(/* webpackChunkName: "group-search" */ '../pages/exactSearch/searchResult.vue')
// 近似搜索
const affinitySearch = () => import(/* webpackChunkName: "group-search" */ '../pages/affinitySearch/search.vue')
// 近似搜索结果
const affinitySearchR = () => import(/* webpackChunkName: "group-search" */ '../pages/affinitySearch/searchResult.vue')
// 导出结果页面
const pdfPreview = () => import(/* webpackChunkName: "group-search" */ '../pages/dtSearch/pdfPreview.vue')
// 商标详情
const dtDetail = () => import(/* webpackChunkName: "group-search" */ '../pages/dtSearch/dtDetail.vue')

// 服务商入驻页
const businessSettled = () => import('../pages/businessSettled/businessSettled.vue')
// 合伙人入驻页
const partnerSettled = () => import('../pages/businessSettled/partnerSettled.vue')
// 商家账号邀请
const businessInvitation = () => import('../pages/businessSettled/businessInvitation.vue')
// 我的IPT
const myIPT = () => import('../pages/otherPage/my_IPT.vue')
// 我的珍珠岛
const pearlIsland = () => import('../pages/otherPage/pearlIsland.vue')
// 获得规则
const IPTregulation = () => import('../pages/otherPage/IPTregulation.vue')
// 创新珍珠
const myPearl = () => import('../pages/otherPage/myPearl.vue')
// 我的珍珠带区块链的
const iptBackups = () => import('../pages/otherPage/iptBackups.vue')


// 珍珠岛后续
// 我的页面
const my = () => import('../pages/pearlIsland/my.vue')
// 我的珍珠页面
const myPearlNum = () => import('../pages/pearlIsland/myPearlNum.vue')
const myExchange = () => import('../pages/pearlIsland/myExchange.vue')
const myEnergy = () => import('../pages/pearlIsland/myEnergy.vue')
const rules = () => import('../pages/pearlIsland/rules.vue')
// 我的珍珠，领取珍珠页面
const myPearlIsland = () => import('../pages/pearlIsland/myPearlIsland.vue')
//岛民攻略
const strategyIsland = () => import('../pages/pearlIsland/strategyIsland.vue')
//发现页面
const pearlFind = () => import('../pages/pearlIsland/findPreal.vue')
//发现页面
const informationLists = () => import('../pages/pearlIsland/informationLists.vue')

// 在线公证小程序空白跳转页面
const JumpPage = () => import('../pages/assistant/jumpPage.vue');


let routes = [
    {
        path: '/my',
        name: '我的',
        meta: {
            title: '我的珍珠'
        },
        component: my
    },
    {
        path: '/myPearlNum',
        name: '我的珍珠数量',
        meta: {
            title: '我的珍珠'
        },
        component: myPearlNum
    },
    {
        path: '/myEnergy',
        name: '我的创力',
        meta: {
            title: '我的创力'
        },
        component: myEnergy
    },
    {
        path: '/myExchange',
        name: '我的兑换',
        meta: {
            title: '我的兑换'
        },
        component: myExchange
    },
    {
        path: '/rules',
        name: '获得规则',
        meta: {
            title: '获得规则'
        },
        component: rules
    },
    {
        path: '/',
        name: 'default',
        meta: {
            title: '外贸福利'
        },
        component: fumao
    },
    {
        path: '/homepage',
        name: 'homepage',
        meta: {
            title: '拾贝商城'
        },
        component: homepage
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: '注册'
        },
        component: Register
    },
    {
        path: '/registerProtocol',
        name: 'registerProtocol',
        meta: {
            title: '注册协议'
        },
        component: registerProtocol
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录'
        },
        component: Login
    },
    {
        path: '/smsLogin',
        name: 'smsLogin',
        meta: {
            title: '短信快捷登录'
        },
        component: smsLogin
    },
    {
        path: '/detail',
        name: 'Detail',
        meta: {
            title: '商品详情页面'
        },
        component: Detail
    },
    {
        path: '/special',
        name: 'Special',
        redirect: { name: 'homepage' },
        meta: {
            title: '注册商标送话费'
        },
        component: Special
    },
    {
        path: '/confirm',
        name: 'Confirm',
        meta: {
            title: '确认下单'
        },
        component: Confirm
    },
    {
        path: '/myOrders/payment/:pay_order',
        name: 'paymentDetail',
        meta: {
            title: '订单详情'
        },
        component: paymentDetail
    },
    {
        path: '/myOrders',
        name: 'myOrders',
        meta: {
            title: '订单列表'
        },
        component: myOrders
    },
    {
        path: '/prize',
        name: 'Prize',
        redirect: { name: 'homepage' },
        meta: {
            title: '幸运大转盘'
        },
        component: Prize
    },
    {
        path: '/service',
        name: 'ServiceAgreement',
        meta: {
            title: '服务协议'
        },
        component: ServiceAgreement
    },
    {
        path: '/tradmarkQuery',
        name: 'tradmarkQuery',
        meta: {
          title: '商标查询'
        },
        component: tradmarkQuery
    },
    {
        path: '/imgCrop',
        name: 'imgCrop',
        meta: {
            title: '图片剪裁'
        },
        component: imgCrop
    },
    {
        path: '/imgSearchR',
        name: 'imgSearchR',
        meta: {
            title: '图片搜索结果'
        },
        component: imgSearchR
    },
    {
        path: '/affinitySearch',
        name: 'affinitySearch',
        meta: {
            title: '近似搜索'
        },
        component: affinitySearch
    },
    {
        path: '/affinitySearchR',
        name: 'affinitySearchR',
        meta: {
            title: '近似搜索结果'
        },
        component: affinitySearchR
    },
    {
        path: '/exactSearch',
        name: 'exactSearch',
        meta: {
            title: '精确搜索'
        },
        component: exactSearch
    },
    {
        path: '/exactSearchR',
        name: 'exactSearchR',
        meta: {
            title: '精确搜索结果'
        },
        component: exactSearchR
    },
    {
        path: '/dtDetail',
        name: 'dtDetail',
        meta: {
            title: '商标详情'
        },
        component: dtDetail
    },
    {
        path: '/pdfPreview',
        name: 'pdfPreview',
        meta: {
            title: '报告预览'
        },
        component: pdfPreview
    },
    {
        path: '/fumao',
        name: 'fumao',
        meta: {
            title: '外贸福利'
        },
        component: fumao
    },
    /*{
        path: '/project',
        name: 'project',
        meta: {
            title: '阿里巴巴知识产权保护平台“创新保”战略合作单位，更懂电商的知识产权服务公司'
        },
        component: project
    },*/
    {
        path: '/businessSettled',
        name: 'businessSettled',
        meta: {
            title: '商家入驻'
        },
        component: businessSettled
    },
    {
        path: '/partnerSettled',
        name: 'partnerSettled',
        meta: {
            title: '合伙人入驻'
        },
        component: partnerSettled
    },
    {
        path: '/businessInvitation',
        name: 'businessInvitation',
        meta: {
            title: '商家账号邀请'
        },
        component: businessInvitation
    },
    {
        path: '/myIPT',
        name: 'myIPT',
        meta: {
            title: '创新珍珠'
        },
        component: myIPT
    },
    {
        path: '/pearlIsland',
        name: 'pearlIsland',
        meta: {
            title: '创新珍珠'
        },
        component: pearlIsland
    },
    {
        path: '/IPTregulation',
        name: 'IPTregulation',
        meta: {
            title: '获得规则'
        },
        component: IPTregulation
    },
    {
        path: '/myPearl',
        name: 'myPearl',
        meta: {
            title: '创新珍珠'
        },
        component: myPearl
    },
    {
        path: '/iptBackups',
        name: 'iptBackups',
        meta: {
            title: '创新珍珠'
        },
        component: iptBackups
    },




    {
        path: '/myPearlIsland',
        name: 'myPearlIsland',
        meta: {
            title: '创新珍珠'
        },
        component: myPearlIsland
    },
    {
        path: '/strategyIsland',
        name: 'strategyIsland',
        meta: {
            title: '岛民攻略'
        },
        component: strategyIsland
    },
    {
        path: '/pearlFind',
        name: 'pearlFind',
        meta: {
            title: '发现'
        },
        component: pearlFind
    },
    {
        path: '/informationLists',
        name: 'informationLists',
        meta: {
            title: '岛民公告'
        },
        component: informationLists
    },
    {
        path: '/jumpPage',
        name: 'jumpPage',
        meta: {
            title: '跳转中'
        },
        component: JumpPage
    },
];
//export default routes;
export { routes };
