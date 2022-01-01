/*
 * @Author: CookChopper
 * @Date: 2021-12-21 22:25:24
 * @LastEditTime: 2021-12-21 22:25:25
 * @LastEditors: CookChopper
 * @Description: 首页API
 */
import axios from '../utils/axios'
export function getHomeInfo() {
  return axios.get('/index-infos')
}
