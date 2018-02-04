<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{name: 'items'}">Przedmioty</router-link>
      <router-link class="navbar-item" :to="{name: 'eqView'}">Zestawy EQ</router-link>
      <!--<router-link class="navbar-item" :to="{name: 'itemCompareView'}">Porównaj</router-link>-->
      <a class="button is-info is-medium" :class="{'is-active': modalActive}" @click="toggleModal">Pokaż EQ</a>
      <!--<toggle class="navbar-item" :value="canAddToEq" @input="toggleCanAddToEq">-->
      <!--{{ canAddToEq ? 'Do eq' : 'Do porównywarki'}}-->
      <!--</toggle>-->
      <my-input :value="searchQuery" @input="setSearchQuery" placeholder="Szukaj przedmiotów"></my-input>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'navbar',
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
