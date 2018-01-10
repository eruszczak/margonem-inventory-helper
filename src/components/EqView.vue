<template>
  <div>
    <div class="message is-info">
      <div class="message-body">
        <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
      </div>
    </div>
    <eq :readOnly="slugs.length > 0"></eq>
    <p>ostatnio przeglądane zestawy:</p>
    <div class="columns">
      <div class="column is-one-quarter" v-for="eqItems in eqHistory">
        <eq :history="eqItems" :readOnly="true"></eq>
      </div>
    </div>
    <!--<p v-for="item in eqHistory">{{ item }}</p>-->
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Eq from './Eq'

  export default {
    name: 'eq-view',
    components: {
      Eq
    },
    data () {
      return {
        slugs: this.$route.query.i || []
      }
    },
    mounted () {
      if (this.slugs) {
        console.error(this.slugs)
        this.slugs = typeof this.slugs === 'string' ? [this.slugs] : this.slugs
        this.fetchReadOnlyEqItems(this.slugs)
      }
    },
    computed: {
      ...mapGetters([
        // 'pageTitle',
        // 'canAddToEq'
        'eqHistory'
      ])
    },
    methods: {
      ...mapActions([
        'fetchReadOnlyEqItems'
      ])
    }
  }
</script>

<style scoped>

</style>
