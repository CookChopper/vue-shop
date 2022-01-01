/*
 * @Author: CookChopper
 * @Date: 2021-12-25 18:22:09
 * @LastEditTime: 2021-12-27 15:05:56
 * @LastEditors: CookChopper
 * @Description: 商品API
 */

import axios from '../utils/axios'

// 搜索
export function search(params) {
  return axios.get('/search', { params })
}

// 商品详情
export function getGoodDetail(id) {
  return axios.get(`/goods/detail/${id}`)
}

// 获取购物车列表
export function getCart(params) {
  return axios.get('/shop-cart', { params })
}

// 添加商品到购物车
export function addCart(params) {
  return axios.post('/shop-cart', params)
}

// 修改商品购物车
export function editCart(params) {
  return axios.put('/shop-cart', params)
}

// 删除商品购物车
export function delCart(id) {
  return axios.delete(`/shop-cart/${id}`)
}

// 获取需要生成的订单列表
export function getByCartItemIds(params) {
  return axios.get('shop-cart/settle', { params })
}
