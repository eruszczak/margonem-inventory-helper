<template>
  <div>
    <div class="message is-info">
      <div class="message-body">
        <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
      </div>
    </div>
    <p v-if="readOnly"><b>TYLKO DO ODCZYTU</b></p>
    <eq :readOnly="readOnly"></eq>

    <p>TYLKO DO ODCZYTU. ostatnio przeglądane zestawy {{ eqHistory.length }}:</p>
    <div class="columns">
      <div class="column" v-for="eqItems in eqHistory">
        <eq :history="eqItems" :readOnly="true"></eq>
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
        slugs: this.$route.query.i || []
      }
    },
    mounted () {
      if (this.readOnly) {
        this.slugs = typeof this.slugs === 'string' ? [this.slugs] : this.slugs
        this.fetchReadOnlyEqItems(this.slugs)
      }
    },
    computed: {
      ...mapGetters(['eqHistory']),
      readOnly: function () {
        return this.slugs.length > 0
      }
    },
    methods: {
      ...mapActions(['fetchReadOnlyEqItems']),
      getEqLink: eqItems => getEqRoute(eqItems)
    }
  }
</script>

<style scoped>

</style>
