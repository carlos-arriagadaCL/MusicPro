from django.shortcuts import render, get_object_or_404
from .models import Producto
from categoria.models import Categoria

# Create your views here.

def store(request, category_slug=None):
    categorias = None
    productos = None

    if category_slug != None:
        categorias = get_object_or_404(Categoria, slug=category_slug)
        productos = Producto.objects.filter(categoria=categorias, is_available=True)
        productos_count = productos.count()
    else:
        productos = Producto.objects.all().filter(is_available=True)
        productos_count = productos.count()

    context = {
        'productos': productos,
        'productos_count': productos_count,
        'category_slug': category_slug,
    }
    return render(request, 'store/store.html', context)

def product_detail(request, category_slug, product_slug):
    try:
        single_product = Producto.objects.get(categoria__slug=category_slug, slug=product_slug)
    except Exception as e:
        raise e
    context = {
        'single_product': single_product,
    }
    return render(request, 'store/product_detail.html', context)