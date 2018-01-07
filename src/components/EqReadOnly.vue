<template>
  <div>
    <table class="set">
      <tbody>
      <tr v-for="row in rows">
        <td v-for="place in row" :id="place">
          <item v-if="eqItems[place]" :data="eqItems[place]" @itemRightClick="itemRightClick"></item>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { DEFAULT_EQ_ITEMS, EQ_ITEMS_ROWS } from '../utils/items'

  export default {
    name: 'EqReadOnly',
    data () {
      return {
        eqItems: [],
        rows: EQ_ITEMS_ROWS
      }
    },
    watch: {
      '$route' (to, from) {
        // I forgot about it and items weren't rendered but they were added.
        // reseting object is not enough, keys must be present so they can be tracked
        // this.eqItems = DEFAULT_EQ_ITEMS
        // this.initEqSet(true)
      }
    },
    computed: {
    },
    methods: {
      ...mapMutations([
        'replaceEqItems',
        'addItemToEq'
      ]),
      // initEqSet: function () {
      //   const itemSlugs = this.$route.query.i
      //   if (itemSlugs) {
      //     let queryString = '?i=' + itemSlugs.join('&i=')
      //     this.initSetFromQueryString(queryString)
      //   }
      // },
      itemRightClick: function (clickedItem) {
        this.addItemToEq(clickedItem)
      },
      // saveEqAsMine: function (newSet) {
      //   // this.eqItems = newSet;
      //   for (var savedItem in this.eqItems) {
      //     var savedItemInStorage = localStorage.getItem(savedItem);
      //     if (savedItemInStorage != null) {
      //       this.removeItemFromEq(savedItem, false, true);
      //     }
      //     if (savedItem in newSet) {
      //       this.addItemToEq(newSet[savedItem], false, true);
      //     }
      //   }
      // },
    }
  }
</script>
