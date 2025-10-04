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

# --- VIEW DA API DE VENDAS ---
class SaleCreateAPIView(APIView):
    def post(self, request):
        items_data = request.data.get('items')
        total_amount = request.data.get('total_amount')

        if not items_data or total_amount is None:
            return Response({"error": "Dados da venda (items, total_amount) estão incompletos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                # 1. Cria o registro da Venda principal
                sale = Sale.objects.create(total_amount=total_amount)

                # 2. Loop para criar os Itens da Venda e atualizar o estoque
                for item_data in items_data:
                    product_id = item_data['product']['id']
                    quantity_sold = item_data['quantity']

                    # Usamos select_for_update() para "travar" a linha do produto no banco de dados,
                    # evitando que duas vendas aconteçam ao mesmo tempo e gerem inconsistência de estoque.
                    product = Product.objects.select_for_update().get(id=product_id)

                    # Verifica se há estoque suficiente
                    if product.stock_quantity < quantity_sold:
                        # Se não houver, a transação inteira é desfeita (rollback)
                        raise Exception(f"Estoque insuficiente para o produto: {product.name}")

                    # Cria o registro do item vendido
                    SaleItem.objects.create(
                        sale=sale,
                        product=product,
                        quantity=quantity_sold,
                        price_at_sale=product.selling_price
                    )

                    # 3. Atualiza (diminui) a quantidade em estoque do produto
                    product.stock_quantity -= quantity_sold
                    product.save()

            # Se tudo correu bem, prepara a resposta de sucesso com os dados da venda criada
            serializer = SaleSerializer(sale)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            return Response({"error": "Um dos produtos na venda não foi encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Qualquer outra exceção (como a de estoque insuficiente) será capturada aqui
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