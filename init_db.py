import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "margonem.settings")
django.setup()

from items.models import Item
from utils.parse_items import get_eq_items_and_characters_from_profile, add_items

forum_pages_links = [
    'https://www.margonem.pl/?task=forum&show=posts&id=459240',  # 0 Elity I i II
    'https://www.margonem.pl/?task=forum&show=posts&id=96201',  # 1 rosliny
    'https://www.margonem.pl/?task=forum&show=posts&id=487344',  # 2 kupcy sprzedawcy
    'https://www.margonem.pl/?task=forum&show=posts&id=487093',  # 3 zwoje torby talizmany
    'https://www.margonem.pl/?task=forum&show=posts&id=484360',  # 4 legendarne zbroje itd
    'https://www.margonem.pl/?task=forum&show=posts&id=470820',  # 5 herosi tytani
    'https://www.margonem.pl/?task=forum&show=posts&id=457475',  # 6 spis legend
]

print(Item.objects.all().count())
# for link in forum_pages_links:
#     add_items(link)
forum_profile_link = 'https://www.margonem.pl/?task=profile&id=2779867#eq90052'
count = add_items(forum_profile_link)

print('count', count)
print(Item.objects.all().count())



# items_from_profile, not_found_items, characters = get_eq_items_and_characters_from_profile(forum_profile_link)
# if items_from_profile:
#     item_slugs = [item.slug for item in items_from_profile]
#     print(item_slugs)
"""
notes:
    # the same item had different description: Głowa lodowatego lorda
    # hp chluba 375 vs 813
"""