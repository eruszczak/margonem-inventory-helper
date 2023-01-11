# def get_items_from_profile(soup):
#     soup_items = soup.find_all('div', attrs={'class': 'itemborder'})
#     retrieved_items = []
#     not_found_items = []
#     for soup_item in soup_items:
#         item_name = soup_item.find('img')['tip'].split('</b>')[0].strip('<b>')
#         item = Item.objects.filter(name=item_name).first()
#         if item:
#             retrieved_items.append(item)
#         else:
#             not_found_items.append({
#                 'name': item_name
#             })
#
#     return retrieved_items, not_found_items


# def get_eq_items_and_characters_from_profile(profile_url):
#     soup, characters = prepare_forum_profile_soup(profile_url)
#     items, not_found_items = get_items_from_profile(soup)
#     return items, not_found_items, characters
# items_from_profile, not_found_items, characters = get_eq_items_and_characters_from_profile(forum_profile_link)
# if items_from_profile:
#     item_slugs = [item.slug for item in items_from_profile]
#     print(item_slugs)



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


# def prepare_forum_profile_soup(profile_url):
#     """
#     Given url to forum profile, get soup only with single character's eq and list of characters from that profile
#     """
#     soup = get_soup_from_js_page(profile_url)
#     character_eq = soup.find('div', attrs={'id': 'armory_char_items'})
#     profile_characters = []
#     for character in soup.find_all('div', attrs={'class': 'inside_char'}):
#         div = character.find('a').find('div')
#
#         ch_id = character.find('a')['href']
#         lvl = div['c_lvl']
#         prof = div['c_prof']
#         outfit = re.search(r'\'(.+)\'', div['style']).group().strip("'")
#         name, guild, world = [d.getText().strip()
#                               for d in character.find('div', attrs={'class': 'inside_char_stats'}).find_all('b')]
#         data = {
#             'name': name,
#             'guild': guild,
#             'world': world,
#             'outfit': outfit,
#             'lvl': lvl,
#             'id': ch_id,
#             'prof': prof
#         }
#         profile_characters.append(data)
#     return character_eq, profile_characters
