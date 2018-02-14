<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </router-link>
      <button class="button navbar-burger" @click="toggleNavbarMenuIsActive">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="navbar-menu" :class="{'is-active': navbarMenuIsActive}">
      <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
      <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
      <router-link class="navbar-item" :to="{name: 'aboutView'}">O stronie</router-link>
      <!--<router-link class="navbar-item" :to="{name: 'itemCompareView'}">Porównaj</router-link>-->
      <div class="navbar-item field is-grouped is-grouped-multiline" style="justify-content: center">
        <p class="control">
          <a class="button is-info" :class="{'is-active': modalActive}" @click="toggleModal">
            <span v-if="!modalActive">Podgląd EQ</span>
            <span v-else>Ukryj podgląd</span>
          </a>
        </p>
        <div class="field has-addons control">
          <div class="control">
            <my-input :value="searchQuery" @input="setSearchQuery" placeholder="Szukaj przedmiotów"/>
          </div>
          <div class="control">
            <button v-if="searchQuery" class="button" @click="setSearchQuery('')">Wyczyść</button>
          </div>
        </div>
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
    computed: {
      ...mapGetters(['searchQuery', 'modalActive', 'navbarMenuIsActive'])
    },
    methods: {
      ...mapMutations(['toggleModal', 'toggleCanAddToEq', 'setSearchQuery', 'toggleNavbarMenuIsActive'])
    }
  }
</script>

<style scoped>

</style>
