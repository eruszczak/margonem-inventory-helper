<template>
  <button :disabled="!realStackLength" class="button" :class="[size, type]" @click="restore">Cofnij zmianę ({{ realStackLength }})</button>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'restore-eq',
    props: ['size', 'type'],
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
