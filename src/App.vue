<template>
  <div id="app">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <navbar/>
    <search/>
    <!--<transition name="fade">-->
      <router-view/>
    <!--</transition>-->
    <my-footer/>
    <eq-modal-preview/>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Search from './components/item/Search'
  import MyFooter from './components/includes/Footer'
  import Navbar from './components/includes/Navbar'
  import EqModalPreview from './components/eq/EqModalPreview'
  import { vueTopprogress } from 'vue-top-progress'

  export default {
    name: 'app',
    data () {
      return {
        toggleValue: this.canAddToEq
      }
    },
    mounted () {
      this.setEqItemsStats()
      this.$refs.topProgress.start()
      // Use setTimeout for demo
      setTimeout(() => {
        this.$refs.topProgress.done()
      }, 1000)
    },
    components: {Search, MyFooter, EqModalPreview, Navbar, vueTopprogress},
    computed: {
      ...mapGetters(['pageTitle', 'canAddToEq', 'isLoading'])
    },
    watch: {
      pageTitle (newVal, oldVal) {
        window.document.title = newVal
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
