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
</style>
