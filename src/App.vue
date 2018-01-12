<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!--todo this must link to latest filter-->
        <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
        <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
        <router-link class="navbar-item" :to="{name: 'items'}">Porównaj przedmioty</router-link>
        <a class="button navbar-item is-primary is-medium" @click="modalActive = !modalActive">Pokaż EQ</a>
        <b-switch class="navbar-item" :value="canAddToEq" @input="toggleCanAddToEq">
          {{ canAddToEq ? 'Do eq' : 'Do porównywarki'}}
        </b-switch>
        <b-input v-model="query"></b-input>
        <!--<router-link class="navbar-item">Zestawy EQ</router-link>-->
      </div>
    </nav>
    <div class="items">
      <item v-for="item in searchResults" :key="item.pk" :data="item" :action="rmbActions.add"></item>
    </div>
    <!--<section class="section">-->
      <!--<div class="container">-->
        <router-view></router-view>
      <!--</div>-->
    <!--</section>-->

    <b-modal :active.sync="modalActive">
      <!--<p class="image is-4by3">-->
        <!--<img src="static/img/placeholder-1280x960.png">-->
      <!--</p>-->
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Mój zestaw EQ</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <eq></eq>
          Summary
        </section>
        <footer class="modal-card-foot">
          <button class="button" v-clipboard:copy="eqLink" v-clipboard:success="onCopy">Kopiuj link</button>
          <router-link class="button" :to="{name: 'eqView'}">Zobacz szczegóły</router-link>
        </footer>
      </div>
    </b-modal>

  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Eq from './components/Eq'
  import Item from './components/Item'
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
        searchResults: search ? search.results : []
      }
    },
    components: {
      Eq,
      Item
    },
    mixins: [toast],
    computed: {
      ...mapGetters([
        'pageTitle',
        'canAddToEq',
        'eqItems'
      ]),
      eqLink: function () {
        return getEqUrl(this.$router, this.eqItems)
      },
      rmbActions: () => RIGHT_CLICK_MAPPER
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
      ...mapMutations([
        'toggleCanAddToEq'
      ]),
      mouseOver: function (item, event) {
        console.log('hehe', item, event)
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
          console.log('search', this.query)
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
        // This is the number of milliseconds we wait for the user to stop typing.
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
</style>
