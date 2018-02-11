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
            <template v-if="legbon">
              <p class="mt1">{{ legbon.translation }}</p>
              <p>{{ legbon.description }}</p>
              <p v-if="legbonMaxDuration">{{ legbonMaxDuration }}</p>
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
            <transition-group name="fade">
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
  import { fetchItem, fetchItemSimilar } from '../api/items'
  import { mapGetters, mapMutations } from 'vuex'
  import { RARITY_CLASSES, RIGHT_CLICK_MAPPER } from '../utils/constants'
  import { item } from './mixins/item'

  export default {
    name: 'ItemView',
    components: {Item, Popup},
    mixins: [item],
    props: ['slug'],
    mounted () {
      this.getItemData()
    },
    data () {
      return {
        data: null,
        similarItems: [],
        noSimilarItems: false,
        RIGHT_CLICK_MAPPER: RIGHT_CLICK_MAPPER,
        isLoading: true,
        isLoadingSimilar: true
      }
    },
    watch: {
      '$route' (to, from) {
        this.getItemData()
      }
    },
    computed: {
      ...mapGetters([
        'itemHistory'
      ]),
      itemStats () {
        return this.data ? this.getEncodedItemStats(this.data.stats) : null
      },
      professions () {
        return this.data ? this.getProfessions(this.data.profession) : null
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
      ...mapMutations(['addToItemHistory', 'setAPIError']),
      getItemData () {
        this.isLoading = true
        this.isLoadingSimilar = true
        fetchItem(this.slug, response => {
          this.isLoading = false
          this.data = response.data
          this.getSimilarItems()
          this.addToItemHistory(this.data)
        }, () => {
          this.setAPIError()
        })
      },
      getSimilarItems () {
        fetchItemSimilar(this.slug, response => {
          this.isLoadingSimilar = false
          this.similarItems = response.data
          this.noSimilarItems = this.similarItems.length === 0
          this.$Progress.finish()
        }, () => {
          this.setAPIError()
        })
      }
    }
  }
</script>

<style>
</style>
