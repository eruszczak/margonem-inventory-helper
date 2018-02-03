<template>
  <div v-if="eqItemsStats">
    <section>
      <eq-overview :source="eqItemsStats"></eq-overview>
      <h2 class="title">Statystyki</h2>
      <eq-stats :source="eqItemsStats"></eq-stats>
      <h2 class="title">Bonusy</h2>
      <eq-bonuses :source="eqItemsStats"></eq-bonuses>
      <eq-bonuses-warnings :source="eqItemsStats"></eq-bonuses-warnings>
      <hr style="visibility: hidden;">
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import EqStats from './EqStats'
  import EqBonuses from './EqBonuses'
  import EqOverview from './EqOverview'
  import EqBonusesWarnings from './EqBonusesWarnings'

  export default {
    name: 'eq-modal',
    props: ['source'],
    components: {EqStats, EqBonuses, EqOverview, EqBonusesWarnings},
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
