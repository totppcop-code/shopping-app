from rest_framework import viewsets
from .models import User, Product, Cart, Order
from .serializers import UserSerializer, ProductSerializer, CartSerializer, OrderSerializer
from django.http import JsonResponse

# 使用者
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# 商品
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# 購物車
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


# 訂單
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

def health(request):
    return JsonResponse({"status":"ok"})