<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-info has-text-centered">
            <div class="content">
              <p class="title">Twój zestaw</p>
              <div class="content">
                <eq :source="eqItems"/>
              </div>
            </div>
          </article>
        </div>
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-warning has-text-centered">
            <div class="content">
              <p class="title">Odwiedzany zestaw</p>
              <div class="content">
                <eq :source="readOnlyEqItems" :readOnly="true" darkBorder/>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-ancestor">
        <article class="tile is-child notification has-text-centered">
          <div class="content">
            <p class="title">Porównanie</p>
            <div class="content">
              <div class="tile is-ancestor">
                <div class="tile is-parent is-6">
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-success has-text-centered">
                      <div class="content">
                        <p class="title">Statystyki</p>
                        <div class="content">
                          <eq-stats-compare :leftSource="eqItemsStats" :rightSource="readOnlyEqItemsStats"/>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
                <div class="tile is-parent is-6">
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-danger has-text-centered">
                      <div class="content">
                        <p class="title">Bonusy</p>
                        <div class="content">
                          <eq-bonuses-compare :leftSource="eqItemsStats.bonuses" :rightSource="readOnlyEqItemsStats.bonuses"/>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import Eq from './eq/Eq'
  import RestoreEq from './eq/RestoreEq'
  import EqStatsCompare from './eq/EqStatsCompare'
  import EqBonuses from './eq/EqBonuses'
  import EqOverview from './eq/EqOverview'
  import EqBonusesCompare from './eq/EqBonusesCompare'

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
