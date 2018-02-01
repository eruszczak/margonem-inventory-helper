import Vue from 'vue'
import App from './App'
import router from './router'
import 'bulma/css/bulma.css' // todo modules
import { store } from './store/index'
import VueClipboard from 'vue-clipboard2'

import { Table, TableColumn, TableHeader, TableRow } from './components/ui/table'
import { Tag, Taglist } from './components/ui/tag'
import Message from './components/ui/message'
import Loading from './components/ui/loading'
import Toggle from './components/ui/toggle'
import Modal from './components/ui/modal'
import Input from './components/ui/input'

Vue.use(VueClipboard)
Vue.config.productionTip = false

Vue.component('tbl', Table)
Vue.component('tbl-col', TableColumn)
Vue.component('tbl-header', TableHeader)
Vue.component('tbl-row', TableRow)
Vue.component('msg', Message)
Vue.component('loading', Loading)
Vue.component('toggle', Toggle)
Vue.component('modal', Modal)
Vue.component('my-input', Input)
Vue.component('my-tag', Tag)
Vue.component('my-taglist', Taglist)

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
