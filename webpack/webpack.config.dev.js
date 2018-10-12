const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base.js')
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
  ]
})

module.exports = config