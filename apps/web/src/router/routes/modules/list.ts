export default {
  path: 'list',
  name: 'List',
  meta: {
    title: '列表',
  },
  children: [
    {
      path: '/list/basic',
      name: 'BasicList',
      component: () => import('@/views/list/basic/index.vue'),
      meta: {
        title: '基础列表',
      },
    },
    {
      path: '/list/tab',
      name: 'TabList',
      component: () => import('@/views/list/tab/index.vue'),
      meta: {
        title: 'tab切换列表',
      },
    },
    {
      path: '/list/left-tree',
      name: 'TreeList',
      component: () => import('@/views/list/left-tree/index.vue'),
      meta: {
        title: '左侧树列表',
      },
    },
  ],
}
