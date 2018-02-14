import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/scss/all.scss'
import { store } from './store/index'

import VueClipboard from 'vue-clipboard2'
import infiniteScroll from 'vue-infinite-scroll'
import VueProgressBar from 'vue-progressbar'

import { Table, TableColumn, TableHeader, TableRow } from './components/ui/table'
import { Tag, Taglist } from './components/ui/tag'
import Message from './components/ui/message'
import Toggle from './components/ui/toggle'
import Modal from './components/ui/modal'
import Input from './components/ui/input'
import Toast from './components/ui/toast'
import Spinner from './components/includes/Spinner'
import {setPageTitle} from "./utils/helpers";

Vue.use(VueProgressBar, {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})
Vue.use(VueClipboard)
Vue.use(infiniteScroll)

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$setPageTitle = setPageTitle
Vue.component('tbl', Table)
Vue.component('tbl-col', TableColumn)
Vue.component('tbl-header', TableHeader)
Vue.component('tbl-row', TableRow)
Vue.component('msg', Message)
Vue.component('toggle', Toggle)
Vue.component('modal', Modal)
Vue.component('my-input', Input)
Vue.component('my-tag', Tag)
Vue.component('my-taglist', Taglist)
Vue.component('my-spinner', Spinner)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
