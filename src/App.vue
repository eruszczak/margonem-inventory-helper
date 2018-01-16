<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
        <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
        <router-link class="navbar-item" :to="{name: 'items'}">Porównaj przedmioty</router-link>
        <a class="button navbar-item is-primary is-medium" @click="modalActive = !modalActive">Pokaż EQ</a>
        <b-switch class="navbar-item" :value="canAddToEq" @input="toggleCanAddToEq">
          {{ canAddToEq ? 'Do eq' : 'Do porównywarki'}}
        </b-switch>
        <b-input v-model="query"></b-input>
      </div>
    </nav>
    <div class="items">
      <item v-for="item in searchResults" :key="item.pk" :data="item" :action="rmbActions.add"></item>
    </div>

    <router-view></router-view>

    <b-modal :active.sync="modalActive">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Mój zestaw EQ</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <eq :source="eqItems"></eq>
          Summary
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
  import RestoreEq from './components/RestoreEq'
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
        rmbActions: RIGHT_CLICK_MAPPER
      }
    },
    created () {
      this.setEqItemsStats()
    },
    components: {Eq, Item, RestoreEq},
    mixins: [toast],
    computed: {
      ...mapGetters(['pageTitle', 'canAddToEq', 'eqItems', 'isLoading']),
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
          // this.loading = true
          var vm = this
          searchItems(this.query, response => {
            vm.searchResults = response.data.results
            localStorage.setItem('search', JSON.stringify({
              'query': this.query,
              'results': vm.searchResults
            }))
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .modal-card, .modal-card-body, .modal-content {
    overflow: visible;
  }

  @media screen and (min-width: 1024px) {
    a.navbar-item.is-active, a.navbar-link.is-active {
      color: hsl(204, 86%, 53%) !important;
    }
  }

  .is-primary {
    background-color: hsl(204, 86%, 53%) !important;
  }
</style>
