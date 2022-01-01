/*
 * @Author: CookChopper
 * @Date: 2021-12-20 21:13:08
 * @LastEditTime: 2021-12-30 23:02:38
 * @LastEditors: CookChopper
 * @Description: 用户API
 */

import axios from '../utils/axios.js'

/**
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserInfo() {
  return axios.get('/user/info')
}

/**
 * @description: 修改用户资料
 * @param {*} params
 * @return {*}
 */
export function editUserInfo(params) {
  return axios.put('/user/info', params)
}

/**
 * @description: 登录
 * @param {*} data
 * @return {*}
 */
export function login(params) {
  return axios.post('/user/login', params)
}

/**
 * @description: 登出
 * @param {*}
 * @return {*}
 */
export function logout() {
  return axios.post('/user/logout')
}

/**
 * @description: 注册
 * @param {*} data
 * @return {*}
 */
export function register(params) {
  return axios.post('/user/register', params)
}
