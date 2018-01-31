const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackConfigBase = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const exec = require('child_process').execSync
const pkg = require('./package.json')
// 为了抽离出两份CSS，创建两份ExtractTextPlugin
// base作为基础的css，基本不变，所以，可以抽离出来充分利用浏览器缓存
// app作为迭代的css，会经常改变
const extractBaseCSS = new ExtractTextPlugin({filename:'static/css/base.[chunkhash:8].css', allChunks: true})
const extractAppCSS = new ExtractTextPlugin({filename:'static/css/app.[chunkhash:8].css', allChunks: true})

// 减少路径书写
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 网站图标配置
const favicon = resolve('favicon.ico')
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
    app: resolve('app/index.js'),
    // 将第三方依赖（node_modules）的库打包，从而充分利用浏览器缓存
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: resolve('dist'),
    // publicPath: 'https://cdn.self.com'
    publicPath: resolve('dist/'),
    filename: 'static/js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('app')],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          loaders: {
            scss: extractAppCSS.extract({
              fallback: 'vue-style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
            })
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: extractBaseCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/font/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    // Scope hosting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 删除build文件夹
    new CleanWebpackPlugin(
      resolve('dist')
    ),
    // 抽离出css
    extractBaseCSS,
    extractAppCSS,
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
      template: resolve('app/index.html'),
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