from django.urls import path
from .views import Analyze
from .views import index
from django.views.decorators.cache import cache_page
urlpatterns = [
    
    path('', index, name='index'),
    path('analyze', Analyze.as_view())
]