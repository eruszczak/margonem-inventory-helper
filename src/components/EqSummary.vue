<template>
  <div v-if="source">
    <section>
      <b-message v-if="source.isConflict" title="Błędny ekwipunek" type="is-warning" :closable="false">
        Ekwipunek zawiera sprzeczne typy przedmiotów
      </b-message>
      <b-tag type="is-dark is-medium">{{ source.lvl }} lvl</b-tag>
      <b-taglist>
        <b-tag v-for="prof in source.allowedProfessions" type="is-info">{{ prof | encodeProf }}</b-tag>
      </b-taglist>
      <h2 class="title">Statystyki</h2>
      <b-table
        :data="orderedStats"
        :striped="true"
        :narrowed="true"
        :hoverable="false">
        <template slot-scope="props">
          <b-table-column label="Nazwa">
            {{ props.row.name | encodeStat }}
          </b-table-column>
          <b-table-column label="Wartość">
            {{ props.row.value }}
          </b-table-column>
        </template>
      </b-table>
      <h2 class="title">Bonusy</h2>
      <b-table
        :data="orderedBonuses"
        :striped="true"
        :narrowed="false"
        :hoverable="false">
        <template slot-scope="props">
          <b-table-column label="Nazwa">
            <!--<b-tooltip :label="props.row.name | getBonusDescription" position="is-bottom">{{ props.row.name | encodeBonus }}</b-tooltip>-->
            {{ props.row.name | encodeBonus }}
            <p class="bonus-description">{{ props.row.name | getBonusDescription }}</p>
          </b-table-column>
          <b-table-column label="Liczba">
            {{ props.row.count }} ({{ props.row.limitReached }})
          </b-table-column>
          <b-table-column label="Wartość">
            {{ props.row.value }}
          </b-table-column>
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
        if (this.source.bonuses) {
          for (let bonusInOrder of ITEM_BONUSES_IN_ORDER) {
            if (bonusInOrder in this.source.bonuses) {
              let bonus = this.source.bonuses[bonusInOrder]
              bonus.name = bonusInOrder
              bonuses.push(bonus)
            }
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
  .bonus-description {
    font-size: 0.65em;
  }
  .tags {
    margin-top: 5px;
    justify-content: center;
  }
</style>
