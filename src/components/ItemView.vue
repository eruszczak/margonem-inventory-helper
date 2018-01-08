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

    <!--<v-row class="mt-5">-->
      <!--<v-col xs12 md8 offset-md2>-->
        <!--<v-card>-->
          <!--<v-card-row class="lighten-1" :class="itemClass">-->
            <!--<v-card-title>-->
              <!--<span class="white&#45;&#45;text">Podobne przedmioty</span>-->
            <!--</v-card-title>-->
          <!--</v-card-row>-->
          <!--<v-card-text class="text-md-center">-->
            <!--<item-list :source="similarItems"></item-list>-->
            <!--<h6 v-if="noSimilarItems">Nie znaleziono.</h6>-->
            <!--<clip-loader v-if="!error" :loading="spinner.loading" :size="spinner.size" :color="spinner.color"></clip-loader>-->
            <!--<v-alert v-else error v-bind:value="true">-->
              <!--Wystąpił problem z pobraniem przedmiotów.-->
            <!--</v-alert>-->
          <!--</v-card-text>-->
        <!--</v-card>-->

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
  import ItemList from './ItemList'
  import { fetchItemAndSimilar } from '../api/items'
  // import {LATEST_VISITED_ITEMS_KEY, LATEST_VISITED_ITEMS_LEN} from '../helpers/constants'

  export default {
    name: 'SingleItemView',
    components: {
      Item,
      ItemList,
      Popup
      // ClipLoader
    },
    props: ['slug'], // itemType is not used
    data () {
      return {
        name: 'SingleItemView',
        retrivedStats: false,
        tooltip: '',
        latestVisitedItems: [],
        similarItems: [],
        noSimilarItems: false,
        error: false
      }
    },
    mounted () {
      // this.latestVisitedItems = this.getLatestVisitedItems();
      this.getItemStats()
    },
    watch: {
      '$route' (to, from) {
        // this.similarItems = [];
        // this.spinner.loading = true;
        // this.noSimilarItems = false;
        // // reinitialize current item when navigated to another item (through last visited items)
        // this.latestVisitedItems = this.getLatestVisitedItems();
        this.getItemStats()
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
      getItemStats: function () {
        fetchItemAndSimilar(this.slug, response => {
          this.data = response.data
          // this.saveToLatestVisited();
          // this.getSimilarItems(this.slug)
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
      // getLatestVisitedItems: function() {
      //   let visitedItems = localStorage.getItem(LATEST_VISITED_ITEMS_KEY);
      //   if (visitedItems !== null) {
      //     return JSON.parse(visitedItems);
      //   }
      //   return [];
      // },
      // getSimilarItems: function(itemId) {
      //   Vue.http.get(`/api/item/${itemId}/similar?limit=${LATEST_VISITED_ITEMS_LEN}`).then(response => {
      //     this.similarItems = response.body;
      //     this.spinner.loading = false;
      //     if (this.similarItems.length === 0) {
      //       this.noSimilarItems = true;
      //     }
      //   }, response => {
      //     this.error = true;
      //   });
      // },
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
