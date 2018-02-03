<template>
  <tbl>
    <tbl-row slot="header">
      <tbl-header v-if="leftItem" centered>
        <item :data="leftItem"/>
      </tbl-header>
      <tbl-header v-else centered>Twój</tbl-header>
      <tbl-header centered>Nazwa</tbl-header>
      <tbl-header v-if="rightItem" centered>
        <item :data="rightItem"/>
      </tbl-header>
      <tbl-header v-else centered>Odwiedzany</tbl-header>
    </tbl-row>
    <tbody slot="tbody">
    <tbl-row v-for="obj in orderedStats">
      <tbl-col centered>{{ obj.leftValue || '-' }}</tbl-col>
      <tbl-col centered>{{ obj.name | encodeStat }}</tbl-col>
      <tbl-col centered>{{ obj.rightValue || '-' }}</tbl-col>
    </tbl-row>
    </tbody>
  </tbl>
</template>

<script>
  import { ITEM_STAT, ITEM_STATS_IN_ORDER } from '../../utils/items'
  import Item from '../item/Item'

  export default {
    name: 'eq-stats-compare',
    props: ['leftSource', 'rightSource', 'leftItem', 'rightItem'],
    components: {Item},
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
