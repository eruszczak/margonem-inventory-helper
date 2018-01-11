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
    // If a piece of state strictly belongs to a single component, it could be just fine leaving it as local state.
    items: [],
    pageTitle: ''
  },
  getters: {
    items: state => state.items,
    pageTitle: state => state.pageTitle
  },
  mutations: {
    setItems: (state, { list }) => {
      state.items = list
    },
    setPageTitle: (state, value) => {
      state.pageTitle = value
    },
    initialiseStore (state) {
      if (localStorage.getItem('vuex')) {
        console.error('Initalise store')
        const localState = JSON.parse(localStorage.getItem('vuex')).eq
        for (let key in localState) {
          state[key] = localState[key]
        }
        // this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('vuex'))))
      }
    }
  },
  actions: {
    // use ES2015 argument destructuring to simplify the code a bit
    fetchItems ({ commit }, payload) {
      axios.get(`/api/item/${payload.query}`).then((response) => {
        commit('setItems', { list: response.data.results })
      }, (err) => {
        console.log(err)
      })
    }
  },
  modules: {
    eq
  }
})
