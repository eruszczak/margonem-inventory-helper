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
    <section class="section" v-if="type" v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
      <div class="container">
        <div class="items">
          <my-input :value="filterValue" @input="setFilterValue" placeholder="Filtruj po nazwie albo lvl"/>
          <!--<transition-group v-else name="fade">-->
          <section class="hero is-light mt1" v-for="(val, key) in items">
            <div class="hero-head" style="padding-top: 1rem">
              <h1 class="title has-text-centered">{{ key }}</h1>
            </div>
            <div class="hero-body">
              <item v-for="item in val" :key="item.pk" :data="item" :action="RIGHT_CLICK_MAPPER.add"/>
            </div>
          </section>
          <!--</transition-group>-->
          <div v-if="next && !isLoading" class="container has-text-centered mt1">
            <button class="button" @click="loadMore">Pokaż więcej</button>
          </div>
          <div class="mt1">
            <my-spinner v-if="isLoading" size="100"/>
          </div>
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
  import { getItemLvlGroups, replaceDiacritics } from '../utils/helpers'
  import debounce from 'lodash/debounce'
  import groupBy from 'lodash/groupBy'

  export default {
    name: 'items',
    components: {Item},
    props: ['type'],
    data () {
      return {
        menu: MENU_LINKS,
        subMenu: [],
        items: [],
        RIGHT_CLICK_MAPPER: RIGHT_CLICK_MAPPER,
        isLoading: true,
        filterValue: '',
        next: null,
        lvlGroups: getItemLvlGroups()
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
    computed: {
      ...mapGetters(['pageTitle']),
      typeId () {
        if (this.type) {
          return MAP_TYPE_NAME_TO_ID[this.type]
        }
        return null
      },
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
      },
      filteredItems () {
        if (this.filterValue && this.items) {
          console.log('filteredItems')
          console.error('result', this.filter())
          const results = this.filter()
          if (results) {
            return results
          }
        }
        return this.items
      }
    },
    methods: {
      ...mapMutations(['setPageTitle', 'setAPIError']),
      mouseOver: function (item, event) {
        this.menu.map((el) => {
          el.isActive = false
        })
        item.isActive = true
        this.subMenu = item.sublinks
      },
      getItems () {
        if (this.typeId) {
          this.isLoading = true
          fetchItems(`?t=${this.typeId}&per_page=100`, response => {
            this.items = groupBy(response.data.results, item => {
              const group = this.lvlGroups.find(grp => item.lvl >= grp.min)
              return group ? group.name : '0'
            })
            this.isLoading = false
            this.$Progress.finish()
            this.next = response.data.next
          }, () => {
            this.setAPIError()
          })
          this.setPageTitle(this.typeDisplay)
        } else {
          this.$Progress.finish()
        }
      },
      setFilterValue (value) {
        this.filterValue = value
      },
      filter: debounce(
        function () {
          const query = replaceDiacritics(this.filterValue.toLowerCase())
          console.log('debouncing', query)
          const lvl = parseInt(query)
          return this.items.filter(item => {
            const itemName = replaceDiacritics(item.name.toLowerCase())
            console.log(itemName.indexOf(query), itemName.indexOf(query) > -1)
            return itemName.indexOf(query) > -1 || item.lvl === lvl
          })
        },
        300
      ),
      loadMore () {
        if (!this.next) {
          console.log('no next')
          return
        }
        this.isLoading = true
        fetchItems(this.next, response => {
          response.data.results.forEach(item => {
            const group = this.lvlGroups.find(grp => item.lvl >= grp.min)
            if (group.name in this.items) {
              this.items[group.name].push(item)
            } else {
              this.items[group.name] = [item]
            }
          })
          this.isLoading = false
          this.$Progress.finish()
          this.next = response.data.next
        }, () => {
          this.setAPIError()
        }, true)
      }
    }
  }
</script>

<style scoped>

</style>
