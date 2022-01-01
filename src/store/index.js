/*
 * @Author: CookChopper
 * @Date: 2021-12-19 00:49:34
 * @LastEditTime: 2021-12-26 10:52:02
 * @LastEditors: CookChopper
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {}
})
