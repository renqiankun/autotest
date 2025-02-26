import { createRouter, createWebHashHistory } from 'vue-router'
const layout = () => import('@/layout/index.vue')
const home = () => import('@/view/home/index.vue')
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: home
        }
      ]
    }
  ]
})
