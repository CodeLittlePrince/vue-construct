const webpack = require('webpack')
const webpackConfigBase = require('./webpack.config.base.js')

const config = Object.assign(webpackConfigBase.config, {
  // sourcemap 模式
  devtool: '#inline-source-map',
  plugins: [
    // 定义全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      }
    })
  ]
})

module.exports = config