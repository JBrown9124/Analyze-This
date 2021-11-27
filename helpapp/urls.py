from django.urls import path
from .views import Analyze
from .views import index
urlpatterns = [
    
    path('', index, name='index'),
    path('analyze', Analyze.as_view())
]