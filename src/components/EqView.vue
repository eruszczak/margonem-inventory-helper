<template>
  <section class="section">
    <div class="container">
      <div class="message is-info">
        <div class="message-body">
          <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
        </div>
      </div>
      <div v-if="readOnly" class="message is-warning">
        <div class="message-body">
          <p>Odwiedzasz zestaw. Nie możesz go edytować.</p>
        </div>
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-7">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification is-info has-text-centered">
                <p class="title">Ekwipunek</p>
                <div class="content">
                  <eq :source="eqSet" :readOnly="readOnly"></eq>
                  <button v-if="readOnly" class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>
                  <router-link v-if="readOnly" :to="compareEqLink">Porównaj z moim</router-link>
                </div>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-warning has-text-centered">
                <p class="title">Ogólne</p>
                <div class="content">
                  <eq-overview :source="eqSetStats"></eq-overview>
                  <div v-if="!readOnly">
                    <restore-eq></restore-eq>
                    <button class="button is-dark" @click="restart">restart</button>
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
      <article class="tile is-child notification is-primary has-text-centered">
        <div class="content">
          <p class="title">Ostatnio przeglądane zestawy</p>
          <div class="content">
            <p>TYLKO DO ODCZYTU. :</p>
            <div class="columns">
              <div class="column" v-for="eqItems in eqHistory">
                <eq :source="eqItems" :readOnly="true"></eq>
                <span>kopiuj link</span>
                <router-link :to="getEqLink(eqItems)">Przejdź do zestawu</router-link>
                <button class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>
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
  import Eq from './Eq'
  import RestoreEq from './includes/RestoreEq'
  import { getEqRoute } from '../utils/helpers'
  import { toast } from '../mixins/toast'
  import EqStats from './includes/EqStats'
  import EqBonuses from './includes/EqBonuses'
  import EqOverview from './includes/EqOverview'

  export default {
    name: 'eq-view',
    components: {Eq, RestoreEq, EqStats, EqBonuses, EqOverview},
    data () {
      return {
        isOpen: true,
        current: 0
      }
    },
    mounted () {
      this.getEqItems()
    },
    mixins: [toast],
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
      },
      compareEqLink: function () {
        let route = Object.assign({}, getEqRoute(this.eqSet))
        route.name = 'eqCompareView'
        return route
      }
    },
    methods: {
      ...mapMutations(['restart', 'toggleLoading']),
      ...mapActions(['fetchReadOnlyEqItems', 'saveEqAsMine']),
      getEqLink: eqItems => getEqRoute(eqItems),
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
        this.success('Podmieniono zestaw')
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
