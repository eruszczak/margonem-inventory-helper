<template>
  <div id="app">
    <navbar/>
    <search/>
    <div class="container mt1 mb1">
      <msg v-if="isAPIError" type="is-danger">Wystąpił jakiś błąd. Spróbuj ponownie wkrótce</msg>
    </div>
    <router-view/>
    <my-footer/>
    <eq-modal-preview/>
    <vue-progress-bar/>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Search from './components/item/Search'
  import MyFooter from './components/includes/Footer'
  import Navbar from './components/includes/Navbar'
  import EqModalPreview from './components/eq/EqModalPreview'

  export default {
    name: 'app',
    data () {
      return {
        // toggleValue: this.canAddToEq
      }
    },
    created () {
      this.setEqItemsStats()
      this.$router.beforeEach((to, from, next) => {
        window.scrollTo(0, 0)
        this.$Progress.start()
        this.hideMenu()
        this.closeModal()
        this.setAPIError(false)
        next()
      })
    },
    components: {Search, MyFooter, EqModalPreview, Navbar},
    computed: {
      ...mapGetters(['pageTitle', 'canAddToEq', 'isLoading', 'isAPIError'])
    },
    watch: {
      pageTitle (newVal, oldVal) {
        window.document.title = newVal
      }
    },
    methods: {
      ...mapMutations(['setEqItemsStats', 'closeModal', 'hideMenu', 'closeModal', 'setAPIError']),
      mouseOver: function (item, event) {
        item.isActive = true
      }
    }
  }
</script>

<style>
  .modal-card, .modal-card-body, .modal-content {
  overflow: visible;
  }

  @media screen and (min-width: 1024px) {
    a.navbar-item.is-active, a.navbar-link.is-active {
      color: hsl(204, 86%, 53%) !important;
    }
  }

  .modal-card-body {
    overflow-x: hidden;
  }

  .modal-content, .modal-card {
    overflow: hidden;
    max-height: calc(100vh - 40px);
    margin: 0 auto;
  }

  .notification {
    padding: 1rem;
  }
</style>
