import Vue from 'vue'
import Router from 'vue-router'
import Items from '@/components/Items'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
  routes: [
    {
      name: 'api',
      path: '/api/item/'
    },
    {
      path: '/:type?',
      name: 'items',
      component: Items
    }
  ]
})
