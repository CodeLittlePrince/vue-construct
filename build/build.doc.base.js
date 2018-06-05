const fs = require('fs')
const path = require('path')
const marked = require('marked')
const Koa = require('koa')
// 使用router
const Router = require('koa-router')
const Boom = require('boom')
const app = new Koa()
const router = new Router()
const opn = require('opn')

module.exports = function (cname, port) {
  let firstComponentName = ''
  let count = 0
  // 拷贝所有组件名，以及对应的md路径放入一个map中，方便调用
  const menu = []
  const componentsMap = {}
  const componentsPath = path.join(__dirname, `../src/${cname}/`)
  const list = fs.readdirSync(componentsPath)
  list.forEach(file => {
    const stat = fs.statSync(componentsPath + file)
    if (stat.isDirectory()) {    
      componentsMap[file] = componentsPath + file + '/' + 'README.md'
      menu.push(file)
      if (count === 0) {
        count++
        firstComponentName = file
      }
    }
  })

  // koa
  app.use(router.routes())
  app.use(router.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed()
  }))

  router.get('/:component', (ctx, next) => {
    const componentName = ctx.params.component
    ctx.type = 'html'
    let html = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8')
    if (componentsMap[componentName]) {
      const mdContent = marked(fs.readFileSync(componentsMap[componentName], 'utf8'))
      html = html.replace(/{{ content }}/g, mdContent)
    } else {
      html = html.replace(/{{ content }}/g, '没有找到该组件目录或文档')
    }
    const lists = []
    menu.forEach(item => {
      if (componentName === item) {
        lists.push(`<li role='presentation' class='active' onclick='location.href = "/${item}"'><a>${item}</a></li>`)
      } else {
        lists.push(`<li role='presentation' onclick='location.href = "/${item}"'><a>${item}</a></li>`)
      }
    })
    if (lists.length) {
      html = html.replace(/{{ menu }}/g, lists.join('\n'))
    } else {
      html = html.replace(/{{ menu }}/g, '无组件')
    }
    ctx.body = html
    next()
  })

  // log error
  app.on('error', (err, ctx) => {
    console.log('server error', err, ctx)
  })

  // 注意：这里的端口要和webpack里devServer的端口对应
  const server = app.listen(port)
  console.log('Project proxy is running at', `\x1b[34m\x1b[1mhttp://localhost:${server.address().port}`)
  opn(`http://localhost:${server.address().port}/${firstComponentName}`) 
}