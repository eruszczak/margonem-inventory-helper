<template>
  <router-link v-if="!noLink" :to="{name: 'itemView', params: {slug: data.slug}}">
    <div :id="data.slug" class="item" @contextmenu.prevent="itemRightClick(data)">
      <img class="itemborder borderRarity" :class="data.rarity" :src="data.img" :alt="data.name">
      <popup :data="data"></popup>
    </div>
  </router-link>
  <div v-else :id="data.slug" class="item" @contextmenu.prevent="itemRightClick(data)">
    <img class="itemborder borderRarity" :class="data.rarity" :src="data.img" :alt="data.name">
  </div>
</template>

<script>
  import Popup from './Popup'
  import { isItemWearable } from '../utils/helpers'
  import { ITEM_PLACE } from '../utils/items'
  import { mapGetters, mapActions } from 'vuex'
  import { RIGHT_CLICK_MAPPER } from '../utils/constants'
  import { toast } from '../mixins/toast'

  export default {
    name: 'item',
    props: ['data', 'action', 'noLink'],
    components: {
      Popup
    },
    mixins: [toast],
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['eqItems', 'canAddToEq'])
    },
    methods: {
      ...mapActions(['wearItem', 'takeOffItem', 'compareItem', 'uncompareItem']),
      /**
       * Decides what to do when Item was right clicked
       * @param item Item that was right clicked
       */
      itemRightClick: function (item) {
        const comparePayload = {
          item: item,
          callback: message => {
            this.success(message)
          }
        }
        if (this.action === RIGHT_CLICK_MAPPER.removeCompare) {
          this.uncompareItem(comparePayload)
        } else if (!this.canAddToEq) {
          this.compareItem(comparePayload)
        } else if (this.action === RIGHT_CLICK_MAPPER.add) {
          this.add(item)
        } else if (this.action === RIGHT_CLICK_MAPPER.remove) {
          this.remove(item)
        }
      },
      /**
       * Calls mutation if item's type is wearable and isn't already equipped
       * @param item
       */
      add: function (item) {
        if (!isItemWearable(item.type)) {
          this.success('Nie można założyć tego typu')
          return
        }
        const previousItem = this.eqItems[ITEM_PLACE[item.type]]
        if (previousItem && previousItem.pk === item.pk) {
          this.success('Ten przedmiot jest już założony')
          return
        }
        this.wearItem({item, previousItem})
        this.success(previousItem ? 'Podmieniono przedmiot' : 'Założono przedmiot')
      },
      /**
       * Calls mutation if this component is used to display my eqItems (only in this case, eqItems are editable)
       * @param item
       */
      remove: function (item) {
        if (!this.readOnly && !this.history) {
          this.takeOffItem(item)
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

  .default-tag {background-color: #cecece!important;color:white!important;}
  .unique-tag {background-color: orange!important;color:white!important;}
  .heroic-tag {background-color: #136bf7!important;color:white!important;}
  .legendary-tag {background-color: #f5383f!important;color:white!important;}

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
