<template>
  <div>
    <section class="hero" :class="itemClass">
      <div v-if="isLoading" class="hero-body">
        <my-spinner size="100" />
      </div>
      <template v-else>
        <div class="hero-head has-text-centered" style="padding-top: 2em">
          <h1 class="title">{{ data.name }}</h1>
          <h2 class="subtitle">{{ data.type | encodeType }}<span v-if="data.lvl">, {{ data.lvl }} lvl</span></h2>
        </div>
        <div class="hero-body">
          <div class="container has-text-centered">
            <item :data="data" :action="rmbActions.add"/>
            <div v-html="itemStats"></div>
          </div>
        </div>
      </template>
    </section>
    <section class="hero is-light mt1">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Podobne przedmioty</h1>
          <p class="subtitle">Inne przedmioty tego typu na podobny poziom</p>
          <div class="items">
            <my-spinner v-if="isLoadingSimilar" />
            <transition-group v-else name="fade">
              <item  v-for="item in similarItems" :key="item.pk" :data="item" :action="rmbActions.add"/>
            </transition-group>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-light mt1">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Ostatnio odwiedzane</h1>
          <div class="items">
            <transition-group name="fade">
              <item v-for="item in itemHistory" :key="item.pk" :data="item" :action="rmbActions.add"/>
            </transition-group>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Popup from './item/Popup'
  import Item from './item/Item'
  import { fetchItem, fetchItemSimilar } from '../api/items'
  import { mapGetters, mapMutations } from 'vuex'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'
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
        error: false,
        rmbActions: RIGHT_CLICK_MAPPER,
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
        return this.data ? this.getEncodeDItemStats(this.data.json_stats) : this.data
      },
      itemClass: function () {
        if (!this.data) {
          return null
        }
        const classes = {
          unique: 'is-warning',
          heroic: 'is-info',
          legendary: 'is-danger',
          default: 'is-light'
        }
        return classes[this.data.rarity]
      }
    },
    methods: {
      ...mapMutations([
        'addToItemHistory'
      ]),
      getItemData: function () {
        fetchItem(this.slug, response => {
          this.isLoading = false
          this.data = response.data
          this.getSimilarItems()
          this.addToItemHistory(this.data)
        }, response => {})
      },
      getSimilarItems: function () {
        fetchItemSimilar(this.slug, response => {
          this.isLoadingSimilar = false
          this.similarItems = response.data
          this.noSimilarItems = this.similarItems.length === 0
        }, response => {
          this.error = true
        })
      }
    }
  }
</script>

<style>
</style>
