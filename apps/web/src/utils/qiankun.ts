import { qiankunWindow, renderWithQiankun as render } from 'vite-plugin-qiankun/dist/helper'
import type { App as VueInstance } from 'vue'

export const isQiankun = qiankunWindow.__POWERED_BY_QIANKUN__

export const renderWithQiankun = (renderFunc: any, app: VueInstance) => {
  render({
    mount() {
      renderFunc()
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
}
