<template>
  <div>
    <button @click="show=true">show</button>
    <!--{{ globalStats }}-->
    <p v-if="show"> {{ globalStats }}</p>

    <section>
      <b-field grouped group-multiline>
        <div class="control">
          <b-switch v-model="isLoading">Loading state</b-switch>
        </div>
      </b-field>

      <b-table
        :data="isEmpty ? [] : orderedStats"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
        :loading="isLoading"
        :mobile-cards="hasMobileCards">

        <template slot-scope="props">
          <b-table-column label="First Name">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column label="Last Name">
            {{ props.row.value }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon
                  icon="emoticon-sad"
                  size="is-large">
                </b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
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
        source: null,
        show: false,
        globalStats: {},
        isEmpty: false,
        isBordered: false,
        isStriped: false,
        isNarrowed: false,
        isHoverable: false,
        isLoading: false,
        hasMobileCards: true
      }
    },
    created () {
      this.source = this.readOnly ? this.readOnlyEqItems : this.eqItems
      this.getStats()
    },
    computed: {
      ...mapGetters(['eqItems', 'readOnlyEqItems']),
      orderedStats: function () {
        let globalStatsInOrder = []
        for (let statInOrder of ITEM_STATS_IN_ORDER) {
          if (statInOrder in this.globalStats) {
            let stat = {
              // type: null,
              name: statInOrder,
              value: this.globalStats[statInOrder]
            }
            if (['ds', 'di', 'dz'].indexOf(statInOrder) > -1) {
              let allAttrs = parseInt(this.globalStats['da'])
              if (stat.rightValue && allAttrs) {
                stat.rightValue += ` (${parseInt(stat.value) + allAttrs})`
              }
            }
            globalStatsInOrder.push(stat)
          }
        }
        return globalStatsInOrder
      }
    },
    methods: {
      getStats: function () {
        console.log('global stats')
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
