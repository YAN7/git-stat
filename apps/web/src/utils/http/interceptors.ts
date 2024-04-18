import type { AxiosResponse } from 'axios'
import { getSuzakuToken } from './helper'

import type { BusinessData } from './types'

export const defaultRequestInterceptors = (config: any) => {
  config.headers['token'] = getSuzakuToken()
  return config
}

export const defaultResponseInterceptors = (res: AxiosResponse) => {
  if (res.data instanceof Blob) return res
  const { code, message, success }: BusinessData = res.data
  if (!success) {
    window.$message.error(message)
    return Promise.reject({ code, message })
  }
  return res
}

export const defaultResponseErrorInterceptors = (error: any) => {
  const { status } = error.response
  const { message } = error.response.data
  if (status === 401) {
    window.$message.error('401: 未登录')
    // window.sessionStorage.clear()
    // window.location.href =
    //   import.meta.env.VITE_APP_SUZAKU + '/suzaku-web/mylogin?path=' + btoa(window.location.href)
  } else if (status === 403) {
    window.$message.error('403: 没有权限访问')
  } else if (status === 400) {
    window.$message.error(`400: ${message}`)
  } else {
    window.$message.error(message ?? error.message ?? '请求报错了，请联系技术人员或稍后重试')
  }
  return Promise.reject(error)
}
