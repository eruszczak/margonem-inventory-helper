<template>
  <section class="section">
    <div class="container">
      <msg>Znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając PPM</msg>
      <msg v-if="readOnly">Odwiedzasz zestaw. Nie możesz go edytować</msg>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-7">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification has-text-centered" :class="[readOnly ? 'is-warning' : 'is-primary']">
                <p class="title">{{ readOnly ? 'Odwiedzany' : 'Twój' }} zestaw</p>
                <div class="content">
                  <div class="columns is-gapless">
                    <div class="column is-narrow">
                      <eq :source="eqSet" :readOnly="readOnly" :darkBorder="readOnly"></eq>
                      <button v-if="readOnly" class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>
                      <router-link v-if="readOnly" :to="getCompareEqLink(eqItems)">Porównaj z moim</router-link>
                    </div>
                    <div class="column">
                      <eq-overview :source="eqSetStats"></eq-overview>
                      <div v-if="!readOnly">
                        <restore-eq></restore-eq>
                        <button class="button is-dark" @click="restart">restart</button>
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
                <eq-bonuses :source="eqSetStats"></eq-bonuses>
                <eq-bonuses-warnings :source="eqSetStats"></eq-bonuses-warnings>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success has-text-centered">
            <div class="content">
              <p class="title">Statystyki</p>
              <div class="content">
                <eq-stats :source="eqSetStats"></eq-stats>
              </div>
            </div>
          </article>
        </div>
      </div>
      <article class="tile is-child notification is-light has-text-centered">
        <div class="content">
          <p class="title">Ostatnio przeglądane zestawy</p>
          <div class="content">
            <p>TYLKO DO ODCZYTU. :</p>
            <div class="columns">
              <div class="column" v-for="eqItems in eqHistory">
                <eq :source="eqItems" :readOnly="true" darkBorder></eq>
                <span>kopiuj link</span>
                <router-link :to="getEqLink(eqItems)">Przejdź do zestawu</router-link>
                <button class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>
                <router-link :to="getCompareEqLink(eqItems)">Porównaj z moim</router-link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!--<section>-->
      <!--<b-collapse class="card" :open.sync="isOpen">-->
      <!--<div slot="trigger" class="card-header">-->
      <!--<p class="card-header-title">-->
      <!--Ostatnio przeglądane zestawy {{ eqHistory.length }}-->
      <!--</p>-->
      <!--&lt;!&ndash;<a class="card-header-icon">&ndash;&gt;-->
      <!--&lt;!&ndash;<b-icon :icon="isOpen ? 'menu-down' : 'menu-up'"></b-icon>&ndash;&gt;-->
      <!--&lt;!&ndash;</a>&ndash;&gt;-->
      <!--</div>-->
      <!--<div class="card-content">-->
      <!--<div class="content">-->
      <!--Możesz zobaczyć 5 ostatnich odwiedzanych zestawów.-->
      <!--<button class="button is-dark" @click="showNext">Następny</button>-->
      <!--<eq :source="currentEqItems" :readOnly="true"></eq>-->
      <!--</div>-->
      <!--</div>-->
      <!--<footer class="card-footer">-->
      <!--<button class="card-footer-item">kopiuj link</button>-->
      <!--<router-link class="card-footer-item" :to="getEqLink(currentEqItems)">Przejdź do zestawu</router-link>-->
      <!--<button class="card-footer-item" @click="saveAsMine(currentEqItems)">Zapisz jako moje</button>-->
      <!--</footer>-->
      <!--</b-collapse>-->
      <!--</section>-->

      <!--<b-tabs v-model="current">-->
      <!--<b-tab-item label="Pictures">-->
      <!--<eq :source="currentEqItems" :readOnly="true"></eq>-->
      <!--</b-tab-item>-->

      <!--<b-tab-item label="Music">-->
      <!--Lorem <br>-->
      <!--ipsum <br>-->
      <!--dolor <br>-->
      <!--sit <br>-->
      <!--amet.-->
      <!--</b-tab-item>-->
      <!--</b-tabs>-->
      <!-- <section class="section">
        <eq-summary :source="eqSetStats"></eq-summary>
      </section> -->
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import Eq from './eq/Eq'
  import RestoreEq from './eq/RestoreEq'
  import EqStats from './eq/EqStats'
  import EqBonuses from './eq/EqBonuses'
  import EqBonusesWarnings from './eq/EqBonusesWarnings'
  import EqOverview from './eq/EqOverview'
  import { getEqRoute } from '../utils/helpers'

  export default {
    name: 'eq-view',
    components: {Eq, RestoreEq, EqStats, EqBonuses, EqOverview, EqBonusesWarnings},
    data () {
      return {
        isOpen: true,
        current: 0
      }
    },
    mounted () {
      this.getEqItems()
    },
    watch: {
      '$route' (to, from) {
        this.getEqItems()
      }
    },
    computed: {
      ...mapGetters([
        'eqHistory', 'eqItems', 'readOnlyEqItems', 'eqItemsStats', 'readOnlyEqItemsStats', 'realStackLength'
      ]),
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
      },
      currentEqItems: function () {
        return this.eqHistory[this.current]
      }
    },
    methods: {
      ...mapMutations(['restart', 'toggleLoading']),
      ...mapActions(['fetchReadOnlyEqItems', 'saveEqAsMine']),
      getEqLink: eqItems => getEqRoute(eqItems),
      getCompareEqLink: function (eqItems) {
        let route = Object.assign({}, getEqRoute(eqItems))
        route.name = 'eqCompareView'
        return route
      },
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
      saveAsMine: function (eqItems) {
        this.saveEqAsMine(eqItems)
        this.$toast.info('Podmieniono zestaw')
      },
      showNext: function () {
        this.current += 1
        if (this.current >= this.eqHistory.length) {
          this.current = 0
        }
      }
    }
  }
</script>

<style scoped>

</style>
