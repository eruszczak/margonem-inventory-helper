<template>
  <modal :active.sync="modalActive" :onCancel="closeModal" :top="top" :cardHeight="cardHeight">
    <template slot="header">
      <p class="modal-card-title has-text-centered">Mój zestaw EQ</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </template>
    <template slot="body">
      <div class="content has-text-centered">
        <eq :source="eqItems" darkBorder/>
        <eq-modal :source="eqItemsStats"/>
      </div>
    </template>
    <template slot="footer">
      <clipboard :content="getEqLink(eqItems)" value="Kopiuj link"/>
      <router-link class="button" :to="{name: 'eqView'}" @click.native="closeModal">Zobacz szczegóły</router-link>
      <restore-eq/>
    </template>
  </modal>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Eq from '../eq/Eq'
  import RestoreEq from '../eq/RestoreEq'
  import EqModal from '../eq/EqModal'
  import Clipboard from '../includes/Clipboard'
  import { eqLink } from '../mixins/eqLink'

  const NAV_HEIGHT = 52
  const SEARCH_HEIGHT = 48
  const MOBILE_MENU_HEIGHT = 148

  export default {
    name: 'eq-modal-preview',
    components: {Eq, RestoreEq, EqModal, Clipboard},
    mixins: [eqLink],
    computed: {
      ...mapGetters(['modalActive', 'eqItemsStats', 'eqItems', 'navbarMenuIsActive', 'searchQuery']),
      top: function () {
        let height = NAV_HEIGHT
        if (this.navbarMenuIsActive) {
          height += MOBILE_MENU_HEIGHT
        }
        if (this.searchQuery) {
          height += SEARCH_HEIGHT
        }
        return height
      },
      cardHeight () {
        const standardOffset = 40
        return standardOffset + this.top
      }
    },
    methods: {
      ...mapMutations(['closeModal'])
    }
  }
</script>

<style>
</style>
