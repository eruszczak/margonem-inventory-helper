import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // If a piece of state strictly belongs to a single component, it could be just fine leaving it as local state.
    items: [],
    pageTitle: ''
  },
  getters: {
    items: state => state.items,
    pageTitle: state => state.pageTitle
    // storedNumberMatches (state) {
    //   return matchNumber => {
    //     return state.safelyStoredNumber === matchNumber
    //   }
    // }
    // Shorthand:
    // storedNumberMatches: state => matchNumber => state.safelyStoredNumbers === matchNumber
  },
  mutations: {
    setItems: (state, { list }) => {
      state.items = list
    },
    setPageTitle: (state, { text }) => {
      state.pageTitle = text
    }
  },
  actions: {
    // async fetchItems(context) {
    //   // Commits the 'setStoredNumber' mutation with the value of whatever myRemoteService.getRemoteValue() resolves through a promise.
    //   context.commit('setStoredNumber', await myRemoteService.getRemoteValue());
    //   return Promise.resolve();
    // },
    // use ES2015 argument destructuring to simplify the code a bit
    fetchItems ({ commit }, payload) {
      axios.get(`/api/item/${payload.query}`).then((response) => {
        console.log('fetchItems', payload, response.data)
        commit('setItems', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },

})
