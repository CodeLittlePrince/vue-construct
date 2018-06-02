const proxyConfig = require('../webpack/proxy.config')
const Koa = require('koa')
// 使用router
const Router = require('koa-router')
const Boom = require('boom')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
// https://github.com/alexmingoia/koa-router
app.use(router.routes())
app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))
// 使用bodyparser 解析get,post的参数
app.use(bodyParser())

// 模拟数据返回

/* 首页 */

// 获取hello数据
const helloData = require('./home/hello.js')
router.get('/api/home/hello', async(ctx, next) => {
  ctx.body = helloData
  await next()
})

// log error
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})

// 注意：这里的端口要和webpack里devServer的端口对应
console.log('Project proxy is running at', '\x1b[34m', `${proxyConfig.domain}:${proxyConfig.port}`)
app.listen(proxyConfig.port)