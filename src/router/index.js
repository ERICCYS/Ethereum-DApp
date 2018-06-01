import Vue from 'vue'
import Router from 'vue-router'
import Bank from '@/components/Bank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bank',
      component: Bank
    }
  ]
})
