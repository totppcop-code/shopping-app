"""
URL configuration for myshop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from shop.views import UserViewSet, ProductViewSet, CartViewSet, OrderViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from shop.views import health

router = DefaultRouter() 
router.register(r'users', UserViewSet) 
router.register(r'products', ProductViewSet) 
router.register(r'carts', CartViewSet) 
router.register(r'orders', OrderViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title= 'shop api',
        default_version= 'v1',
        description='這是 shop api 資料'
    ),
    public=True,
    permission_classes=[permissions.AllowAny,],
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('health/', health),
]
