export const MENU_LINKS = [
  {
    name: 'Bronie',
    sublinks: [
      {displayValue: 'Jednoręczne', href: {name: 'items', query: {type: 'jednoreczne'}}},
      {displayValue: 'Dwuręczne', href: {name: 'items', query: {type: 'dwureczne'}}},
      {displayValue: 'Półtoraręczne', href: {name: 'items', query: {type: 'poltorareczne'}}},
      {displayValue: 'Dystansowe', href: {name: 'items', query: {type: 'dystansowe'}}},
      {displayValue: 'Pomocnicze', href: {name: 'items', query: {type: 'pomocnicze'}}},
      {displayValue: 'Różdżki', href: {name: 'items', query: {type: 'rozdzki'}}},
      {displayValue: 'Laski', href: {name: 'items', query: {type: 'laski'}}}
    ]
  },
  {
    name: 'Ekwipunek',
    sublinks: [
      {displayValue: 'Zbroje', href: {name: 'items', query: {type: 'zbroje'}}},
      {displayValue: 'Hełmy', href: {name: 'items', query: {type: 'helmy'}}},
      {displayValue: 'Buty', href: {name: 'items', query: {type: 'buty'}}},
      {displayValue: 'Rękawice', href: {name: 'items', query: {type: 'rekawice'}}},
      {displayValue: 'Pierścienie', href: {name: 'items', query: {type: 'pierscienie'}}},
      {displayValue: 'Naszyjniki', href: {name: 'items', query: {type: 'naszyjniki'}}},
      {displayValue: 'Tarcze', href: {name: 'items', query: {type: 'tarcze'}}}
    ]
  },
  {
    name: 'Pozostałe',
    sublinks: [
      {displayValue: 'Neutralne', href: {name: 'items', query: {type: 'neutralne'}}},
      {displayValue: 'Konsumpcyjne', href: {name: 'items', query: {type: 'konsumpcyjne'}}},
      {displayValue: 'Strzały', href: {name: 'items', query: {type: 'strzaly'}}},
      {displayValue: 'Talizmany', href: {name: 'items', query: {type: 'talizmany'}}},
      {displayValue: 'Torby', href: {name: 'items', query: {type: 'torby'}}},
      {displayValue: 'Mikstury', href: {name: 'items', query: {type: 'mikstury'}}}
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
