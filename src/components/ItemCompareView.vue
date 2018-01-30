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
          <tab-item v-for="(comp, index) in items" :key="index" :item="comp.item">
            <tabs size="is-small" class="block">
              <tab-item v-for="comparison in comp.comparisons" :item="comparison.item">
                <div slot="label">
                  <img class="itemborder borderRarity" :class="comparison.item.rarity" :src="comparison.item.img" :alt="comparison.item.name">
                  <p>{{ comparison.item.name }}</p>
                </div>
                <!--<item :data="comparisons[key][key2].item"/> vs <item :data="comparison.item"/>-->
                <eq-stats-compare :leftSource="comp.itemStats" :rightSource="comparison.itemStats"/>
              </tab-item>
            </tabs>
          </tab-item>
        </tabs>
      </template>
    </div>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Item from './Item'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'
  import EqStatsCompare from './includes/EqStatsCompare'
  import Test from './includes/Test'
  import {Tabs, TabItem} from './ui/tabs'

  export default {
    name: 'item-compare-view',
    components: {Item, EqStatsCompare, Tabs, TabItem, Test},
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
      ...mapGetters(['compareItems', 'comparisons'])
    },
    methods: {
      ...mapActions(['removeAllItems', 'initPairs'])
    }
  }
</script>

<style scoped>

</style>
