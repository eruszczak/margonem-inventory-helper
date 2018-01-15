<template>
  <button :disabled="!realStackLength" class="button is-dark" @click="restore">Cofnij zmianę ({{ realStackLength }})</button>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { toast } from '../mixins/toast'

  export default {
    name: 'restore-eq',
    mixins: [toast],
    computed: {
      ...mapGetters(['realStackLength'])
    },
    methods: {
      ...mapActions(['restoreEqItem']),
      restore: function () {
        this.success('Cofnięto zmianę')
        this.restoreEqItem()
      }
    }
  }
</script>

<style scoped>

</style>
