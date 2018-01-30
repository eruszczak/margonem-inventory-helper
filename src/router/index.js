import Vue from 'vue'
import Router from 'vue-router'
import ItemListView from '@/components/ItemListView'
import ItemView from '@/components/ItemView'
import EqView from '@/components/EqView'
import EqCompareView from '@/components/EqCompareView'
import ItemCompareView from '@/components/ItemCompareView'

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
      name: 'eqCompareView',
      path: '/porownaj/',
      component: EqCompareView
    },
    {
      name: 'itemCompareView',
      path: '/porownaj-przedmioty/',
      component: ItemCompareView
    },
    {
      path: '/:type?',
      name: 'items',
      component: ItemListView,
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
