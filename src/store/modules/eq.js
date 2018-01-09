import { DEFAULT_EQ_ITEMS, ITEM_PLACE } from '../../utils/items'

export default {
  state: {
    eqItems: DEFAULT_EQ_ITEMS,
    // this decided whether eqSet had 'preventAddingItem'. it must be stored in local storage
    canAddToEq: false,
    stack: []
  },
  getters: {
    eqItems: state => state.eqItems,
    canAddToEq: state => state.canAddToEq
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
    addItemToEq: function (state, clickedItem, isStackOperation = false, initial = false) {
      // TODO not initial but ignoreToast
      console.log(clickedItem)
      // console.log('add')
      // if (!initial && this.preventAddingItem) {
      //   // this is also for left set in EqSetsView because in listener is not created
      //   // because I dont want to add items using toolbarSearch
      //   return
      // }
      //
      const itemPlacement = ITEM_PLACE[clickedItem.type]
      console.log(itemPlacement)
      // if (!initial && !isItemWearable(clickedItem.type)) {
      //   // EventBus.$emit('showSnackbar', `Nie można założyć tego typu.`);
      //   return
      // }
      //
      // const previousItemInThisPlace = this.eqItems[itemPlacement]
      // if (!initial && previousItemInThisPlace.slug === clickedItem.slug) {
      //   // EventBus.$emit('showSnackbar', `Ten przedmiot jest już założony.`);
      //   return
      // }
      //
      // if (!initial) {
      //   // EventBus.$emit('showSnackbar', `Założono ${clickedItem.name}`);
      // }
      console.log(state.eqItems)
      // state.setEqItem(clickedItem, itemPlacement)
      state.eqItems[itemPlacement] = clickedItem

      // if (!isStackOperation) {
      //   if (previousItemInThisPlace) {
      //     this.stack.push({added: false, item: previousItemInThisPlace})
      //     this.countItemReplacements += 1
      //   }
      //   this.stack.push({added: true, item: clickedItem})
      // }
      // this.updateSetState()
      // if (!this.forShowOnly) {
      //   // this set is only for display, cannot add items to it
      //   localStorage.setItem(itemPlacement, JSON.stringify(clickedItem))
      // }
    },
  }
}
