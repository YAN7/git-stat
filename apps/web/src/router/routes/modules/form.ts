export default {
  path: 'form',
  name: 'Form',
  meta: {
    title: '表单',
  },
  children: [
    {
      path: '/form/two-cols',
      name: 'TwoColsForm',
      meta: {
        title: '两列表单',
      },
      component: () => import('@/views/form/two-cols/index.vue'),
    },
    {
      path: '/form/three-cols',
      name: 'ThreeColsForm',
      meta: {
        title: '三列表单',
      },
      component: () => import('@/views/form/three-cols/index.vue'),
    },
    {
      path: '/form/dialog',
      name: 'DialogForm',
      meta: {
        title: '弹窗表单',
      },
      component: () => import('@/views/form/dialog/index.vue'),
    },
    {
      path: '/form/left-tree',
      name: 'LeftTreeForm',
      meta: {
        title: '左侧树表单',
      },
      component: () => import('@/views/form/left-tree/index.vue'),
    },
    {
      path: '/form/tab',
      name: 'TabForm',
      meta: {
        title: 'tab切换表单',
      },
      component: () => import('@/views/form/tab/index.vue'),
    },
  ],
}
