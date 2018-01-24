<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
        <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
        <router-link class="navbar-item" :to="{name: 'items'}">Porównaj przedmioty</router-link>
        <a class="button is-primary is-medium" :class="{'is-active': modalActive}" @click="modalActive = !modalActive">Pokaż EQ</a>
        <b-switch class="navbar-item" :value="canAddToEq" @input="toggleCanAddToEq">
          {{ canAddToEq ? 'Do eq' : 'Do porównywarki'}}
        </b-switch>
        <b-input v-model="query"></b-input>
      </div>
    </nav>

    <transition name="fade">
      <div class="search-items has-text-centered is-clearfix" :class="{'search-items-modal': modalActive}" v-if="query">
        <div v-if="searching"><div class="vue-simple-spinner" style="margin: 0px auto; border-radius: 100%; border-width: 3px; border-style: solid; border-color: rgb(33, 150, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-image: initial; width: 42px; height: 42px; animation: vue-simple-spinner-spin 0.8s linear infinite;"></div> <!----></div>
        <item v-else-if="searchResults.length" v-for="item in searchResults" :key="item.pk" :data="item" :action="rmbActions.add"></item>
        <b-message v-else-if="noResults" type="is-warning">
          Nie znaleziono pasujących przedmiotów.
        </b-message>
      </div>
    </transition>

    <transition name="fade">
      <router-view></router-view>
    </transition>
    <section class="hero is-light">
      <div class="hero-body" style="padding:2em">
        <div class="container has-text-centered">
          Grafiki przedmiotów należą do <a href="http://garmory.pl/" target="_blank">Garmory sp. z o.o.</a>
        </div>
      </div>
    </section>

    <b-modal :active.sync="modalActive">
      <div class="modal-background"></div>
      <!--<div class="modal-card" style="overflow-y: visible;overflow-x: hidden;margin-top: 60px;">-->
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">Mój zestaw EQ</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="content has-text-centered">
            <eq :source="eqItems"></eq>
            <eq-modal :source="eqItemsStats"></eq-modal>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" v-clipboard:copy="eqLink" v-clipboard:success="onCopy">Kopiuj link</button>
          <router-link class="button" :to="{name: 'eqView'}" @click.native="closeModal">Zobacz szczegóły</router-link>
          <restore-eq></restore-eq>
        </footer>
      </div>
    </b-modal>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Eq from './components/Eq'
  import Item from './components/Item'
  import RestoreEq from './components/includes/RestoreEq'
  import EqModal from './components/EqModal'
  import { getEqUrl } from './utils/helpers'
  import { toast } from './mixins/toast'
  import debounce from 'lodash/debounce'
  import { searchItems } from './api/items'
  import { RIGHT_CLICK_MAPPER } from './utils/constants'

  export default {
    name: 'app',
    data () {
      let search = localStorage.getItem('search')
      if (search) {
        search = JSON.parse(search)
        this.query = search.query
        this.results = search.results
      }
      return {
        modalActive: false,
        toggleValue: this.canAddToEq,
        query: search ? search.query : '',
        searchResults: search ? search.results : [],
        rmbActions: RIGHT_CLICK_MAPPER,
        searching: false,
        noResults: false
      }
    },
    created () {
      this.setEqItemsStats()
    },
    components: {Eq, Item, RestoreEq, EqModal},
    mixins: [toast],
    computed: {
      ...mapGetters(['pageTitle', 'canAddToEq', 'eqItems', 'isLoading', 'eqItemsStats']),
      eqLink: function () {
        return getEqUrl(this.$router, this.eqItems)
      }
    },
    watch: {
      pageTitle (newVal, oldVal) {
        window.document.title = newVal
      },
      '$route' (to, from) {
        this.closeModal()
      },
      query: function (value) {
        this.noResults = false
        this.search()
      }
    },
    methods: {
      ...mapMutations(['toggleCanAddToEq', 'setEqItemsStats']),
      mouseOver: function (item, event) {
        item.isActive = true
      },
      closeModal: function () {
        this.modalActive = false
      },
      onCopy: function (e) {
        this.success('Skopiowano do schowka')
      },
      search: debounce(
        function () {
          if (!this.query) {
            this.searchResults = []
            localStorage.removeItem('search')
            return
          }
          if (this.query.length < 3) {
            return
          }

          this.searching = true
          let vm = this
          searchItems(this.query, response => {
            vm.searchResults = response.data.results
            vm.searching = false
            if (vm.searchResults.length) {
              localStorage.setItem('search', JSON.stringify({
                'query': this.query,
                'results': vm.searchResults
              }))
            } else {
              vm.noResults = true
            }
          }, error => {
            console.error(error)
          })
        },
        300
      )
    }
  }
</script>

<style>
  /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  /*}*/

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

  /*.footer {*/
    /*position: absolute;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*padding: 1rem;*/
    /*background-color: #efefef;*/
    /*text-align: center;*/
  /*}*/
</style>
