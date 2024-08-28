

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/HomePage.vue')
    },
    {
      path: '/square',
      name: 'square',
      component: () => import('../components/TakeOrder.vue')
    },
    {
      path:"/orderFeature/:orderid",
      name: 'orderFeature',
      component: () => import('../components/orderFeature.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../components/User/UserPage.vue'),
      beforeEnter: (to, from, next) => {
        // const isAuthenticated = store.state.isAuthenticated
        // if (isAuthenticated) {
        //   next()
        // } else {
        //   next('/user/login')
        // }
        if(store.state.isAuthenticated){
          next()
        }else{
          next({name:'login'})
      }
    }
  },
    {
      path: '/user/userinfo',
      name: 'userinfo',
      component: () => import('../components/User/BaseInfoPage.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.state.isAuthenticated
        if (isAuthenticated) {
          next()
        } else {
          next('/user/login')
        }
      }
    },
    {
      path: '/xcj',
      name: 'xcj',
      component: () => import('../components/takeorder/GroupPage.vue')
    },
    {
      path: '/express',
      name: 'express',
      component: () => import('@/components/takeorder/ExpressPage.vue')
    },
    {
      path: '/supermarket',
      name: 'supermarket',
      component: () => import('@/components/takeorder/SuperPage.vue')
    },
    {
      path: '/userdefine',
      name: 'userdefine',
      component: () => import('@/components/takeorder/UserDefine.vue')
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('../components/User/LoginPage.vue')
    },
    {
      path: '/user/reg',
      name: 'userreg',
      component: () => import('../components/User/RegPage.vue')
    },
    {
      path: '*',
      name: 'redirect',
      component: () => import('../components/tools/RedirectPage.vue')
    },
    {
      path: '/User/OrderList',
      name: 'orderlist',
      component: () => import('../components/User/OrderListPage.vue')
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('@/components/tools/AgreementPage.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/test/TestPage.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../components/status/SuccessPage.vue')
    },
    {
      path: '/tools/shop',
      name: 'shop',
      component: () => import('../components/tools/ShopPage.vue')
    },
    {
      path: '/tools/concept',
      name: 'concept',
      component: () => import('../components/tools/ConceptPage.vue')
    },
    {
      path: '/user/rank',
      name: 'rank',
      component: () => import('@/components/User/RankPage.vue')
    },
    {
      path: '/user/aply',
      name: 'Aply',
      component: () => import('@/components/User/ApplyRunner.vue')
    },
    {
      path: '/user/order',
      name: 'userorder',
      component: () => import('@/components/User/OrderListPage.vue')
    },
    {
      path: '/user/about',
      name: 'about',
      component: () => import('@/components/User/AboutUs.vue')
    },
    {
      path:'/user/bindemail',
      name: 'bindemail',
      component: () => import('@/components/User/bindEmail.vue')
    }
  ],
  mode: 'history'
})

export default router