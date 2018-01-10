<template>
  <table class="set">
    <tbody>
      <tr v-for="row in rows">
        <td v-for="place in row" :id="place">
          <item v-if="source[place]" :data="source[place]" @itemRightClick="itemRightClick"></item>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Item from './Item'
  import { ITEM_PLACE, EQ_ITEMS_ROWS } from '../utils/items'
  import { getBaseUrl, getEqRoute } from '../utils/helpers'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Eq',
    props: {
      readOnly: {
        type: Boolean,
        default: false
      },
      history: {
        type: Object,
        default: null
      }
    },
    components: {
      Item
    },
    created () {
      if (this.history) {
        console.error('history', this.history)
        this.source = this.history
      } else {
        this.source = this.readOnly ? this.readOnlyEqItems : this.eqItems
        if (this.readOnly) {
          // todo this will modify state
          // this.source.url = this.eqLink
          console.error('adding to history', this.source)
          this.addToEqHistory(this.source)
        }
      }
    },
    data () {
      return {
        rows: EQ_ITEMS_ROWS,
        source: null
      }
    },
    computed: {
      ...mapGetters([
        'eqItems',
        'readOnlyEqItems',
        'canAddToEq'
      ]),
      eqLink: function () {
        // return `${getBaseUrl()}${this.$router.resolve(getEqRoute(this.source)).href}`
      }
    },
    methods: {
      ...mapMutations([
        // 'addItemToEq',
        'removeItemFromEq',
        'addToEqHistory'
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
