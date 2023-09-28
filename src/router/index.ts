import { createRouter, createWebHashHistory } from 'vue-router'
let layout = () => import('@/layout/index.vue')
let home = () => import('@/view/home/index.vue')
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '/home',
          component: home
        }
      ]
    }
  ]
})
