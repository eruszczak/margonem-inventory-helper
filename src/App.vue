<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!--todo this must link to latest filter-->
        <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
        <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
        <router-link class="navbar-item" :to="{name: 'items'}">Porównaj przedmioty</router-link>
        <button class="button is-primary is-medium" @click="modalActive = true">
          Pokaż EQ
        </button>
        <!--<router-link class="navbar-item">Zestawy EQ</router-link>-->
      </div>
    </nav>

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
          <button class="delete" aria-label="close" @click="modalActive = false"></button>
        </header>
        <section class="modal-card-body">
          <eq></eq>
          Summary
        </section>
        <footer class="modal-card-foot">
          <button class="button">Kopiuj link</button>
          <button class="button">Zobacz szczegóły</button>
          <button class="button is-right" @click="modalActive = false">Ukryj</button>
        </footer>
      </div>
    </b-modal>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Eq from './components/Eq'

  export default {
    name: 'app',
    data () {
      return {
        modalActive: false
      }
    },
    components: {
      Eq
    },
    computed: {
      ...mapGetters([
        // map this.count to store.state.count
        'pageTitle',
        'canAddToEq'
      ])
    },
    watch: {
      pageTitle (newVal, oldVal) {
        window.document.title = newVal
      }
    },
    methods: {
      mouseOver: function (item, event) {
        console.log('hehe', item, event)
        item.isActive = true
      }
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
</style>
