import os
import csv
import io
from datetime import datetime

from django.core.management.base import BaseCommand

from margonem.settings import BACKUP_ROOT
from items.models import Item


class Command(BaseCommand):
    help = 'Dumps title data into a csv file'

    def handle(self, *args, **options):
        now = datetime.now().strftime('%Y-%m-%d-%H-%M-%S')
        titles = Item.objects.all()
        fname = os.path.join(BACKUP_ROOT, '{}items{}{}'.format(titles.count(), now, '.csv'))
        headers = Item._meta.get_fields(include_parents=False)
        # excluded_headers = ('rating', 'id', 'watchlist', 'favourite', 'recommendation')
        # headers = [h.name for h in headers if h.name not in excluded_headers]
        headers = [h.name for h in headers]

        with io.open(fname, 'w', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=headers, lineterminator='\n')
            writer.writeheader()
            for title in titles:
                data = {}
                for header in headers:
                    val = getattr(title, header) or ''
                    data[header] = val
                writer.writerow(data)
        self.stdout.write(self.style.SUCCESS('Created: ' + fname))
