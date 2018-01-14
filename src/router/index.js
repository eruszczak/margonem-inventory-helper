import Vue from 'vue'
import Router from 'vue-router'
import Items from '@/components/Items'
import ItemView from '@/components/ItemView'
import EqView from '@/components/EqView'

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
      name: 'eqView',
      path: '/zestawy/',
      component: EqView
    },
    {
      path: '/:type?',
      name: 'items',
      component: Items,
      props: true
    },
    {
      name: 'itemView',
      path: '/przedmiot/:slug',
      component: ItemView,
      props: true
    }
  ]
})
