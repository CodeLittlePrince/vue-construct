const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const exec = require('child_process').execSync
const webpackConfigBase = require('./webpack.config.base.js')
const pkg = require('./package.json')

// 网站版本号设置
let appVersion = ''
try {
  appVersion = exec('git rev-parse --short HEAD').toString().replace(/\n/, '')
} catch (e) {
  console.warn('Getting revision FAILED. Maybe this is not a git project.')
}

const config = Object.assign(webpackConfigBase.config, {
  // You should configure your server to disallow access to the Source Map file for normal users!
  devtool: 'source-map',
  entry: {
    app: webpackConfigBase.resolve('app/index.js'),
    // 将第三方依赖（node_modules）的库打包，从而充分利用浏览器缓存
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: webpackConfigBase.resolve('dist'),
    // publicPath: 'https://cdn.self.com'
    publicPath: webpackConfigBase.resolve('dist/'),
    filename: 'static/js/[name].[chunkhash:8].js'
  },
  plugins: [
    // Scope hosting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 删除build文件夹
    new CleanWebpackPlugin(
      webpackConfigBase.resolve('dist')
    ),
    // 抽离出css
    webpackConfigBase.extractAppCSS,
    webpackConfigBase.extractBaseCSS,
    // 提取vendor,和公共commons
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'commons']
    }),
    // html 模板插件
    new HtmlWebpackPlugin({
      appVersion,
      favicon: webpackConfigBase.favicon,
      filename: 'index.html',
      template: webpackConfigBase.resolve('app/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    // 定义全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 可视化分析
    new BundleAnalyzerPlugin(),
    // 加署名
    new webpack.BannerPlugin('Copyright by 子咻 https://github.com/CodeLittlePrince/blog'),
  ]
})

module.exports = config