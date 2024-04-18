export default {
  path: '/dashBoard',
  name: 'DashBoard',
  component: () => import('@/views/dashboard/home/index.vue'),
  meta: {
    title: '看板',
  },
  // children: [
  //   {
  //     path: '/dashBoard/home',
  //     name: 'Home',
  //     component: () => import('@/views/dashboard/home/index.vue'),
  //     meta: {
  //       title: '很长很长很长很长很长很长很长的首页',
  //     },
  //   },
  // ],
}
