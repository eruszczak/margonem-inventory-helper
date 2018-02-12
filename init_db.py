import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "margonem.settings")
django.setup()
from utils.helpers import get_soup
from utils.parse_items import get_items, create_items
from items.models import Item


def fetch_and_add_items(source_url):
    soup = get_soup(source_url)
    items = get_items(soup)
    counter = create_items(items, source_url)
    return counter


def create_duplicate(name):
    item = Item.objects.get(name=name)
    item.pk = None
    item.name = item.name + 'i'
    item.save()
    print(Item.objects.filter(name__icontains=name))


# Item.objects.all().delete()

print('before', Item.objects.all().count())
# create_duplicate('Ognista potęga czarnoksiężnika')
# print(fetch_and_add_items(forum_profile_link), forum_profile_link)


forum_pages_links = [
    'https://www.margonem.pl/?task=forum&show=posts&id=459240',  # 0 Elity I i II
    'https://www.margonem.pl/?task=forum&show=posts&id=96201',  # 1 rosliny
    'https://www.margonem.pl/?task=forum&show=posts&id=487344',  # 2 kupcy sprzedawcy
    'https://www.margonem.pl/?task=forum&show=posts&id=487093',  # 3 zwoje torby talizmany
    'https://www.margonem.pl/?task=forum&show=posts&id=484360',  # 4 legendarne zbroje itd
    'https://www.margonem.pl/?task=forum&show=posts&id=470820',  # 5 herosi tytani
    'https://www.margonem.pl/?task=forum&show=posts&id=457475',  # 6 spis legend,
    'https://www.margonem.pl/?task=profile&id=4155914#tab2' # alpha
]
for link in forum_pages_links:
    print('checking', link)
    print(fetch_and_add_items(link), link)

print('after', Item.objects.all().count())


"""
notes:
    # the same item had different description: Głowa lodowatego lorda
    # hp chluba 375 vs 813
"""