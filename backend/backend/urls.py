
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('auth.urls'), name="auth"),
    path('api/app/', include('dashboard.urls'), name="dashboard"),
]
