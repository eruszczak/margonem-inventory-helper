<template>
  <div v-if="data">
    <!--<v-row>-->
      <!--<v-col xs12 md6 offset-md3>-->
        <!--<v-card class="lighten-1 white&#45;&#45;text elevation-5" :class="itemClass">-->
          <!--<v-card-text>-->
            <!--<div class="text-xs-center">-->
            <!--</div>-->
            <!--<tooltip :stats="retrivedStats"></tooltip>-->
          <!--</v-card-text>-->
        <!--</v-card>-->
      <!--</v-col>-->
    <!--</v-row>-->
    <item :data="data"></item>

    <h2>Podobne przedmioty</h2>
    <div class="items">
      <item v-for="item in similarItems" :key="item.pk" :data="item" @itemRightClick="itemRightClick"></item>
    </div>
        <!--<v-card>-->
          <!--<v-card-row class="lighten-1" :class="itemClass">-->
            <!--<v-card-title>-->
              <!--<span class="white&#45;&#45;text">Ostatnio przeglądane przedmioty</span>-->
            <!--</v-card-title>-->
          <!--</v-card-row>-->
          <!--<v-card-text class="text-md-center">-->
            <!--<item-list :limit="10" :source="latestVisitedItems"></item-list>-->
          <!--</v-card-text>-->
          <!--<v-card-row actions>-->
            <!--<v-btn flat class="grey&#45;&#45;text darken-1" @click.native="clearLatestVisitedItems">wyczyść</v-btn>-->
          <!--</v-card-row>-->
        <!--</v-card>-->
      <!--</v-col>-->
    <!--</v-row>-->
  </div>
</template>

<script>
  import Popup from './Popup'
  import Item from './Item'
  import { fetchItem, fetchItemSimilar } from '../api/items'
  // import {LATEST_VISITED_ITEMS_KEY, LATEST_VISITED_ITEMS_LEN} from '../helpers/constants'

  export default {
    name: 'SingleItemView',
    components: {
      Item,
      Popup
      // ClipLoader
    },
    props: ['slug'], // itemType is not used
    data () {
      return {
        name: 'SingleItemView',
        data: null,
        tooltip: '',
        latestVisitedItems: [],
        similarItems: [],
        noSimilarItems: false,
        error: false
      }
    },
    mounted () {
      this.latestVisitedItems = this.getLatestVisitedItems()
      this.getItemData()
    },
    watch: {
      '$route' (to, from) {
        // this.similarItems = [];
        // this.spinner.loading = true;
        // this.noSimilarItems = false;
        // // reinitialize current item when navigated to another item (through last visited items)
        this.latestVisitedItems = this.getLatestVisitedItems()
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
    // TODO why this.stats changes
    methods: {
      getItemData: function () {
        fetchItem(this.slug, response => {
          this.data = response.data
          this.getSimilarItems()
          // this.saveToLatestVisited();
          // this.$emit('newToolbarTitle', {value: this.data.name})
        }, response => {})
      },
      // saveToLatestVisited: function() {
      //   let visitedItem = this.retrivedStats;
      //   if (!visitedItem) {
      //     return;
      //   }
      //   this.latestVisitedItems = this.latestVisitedItems.filter(function(item) {
      //     // if this item was on the list, remove it because it will be added at the top
      //     return item.slug !== visitedItem.slug;
      //   });
      //
      //   this.prependToFixedSizeArray(visitedItem);
      //   localStorage.setItem(LATEST_VISITED_ITEMS_KEY, JSON.stringify(this.latestVisitedItems));
      // },
      // prependToFixedSizeArray: function(elem) {
      //   this.latestVisitedItems.unshift(elem);
      //   if (this.latestVisitedItems.length > LATEST_VISITED_ITEMS_LEN) {
      //     this.latestVisitedItems.pop();
      //   }
      // },
      getLatestVisitedItems: function () {
        // let visitedItems = localStorage.getItem(LATEST_VISITED_ITEMS_KEY);
        // if (visitedItems !== null) {
        //   return JSON.parse(visitedItems);
        // }
        // return [];
      },
      getSimilarItems: function(itemId) {
        fetchItemSimilar(this.slug, response => {
          this.similarItems = response.data
          if (this.similarItems.length === 0) {
            this.noSimilarItems = true
          }
        }, response => {
          this.error = true
        })
      },
      // clearLatestVisitedItems: function() {
      //   EventBus.$emit('showSnackbar', 'Wyczyszczono ostatnio przeglądane przedmioty.');
      //   this.latestVisitedItems = [];
      //   localStorage.removeItem(LATEST_VISITED_ITEMS_KEY);
      // }
    }
  }
</script>

<style>
</style>
