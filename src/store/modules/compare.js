import {setStats} from '../../utils/eq'
import { getDefaultEqItems, ITEM_PLACE } from '../../utils/items'

export default {
  state: {
    canAddToEq: true,
    compareItems: [],
    comparision: getDefaultEqItems()
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
      state.comparision[payload.itemPlacement] = payload.itemComparision
    },
    updateItemComparision: (state, payload) => {
      state.comparision[payload.itemPlacement][payload.item.pk] = payload.itemComparision
    },
    clearComparision: state => {
      state.comparision = {}
    },
    clearTypeFromComparision: (state, placement) => {
      state.comparision[placement] = []
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
      let itemComparision = {}
      itemComparision[item.pk] = {
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
        itemComparision[item.pk].comparisons.push({
          'item': comparedItem,
          'itemStats': setStats({
            [itemPlacement]: comparedItem
          })
        })
      }

      console.log(itemComparision, itemPlacement, item.name)
      // console.log('commit', item.type)
      // commit('addItemComparision', {itemComparision, placement: itemPlacement})

      if (state.comparision[itemPlacement]) {
        console.log('update')
        commit('updateItemComparision', {itemComparision: itemComparision[item.pk], itemPlacement, item})
      } else {
        console.log('add')
        commit('addItemComparision', {itemComparision, itemPlacement})
      }
      console.log(state.comparision)
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
