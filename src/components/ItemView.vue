<template>
  <div v-if="data">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">{{ data.name }}</h1>
          <h2 class="subtitle">{{ data.type | encodeType }}<span v-if="data.lvl">, {{ data.lvl }} lvl</span></h2>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container has-text-centered">
          <item :data="data" :action="rmbActions.add"/>
          <div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero mt1">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Podobne przedmioty</h1>
          <p class="subtitle">Inne przedmioty tego typu na podobny poziom</p>
          <div class="items">
            <item v-for="item in similarItems" :key="item.pk" :data="item" :action="rmbActions.add"/>
          </div>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Ostatnio odwiedzane</h1>
          <div class="items">
            <item v-for="item in itemHistory" :key="item.pk" :data="item" :action="rmbActions.add"/>
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
    name: 'SingleItemView',
    components: {
      Item,
      Popup
    },
    mixins: [item],
    props: ['slug'],
    data () {
      return {
        name: 'SingleItemView',
        data: null,
        similarItems: [],
        noSimilarItems: false,
        error: false,
        rmbActions: RIGHT_CLICK_MAPPER
      }
    },
    mounted () {
      this.getItemData()
    },
    watch: {
      '$route' (to, from) {
        this.getItemData()
      }
    },
    computed: {
      ...mapGetters([
        'itemHistory'
      ])
      // itemClass: function () {   TODO
      //   const classes = {
      //     unique: 'orange',
      //     heroic: 'blue',
      //     legendary: 'red',
      //     default: 'grey'
      //   }
      //   return classes[this.data.rarity]
      // }
    },
    methods: {
      ...mapMutations([
        'addToItemHistory'
      ]),
      getItemData: function () {
        fetchItem(this.slug, response => {
          this.data = response.data
          this.getSimilarItems()
          this.addToItemHistory(this.data)
        }, response => {})
      },
      getSimilarItems: function () {
        fetchItemSimilar(this.slug, response => {
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
