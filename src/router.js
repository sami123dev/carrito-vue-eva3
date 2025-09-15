import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Checkout from './views/Checkout.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/checkout', component: Checkout },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
