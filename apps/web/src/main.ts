import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus, { ElMessage } from 'element-plus'
import { renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'

import '@/router/guard'

import { isQiankun } from './utils/qiankun'
import 'virtual:uno.css'
import Csui from 'csui'
import 'csui/theme-chalk/inner.css'
import '@/styles/namespace.scss'
import '@/styles/app.less'
import '@/styles/finance-theme.scss'

import type { App as VueInstance } from 'vue'

let app: VueInstance

window.$message = ElMessage

const render = () => {
  app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(Csui, {
    namespace: 'feGitStat-cs',
    elNamespace: 'feGitStat',
  })
  app.use(ElementPlus, {
    namespace: 'feGitStat',
    locale: zhCn,
  })
  app.mount('#app')
}

// @ts-ignore
// renderWithQiankun(render, app)

renderWithQiankun({
  mount(props) {
    render()
    app.config.globalProperties.actions = props.microAction
  },
  bootstrap() {},
  unmount() {
    app.unmount()
    app._container.innerHTML = ''
    // @ts-ignore
    app = null
  },
  update() {},
})

if (!isQiankun) {
  render()
}
