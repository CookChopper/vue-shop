/*
 * @Author: CookChopper
 * @Date: 2021-12-31 21:38:19
 * @LastEditTime: 2021-12-31 22:34:36
 * @LastEditors: CookChopper
 * @Description: 地图API
 */

import axios from 'axios'
// 输入提示
export function getInputTips(params) {
  // return (
  return axios.get('/v3/assistant/inputtips', { params })
}
