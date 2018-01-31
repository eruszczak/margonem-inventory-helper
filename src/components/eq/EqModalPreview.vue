<template>
  <modal :active.sync="modalActive">
    <div class="modal-background"></div>
    <!--<div class="modal-card" style="overflow-y: visible;overflow-x: hidden;margin-top: 60px;">-->
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-centered">Mój zestaw EQ</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="content has-text-centered">
          <eq :source="eqItems" :darkBorder.native="true"></eq>
          <eq-modal :source="eqItemsStats"></eq-modal>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" v-clipboard:copy="eqLink" v-clipboard:success="onCopy">Kopiuj link</button>
        <router-link class="button" :to="{name: 'eqView'}" @click.native="closeModal">Zobacz szczegóły</router-link>
        <restore-eq></restore-eq>
      </footer>
    </div>
  </modal>
</template>

<script>
  import { toast } from '../../mixins/toast'
  import { mapGetters, mapMutations } from 'vuex'
  import { getEqUrl } from '../../utils/helpers'
  import Eq from '../eq/Eq'
  import RestoreEq from '../eq/RestoreEq'
  import EqModal from '../eq/EqModal'

  export default {
    name: 'eq-modal-preview',
    mixins: [toast],
    components: {Eq, RestoreEq, EqModal},
    computed: {
      ...mapGetters(['modalActive', 'eqItemsStats', 'eqItems']),
      eqLink: function () {
        return getEqUrl(this.$router, this.eqItems)
      }
    },
    methods: {
      ...mapMutations(['closeModal']),
      onCopy: e => {
        this.success('Skopiowano do schowka')
      }
    }
  }
</script>

<style scoped>

</style>
