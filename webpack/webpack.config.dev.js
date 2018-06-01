const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base.js')

const config = Object.assign(webpackConfigBase.config, {
  // sourcemap 模式
  devtool: 'cheap-module-eval-source-map',
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
      favicon: webpackConfigBase.favicon,
      filename: 'index.html',
      template: webpackConfigBase.resolve('src/index.html')
    }),
    // 抽离出css，开发环境其实不抽离，但是为了配合extract-text-webpack-plugin插件，需要做个样子
    webpackConfigBase.extractAppCSS,
    webpackConfigBase.extractBaseCSS,
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 更友好地输出错误信息
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:7777 上，由 koa 提供 mock 数据。
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock。
      '/api': {
        target: 'http://localhost:7777', // 如果说联调了，将地址换成后端环境的地址就哦了
        secure: false
      }
    },
    host: '0.0.0.0',
    disableHostCheck: true, // 为了手机可以访问
    contentBase: webpackConfigBase.resolve('dev'), // 本地服务器所加载的页面所在的目录
    // historyApiFallback: true, // 为了SPA应用服务
    inline: true, //实时刷新
    hot: true  // 使用热加载插件 HotModuleReplacementPlugin
  }
})

module.exports = config