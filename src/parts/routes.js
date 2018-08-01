import Login from '../components/Login.vue'
import Home from '../components/home/Home.vue'
import Notice from '../components/home/Notice.vue'
import Prosale from '../components/prosale/Prosale.vue'
import ProsaleInfo from '../components/prosale/ProsaleInfo.vue'
import ProsaleItem from '../components/prosale/ProsaleItem.vue'
import ProsalePdf from '../components/prosale/ProsalePdf.vue'
import Custom from '../components/custom/Custom.vue'
    import CustomList from '../components/custom/CustomList.vue'
    import CustomDetail from '../components/custom/CustomDetail.vue'
    import CustomEdit from '../components/custom/CustomEdit.vue'
    import CustomAdd from '../components/custom/CustomAdd.vue'
import OrderAdd from '../components/order/OrderAdd.vue'
import Order from '../components/order/Order.vue'
import OrderEntry from '../components/order/OrderEntry.vue'
import OrderInfo from '../components/order/OrderInfo.vue'
import OrderPass from '../components/order/OrderPass.vue'

import System from '../components/System.vue'
import Report from '../components/report/Report.vue'
import Birthday from '../components/birthday/Birthday.vue'

import Rules from '../components/rules/Rules.vue'
import RulesCon from '../components/rules/RulesCon.vue'
import Statis from '../components/statis/Statis.vue'
import Browse from '../components/statis/Browse.vue'
import ShareBrowse from '../components/statis/ShareBrowse.vue'
import ShareBrowseDetail from '../components/statis/ShareBrowseDetail.vue'
import Evaluate from '../components/statis/Evaluate.vue'

//资产配置
import Capital from './routesCapital.js'

//我的钱包
import Wallet from './routesWallet.js'


export default [
    {
        path: '/login',
        component: Login,
        meta: {
            pageTitle:'登录'
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            pageTitle: '',
            requiresAuth: true
        }
    },
    {
        path: '/notice',
        component: Notice,
        meta: {
            backUrl: '/home',
            pageTitle: '通知',
            requiresAuth: true
        }
    },
    {
        path: '/prosale',
        component: Prosale,
        meta: {
            backUrl: '/home',
            pageTitle: '产品列表',
            requiresAuth: true
        }
    },
    {
        path: '/prosale/info/:id',
        component: ProsaleInfo,
        meta: {
            backUrl: '/prosale',
            pageTitle: '产品详情',
            requiresAuth: true
        }
    },
    {
        path: '/prosale/item',
        component: ProsaleItem,
        meta: {
            backUrl: '/prosale',
            pageTitle: '产品详情',
            requiresAuth: true
        }
    },
    {
        path: '/prosale/pdf',
        component: ProsalePdf,
        meta: {
            backUrl: '',
            pageTitle: 'pdf预览',
            requiresAuth: true
        }
    },
    {
        path: '/custom',
        component: Custom,
        meta: {
            pageTitle: '',
            backUrl: '/home',
            requiresAuth: true
        },
        children:[
            {
                path: 'list',
                component: CustomList,
                meta: {
                    backUrl: '/home',
                    pageTitle: '我的客户'
                }
            },
            {
                path: 'detail/:id',
                component: CustomDetail,
                meta: {
                    backUrl: '/custom/list',
                    pageTitle: '客户详情'
                }
            },
            {
                path: 'edit/:id',
                component: CustomEdit,
                meta: {
                    pageTitle: '客户编辑'
                }
            },
            {
                path: 'add',
                component: CustomAdd,
                meta: {
                    backUrl: '/custom/list',
                    pageTitle: '添加客户'
                }
            }
        ]
    },
    {
        path: '/order/add/:id',
        component: OrderAdd,
        meta: {
            backUrl: '/custom/list',
            pageTitle: '录单',
            requiresAuth: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            backUrl: '/home',
            pageTitle: '成交进度',
            requiresAuth: true
        }
    },
    {
        path: '/order/entry/:id',
        component: OrderEntry,
        meta: {
            backUrl: '/order',
            pageTitle: '追加进账',
            requiresAuth: true
        }
    },
    {
        path: '/order/info/:id',
        component: OrderInfo,
        meta: {
            backUrl: '/order',
            pageTitle: '编辑订单',
            requiresAuth: true
        }
    },
    {
        path: '/order/pass/:id',
        component: OrderPass,
        meta: {
            backUrl: '/order',
            pageTitle: '查看订单',
            requiresAuth: true
        }
    },
    {
        path: '/system',
        component: System,
        meta: {
            backUrl: '/home',
            pageTitle: '个人设置',
            requiresAuth: true
        }
    },
    {
        path: '/report',
        component: Report,
        meta: {
            backUrl: '/reportsearch',
            pageTitle: '业绩明细',
            requiresAuth: true
        }
    },
    {
        path: '/birthday',
        component: Birthday,
        meta: {
            backUrl: '/home',
            pageTitle: '客户生日',
            requiresAuth: true
        }
    },
    {
        path: '/rules',
        component: Rules,
        meta: {
            backUrl: '/home',
            pageTitle: '公司制度',
            requiresAuth: true
        }
    },
    {
        path: '/rulescon',
        component: RulesCon,
        meta: {
            backUrl: '/rules',
            pageTitle: '',
            requiresAuth: true
        }
    },
    {
        path: '/statis',
        component: Statis,
        meta: {
            backUrl: '/home',
            pageTitle: '财富会统计',
            requiresAuth: true
        }
    },
    {
        path: '/browse',
        component: Browse,
        meta: {
            backUrl: '/statis',
            pageTitle: '浏览统计',
            requiresAuth: true
        }
    }, 
    {
        path: '/sharebrowse',
        component: ShareBrowse,
        meta: {
            backUrl: '/statis',
            pageTitle: '分享浏览统计',
            requiresAuth: true
        }
    },
    {
        path: '/sharebrowsedetail',
        component: ShareBrowseDetail,
        meta: {
            pageTitle: '',
            requiresAuth: true
        }
    },
    {
        path: '/evaluate',
        component: Evaluate,
        meta: {
            backUrl: '/statis',
            pageTitle: '产品评价统计',
            requiresAuth: true
        }
    },
    Capital,
    Wallet,
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '*',
        redirect: '/home'
    }
]