import Vue from 'vue'
import Vuex from 'vuex'
import eq from './modules/eq'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState(
      {
        paths: [
          'eq.eqItems', 'eq.canAddToEq', 'eq.itemHistory', 'eq.eqHistory', 'eq.stack', 'eq.replacementsCounter',
          'eq.compareItems'
        ]
      }
    )
  ],
  state: {
    pageTitle: '',
    isLoading: false
  },
  getters: {
    pageTitle: state => state.pageTitle,
    isLoading: state => state.isLoading
  },
  mutations: {
    setPageTitle: (state, value) => {
      state.pageTitle = value
    },
    toggleLoading: (state, isLoading) => {
      state.isLoading = isLoading
    }
  },
  modules: {
    eq
  }
})
