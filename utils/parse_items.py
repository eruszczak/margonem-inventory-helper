import re
import math

from items.constants import EQS
from items.models import Item, Profession
from utils.helpers import clean_dict, download_and_save_img


def get_item_data(soup_item):
    attrs = soup_item.find('img', attrs={'ctip': 'item'})
    if not attrs:
        return None

    attrs = attrs['stats']
    item_name, main_stats, item_type, worth = attrs.split('||')
    item_name = item_name.strip()

    data = {attr: val for attr, val in re.findall(r'(\w+)=([\w.-]+);', main_stats)}
    if data.get('upg'):
        return None

    data['name'] = item_name
    data['img_url'] = soup_item.find('img')['src']
    data['hidden_stats'] = re.search(r'nodesc', attrs) or False
    data['type'] = item_type
    data['worth'] = worth
    if data.get('reqp') is None:
        data['reqp'] = ''

    if data.get('slow'):
        data['slow'] = float(int(data['slow']) / 100)

    if data.get('afterheal'):
        chance, value = data['afterheal'].split(',')
        data['afterheal'] = value
        data['afterheal_chance'] = chance

    item_rarity = re.search(r'legendary|unique|heroic', attrs)
    if item_rarity:
        data['rarity'] = item_rarity.group(0)

    resmanaendest = data.get('resmanaendest')
    if resmanaendest:
        div = int(resmanaendest) / 3
        data['resmanaendest_ene'] = math.floor(div)

    for attr, slowed, value in re.findall(r'(poison|frost|wound)=(\d+),(\d+);', attrs):
        slowed = float(int(slowed) / 100)
        if attr == 'poison':
            data['poison'] = value
            data['poison_slowed'] = slowed
        elif attr == 'frost':
            data['frost'] = value
            data['frost_slowed'] = slowed
        elif attr == 'wound':
            data['wound'] = value
            data['wound_chance'] = slowed

    for attr, val in re.findall(r'(loot|legbon)=(.+?);', attrs):
        if attr == 'legbon':
            val = val.split(',')[0]
        elif attr == 'loot':
            val = val.split(',')[-1]
        data[attr] = val

    return data


def get_items(soup):
    items = []
    for soup_item in soup.find_all('div', attrs={'class': 'itemborder'}):
        item_data = get_item_data(soup_item)
        if item_data is not None:
            items.append(item_data)
    return items


def create_items(items, source_url):
    counter = {
        'created': 0,
        'existed': 0,
        'hidden': 0
    }
    for item in items:
        clean_dict('book rkey quest created lowreq btype price emo loot', item)
        item_name = item.pop('name')
        # I need to detect if item exists with different name.
        # I will only check items that you can wear because only those can be compared (enough number of stats)
        if item['type'] in EQS:
            # Just like item_name, img_url can be changed too. So if item that you can wear has the same stats
            # but a different name or img_url, add this item as hidden one.
            copy = item.copy()
            copy.pop('img_url')
            if Item.objects.filter(**item).exclude(name=item_name).exists():
                item['hidden'] = True
                counter['hidden'] += 1
                print('hidden', item_name)

        item['source_url'] = source_url
        obj, created = Item.objects.get_or_create(name=item_name, defaults=dict(**item))
        if created:
            print('created', item_name)
            counter['created'] += 1
        else:
            counter['existed'] += 1

        download_and_save_img(obj)

        for prof in item['reqp']:
            profession = Profession.objects.get_or_create(name=prof)[0]
            obj.profession.add(profession)

    return counter



