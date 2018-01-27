import {setStats} from '../../utils/eq'

export default {
  state: {
    canAddToEq: true,
    compareItems: [],
    comparePairs: []
  },
  getters: {
    canAddToEq: state => state.canAddToEq,
    compareItems: state => state.compareItems,
    comparePairs: state => state.comparePairs
  },
  mutations: {
    toggleCanAddToEq: state => {
      state.canAddToEq = !state.canAddToEq
    },
    addCompareItem: (state, item) => {
      state.compareItems.push(item)
    },
    removeCompareItem: (state, item) => {
      state.compareItems = state.compareItems.filter(el => el.pk !== item.pk)
    },
    clearCompareItems: state => {
      state.compareItems = []
    },
    addPair: (state, pair) => {
      state.comparePairs.unshift(pair)
    },
    clearCompareParis: state => {
      state.comparePairs = []
    }
  },
  actions: {
    compareItem ({ commit, state }, payload) {
      for (let item of state.compareItems) {
        if (payload.item.pk === item.pk) {
          payload.callback('Już porównywany')
          return
        }
      }
      // get eqItems for payload.item
      let pair = {
        item: payload.item,
        itemStats: setStats({
          primary: payload.item
        }),
        comparisions: []
      }
      
      for (let item of state.compareItems) {
        if (item.type === payload.item.type) {
          // get eqItems for item
          pair.comparisions.push({
            'item': item,
            'itemStats': setStats({
              primary: item
            })
          })
        }
      }
      commit('addPair', pair)
      commit('addCompareItem', payload.item)
      payload.callback('Porównuję')
    },
    uncompareItem ({ commit, state }, payload) {
      commit('removeCompareItem', payload.item)
      payload.callback('Usunięto z porównania')
    },
    removeAllItems ({ commit, state }) {
      commit('clearCompareItems')
      commit('clearCompareParis')
    }
  }
}
