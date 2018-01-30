<template>
  <div v-if="source.bonusWarnings.decreased.length || isAnyLimitReached">
    <hr style="border:0">
    {{source.bonusWarnings}}
    <b-message title="Uwagi do bonusów" type="is-warning" :closable="false">
      <ul v-if="isWarnings">
        <li v-for="item in source.bonusWarnings.decreased">{{ item }}</li>
        <li v-for="(value, key) in source.bonusWarnings.limit">Przekroczono limit: {{ key }} (x{{ value }})</li>
        <li v-if="isAnyLimitReached"><small>Wartości oraz uwagi dla bonusu z przekroczonym limitem mogą być niepoprawne.</small></li>
      </ul>
    </b-message>
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
      },
      isWarnings: function () {
        return !isObjEmpty(this.source.bonusWarnings)
      }
    }
  }
</script>

<style scoped>

</style>
