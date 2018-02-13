from rest_framework import serializers
from items.models import Item


class ItemSerializer(serializers.ModelSerializer):
    detail_url = serializers.HyperlinkedIdentityField(view_name='item-detail-api-view', lookup_field='slug', read_only=True)
    # similar = serializers.HyperlinkedIdentityField(view_name='item-similar-api-view', lookup_field='slug', read_only=True)

    class Meta:
        model = Item
        lookup_field = 'slug'
        fields = ('pk', 'img', 'name', 'lvl', 'type', 'rarity', 'stats', 'legbon', 'slug', 'detail_url', 'reqp')


class ItemSimilarSerializer(ItemSerializer):
    similar = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Item
        lookup_field = 'slug'
        fields = ('pk', 'img', 'name', 'lvl', 'type', 'rarity', 'profession', 'stats', 'legbon', 'slug',
                  'detail_url', 'similar', 'reqp')

    def get_similar(self, item):
        limit = 15
        # limit = int(self.request.query_params.get('limit') or 15)

        query = {'type': item.type}
        if item.lvl:
            query.update({'lvl__range': [item.lvl - 20, item.lvl + 20]})

        queryset = Item.objects.filter(**query).exclude(slug=item.slug).order_by('lvl')

        if item.lvl:
            qs_len = queryset.count()
            diff = qs_len - limit
            if diff > 0:
                # if there is more results than limit, strip items from both ends so they are evenly distributed
                # taking sublist loads all queryset into memory
                # but there are not that many items in that range for given type anyway
                half_diff = diff / 2
                queryset = queryset[half_diff:qs_len - half_diff]
        return ItemSerializer(queryset, many=True).data[:limit]


# class CharacterSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     guild = serializers.CharField()
#     world = serializers.CharField()
#     outfit = serializers.CharField()
#     lvl = serializers.CharField()
#     id = serializers.CharField()
#     prof = serializers.CharField()
#
#
# class NotFoundItemSerializer(serializers.Serializer):
#     name = serializers.CharField()
