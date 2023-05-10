from django.http import HttpResponse
from django.shortcuts import redirect, render
from .models import Cart, CartItem
from almacen.models import Producto
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

def _cart_id(request):
    cart = request.session.session_key
    if not cart:
        cart = request.session.create()
    return cart

def add_cart(request, product_id):
    product = Producto.objects.get(id=product_id) # obtener el producto
    try:
        cart = Cart.objects.get(cart_id=_cart_id(request)) # obtener el carrito usando el id de la sesion
    except Cart.DoesNotExist:
        cart = Cart.objects.create(
            cart_id = _cart_id(request)
        )
    cart.save()

    try:
        cart_item = CartItem.objects.get(product=product, cart=cart) # obtener el item del carrito
        cart_item.quantity += 1 # aumentar la cantidad
        cart_item.save()
    except CartItem.DoesNotExist:
        cart_item = CartItem.objects.create(
            product = product,
            quantity = 1,
            cart = cart
        )
        cart_item.save()
    return HttpResponse(cart_item.quantity)
    return redirect('cart')

def cart(request, total=0, quantity=0, cart_items=None):
    try:
        cart = Cart.objects.get(cart_id=_cart_id(request)) # obtener el carrito usando el id de la sesion
        cart_items = CartItem.objects.filter(cart=cart, is_active=True) # obtener los items del carrito
        for cart_item in cart_items:
            total += (cart_item.product.precio * cart_item.quantity) # obtener el total
            quantity += cart_item.quantity # obtener la cantidad
        tax = (19 * total)/100 # obtener el impuesto
        grand_total = total + tax # obtener el total con impuesto
    except ObjectDoesNotExist:
        pass # solo ignorar

    context = {
        'total': total,
        'quantity': quantity,
        'cart_items': cart_items,
        'tax': tax,
        'grand_total': grand_total,
    }
    
    return render(request, 'store/cart.html', context)