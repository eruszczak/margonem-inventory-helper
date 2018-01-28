<template>
  <section class="section">
    <div class="container">
      <!--<div class="message is-info">-->
        <!--<div class="message-body">-->
          <!--<p>W tej strefie itemy po kliknięciu na nie PPM zostaną dodane do porównywarki</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="message is-info">-->
        <!--<div class="message-body">-->
          <!--<p>Aby szybko porównać przedmioty, znajdź je za pomocą wyszukiwarki powyżej oraz dodaj klikając na nie PPM.</p>-->
        <!--</div>-->
      <!--</div>-->
      <div class="message is-info">
        <div class="message-body">
          <p>Przedmioty w porównywarce są porównywane z innymi przedmiotami tego samego typu.</p>
        </div>
      </div>
      <button class="button" @click="removeAllItems">Wyczyść przedmioty</button>

      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Rękawice
            </h1>
            <h2 class="subtitle">
              <item v-for="item in compareItems" :key="item.pk" :data="item" :action="rmbActions.removeCompare"></item>
            </h2>
          </div>
        </div>
      </section>
      <div v-for="pair in comparePairs">
        <item :data="pair.item"></item>
        <tabs size="is-small" class="block">
          <tab-item v-for="comparision in pair.comparisons" :label="'vs ' + comparision.item.name">
            <item :data="pair.item"></item> vs <item :data="comparision.item"></item>
            <eq-stats-compare :leftSource="pair.itemStats" :rightSource="comparision.itemStats"></eq-stats-compare>
          </tab-item>
        </tabs>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Item from './Item'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'
  import EqStatsCompare from './includes/EqStatsCompare'
  import {Tabs, TabItem} from './ui/tabs'

  export default {
    name: 'item-compare-view',
    components: {Item, EqStatsCompare, Tabs, TabItem},
    mounted () {
      this.initPairs()
    },
    data () {
      return {
        rmbActions: RIGHT_CLICK_MAPPER,
        active: 0
      }
    },
    computed: {
      ...mapGetters(['compareItems', 'comparePairs'])
    },
    methods: {
      ...mapActions(['removeAllItems', 'initPairs'])
    }
  }
</script>

<style scoped>

</style>
