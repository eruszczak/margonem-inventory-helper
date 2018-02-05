<template>
  <transition name="fade">
    <div id="search-results" class="has-text-centered" v-if="searchQuery">
      <my-spinner v-if="searching"/>
      <item v-else-if="searchResults.length" v-for="item in searchResults" :key="item.pk" :data="item"
            :action="RIGHT_CLICK_MAPPER.add"/>
      <msg v-else-if="noResults">Nie znaleziono przedmiotów dla podanej frazy</msg>
    </div>
  </transition>
</template>

<script>
  import { RIGHT_CLICK_MAPPER } from '../../utils/constants'
  import debounce from 'lodash/debounce'
  import { searchItems } from '../../api/items'
  import { mapGetters, mapMutations } from 'vuex'
  import Item from '../item/Item'

  const SEARCH_KEY = 'search'

  export default {
    name: 'search',
    components: {Item},
    mounted () {
      let search = localStorage.getItem(SEARCH_KEY)
      search = JSON.parse(search)
      this.noResults = search ? search.noResults : false
      this.searchResults = search ? search.searchResults : []
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
      ...mapMutations(['setSearchQuery']),
      search: debounce(
        function () {
          if (!this.searchQuery) {
            this.searchResults = []
            localStorage.removeItem('search')
            return
          }
          if (this.searchQuery.length < 3) {
            return
          }

          this.searching = true
          searchItems(this.searchQuery, response => {
            // do I really need noResults flag?
            this.searchResults = response.data.results
            this.searching = false
            this.noResults = this.searchResults.length === 0
            localStorage.setItem(SEARCH_KEY, JSON.stringify({
              'searchResults': this.searchResults,
              'noResults': this.noResults
            }))
          }, error => {
            console.error(error)
          })
        },
        300
      )
    }
  }
</script>

<style scoped>
  #search-results {
    overflow: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
</style>
