<template>
  <div>
    {{ globalStats }}
  </div>
</template>

<script>
  import { ITEM_STATS_IN_ORDER } from '../utils/items'
  import { mapGetters } from 'vuex'
  import { isInt } from '../utils/helpers'

  export default {
    name: 'eq-summary',
    props: ['readOnly'],
    data () {
      return {
        source: null
        // globalStats: {}
      }
    },
    created () {
      this.source = this.readOnly ? this.readOnlyEqItems : this.eqItems
    },
    computed: {
      ...mapGetters(['eqItems', 'readOnlyEqItems']),
      orderedStats: function () {
        let globalStatsInOrder = []
        for (let statInOrder of ITEM_STATS_IN_ORDER) {
          if (statInOrder in X) {
            let stat = {
              type: null,
              name: statInOrder
            }
            // if (['ds', 'di', 'dz'].indexOf(statInOrder) > -1) {
            //   let daRightValue = parseInt(this.rightOne['da'])
            //
            //   if (stat.rightValue && daRightValue) {
            //     stat.rightValue += ` (${parseInt(stat.rightValue) + daRightValue})`
            //   }
            // }
            globalStatsInOrder.push(stat)
          }
        }
        return globalStatsInOrder
      },
      globalStats: function () {
        // TODO: can i do this once and in order? this seems redundant
        // I think I can, for generating comparision I cant
        for (let itemPlace in this.source) {
          const item = this.source[itemPlace]
          if (!item) continue

          let stats = {}
          // todo: when items comes from localStorage its json but else its still string
          // console.error(item.json_stats)
          if (typeof item.json_stats === 'string') {
            stats = JSON.parse(item.json_stats)
          }

          // stats = item.stats_json

          for (let attr in stats) {
            if (this.globalStats.hasOwnProperty(attr)) {
              if (attr === 'dmg') {
                let currentRange = this.globalStats[attr].split('-')
                let newRange = stats[attr].split('-')
                let newMin = parseInt(currentRange[0]) + parseInt(newRange[0])
                let newMax = parseInt(currentRange[1]) + parseInt(newRange[1])
                this.globalStats[attr] = `${newMin}-${newMax}`
              } else {
                this.globalStats[attr] = parseFloat(this.globalStats[attr]) + parseFloat(stats[attr])
                if (!isInt(this.globalStats[attr])) {
                  this.globalStats[attr] = parseFloat(this.globalStats[attr].toFixed(15)) // remove trailing zeroes
                }
              }
            } else {
              this.globalStats[attr] = stats[attr]
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
