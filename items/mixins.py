from django.views.decorators.cache import cache_page


class CacheMixin:
    cache_timeout = 60 * 60 * 12  # 1 hour

    def dispatch(self, *args, **kwargs):
        return cache_page(self.cache_timeout)(super().dispatch)(*args, **kwargs)
