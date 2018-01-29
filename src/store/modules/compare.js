import {setStats} from '../../utils/eq'
import { getDefaultEqItems, ITEM_PLACE } from '../../utils/items'

export default {
  state: {
    canAddToEq: true,
    compareItems: [],
    comparisons: getDefaultEqItems()
  },
  getters: {
    canAddToEq: state => state.canAddToEq,
    compareItems: state => state.compareItems,
    comparisons: state => state.comparisons
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
    addTypeComparisons: (state, type, pairs) => {
      state.comparisons[type] = pairs
    },
    addItemComparisons: (state, payload) => {
      state.comparisons[payload.itemPlacement] = payload.itemComparisons
    },
    updateItemComparisons: (state, payload) => {
      // Vue.set needed?
      state.comparisons[payload.itemPlacement][payload.item.pk] = payload.itemComparisons
    },
    clearComparisons: state => {
      state.comparisons = getDefaultEqItems()
    },
    clearTypeFromComparisons: (state, placement) => {
      state.comparisons[placement] = {}
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
      const itemPlacement = ITEM_PLACE[item.type]
      let itemComparisons = {}
      itemComparisons[item.pk] = {
        item: item,
        itemStats: setStats({
          [itemPlacement]: item
        }),
        comparisons: []
      }
      const otherItemsOfTheSameType = state.compareItems.filter(
        comparedItem => comparedItem.type === item.type && comparedItem.pk !== item.pk
      )
      for (let comparedItem of otherItemsOfTheSameType) {
        itemComparisons[item.pk].comparisons.push({
          'item': comparedItem,
          'itemStats': setStats({
            [itemPlacement]: comparedItem
          })
        })
      }

      console.log(itemComparisons, itemPlacement, item.name)
      // console.log('commit', item.type)
      // commit('addItemComparisons', {itemComparisons, placement: itemPlacement})

      if (state.comparisons[itemPlacement]) {
        console.log('update')
        commit('updateItemComparisons', {itemComparisons: itemComparisons[item.pk], itemPlacement, item})
      } else {
        console.log('add')
        commit('addItemComparisons', {itemComparisons, itemPlacement})
      }
      console.log(state.comparisons)
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
