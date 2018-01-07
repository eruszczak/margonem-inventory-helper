<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ $route.params.type }}
          </h1>
          <h2 class="subtitle">
            {{ MENU_LINKS }}
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
          <nav class="tabs is-boxed">
            <ul>
              <!--<li v-for="item in itemTypes" @mouseover="mouseOver(item, $event)"><a>{{ item.name }}</a></li>-->
              <li v-for="item in menu" @mouseover="mouseOver(item, $event)" v-bind:class="{'is-active': item.isActive }">
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
          <router-link class="navbar-item is-tab" v-for="item in subMenu" :to="item.href">
            {{ item.displayValue }}
          </router-link>
        </div>
      </div>
    </nav>
    <div v-for="item in items">{{ item }}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { MENU_LINKS } from '../utils/navbar'
  export default {
    name: 'items',
    data: function () {
      return {
        menu: MENU_LINKS,
        subMenu: [],
      }
    },
    computed: {
      // mix this into the outer object with the object spread operator
      ...mapGetters([
        // map this.count to store.state.count
        'items'
      ]),
      // count () {
      //   return this.$store.state.count
      // }
    },
    watch: {
      '$route' (to, from) {
        console.log(to, from);
        this.$store.dispatch('fetchItems', {
          type: this.$route.params.type
        })
      }
    },
    methods: {
      mouseOver: function (item, event) {
        console.log('hehe', item, event);
        this.menu.map((el) => {
          el.isActive = false
        })
        item.isActive = true
        this.subMenu = item.sublinks
        // console.log(this.subTypes)
      },
      // ...mapActions([
      //   // Mounts the "setNumberToRemoteValue" action to `this.setNumberToRemoteValue()`.
      //   'fetchItems',
      // ])
      // mouseOver2: function (item, event) {
      //   // console.log('hehe', item, event);
      //   this.subTypes.map((el) => {
      //     el.active = false
      //   })
      //   item.isActive = true
      //   // this.subTypes = item.subTypes
      //   // console.log(this.subTypes)
      // }
    }
  }
</script>

<style scoped>

</style>
