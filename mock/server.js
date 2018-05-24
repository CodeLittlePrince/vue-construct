// https://webpack.js.org/guides/hot-module-replacement/#via-the-node-js-api
const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('../webpack.config.dev.js')
const options = {
  contentBase: './dev',
  hot: true,
  host: '0.0.0.0',
  stats: {
    colors: true
  },
  disableHostCheck: true, // 为了手机可以访问
  // historyApiFallback: true, // 为了SPA应用服务
  open: true,
  // proxy: { // not work FUCK
  //   // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:7777 上，由 koa 提供 mock 数据。
  //   // koa 代码在 ./mock 目录中，启动命令为 npm run mock。
  //   '/api': {
  //     target: 'http://localhost:7777', // 如果说联调了，将地址换成后端环境的地址就哦了
  //     secure: false
  //   }
  // }
}
// 模拟数据返回
options.before = app => {
  if (!options.proxy) { // 如果设置了proxy，则不走before的获取接口逻辑
    /* === 首页 === */
    // 获取hello数据
    const helloData = require('./home/hello.js')
    app.get('/api/home/hello', function(req, res) {
      res.json(helloData)
    })
  }
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(8888, '0.0.0.0', () => {
  console.log('dev server listening on port 8888')
})