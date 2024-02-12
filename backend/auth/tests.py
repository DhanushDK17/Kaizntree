from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class AuthTestCase(APITestCase):

    def setUp(self):
        # URL for creating an auth token (login)
        self.create_token_url = reverse('create_token')
        # URL for registering a new user
        self.register_url = reverse('register')
        # User data
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
        self.client.post(self.register_url, self.user_data, format='json')

    def test_user_registration(self):
        """
        Ensure we can create a new user.
        """
        userdata = {
            'username': 'testuserregistration',
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
        response = self.client.post(self.register_url, userdata, format='json')
        createdUser = response.data['data']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('username' in createdUser)
        self.assertTrue('email' in createdUser)
        self.assertFalse('password' in createdUser)
    
    def test_sameuser_registration(self):
        """
        Ensure we cannot create a new user with a same username.
        """
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_obtain_token_pair(self):
        """
        Ensure we can obtain a token pair with valid credentials.
        """
        response = self.client.post(self.create_token_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)
        self.assertTrue('refresh' in response.data)