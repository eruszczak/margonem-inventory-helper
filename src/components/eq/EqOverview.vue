<template>
  <div v-if="isSource">
    <my-tag type="is-dark is-medium" style="margin-top:10px;">{{ source.lvl }} lvl</my-tag>
    <my-taglist style="margin-top: 10px" centered>
      <my-tag v-if="source.isConflict" type="is-danger">sprzeczne typy przedmiotów</my-tag>
      <my-tag v-else-if="source.allowedProfessions.length === 6" type="is-warning">wszystkie profesje</my-tag>
      <my-tag v-else v-for="prof in source.allowedProfessions" type="is-warning" :key="prof">{{ prof | encodeProf }}</my-tag>
    </my-taglist>
    <my-taglist centered>
      <span class="tag" v-for="rarity in ITEM_RARITY_IN_ORDER"
            :class="rarity + '-tag'">{{ source.rarity[rarity] || 0 }}</span>
    </my-taglist>
  </div>
</template>

<script>
  import { CHARACTER_CLASSES, ITEM_RARITY_IN_ORDER } from '../../utils/items'
  import { isObjEmpty } from '../../utils/helpers'

  export default {
    name: 'eq-overview',
    props: ['source'],
    data () {
      return {
        ITEM_RARITY_IN_ORDER: ITEM_RARITY_IN_ORDER
      }
    },
    computed: {
      isSource: function () {
        return !isObjEmpty(this.source)
      }
    },
    methods: {
      isEmpty: function () {
        return !isObjEmpty(this.source)
      }
    },
    filters: {
      encodeProf: value => CHARACTER_CLASSES[value]
    }
  }
</script>

