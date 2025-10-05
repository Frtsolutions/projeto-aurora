from django.urls import path
from .views import (
    ProductListCreateAPIView,
    ProductRetrieveUpdateDestroyAPIView,
    SaleListAPIView,
    SaleCreateAPIView,
    SaleDetailAPIView,
    health_check_view,
    create_superuser_view
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