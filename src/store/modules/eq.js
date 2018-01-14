import { getDefaultEqItems, ITEM_PLACE } from '../../utils/items'
import { setStats, getOrderedPksOfEqItems, eqItemsAreTheSame } from '../../utils/eq'
import { fetchMultipleItems } from '../../api/items'

export default {
  state: {
    eqItems: getDefaultEqItems(),
    readOnlyEqItems: getDefaultEqItems(),
    eqItemsStats: {},
    readOnlyEqItemsStats: {},
    eqLink: null,
    canAddToEq: false,
    stack: [],
    itemHistory: [],
    eqHistory: []
  },
  getters: {
    eqItems: state => state.eqItems,
    canAddToEq: state => state.canAddToEq,
    itemHistory: state => state.itemHistory,
    readOnlyEqItems: state => state.readOnlyEqItems,
    eqHistory: state => state.eqHistory,
    eqItemsStats: state => state.eqItemsStats,
    readOnlyEqItemsStats: state => state.readOnlyEqItemsStats
  },
  mutations: {
    toggleCanAddToEq: state => {
      state.canAddToEq = !state.canAddToEq
    },
    saveEqItemsAsMine: (state, eqItems) => {
      state.eqItems = Object.assign({}, eqItems)
    },
    // addItemToEq: function (state, clickedItem, isStackOperation = false, initial = false) {
    addItemToEq: function (state, clickedItem) {
      const itemPlacement = ITEM_PLACE[clickedItem.type]
      state.eqItems[itemPlacement] = clickedItem
    },
    removeItemFromEq: function (state, itemPlacement) {
      state.eqItems[itemPlacement] = null
    },
    addToItemHistory: (state, item) => {
      state.itemHistory = state.itemHistory.filter(el => item.pk !== el.pk)
      state.itemHistory.unshift(item)
      state.itemHistory = state.itemHistory.slice(0, 15)
    },
    /**
     * Adds readOnlyEqItems to history. If it was already in history, remove it and add again to the array beginning
     * @param state
     */
    addToEqHistory: state => {
      let pks = getOrderedPksOfEqItems(state.readOnlyEqItems)
      state.eqHistory = state.eqHistory.filter(el => {
        let elPks = getOrderedPksOfEqItems(el)
        return !eqItemsAreTheSame(pks, elPks)
      })
      state.eqHistory.unshift(state.readOnlyEqItems)
      state.eqHistory = state.eqHistory.slice(0, 5)
    },
    setReadOnlyEqItems: (state, items) => {
      state.readOnlyEqItems = getDefaultEqItems()
      for (const item of items) {
        const placement = ITEM_PLACE[item.type]
        state.readOnlyEqItems[placement] = item
      }
    },
    setEqItemsStats: state => {
      state.eqItemsStats = setStats(state.eqItems)
    },
    setReadOnlyEqItemsStats: state => {
      state.readOnlyEqItemsStats = setStats(state.readOnlyEqItems)
    }
  },
  actions: {
    fetchReadOnlyEqItems ({ commit }, payload) {
      fetchMultipleItems(payload.slugs, response => {
        commit('setReadOnlyEqItems', response.data.results)
        commit('setReadOnlyEqItemsStats')
        commit('addToEqHistory')
        payload.callback && payload.callback()
      }, error => {
        console.error(error)
      })
    },
    wearItem ({ commit }, item) {
      commit('addItemToEq', item)
      commit('setEqItemsStats')
    },
    takeOffItem ({ commit }, place) {
      commit('removeItemFromEq', place)
      commit('setEqItemsStats')
    }
  }
}
