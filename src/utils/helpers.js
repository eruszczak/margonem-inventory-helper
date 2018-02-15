import { CHARACTER_CLASSES, CHARACTER_CLASSES_IN_ORDER, ITEM_PLACE } from './items'

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

export const setPageTitle = val => {
  let title = 'MargoPrzedmioty - przeglądaj przedmioty z Margonem, buduj ekwipunek, porównuj statystyki.'
  if (val) {
    title = `${val} | ${title}`
  }
  window.document.title = title
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
  // if (lvlDiff > calculateMaxFullBonusDuration(itemLvl)) {
  //   itemBonusValue = round(itemBonusValue - 0.02 * lvlDiff)
  // }
  console.log(`${itemLvl} na ${requiredLvl} ma ${itemBonusValue}`)
  const myOdLvl = calculateMaxFullBonusDuration(itemLvl) + 1 + itemLvl
  let ile = 100 - (2 * (requiredLvl - myOdLvl + 1))
  ile = ile < 0 ? 0 : ile
  let dzialanie = (ile * itemBonusValue) / 100;
  if (dzialanie > itemBonusValue) {
    dzialanie = itemBonusValue
  }
  return dzialanie
}

export const isInt = (value) => {
  var er = /^-?[0-9]+$/
  return er.test(value)
}

export const getBaseUrl = () => {
  const port = location.port ? `:${location.port}` : ''
  return `${location.protocol}//${location.hostname}${port}`
}

export const getSlugs = eqItems => {
  let slugs = []
  for (let placement in eqItems) {
    const item = eqItems[placement]
    if (item) {
      slugs.push(item.slug)
    }
  }
  return slugs
}

export const getEqRoute = eqItems => {
  return {
    name: 'eqView',
    query: {
      i: getSlugs(eqItems)
    }
  }
}

export const getItemLvlGroups = () => {
  const groups = []
  const step = 25
  for (let i = 1; i < 320; i += step) {
    groups.push(`${i}-${i + step - 1}`)
  }
  let mapGroups = []
  for (let group of groups) {
    mapGroups.push({
      name: group,
      min: parseInt(group.split('-')[0]),
      max: parseInt(group.split('-')[1])
    })
  }
  return mapGroups.sort((a, b) => b.min - a.min)  // sorted descending by min
}

export const getProfsInOrder = () => {
  let profs = []
  for (let prof of CHARACTER_CLASSES_IN_ORDER) {
    profs.push({
      name: CHARACTER_CLASSES[prof],
      value: prof
    })
  }
  return profs
}

export const getEqUrl = (router, eqItems) => {
  const route = getEqRoute(eqItems)
  const path = router.resolve(route).href
  let qs = ''
  if (route.query.i.length === 0) {
    // add query string for eqs with no items
    qs = '?i='
  }
  return `${getBaseUrl()}${path}${qs}`
}

export const getCompareEqLink = eqItems => {
  let route = Object.assign({}, getEqRoute(eqItems))
  route.name = 'eqCompareView'
  return route
}

export const round = value => parseFloat(value.toFixed(2))

export const isObjEmpty = obj => {
  return Object.keys(obj).length === 0
}
