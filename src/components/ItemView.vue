<template>
  <section class="section">
    <div class="container">
      <section class="hero has-text-centered" :class="itemClass">
        <div v-if="isLoading" class="hero-body">
          <my-spinner size="100" />
        </div>
        <template v-else-if="data">
          <div class="hero-head" style="padding-top: 2em">
            <h1 class="title">{{ data.name }}<span v-if="data.lvl"> ({{ data.lvl }})</span></h1>
            <h2 class="subtitle">
              {{ rarity | encodeRarity }}, {{ data.type | encodeType }}
              <p>{{ professions }}</p>
            </h2>
          </div>
          <div class="hero-body">
            <item :data="data" :action="RIGHT_CLICK_MAPPER.add" noBorder/>
            <div v-html="itemStats"></div>
            <p v-if="data.hidden_stats">Przedmiot ma ukryte statystyki</p>
            <template v-if="legbon">
              <p class="mt1">{{ legbon.translation }}</p>
              <p>{{ legbon.description }}</p>
              <p v-if="legbonMaxDuration">Pełny czas działania: {{ legbonMaxDuration }}</p>
            </template>
          </div>
        </template>
      </section>
      <section class="hero is-light mt1 has-text-centered">
        <div class="hero-body">
          <h1 class="title">Podobne przedmioty</h1>
          <p class="subtitle">Inne przedmioty tego typu na podobny poziom</p>
          <div class="items">
            <my-spinner v-if="isLoadingSimilar" />
            <transition-group v-else name="fade">
              <item v-for="item in similarItems" :key="item.pk" :data="item" :action="RIGHT_CLICK_MAPPER.add"/>
            </transition-group>
            </div>
        </div>
      </section>
      <section class="hero is-light mt1 has-text-centered">
        <div class="hero-body">
          <h1 class="title">Ostatnio odwiedzane</h1>
          <div class="items">
            <my-spinner v-if="isLoadingHistory" />
            <transition-group v-else name="fade">
              <item v-for="item in itemHistory" :key="item.pk" :data="item" :action="RIGHT_CLICK_MAPPER.add"/>
            </transition-group>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  import Popup from './item/Popup'
  import Item from './item/Item'
  import {fetchItem, fetchItemSimilar, fetchMultipleItems} from '../api/items'
  import { mapMutations } from 'vuex'
  import { RARITY_CLASSES, RIGHT_CLICK_MAPPER } from '../utils/constants'
  import { item } from './mixins/item'

  const ITEM_HISTORY_LIMIT = 15
  const ITEM_HISTORY_KEY = 'itemhistory'

  export default {
    name: 'ItemView',
    components: {Item, Popup},
    mixins: [item],
    props: ['slug'],
    mounted () {
      this._fetchItem(true)
    },
    data () {
      return {
        data: null,
        similarItems: [],
        itemHistory: [],
        noSimilarItems: false,
        RIGHT_CLICK_MAPPER: RIGHT_CLICK_MAPPER,
        isLoading: true,
        isLoadingSimilar: true,
        isLoadingHistory: true
      }
    },
    watch: {
      '$route' (to, from) {
        this._fetchItem()
      }
    },
    computed: {
      itemStats () {
        return this.data ? this.getEncodedItemStats(this.data.stats) : null
      },
      professions () {
        return this.data ? this.getProfessions(this.data.reqp) : null
      },
      rarity () {
        return this.data ? this.data.rarity : null
      },
      itemClass () {
        if (this.data) {
          return RARITY_CLASSES[this.data.rarity]
        }
        return null
      },
      legbon () {
        return this.data ? this.getLegbon(this.data.legbon) : null
      },
      legbonMaxDuration () {
        return this.data ? this.getLegbonMaxDuration(this.data.lvl) : null
      }
    },
    methods: {
      ...mapMutations(['setAPIError']),
      _fetchItem (mount) {
        this.isLoading = true
        this.isLoadingSimilar = true
        fetchItem(this.slug, response => {
          this.isLoading = false
          this.data = response.data
          this.$setPageTitle(`${this.data.name}`)
          this._fetchItemSimilar()
          if (mount) {
            this.fetchItemHistory()
          } else {
            this.addToItemHistory(this.data)
          }
        }, () => {
          this.setAPIError()
        })
      },
      _fetchItemSimilar () {
        fetchItemSimilar(this.slug, response => {
          this.isLoadingSimilar = false
          this.similarItems = response.data
          this.noSimilarItems = this.similarItems.length === 0
          this.$Progress.finish()
        }, () => {
          this.setAPIError()
        })
      },
      fetchItemHistory () {
        const slugs = localStorage.getItem(ITEM_HISTORY_KEY)
        if (!slugs) {
          return
        }
        fetchMultipleItems(JSON.parse(slugs), response => {
          this.itemHistory = response.data.results
          this.addToItemHistory(this.data)
          // this.itemHistory = this.getSortedItemHistory(response.data.results)
          this.isLoadingHistory = false
        }, () => {
          this.setAPIError()
        })
      },
      addToItemHistory (item) {
        this.itemHistory = this.itemHistory.filter(el => item.pk !== el.pk)
        this.itemHistory.unshift(item)
        this.itemHistory = this.itemHistory.slice(0, ITEM_HISTORY_LIMIT)
        this.setItemHistorySlugs()
      },
      // getSortedItemHistory (items) {
      //   function sortFunc (sortingArr, a, b) {
      //     return sortingArr.indexOf(a[1]) - sortingArr.indexOf(b[1]);
      //   }
      //   return items.sort(sortFunc)
      // },
      setItemHistorySlugs () {
        let slugs = this.itemHistory.map(item => item.slug)
        localStorage.setItem(ITEM_HISTORY_KEY, JSON.stringify(slugs))
      }
    }
  }
</script>

<style>
</style>
