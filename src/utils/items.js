export const ITEM_RARITY = {
  default: 'zwykły',
  unique: 'unikatowy',
  heroic: 'heroiczny',
  legendary: 'legendarny'
}

export const ITEM_RARITY_IN_ORDER = ['default', 'unique', 'heroic', 'legendary']

export const ITEM_BONUS = {
  holytouch: {
    translation: 'dotyk anioła',
    description: 'szansa na uleczenie {} życia',
    value: 5
    // 4000hp na 10%
  },
  dmgred: {
    translation: 'fizyczna osłona',
    description: 'obrażenia fizyczne zmniejszone o 12%',
    value: 12
    // 24%
  },
  verycrit: {
    translation: 'cios bardzo krytyczny',
    description: '10% szansy na podwojenie mocy ciosu krytycznego',
    value: 10
    // 20%
  },
  resgain: {
    translation: 'ochrona żywiołów',
    description: '12% szans na 90% odporności przyjmując cios magiczny',
    value: 12
    // 24%
  },
  critred: {
    translation: 'krytyczna osłona',
    description: 'przyjmowane ciosy krytyczne są słabsze',
    value: 15
    // 30%
  },
  lastheal: {
    translation: 'ostatni ratunek',
    description: 'uleczenie do 30-50% życia kiedy gracz ma mniej niż 12% życia',
    value: 12
    // 12% na 60%
  },
  pushback: {
    translation: 'odrzut',
    description: '8% szans na cofnięcie przeciwnika o krok',
    value: 8
    // 16%
  },
  curse: {
    translation: 'klątwa',
    description: '7% szans na to, że przeciwnik straci turę',
    value: 7
    // 14%
  }
}

export const ITEM_BONUSES_IN_ORDER = [
  'curse', 'pushback', 'holytouch', 'lastheal',
  'dmgred', 'critred', 'resgain', 'verycrit'
]

export const ITEM_TYPE = {
  1: 'jednoręczne',
  2: 'dwuręczne',
  3: 'półtoraręczne',
  4: 'dystansowe',
  5: 'pomocnicze',
  6: 'różdżki',
  7: 'laski',
  8: 'zbroje',
  9: 'hełmy',
  10: 'buty',
  11: 'rękawice',
  12: 'pierścienie',
  13: 'naszyjniki',
  14: 'tarcze',
  15: 'neutralne',
  16: 'konsumpcyjne',
  17: 'złoto',
  18: 'klucze',
  19: 'questowe',
  20: 'odnawialne',
  21: 'strzały',
  22: 'talizmany',
  23: 'ksiażki',
  24: 'torby',
  25: 'mikstury',
  26: 'eventowe'
}

export const ITEM_PLACE = {
  1: 'primary',
  2: 'primary',
  3: 'primary',
  4: 'primary',
  6: 'primary',
  7: 'primary',

  5: 'secondary',
  14: 'secondary',
  21: 'secondary',

  8: 'armor',
  9: 'helmet',
  10: 'boots',
  11: 'gloves',
  12: 'ring',
  13: 'necklace',

  25: 'blessing'
}

export const CHARACTER_CLASSES = {
  w: 'wojownik',
  b: 'tancerz',
  h: 'łowca',
  t: 'tropiciel',
  m: 'mag',
  p: 'paladyn'
}

export const CHARACTER_CLASSES_IN_ORDER = ['m', 'p', 'w', 'b', 'h', 't']

export const ITEM_STATS_IN_ORDER = [
  'dmg', 'pdmg', 'abdest', 'fire', 'light', 'wound', 'wound_chance', 'frost',
  'frost_slowed', 'poison', 'poison_slowed', 'crit', 'pierce', 'critval', 'critmval',
  'contra',

  'ac', 'absorb', 'absorbm', 'ds', 'di', 'dz', 'da', 'sa',
  'evade', 'blok', 'hp', 'hpbon', 'manabon', 'energybon', 'resacdmg', 'pierceb',

  'resmanaendest', 'resmanaendest_ene', 'lowheal2turns', 'lowevade', 'lowcritallval',

  'manadest', 'endest', 'acdmg', 'adest',

  'heal', 'slow', 'resdmg', 'lowcrit',

  'resfire', 'resfrost', 'act', 'reslight',

  'perheal', 'leczy', 'fullheal', 'afterheal', 'afterheal_chance',

  'gold', 'bag', 'amount', 'ammo', 'capacity',
  'ttl', 'resp', 'timelimit', 'respred', 'creditsbon', 'runes', 'worth'
]

export const ITEM_STAT = {
  dmg: {val: 'Atak: {}', val2: 'Atak'},
  pdmg: {val: 'Atak fizyczny: {}', val2: 'Atak fizyczny'},
  light: {val: 'Obrażenia od błyskawic ~{}', val2: 'Obrażenia od błyskawic'},
  fire: {val: 'Obrażenia od ognia ~{}', val2: 'Obrażenia od ognia'},
  frost: {val: 'Obrażenia od zimna ~{}', val2: 'Obrażenia od zimna'},
  frost_slowed: {val: 'oraz spowalnia cel o {} SA', val2: 'spowalnia cel o'},
  wound_chance: {val: 'Głęboka rana: {} szans', val2: 'Głęboka rana'},
  wound: {val: 'na +{} obrażeń', val2: 'Głęboka rana obrażenia'},
  poison: {val: 'Obrażenia od trucizny +{}', val2: 'Obrażenia od trucizny'},
  poison_slowed: {val: 'oraz spowalnia cel o {} SA', val2: 'spowalnia cel o'},

  ac: {val: 'Pancerz: {}', val2: 'Pancerz'},
  crit: {val: 'Cios krytyczny +{}%', val2: 'Cios krytyczny'},
  pierce: {val: 'Przebicie pancerza +{}%', val2: 'Przebicie pancerza'},
  pierceb: {val: '{}% szans na zablokowanie przebicia', val2: 'Zablokowanie przebicia'},
  bag: {val: 'Mieści {} przedmioty', val2: 'Miejsc na przedmioty'},
  lowcrit: {val: 'Obniża cios krytyczny przeciwnika o {}%', val2: 'Obniża cios krytyczny przeciwnika'},
  critval: {val: 'Siła krytyka fizycznego +{}%', val2: 'Siła krytyka fizycznego'},
  critmval: {val: 'Siła krytyka magicznego +{}%', val2: 'Siła krytyka magicznego'},
  amount: {val: 'Ilość: {} (nie można dzielić)', val2: 'Ilość'},
  hpbon: {val: '{} życia za 1 pkt siły', val2: 'Punkty hp za 1 siły'},
  hp: {val: 'Życie +{}', val2: 'Życie'},
  adest: {val: 'Zadaje {} obrażeń właścicielowi', val2: 'Zadaje obrażenia właścicielowi'},
  ds: {val: 'Siła +{}', val2: 'Siła'},
  dz: {val: 'Zręczność +{}', val2: 'Zręczność'},
  di: {val: 'Intelekt +{}', val2: 'Intelekt'},
  da: {val: 'Wszystkie cechy +{}', val2: 'Wszystkie cechy'},
  absorbm: {val: 'Absorbuje do {} obrażeń mag.', val2: 'Absorpcje magiczne'},
  absorb: {val: 'Absorbuje do {} obrażeń fiz.', val2: 'Absorpcje fizyczne'},
  slow: {val: 'Obniża SA przeciwnika o {}%', val2: 'Obniżanie SA'},
  sa: {val: 'SA +{}%', val2: 'Szybkość ataku'},
  evade: {val: 'Unik +{}', val2: 'Unik'},
  lowevade: {val: 'Obniża unik przeciwnika o {}', val2: 'Obniżanie uniku'},
  acdmg: {val: 'Niszczy {} pancerza', val2: 'Niszczenie pancerza'},
  endest: {val: 'Niszczy {} energii', val2: 'Niszczenie energii'},
  manadest: {val: 'Niszczy {} many', val2: 'Niszczenie many'},
  manabon: {val: 'Mana +{}', val2: 'Mana'},
  energybon: {val: 'Energia +{}', val2: 'Energia'},
  resfire: {val: 'Odporność na ogień {}%', val2: 'Odporność na ogień'},
  reslight: {val: 'Odporność na błyskawice {}%', val2: 'Odporność na błyskawice'},
  resfrost: {val: 'Odporność na zimno {}%', val2: 'Odporność na zimno'},
  act: {val: 'Odporność na truciznę {}%', val2: 'Odporność na truciznę'},
  resdmg: {val: 'Obniżenie odporności o {}%', val2: 'Obniżenie odporności'},
  leczy: {val: 'Leczy {} punktów życia', val2: 'Leczenie punktów życia'},
  ttl: {val: 'Zniknie za {} minut', val2: 'Zniknie za (minuty)'},
  abdest: {val: 'Niszczenie {} absorpcji przed atakiem', val2: 'Niszczenie absorpcji'},
  contra: {val: '{}% szans na kontrę po krytyku', val2: 'Szanse na kontre po krytyku'},
  ammo: {val: 'Ilość: {}', val2: 'Ilość'},
  capacity: {val: 'Maksimum {} sztuk razem', val2: 'Maksimum sztuk razem'},
  gold: {val: 'Złoto: {}', val2: 'Złoto'},
  respred: {val: 'Przyśpiesza wracanie do siebie o {}%', val2: 'Przyśpiesza wracanie do siebie'},
  fullheal: {val: 'Pełne leczenie: {}', val2: 'Pełne leczenie'},
  runes: {val: 'Dodaje {} smoczych run', val2: 'Dodaje smocze runy'},
  timelimit: {val: 'Można używać co {} minut', val2: 'Można używać co'},
  heal: {val: 'Przywraca {} punktów życia podczas walki', val2: 'Przywracanie hp podczas walki'},
  blok: {val: 'Blok: {}', val2: 'Blok'},

  creditsbon: {val: 'Dodaje {} smoczych łusek', val2: 'Dodaje smocze łuski'},
  resp: {val: 'Czas odnowienia: {}', val2: 'Czas odnowienia'},
  perheal: {val: 'Leczy {}% życia', val2: 'Leczy % życia'},
  resacdmg: {val: 'Ochrona przed niszczeniem pancerza: {}', val2: 'Ochrona przed niszczeniem pancerza'},
  lowheal2turns: {val: 'Obniżenie leczenia turowego przeciwnika na 2 tury o {}', val2: 'Obniżenie leczenia turowego przeciwnika na 2 tury'},
  resmanaendest: {val: 'Obniżanie niszczenia many o {}', val2: 'Obniżanie niszczenia many'},
  resmanaendest_ene: {val: 'Obniżanie niszczenia energii o {}', val2: 'Obniżanie niszczenia energii'},
  // TODO %??
  lowcritallval: {val: 'Obniżenie mocy krytyka fizycznego i magicznego o {}', val2: 'Obniżenie mocy krytyka fizycznego i magicznego'},
  worth: {val: 'Wartość: {}', val2: 'Wartość'}
}

export const getDefaultEqItems = () => {
  return Object.assign({}, DEFAULT_EQ_ITEMS)
}

export const DEFAULT_EQ_ITEMS = {
  primary: null,
  secondary: null,
  armor: null,
  helmet: null,
  boots: null,
  gloves: null,
  ring: null,
  necklace: null,
  blessing: null
}

export const EQ_ITEMS_ROWS = [
  ['blessing', 'helmet', ''],
  ['ring', 'necklace', 'gloves'],
  ['primary', 'armor', 'secondary'],
  ['', 'boots', '']
]
