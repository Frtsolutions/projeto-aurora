# products/views.py

from django.http import HttpResponse
from django.contrib.auth import get_user_model
import os

def create_superuser_view(request):
    try:
        User = get_user_model()
        username = os.environ.get('ADMIN_USER')
        password = os.environ.get('ADMIN_PASSWORD')

        # Nova verificação: garante que as variáveis existem
        if not username or not password:
            return HttpResponse("Erro: As variáveis de ambiente ADMIN_USER ou ADMIN_PASSWORD não foram definidas no Render.", status=500)

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email='', password=password) # Adicionamos email=''
            return HttpResponse("Superusuário criado com sucesso!")
        else:
            # Se o usuário já existe, vamos atualizar a senha dele
            user = User.objects.get(username=username)
            user.set_password(password)
            user.save()
            return HttpResponse("Senha do superusuário foi atualizada com sucesso!")
    except Exception as e:
        # Captura qualquer outro erro e o imprime no log
        print(f"ERRO DETALHADO AO CRIAR/ATUALIZAR SUPERUSER: {e}")
        return HttpResponse(f"Ocorreu um erro interno no servidor: {e}", status=500)

# ... o resto do seu arquivo views.py continua aqui ...