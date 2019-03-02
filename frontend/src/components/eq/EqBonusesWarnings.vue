<template>
  <div v-if="source.bonusWarnings && (source.bonusWarnings.decreased.length || isAnyLimitReached)">
    <hr style="border:0">
    <msg header="Uwagi do bonusów">
      <ul v-if="source.bonusWarnings">
        <li v-for="(item, index) in source.bonusWarnings.decreased" :key="index">{{ item }}</li>
        <li v-for="(value, key) in source.bonusWarnings.limit" :key="key">Przekroczono limit: {{ key }} (x{{ value }})</li>
        <li v-if="isAnyLimitReached">
          <small>Wartości oraz uwagi dla bonusu z przekroczonym limitem mogą być niepoprawne.</small>
        </li>
      </ul>
    </msg>
  </div>
</template>

<script>
  import { isObjEmpty } from '../../utils/helpers'

  export default {
    name: 'eq-bonuses-warnings',
    props: ['source'],
    computed: {
      isAnyLimitReached: function () {
        return !isObjEmpty(this.source.bonusWarnings.limit)
      }
    }
  }
</script>

<style scoped>

</style>
