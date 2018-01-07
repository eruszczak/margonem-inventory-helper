<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ $route.params.type }}
          </h1>
          <h2 class="subtitle">
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
          <nav class="tabs is-boxed">
            <ul>
              <!--<li v-for="item in itemTypes" @mouseover="mouseOver(item, $event)"><a>{{ item.name }}</a></li>-->
              <li v-for="item in menu" :key="item.name" @mouseover="mouseOver(item, $event)" v-bind:class="{'is-active': item.isActive }">
                <a>{{ item.name }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-tabs">
          <router-link class="navbar-item is-tab" v-for="item in subMenu" :key="item.displayValue" :to="item.href">
            {{ item.displayValue }}
          </router-link>
        </div>
      </div>
    </nav>
    <!--<div v-for="item in items">{{ item }}</div>-->
    <div class="items">
      <item v-for="item in items" :key="item.pk" :data="item"></item>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { MAP_TYPE_NAME_TO_ID, MENU_LINKS } from '../utils/navbar'
  import Item from './Item'

  export default {
    name: 'items',
    components: {
      Item
    },
    data: function () {
      return {
        menu: MENU_LINKS,
        subMenu: []
      }
    },
    computed: {
      // mix this into the outer object with the object spread operator
      ...mapGetters([
        // map this.count to store.state.count
        'items',
        'pageTitle'
      ])
    },
    created () {
      // TODO need to make navbar active
      this.updateItems()
    },
    watch: {
      '$route' (to, from) {
        this.updateItems()
      }
    },
    methods: {
      mouseOver: function (item, event) {
        this.menu.map((el) => {
          el.isActive = false
        })
        item.isActive = true
        this.subMenu = item.sublinks
      },
      updateItems: function () {
        const query = `?t=${MAP_TYPE_NAME_TO_ID[this.$route.params.type]}`
        this.fetchItems({
          query: query
        })
        this.setPageTitle({ text: query })
      },
      ...mapMutations([
        'setPageTitle'
      ]),
      ...mapActions([
        'fetchItems'
      ])
    }
  }
</script>

<style scoped>

</style>
