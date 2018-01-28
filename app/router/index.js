import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/home')

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})