<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
        <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
        <router-link class="navbar-item" :to="{name: 'itemCompareView'}">Porównaj</router-link>
        <a class="button is-primary is-medium" :class="{'is-active': modalActive}" @click="toggleModal">Pokaż EQ</a>
        <toggle class="navbar-item" :value="canAddToEq" @input="toggleCanAddToEq">{{ canAddToEq ? 'Do eq' : 'Do porównywarki'}}</toggle>
        <b-input :value="searchQuery" @input="setSearchQuery"></b-input>
      </div>
    </nav>
    <!--todo-->
    <search></search>
    <!--<transition name="fade">-->
      <router-view></router-view>
    <!--</transition>-->
    <footer></footer>
    <eq-modal-preview></eq-modal-preview>

    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Search from './components/item/Search'
  import Footer from './components/ui/Footer'
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
    components: {Search, Footer, EqModalPreview},
    computed: {
      ...mapGetters(['pageTitle', 'canAddToEq', 'isLoading', 'searchQuery', 'modalActive'])
    },
    watch: {
      pageTitle (newVal, oldVal) {
        window.document.title = newVal
      },
      '$route' (to, from) {
        // todo
        console.log('route to', to)
        this.closeModal()
      }
    },
    methods: {
      ...mapMutations(['toggleCanAddToEq', 'setEqItemsStats', 'setSearchQuery', 'closeModal', 'toggleModal']),
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
  .vue-simple-spinner{transition:all .3s linear}@keyframes vue-simple-spinner-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}
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

  .modal .animation-content .modal-card {
    /*margin-top: 50px;*/
  }

  .is-primary {
    background-color: hsl(204, 86%, 53%) !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .search-items {
    margin-top: 60px;
  }

  .search-items-modal {
    position: fixed;
    z-index: 1000;
  }

  /*.media-content {*/
    /*margin-top: -15px;*/
  /*}*/
</style>
