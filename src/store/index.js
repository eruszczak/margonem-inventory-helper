import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import eq from './modules/eq'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState(
      {
        paths: ['eq.eqItems', 'eq.canAddToEq', 'eq.itemHistory', 'eq.eqHistory']
      }
    )
  ],
  state: {
    pageTitle: ''
  },
  getters: {
    pageTitle: state => state.pageTitle
  },
  mutations: {
    setPageTitle: (state, value) => {
      state.pageTitle = value
    }
  },
  actions: {
  },
  modules: {
    eq
  }
})
