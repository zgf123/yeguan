import Capital from '../components/capital/view.vue'
import CapitalIndex from '../components/capital/index.vue'
import CapitalTemplate from '../components/capital/template.vue'

import CapitalShow from '../components/capital/show.vue'
import CapitalEdit from '../components/capital/edit.vue'
import CapitalSendhistory from '../components/capital/sendhistory.vue'
import CapitalClient from '../components/capital/client.vue'
import CapitalAddproduct from '../components/capital/addproduct.vue'


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
                pageTitle: '资产配置',
            }
        },
        {
            path: 'edit',
            component: CapitalEdit,
            alias: 'add',
            meta: {
                pageTitle: '添加资产配置报告',
            }
        },
        {
            path: 'template',
            component: CapitalTemplate,
            meta: {
                pageTitle: '资产配置报告',
            }
        },



        {
            path: 'show',
            component: CapitalShow,
            meta: {
                pageTitle: '',
            }
        },
        {
            path: 'client',
            component: CapitalClient,
            meta: {
                pageTitle: '',
            }
        },
        {
            path: 'sendhistory',
            component: CapitalSendhistory,
            meta: {
                pageTitle: '发送记录',
            }
        },
        {
            path: 'addproduct',
            component: CapitalAddproduct,
            meta: {
                pageTitle: '添加产品',
            }
        },
    ]
}