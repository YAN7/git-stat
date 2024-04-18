import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { getFileTypeByName, handlerResponseError, getContentType } from './helper'
import {
  defaultRequestInterceptors,
  defaultResponseErrorInterceptors,
  defaultResponseInterceptors,
} from './interceptors'

import type { AxiosInstance } from 'axios'

class Http {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/itom',
      timeout: 30000,
      timeoutErrorMessage: '请求超时',
      withCredentials: true,
    })

    this.axiosInstance.interceptors.request.use(defaultRequestInterceptors)
    this.axiosInstance.interceptors.response.use(
      defaultResponseInterceptors,
      defaultResponseErrorInterceptors,
    )
  }

  async post<T = any>(
    url: string,
    body?: any,
    options?: any,
  ): Promise<{ code: number; success: boolean; data: T }> {
    const res = await this.axiosInstance.post(url, body, options)
    return res.data
  }

  async put(url: string, body?: object) {
    const res = await this.axiosInstance.put(url, body)
    return res
  }

  async delete(url: string, data?: object) {
    const res = await this.axiosInstance.delete(url, { data })
    return res
  }

  async postFile(url: string, body?: any) {
    const res = await this.axiosInstance.post(url, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return res
  }

  async get(url: string, params?: object) {
    const res = await this.axiosInstance.get(url, { params })
    return res
  }

  /**
   * 下载一个文件, 为了安全,使用Post方式请求后端
   * @param {*} url 请求地址
   * @param {*} data 请求参数
   * @param {*} fileName 下载的文件名称，全称，包括后缀
   * @param {*} handlerResponseError 下载时后端没有返回文件流的转换
   */
  async downloadFile(url: string, data?: any, fileName?: any) {
    const fileType = getFileTypeByName(fileName)
    const contentType = getContentType(fileType)

    return this.axiosInstance
      .post(url, data, { responseType: 'blob' })
      .then((res) => {
        if (res.data.type == 'application/json') {
          handlerResponseError(res) // 没有返回文件流的处理方法
        } else {
          const link = document.createElement('a')
          const blob = new Blob([res.data], { type: contentType })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
      .catch((error) => {
        console.log('error', error)
        window.$message.error('下载文件失败！')
      })
  }
}

const http = new Http()

export default http
