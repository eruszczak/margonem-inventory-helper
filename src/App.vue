<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
        <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
        <router-link class="navbar-item" :to="{name: 'itemCompareView'}">Porównaj</router-link>
        <a class="button is-primary is-medium" :class="{'is-active': modalActive}" @click="modalActive = !modalActive">Pokaż EQ</a>
        <b-switch class="navbar-item" :value="canAddToEq" @input="toggleCanAddToEq">
          {{ canAddToEq ? 'Do eq' : 'Do porównywarki'}}
        </b-switch>
        <b-input v-model="query"></b-input>
      </div>
    </nav>
    <search :modalActive="modalActive"></search>
    <!--<transition name="fade">-->
      <router-view></router-view>
    <!--</transition>-->
    <footer></footer>

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
  import Eq from './components/eq/Eq'
  import Item from './components/item/Item'
  import Search from './components/item/Search'
  import RestoreEq from './components/eq/RestoreEq'
  import EqModal from './components/eq/EqModal'
  import Footer from './components/ui/Footer'
  import { getEqUrl } from './utils/helpers'
  import { toast } from './mixins/toast'

  export default {
    name: 'app',
    data () {
      return {
        modalActive: false,
        toggleValue: this.canAddToEq
      }
    },
    created () {
      this.setEqItemsStats()
    },
    components: {Eq, Item, RestoreEq, EqModal, Search, Footer},
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
      }
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

  /*.media-content {*/
    /*margin-top: -15px;*/
  /*}*/
</style>
