<template>
  <div id="app">
    <navbar/>
    <search/>
    <transition name="fade">
      <router-view/>
    </transition>
    <footer/>
    <eq-modal-preview/>
    <loading :active.sync="isLoading"/>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Search from './components/item/Search'
  import Footer from './components/ui/Footer'
  import Navbar from './components/ui/Navbar'
  import EqModalPreview from './components/eq/EqModalPreview'

  export default {
    name: 'app',
    data () {
      return {
        toggleValue: this.canAddToEq
      }
    },
    created () {
      this.setEqItemsStats()
    },
    components: {Search, Footer, EqModalPreview, Navbar},
    computed: {
      ...mapGetters(['pageTitle', 'canAddToEq', 'isLoading'])
    },
    watch: {
      pageTitle (newVal, oldVal) {
        window.document.title = newVal
      },
      '$route' (to, from) {
        // do this .beforeRoute (just like scrolling)
        console.log('route to', to)
        this.closeModal()
      }
    },
    methods: {
      ...mapMutations(['setEqItemsStats', 'closeModal']),
      mouseOver: function (item, event) {
        item.isActive = true
      }
    }
  }
</script>

<style>
  /*.modal-card, .modal-card-body, .modal-content {*/
  /*overflow: visible;*/
  /*}*/

  @media screen and (min-width: 1024px) {
    a.navbar-item.is-active, a.navbar-link.is-active {
      color: hsl(204, 86%, 53%) !important;
    }
  }

  .modal-card-body {
    overflow-x: hidden;
  }

  .modal-card {
    max-height: calc(100vh - 100px);
  }

  /*.modal .animation-content .modal-card {*/
    /*margin-top: 50px;*/
  /*}*/

  .is-primary {
    background-color: hsl(204, 86%, 53%) !important;
  }

  .search-items {
    margin-top: 60px;
  }

  .search-items-modal {
    position: fixed;
    z-index: 1000;
  }
</style>
