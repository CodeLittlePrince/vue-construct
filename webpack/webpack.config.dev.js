const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = Object.assign(webpackConfigBase.config, {
  mode: 'development',
  devtool: 'eval-source-map', // 定位会有问题，还是用eval-source-map好了
  // 入口
  entry: {
    app: [webpackConfigBase.resolve('src/index.js')]
  },
  // 输出
  output: {
    path: webpackConfigBase.resolve('dev'),
    filename: '[name].js'
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
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 更友好地输出错误信息
    new FriendlyErrorsPlugin(),
    // make sure to include the plugin for the magic
    webpackConfigBase.VueLoaderPluginInstance,
    // 提示信息
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin()
  ]
})

module.exports = config