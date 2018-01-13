<template>
  <router-link :to="{name: 'itemView', params: {slug: data.slug}}">
    <!--<div :id="data.slug" class="item" @contextmenu.prevent="addItemToEq(data)">-->
      <!--<b-tooltip :label="encodeItemMinorStats" multilined>-->
        <!--<img class="itemborder borderRarity" :class="data.rarity" :src="data.img" :alt="data.name">-->
      <!--</b-tooltip>-->
    <!--</div>-->

    <div :id="data.slug" class="item" @contextmenu.prevent="itemRightClick(data)">
      <img class="itemborder borderRarity" :class="data.rarity" :src="data.img" :alt="data.name">
      <popup :data="data"></popup>
      <!-- <p><span v-my-tooltip.right="message">{{ message }}</span></p> -->
    </div>
  </router-link>
</template>

<script>
  import Popup from './Popup'
  import { encodeProfessions, calculateMaxFullBonusDuration, isItemWearable } from '../utils/helpers'
  import { ITEM_RARITY, ITEM_TYPE, ITEM_BONUS, ITEM_STAT, ITEM_PLACE } from '../utils/items'
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'
  import { toast } from '../mixins/toast'

  export default {
    name: 'item',
    props: ['data', 'action'],
    components: {
      Popup
    },
    mixins: [toast],
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['eqItems']),
      // className: function () {
      //   return this.data.rarity + '-color'
      // },
      // lvl: function () {
      //   return this.data.lvl ? `(${this.data.lvl})` : ''
      // },
      // rarity: function () {
      //   return ITEM_RARITY[this.data.rarity]
      // },
      // type: function () {
      //   return ITEM_TYPE[this.data.type]
      // },
      // legbon: function () {
      //   return ITEM_BONUS[this.data.legbon]
      // },
      // legbonMaxDuration: function () {
      //   if (this.data.lvl) {
      //     let maxDuration = this.data.lvl + calculateMaxFullBonusDuration(this.data.lvl)
      //     return `Pełny czas działania: ${this.data.lvl} - ${maxDuration} lvl`
      //   }
      //   return ''
      // },
      // professions: function () {
      //   let professions = encodeProfessions(this.data.profession)
      //   // if (isItemWearable(this.data.type) && !professions.length) {
      //   if (this.data.profession.length === 6) {
      //     return 'wszystkie profesje'
      //   }
      //   return professions
      // },
      // encodeItemMinorStats: function () {
      //   // those data are already in the order
      //   let data = JSON.parse(this.data.json_stats)
      //   let encodedMinorStats = ''
      //   for (let attr in data) {
      //     if (attr in ITEM_STAT) {
      //       encodedMinorStats += `<p>${ITEM_STAT[attr].val.replace('{}', data[attr])}</p>`
      //     }
      //   }
      //   return encodedMinorStats
      // }
    },
    methods: {
      ...mapActions(['wearItem', 'takeOffItem']),
      /**
       * Decides what to do when Item was right clicked
       * @param item Item that was right clicked
       */
      itemRightClick: function (item) {
        const itemPlace = ITEM_PLACE[item.type]
        if (this.action === RIGHT_CLICK_MAPPER.add) {
          this.add(item, itemPlace)
        } else if (this.action === RIGHT_CLICK_MAPPER.remove) {
          this.remove(itemPlace)
        }
      },
      /**
       * Calls mutation if item's type is wearable and isn't already equipped
       * @param item
       * @param itemPlace
       */
      add: function (item, itemPlace) {
        if (!isItemWearable(item.type)) {
          this.success('Nie można założyć tego typu')
          return
        }
        const previousItem = this.eqItems[itemPlace]
        if (previousItem && previousItem.pk === item.pk) {
          this.success('Ten przedmiot jest już założony')
          return
        }
        this.wearItem(item)
        this.success(previousItem ? 'Podmieniono przedmiot' : 'Założono przedmiot')
      },
      /**
       * Calls mutation if this component is used to display my eqItems (only in this case, eqItems are editable)
       * @param itemPlace
       */
      remove: function (itemPlace) {
        if (!this.readOnly && !this.history) {
          this.takeOffItem(itemPlace)
          this.success('Zdjęto przedmiot')
        }
      }
    }
  }
</script>

<style>
  .item {
    position: relative;
    display: inline-block;
  }
  .itemborder {
    background-image:url('../assets/itembg.png');
    padding: 2px;
    margin: 1px;
  }

  .green-color {color: green;}
  .default-color {color: grey;}
  .unique-color {color: orange;}
  .heroic-color {color: #136bf7;}
  .legendary-color {color: #c60d14;}

  .borderRarity {border: 2px solid}
  .default {border-color: #cecece;}
  .unique {border-color: orange;}
  .heroic {border-color: #136bf7;}
  .legendary {border-color: #c60d14;}

  .item .tooltipText {
    visibility: hidden;
    width: auto;
    background-color: black;
    color: #fff;
    font-size: 12px;
    text-align: left;
    padding: 5px;
    padding-left: 8px;
    border-radius: 6px;
    position: absolute;
    z-index: 100;
    opacity: 1
  }

  .item .tooltipText p {
    margin-bottom: 5px;
    width: max-content;
  }

  .item .tooltipText div hr {
    margin-bottom: 15px;
  }
  .item .tooltipText div div p {
    margin-top: -5px;
  }

  .item:hover .tooltipText {
    visibility: visible;
  }

  .item:hover .tooltipText:hover {
    visibility: hidden;
  }
</style>
