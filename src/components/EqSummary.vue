<template>
  <div v-if="source">
    <section>
      <p>min lvl: {{ source.lvl }}</p>
      <p>konflikt: {{ source.isConflict }}</p>
      <p>dozwolone profesje: <span v-for="prof in source.allowedProfessions">{{ prof | encodeProf }} </span></p>
      <p v-for="bonus in orderedBonuses" :key="bonus.name">
        {{ bonus.name | encodeBonus }}; {{ bonus.count }}
        <small>{{ bonus.name | getBonusDescription }}</small>
        <span v-if="bonus.limitReached">LIMIT!! </span>
        <span v-if="bonus.holyTouchAmount"> na {{ bonus.holyTouchAmount }} hp</span>
      </p>

      <b-table
        :data="isEmpty ? [] : orderedStats"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
        :mobile-cards="hasMobileCards">

        <template slot-scope="props">
          <b-table-column label="Bonus">
            {{ props.row.name | encodeStat }}
          </b-table-column>
          <b-table-column label="Wartość">
            {{ props.row.value }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon
                  icon="emoticon-sad"
                  size="is-large">
                </b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
  import { CHARACTER_CLASSES, ITEM_BONUS, ITEM_STAT, ITEM_STATS_IN_ORDER, ITEM_BONUSES_IN_ORDER } from '../utils/items'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'eq-summary',
    props: ['source'],
    data () {
      return {
        isEmpty: false,
        isBordered: false,
        isStriped: false,
        isNarrowed: false,
        isHoverable: false,
        hasMobileCards: false
      }
    },
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
      },
      orderedBonuses: function () {
        let bonuses = []
        console.log(this.source)
        for (let bonusInOrder of ITEM_BONUSES_IN_ORDER) {
          if (bonusInOrder in this.source.bonuses) {
            let bonus = this.source.bonuses[bonusInOrder]
            bonus.name = bonusInOrder
            bonuses.push(bonus)
          }
        }
        return bonuses
      }
    },
    methods: {
      ...mapMutations(['setStats'])
    },
    filters: {
      encodeStat: value => ITEM_STAT[value].val2,
      encodeProf: value => CHARACTER_CLASSES[value],
      encodeBonus: value => ITEM_BONUS[value].translation,
      // encodeType: value => ITEM_TYPE[value],
      getBonusDescription: value => ITEM_BONUS[value].description
    }
  }
</script>

<style scoped>

</style>
