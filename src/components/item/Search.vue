<template>
  <transition name="fade">
    <div id="search-results" class="has-text-centered" v-if="searchQuery">
      <my-spinner v-if="searching"/>
      <item v-else-if="searchResults.length" v-for="item in searchResults" :key="item.pk" :data="item"
            :action="RIGHT_CLICK_MAPPER.add" noBorder/>
      <msg v-else-if="noResults">Nie znaleziono przedmiotów dla podanej frazy</msg>
    </div>
  </transition>
</template>

<script>
  import { DEBOUNCE_TIME_IN_MS, RIGHT_CLICK_MAPPER } from '../../utils/constants'
  import debounce from 'lodash/debounce'
  import { searchItems } from '../../api/items'
  import { mapGetters, mapMutations } from 'vuex'
  import Item from '../item/Item'

  export default {
    name: 'search',
    components: {Item},
    mounted () {
      this._searchItems()
    },
    data () {
      return {
        searchResults: [],
        noResults: false,
        RIGHT_CLICK_MAPPER: RIGHT_CLICK_MAPPER,
        searching: false
      }
    },
    computed: {
      ...mapGetters(['searchQuery', 'modalActive'])
    },
    watch: {
      searchQuery (value) {
        this.noResults = false
        this.search()
      }
    },
    methods: {
      ...mapMutations(['setSearchQuery', 'setAPIError']),
      search: debounce(
        function () {
          this._searchItems()
        },
        DEBOUNCE_TIME_IN_MS
      ),
      _searchItems () {
        this.searching = true
        searchItems(this.searchQuery, response => {
          this.searchResults = response.data.results
          this.searching = false
          this.noResults = this.searchResults.length === 0
        }, () => {
          this.setAPIError()
        })
      }
    }
  }
</script>

<style scoped>
  #search-results {
    /*overflow: auto;*/
    overflow-y: visible;
    white-space: nowrap;
  }
</style>
