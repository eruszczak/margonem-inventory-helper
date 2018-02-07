# -*- coding: utf-8 -*-

import json
from collections import OrderedDict

from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.safestring import mark_safe

from utils.translators import ITEM_STATS, itemtype_translate


class ItemRarity(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class ItemType(models.Model):
    number = models.IntegerField(unique=True)

    def __str__(self):
        return '{} ({})'.format(itemtype_translate[str(self.number)], self.number)


class ItemLegbon(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class Profession(models.Model):
    name = models.CharField(max_length=1, unique=True)

    def __str__(self):
        return self.name


# class MobType(models.Model):
#     name = models.CharField(max_length=50)


# class Event(models.Model):
#     name = models.CharField(max_length=300)
#     description = models.TextField()
#
#     def __str__(self):
#         return self.name


# class Mob(models.Model):
#     event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True, null=True)
#
#     name = models.CharField(max_length=300)
#     lvl = models.PositiveIntegerField(null=True, blank=True)
#     location = models.CharField(max_length=300, null=True, blank=True)
#
#     # class Meta:
#     #     unique_together = ('name', 'lvl')
#
#     def __str__(self):
#         return self.name


class Item(models.Model):
    updated_at = models.DateTimeField('Ostatnia aktualizacja', auto_now=True)
    json_stats = models.CharField('Statystyki w kolejności', max_length=500, blank=True, null=True)
    stats = JSONField('Statystyki w kolejności', blank=True, default={})
    profession = models.ManyToManyField(Profession, verbose_name='Profesje')
    # mob = models.ManyToManyField(Mob)
    legbon = models.ForeignKey(ItemLegbon, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Bonus')
    rarity = models.ForeignKey(ItemRarity, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Rzadkość')
    type = models.ForeignKey(ItemType, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Typ')

    lvl = models.PositiveIntegerField('Lvl', blank=True, null=True)
    bag = models.PositiveIntegerField('Miejsc na przedmioty', blank=True, null=True)
    hidden_stats = models.BooleanField('Niezidentyfikowany', default=False)
    name = models.CharField('Nazwa', unique=True, max_length=300)
    opis = models.TextField('Opis', blank=True, null=True)
    img = models.ImageField('Grafika')
    slug = models.SlugField(unique=True, max_length=255)
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
            if attr.startswith('@'):
                continue

            val = getattr(self, attr, 'not exists')
            if val:
                stats.append((attr, val))
            elif val == 'not exists':
                print('Error. {} does not exist'.format(attr))
        self.json_stats = json.dumps(OrderedDict(stats))

        if self.rarity is None:
            self.rarity = ItemRarity.objects.get(name='default')

        # TODO encode as string - action, npc_lootbon, bounds, soulbound etc
        # these are "string" stats, with no real value

        super(Item, self).save(*args, **kwargs)

    def image_img(self):
        return mark_safe('<img src="%s" />' % self.img.url)
