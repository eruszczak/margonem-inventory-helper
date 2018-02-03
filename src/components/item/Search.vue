<template>
  <transition name="fade">
    <div class="search-items has-text-centered is-clearfix" :class="{'search-items-modal': modalActive}"
         v-if="searchQuery">
      <div v-if="searching">
        <div class="vue-simple-spinner"
             style="margin: 0px auto; border-radius: 100%; border-width: 3px; border-style: solid; border-color: rgb(33, 150, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-image: initial; width: 42px; height: 42px; animation: vue-simple-spinner-spin 0.8s linear infinite;"></div>
        <!----></div>
      <item v-else-if="searchResults.length" v-for="item in searchResults" :key="item.pk" :data="item"
            :action="RIGHT_CLICK_MAPPER.add"></item>
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
      this.setSearchQuery(search ? search.searchQuery : '')
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
      searchQuery: function (value) {
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
          let vm = this
          searchItems(this.searchQuery, response => {
            // TODO: can use this?
            // Todo do i really need noResults
            vm.searchResults = response.data.results
            vm.searching = false
            vm.noResults = vm.searchResults.length === 0
            localStorage.setItem(SEARCH_KEY, JSON.stringify({
              'searchQuery': vm.searchQuery,
              'searchResults': vm.searchResults,
              'noResults': vm.noResults
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

</style>
