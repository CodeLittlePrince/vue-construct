module.exports = [
  // 主页-hello 用到了运行时控制success和error
  {
    url: '/home/hello',
    status: 'success',
    selections: [
      {
        name: '成功',
        value: 'success'
      },
      {
        name: '失败',
        value: 'error'
      }
    ]
  }
]