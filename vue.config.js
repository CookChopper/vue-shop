/*
 * @Author: CookChopper
 * @Date: 2021-12-31 21:53:14
 * @LastEditTime: 2022-01-01 15:55:04
 * @LastEditors: CookChopper
 * @Description: vue配置
 */
/* eslint-disable */
let cdn = {
  css: [],
  js: []
}
let isProd = process.env.NODE_ENV === 'production'
let externals = {}
if (isProd) {
  cdn = {
    css: [
      'https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css'
    ],
    js: ['https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/better-scroll@latest/dist/better-scroll.min.js',
    'https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js'  
  ]
  }
  externals = {
    'vue': 'Vue',
    'better-scroll':'BetterScroll',
    'vant':'Vant'
  }
}

module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  },
  configureWebpack:  {
    externals
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  /*css: {
      // 是否使用css分离插件 ExtractTextPlugin
      extract: true,
      // 开启 CSS source maps?
      sourceMap: false,
      // css预设器配置项
      loaderOptions: {},
      // 启用 CSS modules for all css / pre-processor files.
      modules: false
  },*/
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // open: process.platform === 'darwin',
    //将服务启动后默认打开浏览器
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理

      '/api/v1': {
        target: 'http://47.99.134.126:28019',
        changeOrigin: true
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
