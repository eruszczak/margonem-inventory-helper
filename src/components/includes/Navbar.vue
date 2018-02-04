<template>
  <!--<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">-->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </router-link>
      <button class="button navbar-burger" @click="isActive = !isActive">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="navbar-menu" :class="{'is-active': isActive}">
      <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
      <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
      <!--<router-link class="navbar-item" :to="{name: 'itemCompareView'}">Porównaj</router-link>-->
      <div class="navbar-item field is-grouped is-grouped-multiline" style="justify-content: center">
      <p class="control">
        <a class="button is-info" :class="{'is-active': modalActive}" @click="toggleModal">Pokaż EQ</a>
      </p>
        <p class="control">
          <my-input :value="searchQuery" @input="setSearchQuery" placeholder="Szukaj przedmiotów"/>
        </p>
      </div>
      <!--<toggle class="navbar-item" :value="canAddToEq" @input="toggleCanAddToEq">-->
      <!--{{ canAddToEq ? 'Do eq' : 'Do porównywarki'}}-->
      <!--</toggle>-->
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'navbar',
    data () {
      return {
        isActive: false
      }
    },
    computed: {
      ...mapGetters(['searchQuery', 'modalActive'])
    },
    methods: {
      ...mapMutations(['toggleModal', 'toggleCanAddToEq', 'setSearchQuery'])
    }
  }
</script>

<style scoped>

</style>
