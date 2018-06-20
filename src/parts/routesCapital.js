import Capital from '../components/capital/view.vue'
import CapitalIndex from '../components/capital/index.vue'
import CapitalTemplate from '../components/capital/template.vue'
import CapitalEdit from '../components/capital/edit.vue'
import CapitalDetail from '../components/capital/detail.vue'
import CapitalEditBuy from '../components/capital/editbuy.vue'
import CapitalDetailBuy from '../components/capital/detailbuy.vue'


export default {
    path: '/capital/:id',
    component: Capital,
    meta: {
        requiresAuth: true
    },
    children:[
        {
            path: '',
            component: CapitalIndex,
            meta: {
                backUrl: '/custom/list',
                pageTitle: '资产配置',
            }
        },
        {
            path: 'edit/:assetid?',
            component: CapitalEdit,
            alias: 'add',
            meta: {
                pageTitle: '添加资产配置报告',
            }
        },
        {
            path: 'detail/:assetid?',
            component: CapitalDetail,
            meta: {
                pageTitle: '资产配置报告详情',
            }
        },
        {
            path: 'editbuy/:assetid?',
            component: CapitalEditBuy,
            alias: 'addbuy',
            meta: {
                pageTitle: '添加资产配置报告',
            }
        },
        {
            path: 'detailbuy/:assetid?',
            component: CapitalDetailBuy,
            meta: {
                pageTitle: '资产配置报告详情',
            }
        },
        {
            path: 'template',
            component: CapitalTemplate,
            meta: {
                pageTitle: '创建资产配置报告',
            }
        },
    ]
}