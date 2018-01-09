<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!--todo this must link to latest filter-->
        <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
        <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
        <router-link class="navbar-item" :to="{name: 'items'}">Porównaj przedmioty</router-link>
        <!--<router-link class="navbar-item">Zestawy EQ</router-link>-->
      </div>
    </nav>

    <div class="message is-success">
      <div class="message-body">
        <p>W tej strefie itemy po kliknięciu na nie PPM zostaną dodane do porównywarki</p>
      </div>
    </div>

    <!--<section class="section">-->
      <!--<div class="container">-->
        <router-view></router-view>
      <!--</div>-->
    <!--</section>-->
    <eq></eq>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Eq from './components/Eq'

  export default {
    name: 'app',
    data () {
      return {
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
