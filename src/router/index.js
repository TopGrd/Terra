import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('component/Home')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
  ],
  mode: 'history',
})

console.log(router)

export default router
