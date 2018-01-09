<template>
  <div>
    <div class="message is-info">
      <div class="message-body">
        <p>Aby szybko stworzyć zestaw, znajdź przedmioty za pomocą wyszukiwarki powyżej oraz załóż je klikając na nie PPM.</p>
      </div>
    </div>
    <eq></eq>
    <p>ostatnio przeglądane zestawy:</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Eq from './Eq'

  export default {
    name: 'eq-view',
    components: {
      Eq
    },
    computed: {
      ...mapGetters([
        // map this.count to store.state.count
        'pageTitle',
        'canAddToEq'
      ])
    },
  }
</script>

<style scoped>

</style>
