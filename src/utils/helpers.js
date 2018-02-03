import { CHARACTER_CLASSES, CHARACTER_CLASSES_IN_ORDER, ITEM_PLACE, ITEM_STAT, ITEM_STATS_IN_ORDER } from './items'

const MAX_BONUS_DURATION = 30

export const encodeProfessions = (arr) => {
  if (!arr) {
    return ''
  }
  let professions = []
  for (const profession of CHARACTER_CLASSES_IN_ORDER) {
    if (arr.indexOf(profession) > -1) {
      professions.push(CHARACTER_CLASSES[profession])
    }
  }
  return professions.join(', ')
}

export const isItemWearable = (itemType) => {
  return itemType in ITEM_PLACE
}

export const encodeAndSetSummaryStats = (summaryStats) => {
  let endodedStats = ''
  for (const attr of ITEM_STATS_IN_ORDER) {
    if (attr in summaryStats) {
      endodedStats += `<p>${ITEM_STAT[attr].replace('{}', summaryStats[attr])}</p>`
    }
  }
  return endodedStats
}

export const calculateHolyTouchAmount = (itemLvl) => {
  let val = 8 + itemLvl + (0.02 * itemLvl * itemLvl + 2.6 * itemLvl) / 5
  return MAX_BONUS_DURATION * Math.round(val)
}

export const calculateMaxFullBonusDuration = (itemLvl) => {
  return Math.round(Math.max(MAX_BONUS_DURATION, 0.25 * itemLvl))
}

export const calculateBonusWeakness = (requiredLvl, itemLvl, itemBonusValue) => {
  let lvlDiff = requiredLvl - itemLvl
  if (lvlDiff > calculateMaxFullBonusDuration(itemLvl)) {
    return round(itemBonusValue - 0.02 * lvlDiff)
  }
  return itemBonusValue
}

export const isInt = (value) => {
  var er = /^-?[0-9]+$/
  return er.test(value)
}

export const objectToQueryString = (obj) => {
  let str = []
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    }
  }
  return str.join('&')
}

export const removePairsWithEmptyValues = (obj) => {
  let objWithNoEmptyValues = {}
  for (const key in obj) {
    const value = obj[key]
    if (value) {
      objWithNoEmptyValues[key] = value
    }
  }
  return objWithNoEmptyValues
}

export const prependToPageTitle = (val) => {
  const title = 'MargoPrzedmioty - przeglądaj przedmioty z Margonem, buduj ekwipunek, porównuj statystyki.'
  if (val) {
    return `${val}. ${title}`
  }
  return title
}

export const getBaseUrl = () => {
  const port = location.port ? `:${location.port}` : ''
  return `${location.protocol}//${location.hostname}${port}`
}

const getSlugs = (eqItems) => {
  let slugs = []
  for (let placement in eqItems) {
    const item = eqItems[placement]
    if (item) {
      slugs.push(item.slug)
    }
  }
  return slugs
}

export const getEqRoute = (eqItems) => {
  return {
    name: 'eqView',
    query: {
      i: getSlugs(eqItems)
    }
  }
}

export const getEqUrl = (router, eqItems) => {
  return `${getBaseUrl()}${router.resolve(getEqRoute(eqItems)).href}`
}

export const replaceDiacritics = (value) => {
  for (let val in DIACTRITICS) {
    value = value.replace(val, DIACTRITICS[val])
  }
  return value
}

const DIACTRITICS = {
  'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z'
}

export const round = value => parseFloat(value.toFixed(2))

export const isObjEmpty = obj => {
  return Object.keys(obj).length === 0
}
