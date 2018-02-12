from collections import OrderedDict

from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.safestring import mark_safe

from items.constants import TYPE_CHOICES, LEGBON_CHOICES, RARITY_CHOICES, DEFAULT_RARITY, ITEM_STATS
from utils.helpers import create_slug


class Profession(models.Model):
    name = models.CharField(max_length=1, unique=True)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField('Nazwa', unique=True, max_length=300)
    lvl = models.PositiveIntegerField('Lvl', blank=True, null=True)
    stats = JSONField('Statystyki', blank=True)
    updated_at = models.DateTimeField('Aktualizowano', auto_now=True)
    added_at = models.DateTimeField('Dodano', auto_now_add=True)
    hidden = models.BooleanField('Ukryty', default=False)
    hidden_stats = models.BooleanField('Niezidentyfikowany', default=False)

    reqp = models.CharField('Wymagane profesje', max_length=6, blank=True)
    profession = models.ManyToManyField(Profession, blank=True, related_name='Items')
    legbon = models.CharField('Bonus', choices=LEGBON_CHOICES, blank=True, max_length=15)
    rarity = models.CharField('Rzadkość', max_length=15, choices=RARITY_CHOICES, default=DEFAULT_RARITY)
    type = models.IntegerField('Typ', choices=TYPE_CHOICES)
    same_stats = models.CharField('The same stats', blank=True, max_length=255)

    bag = models.PositiveIntegerField('Miejsc na przedmioty', blank=True, null=True)
    img = models.ImageField('Grafika')
    slug = models.SlugField('Slug', unique=True, max_length=255)
    img_url = models.URLField('Źródło grafiki', max_length=255)
    source_url = models.URLField('Źródło przedmiotu', max_length=255, blank=True, null=True)

    lowcrit = models.PositiveIntegerField('Podczas obrony szansa na cios krytyczny przeciwnika jest mniejsza', blank=True, null=True)
    crit = models.PositiveIntegerField('Cios krytyczny', blank=True, null=True)
    critval = models.IntegerField('Siła krytyka fizycznego', blank=True, null=True)
    critmval = models.IntegerField('Siła krytyka magicznego', blank=True, null=True)

    amount = models.PositiveIntegerField('Ilość (Nie można dzielić)', blank=True, null=True)
    hpbon = models.FloatField('Punkty życia za punkt hp', blank=True, null=True)
    heal = models.PositiveIntegerField('Przywraca punktów życia podczas walki', blank=True, null=True)
    hp = models.IntegerField('Życie', blank=True, null=True)
    ds = models.IntegerField('Siła', blank=True, null=True)
    dz = models.IntegerField('Zręczność', blank=True, null=True)
    di = models.IntegerField('Inteligencja', blank=True, null=True)
    da = models.IntegerField('Wszystkie cechy', blank=True, null=True)

    ac = models.PositiveIntegerField('Pancerz', blank=True, null=True)
    pierceb = models.PositiveIntegerField('Szanse na zablokowanie przebicia', blank=True, null=True)
    adest = models.PositiveIntegerField('Zadaje obrażenia właścicielowi', blank=True, null=True)
    blok = models.IntegerField('Blok', blank=True, null=True)
    absorbm = models.PositiveIntegerField('Absorpcje magiczne', blank=True, null=True)
    absorb = models.PositiveIntegerField('Absorpcje fizyczne', blank=True, null=True)

    slow = models.FloatField('Obniża SA przeciwnika', blank=True, null=True)
    sa = models.IntegerField('SA', blank=True, null=True)
    evade = models.IntegerField('Unik', blank=True, null=True)
    lowevade = models.PositiveIntegerField('Podczas ataku unik przeciwnika jest mniejszy', blank=True, null=True)

    acdmg = models.PositiveIntegerField('Niszczenie punktów pancerza podczas ciosu', blank=True, null=True)
    dmg = models.CharField('Atak', max_length=20, blank=True, null=True)
    light = models.CharField('Obrażenia od błyskawic', max_length=20, blank=True, null=True)
    fire = models.PositiveIntegerField('Obrażenia od ognia', blank=True, null=True)
    frost = models.PositiveIntegerField('Obrażenia od zimna', blank=True, null=True)
    frost_slowed = models.FloatField('spowalnia cel od zimna', blank=True, null=True)
    endest = models.PositiveIntegerField('Niszczenie energii', blank=True, null=True)
    manadest = models.PositiveIntegerField('Niszczenie many', blank=True, null=True)
    manabon = models.PositiveIntegerField('Mana', blank=True, null=True)
    energybon = models.PositiveIntegerField('Energia', blank=True, null=True)

    resfire = models.IntegerField('Odporność na ogień', blank=True, null=True)
    reslight = models.IntegerField('Odporność na błyskawice', blank=True, null=True)
    resfrost = models.IntegerField('Odporność na zimno', blank=True, null=True)
    act = models.IntegerField('Odporność na truciznę', blank=True, null=True)
    resdmg = models.PositiveIntegerField('Obniżenie odporności podczas ataku', blank=True, null=True)

    leczy = models.IntegerField('Leczy punktów życia', blank=True, null=True)
    pierce = models.PositiveIntegerField('Przebicie pancerza', blank=True, null=True)
    upg = models.PositiveIntegerField('Ulepszenie procentowe', blank=True, null=True)
    ttl = models.PositiveIntegerField('Zniknie za .. minut', blank=True, null=True)
    abdest = models.PositiveIntegerField('Niszczenie absorpcji przed atakiem', blank=True, null=True)
    contra = models.PositiveIntegerField('Szanse na kontrę po krytyku', blank=True, null=True)
    ammo = models.PositiveIntegerField('Ilość', blank=True, null=True)
    capacity = models.PositiveIntegerField('Maksimum sztuk razem', blank=True, null=True)
    gold = models.PositiveIntegerField('Złoto', blank=True, null=True)
    respred = models.PositiveIntegerField('Przyśpiesza wracanie do siebie', blank=True, null=True)
    pdmg = models.PositiveIntegerField('Atak fizyczny', blank=True, null=True)
    fullheal = models.PositiveIntegerField('Pełne leczenie', blank=True, null=True)
    runes = models.PositiveIntegerField('Dodaje smoczych run', blank=True, null=True)
    creditsbon = models.PositiveIntegerField('Dodaje smoczych łusek', blank=True, null=True)
    timelimit = models.PositiveIntegerField('Można używać co', blank=True, null=True)
    poison = models.PositiveIntegerField('Obrażenia od trucizny', blank=True, null=True)
    poison_slowed = models.FloatField('spowolnia cel od trucizny', blank=True, null=True)
    wound = models.PositiveIntegerField('Głęboka rana, szanse', blank=True, null=True)
    wound_chance = models.FloatField('Głęboka rana, obrażenia', blank=True, null=True)
    afterheal = models.PositiveIntegerField('Wyleczenie po walce, obrażenia', blank=True, null=True)
    afterheal_chance = models.PositiveIntegerField('Wyleczenie po walce, szanse', blank=True, null=True)
    resp = models.PositiveIntegerField('Czas odnowienia', blank=True, null=True)
    perheal = models.IntegerField('Leczy % życia', blank=True, null=True)

    resacdmg = models.PositiveIntegerField('Ochrona przed niszczeniem pancerza', blank=True, null=True)
    lowheal2turns = models.IntegerField('Obniżenie leczenia turowego przeciwnika na 2 tury', blank=True, null=True)
    resmanaendest = models.PositiveIntegerField('Obniżanie niszczenia many', blank=True, null=True)
    resmanaendest_ene = models.PositiveIntegerField('Obniżanie niszczenia energii', blank=True, null=True)
    lowcritallval = models.PositiveIntegerField('Obniżenie mocy krytyka fizycznego i magicznego', blank=True, null=True)
    worth = models.PositiveIntegerField('Wartość', blank=True, null=True)

    action = models.CharField('Special action', max_length=30, blank=True, null=True)
    npc_lootbon = models.PositiveIntegerField('Special stat', blank=True, null=True)

    def __str__(self):
        return '{} ({})'.format(self.name, self.lvl or '')

    def save(self, *args, **kwargs):
        """
        Create an OrderedDict of attrs with not null values, so I don't have to do it on the front end.
        Otherwise, I would have to iterate over all of the ordered stats for each item to display them in the order.
        """
        stats = []
        for attr in ITEM_STATS:
            if not attr.startswith('@IGNORE'):
                val = getattr(self, attr)
                if val is not None:
                    stats.append((attr, val))
        self.stats = OrderedDict(stats)
        # TODO encode as string - action, npc_lootbon, bounds, soulbound etc
        # these are "string" stats, with no real value
        self.slug = create_slug(self.name)
        super().save(*args, **kwargs)

    def image_img(self):
        return mark_safe('<img src="%s" />' % self.img.url)
