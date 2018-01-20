<template>
  <div v-if="eqItemsStats">
    <section>
      <b-message v-if="eqItemsStats.isConflict" title="Błędny ekwipunek" type="is-warning" :closable="false">
        Ekwipunek zawiera sprzeczne typy przedmiotów
      </b-message>

      <eq-overview :source="eqItemsStats"></eq-overview>

      <!-- <template v-if="orderedStats.length || true"> -->
        <h2 class="title">Statystyki</h2>
        <eq-stats :source="eqItemsStats"></eq-stats>
      <!-- </template> -->

      <!-- <template v-if="orderedBonuses.length || true"> -->
        <h2 class="title">Bonusy</h2>
        <eq-bonuses :source="eqItemsStats"></eq-bonuses>
      <!-- </template> -->

      <template v-if="eqItemsStats.bonusWarnings.decreased.length || isAnyLimitReached">
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
  import { mapMutations, mapGetters } from 'vuex'
  import { isObjEmpty } from '../utils/helpers'
  import EqStats from './EqStats'
  import EqBonuses from './EqBonuses'
  import EqOverview from './EqOverview'

  export default {
    name: 'eq-summary',
    props: ['source'],
    components: { EqStats, EqBonuses, EqOverview },
    computed: {
      ...mapGetters(['eqItemsStats']),
      isAnyLimitReached: function () {
        return !isObjEmpty(this.source.bonusWarnings.limit)
      }
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
