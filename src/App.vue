<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="test">{{ pageTitle }}</router-link>
        <!--<router-link class="navbar-item">Zestawy EQ</router-link>-->
      </div>
    </nav>

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
        console.log(newVal, oldVal)
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
