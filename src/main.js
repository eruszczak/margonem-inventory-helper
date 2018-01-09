// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import { store } from './store/index.js'

Vue.config.productionTip = false
Vue.use(Buefy)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    this.$store.commit('initialiseStore')
  }
})
