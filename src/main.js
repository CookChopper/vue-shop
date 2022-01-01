/*
 * @Author: CookChopper
 * @Date: 2021-12-19 00:49:34
 * @LastEditTime: 2021-12-21 23:26:34
 * @LastEditors: CookChopper
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'

// 引入移动端分辨率自适应
import 'lib-flexible/flexible'
// 引入md5加密
import md5 from 'js-md5'
// 引入自定义指令
import * as directives from './directives'
Object.keys(directives).forEach(key => {
  // console.log(key)
  Vue.directive(key, directives[key])
})

// 全局注册组件
Vue.use(components)

Vue.config.productionTip = false

Vue.prototype.$md5 = md5

window.vRouter = router

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
