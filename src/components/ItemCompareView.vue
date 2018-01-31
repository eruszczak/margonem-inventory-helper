<template>
  <section class="section">
    <div class="container">
          <!--<p>W tej strefie itemy po kliknięciu na nie PPM zostaną dodane do porównywarki</p>-->
          <!--<p>Aby szybko porównać przedmioty, znajdź je za pomocą wyszukiwarki powyżej oraz dodaj klikając na nie PPM.</p>-->
      <msg type="is-warning">
        Przedmioty są porównywane z innymi przedmiotami tego samego typu
      </msg>
      <button class="button" @click="removeAllItems">Wyczyść przedmioty</button>
      <template v-for="(items, key) in comparisons" v-if="items">
        <section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                {{ key }}
              </h1>
            </div>
          </div>
        </section>
        <tabs size="is-small" class="block">
          <tab-item slot="content" v-for="(comp, index) in items" :key="index" :item="comp.item" :noLink="true" :itemAction="RIGHT_CLICK_MAPPER.removeCompare">
            <tabs size="is-small" class="block" v-if="compareItems.length > 1">
              <tab-item slot="content" v-for="(comparison, index) in comp.comparisons" :key="index" :noLink="true" :itemAction="RIGHT_CLICK_MAPPER.ignore" :item="comparison.item" label="vs">
                <eq-stats-compare :leftItem="comp.item" :leftSource="comp.itemStats" :rightItem="comparison.item" :rightSource="comparison.itemStats"/>
              </tab-item>
            </tabs>
            <msg type="is-warning">
              Musisz dodać minimum 2 przedmioty tego samego typu
            </msg>            
          </tab-item>
        </tabs>
      </template>
    </div>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Item from './item/Item'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'
  import EqStatsCompare from './eq/EqStatsCompare'
  import {Tabs, TabItem} from './ui/tabs'

  export default {
    name: 'item-compare-view',
    components: {Item, EqStatsCompare, Tabs, TabItem },
    mounted () {
      this.initPairs()
    },
    data () {
      return {
        RIGHT_CLICK_MAPPER: RIGHT_CLICK_MAPPER
      }
    },
    computed: {
      ...mapGetters(['compareItems', 'comparisons'])
    },
    methods: {
      ...mapActions(['removeAllItems', 'initPairs'])
    }
  }
</script>

<style scoped>

</style>
