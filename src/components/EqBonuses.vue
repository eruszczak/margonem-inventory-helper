<template>
  <b-table
    :data="orderedBonuses"
    :row-class="row => row.limitReached ? 'limit-reached' : ''"
    :striped="true"
    :narrowed="true"
    :hoverable="false"
    :mobile-cards="false">
    <template slot-scope="props">
      <b-table-column label="Nazwa">
        {{ props.row.name | encodeBonus }} (x{{ props.row.count }})
      </b-table-column>
      <b-table-column label="Szansa">
        {{ props.row.value }}% {{ props.row.amount }}
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
  import { ITEM_BONUS, ITEM_BONUSES_IN_ORDER } from '../utils/items'

  export default {
    name: 'eq-bonuses',
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
