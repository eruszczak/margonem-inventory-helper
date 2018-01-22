<template>
  <div v-if="eqItemsStats">
    <section>
      <eq-overview :source="eqItemsStats"></eq-overview>

      <!-- <template v-if="orderedStats.length || true"> -->
        <h2 class="title">Statystyki</h2>
        <eq-stats :source="eqItemsStats"></eq-stats>
      <!-- </template> -->

      <!-- <template v-if="orderedBonuses.length || true"> -->
        <h2 class="title">Bonusy</h2>
        <eq-bonuses :source="eqItemsStats"></eq-bonuses>
      <!-- </template> -->
        <eq-bonuses-warnings :source="eqItemsStats"></eq-bonuses-warnings>

      <hr style="visibility: hidden;">
    </section>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import EqStats from './includes/EqStats'
  import EqBonuses from './includes/EqBonuses'
  import EqOverview from './includes/EqOverview'
  import EqBonusesWarnings from './includes/EqBonusesWarnings'

  export default {
    name: 'eq-modal',
    props: ['source'],
    components: { EqStats, EqBonuses, EqOverview, EqBonusesWarnings },
    computed: {
      ...mapGetters(['eqItemsStats'])
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
