const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base.js')
const proxyConfig = require('./proxy.config.js')
const os = require('os')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = Object.assign(webpackConfigBase.config, {
  // sourcemap 模式
  devtool: 'eval-source-map', // 定位会有问题，还是用eval-source-map好了
  // 入口
  entry: {
    app: webpackConfigBase.resolve('src/index.js')
  },
  // 输出
  output: {
    path: webpackConfigBase.resolve('dev'),
    filename: 'index.bundle.js'
  },
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: webpackConfigBase.resolve('src/index.html')
    }),
    new CopyWebpackPlugin([
      // 复制favicon到dist
      {
        from: webpackConfigBase.favicon,
        to: webpackConfigBase.resolve('dev')
      }
    ]),
    // 抽离出css，开发环境其实不抽离，但是为了配合extract-text-webpack-plugin插件，需要做个样子
    webpackConfigBase.extractBaseCSS,
    webpackConfigBase.extractAppCSS,
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 更友好地输出错误信息
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 target 上，由 koa 提供 mock 数据。
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock。
      '/': {
        target: `${proxyConfig.domain}:${proxyConfig.port}`, // 如果说联调了，将地址换成后端环境的地址就哦了
        secure: false,
        changeOrigin: true
      }
    },
    host: getIP(),
    disableHostCheck: true, // 为了手机可以访问
    contentBase: webpackConfigBase.resolve('dev'), // 本地服务器所加载的页面所在的目录
    // historyApiFallback: true, // 为了SPA应用服务
    inline: true, //实时刷新
    hot: true  // 使用热加载插件 HotModuleReplacementPlugin
  }
})

/**
 * 获取本机ip
 */
function getIP() {
  const interfaces = os.networkInterfaces()
  let addresses = []
  for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
      let address = interfaces[k][k2]
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }
  return addresses[0]
}

module.exports = config