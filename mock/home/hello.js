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
module.exports = function (params, key) {
  const page = params.page
  let rst = {}
  let switchDatas = {}
  // 当传来的参数page为7和不为7时，返回不同的数据（因为很多页面不需要分页和成功失败，所以会精简很多）
  if (page === '7') {
    // 通过mockSwitch切换数据状态
    switchDatas = {
      'success': {
        msg: 'mock hello api for success, and page is 7',
        data: data,
        imgUrl: img,
        code: 0
      },
      'error': {
        msg: 'mock hello api for error, and page is 7',
        code: 1
      }
    }
  } else {
    switchDatas = {
      'success': {
        msg: 'mock hello api for success, and page is not 7',
        data: data,
        imgUrl: img,
        code: 0
      },
      'error': {
        msg: 'mock hello api for error, and page is not 7',
        code: 1
      }
    }
  }
  // 如果没有key，则默认数据为success
  if (key && switchDatas[key]) {
    rst = switchDatas[key]
  } else {
    rst = switchDatas['success']
  }
  
  // 我们可以通过获取params里的值，根据需要来控制返回怎样的数据
  return rst
}