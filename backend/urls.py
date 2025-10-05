from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Agora, qualquer coisa que comece com /api/ será gerenciada pelo products.urls
    path('api/', include('products.urls')),
]