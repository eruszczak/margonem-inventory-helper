<template>
  <div>
    <!--<eq></eq>-->
    <p>ostatnio przeglądane:</p>
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
