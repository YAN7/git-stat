export default {
  path: 'workflow',
  name: 'Workflow',
  meta: {
    title: '审批页',
  },
  children: [
    {
      path: '/workflow/todo',
      name: 'WorkflowTodo',
      component: () => import('@/views/workflow/todo/index.vue'),
      meta: {
        title: '待办',
      },
    },
    {
      path: '/workflow/done',
      name: 'WorkflowDone',
      component: () => import('@/views/workflow/done/index.vue'),
      meta: {
        title: '已办',
      },
    },
  ],
}
