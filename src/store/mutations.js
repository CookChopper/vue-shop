/*
 * @Author: CookChopper
 * @Date: 2021-12-26 10:36:05
 * @LastEditTime: 2021-12-26 11:17:01
 * @LastEditors: CookChopper
 * @Description: mutations
 */
import Cookies from 'js-cookie'

export default {
  addCart(state, payload) {
    state.cartCount = payload.count
    Cookies.set('cartCount', payload.count)
  }
}
