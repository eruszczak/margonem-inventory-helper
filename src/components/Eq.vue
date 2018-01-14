<template>
  <table class="set" v-if="source">
    <tbody>
      <tr v-for="row in rows">
        <td v-for="place in row">
          <item v-if="source[place]" :data="source[place]" :action="action"></item>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Item from './Item'
  import { EQ_ITEMS_ROWS } from '../utils/items'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'

  export default {
    name: 'Eq',
    props: {
      readOnly: {
        type: Boolean,
        default: false
      },
      source: {
        type: Object,
        default: null
      }
    },
    components: {Item},
    data () {
      return {
        rows: EQ_ITEMS_ROWS
      }
    },
    computed: {
      /**
       * If eq is read only, right clicking the item should add to my eq. Removing only works when viewing my eq
       * @returns {number}
       */
      action: function () {
        return this.readOnly ? RIGHT_CLICK_MAPPER.add : RIGHT_CLICK_MAPPER.remove
      }
    }
  }
</script>

<style>
  .set tr {
    line-height: 10px;
  }
  .set td {
    width: 42px;
    height: 42px;
    border: 1px solid lightgrey;
  }
</style>
