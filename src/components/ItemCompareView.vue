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
{{comparision}}
      <template v-for="type in comparision">
        <section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                {{ type }}
              </h1>
              <h2 class="subtitle">
                <item v-for="pk in comparision[type]" :key="pk" :data="comparision[type][pk].item" :action="rmbActions.removeCompare"/>
              </h2>
            </div>
          </div>
        </section>
          <!--<item :data="pair.item"/>-->
        <tabs size="is-small" class="block">
          <tab-item v-for="pk in comparision[type]" :item="comparision[type][pk].item">
            <tabs size="is-small" class="block">
              <tab-item v-for="comparision in comparision[type][pk].comparisions" :item="comparision.item">
                <!--<div slot="label">-->
                <!--<img class="itemborder borderRarity" :class="comparision.item.rarity" :src="comparision.item.img" :alt="comparision.item.name">-->
                <!--<p>{{ comparision.item.name }}</p>-->
                <!--</div>-->
                <item :data="comparision[type][pk].item"/> vs <item :data="comparision.item"/>
                <!--<eq-stats-compare :leftSource="pair.itemStats" :rightSource="comparision.itemStats"/>-->
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
      ...mapGetters(['compareItems', 'comparision'])
    },
    methods: {
      ...mapActions(['removeAllItems', 'initPairs'])
    }
  }
</script>

<style scoped>

</style>
