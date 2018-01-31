import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/home')
const PageA = () => import('../views/pageA')
const PageB = () => import('../views/pageB')

export default new VueRouter({
  mode: 'hash',
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