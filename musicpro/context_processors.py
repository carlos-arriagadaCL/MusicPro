import json
import requests

def dolar_api(request):
    currency = request.session.get('currency')
    if currency == None:
        request.session['currency'] = 'CLP'
        request.session['currency_value'] = 1
    url = f'https://mindicador.cl/api/dolar/19-05-2023'
    response = requests.get(url)
    data = json.loads(response.text.encode("utf-8"))
    valor_dolar = data['serie'][0]['valor']
    valor_dolar = round(valor_dolar)
    return dict(valor_dolar=valor_dolar)