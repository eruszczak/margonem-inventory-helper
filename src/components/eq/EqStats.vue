<template>
  <tbl>
    <tbl-row slot="header">
      <tbl-header>Nazwa</tbl-header>
      <tbl-header>Wartość</tbl-header>
    </tbl-row>
    <tbody slot="tbody">
    <tbl-row v-for="obj in orderedStats">
      <tbl-col>{{ obj.name | encodeStat }}</tbl-col>
      <tbl-col>{{ obj.value }}</tbl-col>
    </tbl-row>
    </tbody>
  </tbl>
</template>

<script>
  import { ITEM_STAT, ITEM_STATS_IN_ORDER } from '../../utils/items'
  import { Table, TableColumn, TableHeader, TableRow } from '../ui/table/index'

  export default {
    name: 'eq-stats',
    props: ['source'],
    components: {Table, TableColumn, TableHeader, TableRow},
    computed: {
      orderedStats: function () {
        let globalStatsInOrder = []
        for (let statInOrder of ITEM_STATS_IN_ORDER) {
          if (statInOrder in this.source) {
            let stat = {
              name: statInOrder,
              value: this.source[statInOrder]
            }
            if (['ds', 'di', 'dz'].indexOf(statInOrder) > -1) {
              let allAttrs = parseInt(this.source['da'])
              if (stat.value && allAttrs) {
                stat.value = `${stat.value} (${stat.value + allAttrs})`
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
