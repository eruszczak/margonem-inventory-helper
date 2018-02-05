import {ITEM_BONUS, ITEM_RARITY, ITEM_STAT, ITEM_TYPE} from '../../utils/items'
import {calculateMaxFullBonusDuration, encodeProfessions} from '../../utils/helpers'

export const item = {
  methods: {
    getClassName (itemRarity) {
      return `${itemRarity}-color`
    },
    getLegbonMaxDuration (itemLvl) {
      if (itemLvl) {
        let maxDuration = this.data.lvl + calculateMaxFullBonusDuration(itemLvl)
        return `Pełny czas działania: ${itemLvl} - ${maxDuration} lvl`
      }
      return ''
    },
    getProfessions (itemProfession) {
      let professions = encodeProfessions(itemProfession)
      if (itemProfession.length === 6) {
        return 'wszystkie profesje'
      }
      return professions
    },
    getEncodeDItemStats (itemStats) {
      let data = JSON.parse(itemStats)
      let encodedMinorStats = ''
      for (let attr in data) {
        if (attr in ITEM_STAT) {
          encodedMinorStats += `<p>${ITEM_STAT[attr].val.replace('{}', data[attr])}</p>`
        }
      }
      return encodedMinorStats
    },
    getLegbon (itemLegbon) {
      return ITEM_BONUS[itemLegbon]
    }
  },
  filters: {
    encodeRarity (value) {
      return ITEM_RARITY[value]
    },
    encodeType (value) {
      return ITEM_TYPE[value]
    }
  }
}
