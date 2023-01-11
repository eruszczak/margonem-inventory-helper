from django.contrib import admin
from .models import Item


class ItemAdmin(admin.ModelAdmin):
    list_filter = ('hidden_stats', 'type', 'rarity', 'upg', 'hidden')
    list_per_page = 150
    ordering = ('-updated_at', )
    search_fields = ['name', 'lvl']
    list_display = ['name', 'lvl', 'rarity', 'type', 'image_img']
    readonly_fields = ('image_img',)


admin.site.register(Item, ItemAdmin)
