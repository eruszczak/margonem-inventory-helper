from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^$', views.api_root, name='api-root'),
    url(r'^item/$', views.ItemApiView.as_view(), name='item-api-view'),
    url(r'^item/(?P<slug>[\w-]+)/$', views.ItemDetailApiView.as_view(), name='item-detail-api-view'),
    url(r'^item/(?P<slug>[\w-]+)/similar/$', views.ItemSimilarApiView.as_view(), name='item-similar-api-view'),

    url(r'^eq_set_from_profile/$', views.GetEqSetFromProfile.as_view(), name='eq-set-from-profile'),
]