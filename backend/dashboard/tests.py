from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Item, Category
from auth.tests import AuthTestCase

class CategoryItemAPITestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category1 = Category.objects.create(name='Electronics')
        self.category2 = Category.objects.create(name='Books')
        self.create_token_url = reverse('create_token')
        self.register_url = reverse('register')
        self.item1 = Item.objects.create(sku="testitem1",name='Laptop', category=self.category1, tags='tech,computer', available_stock=10, stock_status=False)
        self.item2 = Item.objects.create(sku="testitem2",name='Python Book', category=self.category2, tags='programming,python', available_stock=5, stock_status=False)
        self.create_category_url = reverse('category-list-create')
        self.items_list_url = reverse('item-list-create')
        tokens = self.create_test_user_for_transactions()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + tokens['access'])

    def create_test_user_for_transactions(self):
        userdata = {
            'username': 'testuserregistration',
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
        self.client.post(self.register_url, userdata, format='json')
        response = self.client.post(self.create_token_url, userdata, format='json')
        return response.data
        
    
    def test_create_category(self):
        """
        Ensure we can create a new category.
        """
        self.client.login(username='testuser', password='testpassword')
        response = self.client.post(self.create_category_url, {'name': 'Toys'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_item_list_pagination(self):
        """
        Test items list with pagination.
        """
        response = self.client.get(self.items_list_url, {'page': 1, 'page_size': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['items']), 1)

    def test_item_filter_by_name(self):
        """
        Test filtering items by name.
        """
        response = self.client.get(f"{self.items_list_url}?name=Laptop")
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Laptop')