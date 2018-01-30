<template>
  <transition name="fade">
    <div class="search-items has-text-centered is-clearfix" :class="{'search-items-modal': modalActive}" v-if="query">
      <div v-if="searching"><div class="vue-simple-spinner" style="margin: 0px auto; border-radius: 100%; border-width: 3px; border-style: solid; border-color: rgb(33, 150, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-image: initial; width: 42px; height: 42px; animation: vue-simple-spinner-spin 0.8s linear infinite;"></div> <!----></div>
      <item v-else-if="searchResults.length" v-for="item in searchResults" :key="item.pk" :data="item" :action="RIGHT_CLICK_MAPPER.add"></item>
      <msg v-else-if="noResults">Nie znaleziono przedmiotów dla podanej frazy</msg>
    </div>
  </transition>
</template>

<script>
  import { RIGHT_CLICK_MAPPER } from '../../utils/constants'
  import debounce from 'lodash/debounce'
  import { searchItems } from '../../api/items'

  export default {
    name: 'search',
    props: ['modalActive'],
    data () {
      let search = localStorage.getItem('search')
      search = JSON.parse(search)
      return {
        query: search ? search.query : '',
        searchResults: search ? search.results : [],
        noResults: search ? search.noResults : false,
        RIGHT_CLICK_MAPPER: RIGHT_CLICK_MAPPER,
        searching: false
      }
    },
    watch: {
      query: function (value) {
        this.noResults = false
        this.search()
      }
    },
    methods: {
      search: debounce(
        function () {
          if (!this.query) {
            this.searchResults = []
            localStorage.removeItem('search')
            return
          }
          if (this.query.length < 3) {
            return
          }

          this.searching = true
          let vm = this
          searchItems(this.query, response => {
            // TODO: can use this?
            vm.searchResults = response.data.results
            vm.searching = false
            vm.noResults = vm.searchResults.length === 0
            localStorage.setItem('search', JSON.stringify({
              'query': vm.query,
              'results': vm.searchResults,
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
