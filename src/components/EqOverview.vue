<template>
  <div>
    <b-tag type="is-dark is-medium" style="margin-top:10px;">{{ source.lvl }} lvl</b-tag>
    <b-taglist v-if="!source.isConflict">
      <b-tag v-if="source.allowedProfessions.length === 6" type="is-info">wszystkie profesje</b-tag>
      <b-tag v-else v-for="prof in source.allowedProfessions" type="is-info">{{ prof | encodeProf }}</b-tag>
    </b-taglist>
    <div class="tags">
      <span class="tag" v-for="rarity in ITEM_RARITY_IN_ORDER" :class="rarity + '-tag'">{{ source.rarity[rarity] || 0 }}</span>
    </div>
  </div>
</template>

<script>
  import { ITEM_BONUS, ITEM_BONUSES_IN_ORDER, ITEM_RARITY_IN_ORDER, CHARACTER_CLASSES } from '../utils/items'

  export default {
    name: 'eq-overview',
    props: ['source'],
    data () {
      return {
        ITEM_RARITY_IN_ORDER: ITEM_RARITY_IN_ORDER
      }
    },
    filters: {
      encodeProf: value => CHARACTER_CLASSES[value]
    }
  }
</script>

<style scoped>

</style>
