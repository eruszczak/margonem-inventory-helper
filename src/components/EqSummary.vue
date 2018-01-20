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
      <div class="tags">
        <span class="tag" v-for="rarity in ITEM_RARITY_IN_ORDER" :class="rarity + '-tag'">{{ source.rarity[rarity] || 0 }}</span>
      </div>

      <template v-if="orderedStats.length">
        <h2 class="title">Statystyki</h2>
        <eq-stats></eq-stats>
      </template>

      <template v-if="orderedBonuses.length">
        <h2 class="title">Bonusy</h2>
        <eq-bonuses></eq-bonuses>
      </template>

      <template v-if="source.bonusWarnings.decreased.length || isAnyLimitReached">
        <hr style="border:0">
        <b-message title="Uwagi do bonusów" type="is-warning" :closable="false">
          <ul>
            <li v-for="item in source.bonusWarnings.decreased">{{ item }}</li>
            <li v-for="(value, key) in source.bonusWarnings.limit">Przekroczono limit: {{ key }} (x{{ value }})</li>
            <li v-if="isAnyLimitReached"><small>Wartości oraz uwagi dla bonusu z przekroczonym limitem mogą być niepoprawne.</small></li>
          </ul>
        </b-message>
      </template>
      <hr style="visibility: hidden;">
    </section>
  </div>
</template>

<script>
  import { CHARACTER_CLASSES, ITEM_RARITY_IN_ORDER } from '../utils/items'
  import { mapMutations } from 'vuex'
  import { isObjEmpty } from '../utils/helpers'
  import EqStats from './EqStats'
  import EqBonuses from './EqBonuses'

  export default {
    name: 'eq-summary',
    props: ['source'],
    components: { EqStats, EqBonuses },
    data () {
      return {
        ITEM_RARITY_IN_ORDER: ITEM_RARITY_IN_ORDER
      }
    },
    computed: {
      isAnyLimitReached: function () {
        return !isObjEmpty(this.source.bonusWarnings.limit)
      }
    },
    methods: {
      ...mapMutations(['setStats'])
    },
    filters: {
      encodeProf: value => CHARACTER_CLASSES[value]
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
