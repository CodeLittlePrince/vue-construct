const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackConfigBase = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pkg = require('./package.json');

const config = Object.assign(webpackConfigBase, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.join(__dirname, './app/index.js'),
    // 将第三方依赖（node_modules）的库打包
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // publicPath: 'https://cdn.self.com'
    publicPath: path.join(__dirname, 'dist/'),
    filename: 'js/[name].[chunkhash:8].js'
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
      filename: 'css/[name].[chunkhash:8].css',
      allChunks: true
    }),
    // 提供公共代码vendor
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[chunkhash:8].js'
    }),
    // 指定tpl
    new HtmlWebpackPlugin({
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
    // 加署名
    new webpack.BannerPlugin("Copyright by 子咻 https://github.com/CodeLittlePrince/blog"),
  ]
})

module.exports = config