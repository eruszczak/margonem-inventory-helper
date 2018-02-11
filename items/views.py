# from django.db.utils import OperationalError
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Item
from .serializers import ItemSerializer, CharacterSerializer, NotFoundItemSerializer, ItemSimilarSerializer
from utils.parse_items import get_eq_items_and_characters_from_profile

# caching
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
# from django.core.cache import cache


class SetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'per_page'


class ItemApiView(ListAPIView):
    queryset = Item.objects.all().order_by('lvl')
    serializer_class = ItemSerializer
    pagination_class = SetPagination

    # one_hour = 60 * 60
    # one_day = 24 * one_hour
    # my_cache_time = 7 * one_day
    #
    # @method_decorator(cache_page(my_cache_time))
    # def dispatch(self, *args, **kwargs):
    #     return super().dispatch(*args, **kwargs)

    def get_queryset(self):
        # from time import sleep
        # sleep(3)
        queryset = super().get_queryset()
        query = self.get_query()
        item_slugs = query.pop('slugs', None)
        if item_slugs:
            return queryset.filter(slug__in=item_slugs)

        if query:
            # val = self.request.query_params.get('n', '')
            # return queryset.filter(Q(name__unaccent__icontains=val) | Q(legbon__name__icontains=val))
            print(query)
            return queryset.filter(**query)

        return self.queryset

    def get_query(self):
        item_rarity = self.request.query_params.getlist('r')
        item_type = self.request.query_params.get('t')
        name = self.request.query_params.get('n')
        prof = self.request.query_params.getlist('p')
        bonus = self.request.query_params.get('b')
        slugs = self.request.query_params.getlist('i')

        query = {'slugs': slugs}
        if name:
            contains, startswith = 'name__unaccent__icontains', 'name__unaccent__istartswith'
            key = contains if len(name) > 2 else startswith
            query[key] = name
            # query['legbon__name__icontains'] = name
        # if item_rarity:
        #     if 'none' in item_rarity:
        #         return Item.objects.none()
        #     query['rarity__name__in'] = item_rarity

        if item_type:
            query['type__number'] = item_type

        # if prof:
        #     query['profession__name__in'] = prof

        if bonus:
            bonus = bonus.split(',')
            query['legbon__name__in'] = bonus

        return query


class ItemDetailApiView(RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        # from time import sleep
        # sleep(3)

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


# class GetEqSetFromProfile(APIView):
#
#     def post(self, request, format=None):
#         """
#         Given link to character's eq, get those items and character list.
#         Expected parameter: 'profileLink': 'margonem.pl/?task=profile&id=...'
#         """
#         forum_profile_link = request.data.get('profileLink')
#         link_is_valid, message = self.valid_link(forum_profile_link)
#         if link_is_valid:
#             items_from_profile, not_found_items, characters = get_eq_items_and_characters_from_profile(forum_profile_link)
#             serializer = ItemSerializer(items_from_profile, many=True, context={'request': request})
#             serializer_character = CharacterSerializer(characters, many=True)
#             serializer_not_found = NotFoundItemSerializer(not_found_items, many=True)
#
#             data = {
#                 'items': serializer.data,
#                 'characters': serializer_character.data,
#                 'itemsNotFound': serializer_not_found.data,
#                 'message': message,
#                 'status': status.HTTP_200_OK
#             }
#             return Response(data)
#
#         return Response({
#             'status': status.HTTP_404_NOT_FOUND,
#             'message': message
#         }, status=status.HTTP_400_BAD_REQUEST)
#
#     @staticmethod
#     def valid_link(link):
#         if len(link) > 100:
#             return False, 'link too long'
#
#         if 'margonem.pl/?task=profile&id=' in link:
#             if '#eq' in link:
#                 return True, 'valid'
#             return True, 'general profile link, only characters can be retrieved'
#
#         return False, 'it\'s not a margonem profile'


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'items': reverse('item-api-view', request=request, format=format),
        # 'profileEq': reverse('eq-set-from-profile', request=request, format=format)
    })
