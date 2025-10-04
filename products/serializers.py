# products/serializers.py (versão atualizada)

from rest_framework import serializers
from .models import Product, Sale, SaleItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SaleItemSerializer(serializers.ModelSerializer):
    # Novo campo para mostrar o nome do produto na leitura da API
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = SaleItem
        # Adicionamos 'product_name' à lista de campos
        fields = ['product', 'product_name', 'quantity', 'price_at_sale']

class SaleSerializer(serializers.ModelSerializer):
    # Agora, ao ler uma venda, os itens virão formatados pelo SaleItemSerializer acima
    items = SaleItemSerializer(many=True, read_only=True)

    class Meta:
        model = Sale
        fields = ['id', 'total_amount', 'created_at', 'items']