from django.urls import path
from .views import (
    ProductListCreateAPIView,
    ProductRetrieveUpdateDestroyAPIView,
    create_superuser_view,
    health_check_view,
    SaleCreateAPIView
)

urlpatterns = [
    # URLs de ajuda/debug
    path('health-check/', health_check_view, name='health-check'),
    path('create-super-user-temp-12345/', create_superuser_view, name='create-superuser'),
    
    # URLs da API
    path('sales/', SaleCreateAPIView.as_view(), name='create-sale'),
    path('', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
]