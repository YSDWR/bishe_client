import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Home_test from '../views/Home_test'
import Add from '../views/Add'
import PackageInfo from '../views/PackageInfo'
import DisposeInfo from '../views/DisposeInfo'
const TrackRecord = () => import ('../views/MapContainer')
const Collects = () => import('../views/Collects')
const Disposels = () => import('../views/Disposels')
import E404 from '../views/E404'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: E404
  }
  ,
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/home',
        redirect: '/packageinfo'
      },
      {
      path:'/test',
      name: 'home_test',
      component: Home_test
      },
      {
        path: '/map',
        name: 'map',
        component: TrackRecord
      },
      {
        path: '/packageinfo',
        name: 'packageinfo',
        component: PackageInfo
      },
      {
        path: '/disposeinfo/:id',
        name: 'disposeinfo',
        component: DisposeInfo
      },
      {
        path: '/collects',
        name: 'collects',
        component: Collects
      },
      {
        path: '/disposels',
        name: 'disposels',
        component: Disposels
      },
      {
        path: '/add',
        name: 'add',
        component: Add
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false
  if(to.path == '/login' || to.path == '*') {
    next()
  } else {
    if(isLogin) {
      next()
    } else {
      Vue.prototype.$message.error('未登录，返回登陆界面')
      next('/login')
    }
  }
})

export default router
