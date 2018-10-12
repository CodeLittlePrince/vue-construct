import Vue from 'vue'
import VueRouter from 'vue-router'
// https://stackoverflow.com/questions/42603909/accessing-vuex-state-when-defining-vue-router-routes

Vue.use(VueRouter)

const Home = () => import('../views/home')
const PageA = () => import('../views/pageA')
const PageB = () => import('../views/pageB')

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/pageA',
      component: PageA
    },
    {
      path: '/pageB',
      component: PageB
    },
  ]
})