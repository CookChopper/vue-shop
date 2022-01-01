/*
 * @Author: CookChopper
 * @Date: 2021-12-26 10:36:13
 * @LastEditTime: 2021-12-26 11:16:12
 * @LastEditors: CookChopper
 * @Description: vuex 异步actions
 */

import { getCart } from '../api/goods'
export default {
  async updateCart(context) {
    const { data } = await getCart()

    context.commit('addCart', {
      count: data.length || 0
    })
  }
}
