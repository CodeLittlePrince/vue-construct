/**
 * 测试common/utils/dom.js
 */
import * as dom from 'common/js/utils/dom.js'

// const expect = require('chai').expect 装过sinon-chai就不需要这句了;sinon同理

describe('utils/dom', () => {
  // 测试hasClass
  it('hasClass', () => {
    const ele = document.createElement('div')
    ele.className = 'base kitty'
    // 是否含有base
    expect(dom.hasClass(ele, 'base')).to.be.equal(true)
    // 是否含有kitty
    expect(dom.hasClass(ele, 'kitty')).to.be.equal(true)
    // 是否含有tom
    expect(dom.hasClass(ele, 'tom')).to.be.equal(false)
    // 空格情况
    // https://github.com/chaijs/chai/issues/864
    expect(() => dom.hasClass(ele, 'x y')).to.throw()
    // 无参数
    expect(dom.hasClass()).to.be.equal(false)
  })
  // 测试addClass
  it('addClass', () => {
    const ele = document.createElement('div')
    ele.className = 'base'
    // 增加类名kitty
    dom.addClass(ele, 'kitty')
    expect(ele.className).to.be.equal('base kitty')
    // 再增加类名kitty，希望并不会有重复类名
    dom.addClass(ele, 'kitty')
    expect(ele.className).to.be.equal('base kitty')
    // dom元素传空
    dom.addClass(null, 'kitty')
    expect(ele.className).to.be.equal('base kitty')
    // class传空
    dom.addClass(ele, null)
    expect(ele.className).to.be.equal('base kitty')
    // 加空两格的类名
    dom.addClass(ele, 'kitty  kitty')
    expect(ele.className).to.be.equal('base kitty')
  })
  // 测试removeClass
  it('removeClass', () => {
    const ele = document.createElement('div')
    ele.className = 'base kitty'
    // 删除类名kitty
    dom.removeClass(ele, 'kitty')
    expect(ele.className).to.be.equal('base')
    // 删除不存在的类名
    dom.removeClass(ele, 'tom')
    expect(ele.className).to.be.equal('base')
    // 删除空的dom元素
    dom.removeClass(null, '')
    expect(ele.className).to.be.equal('base')
    // 删除空的类名
    dom.removeClass(ele, '')
    expect(ele.className).to.be.equal('base')
    // 删除空两格的类名
    dom.removeClass(ele, 'kitty  kitty')
    expect(ele.className).to.be.equal('base')
  })
  // 测试noce
  it('once', () => {
    const ele = document.createElement('div')
    const callback = sinon.spy()
    dom.once(ele, 'click', callback)
    // 点击一次
    ele.click()
    expect(callback).to.have.been.calledOnce
    // 再点击一次，预期应该是不调用callback的，所以依然为calledOnce
    ele.click()
    expect(callback).to.have.been.calledOnce
  })
})