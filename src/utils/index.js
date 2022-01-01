/*
 * @Author: CookChopper
 * @Date: 2021-12-21 12:17:09
 * @LastEditTime: 2021-12-21 12:17:09
 * @LastEditors: CookChopper
 * @Description: 公用方法
 */

export function getLocal(name) {
  return localStorage.getItem(name)
}

export function setLocal(name, value) {
  return localStorage.setItem(name, value)
}
