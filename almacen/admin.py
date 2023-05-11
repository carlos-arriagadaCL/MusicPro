from django.contrib import admin
from .models import Producto, Variacion

# Register your models here.

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'stock', 'categoria', 'fecha_modificacion', 'is_available')
    prepopulated_fields = {'slug': ('nombre',)}

class VariacionAdmin(admin.ModelAdmin):
    list_display = ('producto', 'variation_category', 'variation_value', 'is_active')
    list_editable = ('is_active',)
    list_filter = ('producto', 'variation_category', 'variation_value', 'is_active')

admin.site.register(Producto, ProductoAdmin)
admin.site.register(Variacion, VariacionAdmin)