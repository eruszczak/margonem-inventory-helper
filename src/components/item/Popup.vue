<template>
  <div class="tooltipText" v-if="data">
    <p class="action-description">{{ actionDescription }}</p>
    <p>{{ data.name }} <span class="green-color" v-if="data.lvl"> ({{ data.lvl }})</span></p>
    <p class="green-color">*{{ data.rarity | encodeRarity }}* {{ data.type | encodeType }}</p>
    <p v-if="professions.length" class="green-color">{{ professions }}</p>
    <div v-html="itemStats"></div>
    <template v-if="legbon">
      <p class="green-color">{{ legbon.translation }}</p>
      <p v-if="legbonMaxDuration">{{ legbonMaxDuration }}</p>
    </template>
  </div>
</template>

<script>
  import {item} from '../mixins/item'

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
    }
  }
</script>

<style scoped>
  .action-description {
    font-style:italic;
    margin: 0 auto 5px;
  }
</style>
