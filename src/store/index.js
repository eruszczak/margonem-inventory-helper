import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    safelyStoredNumber: 0
  },
  getters: {
    safelyStoredNumber: state => state.safelyStoredNumber,
    storedNumberMatches (state) {
      return matchNumber => {
        return state.safelyStoredNumber === matchNumber
      }
    }
    // Shorthand:
    // storedNumberMatches: state => matchNumber => state.safelyStoredNumbers === matchNumber
  }
})
