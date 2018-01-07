<template>
  <div id="app">

    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!--<a class="navbar-item" href="https://bulma.io">-->
          <!--<img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"-->
               <!--width="112" height="28">-->
        <!--</a>-->
        <router-link class="navbar-item" to="test">{{ pageTitle }}</router-link>
        <!--<router-link class="navbar-item">Zestawy EQ</router-link>-->
      </div>
    </nav>

    <!--<section class="section">-->
      <!--<div class="container">-->
        <router-view></router-view>
      <!--</div>-->
    <!--</section>-->

    <!--<section class="section">-->
      <!--<div class="container">-->
        <!--<h1 class="title">Section</h1>-->
        <!--<h2 class="subtitle">-->
          <!--A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading-->
        <!--</h2>-->
      <!--</div>-->
    <!--</section>-->



    <!-- <b-switch v-model="switchState">{{ switchState }}</b-switch>
    <hr>

    <b-checkbox v-model="checkboxState">{{ checkboxState }}</b-checkbox>
    <hr>

    <button class="button is-primary" @click="$toast.open('This is a Toast')">
        Show Toast
    </button>
    <button class="button is-primary" @click="$snackbar.open('This is a Snackbar')">
        Show Snackbar
    </button>
    <hr>

    <b-field>
        <b-input maxlength="25" placeholder="Your name"></b-input>
    </b-field> -->
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        itemTypes: [
          {name: 'Bronie', isActive: false, href: '', subTypes: []},
          {name: 'Zbroje', isActive: false},
        ]
      }
    },
    computed: {
      ...mapGetters([
        // map this.count to store.state.count
        'pageTitle'
      ]),
      // count () {
      //   return this.$store.state.count
      // }
    },
    // computed: {
    //   ...mapGetters([
    //     // Mounts the "safelyStoredNumber" getter to the scope of your component.
    //     'safelyStoredNumber'
    //   ])
    // },
    watch: {
      pageTitle (newVal, oldVal) {
        console.log(newVal, oldVal)
        window.document.title = newVal
      }
    },
    methods: {
      mouseOver: function (item, event) {
        console.log('hehe', item, event);
        item.isActive = true;
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
