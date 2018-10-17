const path = require('path')

// 为了抽离出两份CSS，创建两份ExtractTextPlugin
// base作为基础的css，基本不变，所以，可以抽离出来充分利用浏览器缓存
// app作为迭代的css，会经常改变
const isProduction = process.env.NODE_ENV === 'production'
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueLoaderPluginInstance = new VueLoaderPlugin()
const extractCSS =
  new MiniCssExtractPlugin(
    {
      filename: isProduction ? 'static/css/base.[name].[hash:8].css' : 'static/css/base.[name].css',
      chunkFilename: isProduction ? 'static/css/base.[id].[hash:8].css' : 'static/css/base.[id].css',
    }
  )
// const extractAppCSS
//   = new MiniCssExtractPlugin(
//     {
//       filename:'static/css/app.[md5:contenthash:hex:8].css',
//     }
//   )

// 减少路径书写
function resolve(dir) {
  return path.join(__dirname, '../' + dir)
}

// 网站图标配置
const favicon = resolve('favicon.ico')

// 指定以__base64为后缀的svg转为base64
const svgBase64Reg = /__base64\.(svg)(\?.*)?$/

// __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
// __filename: 总是返回被执行的 js 的绝对路径
// process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
const config = {
  resolve: {
    // 扩展名，比如import 'app.vue'，扩展后只需要写成import 'app'就可以了
    extensions: ['.js', '.vue', '.scss', '.css'],
    // 取路径别名，方便在业务代码中import
    alias: {
      src: resolve('src/'),
      common: resolve('src/common/'),
      utils: resolve('src/common/js/utils/'),
      views: resolve('src/views/'),
      components: resolve('src/components/'),
      componentsBase: resolve('src/componentsBase/'),
      directives: resolve('src/directives/'),
      filters: resolve('src/filters/'),
      mixins: resolve('src/mixins/'),
      plugins: resolve('src/plugins/')
    }
  },
  // loaders处理
  module: {
    rules: [
      {
        test: /\.(svg)(\?.*)?$/,
        include: svgBase64Reg,
        loader: 'url-loader',
        options: {
          limit: 99999,
          name: isProduction
            ? 'static/font/[name].[hash:8].[ext]'
            : 'static/font/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: svgBase64Reg,
        loader: 'file-loader',
        options: {
          name: isProduction
            ? 'static/img/[name].[hash:8].[ext]'
            : 'static/img/[path][name].[ext]'
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
      },
      // https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: !isProduction ? 'vue-style-loader' : MiniCssExtractPlugin.loader
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
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
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
        loader: 'vue-loader'
      }
    ]
  }
}

module.exports = {
  config,
  favicon,
  resolve,
  extractCSS,
  VueLoaderPluginInstance
}