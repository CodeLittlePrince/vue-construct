const send = require('koa-send')
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

let $config = {} // 设置一个cache，让/mock-switch设置过的数据能够直接给页面
// 使用mockSwitch
app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/mock-switch/list')) {
    // '/mock-switch/list'是为了让接口管理页面'/mock-switch/'通过配置文件展现数据
    const mockSwitchMap = require('./mockSwitchMap')
    ctx.body = mockSwitchMap
  } else if (ctx.path.startsWith('/mock-switch/')) {
    // '/mock-switch/'是接口管理页面
    var fileName = ctx.path.substr('/mock-switch/'.length)
    await send(
      ctx,
      './mockSwitch/' + (fileName || 'index.html'),
      { root: __dirname + '/' }
    )
  } else if (ctx.path.startsWith('/mock-switch')) {
    // '/mock-switch'是接口管理页面切换接口时候post的地址
    const path = ctx.request.body.key
    const status = ctx.request.body.value
    const params = ctx.request.body
    const mockHandle = require(`${mockRoot}${ctx.request.body.key}.js`)
    $config[path] = mockHandle(params, status)
    ctx.body = $config[path]
  }
  await next()
})

// 模拟数据返回
const mockRoot = '../mock'
app.use(async (ctx, next) => {
  if (!ctx.path.startsWith('/mock-switch')) {
  // 计时
    const start = new Date()
    // 模拟
    let path = ctx.path
    let params = {}
    const method = ctx.method
    // console.log(ctx.query.id)         // get获取参数
    // console.log(ctx.request.body.id)  // post获取参数
    params = method.toLowerCase() === 'get' ?
      ctx.query :
      ctx.request.body
    // 调用对应的模拟数据

    const mockHandle = require(`${mockRoot}${path}.js`)
    // 返回数据
    // 如果mock-switch设置过，则从cache中（即$config）获取即可
    if ($config.hasOwnProperty(path)) {
      ctx.body = $config[path]
    } else {
      ctx.body = mockHandle(params)
    }
    await next()
    // 打印时间
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - \x1b[32m${ms}ms`)
  }
})

// log error
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})

// 注意：这里的端口要和webpack里devServer的端口对应
console.log('Project proxy is running at', `\x1b[34m\x1b[1m${proxyConfig.domain}:${proxyConfig.port}`)
app.listen(proxyConfig.port)