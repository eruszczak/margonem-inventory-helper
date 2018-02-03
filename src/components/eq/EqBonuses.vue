<template>
  <tbl>
    <tbl-row slot="header">
      <tbl-header>Nazwa</tbl-header>
      <tbl-header>Wartość</tbl-header>
    </tbl-row>
    <tbody slot="tbody">
    <tbl-row v-for="obj in orderedBonuses">
      <tbl-col>{{ obj.name | encodeBonus }} (x{{ obj.count }})</tbl-col>
      <tbl-col>{{ obj.value }}% {{ obj.amount }}</tbl-col>
    </tbl-row>
    </tbody>
  </tbl>
</template>

<script>
  import { ITEM_BONUS, ITEM_BONUSES_IN_ORDER } from '../../utils/items'

  export default {
    name: 'eq-bonuses',
    props: ['source'],
    computed: {
      orderedBonuses: function () {
        let bonuses = []
        if (this.source.bonuses) {
          for (let bonusInOrder of ITEM_BONUSES_IN_ORDER) {
            if (bonusInOrder in this.source.bonuses) {
              let bonus = this.source.bonuses[bonusInOrder]
              bonus.name = bonusInOrder
              bonus.description = bonus.description || ITEM_BONUS[bonus.name].description
              bonuses.push(bonus)
            }
          }
        }
        return bonuses
      }
    },
    filters: {
      encodeBonus: value => ITEM_BONUS[value].translation
    }
  }
</script>

<style scoped>

</style>
