const webpack = require('webpack')
const devServer = require('webpack-dev-server')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 网站图标配置
const favicon = path.join(__dirname, 'favicon.ico')

// __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
// __filename: 总是返回被执行的 js 的绝对路径
// process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: path.join(__dirname, 'app/index.js')
  },
  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'index.bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css'],
    alias: {
      api: path.join(__dirname, 'app/api/'),
      common: path.join(__dirname, 'app/common/'),
      views: path.join(__dirname, 'app/views/'),
      components: path.join(__dirname, 'app/components/'),
      componentsBase: path.join(__dirname, 'app/componentsBase/'),
      directives: path.join(__dirname, 'app/directives/'),
      filters: path.join(__dirname, 'app/filters/'),
      mixins: path.join(__dirname, 'app/mixins/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
        // https://babeljs.io/docs/plugins/transform-runtime/
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          loaders: {
            scss: [
              {
                loader: 'vue-style-loader'
              },
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
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
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
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/font/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
      favicon,
      filename: 'index.html',
      template: path.join(__dirname, '/app/index.html')
    }),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 更友好地输出错误信息
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    // proxy: {
    //     // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:7777 上，由 koa 提供 mock 数据。
    //     // koa 代码在 ./mock 目录中，启动命令为 npm run mock
    //     '/api': {
    //         target: 'http://localhost:7777',
    //         secure: false
    //     }
    // },
    host: '0.0.0.0',
    port: '9999',
    disableHostCheck: true, // 为了手机可以访问
    contentBase: path.join(__dirname, 'dev'), // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 为了SPA应用服务
    inline: true, //实时刷新
    hot: true  // 使用热加载插件 HotModuleReplacementPlugin
  }
}

module.exports = config