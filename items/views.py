from functools import reduce
from operator import or_, and_

from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Item
from .serializers import ItemSerializer


class SetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'per_page'


class ItemApiView(ListAPIView):
    queryset = Item.objects.public()
    serializer_class = ItemSerializer
    pagination_class = SetPagination

    def get_queryset(self):
        queryset = super().get_queryset().only('type', 'slug', 'name', 'lvl', 'stats', 'reqp')
        item_slugs = self.request.query_params.getlist('i')
        if len(item_slugs):
            return queryset.filter(slug__in=item_slugs)

        queries = self.get_search_queries()
        if len(queries):
            queryset = queryset.filter(reduce(and_, queries))

        return queryset

    def get_search_queries(self):
        item_type = self.request.query_params.get('t')
        # item_rarity = self.request.query_params.getlist('r')
        value = self.request.query_params.get('n')
        # prof = self.request.query_params.getlist('p')
        # bonus = self.request.query_params.get('b')

        queries = []
        if value:
            if value.isdigit():
                queries.append(Q(lvl=value))
            else:
                contains, startswith = 'name__unaccent__icontains', 'name__unaccent__istartswith'
                key = contains if len(value) > 2 else startswith
                queries.append(Q(**{key: value}))

        # if item_rarity:
        #     if 'none' in item_rarity:
        #         return Item.objects.none()
        #     query['rarity__name__in'] = item_rarity

        if item_type:
            queries.append(Q(type=item_type))

        # if prof:
        #     query['reqp__icontains'] = prof

        # if bonus:
        #     bonus = bonus.split(',')
        #     queries.append(Q(legbon__name__in=bonus))

        return queries


class ItemDetailApiView(RetrieveAPIView):
    queryset = Item.objects.public()
    serializer_class = ItemSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return super().get_queryset()


class ItemSimilarApiView(ListAPIView):
    serializer_class = ItemSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        item = self.get_object()
        limit = int(self.request.query_params.get('limit') or 15)

        query = {'type': item.type}
        # if item.lvl:
        #     query.update({'lvl__range': [item.lvl - 20, item.lvl + 20]})

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
        return queryset[:limit]

    def get_object(self):
        """
        this method is overriden because default implementation for get_object_or_404 uses self.get_queryset
        in my get_queryset I call this method and it'd raise Exception RuntimeError: 'maximum recursion depth exceeded'
        """
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        assert lookup_url_kwarg in self.kwargs

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(Item, **filter_kwargs)
        self.check_object_permissions(self.request, obj)
        return obj


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'items': reverse('item-api-view', request=request, format=format),
        # 'profileEq': reverse('eq-set-from-profile', request=request, format=format)
    })
