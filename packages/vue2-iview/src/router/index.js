import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/test',
    component: () => import('@/views/test/index.vue'),
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/index.vue'),
  },
  {
    path: '/filter-data-modal',
    component: () => import('@/views/filter-data-modal/index.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export { router }
