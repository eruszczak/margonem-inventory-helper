import { DEFAULT_EQ_ITEMS, ITEM_PLACE } from '../../utils/items'
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
    eqHistory: state => state.eqHistory,
    eqItemsStats: state => state.eqItemsStats,
    readOnlyEqItemsStats: state => state.readOnlyEqItemsStats
  },
  mutations: {
    toggleCanAddToEq: state => {
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
    addToEqHistory: state => {
      let pks = []
      for (let placement in state.readOnlyEqItems) {
        const item = state.readOnlyEqItems[placement]
        if (item) {
          pks.push(item.pk)
        }
      }
      pks.sort((el, el2) => el > el2)
      state.eqHistory = state.eqHistory.filter(el => {
        let elPks = []
        for (let placement in el) {
          const item = el[placement]
          if (item) {
            elPks.push(item.pk)
          }
        }
        elPks.sort((el, el2) => el > el2)
        let arraysAreTheSame = pks.length === elPks.length && pks.every((v, i) => v === elPks[i])
        console.log(pks, elPks, arraysAreTheSame)
        return !arraysAreTheSame
      })
      state.eqHistory.unshift(state.readOnlyEqItems)
      state.eqHistory = state.eqHistory.slice(0, 5)
    },
    setReadOnlyEqItems: (state, items) => {
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
    fetchReadOnlyEqItems ({ commit }, slugs) {
      fetchMultipleItems(slugs, response => {
        commit('setReadOnlyEqItems', response.data.results)
        commit('addToEqHistory')
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
