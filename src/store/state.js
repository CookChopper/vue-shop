/*
 * @Author: CookChopper
 * @Date: 2021-12-26 10:35:32
 * @LastEditTime: 2021-12-26 11:17:33
 * @LastEditors: CookChopper
 * @Description: vuex 状态state管理
 */
import Cookies from 'js-cookie'

export default {
  cartCount: Cookies.get('cartCount') || 0
}
