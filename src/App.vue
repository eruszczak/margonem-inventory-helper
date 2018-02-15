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
  import { mapGetters, mapMutations, mapActions } from 'vuex'
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
      this.FETCH_HELPERS()
    },
    created () {
      this.setEqItemsStats()
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start()
        this.hideMenu()
        this.closeModal()
        this.setAPIError(false)
        next()
      })
    },
    components: {Search, MyFooter, EqModalPreview, Navbar},
    computed: {
      ...mapGetters(['canAddToEq', 'isLoading', 'isAPIError'])
    },
    methods: {
      ...mapMutations(['setEqItemsStats', 'closeModal', 'hideMenu', 'closeModal', 'setAPIError']),
      ...mapActions(['FETCH_HELPERS']),
      mouseOver: function (item, event) {
        item.isActive = true
      }
    }
  }
</script>

<style>
</style>
