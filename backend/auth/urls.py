from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from .views import RegisterUserAPIView, CookieTokenObtainPairView

urlpatterns = [
    path('register/', RegisterUserAPIView.as_view(), name='register'),
    path('token/', CookieTokenObtainPairView.as_view(), name='create_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
