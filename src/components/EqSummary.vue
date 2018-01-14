<template>
  <div>
    <section>
      <b-field grouped group-multiline>
        <div class="control">
          <b-switch v-model="isLoading">Loading state</b-switch>
        </div>
      </b-field>
      <p>min lvl: {{ eqItemsStats.lvl }}</p>
      <p>konflikt: {{ eqItemsStats.isConflict }}</p>
      <p>dozwolone profesje: <span v-for="prof in eqItemsStats.allowedProfessions">{{ prof | encodeProf }} </span></p>
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
        :loading="isLoading"
        :mobile-cards="hasMobileCards">

        <template slot-scope="props">
          <b-table-column label="First Name">
            {{ props.row.name | encodeStat }}
          </b-table-column>

          <b-table-column label="Last Name">
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
  import { CHARACTER_CLASSES, ITEM_BONUS, ITEM_STAT, ITEM_STATS_IN_ORDER, ITEM_TYPE, ITEM_BONUSES_IN_ORDER } from '../utils/items'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'eq-summary',
    props: ['readOnly'],
    data () {
      return {
        source: null,
        globalStats: {},
        isEmpty: false,
        isBordered: false,
        isStriped: false,
        isNarrowed: false,
        isHoverable: false,
        isLoading: false,
        hasMobileCards: true
      }
    },
    created () {
      this.source = this.readOnly ? this.readOnlyEqItems : this.eqItems
      // this.getStats()
    },
    watch: {
      source: function (value) {
        // this.getStats()
      }
    },
    computed: {
      ...mapGetters(['eqItems', 'readOnlyEqItems', 'eqItemsStats']),
      orderedStats: function () {
        let globalStatsInOrder = []
        for (let statInOrder of ITEM_STATS_IN_ORDER) {
          if (statInOrder in this.eqItemsStats) {
            let stat = {
              // type: null,
              name: statInOrder,
              value: this.eqItemsStats[statInOrder]
            }
            if (['ds', 'di', 'dz'].indexOf(statInOrder) > -1) {
              let allAttrs = parseInt(this.eqItemsStats['da'])
              if (stat.rightValue && allAttrs) {
                stat.rightValue += ` (${parseInt(stat.value) + allAttrs})`
              }
            }
            globalStatsInOrder.push(stat)
          }
        }
        return globalStatsInOrder
      },
      orderedBonuses: function() {
        let bonuses = [];
        for (let bonusInOrder of ITEM_BONUSES_IN_ORDER) {
          if (bonusInOrder in this.eqItemsStats.bonuses) {
            let bonus = this.eqItemsStats.bonuses[bonusInOrder]
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
