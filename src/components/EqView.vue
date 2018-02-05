<template>
  <section class="section">
    <div class="container">
      <msg v-if="!readOnly">Znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając PPM</msg>
      <msg v-else>Odwiedzasz zestaw. Nie możesz go edytować</msg>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-7">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification has-text-centered"
                       :class="[readOnly ? 'is-warning' : 'is-info']">
                <p class="title">
                  <span v-if="readOnly">Odwiedzany zestaw</span>
                  <span v-else>Twój zestaw</span>
                </p>
                <div class="content">
                  <div class="columns is-gapless">
                    <div class="column is-narrow">
                      <eq :source="eqSet" :readOnly="readOnly" :darkBorder="readOnly"/>
                      <button v-if="readOnly" class="button is-dark" @click="copyEq(eqItems)">Zapisz jako moje</button>
                      <router-link v-if="readOnly" :to="getCompareEqLink(eqItems)">Porównaj z moim</router-link>
                    </div>
                    <div class="column">
                      <eq-overview :source="eqSetStats"/>
                      <div v-if="!readOnly" class="mt1">
                        <restore-eq size="is-small"/>
                        <!--<button class="button is-dark is-small" @click="restart">restart</button>-->
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-danger has-text-centered">
              <p class="title">Bonusy</p>
              <div class="content">
                <eq-bonuses :source="eqSetStats"/>
                <eq-bonuses-warnings :source="eqSetStats"/>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success has-text-centered">
            <div class="content">
              <p class="title">Statystyki</p>
              <div class="content">
                <eq-stats :source="eqSetStats"/>
              </div>
            </div>
          </article>
        </div>
      </div>
      <!--<article class="tile is-child notification is-light has-text-centered">-->
        <!--<div class="content">-->
          <!--<p class="title">Ostatnio przeglądane zestawy</p>-->
          <!--<div class="content">-->
            <!--<p>TYLKO DO ODCZYTU. :</p>-->
            <!--<eq-history/>-->
          <!--</div>-->
        <!--</div>-->
      <!--</article>-->
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import Eq from './eq/Eq'
  import RestoreEq from './eq/RestoreEq'
  import EqStats from './eq/EqStats'
  import EqBonuses from './eq/EqBonuses'
  import EqBonusesWarnings from './eq/EqBonusesWarnings'
  import EqOverview from './eq/EqOverview'
  import EqHistory from './eq/EqHistory'
  import { getCompareEqLink } from '../utils/helpers'
  import { copyEq } from './mixins/copyEq'

  export default {
    name: 'eq-view',
    components: {Eq, RestoreEq, EqStats, EqBonuses, EqOverview, EqBonusesWarnings, EqHistory},
    mixins: [copyEq],
    mounted () {
      this.getEqItems()
    },
    watch: {
      '$route' (to, from) {
        this.getEqItems()
      }
    },
    computed: {
      ...mapGetters(['eqItems', 'readOnlyEqItems', 'eqItemsStats', 'readOnlyEqItemsStats', 'realStackLength']),
      readOnly: function () {
        return this.slugs.length > 0
      },
      slugs: function () {
        return this.$route.query.i || []
      },
      eqSet: function () {
        return this.readOnly ? this.readOnlyEqItems : this.eqItems
      },
      eqSetStats: function () {
        return this.readOnly ? this.readOnlyEqItemsStats : this.eqItemsStats
      }
    },
    methods: {
      ...mapMutations(['restart', 'toggleLoading']),
      ...mapActions(['fetchReadOnlyEqItems']),
      getEqItems: function () {
        if (this.readOnly) {
          this.toggleLoading(true)
          this.fetchReadOnlyEqItems({
            slugs: typeof this.slugs === 'string' ? [this.slugs] : this.slugs,
            callback: () => {
              this.toggleLoading(false)
            }
          })
        }
      },
      showNext: function () {
        this.current += 1
        if (this.current >= this.eqHistory.length) {
          this.current = 0
        }
      },
      getCompareEqLink: getCompareEqLink
    }
  }
</script>

<style scoped>

</style>
