EQS = tuple(map(str, range(1, 15)))

TYPE_CHOICES = (
    (1, 'Jednoręczne'),
    (2, 'Dwuręczne'),
    (3, 'Półtoraręczne'),
    (4, 'Dystansowe'),
    (5, 'Pomocnicze'),
    (6, 'Różdzki'),
    (7, 'Laski'),
    (8, 'Zbroje'),
    (9, 'Hełmy'),
    (10, 'Buty'),
    (11, 'Rękawice'),
    (12, 'Pierścienie'),
    (13, 'Naszyjniki'),
    (14, 'Tarcze'),
    (15, 'Neutralne'),
    (16, 'Konsumpcyjne'),
    (17, 'Złoto'),
    (18, 'Klucze'),
    (19, 'Questowe'),
    (20, 'Odnawialne'),
    (21, 'Strzały'),
    (22, 'Talizmany'),
    (23, 'Książki'),
    (24, 'Torby'),
    (25, 'Mikstury'),
    (26, 'Eventowe')
)

LEGBON_CHOICES = (
    ('holytouch', 'dotyk'),
    ('dmgred', 'fizyczna'),
    ('verycrit', 'cbk'),
    ('resgain', 'ochrona'),
    ('critred', 'krytyczna'),
    ('lastheal', 'ostatni'),
    ('pushback', 'odrzut'),
    ('curse', 'klatwa')
)

DEFAULT_RARITY = 'default'
RARITY_CHOICES = (
    ('legendary', 'Legendarny'),
    ('unique', 'Unikatowy'),
    ('heroic', 'Heroiczny'),
    (DEFAULT_RARITY, 'Zwykły')
)

actions_translate = {
    'flee': 'Umożliwia ucieczkę z walki'
}

npc_lootbon_translate = {
    '2': 'Zwiększa 2x szansę na łup z zabitych potworów. Działa tylko dla samotnie walczącego gracza'
}

attack = [
    'dmg', 'pdmg', 'abdest', 'fire', 'light',
    'wound', 'wound_chance',
    'frost', 'frost_slowed',
    'poison', 'poison_slowed',
    'crit', 'pierce', 'critval', 'critmval', 'contra'
]

defensive = [
    'ac', 'absorb', 'absorbm', 'ds', 'di', 'dz', 'da', 'sa',
    'evade', 'blok', 'hp', 'hpbon', 'manabon', 'energybon', 'resacdmg', 'pierceb'
]


decrease = [
    'resmanaendest', 'resmanaendest_ene', 'lowheal2turns', 'lowevade', 'lowcritallval', 'npc_expbon'
]

destroy = [
    'manadest', 'endest', 'acdmg', 'adest'
]

helper = [
    'heal', 'slow', 'resdmg', 'lowcrit'
]

resistances = ['resfire', 'resfrost', 'act', 'reslight']

hp = ['perheal', 'leczy', 'fullheal', 'afterheal', 'afterheal_chance']

minor = [
    'gold', 'bag', '@IGNORE@amount', 'ammo', '@IGNORE@capacity',
    'ttl', 'resp', 'timelimit', 'respred', 'creditsbon', 'runes', '@IGNORE@worth'
]

ITEM_STATS_IN_ORDER = attack + defensive + decrease + destroy + helper + resistances + hp + minor
