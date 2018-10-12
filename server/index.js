const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfigBase = require('../webpack/webpack.config.base.js')
const config = require('../webpack/webpack.config.dev.js')
const util = require('./util.js')
const ip = util.getIP(0) || 'localhost'
const mockServer = require('./mockServer')

mockServer.serve().then(mockServerPort => {
  util.getAvailablePort([8080, 8081, 8082]).then(availablePort => {
    const proxyURL = `http://${ip}:${mockServerPort}`
    const options = {
      proxy: {
        // 凡是 `/api` 开头的 http 请求，都会被代理到 target 上，由 koa 提供 mock 数据。
        // koa 代码在 ./mock 目录中，启动命令为 npm run mock。
        '/': {
          target: proxyURL, // 如果说联调了，将地址换成后端环境的地址就哦了
          secure: false,
          changeOrigin: true
        }
      },
      quiet: true,
      open: true,
      openPage: '',
      host: ip,
      disableHostCheck: true, // 为了手机可以访问
      contentBase: webpackConfigBase.resolve('dev'), // 本地服务器所加载的页面所在的目录
      historyApiFallback: {
        index: '/'
      }, // 为了SPA应用服务
      inline: true, //实时刷新
      hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
    webpackDevServer.addDevServerEntrypoints(config, options)
    const compiler = webpack(config)
    const server = new webpackDevServer(compiler, options)
    server.listen(availablePort, ip, () => {
      console.log('project is running at', `http://${ip}:${availablePort}`)
    })
  })
})
