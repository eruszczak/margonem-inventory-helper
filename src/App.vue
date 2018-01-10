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
        <!--<router-link class="navbar-item">Zestawy EQ</router-link>-->
      </div>
    </nav>
    <div class="field">

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
  import { getEqUrl } from './utils/helpers'

  export default {
    name: 'app',
    data () {
      return {
        modalActive: false,
        isSwitchedCustom: 'Yes',
        toggleValue: this.canAddToEq
      }
    },
    components: {
      Eq
    },
    computed: {
      ...mapGetters([
        'pageTitle',
        'canAddToEq',
        'eqItems'
      ]),
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
        alert('You just copied: ' + e.text)
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

  .modal-card, .modal-card-body, .modal-content {
    overflow: visible;
  }
</style>
