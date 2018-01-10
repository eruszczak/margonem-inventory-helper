<template>
  <table class="set">
    <tbody>
      <tr v-for="row in rows">
        <td v-for="place in row" :id="place">
          <item v-if="eqItems[place]" :data="eqItems[place]" @itemRightClick="itemRightClick"></item>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Item from './Item'
  import { ITEM_PLACE, ITEM_BONUS, CHARACTER_CLASSES_IN_ORDER, EQ_ITEMS_ROWS } from '../utils/items'
  import { isInt, isItemWearable, calculateBonusWeakness, calculateHolyTouchAmount, getBaseUrl } from '../utils/helpers'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Eq',
    components: {
      Item
    },
    data () {
      return {
        rows: EQ_ITEMS_ROWS
      }
    },
    computed: {
      ...mapGetters([
        'eqItems',
        'canAddToEq'
      ])
    },
    methods: {
      ...mapMutations([
        // 'addItemToEq',
        'removeItemFromEq'
      ]),
      itemRightClick: function (clickedItem) {
        let itemType = ITEM_PLACE[clickedItem.type]
        this.removeItemFromEq(itemType)
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
