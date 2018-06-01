const path = require('path')

// 为了抽离出两份CSS，创建两份ExtractTextPlugin
// base作为基础的css，基本不变，所以，可以抽离出来充分利用浏览器缓存
// app作为迭代的css，会经常改变
const isProduction = process.env.NODE_ENV === 'production'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractBaseCSS =
  new ExtractTextPlugin(
    {
      filename:'static/css/base.[contenthash:8].css',
      allChunks: true,
      disable: !isProduction // 开发环境下不抽离css
    }
  )
const extractAppCSS =
  new ExtractTextPlugin(
    {
      filename:'static/css/app.[contenthash:8].css',
      allChunks: true,
      disable: !isProduction // 开发环境下不抽离css
    }
  )

// 减少路径书写
function resolve(dir) {
  return path.join(__dirname, dir)
}

// 网站图标配置
const favicon = resolve('favicon.ico')

// __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
// __filename: 总是返回被执行的 js 的绝对路径
// process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
const config = {
  resolve: {
    // 扩展名，比如import 'app.vue'，扩展后只需要写成import 'app'就可以了
    extensions: ['.js', '.vue', '.scss', '.css'],
    // 取路径别名，方便在业务代码中import
    alias: {
      api: resolve('src/api/'),
      common: resolve('src/common/'),
      views: resolve('src/views/'),
      components: resolve('src/components/'),
      componentsBase: resolve('src/componentsBase/'),
      directives: resolve('src/directives/'),
      filters: resolve('src/filters/'),
      mixins: resolve('src/mixins/')
    }
  },
  // loaders处理
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        loader: [
          'babel-loader',
          'eslint-loader'
        ]
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
        include: [resolve('src/common/scss')],
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
          name: isProduction
            ? 'static/img/[name].[hash:8].[ext]'
            : 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: isProduction
            ? 'static/font/[name].[hash:8].[ext]'
            : 'static/font/[name].[ext]'
        }
      }
    ]
  }
}

module.exports = {
  config,
  favicon,
  resolve,
  extractBaseCSS,
  extractAppCSS
}