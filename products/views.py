#teste dploy auto
# products/views.py (VERSÃO CORRETA E COMPLETA)

from django.http import HttpResponse, JsonResponse
from django.contrib.auth import get_user_model
import os
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

# --- VIEWS DA API (As que estavam faltando) ---
class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# --- VIEWS DE DEBUG (As que adicionamos) ---
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