Vue前端架构
---
想想也做过不少不同架构的项目，有Vue，有React，有ThinkPHP，有Laravel。
这是本王总结了很多项目下来的经验做的前端项目架构。

主要工具介绍
---
工具名                   | 作用
----------------------- | ------
vue v2.5                | data binding
vue-router v3           | vue路由
webpack v3              | 本地发开、打包发布（webpack v4虽然已经发布，不过还是beta版，技术选型要稳）
webpack-dev-server v2   | 本地启服务
webpack-bundle-analyzer | 打包后文件分析
koa v2                  | 本地模拟数据接口
axios                   | 处理get/post
mockjs                  | 制造模拟数据
nodemon                 | 修改node代码不需要重启监听，一直运行就好

功能介绍
---
### 开发
1. koa模拟数据接口，从而使前后端分离。
2. sourcemap，很好定位。
3. eslint，高大上的代码规则。
4. 热更新。
5. nodemon让改node代码变得更加顺滑。
6. 使用mockjs模拟接口返回数据。
7. scss支持识别2倍3倍图加载（除了接口获取的图，所有图都用背景图方案）
8. git hooks，防止不符合规范的提交

### 测试
1. 单元测试
2. e2e测试

### 发布
1. 将第三方js库打包成vendor.js，从而使项目业务代码修改也不会影响基本稳定的三方js代码，充分利用浏览器缓存。
2. 将css代码分为两份，一份为基础代码，即上线后几乎不变，另一份为迭代代码，从而充分利用浏览器缓存。
3. 发布以后的所有文件会加md5后缀，从而充分利用浏览器缓存。
4. tree shaking。
5. dynamic import，代码不会打包到一个js文件里，而会分成n个按需加载js。

使用方法
---
### 开发
#### 1.模拟数据
`npm run mock`

#### 2.页面开发
`npm run watch`

#### 3.一起启动
`npm run dev`
启动以后，可以在运行时，管理已配置的接口根据我们想要的状态，对统一地址、统一参数的接口返回不同数据。
管理接口地址：`{host:port}/mock-switch/`

#### 4.文档本地预览
components: `npm run build:components`

componentsBase: `npm run build:componentsBase`

### 测试
#### 1.单元测试
`npm run test:unit`

#### 2.e2e测试
`npm run dev`
`npm run test:e2e`

### 代码大小分析
`npm run analyze`

### 发布
`npm run prod`

![Vue前端架构](https://github.com/CodeLittlePrince/ImagesForGithub/blob/master/vue-construct-1.png?raw=true)
