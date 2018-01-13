import { DEFAULT_EQ_ITEMS, ITEM_PLACE, ITEM_BONUS } from '../../utils/items'
import { setStats } from '../../utils/eq'
import { fetchMultipleItems } from '../../api/items'

export default {
  state: {
    eqItems: DEFAULT_EQ_ITEMS,
    readOnlyEqItems: DEFAULT_EQ_ITEMS,
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
    eqHistory: state => state.eqHistory
  },
  mutations: {
    toggleCanAddToEq: (state) => {
      state.canAddToEq = !state.canAddToEq
    },
    setEqItem: (state, item, placement) => {
      state.eqItems[placement] = item
    },
    copyReadOnlyEqItems: (state) => {
      // object need to be copied?
      state.eqItems = state.readOnlyEqItems
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
    addToEqHistory: (state, eqItems) => {
      // todo this is always readOnlyEqItems
      let pks = []
      for (let placement in eqItems) {
        const item = eqItems[placement]
        console.error(placement, item)
        // pks.push(item.pk)
      }
      console.error(pks, eqItems, Object.values(state.readOnlyEqItems), state.readOnlyEqItems)

      state.eqHistory.unshift(eqItems)
      // state.eqHistory = state.eqHistory.slice(0, 5)
      // console.log(state)
      // for (const item of items) {
      //   const placement = ITEM_PLACE[item.type]
      //   state.readOnlyEqItems[placement] = item
      // }
    },
    setReadOnlyEqItems: (state, items) => {
      console.error(state)
      for (const item of items) {
        const placement = ITEM_PLACE[item.type]
        state.readOnlyEqItems[placement] = item
      }
      console.error(state)
    },
    setEqItemsStats: state => {
      console.error('in mutation', Object.values(state.eqItems), state.eqItems.helmet)
      state.eqItemsStats = setStats(state.eqItems)
      state.eqItemsStats.in_mutation = true
      console.error('after setStats', Object.keys(state.eqItemsStats))
    },
    setReadOnlyEqItemsStats: (state) => {
      setStats(state.readOnlyEqItemsStats)
    }
  },
  actions: {
    fetchReadOnlyEqItems ({ commit }, slugs) {
      fetchMultipleItems(slugs, response => {
        console.error(response.data)
        commit('setReadOnlyEqItems', response.data.results)
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
