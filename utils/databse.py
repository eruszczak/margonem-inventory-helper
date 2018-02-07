from items.models import ItemLegbon, ItemRarity, Profession, ItemType, Item
from utils import translators


def init_bonuses():
    for value in translators.BONUSES:
        obj, created = ItemLegbon.objects.get_or_create(name=value)
        if created:
            print('created', obj)


def init_rarity():
    for value in translators.RARITY:
        obj, created = ItemRarity.objects.get_or_create(name=value)
        if created:
            print('created', obj)


def init_professions():
    for value in translators.CHARACTERS:
        obj, created = Profession.objects.get_or_create(name=value)
        if created:
            print('created', obj)


def init_types():
    for value in translators.itemtype_translate:
        obj, created = ItemType.objects.get_or_create(number=int(value))
        if created:
            print('created', obj)


def init_models():
    init_rarity()
    init_types()
    init_bonuses()
    init_professions()


def re_save_all_items():
    for i in Item.objects.all():
        print(i, i.json_stats)
        i.save()
