// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import { store } from './store/index'
import VueClipboard from 'vue-clipboard2'

import { Table, TableColumn, TableHeader, TableRow } from './components/ui/table'
import { Message } from './components/ui/message'
import { Loading } from './components/ui/loading'
import { Toggle } from './components/ui/toggle'
import { Modal } from './components/ui/modal'

Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(Buefy)

Vue.component('tbl', Table)
Vue.component('tbl-col', TableColumn)
Vue.component('tbl-header', TableHeader)
Vue.component('tbl-row', TableRow)
Vue.component('msg', Message)
Vue.component('loading', Loading)
Vue.component('toggle', Toggle)
Vue.component('modal', Modal)

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0)
  next()
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
