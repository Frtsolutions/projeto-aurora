# products/views.py

from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # products/views.py (adicionar no final)

from django.http import HttpResponse
from django.contrib.auth import get_user_model
import os

def create_superuser_view(request):
    User = get_user_model()
    username = os.environ.get('ADMIN_USER')
    password = os.environ.get('ADMIN_PASSWORD')

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, password=password)
        return HttpResponse("Superusuário criado com sucesso!")
    else:
        return HttpResponse("Superusuário já existe.")