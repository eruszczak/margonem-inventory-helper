<template>
  <button :disabled="!realStackLength" class="button is-dark" @click="restore">Cofnij zmianę ({{ realStackLength }})</button>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'restore-eq',
    computed: {
      ...mapGetters(['realStackLength'])
    },
    methods: {
      ...mapActions(['restoreEqItem']),
      restore: function () {
        this.$toast.info('Cofnięto zmianę')
        this.restoreEqItem()
      }
    }
  }
</script>

<style scoped>

</style>
