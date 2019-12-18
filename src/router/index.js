import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // 登录
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue')
    },
    // 列表页
    {
        path: '/list',
        name: 'list',
        component: () => import('../views/list.vue')
    },
    // 公司管理部分
    {
        path: '/company',
        name: 'company',
        component: () => import('../views/company.vue')
    },
    // 部门管理
    {
        path: '/tab',
        name: 'tab',
        component: () => import('../views/tab.vue')
    },
    // 统计报表
    {
        path: '/Statistics',
        name: 'Statistics',
        component: () => import('../views/Statistics.vue')
    },
    // 我的客户
    {
        path: '/myCustomer',
        name: 'myCustomer',
        component: () => import('../views/Customer/myCustomer.vue')
    },
    // 添加客户
    {
        path: '/addCustomer',
        name: 'addCustomer',
        component: () => import('../views/Customer/addCustomer.vue')
    },

]


const router = new VueRouter({
    routes
})

export default router