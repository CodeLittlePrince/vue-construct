const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base.js')

const config = Object.assign(webpackConfigBase.config, {
  // sourcemap 模式
  devtool: 'cheap-module-eval-source-map',
  // 入口
  entry: {
    app: webpackConfigBase.resolve('app/index.js')
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
      template: webpackConfigBase.resolve('app/index.html')
    }),
    // 抽离出css，开发环境其实不抽离，但是为了配合extract-text-webpack-plugin插件，需要做个样子
    webpackConfigBase.extractAppCSS,
    webpackConfigBase.extractBaseCSS,
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 更友好地输出错误信息
    new FriendlyErrorsPlugin()
  ]
})

module.exports = config