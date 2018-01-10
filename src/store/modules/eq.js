import { DEFAULT_EQ_ITEMS, ITEM_PLACE } from '../../utils/items'

export default {
  state: {
    eqItems: DEFAULT_EQ_ITEMS,
    eqLink: null,
    // this decided whether eqSet had 'preventAddingItem'. it must be stored in local storage
    canAddToEq: false,
    stack: [],
    itemHistory: []
  },
  getters: {
    eqItems: state => state.eqItems,
    canAddToEq: state => state.canAddToEq,
    itemHistory: state => state.itemHistory,
    eqLink: function (state) {
      let slugs = []
      for (let placement in state.eqItems) {
        const item = state.eqItems[placement]
        if (item) {
          slugs.push(item.slug)
        }
      }
      return {
        name: 'eqView',
        query: {
          i: slugs
        }
      }
    }
  },
  mutations: {
    toggleCanAddToEq: (state) => {
      console.log('here')
      state.canAddToEq = !state.canAddToEq
    },
    setEqItem: (state, item, placement) => {
      state.eqItems[placement] = item
    },
    replaceEqItems: (state, newEqItems) => {
      state.eqItems = newEqItems
    },
    // addItemToEq: function (state, clickedItem, isStackOperation = false, initial = false) {
    addItemToEq: function (state, clickedItem) {
      // TODO not initial but ignoreToast
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
    }
  }
}
