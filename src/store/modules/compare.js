import {setStats} from '../../utils/eq'
import { getDefaultEqItems, ITEM_PLACE } from '../../utils/items'
import { isItemWearable } from '../../utils/helpers'

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
    removeItemFromComparison: (state, item) => {
      const itemPlacement = ITEM_PLACE[item.type]
      console.log(state.comparisons, itemPlacement)
      console.log('before', state.comparisons[itemPlacement].length)
      state.comparisons[itemPlacement] = state.comparisons[itemPlacement].filter(el => {
      // Vue.set(state.comparisons, itemPlacement, state.comparisons[itemPlacement].filter(el => {
        console.log(el.item.pk, item.pk)
        return el.item.pk !== item.pk
      })
      console.log('after', state.comparisons[itemPlacement].length)
      // console.log('removing', item.pk)
      // console.log(state.comparisons[itemPlacement])
      // console.log(state.comparisons[itemPlacement].find(el => {
      //   console.log('checking', el.item.pk)
      //   return el.item.pk === item.pk
      // }))
      // console.log('before', state.comparisons[itemPlacement])
      // console.log('after', state.comparisons[itemPlacement].filter(el => {
      //   console.log(el.item.pk, item.pk)
      //   return el.item.pk !== item.pk
      // }))
      // remove `main` item and from other item's comparisons
    },
    clearCompareItems: state => {
      state.compareItems = []
    },
    addTypeComparisons: (state, type, pairs) => {
      state.comparisons[type] = pairs
    },
    addItemComparisons: (state, payload) => {
      state.comparisons[payload.itemPlacement] = [payload.itemComparisons]
      console.error(this.$set)
    },
    updateItemComparisons: (state, payload) => {
      state.comparisons[payload.itemPlacement].push(payload.itemComparisons)
      // Vue.set(state.comparisons[payload.itemPlacement], payload.item.pk, payload.itemComparisons)
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
      if (!isItemWearable(payload.item.type)) {
        payload.toast.info('Nie można porównać tego typu')
        return
      }
      for (let item of state.compareItems) {
        if (payload.item.pk === item.pk) {
          payload.toast.info('Już porównywany')
          return
        }
      }
      dispatch('createPairForItem', payload.item)
      commit('addCompareItem', payload.item)
      payload.toast.info('Porównuję')
    },
    /**
     * Compares an item with other items of the same type
     */
    createPairForItem ({ commit, state }, item) {
      const itemPlacement = ITEM_PLACE[item.type]
      let itemComparisons = {
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
        itemComparisons.comparisons.push({
          'item': comparedItem,
          'itemStats': setStats({
            [itemPlacement]: comparedItem
          })
        })
      }

      // console.log(itemComparisons, itemPlacement, item.name)
      // console.log('commit', item.type)
      // commit('addItemComparisons', {itemComparisons, placement: itemPlacement})

      if (state.comparisons[itemPlacement]) {
        // console.log('update')
        commit('updateItemComparisons', {itemComparisons: itemComparisons, itemPlacement, item})
      } else {
        // console.log('add')
        commit('addItemComparisons', {itemComparisons, itemPlacement})
      }
      // console.log(state.comparisons)
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
      commit('removeItemFromComparison', payload.item)
      payload.toast.info('Usunięto z porównania')
    },
    removeAllItems ({ commit }) {
      commit('clearCompareItems')
      commit('clearCompareParis')
    }
  }
}
