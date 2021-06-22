import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入elementUi组件
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 导入图标样式
import './assets/font/iconfont.css'
// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://47.115.152.84:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
