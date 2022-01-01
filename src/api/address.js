/*
 * @Author: CookChopper
 * @Date: 2021-12-27 15:59:44
 * @LastEditTime: 2021-12-27 23:01:06
 * @LastEditors: CookChopper
 * @Description: 地址api
 */

import axios from '../utils/axios'
// 获取收货地址列表
export function getAddress() {
  return axios.get('/address')
}
// 添加收货地址
export function addAddress(params) {
  return axios.post('/address', params)
}
// 修改收货地址
export function editAddress(params) {
  return axios.put('/address', params)
}
// 收货地址详情
export function getAddressDetail(id) {
  return axios.get(`/address/${id}`)
}
// 删除收货地址
export function delAddress(id) {
  return axios.delete(`/address/${id}`)
}
// 获取默认地址
export function getDefaultAddress() {
  return axios.get('/address/default')
}
