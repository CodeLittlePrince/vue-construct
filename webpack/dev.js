const opn = require('opn')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const portfinder = require('portfinder')
const webpackDev = require('./webpack.config.dev')
const proxyConfig = require('./proxy.config.js')
const webpackConfigBase = require('./webpack.config.base.js')

async function serve() {
  // 协议
  const protocol = 'http'
  // 获取地址
  const domain = '0.0.0.0'
  // 动态获取端口，默认8080
  portfinder.basePort = 8080
  const port = await portfinder.getPortPromise()
  const publicUrl = `${protocol}://${domain}:${port}`

  // inject dev & hot-reload middleware entries
  const sockjsUrl = `?${publicUrl}/sockjs-node`
  // inject dev/hot client
  webpackDev.entry.app.push(
    // dev server client
    require.resolve('webpack-dev-server/client') + sockjsUrl,
    // hmr client
    require.resolve('webpack/hot/dev-server')
  )
  // 配置devServer
  const compiler = webpack(webpackDev)
  const server = new WebpackDevServer(
    compiler,
    {
      clientLogLevel: 'none',
      quiet: true,
      proxy: {
        // 凡是 `/api` 开头的 http 请求，都会被代理到 target 上，由 koa 提供 mock 数据。
        // koa 代码在 ./mock 目录中，启动命令为 npm run mock。
        '/': {
          target: `${proxyConfig.domain}:${proxyConfig.port}`, // 如果说联调了，将地址换成后端环境的地址就哦了
          secure: false,
          changeOrigin: true
        }
      },
      disableHostCheck: true, // 为了手机可以访问
      contentBase: webpackConfigBase.resolve('dev'), // 本地服务器所加载的页面所在的目录
      watchContentBase: true,
      // historyApiFallback: true, // 为了SPA应用服务
      inline: true, // 实时刷新
      hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
  )
  
  // 关闭监听保证进程关闭
  ;['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0)
      })
    })
  })
  
  // 编译完成后提示文案
  compiler.hooks.done.tap('Webpack devServer serve', stats => {
    if (stats.hasErrors()) {
      return
    }
    console.log()
    console.log('  App running at:')
    console.log(`  - Local:   ${chalk.cyan('http://localhost' + ':' + port)}`)
    console.log(`  - Network: ${chalk.cyan('http://' + proxyConfig.ip + ':' + port)}`)
    console.log(`  - Mock:    ${chalk.cyan('http://' + proxyConfig.ip + ':' + proxyConfig.port)}`)
    console.log()
    console.log('  Note that the development build is not optimized.')
    console.log(`  To create a production build, and take a view of files' size, run ${chalk.cyan('npm run analyze')}.`)
    console.log()
  })
  
  server.listen(port, domain, err => {
    err && console.log(err)
    // 新窗口打开
    opn(`http://${proxyConfig.ip}:${port}`)
  })
}

// 启动
serve()