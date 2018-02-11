import re
import math

from items.models import Item, Profession
from utils.helpers import create_slug, clean_dict, get_soup, download_and_save_img, prepare_forum_profile_soup


def parse_item(attrs, item):
    item_name, main_stats, item_type, worth = attrs.split('||')
    item_name = item_name.strip()

    item_stats = {attr: val for attr, val in re.findall(r'(\w+)=([\w.-]+);', main_stats)}
    item_stats['img'] = item.find('img')['src']
    item_stats['hidden_stats'] = re.search(r'nodesc', attrs)
    item_stats['type'] = item_type
    item_stats['worth'] = worth

    if item_stats.get('slow'):
        item_stats['slow'] = float(int(item_stats['slow']) / 100)

    if item_stats.get('afterheal'):
        chance, value = item_stats['afterheal'].split(',')
        item_stats['afterheal'] = value
        item_stats['afterheal_chance'] = chance

    item_rarity = re.search(r'legendary|unique|heroic', attrs)
    if item_rarity:
        item_stats['rarity'] = item_rarity.group(0)

    resmanaendest = item_stats.get('resmanaendest')
    if resmanaendest:
        div = int(resmanaendest) / 3
        item_stats['resmanaendest_ene'] = math.floor(div)

    for attr, slowed, value in re.findall(r'(poison|frost|wound)=(\d+),(\d+);', attrs):
        slowed = float(int(slowed) / 100)
        if attr == 'poison':
            item_stats['poison'] = value
            item_stats['poison_slowed'] = slowed
        elif attr == 'frost':
            item_stats['frost'] = value
            item_stats['frost_slowed'] = slowed
        elif attr == 'wound':
            item_stats['wound'] = value
            item_stats['wound_chance'] = slowed

    for attr, val in re.findall(r'(opis|loot|legbon)=(.+?);', attrs):
        if attr == 'legbon':
            val = val.split(',')[0]
        elif attr == 'loot':
            val = val.split(',')[-1]
        elif attr == 'opis':
            val = val.replace('<br>', ' ').replace('#DATE#', '').replace('#YEAR# r.', '').strip().strip(',')
        item_stats[attr] = val

    return item_name, item_stats


def get_items_from_profile(soup):
    soup_items = soup.find_all('div', attrs={'class': 'itemborder'})
    retrieved_items = []
    not_found_items = []
    for soup_item in soup_items:
        item_name = soup_item.find('img')['tip'].split('</b>')[0].strip('<b>')
        item = Item.objects.filter(name=item_name).first()
        if item:
            retrieved_items.append(item)
        else:
            not_found_items.append({
                'name': item_name
            })

    return retrieved_items, not_found_items


def get_items_stats_from_forum(soup):
    soup_items = soup.find_all('div', attrs={'class': 'itemborder'})
    stats = []
    for soup_item in soup_items:
        attrs = soup_item.find('img', attrs={'ctip': 'item'})
        if attrs:
            item_data = parse_item(attrs['stats'], soup_item)
            stats.append(item_data)
    return stats


def add_items_from_forum(items, forum_page_url):
    count = 0
    for item_name, item_stats in items:
        if item_stats.get('upg'):
            continue
        clean_dict('book rkey quest created lowreq btype price emo loot', item_stats)
        character_classes = item_stats.pop('reqp', [])

        item_stats['reqp'] = character_classes or ''
        item_stats['img_url'] = item_stats.pop('img', None)
        item_stats['source_url'] = forum_page_url
        item_stats['slug'] = create_slug(item_name)
        item_stats['name'] = item_name

        # todo: check if stats like this already exist. is so, add this item but make it hidden
        item, created = Item.objects.get_or_create(name=item_name, defaults=dict(**item_stats))
        if created:
            print('created', item_stats['slug'])
            count += 1

        download_and_save_img(item)

        for character in character_classes:
            profession = Profession.objects.get_or_create(name=character)[0]
            item.profession.add(profession)

    return count


def add_items(forum_topic_url):
    soup = get_soup(forum_topic_url)
    items_stats = get_items_stats_from_forum(soup)
    added_count = add_items_from_forum(items_stats, forum_topic_url)
    return added_count


def get_eq_items_and_characters_from_profile(profile_url):
    soup, characters = prepare_forum_profile_soup(profile_url)
    items, not_found_items = get_items_from_profile(soup)
    return items, not_found_items, characters
