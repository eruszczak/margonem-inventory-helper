<template>
  <div>
    <div class="message is-info">
      <div class="message-body">
        <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
      </div>
    </div>
    <p v-if="readOnly"><b>TYLKO DO ODCZYTU</b></p>
    <div v-if="!readOnly">
      <restore-eq></restore-eq>
      <button class="button is-dark" @click="restart">restart</button>
    </div>
    <eq :source="eqSet" :readOnly="readOnly"></eq>
    <button v-if="readOnly" class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>

    <p>TYLKO DO ODCZYTU. :</p>
    <div class="columns">
      <div class="column" v-for="eqItems in eqHistory">
        <eq :source="eqItems" :readOnly="true"></eq>
        <span>kopiuj link</span>
        <router-link :to="getEqLink(eqItems)">Przejdź do zestawu</router-link>
        <button class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>
      </div>
    </div>

    <section>
      <b-collapse class="card" :open.sync="isOpen">
        <div slot="trigger" class="card-header">
          <p class="card-header-title">
            Ostatnio przeglądane zestawy {{ eqHistory.length }}
          </p>
          <!--<a class="card-header-icon">-->
            <!--<b-icon :icon="isOpen ? 'menu-down' : 'menu-up'"></b-icon>-->
          <!--</a>-->
        </div>
        <div class="card-content">
          <div class="content">
            Możesz zobaczyć 5 ostatnich odwiedzanych zestawów.
            <button class="button is-dark" @click="showNext">Następny</button>
            <eq :source="currentEqItems" :readOnly="true"></eq>
          </div>
        </div>
        <footer class="card-footer">
          <button class="card-footer-item">kopiuj link</button>
          <router-link class="card-footer-item" :to="getEqLink(currentEqItems)">Przejdź do zestawu</router-link>
          <button class="card-footer-item" @click="saveAsMine(currentEqItems)">Zapisz jako moje</button>
        </footer>
      </b-collapse>
    </section>

    <b-tabs v-model="current">
      <b-tab-item label="Pictures">
        <eq :source="currentEqItems" :readOnly="true"></eq>
      </b-tab-item>

      <b-tab-item label="Music">
        Lorem <br>
        ipsum <br>
        dolor <br>
        sit <br>
        amet.
      </b-tab-item>
    </b-tabs>

    <eq-summary :source="eqSetStats"></eq-summary>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import Eq from './Eq'
  import RestoreEq from './RestoreEq'
  import EqSummary from './EqSummary'
  import { getEqRoute } from '../utils/helpers'
  import { toast } from '../mixins/toast'

  export default {
    name: 'eq-view',
    components: {Eq, EqSummary, RestoreEq},
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
      }
    },
    methods: {
      ...mapMutations(['restart']),
      ...mapActions(['fetchReadOnlyEqItems', 'saveEqAsMine']),
      getEqLink: eqItems => getEqRoute(eqItems),
      getEqItems: function () {
        if (this.readOnly) {
          // let vm = this
          this.fetchReadOnlyEqItems({
            slugs: typeof this.slugs === 'string' ? [this.slugs] : this.slugs,
            callback: function () {
              // here loading = false should be set in the future
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
