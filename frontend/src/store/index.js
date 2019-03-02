import Vue from 'vue'
import Vuex from 'vuex'
import eq from './modules/eq'
import compare from './modules/compare'
import search from './modules/search'
import modal from './modules/modal'
import createPersistedState from 'vuex-persistedstate'
import { fetchHelpers } from '../api/items'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState(
      {
        paths: [
          'eq.eqItemsSlugs',
          'compare.compareItems', 'compare.canAddToEq',
          'search.searchQuery'
        ]
      }
    )
  ],
  state: {
    isLoading: false,
    navbarMenuIsActive: false,
    isAPIError: false,
    ITEM_STATS_IN_ORDER: []
  },
  getters: {
    isLoading: state => state.isLoading,
    navbarMenuIsActive: state => state.navbarMenuIsActive,
    isAPIError: state => state.isAPIError,
    ITEM_STATS_IN_ORDER: state => state.ITEM_STATS_IN_ORDER
  },
  mutations: {
    toggleLoading: (state, isLoading) => {
      state.isLoading = isLoading
    },
    hideMenu: state => {
      state.navbarMenuIsActive = false
    },
    toggleNavbarMenuIsActive: state => {
      state.navbarMenuIsActive = !state.navbarMenuIsActive
    },
    setAPIError: (state, value = true) => {
      state.isAPIError = value
    },
    SET_ITEM_STATS_IN_ORDER: (state, value) => {
      state.ITEM_STATS_IN_ORDER = value
    }
  },
  actions: {
    FETCH_HELPERS ({commit}) {
      fetchHelpers(response => {
        commit('SET_ITEM_STATS_IN_ORDER', response.data.ITEM_STATS_IN_ORDER)
      }, () => {
        commit('setAPIError')
      })
    }
  },
  modules: {
    eq, compare, search, modal
  }
})
