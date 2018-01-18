<template>
  <div v-if="source">
    <section>
      <b-message v-if="source.isConflict" title="Błędny ekwipunek" type="is-warning" :closable="false">
        Ekwipunek zawiera sprzeczne typy przedmiotów
      </b-message>

      <b-tag type="is-dark is-medium" style="margin-top:10px;">{{ source.lvl }} lvl</b-tag>
      <b-taglist v-if="!source.isConflict">
        <b-tag v-if="source.allowedProfessions.length === 6" type="is-info">wszystkie profesje</b-tag>
        <b-tag v-else v-for="prof in source.allowedProfessions" type="is-info">{{ prof | encodeProf }}</b-tag>
      </b-taglist>
      <b-taglist>
        <div class="field is-grouped is-grouped-multiline">
          <div class="control" v-for="rarity in ITEM_RARITY_IN_ORDER">
            <div class="tags has-addons">
              <span class="tag is-dark">{{ rarity | encodeRarity }}</span>
              <span class="tag">{{ source.rarity[rarity] || 0 }}</span>
            </div>
          </div>
        </div>
      </b-taglist>

      <template v-if="orderedStats.length">
        <h2 class="title">Statystyki</h2>
        <b-table
          v-if="orderedStats"
          :data="[]"
          :striped="true"
          :narrowed="true"
          :hoverable="false"
          :mobile-cards="false">
          <template slot-scope="props">
            <b-table-column label="Nazwa">
              {{ props.row.name | encodeStat }}
            </b-table-column>
            <b-table-column label="Wartość">
              {{ props.row.value }}
            </b-table-column>
          </template>
        </b-table>
      </template>

      <template v-if="orderedBonuses.length">
        niektóre bonusy mają niepełny czas działania.
        <br>niektóre bonusy > 2
        <h2 class="title">Bonusy</h2>
        <b-table
          :data="orderedBonuses"
          :row-class="(row, index) => row.limitReached ? 'limit-reached' : ''"
          :striped="true"
          :narrowed="false"
          :hoverable="false"
          :mobile-cards="false">
          <template slot-scope="props">
            <b-table-column label="Nazwa">
              <!--<b-tooltip :label="props.row.name | getBonusDescription" position="is-bottom">{{ props.row.name | encodeBonus }}</b-tooltip>-->
              {{ props.row.name | encodeBonus }} (x{{ props.row.count }})
              <!--<p class="bonus-description">{{ props.row.description }}</p>-->
            </b-table-column>
            <b-table-column label="Szansa">
              {{ props.row.value }}% {{ props.row.amount }}
            </b-table-column>
          </template>
        </b-table>
      </template>

      <b-message v-if="source.bonusWarnings" title="Uwagi do bonusów" type="is-warning" :closable="false">
        <ul>
          <li>Ekwipunek zawiera sprzeczne typy przedmiotów</li>
          <li>Jeśli gdzies count > 2, wartosci moga byc zle obliczone</li>
        </ul>
      </b-message>
    </section>
  </div>
</template>

<script>
  import { CHARACTER_CLASSES, ITEM_BONUS, ITEM_STAT, ITEM_RARITY, ITEM_STATS_IN_ORDER, ITEM_RARITY_IN_ORDER, ITEM_BONUSES_IN_ORDER } from '../utils/items'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'eq-summary',
    props: ['source'],
    data () {
      return {
        ITEM_RARITY_IN_ORDER: ITEM_RARITY_IN_ORDER
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
              bonus.description = bonus.description || ITEM_BONUS[bonus.name].description
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
      // getBonusDescription: value => ITEM_BONUS[value].description,
      encodeRarity: value => ITEM_RARITY[value]
    }
  }
</script>

<style>
  .bonus-description {
    font-size: 0.65em;
  }
  .tags {
    margin-top: 5px;
    justify-content: center;
  }

  tr.limit-reached {
    background: hsl(348, 100%, 61%) !important;
  }
</style>
