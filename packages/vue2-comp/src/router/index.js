import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/modal',
    name: 'Modal',
    component: () => import('../views/commonComponents/Modal/index.vue'),
  },
  {
    path: '/base',
    name: 'Base',
    component: () => import('../views/baseComponents/TagA/index.vue'),
  },
  {
    path: '/routeTest/:id',
    name: 'RouteTest',
    component: () => import ('../views/test/route-test/index.vue')
  }
]

const router = new VueRouter({
  routes,
})

export default router
