<template>
  <div>
    <div class="message is-info">
      <div class="message-body">
        <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
      </div>
    </div>
    <p v-if="readOnly"><b>TYLKO DO ODCZYTU</b></p>
    <eq :source="source" :readOnly="readOnly"></eq>

    <p>TYLKO DO ODCZYTU. ostatnio przeglądane zestawy {{ eqHistory.length }}:</p>
    <div class="columns">
      <div class="column" v-for="eqItems in eqHistory">
        <eq :source="eqItems" :readOnly="true"></eq>
        <router-link :to="getEqLink(eqItems)">Przejdź do zestawu</router-link>
      </div>
    </div>

    <eq-summary :readOnly="readOnly"></eq-summary>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Eq from './Eq'
  import EqSummary from './EqSummary'
  import { getEqRoute } from '../utils/helpers'

  export default {
    name: 'eq-view',
    components: {Eq, EqSummary},
    data () {
      return {
        source: null
      }
    },
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
      ...mapGetters(['eqHistory', 'eqItems', 'readOnlyEqItems']),
      readOnly: function () {
        return this.slugs.length > 0
      },
      slugs: function () {
        return this.$route.query.i || []
      }
    },
    methods: {
      ...mapActions(['fetchReadOnlyEqItems']),
      getEqLink: eqItems => getEqRoute(eqItems),
      getEqItems: function () {
        console.log('getEqItems')
        // this.source = null  todo
        if (this.readOnly) {
          let vm = this
          this.fetchReadOnlyEqItems({
            slugs: typeof this.slugs === 'string' ? [this.slugs] : this.slugs,
            callback: function () {
              vm.source = vm.readOnlyEqItems
            }
          })
        } else {
          this.source = this.eqItems
        }

      }
    }
  }
</script>

<style scoped>

</style>
