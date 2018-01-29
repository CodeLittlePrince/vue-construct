const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackConfigBase = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const exec = require('child_process').execSync
const pkg = require('./package.json');

// 网站图标配置
const favicon = path.join(__dirname, 'favicon.ico')
// 网站版本号设置
let appVersion = ''
try {
  appVersion = exec('git rev-parse --short HEAD').toString().replace(/\n/, '')
} catch (e) {
  console.warn('Getting revision FAILED. Maybe this is not a git project.')
}

const config = Object.assign(webpackConfigBase, {
  // You should configure your server to disallow access to the Source Map file for normal users!
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, './app/index.js'),
    // 将第三方依赖（node_modules）的库打包
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // publicPath: 'https://cdn.self.com'
    publicPath: path.join(__dirname, 'dist/'),
    filename: 'static/js/[name].[chunkhash:8].js'
  },
  plugins: [
    // Scope hosting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 删除build文件夹
    new CleanWebpackPlugin(
      path.join(__dirname, '/dist')
    ),
    // 抽离出css
    new ExtractTextPlugin({
      filename: 'static/css/[name].[chunkhash:8].css',
      allChunks: true
    }),
    // 提供公共代码vendor
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'static/js/[name].[chunkhash:8].js'
    }),
    // html 模板插件
    new HtmlWebpackPlugin({
      appVersion,
      favicon,
      filename: 'index.html',
      template: path.join(__dirname, '/app/index.html'),
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
    // new BundleAnalyzerPlugin(),
    // 加署名
    new webpack.BannerPlugin("Copyright by 子咻 https://github.com/CodeLittlePrince/blog"),
  ]
})

module.exports = config