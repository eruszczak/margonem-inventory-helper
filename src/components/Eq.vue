<template>
  <div>
    <table class="set">
      <tbody>
        <tr v-for="row in rows">
          <td v-for="place in row" :id="place">
            <item v-if="eqItems[place]" :data="eqItems[place]" @rightClick="removeItemFromEq"></item>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Item from './Item'
  import { ITEM_PLACE, ITEM_BONUS, CHARACTER_CLASSES_IN_ORDER, EQ_ITEMS_ROWS } from '../utils/items'
  import { isInt, isItemWearable, calculateBonusWeakness, calculateHolyTouchAmount, getBaseUrl } from '../utils/helpers'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Eq',
    props: {
      // forShowOnly: {default: false},
      // hideSummary: {default: false},
    },
    components: {
      Item
    },
    data () {
      return {
        rows: EQ_ITEMS_ROWS,
        showSummary: false,
      }
    },
    computed: {
      ...mapGetters([
        'eqItems',
        'canAddToEq'
      ])
    },
    methods: {
      // ...mapMutations([
      //   'addItemToEq'
      // ]),
      removeItemFromEq: function (clickedItem, isStackOperation = false) {
        if (this.forShowOnly) {
          // EventBus.$emit('showSnackbar', 'Nie możesz edytować odwiedzanego zestawu.');
          // this set is only for display, cannot delete items from it
          return
        }
        let itemType = ITEM_PLACE[clickedItem.type]

        this.eqItems[itemType] = false
        // EventBus.$emit('showSnackbar', `Zdjęto ${clickedItem.name}`);

        if (!isStackOperation) {
          this.stack.push({added: false, item: clickedItem})
        }
        // this.updateSetState()
        localStorage.removeItem(itemType)
      }
    }
  }
</script>

<style>
  .set td {
    width: 42px;
    height: 42px;
    border: 1px solid lightgrey;
  }

  .redcolor {
    color: red;
  }
  .redborder {
    border: 1px solid red;
    display: inline-block;
  }
</style>
