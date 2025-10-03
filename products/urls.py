# products/urls.py

from django.urls import path
from .views import ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),

]# products/urls.py (adicionar a nova path)

from django.urls import path
from .views import ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, create_superuser_view # Adicione create_superuser_view

urlpatterns = [
    # ... suas urls existentes ...
    path('', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),

    # Adicione a linha abaixo
    path('create-super-user-temp-12345/', create_superuser_view, name='create-superuser'),
]