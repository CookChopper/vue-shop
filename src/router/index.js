/*
 * @Author: CookChopper
 * @Date: 2021-12-19 00:49:34
 * @LastEditTime: 2021-12-30 22:49:19
 * @LastEditors: CookChopper
 * @Description: 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductDetail.vue'),
    meta: {
      index: 3
    }
  },
  {
    path: '/create-order',
    name: 'CreateOrder',
    component: () => import('../views/CreateOrder.vue'),
    meta: {
      index: 5
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address.vue')
  },
  {
    path: '/address/edit',
    name: 'AddressEdit',
    component: () => import('../views/AddressEdit.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/Category.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
    meta: {
      index: 4
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue'),
    meta: {
      index: 6
    }
  },
  {
    path: '/order-detail/:id',
    name: 'OrderDetail',
    component: () => import('@/views/OrderDetail.vue'),
    meta: {
      index: 7
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue'),
    meta: {
      index: 8
    }
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: () => import('@/views/ProductList.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
