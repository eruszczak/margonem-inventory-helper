<template>
  <div>
    <div class="message is-info">
      <div class="message-body">
        <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
      </div>
    </div>
    <p v-if="readOnly"><b>TYLKO DO ODCZYTU</b></p>
    <eq v-if="!readOnly" :source="eqItems" :readOnly="false"></eq>
    <eq v-else :source="readOnlyEqItems" :readOnly="true"></eq>
    <button v-if="readOnly" class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>

    <p>TYLKO DO ODCZYTU. ostatnio przeglądane zestawy {{ eqHistory.length }}:</p>
    <div class="columns">
      <div class="column" v-for="eqItems in eqHistory">
        <eq :source="eqItems" :readOnly="true"></eq>
        <span>kopiuj link</span>
        <router-link :to="getEqLink(eqItems)">Przejdź do zestawu</router-link>
        <button class="button is-dark" @click="saveAsMine(eqItems)">Zapisz jako moje</button>
      </div>
    </div>
    <!--TODO cannot use stat because when it changes. its not updated. maybe use watcher and update stats manually-->
    <eq-summary v-if="!readOnly" :source="eqItemsStats"></eq-summary>
    <eq-summary v-else :source="readOnlyEqItemsStats"></eq-summary>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import Eq from './Eq'
  import EqSummary from './EqSummary'
  import { getEqRoute } from '../utils/helpers'
  import { toast } from '../mixins/toast'

  export default {
    name: 'eq-view',
    components: {Eq, EqSummary},
    data () {
      return {
        source: null
        // stats: null
      }
    },
    mixins: [toast],
    mounted () {
      this.getEqItems()
    },
    watch: {
      '$route' (to, from) {
        console.log('route change', to, from)
        this.getEqItems()
      }
    },
    computed: {
      ...mapGetters(['eqHistory', 'eqItems', 'readOnlyEqItems', 'eqItemsStats', 'readOnlyEqItemsStats']),
      readOnly: function () {
        return this.slugs.length > 0
      },
      slugs: function () {
        return this.$route.query.i || []
      }
    },
    methods: {
      ...mapMutations(['saveEqItemsAsMine']),
      ...mapActions(['fetchReadOnlyEqItems']),
      getEqLink: eqItems => getEqRoute(eqItems),
      getEqItems: function () {
        console.log('getEqItems')
        if (this.readOnly) {
          let vm = this
          this.fetchReadOnlyEqItems({
            slugs: typeof this.slugs === 'string' ? [this.slugs] : this.slugs,
            callback: function () {
              vm.source = vm.readOnlyEqItems
              // vm.stats = vm.readOnlyEqItemsStats
            }
          })
        } else {
          this.source = this.eqItems
          // this.stats = this.eqItemsStats
        }
      },
      saveAsMine: function (eqItems) {
        this.saveEqItemsAsMine(eqItems)
        this.success('Podmieniono zestaw')
      }
    }
  }
</script>

<style scoped>

</style>
