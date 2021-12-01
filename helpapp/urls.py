from django.urls import path
from .views import Analyze
from .views import index
from . import views
from django.views.decorators.cache import cache_page
urlpatterns = [
    
    path('', index, name='index'),
    path('<str:object>/', cache_page(60*60*2)(views.object_id)),
    path('<str:object>/analyze', Analyze.as_view())
]