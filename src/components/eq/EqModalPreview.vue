<template>
  <modal :active.sync="modalActive" :onCancel="closeModal" :top="top">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-centered">Mój zestaw EQ</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="content has-text-centered">
          <eq :source="eqItems" :darkBorder.native="true"/>
          <eq-modal :source="eqItemsStats"/>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" v-clipboard:copy="eqLink" v-clipboard:success="onCopy">Kopiuj link</button>
        <router-link class="button" :to="{name: 'eqView'}" @click.native="closeModal">Zobacz szczegóły</router-link>
        <restore-eq/>
      </footer>
    </div>
  </modal>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { getEqUrl } from '../../utils/helpers'
  import Eq from '../eq/Eq'
  import RestoreEq from '../eq/RestoreEq'
  import EqModal from '../eq/EqModal'

  const NAV_HEIGHT = 52
  const SEARCH_HEIGHT = 48
  const MOBILE_MENU_HEIGHT = 148

  export default {
    name: 'eq-modal-preview',
    components: {Eq, RestoreEq, EqModal},
    computed: {
      ...mapGetters(['modalActive', 'eqItemsStats', 'eqItems', 'navbarMenuIsActive', 'searchQuery']),
      eqLink: function () {
        return getEqUrl(this.$router, this.eqItems)
      },
      top: function () {
        let height = NAV_HEIGHT
        if (this.navbarMenuIsActive) {
          height += MOBILE_MENU_HEIGHT
        }
        if (this.searchQuery) {
          height += SEARCH_HEIGHT
        }
        return `${height}px`
      }
    },
    methods: {
      ...mapMutations(['closeModal']),
      onCopy (e) {
        this.$toast.info('Skopiowano do schowka')
      }
    }
  }
</script>

<style>
</style>
