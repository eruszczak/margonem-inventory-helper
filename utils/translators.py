# -*- coding: utf-8 -*-

BONUSES = ['holytouch', 'dmgred', 'verycrit', 'resgain', 'critred', 'lastheal', 'pushback', 'curse']
RARITY = ['legendary', 'unique', 'heroic', 'default']
CHARACTERS = ['w', 'b', 'h', 't', 'm', 'p']

# translations are used for admin interface
itemtype_translate = {
    '1': 'jednoreczne',
    '2': 'dwureczne',
    '3': 'poltorareczne',
    '4': 'dystansowe',
    '5': 'pomocnicze',
    '6': 'rozdzki',
    '7': 'laski',
    '8': 'zbroje',
    '9': 'helmy',
    '10': 'buty',
    '11': 'rekawice',
    '12': 'pierscienie',
    '13': 'naszyjniki',
    '14': 'tarcze',
    '15': 'neutralne',
    '16': 'konsumpcyjne',
    '17': 'zloto',
    '18': 'klucze',
    '19': 'questowe',
    '20': 'odnawialne',
    '21': 'strzaly',
    '22': 'talizmany',
    '23': 'ksiazki',
    '24': 'torby',
    '25': 'mikstury',
    # '26': 'eventowe',
}

actions_translate = {
    'flee': 'Umożliwia ucieczkę z walki'
}

npc_lootbon_translate = {
    '2': 'Zwiększa 2x szansę na łup z zabitych potworów. Działa tylko dla samotnie walczącego gracza'
}

# stats_in_order = 'name typ lvl'
stats_in_order = ''
stats_in_order += 'dmg pdmg abdest fire light wound wound_chance frost frost_slowed poison poison_slowed'
stats_in_order += ' crit pierce critval critmval contra pierceb'
stats_in_order += ' ac absorb absorbm ds di dz da sa evade blok hp hpbon'
stats_in_order += ' manabon energybon manadest endest acdmg adest heal slow lowevade resdmg lowcrit'
stats_in_order += ' resfire resfrost act reslight'
stats_in_order += ' bag amount leczy ttl ammo capacity gold respred fullheal runes timelimit'
stats_in_order += ' afterheal afterheal_chance resp perheal'
stats_in_order += ' lowheal2turns resmanaendest resmanaendest_ene resacdmg lowcritallval creditsbon worth'
stats_in_order = stats_in_order.split()

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

# TODO hmm, these stats would only be showed in tooltip, in summary it's easy to omit them

ITEM_STATS = attack + defensive + decrease + destroy + helper + resistances + hp + minor
# print(len(ITEM_STATS))
# print(list(set(stats_in_order) - set(ITEM_STATS)))


# ITEM_STATS_IN_ORDER = attacks + resistances + decreases + destroyers + helpers
