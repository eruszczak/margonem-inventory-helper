import Vue from 'vue'
import Router from 'vue-router'
import Items from '@/components/Items'
import ItemView from '@/components/ItemView'

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
      // props
    },
    {
      name: 'itemView',
      path: '/przedmiot/:slug',
      component: ItemView,
      props: true
    }
  ]
})
