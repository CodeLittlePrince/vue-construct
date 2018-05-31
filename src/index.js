import 'babel-polyfill' // https://babeljs.io/docs/plugins/preset-env/#usebuiltins
import 'common/scss/index'
import Vue from 'vue'
import router from './router'
import App from './app'
import 'filters'
import 'directives'
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  render: createElement => createElement(App)
})