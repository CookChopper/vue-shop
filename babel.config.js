/*
 * @Author: CookChopper
 * @Date: 2021-12-19 00:49:34
 * @LastEditTime: 2021-12-19 18:29:41
 * @LastEditors: CookChopper
 * @Description:
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
}
