from django.urls import path
from .views import CategoryListCreateAPIView, ItemListCreateAPIView

urlpatterns = [
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('items/', ItemListCreateAPIView.as_view(), name='item-list-create'),
]
