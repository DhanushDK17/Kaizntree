from rest_framework import generics, filters
from .models import Item, Category
from .serializers import ItemSerializer, CategorySerializer
from rest_framework import generics, filters
from .pagination import CustomPageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend


class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ItemListCreateAPIView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    pagination_class = CustomPageNumberPagination  # Use the custom pagination class
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name', 'stock_status']  # Enable filtering by 'name'
    search_fields = ['name', 'category__name', 'tags']
