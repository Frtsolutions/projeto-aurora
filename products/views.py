# products/views.py (VERSÃO CORRIGIDA E COMPLETA)

from django.http import HttpResponse, JsonResponse
from django.contrib.auth import get_user_model
from django.db import transaction
import os
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, Sale, SaleItem
from .serializers import ProductSerializer, SaleSerializer

# --- VIEWS DA API DE PRODUTOS ---
class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# --- VIEWS DA API DE VENDAS ---
class SaleListAPIView(generics.ListAPIView):
    queryset = Sale.objects.all().order_by('-created_at')
    serializer_class = SaleSerializer

class SaleDetailAPIView(generics.RetrieveAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

class SaleCreateAPIView(APIView):
    def post(self, request):
        items_data = request.data.get('items')
        total_amount = request.data.get('total_amount')

        if not items_data or total_amount is None:
            return Response({"error": "Dados da venda (items, total_amount) estão incompletos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                sale = Sale.objects.create(total_amount=total_amount)

                for item_data in items_data:
                    product_id = item_data['product']['id']
                    quantity_sold = item_data['quantity']

                    product = Product.objects.select_for_update().get(id=product_id)

                    if product.stock_quantity < quantity_sold:
                        raise Exception(f"Estoque insuficiente para o produto: {product.name}")

                    SaleItem.objects.create(
                        sale=sale,
                        product=product,
                        quantity=quantity_sold,
                        price_at_sale=product.selling_price
                    )

                    product.stock_quantity -= quantity_sold
                    product.save()

                serializer = SaleSerializer(sale)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            return Response({"error": "Um dos produtos na venda não foi encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# --- VIEWS DE AJUDA/DEBUG ---
def create_superuser_view(request):
    try:
        User = get_user_model()
        username = os.environ.get('ADMIN_USER')
        password = os.environ.get('ADMIN_PASSWORD')
        
        if not username or not password:
            return HttpResponse("Erro: As variáveis de ambiente ADMIN_USER ou ADMIN_PASSWORD não foram definidas no Render.", status=500)

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email='', password=password)
            return HttpResponse("Superusuário criado com sucesso!")
        else:
            user = User.objects.get(username=username)
            user.set_password(password)
            user.save()
            return HttpResponse("Senha do superusuário foi atualizada com sucesso!")
    except Exception as e:
        print(f"ERRO DETALHADO AO CRIAR/ATUALIZAR SUPERUSER: {e}")
        return HttpResponse(f"Ocorreu um erro interno no servidor: {e}", status=500)

def health_check_view(request):
    return JsonResponse({"status": "ok", "message": "Backend is running!"})