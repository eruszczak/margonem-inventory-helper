import { getDefaultEqItems, ITEM_PLACE } from '../../utils/items'
import { setStats, getOrderedPksOfEqItems, eqItemsAreTheSame } from '../../utils/eq'
import { fetchMultipleItems } from '../../api/items'

const STACK_LENGTH_LIMIT = 15
const ITEM_HISTORY_LIMIT = 15
const EQ_HISTORY_LIMIT = 5

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
    eqHistory: [],
    replacementsCounter: 0
  },
  getters: {
    eqItems: state => state.eqItems,
    canAddToEq: state => state.canAddToEq,
    itemHistory: state => state.itemHistory,
    readOnlyEqItems: state => state.readOnlyEqItems,
    eqHistory: state => state.eqHistory,
    eqItemsStats: state => state.eqItemsStats,
    readOnlyEqItemsStats: state => state.readOnlyEqItemsStats,
    stack: state => state.stack,
    replacementsCounter: state => state.replacementsCounter,
    realStackLength: state => state.stack.length - state.replacementsCounter
  },
  mutations: {
    toggleCanAddToEq: state => {
      state.canAddToEq = !state.canAddToEq
    },
    replaceEqItems: (state, eqItems) => {
      state.eqItems = Object.assign({}, eqItems)
    },
    // addItemToEq: function (state, clickedItem, isStackOperation = false, initial = false) {
    addItemToEq: function (state, item) {
      const itemPlacement = ITEM_PLACE[item.type]
      state.eqItems[itemPlacement] = item
    },
    removeItemFromEq: function (state, item) {
      const itemPlacement = ITEM_PLACE[item.type]
      state.eqItems[itemPlacement] = null
    },
    addToItemHistory: (state, item) => {
      state.itemHistory = state.itemHistory.filter(el => item.pk !== el.pk)
      state.itemHistory.unshift(item)
      state.itemHistory = state.itemHistory.slice(0, ITEM_HISTORY_LIMIT)
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
      state.eqHistory = state.eqHistory.slice(0, EQ_HISTORY_LIMIT)
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
    },
    addToStack: (state, payload) => {
      state.stack.push(payload)
      let realStackLength = state.stack.length - state.replacementsCounter
      if (realStackLength === STACK_LENGTH_LIMIT + 1) {
        // let top = state.stack[state.stack.length - 1]
        // if (top.replaced) {
        //   state.replacementsCounter -= 1
        // }
        state.stack.pop()
      }
    },
    popFromStack: state => {
      state.stack.pop()
    },
    increaseReplacementsCounter: state => {
      state.replacementsCounter += 1
    },
    decreaseReplacementsCounter: state => {
      state.replacementsCounter -= 1
    },
    restart: state => {
      state.stack = []
      state.replacementsCounter = 0
    }
  },
  actions: {
    fetchReadOnlyEqItems ({ commit }, payload) {
      fetchMultipleItems(payload.slugs, response => {
        commit('setReadOnlyEqItems', response.data.results)
        commit('setReadOnlyEqItemsStats')
        if (!payload.isCompare) {
          commit('addToEqHistory')
        }
        payload.callback && payload.callback()
      }, error => {
        console.error(error)
      })
    },
    wearItem ({ commit }, payload) {
      // Special case. If item is replaced, 2 items are added to stack.
      if (payload.previousItem) {
        commit('increaseReplacementsCounter')
        commit('addToStack', {
          replaced: true,
          item: payload.previousItem
        })
      }
      commit('addItemToEq', payload.item)
      commit('setEqItemsStats')
      commit('addToStack', {
        added: true,
        item: payload.item
      })
    },
    takeOffItem ({ commit }, item) {
      commit('removeItemFromEq', item)
      commit('setEqItemsStats')
      commit('addToStack', {
        added: false,
        item: item
      })
    },
    saveEqAsMine ({ commit }, eqItems) {
      commit('replaceEqItems', eqItems)
      commit('setEqItemsStats')
    },
    restoreEqItem ({ commit, state }) {
      let stackTop = state.stack[state.stack.length - 1]
      commit('popFromStack')
      if (stackTop) {
        if (stackTop.added) {
          commit('removeItemFromEq', stackTop.item)
          let newStackTop = state.stack[state.stack.length - 1]
          // Special case. If stackTop.item replaced newStackTop.item and stackTop.item was just removed,
          // newStackTop must be restored to its place
          if (newStackTop && newStackTop.replaced) {
            commit('popFromStack')
            commit('addItemToEq', newStackTop.item)
            commit('decreaseReplacementsCounter')
          }
        } else {
          commit('addItemToEq', stackTop.item)
        }
        commit('setEqItemsStats')
      }
    }
  }
}
