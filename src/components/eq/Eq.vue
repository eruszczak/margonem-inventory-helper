<template>
  <div v-if="source" class="eq-items">
    <div class="eq-row" v-for="row in rows">
      <div class="eq-column" :class="{'dark-border': darkBorder, 'light-border': !darkBorder}"
           v-for="(place, index) in row" :key="index">
        <item v-if="source[place]" :data="source[place]" :action="action"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Item from '../item/Item'
  import { EQ_ITEMS_ROWS } from '../../utils/items'
  import { RIGHT_CLICK_MAPPER } from '../../utils/constants'

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
      },
      darkBorder: Boolean
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
  .eq-items .eq-row {
    height: 42px;
  }

  .eq-items .eq-row .eq-column {
    display: inline-block;
    height: 42px;
    width: 42px;
    margin: 1px 1px;
  }

  .light-border {
    border: 1px solid #ffffff6e;
  }

  .dark-border {
    border: 1px solid #00000033;
  }

  .no-border {
    border: none
  }

  /* hide corner columns */
</style>
