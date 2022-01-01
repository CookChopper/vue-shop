/*
 * @Author: CookChopper
 * @Date: 2021-12-21 23:21:43
 * @LastEditTime: 2021-12-21 23:25:35
 * @LastEditors: CookChopper
 * @Description: 自定义指令
 */

export const imagerror = {
  inserted(dom, option) {
    dom.src = dom.src || option.value
    dom.onerror = () => {
      dom.src = option.value
    }
  },
  componentUpdated(dom, option) {
    dom.src = dom.src || option.value
  }
}
