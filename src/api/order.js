/*
 * @Author: CookChopper
 * @Date: 2021-12-28 15:08:39
 * @LastEditTime: 2021-12-30 00:57:59
 * @LastEditors: CookChopper
 * @Description: 订单API
 */
import axios from 'axios'

// 生成订单接口
export function createOrder(params) {
  return axios.post('/saveOrder', params)
}

// 订单列表
export function getOrderList(params) {
  return axios.get('/order', { params })
}

// 订单详情
export function getOrderDetail(id) {
  return axios.get(`/order/${id}`)
}

// 取消订单
export function cancelOrder(orderId) {
  return axios.put(`/order/${orderId}/cancel`)
}

// 确认收货
export function finishOrder(orderId) {
  return axios.put(`/order/${orderId}/finish`)
}

// 模拟付款成功回调接口
export function paySuccess(params) {
  return axios.get(`/paySuccess`, { params })
}
