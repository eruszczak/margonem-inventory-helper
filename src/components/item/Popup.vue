<template>
  <div class="tooltipText">
    <p class="action-description">{{ actionDescription }}</p>
    <p :class="itemClass">{{ data.name }} <span v-if="data.lvl"> ({{ data.lvl }})</span></p>
    <p :class="itemClass">{{ data.rarity | encodeRarity }}, {{ data.type | encodeType }}</p>
    <p v-if="professions.length" :class="itemClass">{{ professions }}</p>
    <div v-html="itemStats"></div>
    <template v-if="legbon">
      <p :class="itemClass">{{ legbon.translation }}</p>
      <p v-if="legbonMaxDuration">{{ legbonMaxDuration }}</p>
    </template>
  </div>
</template>

<script>
  import {item} from '../mixins/item'
  import { RARITY_CLASSES } from '../../utils/constants'

  export default {
    name: 'item',
    mixins: [item],
    props: {
      data: {
        type: Object,
        required: true
      },
      actionDescription: String
    },
    data () {
      return {
        legbonMaxDuration: this.getLegbonMaxDuration(this.data.lvl),
        professions: this.getProfessions(this.data.profession),
        itemStats: this.getEncodeDItemStats(this.data.json_stats),
        lvl: this.data.lvl ? `(${this.data.lvl})` : '',
        legbon: this.getLegbon(this.data.legbon)
      }
    },
    computed: {
      itemClass () {
        return RARITY_CLASSES[this.data.rarity]
      }
    }
  }
</script>

<style scoped>
  .action-description {
    font-style:italic;
    margin: 0 auto 5px;
  }
</style>
