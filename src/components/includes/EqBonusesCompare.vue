<template>
  <b-table
    :data="orderedBonuses"
    :striped="true"
    :narrowed="true"
    :hoverable="false"
    :mobile-cards="false">
    <template slot-scope="props">
      <b-table-column label="Twój" centered>
        {{ props.row.leftValue | encode }}
      </b-table-column>
      <b-table-column label="Nazwa" centered>
        {{ props.row.name | encodeBonus }}
      </b-table-column>
      <b-table-column label="Odwiedzany" centered>
        {{ props.row.rightValue | encode }}
      </b-table-column>
    </template>
  </b-table>
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
        if (this.leftSource || this.rightSource || !isObjEmpty(this.leftSource) || !isObjEmpty(this.rightSource)) {
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
