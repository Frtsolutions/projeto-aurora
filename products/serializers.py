from rest_framework import serializers
# A linha abaixo foi corrigida para incluir Sale e SaleItem
from .models import Product, Sale, SaleItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SaleItemSerializer(serializers.ModelSerializer):
    # Para evitar enviar o objeto de produto inteiro, vamos usar um campo mais simples
    product_id = serializers.IntegerField()

    class Meta:
        model = SaleItem
        fields = ['product_id', 'quantity'] # Simplificado para receber dados

class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True)

    class Meta:
        model = Sale
        fields = ['id', 'total_amount', 'created_at', 'items']

    # O 'create' pertence à View, então removemos a lógica daqui
    # para manter o serializer simples.