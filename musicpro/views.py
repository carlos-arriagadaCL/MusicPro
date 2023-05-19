from django.shortcuts import redirect, render
from almacen.models import Producto
from .context_processors import dolar_api

def home(request):
    productos = Producto.objects.filter(is_available=True)

    context = {
        'productos': productos,
    }

    return render(request, 'home.html', context)

def change_currency(request):
    currency = request.session.get('currency')
    currency_value = request.session.get('currency_value')
    if currency == 'CLP':
        request.session['currency'] = 'USD'
        request.session['currency_value'] = dolar_api(request).get('valor_dolar')
    else:
        request.session['currency'] = 'CLP'
        request.session['currency_value'] = 1

    return redirect('home')