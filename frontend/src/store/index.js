import Vue from 'vue'
import Vuex from 'vuex'
import eq from './modules/eq'
import compare from './modules/compare'
import search from './modules/search'
import modal from './modules/modal'
import createPersistedState from 'vuex-persistedstate'

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
    ITEM_STATS_IN_ORDER: [
      'dmg', 'pdmg', 'abdest', 'fire', 'light',
      'wound', 'wound_chance',
      'frost', 'frost_slowed',
      'poison', 'poison_slowed',
      'crit', 'pierce', 'critval', 'critmval', 'contra',
      'ac', 'absorb', 'absorbm', 'ds', 'di', 'dz', 'da', 'sa',
      'evade', 'blok', 'hp', 'hpbon', 'manabon', 'energybon', 'resacdmg', 'pierceb',
      'resmanaendest', 'resmanaendest_ene', 'lowheal2turns', 'lowevade', 'lowcritallval', 'npc_expbon',
      'manadest', 'endest', 'acdmg', 'adest',
      'heal', 'slow', 'resdmg', 'lowcrit',
      'resfire', 'resfrost', 'act', 'reslight',
      'perheal', 'leczy', 'fullheal', 'afterheal', 'afterheal_chance',
      'gold', 'bag', '@IGNORE@amount', 'ammo', '@IGNORE@capacity',
      'ttl', 'resp', 'timelimit', 'respred', 'creditsbon', 'runes', '@IGNORE@worth'
    ]
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
    }
  },
  modules: {
    eq, compare, search, modal
  }
})
