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
    // initialiseStore (state) {
    //   if (localStorage.getItem('vuex')) {
    //     console.error('Initalise store')
    //     const localState = JSON.parse(localStorage.getItem('vuex')).eq
    //     for (let key in localState) {
    //       state[key] = localState[key]
    //     }
    //     // this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('vuex'))))
    //   }
    // }
  },
  actions: {
  },
  modules: {
    eq
  }
})
