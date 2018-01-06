import Vue from 'vue'
import Router from 'vue-router'
import Items from '@/components/Items'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'api',
      path: '/api/item/'
    },
    {
      path: '/',
      name: 'items',
      component: Items
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
