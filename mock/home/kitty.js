// 引入mockjs来模拟数据
// https://github.com/nuysoft/Mock/wiki/Getting-Started
const Mock = require('mockjs')
const data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
})
const img = Mock.Random.image('200x100')

// 返回的结果处理
module.exports = function() {
  return {
    msg: 'mock kitty api',
    data: data,
    imgUrl: img,
    code: 0
  }
}