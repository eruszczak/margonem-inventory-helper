<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <div class="tile is-parent">
          <article class="tile is-child notification is-primary has-text-centered">
            <div class="content">
              <p class="title">Twój zestaw</p>
              <div class="content">
                <eq :source="eqItems"></eq>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-parent is-6">
        <div class="tile is-parent">
          <article class="tile is-child notification is-warning has-text-centered">
            <div class="content">
              <p class="title">Odwiedzany zestaw</p>
              <div class="content">
                <eq :source="readOnlyEqItems" :readOnly="true"></eq>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-7">
        <div class="tile is-parent">
          <article class="tile is-child notification is-success has-text-centered">
            <div class="content">
              <p class="title">Porównanie statystyk</p>
              <div class="content">
                <eq-stats-compare :leftSource="eqItemsStats" :rightSource="readOnlyEqItemsStats"></eq-stats-compare>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-parent is-5">
        <div class="tile is-parent">
          <article class="tile is-child notification is-danger has-text-centered">
            <div class="content">
              <p class="title">Porównanie bonusów</p>
              <div class="content">
                <eq-bonuses-compare :leftSource="eqItemsStats.bonuses" :rightSource="readOnlyEqItemsStats.bonuses"></eq-bonuses-compare>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import Eq from './Eq'
  import RestoreEq from './includes/RestoreEq'
  import EqStatsCompare from './includes/EqStatsCompare'
  import EqBonuses from './includes/EqBonuses'
  import EqOverview from './includes/EqOverview'
  import EqBonusesCompare from './includes/EqBonusesCompare'

  export default {
    name: 'eq-compare-view',
    components: {Eq, RestoreEq, EqStatsCompare, EqBonuses, EqOverview, EqBonusesCompare},
    computed: {
      ...mapGetters([
        'eqItems', 'readOnlyEqItems', 'eqItemsStats', 'readOnlyEqItemsStats', 'realStackLength'
      ]),
      slugs: function () {
        return this.$route.query.i || []
      }
    },
    created () {
      this.getEqItems()
    },
    methods: {
      ...mapActions(['fetchReadOnlyEqItems', 'saveEqAsMine']),
      ...mapMutations(['toggleLoading']),
      getEqItems: function () {
        this.toggleLoading(true)
        this.fetchReadOnlyEqItems({
          slugs: typeof this.slugs === 'string' ? [this.slugs] : this.slugs,
          callback: () => {
            this.toggleLoading(false)
          },
          isCompare: true
        })
      }
    }
  }
</script>

<style scoped>

</style>
