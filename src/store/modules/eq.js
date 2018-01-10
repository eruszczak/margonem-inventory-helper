import { DEFAULT_EQ_ITEMS, ITEM_PLACE } from '../../utils/items'
import { fetchMultipleItems } from '../../api/items'

export default {
  state: {
    eqItems: DEFAULT_EQ_ITEMS,
    readOnlyEqItems: DEFAULT_EQ_ITEMS,
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
    // eqLink: function (state) {
    //   let slugs = []
    //   for (let placement in state.eqItems) {
    //     const item = state.eqItems[placement]
    //     if (item) {
    //       slugs.push(item.slug)
    //     }
    //   }
    //   return {
    //     name: 'eqView',
    //     query: {
    //       i: slugs
    //     }
    //   }
    // }
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
      // state.eqHistory = state.eqHistory.filter(el => eqItems.url !== el.url)
      state.eqHistory.unshift(eqItems)
      state.eqHistory = state.eqHistory.slice(0, 2)
      // console.log(state)
      // for (const item of items) {
      //   const placement = ITEM_PLACE[item.type]
      //   state.readOnlyEqItems[placement] = item
      // }
    },
    setReadOnlyEqItems: (state, items) => {
      for (const item of items) {
        const placement = ITEM_PLACE[item.type]
        state.readOnlyEqItems[placement] = item
      }
    }
  },
  actions: {
    fetchReadOnlyEqItems ({ commit }, slugs) {
      fetchMultipleItems(slugs, response => {
        console.log(response.data)
        commit('setReadOnlyEqItems', response.data.results)
      }, error => {
        console.log(error)
      })
    }
  }
}
