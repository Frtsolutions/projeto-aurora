# products/urls.py (versão atualizada)

from django.urls import path
from .views import (
    ProductListCreateAPIView,
    ProductRetrieveUpdateDestroyAPIView,
    create_superuser_view,
    health_check_view,
    SaleCreateAPIView,
    SaleListAPIView,       # Importa a nova view de lista
    SaleDetailAPIView      # Importa a nova view de detalhe
)

urlpatterns = [
    # --- URLs de Produtos ---
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),

    # --- URLs de Vendas ---
    path('sales/', SaleListAPIView.as_view(), name='sale-list'),
    path('sales/create/', SaleCreateAPIView.as_view(), name='create-sale'),
    path('sales/<int:pk>/', SaleDetailAPIView.as_view(), name='sale-detail'),

    # --- URLs de Ajuda/Debug ---
    path('health-check/', health_check_view, name='health-check'),
    path('create-super-user-temp-12345/', create_superuser_view, name='create-superuser'),
]