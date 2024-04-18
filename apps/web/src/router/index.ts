import { createRouter, createWebHashHistory } from 'vue-router'

import appRoutes from './routes'

const prefix = '#/feGitStat'

const router = createRouter({
  history: createWebHashHistory(prefix),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/content.vue'),
      children: [...appRoutes],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/exception/404.vue'),
    },
  ],
})

export default router
