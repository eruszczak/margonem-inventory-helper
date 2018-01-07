<template>
  <div>{{data}}</div>
  <!--<router-link :to="{name: 'singleItem', params: {itemId: data.slug, data: data} }">-->
    <!--<div :id="data.slug" class="item" @contextmenu.prevent="$emit('rightClick', data)">-->
      <!--<img class="itemborder borderRarity" :class="data.rarity" :src="data.img" :alt="data.name">-->
      <!--<div class="tooltipText">-->
        <!--&lt;!&ndash;<tooltip :stats="stats"></tooltip>&ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash; <p><span v-my-tooltip.right="message">{{ message }}</span></p> &ndash;&gt;-->
    <!--</div>-->
  <!--</router-link>-->
</template>

<script>
  // import Tooltip from './Tooltip'

  export default {
    name: 'item',
    props: ['data'],
    // components: {
    //   Tooltip
    // },
    data () {
      return {
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
    width: 220px;
    background-color: black;
    color: #fff;
    font-size: 12px;
    text-align: left;
    padding: 5px 0;
    padding-left: 8px;
    border-radius: 6px;
    position: absolute;
    z-index: 100;
    opacity: 1
  }

  .item .tooltipText p {
    margin-bottom: 5px;
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
