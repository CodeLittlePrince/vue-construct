/**
 * 测试common/utils/dom.js
 */
import * as dom from 'common/js/utils/dom.js'

// const expect = require('chai').expect

describe('utils/dom', () => {
  it('log', () => {
    dom.log('hi')
  })
  // // 测试addClass
  // it('addClass', () => {
  //   const ele = document.createElement('div')
  //   ele.className = 'base'
  //   // 增加类名kitty
  //   dom.addClass(ele, 'kitty')
  //   expect(ele.className).to.be.equal('base kitty')
  //   // 再增加类名kitty，希望并不会有重复类名
  //   dom.addClass(ele, 'kitty')
  //   expect(ele.className).to.be.equal('base kitty')
  // })
  // // 测试removeClass
  // it('removeClass', () => {
  //   const ele = document.createElement('div')
  //   ele.className = 'base kitty'
  //   // 删除类名kitty
  //   dom.removeClass(ele, 'kitty')
  //   expect(ele.className).to.be.equal('base')
  //   // 删除不存在的类名
  //   dom.removeClass(ele, 'tom')
  //   expect(ele.className).to.be.equal('base')
  // })
})