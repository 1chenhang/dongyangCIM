import axios from 'axios'
import router from '@/router/index'
import Store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isNull, errorNotification } from './utils'

NProgress.configure({
  easing: 'ease',
  showSpinner: false
})

const noAuthMessage = '检测到您未登录或登陆凭证已失效，请重新登录'
const request = axios.create({
  timeout: 600000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  validateStatus (status) {
    return status >= 200 && status <= 500
  }
})

request.interceptors.request.use(
  (config) => {
    NProgress.start()
    const token = window.sessionStorage.getItem('token')
    if (config.url.indexOf('download') > -1 || config.url.toLowerCase().indexOf('download') > -1 || config.url.indexOf('export') > -1) {
      config.responseType = 'blob'
    }
    if (!isNull(token)) {
      const headers = config.headers
      if (headers) {
        headers['token'] = token
      }
    }

    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    NProgress.done()
    const status = response.status || 401
    if (status === 401) {
      errorNotification(noAuthMessage)
      Store.commit('logout')
      router.push({ path: '/login' })
      // return Promise.reject(noAuthMessage)
    }

    return response.data
  },
  (error) => {
    NProgress.done()
    if (!axios.isCancel(error)) {
      console.log('Response error:', error)
    }
    return Promise.reject(error)
  }
)
export default {
  get (url, params) {
    return new Promise((resolve, reject) => {
      request
        .get(url, { params })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          // 处理失败的请求
          reject(err)
        })
    })
  },
  post (url, data, params) {
    return new Promise((resolve, reject) => {
      request
        .post(url, data, { params })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          // 处理失败的请求
          reject(err)
        })
    })
  },
  postBody (url, data) {
    return new Promise((resolve, reject) => {
      request
        .post(url, data)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          // 处理失败的请求
          reject(err)
        })
    })
  },
  postQuery (url, params) {
    return new Promise((resolve, reject) => {
      request
        .post(url, {}, { params })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          // 处理失败的请求
          reject(err)
        })
    })
  },
  putQuery (url, params) {
    return new Promise((resolve, reject) => {
      request
        .put(url, null, { params })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          // 处理失败的请求
          reject(err)
        })
    })
  },
  postExcel (url, query, params) {
    return new Promise((resolve, reject) => {
      request({
        method: 'post',
        responseType: 'blob',
        url,
        data: params,
        params: query
      })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  postUpload (url, query, params) {
    return new Promise((resolve, reject) => {
      request({
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        url,
        data: params,
        params: query
      })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
