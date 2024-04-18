import { useTitle } from '@vueuse/core'
import router from './index'

router.beforeEach((to, from, next) => {
  useTitle(`前端开发代码统计-${to?.meta?.title}`)
  next()
})
