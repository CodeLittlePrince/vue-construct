const Nightmare = require('nightmare')
const chai = require('chai')
const expect = chai.expect
const nightmare = Nightmare({
  show: true 
})

describe('pages', () => {
  it('page ', function(done) {
    // 设定整个模拟的时长，超过则GG
    this.timeout('30s')
    nightmare
      .viewport(1200, 600)
      .goto('http://0.0.0.0:9999')
      .wait('h1')
      .click('a[href="#/pageA"]')
      .wait(() => {
        return location.hash === '#/pageA'
      })
      .click('a[href="#/pageB"]')
      .wait(() => {
        return location.hash === '#/pageB'
      })
      .evaluate(() => location.hash)
      .end()
      .then(hash => {
        expect(hash).to.equal('#/pageB')
        done()
      })
  })
})