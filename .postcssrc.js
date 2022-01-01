/*
 * @Author: CookChopper
 * @Date: 2021-12-19 18:56:04
 * @LastEditTime: 2021-12-19 19:08:14
 * @LastEditors: CookChopper
 * @Description: 自动px转rem
 */
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7'] 
    },
    'postcss-pxtorem': {
      rootValue: 37.5, // vant-UI的官方根字体大小是37.5
      propList: ['*']
    },
    
  }
}