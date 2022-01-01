/*
 * @Author: CookChopper
 * @Date: 2021-12-20 16:31:03
 * @LastEditTime: 2021-12-31 22:00:20
 * @LastEditors: CookChopper
 * @Description: axios
 */

import axios from 'axios'
import { Toast } from 'vant'

// api请求地址
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api/v1' : '/api/v1'
// 跨域请求是否携带cookies
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 通过token判断登录状态啊
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// post请求发送json格式包
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 请求拦截器
axios.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['token'] = localStorage.getItem('token')
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常')
    return Promise.reject(res)
  }
  if (res.data.resultCode !== 200) {
    if (res.data.message) Toast.fail(res.data.message)
    // 416响应码为未登录状态
    if (res.data.resultCode === 416) {
      window.vRouter.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }
  return res.data
})

export default axios
