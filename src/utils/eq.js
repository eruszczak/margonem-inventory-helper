import { CHARACTER_CLASSES_IN_ORDER, ITEM_BONUS } from './items'
import { calculateBonusWeakness, calculateHolyTouchAmount, isInt } from './helpers'

export const setStats = (eqItems) => {
  console.error('in function', Object.values(eqItems), eqItems.helmet, Object.keys(source))
  let source = {}
  source.in_function = true
  let requiredProfessions = []
  let allowedProfessions = CHARACTER_CLASSES_IN_ORDER
  let bonuses = {}
  let requiredLvl = 0
  let bonusesSummary = ''
  let isConflict = false

  for (let placement in eqItems) {
    const item = eqItems[placement]
    if (!item) continue

    // get max lvl? or get array of lvls and pick max before this loop?
    if (item.lvl > requiredLvl) {
      requiredLvl = item.lvl
    }

    if (item.profession) {
      const requiredProfessions = item.profession.split('')
      // TODO
    }

    // update bonuses
    // TODO: legendary item you can wear which doesnt have lvl requirement??
    if (item.legbon) {
      const lvl = item.lvl
      const legBonus = ITEM_BONUS[item.legbon]
      if (item.legbon in bonuses) {
        let bonus = bonuses[item.legbon]
        bonus.count += 1
        bonus.limitReached = bonus.count > 2
  
        if (legbon === 'holytouch' && lvl > bonus.maxItemLvl) {
          bonus.maxItemLvl = lvl;
          bonus.holyTouchAmount = calculateHolyTouchAmount(lvl);
        }
  
        if (legbon !== 'lastheal') {
          let legbonVal = calculateBonusWeakness(requiredLvl, lvl, legBonus.value);
          bonus.value += legbonVal;
        }
      } else {
        bonuses[item.legbon] = {
          count: 1,
          value: calculateBonusWeakness(requiredLvl, lvl, legBonus.value),
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
  console.error(Object.keys(source))
  return source
}