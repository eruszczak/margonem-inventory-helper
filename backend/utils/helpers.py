import os
import urllib.request

from bs4 import BeautifulSoup
from django.template.defaultfilters import slugify

from margonem.settings import MEDIA_ROOT, EXCLUDED_ROOT


def clean_dict(keys_to_delete, item_stats):
    for key in keys_to_delete.split():
        if item_stats.get(key):
            del item_stats[key]


def show(stats):
    for name, attrs in stats.items():
        print(name)
        for attr, item_attrs in attrs.items():
            print('\t\t{}: {}'.format(attr, item_attrs))


def download_and_save_img(obj):
    title = obj.slug + '.gif'
    img_path = os.path.join(MEDIA_ROOT, title)

    if not os.path.isfile(img_path):
        try:
            urllib.request.urlretrieve(obj.img_url, img_path)
            print('\tdownloaded')
        except Exception as e:
            print('\t', e, type(e))
            return

    obj.img = title
    obj.save(update_fields=['img'])


def replace_lowercase_diacritics(value):
    diacritics = {
        'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z'
    }
    for letter in diacritics:
        value = value.replace(letter, diacritics[letter])
    return value


def create_slug(value):
    return slugify(replace_lowercase_diacritics(value.lower()))


def get_soup(link):
    req = urllib.request.urlopen(link)
    data = req.read()
    return BeautifulSoup(data, 'html.parser')


def get_soup_from_js_page(link):
    """
    Gets soup from HTML page with content retrieved by JavaScript
    Using Dryscape libary, which is available only on Linux
    """
    try:
        import dryscrape
    except ImportError:
        # for testing on Windows only, open already retrived HTML
        file_path = os.path.join(EXCLUDED_ROOT, 'src_profile_with_eq.html')
        with open(file_path, 'r', encoding='utf-8') as f:
            response = f.read()
    else:
        dryscrape.start_xvfb()
        session = dryscrape.Session()
        session.visit(link)
        response = session.body()

    return BeautifulSoup(response, 'html.parser')
