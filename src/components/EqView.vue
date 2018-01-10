<template>
  <div>
    <div class="message is-info">
      <div class="message-body">
        <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
      </div>
    </div>
    <eq :readOnly="slugs.length > 0"></eq>
    <p>ostatnio przeglądane zestawy:</p>
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
        this.fetchReadOnlyEqItems(this.slugs)
      }
    },
    computed: {
      ...mapGetters([
        // 'pageTitle',
        // 'canAddToEq'
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
