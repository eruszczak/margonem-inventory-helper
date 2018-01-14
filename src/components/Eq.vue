<template>
  <table class="set" v-if="source">
    <tbody>
      <tr v-for="row in rows">
        <td v-for="place in row">
          <item v-if="source[place]" :data="source[place]" :action="rmbActions.remove"></item>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Item from './Item'
  import { EQ_ITEMS_ROWS } from '../utils/items'
  import { mapGetters, mapMutations } from 'vuex'
  import { toast } from '../mixins/toast'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'

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
    mixins: [toast],
    created () {
      if (this.history) {
        console.error('history', this.history)
        this.source = this.history
      } else {
        this.source = this.readOnly ? this.readOnlyEqItems : this.eqItems
        if (this.readOnly) {
          // debugger
          // todo this will modify state
          // this.source.url = this.eqLink
          console.error(this.source, Object.values(this.source))
          this.addToEqHistory(this.readOnlyEqItems)
        }
      }
    },
    data () {
      return {
        rows: EQ_ITEMS_ROWS,
        source: null,
        rmbActions: RIGHT_CLICK_MAPPER
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
        'removeItemFromEq',
        'addToEqHistory'
      ])
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

  .redcolor {
    color: red;
  }
  .redborder {
    border: 1px solid red;
    display: inline-block;
  }
</style>
