<template>
  <div>
    <div class="message is-info">
      <div class="message-body">
        <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
      </div>
    </div>
    <p v-if="readOnly"><b>TYLKO DO ODCZYTU</b></p>
    <div v-if="!readOnly">
      <button :disabled="!realStackLength" class="button is-dark" @click="restore">Cofnij zmianę ({{ realStackLength }})</button>
      <button class="button is-dark" @click="restart">restart</button>
    </div>
    <eq :source="eqSet" :readOnly="readOnly"></eq>
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
    <eq-summary :source="eqSetStats"></eq-summary>
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
      ...mapGetters([
        'eqHistory', 'eqItems', 'readOnlyEqItems', 'eqItemsStats', 'readOnlyEqItemsStats', 'stack', 'realStackLength'
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
      }
    },
    methods: {
      ...mapMutations(['restart']),
      ...mapActions(['fetchReadOnlyEqItems', 'saveEqAsMine', 'restoreEqItem']),
      getEqLink: eqItems => getEqRoute(eqItems),
      getEqItems: function () {
        console.log('getEqItems')
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
      restore: function () {
        this.success('Cofnięto zmianę')
        this.restoreEqItem()
      }
    }
  }
</script>

<style scoped>

</style>
