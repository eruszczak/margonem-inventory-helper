<template>
  <div id="app">
    <navbar/>
    <search/>
    <!--<transition name="fade"><router-view/></transition>-->
    <router-view/>
    <my-footer/>
    <eq-modal-preview/>
    <vue-progress-bar></vue-progress-bar>
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
    mounted () {
      this.$Progress.finish()
    },
    created () {
      this.setEqItemsStats()
      this.$Progress.start()
      this.$router.beforeEach((to, from, next) => {
        window.scrollTo(0, 0)
        this.$Progress.start()
        this.hideMenu()
        this.closeModal()
        next()
      })
    },
    components: {Search, MyFooter, EqModalPreview, Navbar},
    computed: {
      ...mapGetters(['pageTitle', 'canAddToEq', 'isLoading'])
    },
    watch: {
      pageTitle (newVal, oldVal) {
        window.document.title = newVal
      }
    },
    methods: {
      ...mapMutations(['setEqItemsStats', 'closeModal', 'hideMenu', 'closeModal']),
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

  .modal-content, .modal-card {
    overflow: hidden;
    max-height: calc(100vh - 40px);
    /*padding: 5px;*/
    margin: 0 auto;
  }

  /*.modal-card {*/
    /*top: 2em;*/
  /*}*/

  .notification {
    padding: 1rem;
  }
</style>
