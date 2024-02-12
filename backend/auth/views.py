from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterUserAPIView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                {
                    "message": "User created successfully",
                    "data": user_serializer.data
                }, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            if access_token and refresh_token:
                response.set_cookie(
                    'access_token',
                    access_token,
                    samesite='Lax'
                )
                response.set_cookie(
                    'refresh_token',
                    refresh_token,
                    samesite='Lax'
                )
        return response
