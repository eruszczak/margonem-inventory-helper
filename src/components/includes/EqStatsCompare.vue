<template>
  <b-table
    :data="orderedStats"
    :striped="true"
    :narrowed="true"
    :hoverable="false"
    :mobile-cards="false">
    <template slot-scope="props">
      <b-table-column label="Wartość">
        {{ props.row.leftValue }}
      </b-table-column>
      <b-table-column label="Nazwa">
        {{ props.row.name | encodeStat }}
      </b-table-column>
      <b-table-column label="Wartość">
        {{ props.row.rightValue }}
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
  import { ITEM_STAT, ITEM_STATS_IN_ORDER } from '../../utils/items'

  export default {
    name: 'eq-stats-compare',
    props: ['leftSource', 'rightSource'],
    computed: {
      orderedStats: function () {
        let globalStatsInOrder = []
        for (let statInOrder of ITEM_STATS_IN_ORDER) {
          if (statInOrder in this.leftSource || statInOrder in this.rightSource) {
            let stat = {
              name: statInOrder,
              leftValue: this.leftSource[statInOrder] || 0,
              rightValue: this.rightSource[statInOrder] || 0
            }
            if (['ds', 'di', 'dz'].indexOf(statInOrder) > -1) {
              let leftAllAttrs = parseInt(this.leftSource['da'])
              let rightAllAttrs = parseInt(this.rightSource['da'])
              if (stat.leftValue && leftAllAttrs) {
                stat.leftValue = `${stat.leftValue} (${parseInt(stat.leftValue) + leftAllAttrs})`
              }
              if (stat.rightValue && rightAllAttrs) {
                stat.rightValue = `${stat.rightValue} (${parseInt(stat.rightValue) + leftAllAttrs})`
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
