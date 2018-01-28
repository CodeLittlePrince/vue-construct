function directiveSample(el, binding, vnode) {
  console.log('%cdirectives works', 'color: green')
}

export default {
  bind: directiveSample,
  update: directiveSample
}