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
    'resmanaendest', 'resmanaendest_ene', 'lowheal2turns', 'lowevade', 'lowcritallval'
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

ITEM_STATS = attack + defensive + decrease + destroy + helper + resistances + hp + minor
