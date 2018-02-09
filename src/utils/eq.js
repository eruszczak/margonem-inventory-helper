import { CHARACTER_CLASSES_IN_ORDER, ITEM_BONUS } from './items'
import { calculateBonusWeakness, calculateHolyTouchAmount, isInt, round } from './helpers'
import { BONUS_LIMIT } from './constants'

export const setStats = eqItems => {
  let source = {
    lvl: 0,
    requiredProfessions: null,
    allowedProfessions: CHARACTER_CLASSES_IN_ORDER,
    isConflict: false,
    rarity: {},
    bonusWarnings: {
      decreased: [],
      limit: {}
    }
  }

  for (let placement in eqItems) {
    const item = eqItems[placement]
    if (!item) continue

    // get max lvl? or get array of lvls and pick max before this loop?
    if (item.lvl > source.lvl) {
      source.lvl = item.lvl
    }

    if (item.rarity in source.rarity) {
      source.rarity[item.rarity] += 1
    } else {
      source.rarity[item.rarity] = 1
    }

    // check if this item's professions are not conflicting with current allowed professions
    if (item.profession && !source.isConflict) {
      const requiredProfessions = item.profession.split('')
      if (source.requiredProfessions === null) {
        source.requiredProfessions = requiredProfessions
      }
      source.isConflict = !professionsAreAllowed(source, requiredProfessions)
    }

    // update eq stats
    const stats = JSON.parse(item.json_stats)
    for (let attr in stats) {
      if (attr in source) {
        if (attr === 'dmg') {
          let currentRange = source[attr].split('-')
          let newRange = stats[attr].split('-')
          let newMin = parseInt(currentRange[0]) + parseInt(newRange[0])
          let newMax = parseInt(currentRange[1]) + parseInt(newRange[1])
          source[attr] = `${newMin}-${newMax}`
        } else {
          source[attr] = parseFloat(source[attr]) + parseFloat(stats[attr])
          if (!isInt(source[attr])) {
            source[attr] = round(source[attr])
          }
        }
      } else {
        source[attr] = stats[attr]
      }
    }
  }
  source.bonuses = getBonuses(source, eqItems)
  return source
}

const professionsAreAllowed = (source, professions) => {
  // exclude every prof that is not required by this item's professions
  source.allowedProfessions = source.allowedProfessions.filter(prof => professions.indexOf(prof) > -1)
  for (let prof of professions) {
    if (source.allowedProfessions.indexOf(prof) !== -1) {
      return true
    }
  }
  return false
}

export const getOrderedPksOfEqItems = eqItems => {
  let pks = []
  for (let placement in eqItems) {
    const item = eqItems[placement]
    if (item) {
      pks.push(item.pk)
    }
  }
  pks.sort((el, el2) => el > el2)
  return pks
}

export const getBonuses = (source, eqItems) => {
  let bonuses = {}
  for (let placement in eqItems) {
    const item = eqItems[placement]
    if (item && item.legbon in ITEM_BONUS) {
      const legBonus = ITEM_BONUS[item.legbon]
      if (item.legbon in bonuses) {
        let bonus = bonuses[item.legbon]
        bonus.count += 1
        bonus.limitReached = bonus.count > BONUS_LIMIT
        if (!bonus.limitReached) {
          if (item.legbon === 'lastheal') {
            const val1 = calculateBonusWeakness(source.lvl, item.lvl, legBonus.range[0])
            const previousVal = bonus.range[0]
            bonus.value = `do ${val1 + previousVal}`
            setBonusDecreased(val1, legBonus.range[0], source, item)
          } else {
            let legbonVal = calculateBonusWeakness(source.lvl, item.lvl, legBonus.value)
            setBonusDecreased(legbonVal, legBonus.value, source, item)
            bonus.value += legbonVal
            bonus.value = round(bonus.value)
          }

          if (item.legbon === 'holytouch' && item.lvl > bonus.lvl) {
            bonus.amount = `na ${calculateHolyTouchAmount(item.lvl)} hp`
          }
        } else {
          const bonusDisplay = ITEM_BONUS[item.legbon].translation
          source.bonusWarnings.limit[bonusDisplay] = bonus.count
        }
      } else {
        let bonus = {
          count: 1,
          limitReached: false,
          lvl: item.lvl,
          amount: ''
        }
        if (item.legbon === 'lastheal') {
          const val1 = calculateBonusWeakness(source.lvl, item.lvl, legBonus.range[0])
          const val2 = calculateBonusWeakness(source.lvl, item.lvl, legBonus.range[1])
          bonus.range = [val1, val2]
          bonus.value = `do ${val1}-${val2}`
          setBonusDecreased(val1, legBonus.range[0], source, item)
        } else {
          bonus.value = calculateBonusWeakness(source.lvl, item.lvl, legBonus.value)
          setBonusDecreased(bonus.value, legBonus.value, source, item)
        }

        if (item.legbon === 'holytouch') {
          bonus.amount = `na ${calculateHolyTouchAmount(item.lvl)} hp`
        }
        bonuses[item.legbon] = bonus
      }
    }
  }
  return bonuses
}

const setBonusDecreased = (actualValue, fullValue, source, item) => {
  if (actualValue < fullValue) {
    const diff = actualValue - fullValue
    source.bonusWarnings.decreased.push(
      `${item.name} (${item.lvl}) na ${source.lvl} lvl ma ${actualValue}% (${round(diff)})`
    )
  }
}

export const eqItemsAreTheSame = (pks, pks2) => {
  return pks.length === pks2.length && pks.every((v, i) => v === pks2[i])
}
