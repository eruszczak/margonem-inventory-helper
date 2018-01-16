import { CHARACTER_CLASSES_IN_ORDER, ITEM_BONUS } from './items'
import { calculateBonusWeakness, calculateHolyTouchAmount, isInt } from './helpers'

export const setStats = eqItems => {
  let source = {
    bonuses: {},
    lvl: 0,
    requiredProfessions: null,
    allowedProfessions: CHARACTER_CLASSES_IN_ORDER,
    isConflict: false
  }

  for (let placement in eqItems) {
    const item = eqItems[placement]
    if (!item) continue

    // get max lvl? or get array of lvls and pick max before this loop?
    if (item.lvl > source.lvl) {
      source.lvl = item.lvl
    }

    // check if this item's professions are not conflicting with current allowed professions
    if (item.profession && !source.isConflict) {
      const requiredProfessions = item.profession.split('')
      if (source.requiredProfessions === null) {
        source.requiredProfessions = requiredProfessions
      }
      source.isConflict = !professionsAreAllowed(source, requiredProfessions)
    }

    // update bonuses
    // TODO: legendary item you can wear which doesnt have lvl requirement??
    if (item.legbon) {
      const lvl = item.lvl
      const legBonus = ITEM_BONUS[item.legbon]
      if (item.legbon in source.bonuses) {
        let bonus = source.bonuses[item.legbon]
        bonus.count += 1
        bonus.limitReached = bonus.count > 2

        if (item.legbon === 'holytouch' && lvl > bonus.maxItemLvl) {
          bonus.maxItemLvl = lvl
          bonus.holyTouchAmount = calculateHolyTouchAmount(lvl)
        }

        if (item.legbon !== 'lastheal') {
          let legbonVal = calculateBonusWeakness(source.lvl, lvl, legBonus.value)
          bonus.value += legbonVal
        }
      } else {
        source.bonuses[item.legbon] = {
          count: 1,
          value: calculateBonusWeakness(source.lvl, lvl, legBonus.value),
          limitReached: false,
          maxItemLvl: lvl,
          lvl: lvl,
          // TODO: calculate amounts - not just for holy touch. like 14% for 2x curse
          holyTouchAmount: item.legbon === 'holytouch' ? calculateHolyTouchAmount(lvl) : null
        }
      }
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
            source[attr] = parseFloat(source[attr].toFixed(15))
          }
        }
      } else {
        source[attr] = stats[attr]
      }
    }
  }
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

export const eqItemsAreTheSame = (pks, pks2) => {
  return pks.length === pks2.length && pks.every((v, i) => v === pks2[i])
}
