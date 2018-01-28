import {setStats} from '../../utils/eq'

export default {
  state: {
    canAddToEq: true,
    compareItems: [],
    comparision: {}
  },
  getters: {
    canAddToEq: state => state.canAddToEq,
    compareItems: state => state.compareItems,
    comparision: state => state.comparision
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
    addTypeComparision: (state, type, pairs) => {
      state.comparision[type] = pairs
    },
    addItemComparision: (state, payload) => {
      state.comparision[payload.type] = payload.itemComparision
    },
    updateItemComparision: (state, payload) => {
      state.comparision[payload.item.type][payload.item.pk] = payload.itemComparision
    },
    clearComparision: state => {
      state.comparision = {}
    },
    clearTypeFromComparision: (state, type) => {
      state.comparision[type] = []
    }
  },
  actions: {
    /**
     * Adds item to comparedItems and compares it with other items
     */
    compareItem ({ commit, state, dispatch }, payload) {
      for (let item of state.compareItems) {
        if (payload.item.pk === item.pk) {
          payload.callback && payload.callback('Już porównywany')
          return
        }
      }
      dispatch('createPairForItem', payload.item)
      commit('addCompareItem', payload.item)
      payload.callback && payload.callback('Porównuję')
    },
    /**
     * Compares an item with other items of the same type
     */
    createPairForItem ({ commit, state }, item) {
      let itemComparision = {}
      itemComparision[item.pk] = {
        item: item,
        itemStats: setStats({
          unknownPlacement: item
        }),
        comparisons: []
      }
      const otherItemsOfTheSameType = state.compareItems.filter(
        comparedItem => comparedItem.type === item.type && comparedItem.pk !== item.pk
      )
      for (let comparedItem of otherItemsOfTheSameType) {
        itemComparision[item.pk].comparisons.push({
          'item': comparedItem,
          'itemStats': setStats({
            unknownPlacement: comparedItem
          })
        })
      }
      commit('addItemComparision', {itemComparision, type: item.type})

      // if (item.type in state.comparision) {
        // commit('updateItemComparision', {itemComparision, item})
      // } else {
        // commit('addItemComparision', {itemComparision, type: item.type})
      // }
    },
    /**
     * Creates pairs for all compared items.
     */
    initPairs ({ state, dispatch }) {
      for (let item of state.compareItems) {
        dispatch('createPairForItem', item)
      }
    },
    uncompareItem ({ commit, state }, payload) {
      commit('removeCompareItem', payload.item)
      payload.callback('Usunięto z porównania')
    },
    removeAllItems ({ commit }) {
      commit('clearCompareItems')
      commit('clearCompareParis')
    }
  }
}
