<template>
  <tbl>
    <tbl-row slot="header">
      <tbl-header centered>Twoj</tbl-header>
      <tbl-header centered>Nazwa</tbl-header>
      <tbl-header centered>Odwiedzany</tbl-header>
    </tbl-row>
    <tbody slot="tbody">
    <tbl-row v-for="obj in orderedBonuses">
      <tbl-col centered>{{ obj.leftValue | encode }}</tbl-col>
      <tbl-col centered>{{ obj.name | encodeBonus }}</tbl-col>
      <tbl-col centered>{{ obj.rightValue | encode }}</tbl-col>
    </tbl-row>
    </tbody>
  </tbl>
</template>

<script>
  import { ITEM_BONUS, ITEM_BONUSES_IN_ORDER } from '../../utils/items'
  import { isObjEmpty } from '../../utils/helpers'

  export default {
    name: 'eq-bonuses-compare',
    props: ['leftSource', 'rightSource'],
    computed: {
      orderedBonuses: function () {
        let bonuses = []
        console.log(this.leftSource, this.rightSource)
        if (this.leftSource && this.rightSource) {
          for (let bonusInOrder of ITEM_BONUSES_IN_ORDER) {
            if (bonusInOrder in this.leftSource || bonusInOrder in this.rightSource) {
              let bonusObj = {
                name: bonusInOrder,
                leftValue: this.leftSource[bonusInOrder] || 0,
                rightValue: this.rightSource[bonusInOrder] || 0
              }
              bonuses.push(bonusObj)
            }
          }
        }
        return bonuses
      }
    },
    filters: {
      encodeBonus: value => ITEM_BONUS[value].translation,
      encode: bonus => {
        if (bonus.count) {
          return `${bonus.value}% ${bonus.amount} (x${bonus.count})`
        }
        return '-'
      }
    }
  }
</script>

<style scoped>

</style>
