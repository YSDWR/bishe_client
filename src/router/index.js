import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Map from '../views/MapContainer'
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
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  }
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
