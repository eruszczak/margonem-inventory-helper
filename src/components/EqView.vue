<template>
  <section class="section">
    <div class="container">
      <msg v-if="!readOnly">Znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając PPM</msg>
      <msg v-else>Odwiedzasz zestaw. Nie możesz go edytować, ale możesz użyć go do zbudowania swojego zestawu</msg>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-7">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification has-text-centered"
                       :class="[readOnly ? 'is-warning' : 'is-info']">
                <p class="title">{{ eqTitle }}</p>
                <div class="content">
                  <div class="columns is-gapless">
                    <div v-if="isLoading" class="column">
                      <my-spinner size="100"/>
                    </div>
                    <template v-else>
                      <div class="column is-narrow">
                        <eq :source="eqSet" :readOnly="readOnly" :darkBorder="readOnly"/>
                        <div class="mt1">
                          <template v-if="!readOnly">
                            <!--<restore-eq size="is-small" type="is-dark"/>-->
                            <clipboard :content="getEqLink(eqSet)" value="Kopiuj link" type="is-dark" size="is-small"/>
                            <router-link class="button is-dark is-small" :to="getEqRoute(eqSet)">Odwiedź</router-link>
                          </template>
                          <template v-else>
                            <button class="button is-dark is-small" @click="copyEq(eqSet)">Zapisz jako moje</button>
                            <router-link class="button is-dark is-small" :to="getCompareEqLink(eqSet)">Porównaj z moim</router-link>
                          </template>
                        </div>
                      </div>
                      <div class="column">
                        <eq-overview :source="eqSetStats"/>
                        <!--<div v-if="!readOnly" class="mt1">-->
                        <!--<button class="button is-dark is-small" @click="restart">restart</button>-->
                        <!--</div>-->
                      </div>
                    </template>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-danger has-text-centered">
              <p class="title">Bonusy</p>
              <div class="content">
                <my-spinner v-if="isLoading"/>
                <template v-else>
                  <eq-bonuses :source="eqSetStats"/>
                  <eq-bonuses-warnings :source="eqSetStats"/>
                </template>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success has-text-centered">
            <div class="content">
              <p class="title">Statystyki</p>
              <div class="content">
                <my-spinner v-if="isLoading"/>
                <eq-stats v-else :source="eqSetStats"/>
              </div>
            </div>
          </article>
        </div>
      </div>
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
  import { getCompareEqLink, getEqRoute } from '../utils/helpers'
  import { copyEq } from './mixins/copyEq'
  import Clipboard from './includes/Clipboard'
  import { eqLink } from './mixins/eqLink'

  export default {
    name: 'eq-view',
    components: {Eq, RestoreEq, EqStats, EqBonuses, EqOverview, EqBonusesWarnings, EqHistory, Clipboard},
    mixins: [copyEq, eqLink],
    data () {
      return {
        isLoading: false
      }
    },
    mounted () {
      this.getEqItems()
      this.$setPageTitle(this.eqTitle)
    },
    watch: {
      '$route' (to, from) {
        this.getEqItems()
      },
      eqTitle () {
        this.$setPageTitle(this.eqTitle)
      }
    },
    computed: {
      ...mapGetters(['eqItems', 'readOnlyEqItems', 'eqItemsStats', 'readOnlyEqItemsStats', 'realStackLength']),
      eqTitle () {
        if (this.readOnly) {
          return 'Odwiedzany zestaw'
        }
        return 'Twój zestaw'
      },
      readOnly () {
        return 'i' in this.$route.query
      },
      slugs () {
        return this.$route.query.i || []
      },
      eqSet () {
        return this.readOnly ? this.readOnlyEqItems : this.eqItems
      },
      eqSetStats () {
        return this.readOnly ? this.readOnlyEqItemsStats : this.eqItemsStats
      }
    },
    methods: {
      ...mapMutations(['restart']),
      ...mapActions(['fetchReadOnlyEqItems']),
      getEqItems () {
        if (this.readOnly) {
          this.isLoading = true
          this.fetchReadOnlyEqItems({
            slugs: typeof this.slugs === 'string' ? [this.slugs] : this.slugs,
            callback: () => {
              this.isLoading = false
              this.$Progress.finish()
            }
          })
        } else {
          this.$Progress.finish()
        }
      },
      getCompareEqLink: getCompareEqLink,
      getEqRoute: getEqRoute
    }
  }
</script>

<style scoped>

</style>
