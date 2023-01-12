<template>
  <router-link v-if="!noLink" :to="{name: 'itemView', params: {slug: data.slug}}">
    <div :id="data.slug" class="item" @contextmenu.prevent="itemRightClick(data)">
      <img class="itemborder" :class="[noBorder ? '' : 'borderRarity', data.rarity]" :src="data.img_url" :alt="data.name">
      <popup :data="data" :actionDescription="actionDescription"/>
    </div>
  </router-link>
  <div v-else :id="data.slug" class="item" @contextmenu.prevent="itemRightClick(data)">
    <img class="itemborder" :class="[noBorder ? '' : 'borderRarity', data.rarity]" :src="data.img_url" :alt="data.name">
  </div>
</template>

<script>
  import Popup from './Popup'
  import { mapActions, mapGetters } from 'vuex'
  import { RIGHT_CLICK_MAPPER } from '../../utils/constants'
  import { isItemWearable } from '../../utils/helpers'

  export default {
    name: 'item',
    props: {
      data: {
        type: Object,
        required: true
      },
      action: Number,
      noLink: {
        type: Boolean,
        default: false
      },
      noBorder: {
        type: Boolean,
        default: false
      }
    },
    components: {Popup},
    computed: {
      ...mapGetters(['eqItems', 'canAddToEq']),
      actionDescription () {
        if (!isItemWearable(this.data.type)) {
          return 'Nie można założyć'
        }
        switch (this.action) {
          case RIGHT_CLICK_MAPPER.ignore:
            return 'PPM nieaktywne'
          case RIGHT_CLICK_MAPPER.removeCompare:
            return 'PPM usunie z porównywarki'
          case RIGHT_CLICK_MAPPER.add: {
            if (!this.canAddToEq) {
              return 'PPM doda do porównywarki'
            }
            return 'PPM założy przedmiot'
          }
          case RIGHT_CLICK_MAPPER.remove: {
            if (!this.readOnly && !this.history) {
              return 'PPM zdejmie ten przedmiot'
            }
            return ''
          }
          default:
            return ''
        }
      }
    },
    methods: {
      ...mapActions(['wearItem', 'takeOffItem', 'compareItem', 'uncompareItem']),
      /**
       * Decides what to do when Item was right clicked
       * @param item Item that was right clicked
       */
      itemRightClick: function (item) {
        switch (this.action) {
          case RIGHT_CLICK_MAPPER.ignore:
            break
          case RIGHT_CLICK_MAPPER.removeCompare:
            this.uncompareItem({item, toast: this.$toast})
            break
          case RIGHT_CLICK_MAPPER.add:
            if (!this.canAddToEq) {
              this.compareItem({item, toast: this.$toast})
            } else {
              this.wearItem({item, toast: this.$toast})
            }
            break
          case RIGHT_CLICK_MAPPER.remove:
            if (!this.readOnly && !this.history) {
              this.takeOffItem({item, toast: this.$toast})
            }
            break
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
    background-image: url('../../assets/itembg.png');
    padding: 2px;
    margin: 1px;
  }

  .borderRarity {
    border: 2px solid
  }

  .white {
    color: white
  }

  .default {
    border-color: #cecece;
  }

  .unique {
    border-color: orange;
  }

  .heroic {
    border-color: #136bf7;
  }

  .legendary {
    border-color: #c60d14;
  }

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
