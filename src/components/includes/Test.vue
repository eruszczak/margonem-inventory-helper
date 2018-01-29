<template>
  <table class="table">
    <thead>
      <th class="">
        <div class="th-wrap is-centered">
          <item :data="comparisons[key][key2].item"/>
        </div>
      </th>
      <th class="">
        <div class="th-wrap is-centered">
          Staty
        </div>
      </th>
      <th class="">
        <div class="th-wrap is-centered">
          <item :data="comparison.item"/>
        </div>
      </th>
    </thead>
    <tbody>
      <tr v-for="">
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { ITEM_STAT, ITEM_STATS_IN_ORDER } from '../../utils/items'
  import {Table, TableColumn} from '../ui/table'

  export default {
    name: 'eq-stats-compare',
    props: ['leftSource', 'rightSource'],
    components: {Table, TableColumn},
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
                stat.leftValue = `${stat.leftValue} (${stat.leftValue + leftAllAttrs})`
              }
              if (stat.rightValue && rightAllAttrs) {
                stat.rightValue = `${stat.rightValue} (${stat.rightValue + leftAllAttrs})`
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
