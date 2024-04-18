import type { RouteRecordRaw } from 'vue-router'

const modules: any = import.meta.glob('./modules/*.ts', {
  eager: true,
})

const appRoutes: RouteRecordRaw[] = []

Object.keys(modules).forEach((moduleKey) => {
  const defaultModule = modules[moduleKey]?.default
  if (!defaultModule) return
  const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]

  appRoutes.push(...moduleList)
})

export default appRoutes
