<template>
  <div v-if="data">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ data.name }} <span v-if="data.lvl">({{ data.lvl }})</span>
          </h1>
          <h2 class="subtitle">

          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
          <item :data="data"></item>
          <h2></h2>

        </div>
      </div>
    </section>

    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Podobne przedmioty
          </h1>
          <div class="items">
            <item v-for="item in similarItems" :key="item.pk" :data="item"></item>
            <!--<item v-for="item in similarItems" :key="item.pk" :data="item" @itemRightClick="itemRightClick"></item>-->
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import Popup from './Popup'
  import Item from './Item'
  import { fetchItem, fetchItemSimilar } from '../api/items'

  export default {
    name: 'SingleItemView',
    components: {
      Item,
      Popup
    },
    props: ['slug'],
    data () {
      return {
        name: 'SingleItemView',
        data: null,
        latestVisitedItems: [],
        similarItems: [],
        noSimilarItems: false,
        error: false
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
      itemClass: function () {
        const classes = {
          unique: 'orange',
          heroic: 'blue',
          legendary: 'red',
          default: 'grey'
        }
        return classes[this.data.rarity]
      }
    },
    methods: {
      getItemData: function () {
        fetchItem(this.slug, response => {
          this.data = response.data
          this.getSimilarItems()
        }, response => {})
      },
      getSimilarItems: function () {
        fetchItemSimilar(this.slug, response => {
          this.similarItems = response.data
          this.noSimilarItems = this.similarItems.length === 0
        }, response => {
          this.error = true
        })
      },
    }
  }
</script>

<style>
</style>
