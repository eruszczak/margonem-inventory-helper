<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ type }}
          </h1>
          <h2 class="subtitle">
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
          <nav class="tabs is-boxed">
            <ul>
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
    <div class="items">
      <item v-for="item in items" :key="item.pk" :data="item" :action="rmbActions.add"></item>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { MAP_TYPE_NAME_TO_ID, MENU_LINKS } from '../utils/navbar'
  import Item from './Item'
  import { toast } from '../mixins/toast'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'
  import { fetchItems } from '../api/items'

  export default {
    name: 'items',
    components: {
      Item
    },
    mixins: [toast],
    props: ['type'],
    data: function () {
      return {
        menu: MENU_LINKS,
        subMenu: [],
        items: [],
        rmbActions: RIGHT_CLICK_MAPPER
      }
    },
    computed: {
      ...mapGetters([
        'items',
        'pageTitle'
      ])
    },
    created () {
      this.updateItems()
    },
    watch: {
      '$route' (to, from) {
        this.items = []
        this.updateItems()
      }
    },
    methods: {
      ...mapMutations([
        'setPageTitle'
      ]),
      mouseOver: function (item, event) {
        this.menu.map((el) => {
          el.isActive = false
        })
        item.isActive = true
        this.subMenu = item.sublinks
      },
      updateItems: function () {
        const type = MAP_TYPE_NAME_TO_ID[this.type]
        if (type) {
          fetchItems(`?t=${type}`, response => {
            this.items = response.data.results
          }, error => {
            console.error(error)
          })
          this.setPageTitle(this.type)
        }
      }
    }
  }
</script>

<style scoped>

</style>
