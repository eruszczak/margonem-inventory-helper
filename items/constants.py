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
