// 引入mockjs来模拟数据
// https://github.com/nuysoft/Mock/wiki/Getting-Started
const Mock = require('mockjs')
const data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
})
const img = Mock.Random.image('200x100')

module.exports = {
  msg: 'mock hello api works!!',
  data: data,
  imgUrl: img
}