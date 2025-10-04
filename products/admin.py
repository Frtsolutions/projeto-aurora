from django.contrib import admin
# 1. Importamos os novos modelos
from .models import Product, Sale, SaleItem

# Esta classe nos permite ver os itens da venda "dentro" da página de detalhe da venda
class SaleItemInline(admin.TabularInline):
    model = SaleItem
    extra = 0 # Não mostra campos extras para adicionar, apenas os existentes
    readonly_fields = ('product', 'quantity', 'price_at_sale') # Torna os campos somente leitura na visão de detalhe da venda

# Esta classe customiza como as Vendas são exibidas
@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'total_amount', 'created_at')
    inlines = [SaleItemInline] # "Anexa" os itens da venda à página de detalhe da venda

# Registra o modelo de Produto (provavelmente já estava assim)
admin.site.register(Product)

# Não precisamos registrar o SaleItem individualmente, pois ele já aparece dentro da Sale.