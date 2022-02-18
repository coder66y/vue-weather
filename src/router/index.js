import Vue from 'vue'
import VueRouter from 'vue-router'
// import About from '@/views/About'
const About = () => import(/* webpackChunkName: "about" */ '@/views/About')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home')
// import Home from '@/views/Home'
Vue.use(VueRouter)

const routes = [
  {path: '/about', name: 'About', component: About},
  {path: '/home', name: 'Home', component: Home},
  {path: '/', redirect: '/home'}
]

const router = new VueRouter({
  routes
})
export default router