import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    items: []
  },
  getters: {
    items: state => state.items,
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
    }
  },
  actions: {
    // async fetchItems(context) {
    //   // Commits the 'setStoredNumber' mutation with the value of whatever myRemoteService.getRemoteValue() resolves through a promise.
    //   context.commit('setStoredNumber', await myRemoteService.getRemoteValue());
    //   return Promise.resolve();
    // },
    fetchItems: function ({ commit }) {
      axios.get('/api/item/').then((response) => {
        commit('setItems', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },

})
