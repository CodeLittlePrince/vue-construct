// https://github.com/ElemeFE/element/blob/dev/src/utils/dom.js
// 略做修改
const isServer = typeof window === 'undefined'
/* istanbul ignore next */
const ieVersion = isServer ? 0 : Number(document.documentMode)
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

/* istanbul ignore next */
const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments)
    }
    el.removeEventListener(event, listener)
  }
  el.addEventListener(event, listener)
}

function hasClass(el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

function addClass(el, cls) {
  if (!el) return
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue
    el.classList.add(clsName)
  }
}

function removeClass(el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue
    el.classList.remove(clsName)
  }
}

/* istanbul ignore next */
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/* istanbul ignore next */
function getStyle(element, styleName) {
  return element.style[styleName]
    ? element.style[styleName]
    : window.getComputedStyle(element, null).getPropertyValue(styleName)
}

/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return
  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
}

// 不单独export function原因
// 1.易阅读
// 2.单元测试istanbul ignore next可忽略整个function
export {
  trim,
  hasClass,
  addClass,
  removeClass,
  getStyle,
  setStyle
}