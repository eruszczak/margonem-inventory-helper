export const MENU_LINKS = [
  {
    name: 'Bronie',
    sublinks: [
      {displayValue: 'Jednoręczne', href: {name: 'items', params: {type: 'jednoreczne'}}},
      {displayValue: 'Dwuręczne', href: {name: 'items', params: {type: 'dwureczne'}}},
      {displayValue: 'Półtoraręczne', href: {name: 'items', params: {type: 'poltorareczne'}}},
      {displayValue: 'Dystansowe', href: {name: 'items', params: {type: 'dystansowe'}}},
      {displayValue: 'Pomocnicze', href: {name: 'items', params: {type: 'pomocnicze'}}},
      {displayValue: 'Różdżki', href: {name: 'items', params: {type: 'rozdzki'}}},
      {displayValue: 'Laski', href: {name: 'items', params: {type: 'laski'}}}
    ]
  },
  {
    name: 'Ekwipunek',
    sublinks: [
      {displayValue: 'Zbroje', href: {name: 'items', params: {type: 'zbroje'}}},
      {displayValue: 'Hełmy', href: {name: 'items', params: {type: 'helmy'}}},
      {displayValue: 'Buty', href: {name: 'items', params: {type: 'buty'}}},
      {displayValue: 'Rękawice', href: {name: 'items', params: {type: 'rekawice'}}},
      {displayValue: 'Pierścienie', href: {name: 'items', params: {type: 'pierscienie'}}},
      {displayValue: 'Naszyjniki', href: {name: 'items', params: {type: 'naszyjniki'}}},
      {displayValue: 'Tarcze', href: {name: 'items', params: {type: 'tarcze'}}}
    ]
  },
  {
    name: 'Pozostałe',
    sublinks: [
      {displayValue: 'Neutralne', href: {name: 'items', params: {type: 'neutralne'}}},
      {displayValue: 'Konsumpcyjne', href: {name: 'items', params: {type: 'konsumpcyjne'}}},
      {displayValue: 'Strzały', href: {name: 'items', params: {type: 'strzaly'}}},
      {displayValue: 'Talizmany', href: {name: 'items', params: {type: 'talizmany'}}},
      {displayValue: 'Torby', href: {name: 'items', params: {type: 'torby'}}},
      {displayValue: 'Mikstury', href: {name: 'items', params: {type: 'mikstury'}}}
    ]
  }
]

export const MAP_TYPE_NAME_TO_ID = {
  jednoreczne: 1,
  dwureczne: 2,
  poltorareczne: 3,
  dystansowe: 4,
  pomocnicze: 5,
  rozdzki: 6,
  laski: 7,
  zbroje: 8,
  helmy: 9,
  buty: 10,
  rekawice: 11,
  pierscienie: 12,
  naszyjniki: 13,
  tarcze: 14,
  neutralne: 15,
  konsumpcyjne: 16,
  strzaly: 21,
  talizmany: 22,
  torby: 24,
  mikstury: 25
}
