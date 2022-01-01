/*
 * @Author: CookChopper
 * @Date: 2021-12-23 08:45:58
 * @LastEditTime: 2021-12-23 08:45:59
 * @LastEditors: CookChopper
 * @Description: 分类API
 */

import axios from 'axios'

export function getCategory() {
  return axios.get('/categories')
}
