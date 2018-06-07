import Wallet from '../components/wallet/View.vue'
import IndexP from '../components/wallet/Index.vue'
import Account from '../components/wallet/Account.vue'
import BlankCard from '../components/wallet/BlankCard.vue'
import AddCard from '../components/wallet/AddCard.vue'
import Question from '../components/wallet/Question.vue'
import Answer from '../components/wallet/Answer.vue'
import Charge from '../components/wallet/Charge.vue'
import ChargeResult from '../components/wallet/ChargeResult.vue'
import Withdraw from '../components/wallet/Withdraw.vue'
import WithdrawResult from '../components/wallet/WithdrawResult.vue'

export default {
    path: '/wallet',
    component: Wallet,
    meta: {
        backUrl: '',
        requiresAuth: true
    },
    children:[
        {
            path: '',
            component: IndexP,
            meta:{
                title:'我的钱包'
            }
        },
        {
            path: 'account',
            component: Account,
            meta:{
                title:'余额明细'
            }
        },
        {
            path: 'blankcard',
            component: BlankCard,
            meta:{
                title:'我的银行卡'
            }
        },
        {
            path: 'addcard',
            component: AddCard,
            meta:{
                title:'添加银行卡'
            }
        },
        {
            path: 'question',
            component: Question,
            meta:{
                title:'常见问题'
            }
        },
        {
            path: 'charge',
            component: Charge,
            meta:{
                title:'钱包充值'
            }
        },
        {
            path: 'chargeresult',
            component: ChargeResult,
            meta:{
                title:'充值成功'
            }
        },
        {
            path: 'withdraw',
            component: Withdraw,
            meta:{
                title:'余额提现'
            }
        },
        {
            path: 'withdrawresult',
            component: WithdrawResult,
            meta:{
                title:'提现结果'
            }
        },
    ]
}