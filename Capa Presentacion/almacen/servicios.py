import requests

def get_productos():
    url = "http://localhost:8000/api/productos/"
    response = requests.get(url)
    return response.json()

def get_producto(id):
    url = "http://localhost:8000/api/productos/" + str(id) + "/"
    response = requests.get(url)
    return response.json()

def get_categorias():
    url = "http://localhost:8000/api/categorias/"
    response = requests.get(url)
    return response.json()

def get_categoria(id):
    url = "http://localhost:8000/api/categorias/" + str(id) + "/"
    response = requests.get(url)
    return response.json()
