export default {
  path: 'exception',
  name: 'Exception',
  meta: {
    title: '异常页',
  },
  children: [
    {
      path: '/exception/403',
      name: 'ExceptionForbidden',
      component: () => import('@/views/exception/403.vue'),
      meta: {
        title: '无权访问',
      },
    },
    {
      path: '/exception/404',
      name: 'ExceptionNotFound',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: '未找到该资源',
      },
    },
    {
      path: '/exception/500',
      name: 'ExceptionServerError',
      component: () => import('@/views/exception/500.vue'),
      meta: {
        title: '服务器出错',
      },
    },
  ],
}
