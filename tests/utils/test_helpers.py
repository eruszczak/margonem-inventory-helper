from utils.helpers import clean_dict, create_slug
import pytest


def test_clean_dict():
    item_stats = {
        'book': 12,
        'lowreq': 12,
        'test': 12
    }
    clean_dict('book lowreq', item_stats)

    assert ('book', 'lowreq') not in item_stats
    assert 'test' in item_stats


def test_create_slug():
    a = 'łuk ze skóry'
    b = 'ognista laska'

    assert create_slug(a) == 'luk-ze-skory'
    assert create_slug(b) == 'ognista-laska'


@pytest.mark.django_db
def test_save():
    pass
    # maven = Dog(name="Maven", breed="corgi")
    # maven.save()
    # assert maven.name == "Maven"
    # assert maven.breed == "corgi"