<template>
  <div class="tooltipText">
    <p>{{ data.name }} <span class="green-color">{{ lvl }}</span></p>
    <!-- <p :class="className">*{{ rarity }}* {{ type }}</p> -->
    <p class="green-color">*{{ rarity }}* {{ type }}</p>
    <p v-if="professions.length" class="green-color">{{ professions }}</p>

    <div v-html="encodeItemMinorStats"></div>
    <template v-if="legbon">
      <!-- <p :class="className">{{ legbon.translation }}</p> -->
      <p class="green-color">{{ legbon.translation }}</p>
      <p v-if="legbonMaxDuration">{{ legbonMaxDuration }}</p>
    </template>
  </div>
</template>

<script>
  import {encodeProfessions, calculateMaxFullBonusDuration} from '../../utils/helpers'
  import {ITEM_RARITY, ITEM_TYPE, ITEM_BONUS, ITEM_STAT} from '../../utils/items'

  export default {
    name: 'item',
    props: ['data'],
    computed: {
      className: function () {
        return this.data.rarity + '-color'
      },
      lvl: function () {
        return this.data.lvl ? `(${this.data.lvl})` : ''
      },
      rarity: function () {
        return ITEM_RARITY[this.data.rarity]
      },
      type: function () {
        return ITEM_TYPE[this.data.type]
      },
      legbon: function () {
        return ITEM_BONUS[this.data.legbon]
      },
      legbonMaxDuration: function () {
        if (this.data.lvl) {
          let maxDuration = this.data.lvl + calculateMaxFullBonusDuration(this.data.lvl)
          return `Pełny czas działania: ${this.data.lvl} - ${maxDuration} lvl`
        }
        return ''
      },
      professions: function () {
        let professions = encodeProfessions(this.data.profession)
        // if (isItemWearable(this.data.type) && !professions.length) {
        if (this.data.profession.length === 6) {
          return 'wszystkie profesje'
        }
        return professions
      },
      encodeItemMinorStats: function () {
        // those data are already in the order
        let data = JSON.parse(this.data.json_stats)
        let encodedMinorStats = ''
        for (let attr in data) {
          if (attr in ITEM_STAT) {
            encodedMinorStats += `<p>${ITEM_STAT[attr].val.replace('{}', data[attr])}</p>`
          }
        }
        return encodedMinorStats
      }
    }
  }
</script>
