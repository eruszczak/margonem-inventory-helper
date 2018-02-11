<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ typeDisplay || 'Wybierz typ przedmiotów' }}
          </h1>
          <h2 class="subtitle">
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
          <nav class="tabs is-boxed">
            <ul>
              <li v-for="item in menu" :key="item.name" @mouseover="mouseOver(item, $event)"
                  :class="{'is-active': item.isActive }">
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
    <section class="section">
      <div class="container">
        <div class="items">
          <my-spinner v-if="type && isLoading" size="100"/>
          <transition-group v-else name="fade">
            <item v-for="item in items" :key="item.pk" :data="item" :action="rmbActions.add"/>
          </transition-group>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { MAP_TYPE_NAME_TO_ID, MENU_LINKS } from '../utils/navbar'
  import Item from './item/Item'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'
  import { fetchItems } from '../api/items'

  export default {
    name: 'items',
    components: {Item},
    props: ['type'],
    data: function () {
      return {
        menu: MENU_LINKS,
        subMenu: [],
        items: [],
        rmbActions: RIGHT_CLICK_MAPPER,
        isLoading: true
      }
    },
    computed: {
      ...mapGetters(['pageTitle']),
      typeDisplay () {
        for (let i = 0; i < MENU_LINKS.length; i += 1) {
          const subLinks = MENU_LINKS[i].sublinks
          for (let j = 0; j < subLinks.length; j += 1) {
            if (subLinks[j].href.params.type === this.type) {
              return subLinks[j].displayValue
            }
          }
        }
        return this.type
      }
    },
    mounted () {
      this.getItems()
      for (let i = 0; i < MENU_LINKS.length; i += 1) {
        const subLinks = MENU_LINKS[i].sublinks
        for (let j = 0; j < subLinks.length; j += 1) {
          if (subLinks[j].href.params.type === this.type) {
            MENU_LINKS[i].isActive = true
            this.subMenu = subLinks
            return
          }
        }
      }
    },
    watch: {
      '$route' (to, from) {
        this.items = []
        this.getItems()
      }
    },
    methods: {
      ...mapMutations(['setPageTitle']),
      mouseOver: function (item, event) {
        this.menu.map((el) => {
          el.isActive = false
        })
        item.isActive = true
        this.subMenu = item.sublinks
      },
      getItems: function () {
        const type = MAP_TYPE_NAME_TO_ID[this.type]
        if (type) {
          this.isLoading = true
          fetchItems(`?t=${type}`, response => {
            this.items = response.data.results
            this.isLoading = false
            this.$Progress.finish()
          }, error => {
            console.error(error)
          })
          this.setPageTitle(this.type)
        } else {
          this.$Progress.finish()
        }
      }
    }
  }
</script>

<style scoped>

</style>
