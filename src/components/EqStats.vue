<template>
  <b-table
    :data="orderedStats"
    :striped="true"
    :narrowed="true"
    :hoverable="false"
    :mobile-cards="false">
    <template slot-scope="props">
      <b-table-column label="Nazwa">
        {{ props.row.name | encodeStat }}
      </b-table-column>
      <b-table-column label="Wartość">
        {{ props.row.value }}
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
  import { ITEM_STAT, ITEM_STATS_IN_ORDER } from '../utils/items'

  export default {
    name: 'eq-stats',
    props: ['source'],
    computed: {
      orderedStats: function () {
        let globalStatsInOrder = []
        for (let statInOrder of ITEM_STATS_IN_ORDER) {
          if (statInOrder in this.source) {
            let stat = {
              // type: null,
              name: statInOrder,
              value: this.source[statInOrder]
            }
            if (['ds', 'di', 'dz'].indexOf(statInOrder) > -1) {
              let allAttrs = parseInt(this.source['da'])
              if (stat.rightValue && allAttrs) {
                stat.rightValue += ` (${parseInt(stat.value) + allAttrs})`
              }
            }
            globalStatsInOrder.push(stat)
          }
        }
        return globalStatsInOrder
      }
    },
    filters: {
      encodeStat: value => ITEM_STAT[value].val2
    }
  }
</script>

<style scoped>

</style>
