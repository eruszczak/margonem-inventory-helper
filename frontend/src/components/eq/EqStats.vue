<template>
  <tbl v-if="orderedStats.length">
    <tbl-row slot="header">
      <tbl-header>Nazwa</tbl-header>
      <tbl-header>Wartość</tbl-header>
    </tbl-row>
    <tbody slot="tbody">
    <tbl-row v-for="obj in orderedStats" :key="obj.name">
      <tbl-col>{{ obj.name | encodeStat }}</tbl-col>
      <tbl-col>{{ obj.value }}</tbl-col>
    </tbl-row>
    </tbody>
  </tbl>
  <msg v-else>Nie znaleziono</msg>
</template>

<script>
  import { ITEM_STAT } from '../../utils/items'
  import { Table, TableColumn, TableHeader, TableRow } from '../ui/table/index'
  import { mapGetters } from 'vuex'

  export default {
    name: 'eq-stats',
    props: ['source'],
    components: {Table, TableColumn, TableHeader, TableRow},
    computed: {
      ...mapGetters(['ITEM_STATS_IN_ORDER']),
      orderedStats: function () {
        let globalStatsInOrder = []
        for (let statInOrder of this.ITEM_STATS_IN_ORDER) {
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
