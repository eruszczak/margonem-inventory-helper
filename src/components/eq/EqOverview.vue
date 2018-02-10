<template>
  <div v-if="isSource" :class="[margin]" class="mt1">
    <my-tag type="is-dark is-medium">{{ source.lvl }} lvl</my-tag>
    <my-taglist class="mt1" centered>
      <my-tag v-if="source.isConflict" type="is-danger">sprzeczne typy przedmiotów</my-tag>
      <my-tag v-else-if="source.allowedProfessions.length === 6" type="is-dark">wszystkie profesje</my-tag>
      <my-tag v-else v-for="prof in source.allowedProfessions" type="is-dark" :key="prof">{{ prof | encodeProf }}</my-tag>
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
    props: ['source', 'margin'],
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

