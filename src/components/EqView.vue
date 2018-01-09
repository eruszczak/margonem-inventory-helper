<template>
  <eq></eq>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Eq from './components/Eq'

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
