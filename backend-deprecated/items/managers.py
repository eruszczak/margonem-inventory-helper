from django.db.models.query import QuerySet


class ItemQuerySet(QuerySet):

    def public(self):
        return self.filter(hidden=False)
